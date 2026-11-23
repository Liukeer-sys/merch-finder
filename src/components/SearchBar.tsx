import { useEffect, useRef } from 'react';
export function SearchBar({ open, query, onChange }: { open: boolean; query: string; onChange: (value: string) => void }) {
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) input.current?.focus(); }, [open]);
  return <div id="artist-search" className="searchbox" hidden={!open}>
    <input ref={input} type="search" placeholder="Search artists..." aria-label="搜索艺人" value={query} onChange={e => onChange(e.target.value)} />
  </div>;
}
