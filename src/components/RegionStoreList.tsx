import type { RegionStore } from '../types/artist';
import { OfficialLinkPanel } from './OfficialLinkPanel';
export function RegionStoreList({ stores }: { stores: readonly RegionStore[] }) {
  if (!stores.length) return <p className="detail-empty">暂无地区商店资料。</p>;

  return (
    <div className="region-store-list">
      {stores.map(store => (
        <section key={store.id}>
          <h2 className="store-heading">{store.title}</h2>
          <OfficialLinkPanel link={store} actionLabel="VISIT MERCH STORE"/>
        </section>
      ))}
    </div>
  );
}
