'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colors, typography, spacing, effects } from '@/lib/bartosz-design-tokens';

gsap.registerPlugin(ScrollTrigger);

interface DarkBookPedestalProps {
  title: string;
  author: string;
  coverImage: string;
  description: string;
  price: string;
}

export function DarkBookPedestal({
  title,
  author,
  coverImage,
  description,
  price,
}: DarkBookPedestalProps) {
  const bookRef = useRef<HTMLDivElement>(null);
  const pedestalRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!bookRef.current || !pedestalRef.current) return;

    // Scroll-triggered reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pedestalRef.current,
        start: 'top 75%',
        end: 'top 25%',
        scrub: 1,
      },
    });

    tl.fromTo(
      bookRef.current,
      {
        y: 100,
        rotationY: -30,
        opacity: 0,
      },
      {
        y: 0,
        rotationY: 0,
        opacity: 1,
        ease: 'power2.out',
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={pedestalRef}
      className="book-pedestal dark-pedestal relative flex flex-col items-center justify-center min-h-screen py-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Book container */}
      <div
        ref={bookRef}
        className="book-container-dark"
        style={{
          transform: isHovered
            ? 'perspective(1000px) rotateY(15deg) translateY(-30px)'
            : 'perspective(1000px) rotateY(0deg) translateY(0px)',
          transition: effects.transitions.bounce,
        }}
      >
        {/* Book cover */}
        <div
          className="book-cover-dark"
          style={{
            width: '320px',
            height: '450px',
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: isHovered
              ? `0 30px 80px rgba(0, 0, 0, 0.8), ${effects.shadows.glow}`
              : effects.shadows.lg,
            transition: effects.transitions.normal,
          }}
        >
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
            style={{
              filter: 'contrast(1.1) saturate(1.2)',
            }}
          />

          {/* Hover glow overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at center, ${colors.accentGold}30, transparent 70%)`,
              opacity: isHovered ? 1 : 0,
              transition: effects.transitions.normal,
              mixBlendMode: 'screen',
            }}
          />

          {/* Border accent */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              border: `1px solid ${colors.text.primary}20`,
              borderRadius: '8px',
            }}
          />
        </div>
      </div>

      {/* Book information */}
      <div
        className="book-info-dark mt-12 text-center max-w-md"
        style={{
          opacity: isHovered ? 1 : 0.85,
          transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
          transition: effects.transitions.normal,
        }}
      >
        {/* Title */}
        <h3
          style={{
            fontSize: typography.h3,
            fontFamily: typography.serif,
            fontWeight: typography.weights.bold,
            color: colors.text.primary,
            marginBottom: spacing.sm,
            letterSpacing: typography.tracking.tight,
            lineHeight: typography.lineHeights.tight,
          }}
        >
          {title}
        </h3>

        {/* Author */}
        <p
          style={{
            fontSize: typography.small,
            fontFamily: typography.sans,
            color: colors.text.secondary,
            textTransform: 'uppercase',
            letterSpacing: typography.tracking.widest,
            marginBottom: spacing.md,
          }}
        >
          {author}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: typography.body,
            fontFamily: typography.sans,
            color: colors.text.secondary,
            lineHeight: typography.lineHeights.relaxed,
            marginBottom: spacing.lg,
          }}
        >
          {description}
        </p>

        {/* Price & CTA */}
        <div className="flex items-center justify-center gap-6">
          <span
            style={{
              fontSize: typography.h5,
              fontFamily: typography.serif,
              fontWeight: typography.weights.semibold,
              color: colors.text.accent,
            }}
          >
            {price}
          </span>
          <button
            style={{
              padding: `${spacing.sm} ${spacing.lg}`,
              background: `linear-gradient(135deg, ${colors.accentGold} 0%, ${colors.accentGold}dd 100%)`,
              color: colors.text.inverse,
              border: `1px solid ${colors.accentGold}`,
              borderRadius: '4px',
              fontFamily: typography.sans,
              fontSize: typography.small,
              fontWeight: typography.weights.semibold,
              textTransform: 'uppercase',
              letterSpacing: typography.tracking.wider,
              cursor: 'pointer',
              transition: effects.transitions.normal,
              boxShadow: effects.shadows.sm,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = effects.shadows.md;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = effects.shadows.sm;
            }}
          >
            Add to Collection
          </button>
        </div>
      </div>
    </div>
  );
}
