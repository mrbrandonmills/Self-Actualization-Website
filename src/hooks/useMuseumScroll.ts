import { useState, useEffect } from 'react'

/**
 * useMuseumScroll - Track scroll progress for 3D camera animation
 *
 * Returns scroll progress as a normalized value (0-1) that can be used
 * to animate the camera through the museum journey
 */
export function useMuseumScroll() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      // Get current scroll position
      const scrollY = window.scrollY

      // Calculate maximum scroll distance
      const maxScroll = document.body.scrollHeight - window.innerHeight

      // Normalize to 0-1 range
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0

      setScrollProgress(progress)
    }

    // Update on scroll
    const handleScroll = () => {
      requestAnimationFrame(updateScrollProgress)
    }

    // Initial check
    updateScrollProgress()

    // Add listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollProgress
}
