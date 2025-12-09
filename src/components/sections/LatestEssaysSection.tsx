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
import { getFeaturedEssays, type Essay as EssayData } from '@/data/essays';

interface DisplayEssay {
  title: string;
  subtitle?: string;
  author: string;
  excerpt: string;
  pullQuote: string;
  readTime: string;
  date: string;
  slug: string;
  category: string;
}

// Get real featured essays and transform them for display
const featuredEssays = getFeaturedEssays().slice(0, 2);

const essays: DisplayEssay[] = featuredEssays.map((essay: EssayData) => ({
  title: essay.title,
  subtitle: essay.subtitle,
  author: essay.author,
  excerpt: essay.abstract,
  // Extract a compelling pull quote from the abstract
  pullQuote: essay.id === 'quantum-coherent-state'
    ? 'Self-actualization corresponds to quantum-coherent brain states characterized by gamma-frequency neural synchrony.'
    : 'Codependency is one of society\'s most insidious yet overlooked addictions.',
  readTime: essay.readingTime,
  date: essay.publishDate,
  slug: essay.slug,
  category: essay.category,
}));

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
          <div ref={headerRef} className="text-center mb-[var(--space-2xl)] sm:mb-[var(--space-3xl)] px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="h2 mb-[var(--space-md)] mx-auto text-center">
              Latest Essays
            </h2>
            <p className="lead mx-auto text-center">
              Thoughtful explorations of ideas that matter
            </p>
          </div>

          {/* Essays */}
          <div className="essays-container space-y-[var(--space-2xl)] sm:space-y-[var(--space-3xl)] px-4 sm:px-6 lg:px-8 mx-auto">
            {essays.map((essay, index) => (
              <article
                key={index}
                className="essay-article border-l-2 sm:border-l-4 border-[var(--olive-mid)] pl-[var(--space-md)] sm:pl-[var(--space-2xl)]"
              >
              {/* Essay Number */}
              <div className="flex items-baseline gap-[var(--space-sm)] sm:gap-[var(--space-md)] mb-[var(--space-md)] sm:mb-[var(--space-lg)]">
                <span className="essay-number text-4xl sm:text-5xl md:text-6xl font-light text-[var(--accent-warm)] flex-shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="h3 mb-[var(--space-sm)]">
                    {essay.title}
                  </h3>
                  {essay.subtitle && (
                    <p className="text-base sm:text-lg text-muted mb-[var(--space-sm)] italic">
                      {essay.subtitle}
                    </p>
                  )}
                  <div className="flex items-center gap-[var(--space-xs)] sm:gap-[var(--space-md)] text-xs sm:text-sm text-muted flex-wrap">
                    <span>{essay.author}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">{essay.category}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">{essay.date}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{essay.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Pull Quote */}
              <PullQuote author={essay.author}>
                {essay.pullQuote}
              </PullQuote>

              {/* Excerpt */}
              <p className="text-base sm:text-lg leading-relaxed text-[var(--text-primary)] mb-[var(--space-md)] sm:mb-[var(--space-lg)]">
                {essay.excerpt}
              </p>

              {/* Read More Link */}
              <a
                href={`/essays/${essay.slug}`}
                className="inline-flex items-center gap-[var(--space-sm)] text-[var(--olive-dark)] hover:text-[var(--accent-warm)] transition-colors font-medium group text-sm sm:text-base"
              >
                <span>Read Full Essay</span>
                <span className="text-lg sm:text-xl group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </article>
          ))}
        </div>

          {/* View All Link */}
          <div className="essays-cta text-center mt-[var(--space-2xl)] sm:mt-[var(--space-3xl)] pt-[var(--space-xl)] sm:pt-[var(--space-2xl)] border-t-2 border-[var(--ui-border)] px-4 sm:px-6 lg:px-8 mx-auto">
            <a
              href="/essays"
              className="inline-flex items-center gap-[var(--space-sm)] sm:gap-[var(--space-md)] px-6 sm:px-8 py-3 sm:py-4 bg-[var(--olive-dark)] text-[var(--bg-primary)] rounded-md hover:bg-[var(--accent-warm)] transition-all font-medium text-base sm:text-lg min-h-[48px] mx-auto"
            >
              <span>View All Essays</span>
              <span className="text-xl sm:text-2xl">→</span>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
