/**
 * useScrollAnimation Hook
 * Phase 2: Scroll-driven animations with GSAP ScrollTrigger
 *
 * Automatically animates elements with [data-animate] attribute
 * as they scroll into view. Integrates with Lenis smooth scroll.
 *
 * Usage:
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null)
 * useScrollAnimation(containerRef, { scrub: true })
 *
 * return (
 *   <div ref={containerRef}>
 *     <h1 data-animate="fade">Fades in on scroll</h1>
 *     <p data-animate="slideInLeft">Slides from left</p>
 *   </div>
 * )
 * ```
 */

import { RefObject } from 'react'
import { useGSAP } from '@/lib/gsap'
import { gsap, ScrollTrigger, gsapPresets } from '@/lib/gsap'

export interface ScrollAnimationOptions {
  /**
   * ScrollTrigger start position
   * @default "top 80%" - Animation starts when element is 80% from top of viewport
   */
  start?: string

  /**
   * ScrollTrigger end position
   * @default "top 20%" - Animation ends when element is 20% from top
   */
  end?: string

  /**
   * Link animation progress to scroll position
   * - false: Play once when triggered
   * - true: Scrub (perfect sync with scroll)
   * - number: Scrub with smoothing (seconds)
   * @default false
   */
  scrub?: boolean | number

  /**
   * Stagger animations between multiple elements
   * @default 0 - No stagger
   */
  stagger?: number

  /**
   * Show ScrollTrigger markers for debugging
   * @default false
   */
  markers?: boolean
}

/**
 * Animation presets map
 */
const animationMap: Record<string, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
  fade: gsapPresets.fadeIn,
  fadeInUp: gsapPresets.fadeInUp,
  slideInLeft: gsapPresets.slideInLeft,
  slideInRight: gsapPresets.slideInRight,
  scaleIn: gsapPresets.scaleIn,
  reveal: gsapPresets.reveal,
}

/**
 * Hook: Scroll-driven animations
 */
export function useScrollAnimation(
  containerRef: RefObject<HTMLElement | null>,
  options: ScrollAnimationOptions = {}
) {
  const {
    start = 'top 80%',
    end = 'top 20%',
    scrub = false,
    stagger = 0,
    markers = false,
  } = options

  useGSAP(
    () => {
      if (!containerRef.current) return

      // Find all elements with data-animate attribute
      const elements = containerRef.current.querySelectorAll('[data-animate]')

      if (elements.length === 0) {
        console.warn('useScrollAnimation: No elements with [data-animate] found')
        return
      }

      // Animate each element based on its data-animate value
      elements.forEach((element, index) => {
        const animationType = element.getAttribute('data-animate') || 'fade'
        const preset = animationMap[animationType] || animationMap.fade

        // Apply stagger delay
        const delay = stagger ? index * stagger : 0

        gsap.fromTo(
          element,
          {
            ...preset.from,
          },
          {
            ...preset.to,
            delay,
            scrollTrigger: {
              trigger: element,
              start,
              end,
              scrub,
              markers,
              // Performance: Use will-change for smooth animations
              onEnter: () => {
                if (element instanceof HTMLElement) {
                  element.style.willChange = 'transform, opacity'
                }
              },
              onLeave: () => {
                if (element instanceof HTMLElement) {
                  element.style.willChange = 'auto'
                }
              },
            },
          }
        )
      })

      // Cleanup function - critical for preventing memory leaks
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          // Only kill triggers created by this hook
          if (trigger.vars.trigger && containerRef.current?.contains(trigger.vars.trigger as Element)) {
            trigger.kill()
          }
        })
      }
    },
    {
      scope: containerRef, // Scope animations to container for better performance
      dependencies: [start, end, scrub, stagger, markers], // Re-run if options change
    }
  )
}

/**
 * Advanced Hook: Custom scroll animation with GSAP timeline
 *
 * For complex animations that need precise control over timeline.
 *
 * Usage:
 * ```tsx
 * useCustomScrollAnimation(containerRef, (tl, container) => {
 *   tl.fromTo('.title', { opacity: 0 }, { opacity: 1 })
 *     .fromTo('.subtitle', { y: 50 }, { y: 0 })
 * })
 * ```
 */
export function useCustomScrollAnimation(
  containerRef: RefObject<HTMLElement | null>,
  timelineCallback: (timeline: gsap.core.Timeline, container: HTMLElement) => void,
  options: Omit<ScrollAnimationOptions, 'stagger'> = {}
) {
  const { start = 'top 80%', end = 'top 20%', scrub = false, markers = false } = options

  useGSAP(
    () => {
      if (!containerRef.current) return

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          end,
          scrub,
          markers,
        },
      })

      // User-defined timeline animations
      timelineCallback(tl, containerRef.current)

      // Cleanup
      return () => {
        tl.kill()
      }
    },
    {
      scope: containerRef,
      dependencies: [start, end, scrub, markers],
    }
  )
}
