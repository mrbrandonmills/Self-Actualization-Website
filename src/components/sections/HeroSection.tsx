/**
 * Hero Section - Award-Winning 2026 Homepage
 * MODULE 1 placeholder: 3D Book concept
 * Full 3D implementation would use React Three Fiber
 */

'use client';

import React from 'react';
import { Button } from '../ui/Button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg-primary)]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-tertiary)] opacity-60" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-[var(--space-md)] py-[var(--space-4xl)] text-center">
        {/* Playful Display Headline */}
        <h1 className="headline-playful mb-[var(--space-xl)]">
          Stories That
          <br />
          <span className="text-[var(--accent-warm)]">Transform</span>
        </h1>

        {/* Lead paragraph */}
        <p className="lead mx-auto mb-[var(--space-2xl)] max-w-[var(--content-width-prose)]">
          Where words become worlds, and ideas ignite possibilities.
          Discover a curated collection of narratives that challenge,
          inspire, and elevate the human experience.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-[var(--space-md)] justify-center">
          <Button variant="primary" size="lg">
            Explore Books
          </Button>
          <Button variant="outline" size="lg">
            Latest Essays
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-[var(--space-4xl)] flex flex-col items-center gap-[var(--space-sm)]">
          <span className="label text-[var(--text-muted)]">Scroll to Discover</span>
          <div className="w-[1px] h-16 bg-[var(--olive-mid)] animate-pulse" />
        </div>
      </div>

      {/* Decorative element - would be 3D book in full implementation */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[var(--accent-warm)] opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[var(--olive-light)] opacity-10 rounded-full blur-3xl" />
    </section>
  );
}
