import { researchLinks } from './links';
export const researchStores = researchLinks.filter(link => link.kind === 'OfficialStore');
