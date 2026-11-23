import { useEffect, useRef, type ReactNode } from 'react';
export function NavigationNotice({ title, onClose, children }: { title: string; onClose: () => void; children?: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  // Removing a dialog also removes its modal state. Avoid close() in effect
  // cleanup: StrictMode replays effects and close would emit an onClose event.
  useEffect(() => { if (!ref.current?.open) ref.current?.showModal(); }, []);
  return <dialog ref={ref} className="dialog" aria-labelledby="notice-title" onClose={onClose} onClick={e => { if (e.target === e.currentTarget) ref.current?.close(); }}>
    <div className="dialog-inner"><h2 id="notice-title">{title}</h2>{children ?? <p>导航入口已预留，此页面将在后续阶段开发。</p>}<button onClick={() => ref.current?.close()}>关闭</button></div>
  </dialog>;
}
