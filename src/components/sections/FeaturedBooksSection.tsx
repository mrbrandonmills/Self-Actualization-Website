/**
 * Featured Books Section - Award-Winning 2026 Homepage
 * MODULE 3 + 7: Horizontal Scroll + Gallery Display
 * True GSAP horizontal pinned scrolling (Kasane Keyboard style)
 */

'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { Section } from '../ui';
import { gsap } from '@/lib/gsap';

interface Book {
  title: string;
  author: string;
  category: string;
  description: string;
  color: string;
}

const featuredBooks: Book[] = [
  {
    title: 'The Infinite Garden',
    author: 'Elena Rodriguez',
    category: 'Literary Fiction',
    description: 'A meditation on growth, loss, and the cycles that bind us to the earth.',
    color: '#8A9A6A',
  },
  {
    title: 'Echoes of Silence',
    author: 'Marcus Chen',
    category: 'Philosophy',
    description: 'Exploring the profound wisdom found in moments of stillness and reflection.',
    color: '#C4A35A',
  },
  {
    title: 'Paper Cities',
    author: 'Sofia Patel',
    category: 'Urban Studies',
    description: 'How architecture shapes our dreams and memories in the modern metropolis.',
    color: '#6B7B4C',
  },
  {
    title: 'The Last Botanist',
    author: 'Jean-Pierre Moreau',
    category: 'Science Fiction',
    description: 'A visionary tale of preservation and rebirth in a world without green.',
    color: '#3D4A23',
  },
  {
    title: 'Rhythms Unspoken',
    author: 'Amara Williams',
    category: 'Poetry',
    description: 'Verses that dance between the sacred and the everyday.',
    color: '#E85D04',
  },
];

export function FeaturedBooksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!triggerRef.current || !sliderRef.current) return;

    const slider = sliderRef.current;
    const cards = slider.children;

    // Calculate total scroll width
    const totalWidth = slider.scrollWidth - window.innerWidth;

    // Create horizontal scroll animation
    const tween = gsap.to(slider, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate individual cards as they come into view
    gsap.from(cards, {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
    };
  }, []);

  return (
    <Section spacing="none" background="tertiary">
      <div ref={sectionRef}>
        {/* Section Header */}
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-md)] py-[var(--space-2xl)]">
          <h2 className="h2 mb-[var(--space-md)]">Featured Titles</h2>
          <p className="lead">
            Curated selections from our latest acquisitions and timeless classics
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div ref={triggerRef} className="overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-[var(--space-xl)] px-[var(--space-md)] py-[var(--space-xl)]"
            style={{ width: 'max-content' }}
          >
            {featuredBooks.map((book, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-96 group cursor-pointer"
            >
              {/* Book Card */}
              <div className="relative h-[500px] rounded-lg overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                {/* Color Block (placeholder for book cover) */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                  style={{ backgroundColor: book.color }}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-[var(--space-xl)] flex flex-col justify-end">
                  <span className="label text-white/70 mb-[var(--space-sm)]">
                    {book.category}
                  </span>

                  <h3 className="h3 text-white mb-[var(--space-sm)]">
                    {book.title}
                  </h3>

                  <p className="text-lg text-white/90 mb-[var(--space-md)]">
                    by {book.author}
                  </p>

                  <p className="text-white/80 leading-relaxed mb-[var(--space-lg)] line-clamp-3">
                    {book.description}
                  </p>

                  <button className="self-start px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-md hover:bg-white/30 transition-all border border-white/30">
                    Discover More
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="text-center py-[var(--space-xl)] px-[var(--space-md)]">
          <p className="text-muted">
            Scroll down to explore our collection →
          </p>
        </div>
      </div>
    </Section>
  );
}
