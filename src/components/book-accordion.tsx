/**
 * BookAccordion Component
 * Phase 4: Kasane-Style Book Page Explosion
 *
 * Cinematic scroll-driven animation where book pages fly through
 * layers of 3D space, revealing content as you scroll.
 *
 * Inspired by: https://kasane-keyboard.com/
 *
 * Features:
 * - Fixed viewport stage (pages don't scroll, camera moves)
 * - GSAP ScrollTrigger with scrub (scroll-linked animation)
 * - Asymmetric rotation (alternating left/right)
 * - Z-depth explosion (-150px per page)
 * - Photorealistic page materials
 * - 500vh scroll spacer for extended journey
 */

'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import Image from 'next/image'
import styles from './book-accordion.module.css'

export interface BookPage {
  id: number
  src: string
  alt: string
  title?: string
  chapter?: string
}

export interface BookAccordionProps {
  pages: BookPage[]
  /** Scroll distance (default: 500vh) */
  scrollDistance?: string
  /** Z-depth per page (default: 150px) */
  depthPerPage?: number
  /** Rotation intensity (default: 2deg per page) */
  rotationIntensity?: number
}

export function BookAccordion({
  pages,
  scrollDistance = '500vh',
  depthPerPage = 150,
  rotationIntensity = 2,
}: BookAccordionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pagesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Kasane-style scroll-driven explosion
    pagesRef.current.forEach((page, index) => {
      if (!page) return

      // Each page flies back in Z-space
      // Alternate rotation left/right for asymmetry
      const rotationDirection = index % 2 === 0 ? 1 : -1

      gsap.to(page, {
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Smooth 1-second lag
          // markers: true, // Debug markers
        },
        // Fly back in Z-space
        z: -index * depthPerPage,

        // Subtle X rotation (tilt up/down)
        rotateX: index * 3,

        // Asymmetric Y rotation (alternate left/right)
        rotateY: rotationDirection * index * rotationIntensity,

        // Slight scale down as they recede
        scale: 1 - index * 0.02,

        // No easing (linear with scroll)
        ease: 'none',
      })
    })

    // Cleanup ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [depthPerPage, rotationIntensity])

  return (
    <div className={styles.bookAccordion}>
      {/* Scroll Spacer (creates scroll distance) */}
      <div
        className={styles.scrollSpacer}
        ref={containerRef}
        style={{ height: scrollDistance }}
      />

      {/* Fixed Stage (viewport-locked 3D space) */}
      <div className={styles.stage}>
        <div className={styles.pagesContainer}>
          {pages.map((page, index) => (
            <div
              key={page.id}
              ref={(el) => {
                pagesRef.current[index] = el
              }}
              className={styles.page}
              style={{
                zIndex: pages.length - index, // Front pages on top
              }}
            >
              {/* Front Face */}
              <div className={styles.pageFront}>
                <Image
                  src={page.src}
                  alt={page.alt}
                  fill
                  sizes="(max-width: 768px) 300px, 600px"
                  className={styles.pageImage}
                  priority={index < 3} // Prioritize first 3 pages
                />

                {/* Page overlay for depth */}
                <div className={styles.pageOverlay} />

                {/* Corner curl */}
                <div className={styles.pageCorner} />

                {/* Page number */}
                <div className={styles.pageNumber}>{index + 1}</div>
              </div>

              {/* Right Edge (thickness) */}
              <div className={styles.pageEdgeRight} />

              {/* Top Edge */}
              <div className={styles.pageEdgeTop} />

              {/* Bottom Edge */}
              <div className={styles.pageEdgeBottom} />

              {/* Back Face */}
              <div className={styles.pageBack} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollProgress}>
          Page <span id="current-page">1</span> of {pages.length}
        </div>
      </div>
    </div>
  )
}
