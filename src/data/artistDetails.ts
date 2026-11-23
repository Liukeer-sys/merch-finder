import { artists } from './artists';
import type { ArtistDetails } from '../types/artist';

// Reserved example.org URLs are demonstration data, never official destinations.
// Replace only after verifying a real artist's links and image usage rights.
export const artistDetails: readonly ArtistDetails[] = artists.map(artist => ({
  artistId: artist.id,
  website: { id: `${artist.id}-website`, title: 'WEBSITE', url: `https://example.org/artists/${artist.id}/`, verified: false },
  stores: artist.id === 'elio-marks' ? [] : [
    { id: `${artist.id}-us`, region: 'US', title: 'US STORE', url: `https://example.org/artists/${artist.id}/stores/us/`, verified: false },
    { id: `${artist.id}-uk`, region: 'UK', title: 'UK STORE', url: `https://example.org/artists/${artist.id}/stores/uk/`, verified: false },
  ],
}));
