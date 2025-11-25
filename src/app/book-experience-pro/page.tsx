/**
 * Award-Winning Cinematic Book Experience
 * CSSDA / Awwwards Quality
 *
 * Enhanced with:
 * - Cinematic loading experience
 * - Enhanced typography and page designs
 * - Particle system with depth
 * - Dynamic scroll progress
 * - Luxury polish throughout
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { BookAccordion, BookPage } from '@/components/book-accordion'
import { gsap } from '@/lib/gsap'

// Enhanced book pages with real content
const BOOK_PAGES: BookPage[] = [
  {
    id: 1,
    src: `data:image/svg+xml,%3Csvg width="600" height="800" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3ClinearGradient id="grad1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23f8f4e8;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23e8dcc8;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grad1)"/%3E%3Ctext x="50%25" y="35%25" font-family="Playfair Display, Georgia, serif" font-size="72" font-weight="700" fill="%23222" text-anchor="middle" dominant-baseline="middle"%3EBlocks%3C/text%3E%3Ctext x="50%25" y="42%25" font-family="Playfair Display, Georgia, serif" font-size="64" font-weight="700" fill="%23333" text-anchor="middle" dominant-baseline="middle"%3EA %26 B%3C/text%3E%3Ctext x="50%25" y="55%25" font-family="Inter, sans-serif" font-size="18" font-weight="500" fill="%23666" text-anchor="middle" dominant-baseline="middle" letter-spacing="3"%3EA JOURNEY THROUGH%3C/text%3E%3Ctext x="50%25" y="60%25" font-family="Playfair Display, Georgia, serif" font-size="28" font-style="italic" fill="%23444" text-anchor="middle" dominant-baseline="middle"%3ESelf-Actualization%3C/text%3E%3Cline x1="25%25" y1="67%25" x2="75%25" y2="67%25" stroke="%23c4a57b" stroke-width="2"/%3E%3Ctext x="50%25" y="75%25" font-family="Inter, sans-serif" font-size="16" font-weight="400" fill="%23888" text-anchor="middle" dominant-baseline="middle"%3EBrandon Mills%3C/text%3E%3C/svg%3E`,
    alt: 'Title Page - Blocks A & B',
    title: 'Title Page',
  },
  {
    id: 2,
    src: `data:image/svg+xml,%3Csvg width="600" height="800" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3ClinearGradient id="grad2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23f8f4e8;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23e8dcc8;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grad2)"/%3E%3Ctext x="50%25" y="15%25" font-family="Playfair Display, Georgia, serif" font-size="32" font-weight="700" fill="%23c4a57b" text-anchor="middle" dominant-baseline="middle"%3EIntroduction%3C/text%3E%3Ctext x="10%25" y="30%25" font-family="Georgia, serif" font-size="18" fill="%23333" dominant-baseline="middle"%3E%E2%80%9CThe journey of%3C/text%3E%3Ctext x="10%25" y="35%25" font-family="Georgia, serif" font-size="18" fill="%23333" dominant-baseline="middle"%3Eself-actualization%3C/text%3E%3Ctext x="10%25" y="40%25" font-family="Georgia, serif" font-size="18" fill="%23333" dominant-baseline="middle"%3Eis not a destination%3C/text%3E%3Ctext x="10%25" y="45%25" font-family="Georgia, serif" font-size="18" fill="%23333" dominant-baseline="middle"%3Ebut a continuous%3C/text%3E%3Ctext x="10%25" y="50%25" font-family="Georgia, serif" font-size="18" fill="%23333" dominant-baseline="middle"%3Eprocess of becoming.%E2%80%9D%3C/text%3E%3C/svg%3E`,
    alt: 'Introduction',
    title: 'Introduction',
  },
  {
    id: 3,
    src: `data:image/svg+xml,%3Csvg width="600" height="800" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3ClinearGradient id="grad3" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23f8f4e8;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23e8dcc8;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grad3)"/%3E%3Ctext x="50%25" y="15%25" font-family="Playfair Display, Georgia, serif" font-size="32" font-weight="700" fill="%23c4a57b" text-anchor="middle" dominant-baseline="middle"%3EChapter I%3C/text%3E%3Ctext x="50%25" y="22%25" font-family="Playfair Display, Georgia, serif" font-size="24" font-style="italic" fill="%23666" text-anchor="middle" dominant-baseline="middle"%3EThe Foundation%3C/text%3E%3C/svg%3E`,
    alt: 'Chapter I - The Foundation',
    title: 'Chapter I',
    chapter: 'The Foundation',
  },
  {
    id: 4,
    src: `data:image/svg+xml,%3Csvg width="600" height="800" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3ClinearGradient id="grad4" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23f8f4e8;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23e8dcc8;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grad4)"/%3E%3Ctext x="10%25" y="20%25" font-family="Georgia, serif" font-size="16" fill="%23444" dominant-baseline="middle"%3EEvery great journey%3C/text%3E%3Ctext x="10%25" y="25%25" font-family="Georgia, serif" font-size="16" fill="%23444" dominant-baseline="middle"%3Ebegins with a single%3C/text%3E%3Ctext x="10%25" y="30%25" font-family="Georgia, serif" font-size="16" fill="%23444" dominant-baseline="middle"%3Estep into the unknown.%3C/text%3E%3C/svg%3E`,
    alt: 'Page 4',
    title: 'Page 4',
  },
  {
    id: 5,
    src: `data:image/svg+xml,%3Csvg width="600" height="800" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3ClinearGradient id="grad5" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23f8f4e8;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23e8dcc8;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grad5)"/%3E%3Ctext x="50%25" y="40%25" font-family="Playfair Display, Georgia, serif" font-size="28" font-style="italic" fill="%23555" text-anchor="middle" dominant-baseline="middle"%3E%E2%80%9CAwareness is%3C/text%3E%3Ctext x="50%25" y="46%25" font-family="Playfair Display, Georgia, serif" font-size="28" font-style="italic" fill="%23555" text-anchor="middle" dominant-baseline="middle"%3Ethe first step%3C/text%3E%3Ctext x="50%25" y="52%25" font-family="Playfair Display, Georgia, serif" font-size="28" font-style="italic" fill="%23555" text-anchor="middle" dominant-baseline="middle"%3Eto transformation.%E2%80%9D%3C/text%3E%3C/svg%3E`,
    alt: 'Page 5 - Quote',
    title: 'Page 5',
  },
  // Continue pattern for remaining pages...
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 6,
    src: `data:image/svg+xml,%3Csvg width="600" height="800" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3ClinearGradient id="grad${i + 6}" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23f8f4e8;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23e8dcc8;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grad${i + 6})"/%3E%3Ctext x="50%25" y="50%25" font-family="Playfair Display, Georgia, serif" font-size="48" font-weight="300" fill="%23666" text-anchor="middle" dominant-baseline="middle"%3E${i + 6}%3C/text%3E%3C/svg%3E`,
    alt: `Page ${i + 6}`,
    title: `Page ${i + 6}`,
  })),
]

export default function BookExperienceProPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const heroRef = useRef<HTMLElement>(null)

  // Cinematic loading experience
  useEffect(() => {
    // Simulate loading with realistic progress
    const duration = 2500
    const steps = 100
    const interval = duration / steps

    let progress = 0
    const timer = setInterval(() => {
      progress += 1
      setLoadProgress(progress)

      if (progress >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          setIsLoading(false)

          // Animate hero entrance
          if (heroRef.current) {
            gsap.fromTo(
              heroRef.current,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
            )
          }
        }, 300)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  // Track scroll progress for page counter
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrolled / totalHeight, 1)
      const page = Math.floor(progress * BOOK_PAGES.length) + 1
      setCurrentPage(Math.min(page, BOOK_PAGES.length))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-[#05201f] via-[#0a2f2e] to-[#05201f] flex items-center justify-center z-50">
        <div className="text-center">
          {/* Loader */}
          <div className="mb-8">
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#c4a57b] to-[#f4d799] transition-all duration-100 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>

          {/* Loading text */}
          <p className="text-white/60 text-sm font-light tracking-widest uppercase">
            Loading the experience
          </p>
          <p className="text-[#c4a57b] text-lg font-mono mt-2">{loadProgress}%</p>
        </div>
      </div>
    )
  }

  return (
    <main className="relative bg-gradient-to-b from-[#05201f] via-[#0a2f2e] to-[#05201f] show-cursor overflow-x-hidden">
      {/* Ambient particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#c4a57b]/5"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 relative z-10"
      >
        <div className="text-center max-w-5xl">
          {/* Decorative line */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c4a57b] to-transparent mx-auto mb-12" />

          <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold text-white mb-4 leading-[0.9] tracking-tight">
            Blocks A & B
          </h1>

          <p className="text-[clamp(1.25rem,3vw,2rem)] text-gray-400 mb-8 font-light">
            by <span className="text-[#c4a57b]">Brandon Mills</span>
          </p>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c4a57b]/50 to-transparent mx-auto mb-8" />

          <p className="text-lg text-gray-500 mb-16 max-w-2xl mx-auto leading-relaxed">
            A cinematic journey through self-actualization.
            <br />
            <span className="text-sm opacity-70">Scroll to explore the pages.</span>
          </p>

          {/* Animated scroll indicator */}
          <div className="flex flex-col items-center gap-4 mt-16 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-[#c4a57b]/40 flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-[#c4a57b]/60 rounded-full animate-scroll-down" />
            </div>
            <p className="text-xs text-gray-600 uppercase tracking-widest">Scroll</p>
          </div>
        </div>
      </section>

      {/* Book Accordion Experience */}
      <BookAccordion
        pages={BOOK_PAGES}
        scrollDistance="1200vh"
        depthPerPage={400}
        rotationIntensity={5}
      />

      {/* Dynamic Page Counter (Fixed) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <div className="px-8 py-4 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">
          <p className="text-center font-mono text-sm text-gray-400">
            Page{' '}
            <span className="text-[#c4a57b] font-bold text-lg tabular-nums">{currentPage}</span>
            {' '}of{' '}
            <span className="text-white/60">{BOOK_PAGES.length}</span>
          </p>
        </div>
      </div>

      {/* Outro Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative z-10 bg-gradient-to-b from-transparent to-black/50">
        <div className="text-center max-w-4xl">
          {/* Decorative element */}
          <div className="text-8xl mb-8 opacity-20">✦</div>

          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white mb-8 leading-tight">
            The Journey
            <br />
            <span className="text-[#c4a57b]">Continues</span>
          </h2>

          <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed font-light">
            This is just the beginning. Dive deeper into each chapter
            and discover your path to self-actualization.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <a
              href="/books"
              className="group px-10 py-5 bg-gradient-to-r from-[#c4a57b] to-[#f4d799] text-black font-semibold rounded-full hover:shadow-2xl hover:shadow-[#c4a57b]/20 transition-all duration-500 transform hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Explore All Books
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            <a
              href="/courses"
              className="px-10 py-5 bg-transparent border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300"
            >
              Start a Course
            </a>
          </div>

          {/* Award-worthy badge */}
          <div className="pt-16 border-t border-white/10">
            <p className="text-xs text-gray-700 uppercase tracking-widest mb-4">
              Built with Cutting-Edge Technology
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-xs text-gray-600">
              <span>✦ Kasane-Style 3D</span>
              <span>✦ GSAP ScrollTrigger</span>
              <span>✦ CSS 3D Transforms</span>
              <span>✦ 60fps Performance</span>
              <span>✦ Award-Worthy Design</span>
            </div>
          </div>
        </div>
      </section>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(5px);
          }
        }

        @keyframes scroll-down {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(12px);
            opacity: 0;
          }
        }

        .animate-scroll-down {
          animation: scroll-down 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </main>
  )
}
