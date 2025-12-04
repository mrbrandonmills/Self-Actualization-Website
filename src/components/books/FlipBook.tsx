/**
 * FlipBook Component - Realistic Page Turn Physics
 * CSS-based 3D flip with page curl effect
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface FlipBookProps {
  pages: string[]; // Array of image paths
  bookTitle: string;
  onClose?: () => void;
  amazonUrl: string;
}

export function FlipBook({ pages, bookTitle, onClose, amazonUrl }: FlipBookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const totalPages = pages.length;

  const nextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
      if (e.key === 'Escape' && onClose) onClose();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, isFlipping]);

  const isLastPage = currentPage === totalPages - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flip-book-overlay"
      onClick={onClose}
    >
      <div className="flip-book-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="flip-book-close" onClick={onClose}>
          ✕
        </button>

        {/* Book Title */}
        <div className="flip-book-header">
          <h2 className="flip-book-title">{bookTitle}</h2>
          <p className="flip-book-page-counter">
            Page {currentPage + 1} of {totalPages}
          </p>
        </div>

        {/* Flip Book Display */}
        <div className="flip-book-stage">
          <div className={`flip-book-page-wrapper ${isFlipping ? 'flipping' : ''}`}>
            {/* Current Page */}
            <div className="flip-book-page current-page">
              <Image
                src={pages[currentPage]}
                alt={`Page ${currentPage + 1}`}
                fill
                className="flip-book-page-image"
                sizes="80vw"
                priority
              />
            </div>

            {/* Next Page (for flip animation) */}
            {currentPage < totalPages - 1 && (
              <div className={`flip-book-page next-page ${isFlipping ? 'flipping-forward' : ''}`}>
                <Image
                  src={pages[currentPage + 1]}
                  alt={`Page ${currentPage + 2}`}
                  fill
                  className="flip-book-page-image"
                  sizes="80vw"
                />
              </div>
            )}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flip-book-controls">
          <button
            className="flip-book-nav-btn prev"
            onClick={prevPage}
            disabled={currentPage === 0 || isFlipping}
          >
            ← Previous
          </button>

          <div className="flip-book-progress">
            <div
              className="flip-book-progress-bar"
              style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
            />
          </div>

          <button
            className="flip-book-nav-btn next"
            onClick={nextPage}
            disabled={isLastPage || isFlipping}
          >
            Next →
          </button>
        </div>

        {/* Amazon CTA (appears on all pages) */}
        <motion.a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flip-book-amazon-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          📚 Buy on Amazon
        </motion.a>
      </div>

      <style jsx global>{`
        /* Overlay */
        .flip-book-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5, 32, 31, 0.96);
          backdrop-filter: blur(20px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        /* Container */
        .flip-book-container {
          position: relative;
          width: 100%;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* Close Button */
        .flip-book-close {
          position: absolute;
          top: -2.5rem;
          right: 0;
          width: 40px;
          height: 40px;
          background: #C9A050;
          border: none;
          border-radius: 50%;
          color: #05201f;
          font-size: 1.5rem;
          font-weight: 300;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 10;
        }

        .flip-book-close:hover {
          background: #d4af37;
          transform: rotate(90deg) scale(1.1);
        }

        /* Header */
        .flip-book-header {
          text-align: center;
          color: #f5f3ef;
        }

        .flip-book-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }

        .flip-book-page-counter {
          font-size: 0.875rem;
          color: #C9A050;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Stage - 3D Book Display */
        .flip-book-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          perspective: 2000px;
        }

        .flip-book-page-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        /* Pages */
        .flip-book-page {
          position: absolute;
          inset: 0;
          background: #fff;
          border-radius: 8px;
          box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.3),
            0 2px 8px rgba(0, 0, 0, 0.2);
          overflow: hidden;
        }

        .flip-book-page-image {
          object-fit: contain;
          background: #fff;
        }

        /* Current Page */
        .current-page {
          z-index: 2;
        }

        /* Next Page - Flip Animation */
        .next-page {
          z-index: 3;
          transform-origin: left center;
          transform: rotateY(0deg);
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .next-page.flipping-forward {
          transform: rotateY(-180deg);
        }

        /* Flipping State */
        .flip-book-page-wrapper.flipping {
          pointer-events: none;
        }

        /* Controls */
        .flip-book-controls {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .flip-book-nav-btn {
          flex-shrink: 0;
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: 2px solid #C9A050;
          border-radius: 8px;
          color: #C9A050;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .flip-book-nav-btn:hover:not(:disabled) {
          background: #C9A050;
          color: #05201f;
          transform: translateY(-2px);
        }

        .flip-book-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        /* Progress Bar */
        .flip-book-progress {
          flex: 1;
          height: 4px;
          background: rgba(201, 160, 80, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .flip-book-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #C9A050, #d4af37);
          transition: width 0.3s ease;
        }

        /* Amazon CTA */
        .flip-book-amazon-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #C9A050, #d4af37);
          border: none;
          border-radius: 8px;
          color: #05201f;
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 4px 20px rgba(201, 160, 80, 0.4);
          align-self: center;
          text-decoration: none;
        }

        .flip-book-amazon-cta:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(201, 160, 80, 0.6);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .flip-book-overlay {
            padding: 1rem;
          }

          .flip-book-container {
            gap: 1rem;
          }

          .flip-book-close {
            top: -3rem;
            width: 36px;
            height: 36px;
            font-size: 1.25rem;
          }

          .flip-book-controls {
            flex-direction: column;
            gap: 1rem;
          }

          .flip-book-nav-btn {
            width: 100%;
          }

          .flip-book-progress {
            order: -1;
            width: 100%;
          }
        }
      `}</style>
    </motion.div>
  );
}
