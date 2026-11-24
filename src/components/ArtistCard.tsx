import type { Artist } from '../types/artist';
import { imageUrl } from '../imageUrl';
export function ArtistCard({ artist, active, onOpen, eager = false, priority = false }: { artist: Artist; active: boolean; onOpen: (id: string) => void; eager?: boolean; priority?: boolean }) {
  return <button className={`artist ${active ? 'active' : ''}`} data-artist-id={artist.id} aria-label={`${artist.name}，查看艺人详情`} onClick={() => onOpen(artist.id)}>
    <img src={imageUrl(artist.image, 'card')} alt={artist.imageAlt ?? '虚构艺人肖像占位图'} draggable={false} width="400" height="400" loading={eager ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />
    <span className="shade" aria-hidden="true" />
    <span className="artist-name" aria-hidden="true">{artist.name}</span>
    <span className="artist-info"><strong>{artist.name}</strong><span>{artist.role}</span><span>{artist.countryCode}</span><span>{artist.genre}</span></span>
  </button>;
}
