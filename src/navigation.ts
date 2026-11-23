export type NavigationTarget = { page: 'artist'; artistId: string } | { page: 'favorites' };
export type Navigate = (target: NavigationTarget) => void;
// Future router integration belongs here; components only emit typed targets.
export const artistTarget = (artistId: string): NavigationTarget => ({ page: 'artist', artistId });
