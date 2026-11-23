import { researchArtists } from './research/artists';
import { researchLinks } from './research/links';
import { categoriesForGenres } from './categoryMapping';
import { artistCardImages } from './artistCardImages';
import { linkPreviews } from './linkPreviews';
import { linkAccess } from './linkAccess';
import type { Artist, ArtistDetails, OfficialLink } from '../types/artist';

const verifiedLinks = researchLinks.filter(link => link.verificationStatus === 'Verified');

function toOfficialLink(link: typeof verifiedLinks[number], title: string, artistName: string): OfficialLink {
  const preview = linkPreviews[link.id];
  return {
    id: link.id,
    title,
    url: link.url,
    verified: true,
    requiresProxy: linkAccess[link.id] ?? null,
    previewImage: preview,
    previewAlt: preview ? `${artistName} ${title} 预览图` : undefined,
  };
}

export const realArtistPages: readonly Artist[] = researchArtists.map(a => {
  const card = artistCardImages[a.id];
  return {
    id: a.id,
    name: a.name,
    role: a.roles.join('/') || a.artistType || '',
    countryCode: a.country ?? '',
    genre: a.genres[0] ?? '',
    image: card?.image ?? '/images/artists/jax-riv.webp',
    imageAlt: card && !card.placeholder ? `${a.name} 肖像` : `${a.name}，临时黑白占位图，非本人肖像`,
    categoryIds: categoriesForGenres(a.evidence.some(e => e.supports.includes('genres')) ? a.genres : []),
  };
});
export const realArtistDetails: readonly ArtistDetails[] = researchArtists.map(artist => {
  const artistLinks = verifiedLinks.filter(link => link.artistId === artist.id);
  const website = artistLinks.find(link => link.kind === 'Website');

  return {
    artistId: artist.id,
    website: website && toOfficialLink(website, 'WEBSITE', artist.name),
    stores: artistLinks.filter(link => link.kind === 'OfficialStore').map(link => {
      const title = link.region === 'Unknown' ? 'STORE' : `${link.region} STORE`;
      return { ...toOfficialLink(link, title, artist.name), region: link.region };
    }),
  };
});
