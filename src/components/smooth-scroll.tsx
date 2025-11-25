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
    // Dynamically import GSAP ScrollTrigger for integration
    let lenis: Lenis | null = null
    let rafId: number

    const initScroll = async () => {
      // Import ScrollTrigger
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const { gsap } = await import('gsap')

      // Register ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      // Initialize Lenis smooth scroll with luxury settings
      lenis = new Lenis({
        duration: 1.2,                                    // Slow, elegant scrolling (workflow spec)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
        orientation: 'vertical',                          // Vertical scroll only
        gestureOrientation: 'vertical',                   // Vertical gestures only
        smoothWheel: true,                                // Smooth wheel scrolling
        wheelMultiplier: 1,                               // Standard speed (workflow spec)
        touchMultiplier: 2,                               // Faster on mobile/touch
        infinite: false,                                  // No infinite scroll
      })

      // CRITICAL: Connect Lenis to GSAP ScrollTrigger
      // This makes ScrollTrigger animations fire during Lenis smooth scroll
      lenis.on('scroll', ScrollTrigger.update)

      // Also bind ScrollTrigger callbacks to Lenis
      gsap.ticker.add((time) => {
        lenis?.raf(time * 1000)
      })

      // Disable GSAP's default lag smoothing (Lenis handles it)
      gsap.ticker.lagSmoothing(0)

      // Animation frame loop for 60fps smooth scrolling
      function raf(time: number) {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      // Start the animation loop
      rafId = requestAnimationFrame(raf)

      // Force ScrollTrigger to recalculate after init
      ScrollTrigger.refresh()
    }

    initScroll()

    // Cleanup function to prevent memory leaks
    return () => {
      if (lenis) {
        lenis.destroy()
      }
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  // Return children without wrapper (Lenis operates on window)
  return <>{children}</>
}
