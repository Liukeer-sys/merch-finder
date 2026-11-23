export type IconName = 'search' | 'saved' | 'back' | 'copy' | 'external' | 'ladder' | 'ladder-off';
export function Icon({ name }: { name: IconName }) {
  return <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true">
    {name === 'search' && <><circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 6 6"/></>}
    {name === 'saved' && <path d="M5 3h14v18l-7-5-7 5z"/>}
    {name === 'back' && <path d="m12 3-9 9 9 9M3 12h19"/>}
    {name === 'copy' && <><rect x="8" y="8" width="13" height="13" rx="1"/><path d="M16 8V3H3v13h5"/></>}
    {name === 'external' && <path d="M6 18 19 5M7 5h12v12"/>}
    {(name === 'ladder' || name === 'ladder-off') && <path d="M8 4v16m8-16v16M8 7h8m-8 5h8m-8 5h8"/>}
    {name === 'ladder-off' && <>
      <path d="M4 4l16 16" stroke="var(--color-bg)" strokeWidth={5}/>
      <path d="M4 4l16 16"/>
    </>}
  </svg>;
}
