'use client'

import { BookExplosionScene } from '@/components/book-explosion/BookExplosionScene'

export default function BookExplosionPage() {
  return (
    <main className="book-explosion-page">
      {/* 3D Scene */}
      <div className="scene-container">
        <BookExplosionScene />
      </div>

      {/* Scroll spacer for timeline control */}
      <div className="scroll-spacer" />

      {/* Instructions overlay */}
      <div className="instructions">
        <h2>Random Acts of Self-Actualization</h2>
        <p>Scroll to explore the book in 3D space</p>
      </div>

      <style jsx>{`
        .book-explosion-page {
          position: relative;
          background: #05201f;
          overflow-x: hidden;
        }

        .scene-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 1;
        }

        .scroll-spacer {
          position: relative;
          height: 500vh;
          z-index: 0;
          pointer-events: none;
        }

        .instructions {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          text-align: center;
          color: var(--color-text-primary, #ffffff);
          pointer-events: none;
          opacity: 0.9;
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
        }

        .book-explosion-page:hover .instructions {
          opacity: 0.3;
        }

        .instructions h2 {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: var(--font-size-h2, 3rem);
          color: var(--color-accent-gold, #C9A050);
          margin-bottom: var(--space-md, 1.5rem);
          letter-spacing: var(--tracking-tight, -0.02em);
          font-weight: 600;
        }

        .instructions p {
          font-family: var(--font-sans, -apple-system, sans-serif);
          font-size: var(--font-size-small, 0.875rem);
          color: var(--color-text-secondary, rgba(255, 255, 255, 0.7));
          text-transform: uppercase;
          letter-spacing: var(--tracking-widest, 0.15em);
          font-weight: 300;
        }
      `}</style>
    </main>
  )
}
