/**
 * Lenis Smooth Scroll Provider
 * Integrates Lenis momentum scrolling with GSAP ScrollTrigger
 * Essential for award-winning scroll experiences
 */

'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from '@/lib/gsap';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimal settings
    const lenis = new Lenis({
      duration: 1.2, // Scroll animation duration (higher = smoother but slower)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for premium feel
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false, // Disable on mobile for native feel
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', (e: any) => {
      if (typeof window !== 'undefined' && window.ScrollTrigger) {
        window.ScrollTrigger.update();
      }
    });

    // Set up RAF loop for smooth updates
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
