/**
 * GSAP Configuration & Exports
 * Phase 2: Animation System Foundation
 *
 * Configures GSAP with ScrollTrigger plugin and useGSAP React hook
 * for scroll-driven animations across the luxury book museum.
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register GSAP plugins (client-side only)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)

  // Configure ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
    markers: process.env.NODE_ENV === 'development' ? false : false, // Set to true for debugging
  })

  // Integrate ScrollTrigger with Lenis smooth scroll
  // This ensures animations sync perfectly with Lenis momentum
  ScrollTrigger.config({
    // Lenis handles scroll events, so we need to update ScrollTrigger manually
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  })
}

// Export configured GSAP ecosystem
export { gsap, ScrollTrigger, useGSAP }

/**
 * Common animation presets matching luxury design system
 */
export const gsapPresets = {
  fadeIn: {
    from: { opacity: 0, y: 40 },
    to: {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    },
  },
  fadeInUp: {
    from: { opacity: 0, y: 60, scale: 0.95 },
    to: {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
    },
  },
  slideInLeft: {
    from: { opacity: 0, x: -100 },
    to: {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out',
    },
  },
  slideInRight: {
    from: { opacity: 0, x: 100 },
    to: {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out',
    },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.2)',
    },
  },
  reveal: {
    from: { clipPath: 'inset(0 100% 0 0)' },
    to: {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.5,
      ease: 'power4.inOut',
    },
  },
} as const

/**
 * Luxury easing functions (matching design tokens)
 */
export const gsapEasing = {
  smooth: 'cubic-bezier(0.22, 1, 0.36, 1)', // Bartosz/Kasane style
  bounce: 'back.out(1.4)',
  elastic: 'elastic.out(1, 0.5)',
  power: 'power3.out',
  expo: 'expo.out',
} as const
