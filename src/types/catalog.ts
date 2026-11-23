export type VerificationStatus = 'Verified' | 'Pending';
export interface Evidence {
  url: string;
  checkedAt: string;
  supports: string[];
  note: string;
}
export interface CatalogArtist {
  id: string;
  name: string;
  artistType: 'Solo' | 'Band' | 'Group' | null;
  roles: string[];
  country: string | null;
  genres: string[];
  displayOrder: number;
  evidence: Evidence[];
  lastVerifiedAt: string;
}
