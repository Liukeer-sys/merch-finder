import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import HomePage from './pages/HomePage';
import { ArtistPage } from './pages/ArtistPage';
import { artists } from './data/artists';
import { artistDetails } from './data/artistDetails';
import { realArtistPages, realArtistDetails } from './data/realArtistPages';
import { useSavedArtists } from './hooks/useSavedArtists';
import type { Navigate } from './navigation';
import { NavigationNotice } from './components/NavigationNotice';
import { IconButton } from './components/ui/IconButton';
const detailArtists = [...artists, ...realArtistPages];

function readRoute() {
  const match = /^\/artists\/([^/]+)\/?$/.exec(location.pathname);
  if (match) { try { return decodeURIComponent(match[1]); } catch { return ''; } }
  return location.pathname === '/' ? null : '';
}
export default function App({ onNavigate }: { onNavigate?: Navigate }) {
  const [artistId, setArtistId] = useState(readRoute);
  const [showSaved, setShowSaved] = useState(false);
  const { savedIds, toggleSaved, storageError } = useSavedArtists();
  const homeScroll = useRef(0);
  const artist = detailArtists.find(item => item.id === artistId);
  useEffect(() => {
    const pop = () => { setShowSaved(false); setArtistId(readRoute()); };
    const previous = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    window.addEventListener('popstate', pop);
    return () => { window.removeEventListener('popstate', pop); history.scrollRestoration = previous; };
  }, []);
  useLayoutEffect(() => {
    window.scrollTo(0, artistId === null ? homeScroll.current : 0);
    document.title = artist ? `${artist.name} — Merch Finder` : 'Merch Finder';
  }, [artistId, artist]);
  const navigate: Navigate = target => {
    if (onNavigate) { onNavigate(target); return; }
    if (target.page === 'favorites') { setShowSaved(true); return; }
    if (artistId === null) homeScroll.current = window.scrollY;
    history.pushState({ merchFinder: true }, '', `/artists/${encodeURIComponent(target.artistId)}`);
    setShowSaved(false); setArtistId(target.artistId);
  };
  function back() {
    if (history.state?.merchFinder) history.back();
    else { history.replaceState(null, '', '/'); setArtistId(null); }
  }
  return <>
    {/* Keep HomePage mounted to preserve query/category state on return. */}
    <div hidden={artistId !== null}><HomePage onNavigate={navigate}/></div>
    {artistId !== null && (artist ? <ArtistPage key={artist.id} artist={artist} details={[...artistDetails, ...realArtistDetails].find(item => item.artistId === artist.id)} saved={savedIds.includes(artist.id)} onToggle={() => toggleSaved(artist.id)} onBack={back} storageError={storageError}/> : <main className="artist-page detail-content"><IconButton icon="back" label="返回首页" onClick={back}/><h1>未找到艺人</h1><p>请返回首页选择艺人。</p></main>)}
    {showSaved && <NavigationNotice title="收藏" onClose={() => setShowSaved(false)}>
      {detailArtists.some(item => savedIds.includes(item.id)) ? <ul className="saved-list">{detailArtists.filter(item => savedIds.includes(item.id)).map(item => <li key={item.id}><button onClick={() => navigate({ page: 'artist', artistId: item.id })}>{item.name}</button></li>)}</ul> : <p>暂无收藏。进入艺人详情页，点击书签图标即可收藏。</p>}
    </NavigationNotice>}
  </>;
}
