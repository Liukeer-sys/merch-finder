/** Stable IDs are independent of display labels and recorded genre strings. */
export const categories = [
  { id: 'all', en: 'ALL', zh: '全部' },
  { id: 'pop', en: 'POP', zh: '流行' },
  { id: 'rnb', en: 'R&B', zh: '节奏蓝调' },
  { id: 'hip-hop', en: 'HIP-HOP', zh: '嘻哈' },
  { id: 'rock', en: 'ROCK', zh: '摇滚' },
  { id: 'alternative', en: 'ALTERNATIVE', zh: '另类 / 独立' },
  { id: 'electronic', en: 'ELECTRONIC', zh: '电子' },
  { id: 'country-folk', en: 'COUNTRY / FOLK', zh: '乡村 / 民谣' },
  { id: 'latin', en: 'LATIN', zh: '拉丁' },
] as const;
export type Category = typeof categories[number]['id'];
export type MusicCategoryId = Exclude<Category, 'all'>;
/** Unknown/unrecorded genres may remain empty; never assign more than three. */
export type ArtistCategoryIds = readonly []
  | readonly [MusicCategoryId]
  | readonly [MusicCategoryId, MusicCategoryId]
  | readonly [MusicCategoryId, MusicCategoryId, MusicCategoryId];
