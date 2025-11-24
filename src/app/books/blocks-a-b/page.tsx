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
    src: `/books/blocks-a-b/page-${i === 0 ? '01-cover' : String(i + 1).padStart(2, '0')}.jpg`,
    isCover: i === 0
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
          scrub: 1,
        },
        z: -index * 150,
        rotateX: index * 3,
        rotateY: (index % 2 === 0 ? 1 : -1) * index * 2,
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
              className={`page ${page.isCover ? 'page-cover' : ''}`}
              style={{
                zIndex: pages.length - index,
              }}
            >
              {/* Front of page */}
              <div className="page-front">
                <Image
                  src={page.src}
                  alt={`Book page ${page.id}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index < 3}
                />
                {/* Page corner curl */}
                <div className="page-corner" />
              </div>

              {/* Page thickness (right edge) */}
              <div className="page-edge-right" />

              {/* Page thickness (top edge) */}
              <div className="page-edge-top" />

              {/* Page thickness (bottom edge) */}
              <div className="page-edge-bottom" />

              {/* Back of page (visible when turned) */}
              <div className="page-back" />
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
          perspective: 2000px;
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

        /* Real book page with thickness */
        .page {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          backface-visibility: visible;
        }

        /* Front of page */
        .page-front {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #F8F4E8; /* Aged paper color */
          transform-style: preserve-3d;
          border-radius: 2px;
          overflow: hidden;

          /* Realistic book shadow - multiple layers */
          box-shadow:
            0 2px 4px rgba(0, 0, 0, 0.1),
            0 8px 16px rgba(0, 0, 0, 0.15),
            0 16px 32px rgba(0, 0, 0, 0.2),
            0 32px 64px rgba(0, 0, 0, 0.25),
            inset -2px 0 8px rgba(0, 0, 0, 0.1); /* Inner shadow for depth */
        }

        /* Cover has harder surface */
        .page-cover .page-front {
          background: #2C2416;
          box-shadow:
            0 4px 8px rgba(0, 0, 0, 0.2),
            0 12px 24px rgba(0, 0, 0, 0.25),
            0 24px 48px rgba(0, 0, 0, 0.3),
            0 48px 96px rgba(0, 0, 0, 0.35),
            inset -3px 0 12px rgba(0, 0, 0, 0.2);
        }

        /* Page corner curl */
        .page-corner {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, transparent 50%, rgba(0, 0, 0, 0.05) 50%);
          border-radius: 0 0 2px 0;
          transform: translateZ(1px);
        }

        /* Right edge of page (thickness) */
        .page-edge-right {
          position: absolute;
          right: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(to right,
            #E8E0CC 0%,
            #D8D0BC 50%,
            #C8C0AC 100%
          );
          transform: rotateY(90deg) translateX(1.5px);
          transform-origin: right;
          box-shadow:
            inset 0 0 2px rgba(0, 0, 0, 0.1),
            0 0 4px rgba(0, 0, 0, 0.2);
        }

        /* Cover has thicker edge */
        .page-cover .page-edge-right {
          width: 5px;
          background: linear-gradient(to right,
            #3C3426 0%,
            #2C2416 50%,
            #1C1406 100%
          );
          transform: rotateY(90deg) translateX(2.5px);
        }

        /* Top edge of page */
        .page-edge-top {
          position: absolute;
          top: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(to bottom,
            #F8F4E8 0%,
            #E8E0CC 50%,
            #D8D0BC 100%
          );
          transform: rotateX(90deg) translateY(-1.5px);
          transform-origin: top;
          box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
        }

        .page-cover .page-edge-top {
          height: 5px;
          background: linear-gradient(to bottom,
            #3C3426 0%,
            #2C2416 50%,
            #1C1406 100%
          );
          transform: rotateX(90deg) translateY(-2.5px);
        }

        /* Bottom edge of page */
        .page-edge-bottom {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(to top,
            #F8F4E8 0%,
            #E8E0CC 50%,
            #D8D0BC 100%
          );
          transform: rotateX(-90deg) translateY(1.5px);
          transform-origin: bottom;
          box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
        }

        .page-cover .page-edge-bottom {
          height: 5px;
          background: linear-gradient(to top,
            #3C3426 0%,
            #2C2416 50%,
            #1C1406 100%
          );
          transform: rotateX(-90deg) translateY(2.5px);
        }

        /* Back of page (slightly darker) */
        .page-back {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #E8E0CC;
          transform: rotateY(180deg) translateZ(-3px);
          border-radius: 2px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .page-cover .page-back {
          background: #1C1406;
          transform: rotateY(180deg) translateZ(-5px);
        }

        /* Add paper texture overlay */
        .page-front::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.01) 2px,
              rgba(0, 0, 0, 0.01) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.01) 2px,
              rgba(0, 0, 0, 0.01) 4px
            );
          pointer-events: none;
          opacity: 0.3;
          mix-blend-mode: multiply;
        }

        /* Add aging/wear on edges */
        .page-front::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            ellipse at 100% 50%,
            transparent 70%,
            rgba(139, 119, 101, 0.1) 100%
          );
          pointer-events: none;
          border-radius: 2px;
        }

        /* Instructions overlay */
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

        /* Responsive */
        @media (max-width: 768px) {
          .pages-container {
            width: 300px;
            height: 400px;
          }

          .instructions h2 {
            font-size: 1.75rem;
          }

          .page-edge-right,
          .page-edge-top,
          .page-edge-bottom {
            width: 2px;
            height: 2px;
          }

          .page-cover .page-edge-right,
          .page-cover .page-edge-top,
          .page-cover .page-edge-bottom {
            width: 3px;
            height: 3px;
          }
        }
      `}</style>
    </div>
  )
}
