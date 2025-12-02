/**
 * Award-Winning 2026 Homepage
 * Realistic Page-Flipping Book Experience
 * Random Acts of Self-Actualization - All 87 Pages
 */

'use client';

import React from 'react';
import { PageFlipBook } from '@/components/Book/PageFlipBook';
import {
  ProcessFlowSection,
  FeaturedBooksSection,
  LatestEssaysSection,
} from '@/components/sections';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';

export default function HomePage() {
  const [hasFlippedPages, setHasFlippedPages] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll for the sections below book
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

    return () => {
      lenis.destroy();
    };
  }, []);

  const handlePageFlip = (page: number) => {
    if (page > 0 && !hasFlippedPages) {
      setHasFlippedPages(true);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section - Page Flip Book */}
      <section className="min-h-screen">
        <PageFlipBook onPageFlip={handlePageFlip} />
      </section>

      {/* Transition Section */}
      <section className="min-h-[50vh] flex items-center justify-center bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[var(--bg-primary)]">
        <div className="max-w-3xl text-center px-6">
          <h2 className="text-5xl font-bold text-white mb-8">
            Your Journey Through Self-Actualization
          </h2>
          <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
            Explore the complete Random Acts of Self-Actualization trilogy.
            <br />
            Building Blocks A, B, and C to transform your life.
          </p>
          <a
            href="#process"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[var(--accent-warm)] via-purple-500 to-[var(--accent-warm)] bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-lg text-white font-semibold shadow-2xl hover:shadow-[0_0_40px_rgba(196,163,90,0.6)] transition-all duration-500"
          >
            Explore More →
          </a>
        </div>
      </section>

      {/* Regular sections below book */}
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
