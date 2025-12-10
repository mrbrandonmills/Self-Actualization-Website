/**
 * MobilePageFlipBook - Mobile-optimized page-flipping book experience
 * COPY of PageFlipBook for mobile with lighter images
 * Uses react-pageflip for natural page turning physics
 */

'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';

interface MobilePageFlipBookProps {
  onPageFlip?: (page: number) => void;
  onComplete?: () => void;
}

// Page component with forward ref for react-pageflip
const PageComponent = React.forwardRef<HTMLDivElement, { pageNumber: number; imageUrl: string }>(
  ({ pageNumber, imageUrl }, ref) => {
    return (
      <div ref={ref} className="page-wrapper">
        <div className="page-content">
          <Image
            src={imageUrl}
            alt={`Page ${pageNumber}`}
            fill
            className="page-image"
            priority={pageNumber <= 5}
            quality={80}
            sizes="100vw"
          />
        </div>
      </div>
    );
  }
);

PageComponent.displayName = 'MobilePageComponent';

export function MobilePageFlipBook({ onPageFlip, onComplete }: MobilePageFlipBookProps) {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages] = useState(87);
  const [dimensions, setDimensions] = useState({ width: 320, height: 450 });

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

  const handleFlip = useCallback(
    (e: any) => {
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

  const nextPage = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  const prevPage = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };

  // Generate all 87 pages - using mobile WebP images
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mobile-book-container">
      {/* Book Flip Component */}
      <div className="mobile-book-wrapper">
        <HTMLFlipBook
          ref={bookRef}
          width={dimensions.width}
          height={dimensions.height}
          size="stretch"
          minWidth={280}
          maxWidth={450}
          minHeight={350}
          maxHeight={650}
          maxShadowOpacity={0.3}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          className="mobile-flip-book"
          style={{}}
          startPage={0}
          drawShadow={true}
          flippingTime={800}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
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
