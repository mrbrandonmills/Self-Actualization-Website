'use client'

import { MuseumScene } from '@/components/museum3d/MuseumScene'

/**
 * Journey Page - 3D Museum Experience
 *
 * Scroll through a cinematic 3D museum with 8 sculptural stop markers
 * representing different sections of the site.
 *
 * Features:
 * - Scroll-based camera flight
 * - Interactive hover effects
 * - Museum-quality lighting
 * - Post-processing effects
 * - Particle systems
 */
export default function JourneyPage() {
  return (
    <main className="journey-page">
      {/* 3D Museum Scene */}
      <MuseumScene />

      {/* Scroll Content - Creates scroll distance for camera flight */}
      <div className="scroll-spacer" />

      {/* Instructions Overlay */}
      <div className="journey-instructions">
        <div className="instruction-content">
          <h2>The Museum Journey</h2>
          <p>Scroll to explore</p>
          <p className="instruction-hint">Hover over the camera to interact</p>
        </div>
      </div>

      <style jsx>{`
        .journey-page {
          position: relative;
          background: var(--color-black-green);
          overflow-x: hidden;
        }

        /* Create scroll distance for camera animation */
        .scroll-spacer {
          height: 500vh; /* 5x viewport height for smooth scrolling */
          pointer-events: none;
        }

        /* Instructions Overlay */
        .journey-instructions {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          pointer-events: none;
          opacity: 0.8;
          transition: opacity 0.5s ease;
        }

        .journey-instructions:hover {
          opacity: 0.3;
        }

        .instruction-content {
          text-align: center;
          color: var(--color-text-primary);
        }

        .instruction-content h2 {
          font-family: var(--font-serif);
          font-size: var(--font-size-h2);
          font-weight: var(--font-weight-light);
          color: var(--color-accent-gold);
          margin-bottom: var(--space-md);
          letter-spacing: var(--tracking-wide);
        }

        .instruction-content p {
          font-family: var(--font-sans);
          font-size: var(--font-size-body);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-sm);
          text-transform: uppercase;
          letter-spacing: var(--tracking-widest);
        }

        .instruction-hint {
          font-size: var(--font-size-small);
          color: var(--color-text-tertiary);
          opacity: 0.7;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .instruction-content h2 {
            font-size: var(--font-size-h3);
          }

          .instruction-content p {
            font-size: var(--font-size-small);
          }
        }
      `}</style>
    </main>
  )
}
