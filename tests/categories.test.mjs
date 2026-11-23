import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

test('category IDs, evidence mapping, multi-category filters and empty tabs', async () => {
  const server = await createServer({ logLevel: 'silent', server: { middlewareMode: true }, optimizeDeps: { noDiscovery: true } });
  try {
    const { categoriesForGenres, matchesCategory, visibleCategories } = await server.ssrLoadModule('/src/data/categoryMapping.ts');
    const { categories } = await server.ssrLoadModule('/src/types/categories.ts');
    const { artists } = await server.ssrLoadModule('/src/data/artists.ts');
    const { researchArtists } = await server.ssrLoadModule('/src/data/research/artists.ts');
    const { realArtistPages } = await server.ssrLoadModule('/src/data/realArtistPages.ts');
    const { CategoryNav } = await server.ssrLoadModule('/src/components/CategoryNav.tsx');
    assert.deepEqual(categories.map(c => c.id), ['all','pop','rnb','hip-hop','rock','alternative','electronic','country-folk','latin']);
    assert.deepEqual(categoriesForGenres(['Country','Folk','Country']), ['country-folk']);
    assert.deepEqual(categoriesForGenres(['Indie','Alternative']), ['alternative']);
    assert.deepEqual(categoriesForGenres(['Unknown','Electropop','American','toString']), []);
    assert.throws(() => categoriesForGenres(['Pop','Rock','Country','Latin']), /不能超过 3/);
    for (const artist of [...artists, ...realArtistPages]) {
      assert(artist.categoryIds.length <= 3);
      assert.equal(new Set(artist.categoryIds).size, artist.categoryIds.length);
      for (const id of artist.categoryIds) assert(categories.some(c => c.id === id && id !== 'all'));
      assert(matchesCategory(artist, 'all'));
    }
    assert.equal(artists.length, 8, 'legacy demo fixture remains unchanged');
    assert.equal(realArtistPages.length, 20);
    for (const artist of realArtistPages) {
      const source = researchArtists.find(a => a.id === artist.id);
      assert(source.evidence.some(e => e.supports.includes('genres')));
      assert.deepEqual(artist.categoryIds, categoriesForGenres(source.genres));
    }
    const taylor = realArtistPages.find(a => a.id === 'taylor-swift');
    assert(matchesCategory(taylor, 'pop'));
    assert(matchesCategory(taylor, 'country-folk'));
    assert(!matchesCategory(taylor, 'rock'));
    assert.deepEqual(realArtistPages.find(a => a.id === 'billie-eilish').categoryIds, ['pop']);
    assert.deepEqual(visibleCategories(artists).map(c => c.id), ['all','pop','rnb','hip-hop','alternative','electronic']);
    assert.deepEqual(visibleCategories([]).map(c => c.id), ['all']);
    assert.equal(realArtistPages.filter(a => matchesCategory(a,'pop') && a.name.toLowerCase().includes('taylor')).length, 1);
    const nav = renderToStaticMarkup(createElement(CategoryNav, {value:'pop',onChange:()=>{},items:visibleCategories(artists)}));
    assert(nav.includes('filter-label-zh'));
    assert(nav.includes('ALTERNATIVE'));
    assert(!nav.includes('COUNTRY / FOLK'));
  } finally { await server.close(); }
});

