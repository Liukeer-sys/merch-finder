import type { SocialAccount, SocialPlatform } from '../types/social';
import { socialAccounts } from '../data/socialAccounts';
export function selectVerifiedAccounts(accounts: readonly SocialAccount[], artistId: string) {
  return accounts.filter(a => a.artistId === artistId && a.verificationStatus === 'Verified' && a.verificationSourceUrl && a.verifiedAt && a.profileUrl.startsWith('https://'));
}
function PlatformIcon({ platform }: { platform: SocialPlatform }) {
  return <svg className="social-platform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    {platform === 'Instagram' ? <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></> :
      platform === 'YouTube' ? <><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 6 3-6 3z" fill="currentColor" stroke="none"/></> :
      platform === 'TikTok' || platform === 'Douyin' ? <path d="M14 3v12a4 4 0 1 1-4-4M14 3c0 4 3 6 7 6"/> :
      platform === 'X' ? <><path d="m4 3 16 18h-5L3 3h5l13 18M20 3 4 21"/></> :
      platform === 'Facebook' ? <path d="M15 3h-3a4 4 0 0 0-4 4v14m-4-10h12"/> :
      <><circle cx="12" cy="12" r="9"/><path d="M7 12h10M12 7v10"/></>}
  </svg>;
}
function AccountItem({ account, artistName }: { account: SocialAccount; artistName: string }) {
  const accountName = account.displayName ?? account.handle ?? artistName;
  return <a className="social-account" href={account.profileUrl} target="_blank" rel="noopener noreferrer" title={accountName} aria-label={`${artistName} · ${account.platform} · ${accountName}`}>
    <PlatformIcon platform={account.platform}/><span className="social-account-name">{accountName}</span>
  </a>;
}
export function SocialAccountRow({ artistId, artistName, accounts = socialAccounts }: { artistId: string; artistName: string; accounts?: readonly SocialAccount[] }) {
  const verified = selectVerifiedAccounts(accounts, artistId);
  if (!verified.length) return null;
  return <nav className="social-accounts" aria-label={`${artistName} 官方社交账号`}>{verified.map(account => <AccountItem key={account.id} account={account} artistName={artistName}/>)}</nav>;
}
