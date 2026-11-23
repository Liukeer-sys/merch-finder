export type SocialPlatform = 'Instagram' | 'YouTube' | 'TikTok' | 'X' | 'Weibo' | 'Douyin' | 'Xiaohongshu' | 'Bilibili' | 'Facebook';
export interface SocialAccount {
  id: string; artistId: string; platform: SocialPlatform;
  handle: string | null; displayName: string | null; profileUrl: string;
  avatarPath: string | null; avatarReviewStatus?: 'Pending' | 'Approved';
  region: 'Global' | 'China'; accountType: 'Artist' | 'Management' | 'Authorized Local' | null;
  operator?: string | null; verificationStatus: 'Verified' | 'Pending' | 'Rejected';
  verificationSourceUrl: string | null; verifiedAt: string | null;
}
