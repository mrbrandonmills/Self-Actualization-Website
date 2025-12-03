/**
 * useBookPreloader - Preloads all 87 book page textures + cover
 * Returns progress (0-100) for loading screen
 */

import { useState, useEffect } from 'react';

export function useBookPreloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const totalAssets = 88; // 87 pages + 1 cover
    let loadedAssets = 0;

    // Array of all assets to preload
    const assetUrls = [
      '/textures/books/block-a-b-cover.png', // Book cover
      ...Array.from({ length: 87 }, (_, i) => `/book-pages/${i + 1}.png`), // All 87 pages
    ];

    // Preload each asset
    const preloadPromises = assetUrls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          loadedAssets++;
          setProgress(Math.round((loadedAssets / totalAssets) * 100));
          resolve();
        };

        img.onerror = () => {
          console.warn(`Failed to preload: ${url}`);
          loadedAssets++;
          setProgress(Math.round((loadedAssets / totalAssets) * 100));
          resolve(); // Continue even if one fails
        };

        img.src = url;
      });
    });

    // Wait for all assets to load
    Promise.all(preloadPromises).then(() => {
      setProgress(100);
      setIsLoaded(true);
    });
  }, []);

  return { progress, isLoaded };
}
