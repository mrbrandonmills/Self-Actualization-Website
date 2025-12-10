/**
 * Award-Winning 2026 Homepage
 * KASANÉ-Style 3D Book Journey - Action Movie Hero Experience
 * 87 Pages Flying Through Space with Dynamic Camera
 */

'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { KasaneBookJourney } from '@/components/3d/KasaneBookJourney';
import {
  ProcessFlowSection,
  FeaturedBooksSection,
  LatestEssaysSection,
} from '@/components/sections';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useBookPreloader } from '@/hooks/useBookPreloader';
import { MobileBookExperience } from '@/components/home/MobileBookExperience';

// Narrative overlays that appear as you scroll through the 3D journey
const narrativeOverlays = [
  {
    scrollStart: 0.0,
    scrollEnd: 0.12,
    title: 'WELCOME',
    subtitle: 'To The Laboratory of Life',
    description: 'Where self-actualization meets scientific experimentation.',
  },
  {
    scrollStart: 0.15,
    scrollEnd: 0.28,
    title: 'BUILDING BLOCK A',
    subtitle: 'Foundation of Awareness',
    description: 'The first principles of understanding yourself.',
  },
  {
    scrollStart: 0.3,
    scrollEnd: 0.45,
    title: 'BUILDING BLOCK B',
    subtitle: 'Patterns of Growth',
    description: 'Recognizing the systems that shape your reality.',
  },
  {
    scrollStart: 0.48,
    scrollEnd: 0.62,
    title: 'THE LABORATORY',
    subtitle: 'Block C: Where Theory Meets Practice',
    description: 'Conducting experiments on your own life.',
  },
  {
    scrollStart: 0.65,
    scrollEnd: 0.78,
    title: 'INTEGRATION',
    subtitle: 'All Blocks Working Together',
    description: 'When awareness, patterns, and practice align.',
  },
  {
    scrollStart: 0.8,
    scrollEnd: 0.95,
    title: 'SELF-ACTUALIZATION',
    subtitle: 'Becoming Your Own Experiment',
    description: 'The laboratory is your life. The scientist is you.',
  },
];

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/touch devices - skip heavy 3D on mobile
  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmall = window.innerWidth < 768;
    setIsMobile(hasTouch || isSmall);
  }, []);

  // Preload all book assets
  const { progress, isLoaded } = useBookPreloader();

  // Calculate combined progress: assets (0-85%) + Canvas init (85-100%)
  const [canvasInitProgress, setCanvasInitProgress] = useState(0);
  const combinedProgress = isCanvasReady
    ? 100
    : (isLoaded ? 85 + (canvasInitProgress * 15) : Math.min(85, progress * 0.85));

  // Simulate Canvas initialization progress (85% to 100%)
  useEffect(() => {
    if (isLoaded && !isCanvasReady) {
      // Gradually increment from 0 to 1 while waiting for Canvas
      const interval = setInterval(() => {
        setCanvasInitProgress((prev) => {
          if (isCanvasReady) return 1;
          return Math.min(0.99, prev + 0.05); // Increment slowly, never quite reach 100% until Canvas is ready
        });
      }, 100);
      return () => clearInterval(interval);
    } else if (isCanvasReady) {
      setCanvasInitProgress(1);
    }
  }, [isLoaded, isCanvasReady]);

  // ONLY initialize scroll AFTER loading AND Canvas are both ready
  useEffect(() => {
    // Don't initialize anything until BOTH assets loaded AND Canvas ready
    if (!isLoaded || !isCanvasReady) return undefined;

    // Initialize Lenis smooth scroll ONLY when ready
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });

    // CRITICAL: Connect Lenis to ScrollTrigger for horizontal scroll animations
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update scroll progress
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, [isLoaded, isCanvasReady]); // Run when both assets and Canvas are ready

  // Hide loading screen when BOTH assets are loaded AND Canvas is ready
  // Mobile: Show content immediately (no Canvas to wait for)
  useEffect(() => {
    if (isMobile) {
      setShowContent(true);
    } else if (isLoaded && isCanvasReady) {
      setShowContent(true);
    }
  }, [isLoaded, isCanvasReady, isMobile]);

  return (
    <main className="min-h-screen">
      {/* Loading Screen - DESKTOP ONLY */}
      {!isMobile && !showContent && (
        <LoadingScreen
          progress={Math.round(combinedProgress)}
          onComplete={() => {}}
        />
      )}

      {/* Fixed 3D Canvas - DESKTOP ONLY (mobile skips to prevent crash) */}
      {!isMobile && isLoaded && (
        <div className="fixed top-0 left-0 w-screen h-screen z-0">
          <Canvas
            camera={{ position: [0, 0, 50], fov: 75 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            dpr={[1, 2]}
          >
            <KasaneBookJourney
              scrollProgress={scrollProgress}
              onSceneReady={() => setIsCanvasReady(true)}
            />
          </Canvas>
        </div>
      )}

      {/* Mobile Book Experience - Swipeable page-flip book */}
      {isMobile && <MobileBookExperience />}

      {/* Scrollable narrative overlays - DESKTOP ONLY */}
      {!isMobile && <div className="relative z-10">
        {/* Spacer sections for scroll journey */}
        {narrativeOverlays.map((overlay, index) => (
          <section
            key={index}
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 pointer-events-none"
          >
            <div
              className={`w-full max-w-3xl transition-all duration-1000 ${
                scrollProgress >= overlay.scrollStart && scrollProgress <= overlay.scrollEnd
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 md:p-12 border border-[var(--accent-warm)]/20 pointer-events-auto shadow-2xl">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--olive-dark)] mb-2 sm:mb-3">
                  {overlay.title}
                </h2>
                <h3 className="text-lg sm:text-xl md:text-2xl text-[var(--accent-warm)] mb-4 sm:mb-6 italic font-light">
                  {overlay.subtitle}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-[var(--olive-dark)]/80 leading-relaxed">
                  {overlay.description}
                </p>
              </div>
            </div>
          </section>
        ))}

        {/* Transition to regular content */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f5f5f0] via-[#faf8f5] to-[var(--bg-primary)] px-4 sm:px-6">
          <div className="w-full max-w-3xl text-center pointer-events-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--olive-dark)] mb-6 sm:mb-8">
              Welcome to The Laboratory of Life
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-[var(--olive-dark)]/70 mb-8 sm:mb-12 leading-relaxed px-4">
              Where self-actualization meets scientific experimentation.
              <br className="hidden sm:block" />
              <span className="block sm:inline"> Your life is the lab. You are the scientist.</span>
            </p>
            <div className="flex gap-3 sm:gap-4 justify-center flex-wrap px-4">
              <a
                href="#process"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[var(--accent-warm)] via-[#d4a574] to-[var(--accent-warm)] bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-lg text-white font-semibold shadow-2xl hover:shadow-[0_0_40px_rgba(196,163,90,0.6)] transition-all duration-500 text-sm sm:text-base min-h-[48px] flex items-center"
              >
                Enter The Laboratory →
              </a>
              <a
                href="/books"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-[var(--accent-warm)] rounded-lg text-[var(--accent-warm)] font-semibold shadow-xl hover:bg-[var(--accent-warm)] hover:text-white transition-all duration-300 text-sm sm:text-base min-h-[48px] flex items-center"
              >
                Shop Books 📚
              </a>
            </div>
          </div>
        </section>
      </div>}

      {/* Regular sections below journey */}
      <div id="process" className="bg-[var(--bg-primary)]">
        <ProcessFlowSection />
      </div>

      <FeaturedBooksSection />

      <LatestEssaysSection />

      {/* Footer */}
      <footer className="bg-[var(--olive-dark)] text-[var(--bg-primary)] py-[var(--space-xl)] sm:py-[var(--space-2xl)]">
        <div className="max-w-[var(--content-width-wide)] mx-auto px-4 sm:px-[var(--space-md)] text-center">
          <p className="text-base sm:text-lg mb-[var(--space-sm)]">
            We Are All Made of Stardust
          </p>
          <p className="text-sm sm:small opacity-70">
            © 2026 The Self Actualized Life. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
