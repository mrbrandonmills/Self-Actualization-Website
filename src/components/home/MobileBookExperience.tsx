/**
 * MobileBookExperience - Complete mobile book journey
 * Intro -> Swipeable Book -> Outro with CTAs
 * NO WebGL, NO 3D - just smooth page flipping
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { MobilePageFlipBook } from './MobilePageFlipBook';
import Image from 'next/image';

type Phase = 'intro' | 'book' | 'outro';

// Narrative overlays at key pages (matching desktop experience)
const narrativePages: { [key: number]: { title: string; text: string } } = {
  1: { title: 'Welcome', text: 'Your journey of self-discovery begins here.' },
  20: { title: 'The Laboratory', text: 'Where self-actualization meets scientific experimentation.' },
  45: { title: 'Your Experiments', text: 'Life is your laboratory. You are both scientist and subject.' },
  70: { title: 'Transformation', text: 'Every page turned is a step toward becoming.' },
  85: { title: 'The Journey Continues', text: 'This is just the beginning...' },
};

export function MobileBookExperience() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [narrativeOverlay, setNarrativeOverlay] = useState<{ title: string; text: string } | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  // Auto-hide overlay with proper cleanup (fixes memory leak)
  useEffect(() => {
    if (showOverlay) {
      const timer = setTimeout(() => setShowOverlay(false), 2000);
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [showOverlay]);

  // Handle page flip narratives - memoized to prevent re-renders
  const handlePageFlip = useCallback((page: number) => {
    const narrative = narrativePages[page];
    if (narrative) {
      setNarrativeOverlay(narrative);
      setShowOverlay(true);
    }
  }, []);

  // Memoized complete handler
  const handleComplete = useCallback(() => {
    setPhase('outro');
  }, []);

  // Intro Screen
  if (phase === 'intro') {
    return (
      <section className="mobile-intro">
        <div className="intro-content">
          {/* Book Cover Preview */}
          <div className="book-preview">
            <Image
              src="/book-pages-mobile/1.webp"
              alt="The Laboratory of Life"
              width={200}
              height={280}
              className="cover-image"
              priority
            />
            <div className="book-glow" />
          </div>

          {/* Title */}
          <h1 className="intro-title">
            The Laboratory
            <span className="title-accent">of Life</span>
          </h1>

          {/* Subtitle */}
          <p className="intro-subtitle">
            Preview the first 12 pages free. Swipe through your transformation.
          </p>

          {/* CTA Buttons */}
          <div className="intro-actions">
            <button
              onClick={() => setPhase('book')}
              className="start-button"
            >
              Start Reading
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <a href="#process" className="skip-link">
              Skip to Site
            </a>
          </div>
        </div>

        <style jsx>{`
          .mobile-intro {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding: 3.75rem 1.5rem 1rem; /* 3.75rem top to clear compact nav */
            background: linear-gradient(180deg, #f5f3ef 0%, #e8e6e1 50%, #f0eee9 100%);
          }

          .intro-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            max-width: 340px;
          }

          .book-preview {
            position: relative;
            margin-bottom: 2rem;
          }

          :global(.cover-image) {
            border-radius: 4px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15),
                        0 10px 20px rgba(0, 0, 0, 0.1);
          }

          .book-glow {
            position: absolute;
            left: -20px;
            right: -20px;
            bottom: -20px;
            top: 0;
            background: radial-gradient(circle, rgba(196, 163, 90, 0.2) 0%, transparent 70%);
            z-index: -1;
            animation: glow 3s ease-in-out infinite;
          }

          @keyframes glow {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
          }

          .intro-title {
            font-family: 'Georgia', serif;
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--olive-dark, #3d4a3a);
            line-height: 1.1;
            margin-bottom: 1rem;
          }

          .title-accent {
            display: block;
            color: var(--accent-warm, #c4a35a);
          }

          .intro-subtitle {
            font-size: 1rem;
            color: var(--olive-dark, #3d4a3a);
            opacity: 0.7;
            line-height: 1.6;
            margin-bottom: 2rem;
          }

          .intro-actions {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
          }

          .start-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, var(--accent-warm, #c4a35a) 0%, #d4a574 100%);
            color: white;
            font-size: 1.1rem;
            font-weight: 600;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(196, 163, 90, 0.3);
            transition: all 0.2s ease;
            -webkit-tap-highlight-color: transparent;
          }

          .start-button:active {
            transform: scale(0.98);
            box-shadow: 0 2px 10px rgba(196, 163, 90, 0.3);
          }

          .skip-link {
            color: var(--olive-dark, #3d4a3a);
            opacity: 0.6;
            font-size: 0.9rem;
            text-decoration: none;
          }

          .skip-link:active {
            opacity: 0.8;
          }
        `}</style>
      </section>
    );
  }

  // Book Reading Phase
  if (phase === 'book') {
    return (
      <div className="mobile-book-phase">
        <MobilePageFlipBook
          onPageFlip={handlePageFlip}
          onComplete={handleComplete}
        />

        {/* Skip Button */}
        <button
          onClick={() => setPhase('outro')}
          className="skip-to-site"
        >
          Skip to Site
        </button>

        {/* Narrative Overlay */}
        {showOverlay && narrativeOverlay && (
          <div className="narrative-overlay">
            <h3>{narrativeOverlay.title}</h3>
            <p>{narrativeOverlay.text}</p>
          </div>
        )}

        <style jsx>{`
          .mobile-book-phase {
            position: relative;
          }

          .skip-to-site {
            position: fixed;
            bottom: 1.5rem;
            right: 1.5rem;
            padding: 0.75rem 1rem;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(196, 163, 90, 0.3);
            border-radius: 8px;
            color: var(--olive-dark, #3d4a3a);
            font-size: 0.85rem;
            cursor: pointer;
            z-index: 100;
            -webkit-tap-highlight-color: transparent;
          }

          .skip-to-site:active {
            background: rgba(255, 255, 255, 1);
          }

          .narrative-overlay {
            position: fixed;
            bottom: 5rem;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem 1.5rem;
            border-radius: 12px;
            text-align: center;
            max-width: 90%;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            animation: fadeInUp 0.3s ease;
            z-index: 50;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }

          .narrative-overlay h3 {
            font-family: 'Georgia', serif;
            font-size: 1.1rem;
            color: var(--accent-warm, #c4a35a);
            margin-bottom: 0.5rem;
          }

          .narrative-overlay p {
            font-size: 0.9rem;
            color: var(--olive-dark, #3d4a3a);
            opacity: 0.8;
          }
        `}</style>
      </div>
    );
  }

  // Outro Screen
  return (
    <section className="mobile-outro">
      <div className="outro-content">
        <div className="completion-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        <h2 className="outro-title">Journey Complete</h2>
        <p className="outro-text">
          You've glimpsed the laboratory. Now explore the full experience.
        </p>

        <div className="outro-actions">
          <a href="/books" className="primary-cta">
            Get the Full Book
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>

          <a href="#process" className="secondary-cta">
            Continue to Site
          </a>

          <button
            onClick={() => setPhase('book')}
            className="read-again"
          >
            Read Again
          </button>
        </div>
      </div>

      <style jsx>{`
        .mobile-outro {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          background: linear-gradient(180deg, #f5f3ef 0%, #e8e6e1 50%, #f0eee9 100%);
        }

        .outro-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 340px;
        }

        .completion-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(196, 163, 90, 0.2) 0%, rgba(196, 163, 90, 0.1) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: var(--accent-warm, #c4a35a);
        }

        .outro-title {
          font-family: 'Georgia', serif;
          font-size: 2rem;
          font-weight: 700;
          color: var(--olive-dark, #3d4a3a);
          margin-bottom: 0.75rem;
        }

        .outro-text {
          font-size: 1rem;
          color: var(--olive-dark, #3d4a3a);
          opacity: 0.7;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .outro-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        .primary-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, var(--accent-warm, #c4a35a) 0%, #d4a574 100%);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(196, 163, 90, 0.3);
        }

        .secondary-cta {
          padding: 1rem 2rem;
          background: white;
          border: 2px solid var(--accent-warm, #c4a35a);
          color: var(--accent-warm, #c4a35a);
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 12px;
        }

        .read-again {
          padding: 0.75rem;
          background: none;
          border: none;
          color: var(--olive-dark, #3d4a3a);
          opacity: 0.6;
          font-size: 0.9rem;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
