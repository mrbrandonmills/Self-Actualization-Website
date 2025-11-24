import { useState, useEffect } from 'react'

export type ScrollDirection = 'up' | 'down' | 'top'

/**
 * Hook to detect scroll direction and position
 * Used for hiding/showing navigation on scroll
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('top')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY

      // At the very top
      if (currentScrollY < 10) {
        setScrollDirection('top')
      }
      // Scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down')
      }
      // Scrolling up
      else if (currentScrollY < lastScrollY) {
        setScrollDirection('up')
      }

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0
      setScrollY(currentScrollY)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrollDirection, scrollY }
}
