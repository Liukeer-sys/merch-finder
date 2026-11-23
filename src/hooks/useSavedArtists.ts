import { useCallback, useEffect, useState } from 'react';
const KEY = 'merch-finder-saved-artists';
function readSaved(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string') : [];
  } catch { return []; }
}
// Instantiate once in App, and pass the same state to every page.
export function useSavedArtists() {
  const [savedIds, setSavedIds] = useState(readSaved);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    const sync = (e: StorageEvent) => { if (e.key === KEY || e.key === null) setSavedIds(readSaved()); };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  const toggleSaved = useCallback((id: string) => {
    const next = savedIds.includes(id) ? savedIds.filter(value => value !== id) : [...savedIds, id];
    setSavedIds(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); setStorageError(false); }
    catch { setStorageError(true); }
  }, [savedIds]);
  return { savedIds, toggleSaved, storageError };
}
