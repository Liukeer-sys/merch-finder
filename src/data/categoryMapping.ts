import { categories, type ArtistCategoryIds, type Category, type MusicCategoryId } from '../types/categories';

// Explicit mapping only; do not infer categories from artist names, substrings,
// roles or nationality. Original research genres/evidence stay unchanged.
const genreCategories: Readonly<Record<string, MusicCategoryId>> = {
  Pop: 'pop', 'R&B': 'rnb', 'Hip-hop': 'hip-hop', Rock: 'rock',
  Indie: 'alternative', Alternative: 'alternative', Electronic: 'electronic',
  Country: 'country-folk', Folk: 'country-folk', Latin: 'latin',
};
export function categoriesForGenres(genres: readonly string[]): ArtistCategoryIds {
  const result = [...new Set(genres.flatMap(genre => Object.hasOwn(genreCategories, genre) ? [genreCategories[genre]] : []))];
  switch (result.length) {
    case 0: return [];
    case 1: return [result[0]];
    case 2: return [result[0], result[1]];
    case 3: return [result[0], result[1], result[2]];
    default: throw new Error('艺人音乐类别不能超过 3 个，请审核源数据。');
  }
}
export function visibleCategories(artists: readonly { categoryIds: ArtistCategoryIds }[]) {
  return categories.filter(category => category.id === 'all' || artists.some(artist => artist.categoryIds.some(id => id === category.id)));
}
export function matchesCategory(artist: { categoryIds: ArtistCategoryIds }, category: Category) {
  return category === 'all' || artist.categoryIds.some(id => id === category);
}
