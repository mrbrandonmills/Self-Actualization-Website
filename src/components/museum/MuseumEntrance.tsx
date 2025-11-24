'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * MuseumEntrance - Cinematic portal to 3D museum journey
 *
 * Luxury entrance with pedestal and floating portal effect
 * Links to /journey for immersive 3D experience
 */
export function MuseumEntrance() {
  const portalRef = useRef<HTMLDivElement>(null)
  const pedestalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!portalRef.current || !pedestalRef.current) return

    // Floating animation for portal
    gsap.to(portalRef.current, {
      y: -20,
      duration: 3,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    })

    // Reveal animations on scroll
    gsap.fromTo(
      pedestalRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pedestalRef.current,
          start: 'top 80%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section className="museum-entrance">
      <div className="entrance-container">
        <div className="entrance-content">
          {/* Title */}
          <h2 className="entrance-title">The Garden of Becoming</h2>
          <p className="entrance-subtitle">FOUNDATIONS OF TRANSFORMATION</p>

          {/* Pedestal with Portal */}
          <div className="pedestal-container" ref={pedestalRef}>
            {/* Pedestal Base */}
            <div className="pedestal">
              <div className="pedestal-top" />
              <div className="pedestal-column" />
              <div className="pedestal-base" />
            </div>

            {/* Floating Portal */}
            <Link href="/journey" className="portal-link">
              <div className="portal" ref={portalRef}>
                <div className="portal-ring portal-ring-1" />
                <div className="portal-ring portal-ring-2" />
                <div className="portal-ring portal-ring-3" />
                <div className="portal-center">
                  <div className="portal-icon">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L2 7L12 12L22 7L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 17L12 22L22 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12L12 17L22 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="portal-text">Enter Museum</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Description */}
          <p className="entrance-description">
            Step into an immersive 3D journey through curated wisdom.
            <br />
            Explore the museum of transformation.
          </p>
        </div>
      </div>

      <style jsx>{`
        .museum-entrance {
          position: relative;
          background: linear-gradient(180deg, #05201f 0%, #031614 100%);
          padding: 8rem 0;
          overflow: hidden;
        }

        .entrance-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .entrance-content {
          text-align: center;
        }

        /* Title */
        .entrance-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 4rem;
          font-weight: 400;
          color: #FFFFFF;
          margin-bottom: 1rem;
          letter-spacing: 0.02em;
        }

        .entrance-subtitle {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.875rem;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 4rem;
        }

        /* Pedestal Container */
        .pedestal-container {
          position: relative;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 3rem;
        }

        /* Pedestal Structure */
        .pedestal {
          position: absolute;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5));
        }

        .pedestal-top {
          width: 180px;
          height: 20px;
          background: linear-gradient(180deg, #F8F4E8 0%, #E8E0D0 100%);
          border-radius: 4px;
          box-shadow:
            0 4px 8px rgba(0, 0, 0, 0.2),
            inset 0 2px 4px rgba(255, 255, 255, 0.3);
        }

        .pedestal-column {
          width: 120px;
          height: 200px;
          background: linear-gradient(90deg, #E8E0D0 0%, #F8F4E8 50%, #E8E0D0 100%);
          box-shadow:
            inset 4px 0 8px rgba(0, 0, 0, 0.1),
            inset -4px 0 8px rgba(0, 0, 0, 0.1),
            0 0 20px rgba(0, 0, 0, 0.3);
        }

        .pedestal-base {
          width: 200px;
          height: 30px;
          background: linear-gradient(180deg, #E8E0D0 0%, #D0C8B8 100%);
          border-radius: 4px;
          box-shadow:
            0 8px 16px rgba(0, 0, 0, 0.3),
            inset 0 2px 4px rgba(255, 255, 255, 0.2);
        }

        /* Portal */
        .portal-link {
          display: block;
          text-decoration: none;
          cursor: pointer;
        }

        .portal {
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          width: 280px;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .portal-ring {
          position: absolute;
          border: 2px solid;
          border-radius: 50%;
          animation: portal-pulse 3s ease-in-out infinite;
        }

        .portal-ring-1 {
          width: 100%;
          height: 100%;
          border-color: rgba(201, 160, 80, 0.3);
          animation-delay: 0s;
        }

        .portal-ring-2 {
          width: 80%;
          height: 80%;
          border-color: rgba(201, 160, 80, 0.5);
          animation-delay: 1s;
        }

        .portal-ring-3 {
          width: 60%;
          height: 60%;
          border-color: rgba(201, 160, 80, 0.7);
          animation-delay: 2s;
        }

        @keyframes portal-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }

        .portal-center {
          position: relative;
          z-index: 10;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(201, 160, 80, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          backdrop-filter: blur(8px);
        }

        .portal-link:hover .portal-center {
          transform: scale(1.1);
          background: radial-gradient(circle, rgba(201, 160, 80, 0.3) 0%, transparent 70%);
        }

        .portal-icon {
          width: 48px;
          height: 48px;
          color: #C9A050;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .portal-link:hover .portal-icon {
          transform: translateY(-8px);
          filter: drop-shadow(0 8px 16px rgba(201, 160, 80, 0.4));
        }

        .portal-text {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.875rem;
          font-weight: 500;
          color: #C9A050;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .portal-link:hover .portal-text {
          transform: translateY(-4px);
          color: #E8C080;
        }

        /* Description */
        .entrance-description {
          font-family: var(--font-sans, sans-serif);
          font-size: 1.125rem;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .museum-entrance {
            padding: 4rem 0;
          }

          .entrance-title {
            font-size: 2.5rem;
          }

          .pedestal-container {
            height: 400px;
          }

          .pedestal-top {
            width: 140px;
          }

          .pedestal-column {
            width: 100px;
            height: 160px;
          }

          .pedestal-base {
            width: 160px;
          }

          .portal {
            width: 220px;
            height: 220px;
          }

          .portal-center {
            width: 160px;
            height: 160px;
          }

          .entrance-description {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  )
}
