'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues with Three.js
const EpicBookScene = dynamic(
  () => import('@/components/3d-book-scene-epic'),
  { ssr: false }
)

/**
 * Epic Book Showcase - 25x Viewport Cinematic Journey
 *
 * Inspired by The Monolith Project's epic scroll length and
 * dramatic camera movements
 *
 * 12-Phase Structure:
 * Phase 1 (0-8%): Entry from infinite distance
 * Phase 2 (8-16%): Rotation showcase
 * Phase 3 (16-24%): Book opens
 * Phase 4 (24-32%): Initial separation
 * Phase 5 (32-40%): Full explosion
 * Phase 6 (40-48%): Orbital dance
 * Phase 7 (48-56%): Wave formation
 * Phase 8 (56-64%): Camera fly-through
 * Phase 9 (64-72%): Spiral tornado
 * Phase 10 (72-80%): Reassembly
 * Phase 11 (80-88%): Book reforms
 * Phase 12 (88-100%): Final showcase
 */
export default function BookShowcase() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleScroll() {
      if (!containerRef.current) return

      const scrollTop = window.scrollY
      const docHeight = containerRef.current.offsetHeight - window.innerHeight
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1)

      setScrollProgress(progress)

      // Determine current phase (1-12)
      const phase = Math.floor(progress * 12) + 1
      setCurrentPhase(Math.min(phase, 12))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Phase descriptions
  const phases = [
    { name: 'Entry', description: 'The book materializes from the void' },
    { name: 'Rotation', description: 'A moment to appreciate its form' },
    { name: 'Opening', description: 'The cover lifts, revealing secrets within' },
    { name: 'Separation', description: 'Pages begin their individual journeys' },
    { name: 'Explosion', description: 'Knowledge erupts into space' },
    { name: 'Orbital', description: 'Pages dance in synchronized orbits' },
    { name: 'Wave', description: 'A choreographed wave of wisdom' },
    { name: 'Fly-Through', description: 'Journey through the pages themselves' },
    { name: 'Fly-Through', description: 'Navigate the labyrinth of pages' },
    { name: 'Reassembly', description: 'The pages remember their purpose' },
    { name: 'Reform', description: 'Unity restored, structure rebuilt' },
    { name: 'Showcase', description: 'The complete work, transformed' },
  ]

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        minHeight: '2500vh', // 25x viewport for ultra-long scroll
        background: 'linear-gradient(to bottom, #05201f 0%, #003635 25%, #05201f 50%, #002120 75%, #05201f 100%)',
      }}
    >
      {/* Fixed 3D Scene */}
      <EpicBookScene scrollProgress={scrollProgress} />

      {/* Narrative Overlay - 12 Sections */}
      <div className="relative z-10 pointer-events-none">
        {/* Phase 1: Entry (0-8%) */}
        <section className="h-[200vh] flex items-center justify-center">
          <div className="max-w-3xl mx-auto px-8 text-center pointer-events-auto opacity-80">
            <div className="text-sm uppercase tracking-[0.3em] text-[#63692B] mb-4">
              Random Acts of Self-Actualization
            </div>
            <h1 className="text-7xl md:text-9xl font-bold text-[#e2ffc2] mb-8 tracking-tight leading-none">
              Blocks
              <br />
              A & B
            </h1>
            <p className="text-xl text-[#c5d2b7] leading-relaxed max-w-xl mx-auto">
              A curated collection of transformative literature,
              preserved in time and space
            </p>
          </div>
        </section>

        {/* Phase 2: Rotation (8-16%) */}
        <section className="h-[200vh] flex items-center justify-end">
          <div className="max-w-xl mr-20 px-8 pointer-events-auto opacity-80">
            <h2 className="text-5xl font-bold text-[#e2ffc2] mb-6">
              The Object
            </h2>
            <p className="text-lg text-[#c5d2b7] leading-relaxed mb-4">
              Before we dive into its contents, observe the form itself.
              A physical manifestation of collected wisdom.
            </p>
            <p className="text-sm text-[#63692B]">
              15 pages • Curated content • Timeless design
            </p>
          </div>
        </section>

        {/* Phase 3: Opening (16-24%) */}
        <section className="h-[200vh] flex items-center justify-start">
          <div className="max-w-xl ml-20 px-8 pointer-events-auto opacity-80">
            <h2 className="text-5xl font-bold text-[#e2ffc2] mb-6">
              The Unveiling
            </h2>
            <p className="text-lg text-[#c5d2b7] leading-relaxed">
              As the cover lifts, we cross the threshold between
              object and experience. What lies within is not just text,
              but transformation.
            </p>
          </div>
        </section>

        {/* Phase 4: Initial Separation (24-32%) */}
        <section className="h-[200vh] flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-8 text-center pointer-events-auto opacity-80">
            <h2 className="text-5xl font-bold text-[#e2ffc2] mb-6">
              Deconstructing Knowledge
            </h2>
            <p className="text-lg text-[#c5d2b7] leading-relaxed">
              Each page begins its journey. To understand the whole,
              we must first appreciate the parts.
            </p>
          </div>
        </section>

        {/* Phase 5: Full Explosion (32-40%) */}
        <section className="h-[200vh] flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-8 text-center pointer-events-auto opacity-80">
            <h2 className="text-6xl font-bold text-[#e2ffc2] mb-6">
              Liberation
            </h2>
            <p className="text-xl text-[#c5d2b7] leading-relaxed">
              Ideas cannot be contained. They scatter, seeking minds
              ready to receive them.
            </p>
          </div>
        </section>

        {/* Phase 6: Orbital (40-48%) */}
        <section className="h-[200vh] flex items-center justify-end">
          <div className="max-w-xl mr-20 px-8 pointer-events-auto opacity-80">
            <h2 className="text-5xl font-bold text-[#e2ffc2] mb-6">
              Synchronized Dance
            </h2>
            <p className="text-lg text-[#c5d2b7] leading-relaxed">
              Though separate, the pages remain connected—
              orbiting a shared center, a common purpose.
            </p>
          </div>
        </section>

        {/* Phase 7: Wave (48-56%) */}
        <section className="h-[200vh] flex items-center justify-start">
          <div className="max-w-xl ml-20 px-8 pointer-events-auto opacity-80">
            <h2 className="text-5xl font-bold text-[#e2ffc2] mb-6">
              Rhythm & Flow
            </h2>
            <p className="text-lg text-[#c5d2b7] leading-relaxed">
              Knowledge moves in waves, building upon itself,
              creating patterns of understanding.
            </p>
          </div>
        </section>

        {/* Phase 8: Fly-Through (56-64%) */}
        <section className="h-[200vh] flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-8 text-center pointer-events-auto opacity-80">
            <h2 className="text-5xl font-bold text-[#e2ffc2] mb-6">
              Immersion
            </h2>
            <p className="text-lg text-[#c5d2b7] leading-relaxed">
              Dive deeper. Pass through the pages themselves.
              Experience the content, not as observer, but as participant.
            </p>
          </div>
        </section>

        {/* Phase 9: Camera Fly-Through (64-72%) */}
        <section className="h-[200vh] flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-8 text-center pointer-events-auto opacity-80">
            <h2 className="text-6xl font-bold text-[#e2ffc2] mb-6">
              The Journey Within
            </h2>
            <p className="text-xl text-[#c5d2b7] leading-relaxed">
              Navigate through the pages themselves. Each one shifts,
              rotates, and reveals new paths—a labyrinth of wisdom.
            </p>
          </div>
        </section>

        {/* Phase 10: Reassembly (72-80%) */}
        <section className="h-[200vh] flex items-center justify-end">
          <div className="max-w-xl mr-20 px-8 pointer-events-auto opacity-80">
            <h2 className="text-5xl font-bold text-[#e2ffc2] mb-6">
              Reconstruction
            </h2>
            <p className="text-lg text-[#c5d2b7] leading-relaxed">
              The pages remember their order. Knowledge seeks
              structure. Understanding crystallizes.
            </p>
          </div>
        </section>

        {/* Phase 11: Reform (80-88%) */}
        <section className="h-[200vh] flex items-center justify-start">
          <div className="max-w-xl ml-20 px-8 pointer-events-auto opacity-80">
            <h2 className="text-5xl font-bold text-[#e2ffc2] mb-6">
              Unity Restored
            </h2>
            <p className="text-lg text-[#c5d2b7] leading-relaxed">
              The book reforms, but you are changed. The same pages,
              seen through transformed eyes.
            </p>
          </div>
        </section>

        {/* Phase 12: Final Showcase (88-100%) */}
        <section className="h-[300vh] flex items-center justify-center">
          <div className="max-w-3xl mx-auto px-8 text-center pointer-events-auto">
            <h2 className="text-6xl font-bold text-[#e2ffc2] mb-8">
              Begin Your Journey
            </h2>
            <p className="text-xl text-[#c5d2b7] leading-relaxed mb-12 max-w-2xl mx-auto">
              You've witnessed the book's transformation. Now it's time
              to explore its contents and discover your own path to
              self-actualization.
            </p>
            <button className="px-12 py-6 bg-[#e2ffc2] text-[#05201f] text-lg font-semibold rounded-xl hover:bg-[#c5d2b7] hover:scale-105 transition-all duration-300 shadow-2xl">
              Enter the Collection
            </button>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#e2ffc2] mb-2">15</div>
                <div className="text-sm text-[#63692B] uppercase tracking-wider">Pages</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#e2ffc2] mb-2">12</div>
                <div className="text-sm text-[#63692B] uppercase tracking-wider">Phases</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#e2ffc2] mb-2">∞</div>
                <div className="text-sm text-[#63692B] uppercase tracking-wider">Insights</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Phase Indicator - Fixed Bottom Left */}
      <div className="fixed bottom-8 left-8 bg-black/60 backdrop-blur-xl px-8 py-6 rounded-xl border border-[#e2ffc2]/20 pointer-events-none z-50">
        <div className="text-xs text-[#63692B] uppercase tracking-wider mb-3">
          Phase {currentPhase} of 12
        </div>
        <div className="text-2xl font-bold text-[#e2ffc2] mb-2">
          {phases[currentPhase - 1]?.name}
        </div>
        <div className="text-sm text-[#c5d2b7] max-w-xs">
          {phases[currentPhase - 1]?.description}
        </div>
        <div className="mt-4 w-64 h-1.5 bg-[#003635] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#63692B] to-[#e2ffc2] transition-all duration-300"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-[#63692B] text-right">
          {Math.round(scrollProgress * 100)}%
        </div>
      </div>

      {/* Scroll Hint - Fades out after 10% */}
      <div
        className="fixed bottom-12 left-1/2 transform -translate-x-1/2 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: Math.max(0, 1 - scrollProgress * 10) }}
      >
        <div className="text-center">
          <div className="text-sm text-[#c5d2b7] uppercase tracking-widest mb-4">
            Scroll to explore
          </div>
          <div className="w-6 h-10 border-2 border-[#e2ffc2]/30 rounded-full mx-auto relative">
            <div
              className="w-1.5 h-2 bg-[#e2ffc2] rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
