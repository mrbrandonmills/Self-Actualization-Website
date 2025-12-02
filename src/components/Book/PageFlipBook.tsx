/**
 * PageFlipBook - Realistic page-flipping book experience
 * Uses react-pageflip for natural page turning physics
 * All 87 pages from "Random Acts of Self-Actualization" book
 */

'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';

interface PageFlipBookProps {
  onPageFlip?: (page: number) => void;
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
            priority={pageNumber <= 4} // Prioritize first few pages
            quality={90}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="page-number">{pageNumber}</div>
      </div>
    );
  }
);

PageComponent.displayName = 'PageComponent';

export function PageFlipBook({ onPageFlip }: PageFlipBookProps) {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages] = useState(87);
  const [dimensions, setDimensions] = useState({ width: 500, height: 700 });

  // Responsive book sizing
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width < 768) {
        // Mobile
        setDimensions({
          width: width * 0.9,
          height: height * 0.7,
        });
      } else if (width < 1024) {
        // Tablet
        setDimensions({
          width: 400,
          height: 550,
        });
      } else {
        // Desktop - beautiful large book
        setDimensions({
          width: 500,
          height: 700,
        });
      }
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
    },
    [onPageFlip]
  );

  const nextPage = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  const prevPage = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };

  const goToPage = (page: number) => {
    bookRef.current?.pageFlip()?.flip(page);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevPage();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToPage(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToPage(totalPages - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  // Generate all 87 pages
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="book-container">
      {/* Book Flip Component */}
      <div className="book-wrapper">
        <HTMLFlipBook
          ref={bookRef}
          width={dimensions.width}
          height={dimensions.height}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          className="flip-book"
          style={{}}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {pages.map((pageNum) => (
            <PageComponent
              key={pageNum}
              pageNumber={pageNum}
              imageUrl={`/book-pages/${pageNum}.png`}
            />
          ))}
        </HTMLFlipBook>
      </div>

      {/* Navigation Controls */}
      <div className="book-controls">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="control-btn prev-btn"
          aria-label="Previous page"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="page-indicator">
          <span className="current-page">{currentPage + 1}</span>
          <span className="separator">/</span>
          <span className="total-pages">{totalPages}</span>
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1}
          className="control-btn next-btn"
          aria-label="Next page"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
        />
      </div>

      {/* Instruction Text */}
      <div className="instruction-text">
        Click on page corners or use arrow keys to flip pages
      </div>

      <style jsx>{`
        .book-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          position: relative;
        }

        .book-wrapper {
          position: relative;
          margin-bottom: 3rem;
          filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5));
        }

        :global(.flip-book) {
          margin: 0 auto;
        }

        :global(.page-wrapper) {
          position: relative;
          width: 100%;
          height: 100%;
          background: #ffffff;
          box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.1);
        }

        :global(.page-content) {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        :global(.page-image) {
          object-fit: contain;
          width: 100%;
          height: 100%;
        }

        :global(.page-number) {
          position: absolute;
          bottom: 20px;
          right: 20px;
          font-family: 'Georgia', serif;
          font-size: 14px;
          color: #666;
          font-weight: 300;
        }

        .book-controls {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 1.5rem;
        }

        .control-btn {
          background: rgba(196, 163, 90, 0.1);
          border: 2px solid #c4a35a;
          color: #c4a35a;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .control-btn:hover:not(:disabled) {
          background: rgba(196, 163, 90, 0.2);
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(196, 163, 90, 0.3);
        }

        .control-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .page-indicator {
          font-family: 'Georgia', serif;
          font-size: 18px;
          color: #c4a35a;
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          min-width: 100px;
          justify-content: center;
        }

        .current-page {
          font-size: 24px;
          font-weight: 600;
        }

        .separator {
          font-size: 16px;
          opacity: 0.5;
        }

        .total-pages {
          font-size: 16px;
          opacity: 0.7;
        }

        .progress-container {
          width: 100%;
          max-width: 600px;
          height: 3px;
          background: rgba(196, 163, 90, 0.2);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #c4a35a 0%, #ffd700 100%);
          transition: width 0.5s ease;
          box-shadow: 0 0 10px rgba(196, 163, 90, 0.5);
        }

        .instruction-text {
          font-family: 'Georgia', serif;
          font-size: 14px;
          color: rgba(196, 163, 90, 0.6);
          text-align: center;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .book-container {
            padding: 1rem;
          }

          .control-btn {
            width: 40px;
            height: 40px;
          }

          .page-indicator {
            font-size: 14px;
            min-width: 80px;
          }

          .current-page {
            font-size: 18px;
          }

          .instruction-text {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}
