/**
 * Scroll Test Page - Phase 1 Quality Gate
 *
 * Tests Lenis smooth scroll implementation for:
 * - 60fps performance on desktop
 * - 60fps performance on mobile
 * - Smooth deceleration (no jank)
 * - Memory stability (no leaks)
 *
 * Testing Procedure:
 * 1. Open Chrome DevTools > Performance
 * 2. Start recording
 * 3. Scroll continuously for 10 seconds
 * 4. Stop recording and verify:
 *    - FPS stays at 60
 *    - No long tasks (>50ms)
 *    - Smooth frame timing
 *
 * Memory Test:
 * 1. Chrome DevTools > Memory
 * 2. Take heap snapshot
 * 3. Scroll for 1 minute
 * 4. Take second snapshot
 * 5. Compare - minimal growth expected
 */

export default function ScrollTest() {
  return (
    <main className="min-h-[300vh] bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Fixed Header with Performance Stats */}
      <div className="fixed top-0 left-0 w-full p-8 bg-black/50 backdrop-blur-xl z-50 border-b border-white/10">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            Smooth Scroll Test
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Phase 1 - Quality Gate 1 Validation
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
            <span>✓ Lenis duration: 1.2s</span>
            <span>✓ Exponential easing</span>
            <span>✓ RAF loop: 60fps target</span>
            <span>✓ Touch multiplier: 2x</span>
          </div>
        </div>
      </div>

      {/* Scroll Content - 50 Sections */}
      <div className="container mx-auto px-4 pt-40 pb-20">
        <div className="space-y-8">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="p-12 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-white">
                  Section {i + 1}
                </h2>
                <span className="text-gray-500 text-sm font-mono">
                  {i % 2 === 0 ? 'EVEN' : 'ODD'}
                </span>
              </div>

              <p className="text-gray-400 leading-relaxed mb-4">
                Testing smooth scrolling behavior with Lenis. This section demonstrates
                the butter-smooth momentum scrolling that creates a luxury experience
                similar to Apple's product pages and premium automotive websites.
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${((i + 1) / 50) * 100}%` }}
                />
              </div>

              <div className="mt-4 text-xs text-gray-600">
                Progress: {Math.round(((i + 1) / 50) * 100)}% • Scroll {50 - i - 1} more sections
              </div>
            </div>
          ))}
        </div>

        {/* Completion Message */}
        <div className="mt-16 p-16 bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-3xl border-2 border-green-500/30 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Scroll Test Complete!
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            You've reached the end of the scroll test. Review the Chrome DevTools
            Performance tab to verify 60fps was maintained throughout.
          </p>

          {/* Testing Checklist */}
          <div className="max-w-xl mx-auto text-left bg-black/30 rounded-xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">Quality Gate 1 Checklist:</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="text-green-500">☐</span>
                <span>60fps on desktop (Chrome DevTools Performance)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500">☐</span>
                <span>60fps on mobile (test on real device)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500">☐</span>
                <span>No janky scrolling or stuttering</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500">☐</span>
                <span>Memory stable (no leaks after 1min)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500">☐</span>
                <span>Smooth deceleration feel</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500">☐</span>
                <span>Works on trackpad, mouse wheel, touch</span>
              </li>
            </ul>
          </div>

          {/* Performance Targets */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-400">60</div>
              <div className="text-xs text-gray-500 uppercase">Target FPS</div>
            </div>
            <div className="bg-black/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-400">1.2s</div>
              <div className="text-xs text-gray-500 uppercase">Duration</div>
            </div>
            <div className="bg-black/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-purple-400">50ms</div>
              <div className="text-xs text-gray-500 uppercase">Max Task</div>
            </div>
            <div className="bg-black/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-orange-400">~0</div>
              <div className="text-xs text-gray-500 uppercase">Memory Δ</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
