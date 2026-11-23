import type { ArtistCategoryIds } from './categories';
export { categories, type Category } from './categories';
export interface Artist {
  id: string;
  name: string;
  role: string;
  countryCode: string;
  genre: string;
  categoryIds: ArtistCategoryIds;
  image: string;
  imageAlt?: string;
}

export interface OfficialLink {
  id: string;
  title: string;
  url?: string;
  verified: boolean;
  requiresProxy?: boolean | null;
  previewImage?: string;
  previewAlt?: string;
}
export interface RegionStore extends OfficialLink { region: string }
export interface ArtistDetails {
  artistId: string;
  website?: OfficialLink;
  stores: readonly RegionStore[];
}
