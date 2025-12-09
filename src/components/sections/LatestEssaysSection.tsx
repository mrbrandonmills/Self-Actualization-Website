/**
 * Latest Essays Section - Award-Winning 2026 Homepage
 * MODULE 5: Editorial Content Presentation with Pull Quotes
 * Features: Pull quote hero, author cards, numbered sections
 * Enhanced with GSAP scroll-triggered animations
 */

'use client';

import React, { useRef } from 'react';
import { Section, Container, PullQuote } from '../ui';
import { gsap, useGSAP } from '@/lib/gsap';

interface Essay {
  title: string;
  author: string;
  excerpt: string;
  pullQuote: string;
  readTime: string;
  date: string;
}

const essays: Essay[] = [
  {
    title: 'On the Nature of Time',
    author: 'Dr. Sarah Chen',
    excerpt: 'Time, unlike space, refuses to be measured by the instruments we build. It bends, stretches, and sometimes disappears entirely when we need it most.',
    pullQuote: 'We don\'t lose time—we misplace our attention.',
    readTime: '8 min read',
    date: 'November 2025',
  },
  {
    title: 'The Architecture of Memory',
    author: 'James Morrison',
    excerpt: 'Our minds construct elaborate palaces to house the fragments of our past. But what happens when the foundation begins to crack?',
    pullQuote: 'Memory is not a photograph; it\'s a painting that changes with every viewing.',
    readTime: '12 min read',
    date: 'October 2025',
  },
];

export function LatestEssaysSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // GSAP Scroll-Triggered Animations
  useGSAP(
    () => {
      // Animate header
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate essay articles
      gsap.from('.essay-article', {
        opacity: 0,
        x: -60,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.essays-container',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate essay numbers
      gsap.from('.essay-number', {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        stagger: 0.2,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.essays-container',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate CTA
      gsap.from('.essays-cta', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.essays-cta',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <Section spacing="xl" background="primary">
      <Container width="prose">
        <div ref={sectionRef}>
          {/* Section Header */}
          <div ref={headerRef} className="text-center mb-[var(--space-3xl)]">
            <h2 className="h2 mb-[var(--space-md)]">
              Latest Essays
            </h2>
            <p className="lead">
              Thoughtful explorations of ideas that matter
            </p>
          </div>

          {/* Essays */}
          <div className="essays-container space-y-[var(--space-3xl)]">
            {essays.map((essay, index) => (
              <article
                key={index}
                className="essay-article border-l-4 border-[var(--olive-mid)] pl-[var(--space-2xl)]"
              >
              {/* Essay Number */}
              <div className="flex items-baseline gap-[var(--space-md)] mb-[var(--space-lg)]">
                <span className="essay-number text-6xl font-light text-[var(--accent-warm)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="h3 mb-[var(--space-sm)]">
                    {essay.title}
                  </h3>
                  <div className="flex items-center gap-[var(--space-md)] text-sm text-muted">
                    <span>{essay.author}</span>
                    <span>•</span>
                    <span>{essay.date}</span>
                    <span>•</span>
                    <span>{essay.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Pull Quote */}
              <PullQuote author={essay.author}>
                {essay.pullQuote}
              </PullQuote>

              {/* Excerpt */}
              <p className="text-lg leading-relaxed text-[var(--text-primary)] mb-[var(--space-lg)]">
                {essay.excerpt}
              </p>

              {/* Read More Link */}
              <a
                href="/essays"
                className="inline-flex items-center gap-[var(--space-sm)] text-[var(--olive-dark)] hover:text-[var(--accent-warm)] transition-colors font-medium group"
              >
                <span>Read Full Essay</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </article>
          ))}
        </div>

          {/* View All Link */}
          <div className="essays-cta text-center mt-[var(--space-3xl)] pt-[var(--space-2xl)] border-t-2 border-[var(--ui-border)]">
            <a
              href="/essays"
              className="inline-flex items-center gap-[var(--space-md)] px-8 py-4 bg-[var(--olive-dark)] text-[var(--bg-primary)] rounded-md hover:bg-[var(--accent-warm)] transition-all font-medium text-lg"
            >
              <span>View All Essays</span>
              <span className="text-2xl">→</span>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
