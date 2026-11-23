import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

test('20 real homepage cards use selected assets, honest stand-ins and complete preview metadata', async () => {
  const server = await createServer({logLevel:'silent',server:{middlewareMode:true},optimizeDeps:{noDiscovery:true}});
  try {
    const {homepageArtists} = await server.ssrLoadModule('/src/data/homepageArtists.ts');
    const {artistCardImages} = await server.ssrLoadModule('/src/data/artistCardImages.ts');
    const {researchArtists} = await server.ssrLoadModule('/src/data/research/artists.ts');
    const {realArtistPages,realArtistDetails} = await server.ssrLoadModule('/src/data/realArtistPages.ts');
    const {ArtistPage} = await server.ssrLoadModule('/src/pages/ArtistPage.tsx');
    const {ArtistCard} = await server.ssrLoadModule('/src/components/ArtistCard.tsx');
    const {default:HomePage} = await server.ssrLoadModule('/src/pages/HomePage.tsx');
    assert.equal(homepageArtists.length,20);
    assert.equal(new Set(homepageArtists.map(a=>a.id)).size,20);
    assert.deepEqual(homepageArtists.map(a=>a.id), [...researchArtists].sort((a,b)=>a.displayOrder-b.displayOrder).map(a=>a.id));
    assert.deepEqual(Object.keys(artistCardImages).filter(id=>artistCardImages[id].placeholder), []);
    for (const artist of homepageArtists) {
      const source = researchArtists.find(a=>a.id===artist.id);
      const card = artistCardImages[artist.id];
      assert(card);
      assert(fs.existsSync(`public${artist.image}`));
      assert.equal(artist.name,source.name.toUpperCase());
      assert.equal(artist.genre,source.genres.join(' / '));
      assert.equal(artist.role,source.roles.join('/') || source.artistType);
      assert.equal(artist.countryCode,source.country);
      assert(artist.categoryIds.length>0);
      if(card.placeholder) assert(artist.imageAlt.includes('非本人肖像'));
      const html = renderToStaticMarkup(createElement(ArtistCard,{artist,active:true,onOpen:()=>{}}));
      assert(html.includes('artist active'));
      assert(html.includes(`data-artist-id="${artist.id}"`));
      assert(html.includes('artist-info'));
      const profile = realArtistPages.find(a=>a.id===artist.id);
      const details = realArtistDetails.find(a=>a.artistId===artist.id);
      for (const link of [details.website, ...details.stores].filter(Boolean)) {
        if (link.previewImage) assert(fs.existsSync(`public${link.previewImage}`), `Missing preview for ${link.id}: ${link.previewImage}`);
      }
      const detail = renderToStaticMarkup(createElement(ArtistPage,{
        artist:profile,details,saved:false,onToggle:()=>{},onBack:()=>{},storageError:false,
      }));
      assert.equal(profile.image,artist.image);
      assert(detail.includes(`class="hero-visual"><img src="${artist.image}"`));
      if(card.placeholder) assert(detail.includes('临时黑白占位图，非本人肖像'));
    }
    const home = renderToStaticMarkup(createElement(HomePage,{onNavigate:()=>{}}));
    assert.equal((home.match(/data-artist-id=/g)||[]).length,20);
    assert(!home.includes('LUNA KAI'));
    assert(home.includes('COUNTRY / FOLK'));
    assert(home.includes('ROCK'));
  } finally {await server.close();}
});
