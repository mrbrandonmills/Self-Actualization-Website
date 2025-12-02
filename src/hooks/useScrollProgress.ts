/**
 * useScrollProgress Hook
 * Returns scroll progress (0-1) for scroll-driven animations
 */

'use client';

import { useEffect, useState } from 'react';

export function useScrollProgress(elementRef?: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef?.current) {
        // Progress relative to element
        const rect = elementRef.current.getBoundingClientRect();
        const elementHeight = elementRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        // Progress from when element enters bottom until it exits top
        const scrolledIntoView = (windowHeight - rect.top) / (elementHeight + windowHeight);
        setProgress(Math.max(0, Math.min(1, scrolledIntoView)));
      } else {
        // Global scroll progress
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY / scrollHeight;
        setProgress(Math.max(0, Math.min(1, scrolled)));
      }
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [elementRef]);

  return progress;
}

/**
 * Maps a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  // Clamp input value
  const clampedValue = Math.max(inMin, Math.min(inMax, value));
  // Map to output range
  return ((clampedValue - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
