const MOVE_THRESHOLD = 8;
const CLICK_GUARD_MS = 500;

/** One delegated touch session. No timers, pointer capture or scroll locking. */
export function bindTouchPreview(grid: HTMLElement, setActiveArtistId: (id: string | null) => void) {
  const doc = grid.ownerDocument;
  const view = doc.defaultView!;
  let gesture: {
    identifier: number;
    startX: number;
    startY: number;
    x: number;
    y: number;
    moved: boolean;
  } | null = null;
  let suppressUntil = 0;

  const hit = (x: number, y: number) => {
    const card = doc.elementFromPoint(x, y)?.closest<HTMLElement>('[data-artist-id]');
    return card && grid.contains(card) ? card.dataset.artistId ?? null : null;
  };
  const finish = (cancelled = false) => {
    if (gesture?.moved || cancelled) suppressUntil = Date.now() + CLICK_GUARD_MS;
    gesture = null;
    setActiveArtistId(null);
  };
  const start = (event: TouchEvent) => {
    if (event.touches.length !== 1) { finish(true); return; }
    const touch = event.touches[0];
    // A fresh touch cannot inherit suppression or cleanup from the previous one.
    suppressUntil = 0;
    gesture = {
      identifier: touch.identifier, startX: touch.clientX, startY: touch.clientY,
      x: touch.clientX, y: touch.clientY, moved: false,
    };
    setActiveArtistId(hit(touch.clientX, touch.clientY));
  };
  const move = (event: TouchEvent) => {
    if (!gesture) return;
    if (event.touches.length !== 1) { finish(true); return; }
    const touch = Array.from(event.touches).find(t => t.identifier === gesture!.identifier);
    if (!touch) { finish(true); return; }
    gesture.x = touch.clientX;
    gesture.y = touch.clientY;
    // Once moved, returning to the starting point still counts as a scrub.
    gesture.moved ||= Math.hypot(gesture.x - gesture.startX, gesture.y - gesture.startY) > MOVE_THRESHOLD;
    setActiveArtistId(hit(gesture.x, gesture.y));
  };
  const end = (event: TouchEvent) => {
    if (!gesture) return;
    const touch = Array.from(event.changedTouches).find(t => t.identifier === gesture!.identifier);
    if (touch) {
      gesture.moved ||= Math.hypot(touch.clientX - gesture.startX, touch.clientY - gesture.startY) > MOVE_THRESHOLD;
      finish();
    }
  };
  const cancel = () => { if (gesture) finish(true); };
  const scroll = () => {
    if (!gesture) return;
    // Scrolling changes the card beneath a stationary finger, not touch lifetime.
    gesture.moved = true;
    setActiveArtistId(hit(gesture.x, gesture.y));
  };
  const click = (event: MouseEvent) => {
    // Keyboard activation (detail=0) must remain accessible.
    if (event.detail !== 0 && Date.now() < suppressUntil) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  const contextmenu = (event: Event) => {
    // Prevent the native image callout interrupting an intentional held preview.
    // Desktop right-click is unaffected when no touch is being tracked.
    if (gesture) event.preventDefault();
  };
  const visibility = () => { if (doc.hidden) cancel(); };

  grid.addEventListener('touchstart', start, { passive: true });
  grid.addEventListener('touchmove', move, { passive: true });
  view.addEventListener('touchend', end, { passive: true });
  view.addEventListener('touchcancel', cancel, { passive: true });
  view.addEventListener('scroll', scroll, { passive: true, capture: true });
  view.addEventListener('blur', cancel);
  doc.addEventListener('visibilitychange', visibility);
  grid.addEventListener('click', click, true);
  grid.addEventListener('contextmenu', contextmenu);
  return () => {
    grid.removeEventListener('touchstart', start);
    grid.removeEventListener('touchmove', move);
    view.removeEventListener('touchend', end);
    view.removeEventListener('touchcancel', cancel);
    view.removeEventListener('scroll', scroll, true);
    view.removeEventListener('blur', cancel);
    doc.removeEventListener('visibilitychange', visibility);
    grid.removeEventListener('click', click, true);
    grid.removeEventListener('contextmenu', contextmenu);
    gesture = null;
  };
}
