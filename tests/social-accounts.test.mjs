import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

test('social platform links keep verified identities, labels and accessible account names', async () => {
  const server = await createServer({ logLevel: 'silent', server: { middlewareMode: true }, optimizeDeps: { noDiscovery: true } });
  try {
    const { SocialAccountRow, selectVerifiedAccounts } = await server.ssrLoadModule('/src/components/SocialAccountRow.tsx');
    const { socialAccounts } = await server.ssrLoadModule('/src/data/socialAccounts.ts');
    const { realArtistPages, realArtistDetails } = await server.ssrLoadModule('/src/data/realArtistPages.ts');
    assert.equal(realArtistPages.length, 20);
    assert.equal(new Set(socialAccounts.map(a => a.id)).size, socialAccounts.length);
    const ids = new Set(realArtistPages.map(a => a.id));
    for (const a of socialAccounts) {
      assert(ids.has(a.artistId)); assert.equal(a.verificationStatus, 'Verified');
      assert(a.verificationSourceUrl?.startsWith('https://')); assert(a.verifiedAt);
      if (a.avatarPath) {
        assert.equal(a.avatarReviewStatus, 'Approved');
        assert(a.avatarPath.startsWith(`/images/social/${a.artistId}-`));
        assert(fs.existsSync(`public${a.avatarPath}`));
        const accountHtml = renderToStaticMarkup(createElement(SocialAccountRow, { artistId: a.artistId, artistName: a.artistId, accounts: [a] }));
        assert(!accountHtml.includes('<img'));
        assert(accountHtml.includes(`href="${a.profileUrl}"`));
        const accountName = renderToStaticMarkup(createElement('span', { className: 'social-account-name' }, a.displayName ?? a.handle ?? a.artistId));
        assert(accountHtml.includes(accountName));
      }
    }
    assert(realArtistDetails.find(a => a.artistId === 'the-weeknd')?.website?.verified);
    const original = socialAccounts.find(a => a.artistId === 'the-weeknd');
    const accounts = [
      { ...original, avatarReviewStatus: 'Approved', avatarPath: '/staging/private.webp' },
      { ...original, id: 'pending', profileUrl: 'https://example.org/pending', verificationStatus: 'Pending' },
      { ...original, id: 'rejected', verificationStatus: 'Rejected' },
      { ...original, id: 'unsafe', profileUrl: 'javascript:alert(1)' },
    ];
    assert.equal(selectVerifiedAccounts(accounts, 'the-weeknd').length, 1);
    const html = renderToStaticMarkup(createElement(SocialAccountRow, { artistId: 'the-weeknd', artistName: 'The Weeknd', accounts }));
    assert(!html.includes('example.org')); assert(!html.includes('/staging/')); assert(!html.includes('javascript:'));
    assert(!html.includes('<img')); assert(html.includes('noopener noreferrer'));
    assert(html.includes(`title="${original.displayName ?? original.handle ?? 'The Weeknd'}"`));
    const unapproved = renderToStaticMarkup(createElement(SocialAccountRow, {
      artistId: original.artistId, artistName: 'The Weeknd',
      accounts: [{ ...original, avatarReviewStatus: 'Pending', avatarPath: '/images/social/unapproved.jpg' }],
    }));
    assert(!unapproved.includes('<img'));
    assert(!unapproved.includes('/images/social/unapproved.jpg'));
    assert(html.indexOf('class="social-platform"') < html.indexOf('class="social-account-name"'));
    assert.equal(renderToStaticMarkup(createElement(SocialAccountRow, { artistId: 'elio-marks', artistName: 'Elio Marks', accounts })), '');
    const published = fs.readFileSync('src/data/socialAccounts.ts', 'utf8');
    assert(!published.includes('china-candidate')); assert(!published.includes('taylorsupdates'));
    console.log(`Validated ${socialAccounts.length} identities and 20 real artist detail records`);
  } finally { await server.close(); }
});
