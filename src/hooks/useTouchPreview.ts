import { useEffect, useRef, useState } from 'react';
import { bindTouchPreview } from './bindTouchPreview';

export function useTouchPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeArtistId, setActiveArtistId] = useState<string | null>(null);
  useEffect(() => {
    if (ref.current) return bindTouchPreview(ref.current, setActiveArtistId);
  }, []);
  return { ref, activeArtistId };
}
