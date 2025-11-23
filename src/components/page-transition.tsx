'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

/**
 * PageTransition Component
 *
 * Wraps all page content with smooth fade + blur transitions between route changes.
 * Creates museum-quality page transitions with luxury easing.
 *
 * Features:
 * - 0.4s duration with luxury cubic-bezier easing
 * - Fade + blur effect for cinematic transitions
 * - Works seamlessly with Next.js App Router
 * - AnimatePresence ensures smooth exit animations
 * - Key on pathname triggers re-render on route change
 *
 * Usage:
 * <PageTransition>{children}</PageTransition>
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{
          opacity: 0,
          filter: 'blur(8px)',
        }}
        animate={{
          opacity: 1,
          filter: 'blur(0px)',
        }}
        exit={{
          opacity: 0,
          filter: 'blur(8px)',
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1], // Luxury easing from design tokens
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
