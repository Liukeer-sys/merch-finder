import type { Evidence, VerificationStatus } from './catalog';
export interface CatalogLink {
  id: string;
  artistId: string;
  kind: 'Website' | 'OfficialStore' | 'ThirdParty';
  url: string;
  resolvedUrl: string | null;
  region: string;
  verificationStatus: VerificationStatus;
  shipsToMainlandChina: 'Yes' | 'No' | 'Unknown';
  entryType?: 'Store' | 'Selector';
  availability?: 'Open' | 'PasswordProtected' | 'Blocked' | 'Unknown';
  evidence: Evidence[];
  lastVerifiedAt: string;
}
