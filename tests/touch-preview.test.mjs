import test from 'node:test';
import assert from 'node:assert/strict';
import { bindTouchPreview } from '../src/hooks/bindTouchPreview.ts';

// Event-level regression harness, not browser/device emulation. Exercises the
// production listener bindings, lifetime, coordinate hit-testing and click guard.
function harness() {
  class Target extends EventTarget {
    listeners = [];
    addEventListener(type, fn, options) {
      this.listeners.push({ type, options });
      super.addEventListener(type, fn, options);
    }
  }
  const view = new Target();
  const doc = new Target();
  const grid = new Target();
  const cards = ['A', 'B', 'C', 'D'].map(id => ({ dataset: { artistId: id } }));
  let scrollOffset = 0;
  let active = null;
  const updates = [];
  doc.defaultView = view;
  doc.hidden = false;
  doc.elementFromPoint = (x, y) => {
    const card = x < 0 ? null : cards[Math.floor((y + scrollOffset) / 100)];
    return card ? { closest: () => card } : null;
  };
  grid.ownerDocument = doc;
  grid.contains = card => cards.includes(card);
  const cleanup = bindTouchPreview(grid, id => { active = id; updates.push(id); });
  const touch = (x, y, identifier = 1) => ({ clientX: x, clientY: y, identifier });
  const fire = (target, type, fields = {}) => {
    const event = new Event(type, { cancelable: true });
    Object.assign(event, fields);
    target.dispatchEvent(event);
    return event;
  };
  return {
    grid, view, doc, updates, cleanup, touch, fire,
    get active() { return active; },
    start(x = 10, y = 10, id = 1) { return fire(grid, 'touchstart', { touches: [touch(x, y, id)] }); },
    move(x, y, id = 1) { return fire(grid, 'touchmove', { touches: [touch(x, y, id)] }); },
    end(x = 10, y = 10, id = 1) { return fire(view, 'touchend', { touches: [], changedTouches: [touch(x, y, id)] }); },
    click(detail = 1) { return fire(grid, 'click', { detail }); },
    scroll(offset) { scrollOffset = offset; return fire(view, 'scroll'); },
  };
}

test('held preview survives 3 seconds, small vertical movement and scroll events', async () => {
  const h = harness();
  h.start();
  assert.equal(h.active, 'A');
  await new Promise(resolve => setTimeout(resolve, 3050));
  assert.equal(h.active, 'A');
  h.move(10, 25); // Previously locked into scroll mode and cleared active state.
  assert.equal(h.active, 'A');
  h.scroll(0); // Previously ended the entire gesture.
  assert.equal(h.active, 'A');
  h.move(10, 125);
  assert.equal(h.active, 'B');
  h.end(10, 125);
  assert.equal(h.active, null);
  h.cleanup();
});

test('one finger scrubs A → B → C → D with no dependency on event.target', () => {
  const h = harness();
  h.start();
  h.move(10, 110); h.move(10, 210); h.move(10, 310);
  assert.deepEqual(h.updates, ['A', 'B', 'C', 'D']);
  h.end(10, 310);
  assert.equal(h.active, null);
  assert.equal(h.click().defaultPrevented, true);
  assert.equal(h.click(0).defaultPrevented, false, 'keyboard activation remains available');
  h.cleanup();
});

test('scroll re-hits the card under the finger and never prevents native scroll', () => {
  const h = harness();
  assert.equal(h.start().defaultPrevented, false);
  assert.equal(h.move(10, 20).defaultPrevented, false);
  assert.equal(h.scroll(100).defaultPrevented, false);
  assert.equal(h.active, 'B');
  assert.equal(h.scroll(200).defaultPrevented, false);
  assert.equal(h.active, 'C');
  for (const target of [h.grid, h.view]) {
    for (const listener of target.listeners.filter(l => ['touchstart', 'touchmove', 'scroll'].includes(l.type))) {
      assert.equal(listener.options.passive, true);
    }
  }
  h.cleanup();
});

test('fresh quick tap after a scrub is not suppressed by the old gesture', () => {
  const h = harness();
  h.start(); h.move(10, 110); h.end(10, 110);
  assert.equal(h.click().defaultPrevented, true);
  h.start(10, 10, 2);
  h.end(10, 110, 1); // Late event for previous contact cannot end this contact.
  assert.equal(h.active, 'A');
  h.end(10, 10, 2);
  assert.equal(h.click().defaultPrevented, false);
  h.cleanup();
});

test('leaving the gallery clears hit only, reentry continues the same gesture', () => {
  const h = harness();
  h.start(); h.move(-1, 10);
  assert.equal(h.active, null);
  h.move(10, 310);
  assert.equal(h.active, 'D');
  h.move(10, 10); h.end();
  assert.equal(h.click().defaultPrevented, true, 'moving out and back is still a scrub');
  h.cleanup();
});

test('cancel, multitouch, hidden page and blur clear without stale callbacks', () => {
  const h = harness();
  for (const interrupt of [
    () => h.fire(h.view, 'touchcancel'),
    () => h.fire(h.grid, 'touchstart', { touches: [h.touch(10, 10), h.touch(20, 20, 2)] }),
    () => { h.doc.hidden = true; h.fire(h.doc, 'visibilitychange'); h.doc.hidden = false; },
    () => h.fire(h.view, 'blur'),
  ]) {
    h.start(); interrupt();
    assert.equal(h.active, null);
    h.move(10, 110);
    assert.equal(h.active, null);
  }
  h.start();
  assert.equal(h.fire(h.grid, 'contextmenu').defaultPrevented, true);
  h.end();
  assert.equal(h.fire(h.grid, 'contextmenu').defaultPrevented, false);
  h.cleanup();
  h.start();
  assert.equal(h.active, null, 'listeners removed on cleanup');
});
