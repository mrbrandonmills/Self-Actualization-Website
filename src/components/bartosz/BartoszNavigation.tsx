'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { UserMenu } from '@/components/auth/UserMenu'

/**
 * BartoszNavigation - Sticky nav with backdrop blur
 *
 * Features:
 * - Glass blur effect on scroll
 * - Hide/show based on scroll direction
 * - Active route highlighting
 * - Mobile hamburger menu
 * - Uppercase tracking (Bartosz style)
 */

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/courses', label: 'Courses' },
  { href: '/writing-lab', label: 'Writing Lab' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export function BartoszNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollDirection, scrollY } = useScrollDirection()
  const pathname = usePathname()

  // Determine if nav should be visible
  const isVisible = scrollDirection === 'top' || scrollDirection === 'up'

  // Determine if nav should have glass background
  const hasBackground = scrollY > 50

  return (
    <>
      <motion.nav
        className="bartosz-nav"
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          backgroundColor: hasBackground
            ? 'rgba(5, 32, 31, 0.8)'
            : 'rgba(5, 32, 31, 0)',
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94], // Bartosz cubic-bezier
        }}
      >
        <div className="nav-container">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <span className="logo-text">The Self</span>
            <span className="logo-accent">Actualized</span>
            <span className="logo-text">Life</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links-desktop">
            {navLinks.map((link) => {
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      className="nav-link-underline"
                      layoutId="underline"
                      transition={{
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* User Menu (Desktop) */}
          <div className="hidden md:block">
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="mobile-menu-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="mobile-menu-content">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                      }}
                    >
                      <Link
                        href={link.href}
                        className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}

                {/* Mobile Auth Section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                  className="pt-4 mt-4 border-t border-white/10"
                >
                  <UserMenu />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* Navigation Container */
        .bartosz-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--z-sticky);
          padding: var(--space-lg) var(--space-xl);
          backdrop-filter: var(--blur-medium);
          -webkit-backdrop-filter: var(--blur-medium);
          border-bottom: 1px solid var(--color-ui-border);
          transition: background-color 0.3s ease;
        }

        .nav-container {
          max-width: var(--max-width-2xl);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-serif);
          font-size: var(--font-size-small);
          font-weight: var(--font-weight-light);
          color: var(--color-text-primary);
          text-decoration: none;
          letter-spacing: var(--tracking-wider);
          transition: color var(--transition-base);
        }

        .nav-logo:hover {
          color: var(--color-accent-gold);
        }

        .logo-accent {
          color: var(--color-accent-gold);
          font-weight: var(--font-weight-medium);
        }

        /* Desktop Links */
        .nav-links-desktop {
          display: none;
          gap: var(--space-xl);
        }

        @media (min-width: 768px) {
          .nav-links-desktop {
            display: flex;
          }
        }

        .nav-link {
          position: relative;
          font-family: var(--font-sans);
          font-size: var(--font-size-small);
          font-weight: var(--font-weight-medium);
          color: var(--color-text-secondary);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: var(--tracking-widest);
          transition: color var(--transition-base);
          padding-bottom: 4px;
        }

        .nav-link:hover {
          color: var(--color-text-primary);
        }

        .nav-link.active {
          color: var(--color-accent-gold);
        }

        /* Active Link Underline */
        .nav-link-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-accent-gold);
        }

        /* Mobile Menu Button */
        .mobile-menu-button {
          display: block;
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--space-xs);
          z-index: calc(var(--z-modal) + 1);
        }

        @media (min-width: 768px) {
          .mobile-menu-button {
            display: none;
          }
        }

        /* Hamburger Icon */
        .hamburger {
          width: 24px;
          height: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hamburger span {
          display: block;
          height: 2px;
          width: 100%;
          background: var(--color-text-primary);
          transition: all 0.3s ease;
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }

        /* Mobile Menu Backdrop */
        .mobile-menu-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(5, 32, 31, 0.8);
          backdrop-filter: var(--blur-medium);
          -webkit-backdrop-filter: var(--blur-medium);
          z-index: var(--z-modal);
        }

        /* Mobile Menu Panel */
        .mobile-menu-panel {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 80%;
          max-width: 400px;
          background: var(--color-dark-green);
          border-left: 1px solid var(--color-ui-border);
          z-index: calc(var(--z-modal) + 1);
          overflow-y: auto;
        }

        .mobile-menu-content {
          padding: var(--space-5xl) var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        /* Mobile Nav Links */
        .mobile-nav-link {
          display: block;
          font-family: var(--font-sans);
          font-size: var(--font-size-h4);
          font-weight: var(--font-weight-light);
          color: var(--color-text-secondary);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
          padding: var(--space-md) 0;
          border-bottom: 1px solid var(--color-ui-border);
          transition: color var(--transition-base);
        }

        .mobile-nav-link:hover {
          color: var(--color-text-primary);
        }

        .mobile-nav-link.active {
          color: var(--color-accent-gold);
          border-color: var(--color-accent-gold);
        }

        /* Prevent scroll when menu open */
        body.menu-open {
          overflow: hidden;
        }

        /* Mobile Navigation - Liquid Glass Effect */
        @media (max-width: 767px) {
          .bartosz-nav {
            /* Liquid Glass / Frosted Glass Effect */
            background: rgba(255, 255, 255, 0.75) !important;
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border-bottom: 1px solid rgba(255, 255, 255, 0.25);
            box-shadow:
              0 4px 30px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.4);
          }

          .nav-logo {
            color: #3d4a3a !important; /* Olive dark - visible on light backgrounds */
          }

          .logo-text {
            color: #3d4a3a !important;
          }

          .logo-accent {
            color: #c4a35a !important; /* Gold accent */
          }

          .hamburger span {
            background: #3d4a3a !important; /* Visible hamburger lines */
          }

          /* Active/open state - darker glass */
          .bartosz-nav.menu-open {
            background: rgba(255, 255, 255, 0.95) !important;
          }
        }
      `}</style>
    </>
  )
}
