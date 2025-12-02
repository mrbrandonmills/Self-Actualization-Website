/**
 * Journey3DCanvas - Reusable Fixed 3D Canvas with Scroll-Driven Journey
 * Key Architecture:
 * 1. Fixed 3D canvas (stays in place)
 * 2. Scrollable narrative content (triggers camera movement)
 * 3. Lenis smooth scroll
 * 4. Scroll progress drives 3D camera journey
 */

'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import Lenis from 'lenis';

interface Journey3DCanvasProps {
  children: (currentChapter: number, scrollProgress: number) => ReactNode;
  journeyComponent: (scrollProgress: number) => ReactNode;
  chapterCount: number;
  showProgressIndicator?: boolean;
}

function useCurrentChapter(scrollProgress: number, chapterCount: number): number {
  return Math.min(
    Math.floor(scrollProgress * chapterCount),
    chapterCount - 1
  );
}

export function Journey3DCanvas({
  journeyComponent,
  chapterCount,
  children,
  showProgressIndicator = true,
}: Journey3DCanvasProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentChapter = useCurrentChapter(scrollProgress, chapterCount);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update scroll progress
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Fixed 3D Canvas - stays in place while user scrolls */}
      <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          shadows
          dpr={[1, 2]}
        >
          {journeyComponent(scrollProgress)}
        </Canvas>
      </div>

      {/* Scrollable narrative content - triggers 3D camera movement */}
      <div className="relative z-10">
        {children(currentChapter, scrollProgress)}
      </div>

      {/* Progress indicator */}
      {showProgressIndicator && (
        <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md rounded-lg px-4 py-3 border border-white/10">
            <div className="text-xs text-gray-400 mb-2">JOURNEY PROGRESS</div>
            <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--accent-warm)] to-[var(--olive-light)] transition-all duration-300"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <div className="text-sm text-white mt-2">
              Chapter {currentChapter + 1}/{chapterCount}
            </div>
          </div>
        </div>
      )}

      {/* Interactive instruction (always show) */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <div className="bg-black/80 backdrop-blur-md rounded-lg px-6 py-3 border border-[var(--accent-warm)]/30">
          <p className="text-white text-sm text-center">
            <span className="text-[var(--accent-warm)] font-semibold">HOLD MOUSE</span> to fly faster through space
          </p>
        </div>
      </div>

      {/* Scroll indicator (only show at top) */}
      {scrollProgress < 0.05 && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 animate-bounce pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md rounded-full p-4 border border-white/10">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
          <p className="text-white text-sm mt-2 text-center">Scroll to begin journey</p>
        </div>
      )}
    </>
  );
}
