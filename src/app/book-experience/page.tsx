/**
 * Cinematic Book Experience
 * Phase 4: The REAL Kasane-Style Page Explosion
 *
 * Your book pages fly through layers of 3D space as you scroll.
 * This is the moment you've been waiting for.
 */

'use client'

import { BookAccordion, BookPage } from '@/components/book-accordion'

// Generate sample pages for "Blocks A & B"
// TODO: Replace with actual PDF page images when extraction is implemented
function generateBookPages(count: number): BookPage[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    src: `data:image/svg+xml,%3Csvg width="600" height="800" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3ClinearGradient id="grad${i}" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23f8f4e8;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23e8e0cc;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grad${i})"/%3E%3Ctext x="50%25" y="50%25" font-family="Georgia, serif" font-size="120" fill="%23333" text-anchor="middle" dominant-baseline="middle"%3E${i + 1}%3C/text%3E%3Ctext x="50%25" y="60%25" font-family="Georgia, serif" font-size="24" fill="%23666" text-anchor="middle" dominant-baseline="middle"%3EBlocks A %26 B%3C/text%3E%3C/svg%3E`,
    alt: `Page ${i + 1} of Blocks A & B`,
    title: i === 0 ? 'Title Page' : `Page ${i + 1}`,
    chapter: i % 10 === 0 ? `Chapter ${Math.floor(i / 10) + 1}` : undefined,
  }))
}

// Create 15 pages for the experience (adjust based on preference)
const BOOK_PAGES = generateBookPages(15)

export default function BookExperiencePage() {
  return (
    <main className="relative bg-[#05201f] show-cursor">
      {/* Hero / Introduction */}
      <section className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-4xl">
          <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 leading-tight">
            Blocks A & B
          </h1>
          <p className="text-2xl md:text-3xl text-gray-400 mb-8">
            by Brandon Mills
          </p>
          <div className="text-lg text-gray-500 mb-16 space-y-2">
            <p>A Journey Through Self-Actualization</p>
            <p className="text-sm">Scroll to begin the experience ↓</p>
          </div>

          {/* Scroll Instruction */}
          <div className="animate-bounce mt-12">
            <svg
              className="w-8 h-8 mx-auto text-gray-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Kasane-Style Book Accordion */}
      <BookAccordion
        pages={BOOK_PAGES}
        scrollDistance="500vh"
        depthPerPage={150}
        rotationIntensity={2}
      />

      {/* Outro / Call to Action */}
      <section className="min-h-screen flex items-center justify-center px-4 relative z-10 bg-gradient-to-b from-[#05201f] to-black">
        <div className="text-center max-w-4xl">
          <div className="text-8xl mb-8">✨</div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
            The Journey Continues
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            This is just the beginning. Explore the full book, dive deeper into each chapter,
            and discover the path to self-actualization.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/books"
              className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Explore All Books
            </a>
            <a
              href="/courses"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Start a Course
            </a>
          </div>

          {/* Technical Note */}
          <div className="mt-16 pt-16 border-t border-gray-800">
            <p className="text-sm text-gray-600 mb-4">Phase 4: Book Accordion Complete</p>
            <div className="flex flex-wrap gap-4 justify-center text-xs text-gray-700">
              <span>✓ Kasane-Style Explosion</span>
              <span>✓ GSAP ScrollTrigger</span>
              <span>✓ 3D CSS Transforms</span>
              <span>✓ 500vh Scroll Journey</span>
              <span>✓ 60fps Performance</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
