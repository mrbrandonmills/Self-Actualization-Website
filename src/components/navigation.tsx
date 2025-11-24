'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { animationPresets, motionVariants } from '@/lib/design-tokens'
import { getNavColor } from '@/lib/rainbow-colors'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Mock cart count - replace with actual cart context later
  const cartItemCount = 0

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { name: 'Books', href: '/books' },
    { name: 'Courses', href: '/courses' },
    { name: 'Writing Lab', href: '/writing-lab' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
  ]

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={animationPresets.slow}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-navbar h-20'
            : 'bg-transparent h-24'
        }`}
        style={{
          backdropFilter: scrolled
            ? 'blur(40px) saturate(180%)'
            : 'blur(0px) saturate(100%)',
          WebkitBackdropFilter: scrolled
            ? 'blur(40px) saturate(180%)'
            : 'blur(0px) saturate(100%)',
        }}
      >
        <div className="container-wide h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo / Brand Name */}
            <Link
              href="/"
              className="group relative flex items-center gap-3"
              aria-label="The Self Actualized Life Home"
            >
              {/* Sage accent mark */}
              <motion.div
                className="w-1.5 h-10 bg-gradient-to-b from-[#8A9A5B] to-[#6B7A3D] rounded-full"
                whileHover={{ scaleY: 1.2 }}
                transition={animationPresets.fast}
              />

              {/* Brand text */}
              <div className="flex flex-col">
                <span className="font-serif text-xl md:text-2xl text-white font-light tracking-wider leading-tight">
                  The Self Actualized Life
                </span>
                <motion.div
                  className="h-px bg-gradient-to-r from-[#8A9A5B] to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const linkColor = getNavColor(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative min-h-[44px] flex items-center"
                  >
                    <motion.span
                      className={`text-sm font-sans tracking-wide transition-colors duration-300 ${
                        pathname === link.href
                          ? 'text-white'
                          : 'text-white/60'
                      }`}
                      whileHover={{
                        color: linkColor,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {link.name}
                    </motion.span>

                    {/* Rainbow underline animation */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-px"
                      style={{
                        background: `linear-gradient(to right, ${linkColor}, ${linkColor}88)`,
                      }}
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={animationPresets.fast}
                    />

                    {/* Active indicator */}
                    {pathname === link.href && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-px"
                        style={{
                          background: `linear-gradient(to right, ${linkColor}, ${linkColor}88)`,
                        }}
                        transition={animationPresets.normal}
                      />
                    )}
                  </Link>
                )
              })}

              {/* Shopping Cart */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative min-w-[44px] min-h-[44px] flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300"
                aria-label="Shopping cart"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />

                {/* Cart badge */}
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-1 -right-1 min-w-[20px] min-h-[20px] bg-[#8A9A5B] text-white text-xs font-medium rounded-full flex items-center justify-center px-1.5 shadow-lg"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-w-[48px] min-h-[48px] flex flex-col items-center justify-center gap-1.5 -mr-2"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 8 : 0,
                }}
                transition={animationPresets.fast}
                className="w-6 h-0.5 bg-white rounded-full"
              />
              <motion.span
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
                transition={animationPresets.fast}
                className="w-6 h-0.5 bg-white rounded-full"
              />
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -8 : 0,
                }}
                transition={animationPresets.fast}
                className="w-6 h-0.5 bg-white rounded-full"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={animationPresets.normal}
              className="fixed inset-0 z-40 lg:hidden backdrop-blur-sm"
              style={{ background: 'rgba(58, 58, 58, 0.3)' }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ ...animationPresets.slow, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 lg:hidden w-full max-w-sm"
              style={{
                background: 'rgba(5, 5, 5, 0.95)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Menu Content */}
              <div className="flex flex-col h-full pt-32 pb-8 px-8 overflow-y-auto">
                {/* Navigation Links */}
                <motion.div
                  variants={motionVariants.staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="flex flex-col gap-6"
                >
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      variants={motionVariants.fadeInRight}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group relative inline-block min-h-[48px] flex items-center ${
                          pathname === link.href
                            ? 'text-white'
                            : 'text-white/70'
                        }`}
                      >
                        <span className="font-serif text-3xl tracking-wide transition-colors duration-300 group-hover:text-white">
                          {link.name}
                        </span>

                        {/* Sage accent on active */}
                        {pathname === link.href && (
                          <motion.div
                            layoutId="activeMobileNav"
                            className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-8 bg-gradient-to-b from-[#8A9A5B] to-[#6B7A3D] rounded-full"
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-10 origin-left"
                />

                {/* Cart Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group relative flex items-center justify-between min-h-[56px] px-6 rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                  }}
                >
                  {/* Glass shine effect */}
                  <div
                    className="absolute inset-0 opacity-50 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 40%)',
                    }}
                  />

                  <div className="relative flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
                      <ShoppingBag size={20} className="text-white" strokeWidth={1.5} />
                    </div>
                    <span className="font-sans text-white text-lg">Shopping Cart</span>
                  </div>

                  {cartItemCount > 0 && (
                    <span className="relative min-w-[32px] h-8 bg-[#8A9A5B] text-white text-sm font-medium rounded-full flex items-center justify-center px-3 shadow-lg">
                      {cartItemCount}
                    </span>
                  )}
                </motion.button>

                {/* Decorative bottom accent */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-auto pt-8 flex items-center justify-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-[#8A9A5B]/40" />
                  <div className="w-2 h-2 rounded-full bg-[#8A9A5B]/60" />
                  <div className="w-2 h-2 rounded-full bg-[#8A9A5B]" />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
