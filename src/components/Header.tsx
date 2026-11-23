import { IconButton } from './ui/IconButton';
interface Props { searchOpen: boolean; onSearch: () => void; onFavorites: () => void }
export function Header({ searchOpen, onSearch, onFavorites }: Props) {
  return <header className="site-header">
    <div className="brand">Merch Finder.</div>
    <div className="actions">
      <IconButton compact icon="search" label="搜索" aria-expanded={searchOpen} aria-controls="artist-search" onClick={onSearch}/>
      <IconButton compact icon="saved" label="进入收藏页" onClick={onFavorites}/>
    </div>
  </header>;
}
