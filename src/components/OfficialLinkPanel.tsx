import { useEffect, useId, useRef, useState } from 'react';
import type { OfficialLink } from '../types/artist';
import { IconButton } from './ui/IconButton';
import { OutlineButton } from './ui/OutlineButton';
export function verifiedDestination(link: OfficialLink): string | undefined {
  if (!link.verified || !link.url) return;
  try { return new URL(link.url).protocol === 'https:' ? link.url : undefined; } catch { return; }
}
export function OfficialLinkPanel({ link, actionLabel }: { link: OfficialLink; actionLabel: string }) {
  const [feedback, setFeedback] = useState('');
  const [imageFailed, setImageFailed] = useState(false);
  const [showAccess, setShowAccess] = useState(false);
  const accessNoteId = useId();
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try { await navigator.clipboard.writeText(link.url!); setFeedback('链接已复制'); }
    catch { setFeedback('复制失败，请长按或选中完整链接复制'); }
    clearTimeout(timer.current); timer.current = setTimeout(() => setFeedback(''), 3500);
  }
  const destination = verifiedDestination(link);
  const direct = link.requiresProxy === false;
  const accessNote = direct
    ? '中国大陆网络实测可直连'
    : link.requiresProxy === true
      ? '中国大陆网络实测需要代理'
      : '中国大陆网络待测试';

  return <section className="official-panel" aria-label={link.title}>
    <div className="link-preview">{link.previewImage && !imageFailed ? <img src={link.previewImage} alt={link.previewAlt ?? `${link.title}预览`} loading="lazy" decoding="async" onError={() => setImageFailed(true)}/> : <div className="preview-placeholder"><span>{link.title}</span><small>预览图待补充</small></div>}</div>
    <div className="link-url-row">
      <span className="link-url">{link.url ?? '链接待补充'}</span>
      {destination && <IconButton
        icon={direct ? 'ladder-off' : 'ladder'}
        className={direct ? 'link-access-direct' : 'link-access-ladder'}
        label={accessNote}
        title={accessNote}
        aria-expanded={showAccess}
        aria-controls={accessNoteId}
        onClick={() => setShowAccess(open => !open)}
        onKeyDown={event => { if (event.key === 'Escape') setShowAccess(false); }}
      />}
      <IconButton icon="copy" label={`复制${link.title}链接`} disabled={!link.url} onClick={copy}/>
    </div>
    {destination && <p id={accessNoteId} className="link-access-note" hidden={!showAccess}>{accessNote}</p>}
    {!destination && <p className="link-status">{link.url ? '演示链接 · 未核验，暂不可访问' : '暂无已核验链接'}</p>}
    <OutlineButton url={destination} label={actionLabel}/>
    <p className="copy-feedback" role="status">{feedback}</p>
  </section>;
}
