import { useId, type ReactNode } from 'react';
export type DetailTab = 'website' | 'merch';
const tabs = ['website', 'merch'] as const;
export function SegmentedTabs({ value, onChange, children }: { value: DetailTab; onChange: (tab: DetailTab) => void; children: ReactNode }) {
  const id = useId();
  return <>
    <div className="detail-tabs" role="tablist" aria-label="官方链接类型">{tabs.map(tab => <button key={tab} id={`${id}-${tab}`} role="tab" aria-selected={value === tab} aria-controls={`${id}-panel-${tab}`} tabIndex={value === tab ? 0 : -1} onClick={() => onChange(tab)} onKeyDown={e => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      const next = e.key === 'Home' ? 'website' : e.key === 'End' ? 'merch' : tab === 'website' ? 'merch' : 'website';
      onChange(next); document.getElementById(`${id}-${next}`)?.focus();
    }}>{tab.toUpperCase()}</button>)}</div>
    {tabs.map(tab => <div key={tab} role="tabpanel" id={`${id}-panel-${tab}`} aria-labelledby={`${id}-${tab}`} hidden={tab !== value} tabIndex={0}>{tab === value ? children : null}</div>)}
  </>;
}
