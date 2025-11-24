import { useEffect, useState } from 'react'
import Lenis from 'lenis'

/**
 * useLenisScroll - Butter-smooth scroll with Lenis
 *
 * Provides normalized scroll progress (0-1) with inertial smoothing
 * Used for scroll-driven animations and camera movement
 */
export function useLenisScroll() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    setLenis(lenisInstance)

    // RAF loop for Lenis
    function raf(time: number) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Update scroll progress
    lenisInstance.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
      const progress = limit > 0 ? scroll / limit : 0
      setScrollProgress(progress)
    })

    return () => {
      lenisInstance.destroy()
    }
  }, [])

  return { scrollProgress, lenis }
}
