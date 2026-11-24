import { optimizedImages } from './data/optimizedImages';

// Existing data keeps the original asset path. Only rendered image URLs change.
export function imageUrl(source: string, size: 'card' | 'full' = 'full'): string {
  const optimized = optimizedImages[source];
  return (size === 'card' ? optimized?.card : undefined) ?? optimized?.src ?? source;
}
