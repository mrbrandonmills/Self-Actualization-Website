/**
 * SplitText Component - Cinematic Text Reveal Animations
 * Custom implementation rivaling GSAP's premium SplitText
 * Splits text into words/characters with staggered reveal animations
 */

'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

type SplitType = 'words' | 'chars' | 'lines';
type RevealType = 'fade' | 'slide-up' | 'slide-down' | 'scale' | 'blur' | 'rotate';

interface SplitTextProps {
  children: string;
  type?: SplitType;
  reveal?: RevealType;
  stagger?: number;
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnView?: boolean;
}

export function SplitText({
  children,
  type = 'chars',
  reveal = 'slide-up',
  stagger = 0.03,
  delay = 0,
  duration = 0.8,
  className = '',
  triggerOnView = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.split-item');

    // Initial state based on reveal type
    const getInitialState = () => {
      switch (reveal) {
        case 'slide-up':
          return { opacity: 0, y: 100, rotateX: -90 };
        case 'slide-down':
          return { opacity: 0, y: -100, rotateX: 90 };
        case 'scale':
          return { opacity: 0, scale: 0 };
        case 'blur':
          return { opacity: 0, filter: 'blur(10px)' };
        case 'rotate':
          return { opacity: 0, rotateY: 90, scale: 0.8 };
        default: // fade
          return { opacity: 0 };
      }
    };

    // Animation configuration
    const animateIn = () => {
      gsap.fromTo(
        elements,
        getInitialState(),
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          filter: 'blur(0px)',
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: triggerOnView
            ? {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              }
            : undefined,
        }
      );
    };

    animateIn();

    return () => {
      gsap.killTweensOf(elements);
    };
  }, [children, reveal, stagger, delay, duration, triggerOnView]);

  // Split text based on type
  const splitContent = () => {
    if (type === 'words') {
      return children.split(' ').map((word, i) => (
        <span key={i} className="split-word inline-block" style={{ whiteSpace: 'pre' }}>
          <span className="split-item inline-block">{word}</span>
          {i < children.split(' ').length - 1 && ' '}
        </span>
      ));
    }

    if (type === 'chars') {
      const words = children.split(' ');
      return words.map((word, wordIndex) => (
        <span key={wordIndex} className="split-word inline-block mr-[0.25em]">
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className="split-item inline-block"
              style={{
                transformOrigin: 'center bottom',
                display: 'inline-block'
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ));
    }

    // lines - basic implementation
    return (
      <span className="split-item block">{children}</span>
    );
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ perspective: '1000px' }}
    >
      {splitContent()}
    </div>
  );
}
