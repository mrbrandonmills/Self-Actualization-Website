'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { designTokens } from '@/lib/design-tokens'

/**
 * Museum-Quality Magnetic Cursor for The Self Actualized Life
 *
 * Features:
 * - Magnetic pull towards interactive elements (100px radius, 30% strength)
 * - Contextual states: default, link, button, drag
 * - Gold glow halo with radial gradient
 * - Slow-following trail effect (0.3s delay)
 * - Scale on hover (1.5x) with smooth spring physics
 * - Press feedback (shrinks on mouse down)
 * - Support for data-cursor-text and data-cursor-magnetic attributes
 * - GPU-accelerated transforms for 60fps performance
 * - Disabled on mobile/touch devices
 *
 * Luxury design inspired by Louis Vuitton, Hermès, and Apple
 */

type CursorVariant = 'default' | 'link' | 'button' | 'drag'

interface CursorState {
  isHovering: boolean
  isVisible: boolean
  isPressed: boolean
  cursorText: string
  variant: CursorVariant
}

export function CustomCursor() {
  // State management
  const [state, setState] = useState<CursorState>({
    isHovering: false,
    isVisible: false,
    isPressed: false,
    cursorText: '',
    variant: 'default',
  })

  // Mouse position tracking with Motion Values for smooth GPU-accelerated transforms
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Luxury spring physics - smooth and elegant
  const springConfig = {
    damping: 30,
    stiffness: 400,
    mass: 0.5,
  }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Trail effect - slow-following ambient glow (0.3s delay)
  const trailX = useMotionValue(-100)
  const trailY = useMotionValue(-100)
  const trailSpring = {
    damping: 40,
    stiffness: 200,
    mass: 0.8,
  }
  const trailXSpring = useSpring(trailX, trailSpring)
  const trailYSpring = useSpring(trailY, trailSpring)

  // Magnetic effect calculation
  const calculateMagneticPull = useCallback((
    mouseX: number,
    mouseY: number,
    element: HTMLElement
  ): { x: number; y: number } => {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from cursor to element center
    const distance = Math.sqrt(
      Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
    )

    // Apply magnetic pull within 100px radius with 30% strength
    if (distance < 100) {
      const strength = Math.min(0.3, ((100 - distance) / 100) * 0.3)
      return {
        x: mouseX + (centerX - mouseX) * strength,
        y: mouseY + (centerY - mouseY) * strength,
      }
    }

    return { x: mouseX, y: mouseY }
  }, [])

  // Event handlers
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      let finalX = e.clientX
      let finalY = e.clientY

      // Apply magnetic effect if hovering over interactive element
      if (state.isHovering) {
        const magneticElement = target.closest('button, a, [data-cursor-magnetic]') as HTMLElement
        if (magneticElement) {
          const pulled = calculateMagneticPull(finalX, finalY, magneticElement)
          finalX = pulled.x
          finalY = pulled.y
        }
      }

      // Apply press feedback offset
      const pressOffset = state.isPressed ? 2 : 0

      // Update cursor position (offset by half the cursor size for centering)
      cursorX.set(finalX - 20 + pressOffset)
      cursorY.set(finalY - 20 + pressOffset)
      trailX.set(finalX - 20)
      trailY.set(finalY - 20)

      if (!state.isVisible) {
        setState(prev => ({ ...prev, isVisible: true }))
      }
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Get cursor text from data attribute
      const text = target.getAttribute('data-cursor-text') || ''

      // Determine cursor variant based on element type
      let variant: CursorVariant = 'default'
      if (target.closest('button')) {
        variant = 'button'
      } else if (target.closest('a')) {
        variant = 'link'
      } else if (target.hasAttribute('data-cursor-drag')) {
        variant = 'drag'
      }

      setState(prev => ({
        ...prev,
        isHovering: true,
        cursorText: text,
        variant,
      }))
    }

    const handleMouseLeave = () => {
      setState(prev => ({
        ...prev,
        isHovering: false,
        cursorText: '',
        variant: 'default',
      }))
    }

    const handleMouseDown = () => {
      setState(prev => ({ ...prev, isPressed: true }))
    }

    const handleMouseUp = () => {
      setState(prev => ({ ...prev, isPressed: false }))
    }

    // Attach global event listeners
    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    // Attach hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover], [data-cursor-magnetic]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter as EventListener)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter as EventListener)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [state.isHovering, state.isPressed, state.isVisible, cursorX, cursorY, trailX, trailY, calculateMagneticPull])

  // Hide on mobile/touch devices
  if (typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window)) {
    return null
  }

  // Cursor sizes based on variant
  const cursorSizes: Record<CursorVariant, { main: number; dot: number }> = {
    default: { main: 40, dot: 6 },
    link: { main: 60, dot: 0 },
    button: { main: 80, dot: 0 },
    drag: { main: 100, dot: 0 },
  }

  const { main: mainSize, dot: dotSize } = cursorSizes[state.variant]

  return (
    <>
      {/* Trail Effect - Sage glow halo with slow follow (0.3s delay) */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-[9998]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          opacity: state.isVisible ? 0.3 : 0,
        }}
        aria-hidden="true"
      >
        <motion.div
          className="w-full h-full rounded-full"
          style={{
            background: designTokens.gradients.sageRadial,
          }}
          animate={{
            scale: state.isHovering ? 1.5 : 1,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </motion.div>

      {/* Main Cursor Ring - Luxury sage with contextual sizing */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: state.isVisible ? 1 : 0,
          width: 40,
          height: 40,
        }}
        aria-hidden="true"
      >
        <motion.div
          className="rounded-full border-2 flex items-center justify-center"
          style={{
            borderColor: '#8A9A5B', // sage green
          }}
          animate={{
            width: mainSize,
            height: mainSize,
            borderWidth: state.isHovering ? 1 : 2,
            scale: state.isPressed ? 0.95 : 1,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Cursor Text - Contextual hints */}
          {state.cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[10px] font-sans font-light tracking-widest uppercase whitespace-nowrap"
              style={{
                color: '#8A9A5B', // sage green
              }}
            >
              {state.cursorText}
            </motion.span>
          )}

          {/* Link Icon - Subtle arrow */}
          {state.variant === 'link' && !state.cursorText && (
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              style={{
                color: '#8A9A5B', // sage green
              }}
            >
              <path
                d="M8 3v10M13 8l-5 5-5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="rotate(-90 8 8)"
              />
            </motion.svg>
          )}

          {/* Drag Icon */}
          {state.variant === 'drag' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs"
              style={{
                color: '#8A9A5B', // sage green
              }}
            >
              ⟷
            </motion.div>
          )}
        </motion.div>

        {/* Sage Glow on Hover - Radial gradient halo */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: designTokens.gradients.sageRadial,
          }}
          animate={{
            scale: state.isHovering ? 1.5 : 0,
            opacity: state.isHovering ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </motion.div>

      {/* Center Dot - Default state only */}
      {dotSize > 0 && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            opacity: state.isVisible ? 1 : 0,
            left: 17,
            top: 17,
          }}
          aria-hidden="true"
        >
          <motion.div
            className="rounded-full"
            style={{
              backgroundColor: designTokens.colors.white,
            }}
            animate={{
              width: dotSize,
              height: dotSize,
              scale: state.isHovering ? 0 : 1,
            }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>
      )}

      {/* Global Styles - Hide default cursor and preserve accessibility */}
      <style jsx global>{`
        /* Hide default cursor on desktop */
        @media (min-width: 768px) and (hover: hover) {
          body,
          body * {
            cursor: none !important;
          }
        }

        /* Preserve focus indicators for accessibility (WCAG) */
        *:focus-visible {
          outline: 2px solid #8A9A5B;
          outline-offset: 4px;
          border-radius: 4px;
        }

        /* Luxury text selection */
        ::selection {
          background-color: #8A9A5B;
          color: #000000;
        }

        ::-moz-selection {
          background-color: #8A9A5B;
          color: #000000;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  )
}
