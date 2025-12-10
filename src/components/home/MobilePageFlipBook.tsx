/**
 * MobilePageFlipBook - Mobile-optimized page-flipping book experience
 * COPY of PageFlipBook for mobile with lighter images
 * Uses react-pageflip for natural page turning physics
 *
 * Fixes applied:
 * - Image error handling with retry logic
 * - Lazy loading (only load pages near current)
 * - Scroll lock when book is active
 * - Loading state with progress
 * - Proper TypeScript types
 */

'use client';

import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';

interface MobilePageFlipBookProps {
  onPageFlip?: (page: number) => void;
  onComplete?: () => void;
}

// Page component with forward ref for react-pageflip
const PageComponent = React.forwardRef<
  HTMLDivElement,
  { pageNumber: number; imageUrl: string; shouldLoad: boolean }
>(({ pageNumber, imageUrl, shouldLoad }, ref) => {
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Retry logic for failed images
  const handleError = useCallback(() => {
    if (retryCount < 2) {
      // Retry up to 2 times with delay
      setTimeout(() => setRetryCount((prev) => prev + 1), 1000);
    } else {
      setHasError(true);
    }
  }, [retryCount]);

  return (
    <div ref={ref} className="page-wrapper">
      <div className="page-content">
        {hasError ? (
          <div className="page-error">
            <p>Page {pageNumber}</p>
            <button onClick={() => { setHasError(false); setRetryCount(0); }}>
              Retry
            </button>
          </div>
        ) : shouldLoad ? (
          <>
            {!isLoaded && (
              <div className="page-loading">
                <div className="loading-spinner" />
              </div>
            )}
            <Image
              key={retryCount} // Force re-render on retry
              src={imageUrl}
              alt={`Page ${pageNumber}`}
              fill
              className={`page-image ${isLoaded ? 'loaded' : ''}`}
              priority={pageNumber <= 3}
              quality={80}
              sizes="100vw"
              onLoad={() => setIsLoaded(true)}
              onError={handleError}
            />
          </>
        ) : (
          <div className="page-placeholder">
            <span>{pageNumber}</span>
          </div>
        )}
      </div>
    </div>
  );
});

PageComponent.displayName = 'MobilePageComponent';

// Type for HTMLFlipBook ref
interface FlipBookApi {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    flip: (page: number) => void;
    getCurrentPageIndex: () => number;
  };
}

export function MobilePageFlipBook({ onPageFlip, onComplete }: MobilePageFlipBookProps) {
  const bookRef = useRef<FlipBookApi | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages] = useState(87);
  const [dimensions, setDimensions] = useState({ width: 320, height: 450 });
  const [isReady, setIsReady] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  // Pages to load: current page ± buffer for smooth flipping
  const pagesToLoad = useMemo(() => {
    const buffer = 5; // Load 5 pages ahead and behind
    const pages = new Set<number>();
    for (let i = Math.max(1, currentPage - buffer); i <= Math.min(totalPages, currentPage + buffer + 1); i++) {
      pages.add(i);
    }
    // Always load first 5 pages for initial view
    for (let i = 1; i <= 5; i++) {
      pages.add(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  // Lock body scroll when book is active
  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${window.scrollY}px`;

    // Prevent pull-to-refresh on iOS
    document.body.style.overscrollBehavior = 'none';

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overscrollBehavior = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, []);

  // Mobile-focused sizing
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Mobile-optimized dimensions
      setDimensions({
        width: Math.min(width * 0.92, 400),
        height: Math.min(height * 0.65, 600),
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Simulate initial loading (first 5 pages)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleFlip = useCallback(
    (e: { data: number }) => {
      const newPage = e.data;
      setCurrentPage(newPage);
      onPageFlip?.(newPage);

      // Call onComplete when reaching last page
      if (newPage >= totalPages - 2) {
        onComplete?.();
      }
    },
    [onPageFlip, onComplete, totalPages]
  );

  const nextPage = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext();
  }, []);

  const prevPage = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev();
  }, []);

  // Generate all 87 pages - using mobile WebP images
  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  // Loading screen while first pages load
  if (!isReady) {
    return (
      <div className="mobile-loading-screen">
        <div className="loading-content">
          <div className="loading-book-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <p>Loading book...</p>
        </div>
        <style jsx>{`
          .mobile-loading-screen {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(180deg, #f5f3ef 0%, #e8e6e1 50%, #f0eee9 100%);
          }
          .loading-content {
            text-align: center;
            color: var(--olive-dark, #3d4a3a);
          }
          .loading-book-icon {
            margin-bottom: 1rem;
            animation: pulse 1.5s ease-in-out infinite;
            color: var(--accent-warm, #c4a35a);
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="mobile-book-container">
      {/* Book Flip Component */}
      <div className="mobile-book-wrapper">
        <HTMLFlipBook
          ref={bookRef as React.RefObject<FlipBookApi>}
          width={dimensions.width}
          height={dimensions.height}
          size="stretch"
          minWidth={280}
          maxWidth={450}
          minHeight={350}
          maxHeight={650}
          maxShadowOpacity={0.3}
          showCover={true}
          mobileScrollSupport={false}
          onFlip={handleFlip}
          className="mobile-flip-book"
          startPage={0}
          drawShadow={true}
          flippingTime={800}
          usePortrait={true}
          startZIndex={0}
          autoSize={false}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={20}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {pages.map((pageNum) => (
            <PageComponent
              key={pageNum}
              pageNumber={pageNum}
              imageUrl={`/book-pages-mobile/${pageNum}.webp`}
              shouldLoad={pagesToLoad.has(pageNum)}
            />
          ))}
        </HTMLFlipBook>
      </div>

      {/* Swipe Hint */}
      <div className="swipe-hint">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
        </svg>
        <span>Swipe to flip pages</span>
      </div>

      {/* Navigation Controls */}
      <div className="mobile-book-controls">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="mobile-control-btn"
          aria-label="Previous page"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="mobile-page-indicator">
          <span className="mobile-current">{currentPage + 1}</span>
          <span className="mobile-sep">/</span>
          <span className="mobile-total">{totalPages}</span>
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1}
          className="mobile-control-btn"
          aria-label="Next page"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mobile-progress-container">
        <div
          className="mobile-progress-bar"
          style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
        />
      </div>

      <style jsx>{`
        .mobile-book-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 1rem;
          background: linear-gradient(180deg, #f5f3ef 0%, #e8e6e1 50%, #f0eee9 100%);
          touch-action: pan-y pinch-zoom;
          user-select: none;
          -webkit-user-select: none;
        }

        .mobile-book-wrapper {
          position: relative;
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.2));
        }

        :global(.mobile-flip-book) {
          margin: 0 auto;
        }

        :global(.mobile-book-container .page-wrapper) {
          position: relative;
          width: 100%;
          height: 100%;
          background: #ffffff;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.05);
        }

        :global(.mobile-book-container .page-content) {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        :global(.mobile-book-container .page-image) {
          object-fit: contain;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        :global(.mobile-book-container .page-image.loaded) {
          opacity: 1;
        }

        :global(.mobile-book-container .page-loading) {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fafafa;
        }

        :global(.mobile-book-container .loading-spinner) {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(196, 163, 90, 0.2);
          border-top-color: var(--accent-warm, #c4a35a);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        :global(.mobile-book-container .page-placeholder) {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
          color: #ccc;
          font-size: 24px;
        }

        :global(.mobile-book-container .page-error) {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fafafa;
          color: var(--olive-dark, #3d4a3a);
          gap: 0.5rem;
        }

        :global(.mobile-book-container .page-error button) {
          padding: 0.5rem 1rem;
          background: var(--accent-warm, #c4a35a);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .swipe-hint {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--olive-dark, #3d4a3a);
          opacity: 0.6;
          font-size: 13px;
          margin-bottom: 1rem;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }

        .mobile-book-controls {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }

        .mobile-control-btn {
          background: rgba(196, 163, 90, 0.15);
          border: 2px solid var(--accent-warm, #c4a35a);
          color: var(--accent-warm, #c4a35a);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .mobile-control-btn:active:not(:disabled) {
          background: rgba(196, 163, 90, 0.3);
          transform: scale(0.95);
        }

        .mobile-control-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .mobile-page-indicator {
          font-family: 'Georgia', serif;
          font-size: 15px;
          color: var(--olive-dark, #3d4a3a);
          display: flex;
          align-items: baseline;
          gap: 0.3rem;
          min-width: 70px;
          justify-content: center;
        }

        .mobile-current {
          font-size: 18px;
          font-weight: 600;
          color: var(--accent-warm, #c4a35a);
        }

        .mobile-sep {
          opacity: 0.5;
        }

        .mobile-total {
          opacity: 0.7;
        }

        .mobile-progress-container {
          width: 100%;
          max-width: 300px;
          height: 3px;
          background: rgba(196, 163, 90, 0.2);
          border-radius: 10px;
          overflow: hidden;
        }

        .mobile-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-warm, #c4a35a) 0%, #d4a574 100%);
          transition: width 0.4s ease;
        }
      `}</style>
    </div>
  );
}
