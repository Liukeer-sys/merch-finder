import { realArtistPages } from './realArtistPages';
import { researchArtists } from './research/artists';
import type { Artist } from '../types/artist';

export const homepageArtists: readonly Artist[] = [...researchArtists]
  .sort((a, b) => a.displayOrder - b.displayOrder)
  .map(source => {
    const artist = realArtistPages.find(item => item.id === source.id)!;
    return {
      ...artist,
      name: source.name.toUpperCase(),
      genre: source.genres.join(' / '),
    };
  });
