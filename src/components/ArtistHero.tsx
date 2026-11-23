import { useState } from 'react';
import type { Artist } from '../types/artist';
import { IconButton } from './ui/IconButton';
import { SaveButton } from './SaveButton';
export function ArtistHero({ artist, saved, onToggle, onBack }: { artist: Artist; saved: boolean; onToggle: () => void; onBack: () => void }) {
  const [failed, setFailed] = useState(false);
  return <section className="artist-hero" aria-label="艺人资料">
    <div className="hero-visual">{artist.image && !failed ? <img src={artist.image} alt={artist.imageAlt ?? `${artist.name} 肖像`} onError={() => setFailed(true)}/> : <span className="hero-placeholder">肖像待补充</span>}</div>
    <div className="hero-back"><IconButton icon="back" label="返回" onClick={onBack}/></div>
    <div className="hero-info">
      <div className="hero-name-row"><h1>{artist.name}</h1><SaveButton saved={saved} onToggle={onToggle}/></div>
      <p className="hero-meta">{[artist.role.replaceAll('/', ' / '), artist.countryCode, artist.genre].map((text, i) => <span key={i}>{text}</span>)}</p>
    </div>
  </section>;
}
