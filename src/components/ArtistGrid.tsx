import type { Artist } from '../types/artist';
import { ArtistCard } from './ArtistCard';
import { useTouchPreview } from '../hooks/useTouchPreview';
export function ArtistGrid({ artists, onOpen }: { artists: readonly Artist[]; onOpen: (id: string) => void }) {
  const { ref, activeArtistId } = useTouchPreview();
  return <main>
    <div ref={ref} className="gallery" aria-label="艺人列表">
      {[0, 1].map(column => <div key={column} className={`column ${column ? 'right' : 'left'}`}>
        {artists.filter((_, i) => i % 2 === column).map((artist, index) => <ArtistCard key={artist.id} artist={artist} active={activeArtistId === artist.id} onOpen={onOpen} eager={index < 2} priority={column === 0 && index === 0} />)}
      </div>)}
    </div>
    {!artists.length && <p className="empty" role="status">没有找到匹配的艺人，请尝试其他分类或关键词。</p>}
  </main>;
}

