/**
 * Award-Winning 2026 Homepage
 * Infinite Journey Through Transformation
 * Continuous flying through space with hold-to-accelerate
 */

'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { InfiniteJourney } from '@/components/3d/InfiniteJourney';
import {
  ProcessFlowSection,
  FeaturedBooksSection,
  LatestEssaysSection,
} from '@/components/sections';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';

// Continuous narrative content - floating text overlays
const narrativeOverlays = [
  {
    scrollStart: 0.05,
    scrollEnd: 0.15,
    title: 'THE INFINITE CANVAS',
    subtitle: 'Your Journey Through Transformation',
    description: 'Hold to accelerate. Release to drift. Travel through space and discover yourself.',
  },
  {
    scrollStart: 0.2,
    scrollEnd: 0.35,
    title: 'COSMIC BIRTH',
    subtitle: 'From Stardust to Consciousness',
    description: 'We begin as scattered atoms in the void—potential energy waiting to coalesce.',
  },
  {
    scrollStart: 0.4,
    scrollEnd: 0.55,
    title: 'THE AWAKENING',
    subtitle: 'First Light Breaking Through',
    description: 'Like a star igniting in the darkness, awareness dawns within you.',
  },
  {
    scrollStart: 0.6,
    scrollEnd: 0.75,
    title: 'TRANSFORMATION',
    subtitle: 'The Great Metamorphosis',
    description: 'Like matter transforming into energy, you shed old forms and embrace new potential.',
  },
  {
    scrollStart: 0.8,
    scrollEnd: 0.95,
    title: 'SELF-ACTUALIZATION',
    subtitle: 'Becoming Your Own Supernova',
    description: 'You radiate light into the cosmos. A star burning with purpose.',
  },
];

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });

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
    <main className="min-h-screen bg-black">
      {/* Fixed 3D Canvas - Infinite Journey */}
      <div className="fixed top-0 left-0 w-screen h-screen z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
        >
          <InfiniteJourney scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* Scrollable narrative overlays - fade in/out based on scroll */}
      <div className="relative z-10">
        {/* Spacer sections for scroll */}
        {narrativeOverlays.map((overlay, index) => (
          <section
            key={index}
            className="min-h-screen flex items-center justify-center px-6 pointer-events-none"
          >
            <div
              className={`max-w-3xl transition-all duration-1000 ${
                scrollProgress >= overlay.scrollStart && scrollProgress <= overlay.scrollEnd
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-12 border border-white/10 pointer-events-auto shadow-2xl">
                <h2 className="text-6xl font-bold text-white mb-3">
                  {overlay.title}
                </h2>
                <h3 className="text-2xl text-[var(--accent-warm)] mb-6 italic font-light">
                  {overlay.subtitle}
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {overlay.description}
                </p>
              </div>
            </div>
          </section>
        ))}

        {/* Transition to regular content */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-black to-[var(--bg-primary)]">
          <div className="max-w-3xl text-center px-6 pointer-events-auto">
            <h2 className="text-5xl font-bold text-white mb-8">
              Your Infinite Journey Begins
            </h2>
            <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
              Like stars in the night sky, we guide you through the infinite expanse of your potential.
            </p>
            <a
              href="#process"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[var(--accent-warm)] via-purple-500 to-[var(--accent-warm)] bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-lg text-white font-semibold shadow-2xl hover:shadow-[0_0_40px_rgba(196,163,90,0.6)] transition-all duration-500"
            >
              Begin Transformation →
            </a>
          </div>
        </section>
      </div>

      {/* Regular sections below journey */}
      <div id="process" className="bg-[var(--bg-primary)]">
        <ProcessFlowSection />
      </div>

      <FeaturedBooksSection />

      <LatestEssaysSection />

      {/* Footer */}
      <footer className="bg-[var(--olive-dark)] text-[var(--bg-primary)] py-[var(--space-2xl)]">
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-md)] text-center">
          <p className="text-lg mb-[var(--space-sm)]">
            We Are All Made of Stardust
          </p>
          <p className="small opacity-70">
            © 2026 The Self Actualized Life. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
