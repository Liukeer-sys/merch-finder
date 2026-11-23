import { useState } from 'react';
import type { Artist, ArtistDetails } from '../types/artist';
import { ArtistHero } from '../components/ArtistHero';
import { SegmentedTabs, type DetailTab } from '../components/SegmentedTabs';
import { OfficialLinkPanel } from '../components/OfficialLinkPanel';
import { RegionStoreList } from '../components/RegionStoreList';
import { SocialAccountRow } from '../components/SocialAccountRow';
export function ArtistPage({ artist, details, saved, onToggle, onBack, storageError }: { artist: Artist; details?: ArtistDetails; saved: boolean; onToggle: () => void; onBack: () => void; storageError: boolean }) {
  const [tab, setTab] = useState<DetailTab>('website');
  return <main className="artist-page">
    <ArtistHero artist={artist} saved={saved} onToggle={onToggle} onBack={onBack}/>
    <div className="detail-content">
      <SocialAccountRow artistId={artist.id} artistName={artist.name}/>
      {storageError && <p className="detail-empty" role="status">收藏已在本次浏览中更新，但无法保存到此设备。</p>}
      <SegmentedTabs value={tab} onChange={setTab}>
        {tab === 'website' ? details?.website ? <OfficialLinkPanel key={details.website.id} link={details.website} actionLabel="VISIT WEBSITE"/> : <p className="detail-empty">暂无官网资料。</p> : <RegionStoreList stores={details?.stores ?? []}/>}
      </SegmentedTabs>
    </div>
  </main>;
}
