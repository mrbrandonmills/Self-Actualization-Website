'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function BookAccordionPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pagesRef = useRef<(HTMLDivElement | null)[]>([])

  // 15 book pages
  const pages = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    src: `/books/blocks-a-b/page-${i === 0 ? '01-cover' : String(i + 1).padStart(2, '0')}.jpg`
  }))

  useEffect(() => {
    if (!containerRef.current) return

    // KASANE EFFECT: Each page fans out in 3D space as you scroll
    pagesRef.current.forEach((page, index) => {
      if (!page) return

      gsap.to(page, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Smooth scrubbing
        },
        // Kasane accordion effect: pages spread out in Z-space
        z: index * 100, // Each page goes deeper
        rotateX: index * 2, // Slight tilt
        rotateY: (index % 2 === 0 ? 1 : -1) * index * 1.5, // Alternate slight rotation
        ease: 'none',
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="book-accordion-container">
      {/* Scroll spacer */}
      <div className="scroll-spacer" ref={containerRef} />

      {/* 3D Stage */}
      <div className="stage">
        <div className="pages-container">
          {pages.map((page, index) => (
            <div
              key={page.id}
              ref={(el) => { pagesRef.current[index] = el }}
              className="page"
              style={{
                zIndex: pages.length - index, // Stack from back to front
              }}
            >
              <Image
                src={page.src}
                alt={`Book page ${page.id}`}
                fill
                style={{ objectFit: 'cover' }}
                priority={index < 3} // Prioritize first 3 pages
              />
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="instructions">
        <h2>Random Acts of Self-Actualization</h2>
        <p>Scroll to explore</p>
      </div>

      <style jsx>{`
        .book-accordion-container {
          position: relative;
          background: #05201f;
          overflow: hidden;
        }

        .scroll-spacer {
          height: 500vh;
          position: relative;
        }

        .stage {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          perspective: 1200px;
          perspective-origin: 50% 50%;
          pointer-events: none;
        }

        .pages-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 600px;
          height: 800px;
          transform: translate(-50%, -50%);
          transform-style: preserve-3d;
        }

        .page {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #fff;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          transform-style: preserve-3d;
          backface-visibility: visible;
        }

        .instructions {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
          text-align: center;
          color: #ffffff;
          pointer-events: none;
          opacity: 0.8;
          transition: opacity 0.5s ease;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
        }

        .book-accordion-container:hover .instructions {
          opacity: 0.2;
        }

        .instructions h2 {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 2.5rem;
          color: #C9A050;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .instructions p {
          font-family: var(--font-sans, -apple-system, sans-serif);
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 300;
        }

        @media (max-width: 768px) {
          .pages-container {
            width: 300px;
            height: 400px;
          }

          .instructions h2 {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  )
}
