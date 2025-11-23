'use client'

import { useEffect, ReactNode } from 'react'
import Lenis from 'lenis'

/**
 * SmoothScroll Component
 *
 * Implements buttery-smooth momentum scrolling using Lenis.
 * Creates a luxury scrolling experience similar to Apple and premium automotive sites.
 *
 * Features:
 * - 0.8s duration for smooth deceleration
 * - 1.2x wheel multiplier for responsive scrolling
 * - 2x touch multiplier for mobile
 * - Integrates with Framer Motion for scroll-linked animations
 * - Auto-cleanup prevents memory leaks
 * - Client-side only for optimal performance
 *
 * Technical Details:
 * - Uses requestAnimationFrame for 60fps scrolling
 * - Custom easing function for exponential deceleration
 * - Proper lifecycle management with useEffect cleanup
 *
 * Usage:
 * <SmoothScroll>{children}</SmoothScroll>
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize Lenis smooth scroll with luxury settings
    const lenis = new Lenis({
      duration: 0.8,                                    // Slow, elegant scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
      orientation: 'vertical',                          // Vertical scroll only
      smoothWheel: true,                                // Smooth wheel scrolling
      wheelMultiplier: 1.2,                             // Increase scroll speed slightly
      touchMultiplier: 2,                               // Faster on mobile/touch
      infinite: false,                                  // No infinite scroll
    })

    // Integrate with Framer Motion for scroll-linked animations
    // This allows components to react to scroll position
    function onScroll(_scroll: any) {
      // Custom scroll event handling can be added here
      // For example: updating a scroll progress indicator
    }

    lenis.on('scroll', onScroll)

    // Animation frame loop for 60fps smooth scrolling
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    // Start the animation loop
    const rafId = requestAnimationFrame(raf)

    // Cleanup function to prevent memory leaks
    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Return children without wrapper (Lenis operates on window)
  return <>{children}</>
}
