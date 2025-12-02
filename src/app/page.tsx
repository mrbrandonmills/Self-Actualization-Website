/**
 * Award-Winning 2026 Homepage
 * KASANÉ-Style 3D Book Journey - Action Movie Hero Experience
 * 87 Pages Flying Through Space with Dynamic Camera
 */

'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { KasaneBookJourney } from '@/components/3d/KasaneBookJourney';
import {
  ProcessFlowSection,
  FeaturedBooksSection,
  LatestEssaysSection,
} from '@/components/sections';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';

// Narrative overlays that appear as you scroll through the 3D journey
const narrativeOverlays = [
  {
    scrollStart: 0.0,
    scrollEnd: 0.12,
    title: 'THE JOURNEY BEGINS',
    subtitle: 'Random Acts of Self-Actualization',
    description: 'Scroll to fly through 87 pages of transformation.',
  },
  {
    scrollStart: 0.15,
    scrollEnd: 0.28,
    title: 'BUILDING BLOCK A',
    subtitle: 'Foundation of Awareness',
    description: 'Watch as pages spiral through space, each one a step toward understanding.',
  },
  {
    scrollStart: 0.3,
    scrollEnd: 0.45,
    title: 'BUILDING BLOCK B',
    subtitle: 'Patterns of Growth',
    description: 'Multi-dimensional wisdom rotating before your eyes.',
  },
  {
    scrollStart: 0.48,
    scrollEnd: 0.62,
    title: 'THE LABORATORY',
    subtitle: 'Block C: Where Theory Meets Practice',
    description: 'Flying through the experiments that change everything.',
  },
  {
    scrollStart: 0.65,
    scrollEnd: 0.78,
    title: 'INTEGRATION',
    subtitle: 'All Blocks Converge',
    description: 'As pages align, so does your understanding.',
  },
  {
    scrollStart: 0.8,
    scrollEnd: 0.95,
    title: 'SELF-ACTUALIZATION',
    subtitle: 'The Complete Trilogy',
    description: 'You\'ve witnessed all 87 pages. Now, begin your own journey.',
  },
];

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.5,
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
    <main className="min-h-screen">
      {/* Fixed 3D Canvas - KASANÉ Action Movie Hero */}
      <div className="fixed top-0 left-0 w-screen h-screen z-0">
        <Canvas
          camera={{ position: [0, 0, 50], fov: 75 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
        >
          <KasaneBookJourney scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* Scrollable narrative overlays */}
      <div className="relative z-10">
        {/* Spacer sections for scroll journey */}
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
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-12 border border-[var(--accent-warm)]/20 pointer-events-auto shadow-2xl">
                <h2 className="text-6xl font-bold text-[var(--olive-dark)] mb-3">
                  {overlay.title}
                </h2>
                <h3 className="text-2xl text-[var(--accent-warm)] mb-6 italic font-light">
                  {overlay.subtitle}
                </h3>
                <p className="text-xl text-[var(--olive-dark)]/80 leading-relaxed">
                  {overlay.description}
                </p>
              </div>
            </div>
          </section>
        ))}

        {/* Transition to regular content */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f5f5f0] via-[#faf8f5] to-[var(--bg-primary)]">
          <div className="max-w-3xl text-center px-6 pointer-events-auto">
            <h2 className="text-5xl font-bold text-[var(--olive-dark)] mb-8">
              Your Journey Through 87 Pages
            </h2>
            <p className="text-2xl text-[var(--olive-dark)]/70 mb-12 leading-relaxed">
              You've witnessed all three Building Blocks flying through space.
              <br />
              Now it's time to dive deeper into the transformative process.
            </p>
            <a
              href="#process"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[var(--accent-warm)] via-[#d4a574] to-[var(--accent-warm)] bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-lg text-white font-semibold shadow-2xl hover:shadow-[0_0_40px_rgba(196,163,90,0.6)] transition-all duration-500"
            >
              Begin Your Transformation →
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
