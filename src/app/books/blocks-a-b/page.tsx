'use client'

export default function BookExplosionPage() {
  return (
    <main className="book-explosion-page">
      {/* 3D Scene will go here */}
      <div className="scene-container" />

      {/* Scroll spacer for timeline control */}
      <div className="scroll-spacer" />

      {/* Instructions overlay */}
      <div className="instructions">
        <h2>Scroll to Explore</h2>
        <p>Experience the book in 3D space</p>
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
          color: var(--color-text-primary);
          pointer-events: none;
          opacity: 0.8;
          transition: opacity 0.5s ease;
        }

        .instructions h2 {
          font-family: var(--font-serif);
          font-size: var(--font-size-h2);
          color: var(--color-accent-gold);
          margin-bottom: var(--space-md);
        }

        .instructions p {
          font-family: var(--font-sans);
          font-size: var(--font-size-body);
          text-transform: uppercase;
          letter-spacing: var(--tracking-widest);
        }
      `}</style>
    </main>
  )
}
