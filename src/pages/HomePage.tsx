import { useState } from 'react';
import { homepageArtists as artists } from '../data/homepageArtists';
import { matchesCategory, visibleCategories } from '../data/categoryMapping';
import type { Category } from '../types/artist';
import { artistTarget, type Navigate } from '../navigation';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { CategoryNav } from '../components/CategoryNav';
import { ArtistGrid } from '../components/ArtistGrid';

export default function HomePage({ onNavigate: navigate }: { onNavigate: Navigate }) {
  const [category, setCategory] = useState<Category>('all');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const filtered = artists.filter(artist => matchesCategory(artist, category) && artist.name.toLowerCase().includes(query.trim().toLowerCase()));
  return <div className="shell">
    <Header searchOpen={searchOpen} onSearch={() => { setSearchOpen(!searchOpen); if (searchOpen) setQuery(''); }} onFavorites={() => navigate({ page: 'favorites' })} />
    <SearchBar open={searchOpen} query={query} onChange={setQuery} />
    <CategoryNav value={category} onChange={setCategory} items={visibleCategories(artists)} />
    <ArtistGrid artists={filtered} onOpen={id => navigate(artistTarget(id))} />
  </div>;
}


