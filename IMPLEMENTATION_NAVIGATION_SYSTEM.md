# IMPLEMENTATION: Constellation Navigation System

## Overview

Create a unified navigation system that feels like a constellation of worlds, connecting all pages with elegant portal transitions.

**Design Philosophy:**
- Each nav item is a star (✦) in the constellation
- Active page star pulsates with golden light
- Sticky header with glassmorphism backdrop blur
- Mobile-first responsive design
- Shopping cart with live counter
- Portal warp transitions between pages

---

## File Structure

```
src/
├── components/
│   ├── navigation/
│   │   ├── ConstellationNav.tsx          (Main nav bar)
│   │   ├── MobileMenu.tsx                (Hamburger menu)
│   │   ├── Footer.tsx                    (Site footer)
│   │   └── CartIcon.tsx                  (Cart button with badge)
│   └── transitions/
│       └── PortalTransition.tsx          (Page transition effect)
├── hooks/
│   └── useCart.ts                        (Shopping cart state)
└── contexts/
    └── CartContext.tsx                   (Cart provider)
```

---

## 1. Cart Context & Hook

**File:** `src/contexts/CartContext.tsx`

```tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface CartItem {
  id: string
  title: string
  subtitle: string
  coverImage: string
  price: string
  amazonUrl: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  itemCount: number
  isOpen: boolean
  toggleCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart:', e)
      }
    }
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(items))
    } else {
      localStorage.removeItem('cart')
    }
  }, [items])

  const addItem = (item: CartItem) => {
    // Check if item already exists
    if (items.find(i => i.id === item.id)) {
      // Already in cart, just open panel
      setIsOpen(true)
      return
    }

    setItems(prev => [...prev, item])
    setIsOpen(true)
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem('cart')
  }

  const toggleCart = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        itemCount: items.length,
        isOpen,
        toggleCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
```

---

**File:** `src/hooks/useCart.ts`

```tsx
export { useCart } from '@/contexts/CartContext'
```

---

## 2. Constellation Navigation Bar

**File:** `src/components/navigation/ConstellationNav.tsx`

```tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useCart } from '@/hooks/useCart'
import { MobileMenu } from './MobileMenu'

const navItems = [
  { label: 'Gallery', path: '/', icon: '✦', description: 'Homepage' },
  { label: 'Museum', path: '/books', icon: '✦', description: 'Book Collection' },
  { label: 'Lab', path: '/coaching', icon: '✦', description: 'Coaching' },
  { label: 'Academy', path: '/courses', icon: '✦', description: 'Courses' },
  { label: 'Garden', path: '/blog', icon: '✦', description: 'Blog' },
  { label: 'Origin', path: '/about', icon: '✦', description: 'About' },
  { label: 'Connect', path: '/contact', icon: '✦', description: 'Contact' },
]

export function ConstellationNav() {
  const pathname = usePathname()
  const { itemCount, toggleCart } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Detect scroll for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled
            ? 'bg-[#05201f]/95 backdrop-blur-xl border-b border-[#C9A050]/20 shadow-2xl'
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group transition-all duration-300"
            >
              <motion.span
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="text-2xl text-[#C9A050]"
              >
                ☆
              </motion.span>
              <div className="flex flex-col">
                <span className="font-serif text-lg lg:text-xl text-[#C9A050] tracking-wide group-hover:text-[#d4af37] transition-colors">
                  LABORATORY OF LIFE
                </span>
                <span className="text-xs text-white/50 tracking-widest uppercase hidden lg:block">
                  Self-Actualization Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.path
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className="group relative flex items-center gap-2"
                      title={item.description}
                    >
                      {/* Star Icon */}
                      <motion.span
                        animate={isActive ? {
                          scale: [1, 1.3, 1],
                          filter: [
                            'drop-shadow(0 0 4px rgba(201, 160, 80, 0.6))',
                            'drop-shadow(0 0 12px rgba(201, 160, 80, 1))',
                            'drop-shadow(0 0 4px rgba(201, 160, 80, 0.6))'
                          ]
                        } : {}}
                        transition={isActive ? {
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        } : {}}
                        className={`
                          text-xl transition-all duration-300
                          ${isActive
                            ? 'text-[#C9A050]'
                            : 'text-white/40 group-hover:text-[#C9A050] group-hover:scale-110'
                          }
                        `}
                      >
                        {item.icon}
                      </motion.span>

                      {/* Label */}
                      <span
                        className={`
                          font-sans text-sm tracking-wide transition-all duration-300
                          ${isActive
                            ? 'text-[#C9A050] font-semibold'
                            : 'text-white/70 group-hover:text-white'
                          }
                        `}
                      >
                        {item.label}
                      </span>

                      {/* Active Underline */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A050] to-transparent"
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Shopping Cart */}
              <button
                onClick={toggleCart}
                className="relative group"
                aria-label={`Shopping cart (${itemCount} items)`}
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-2xl transition-all duration-300 text-[#C9A050] group-hover:text-[#d4af37]"
                >
                  🛒
                </motion.span>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-br from-[#C9A050] to-[#d4af37] text-[#05201f] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden text-[#C9A050] text-3xl"
                aria-label="Open menu"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={navItems}
        currentPath={pathname}
      />
    </>
  )
}
```

---

## 3. Mobile Menu

**File:** `src/components/navigation/MobileMenu.tsx`

```tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface NavItem {
  label: string
  path: string
  icon: string
  description: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  items: NavItem[]
  currentPath: string
}

export function MobileMenu({ isOpen, onClose, items, currentPath }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-[#05201f] border-l border-[#C9A050]/20 z-[70] lg:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#C9A050]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl text-[#C9A050]">☆</span>
                <span className="font-serif text-lg text-[#C9A050]">
                  Navigation
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white text-3xl"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="p-6">
              <ul className="space-y-2">
                {items.map((item, index) => {
                  const isActive = currentPath === item.path
                  return (
                    <motion.li
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.path}
                        onClick={onClose}
                        className={`
                          flex items-center gap-4 p-4 rounded-lg transition-all duration-300
                          ${isActive
                            ? 'bg-[#C9A050]/20 border border-[#C9A050]/40'
                            : 'hover:bg-white/5'
                          }
                        `}
                      >
                        <span className={`text-2xl ${isActive ? 'text-[#C9A050]' : 'text-white/40'}`}>
                          {item.icon}
                        </span>
                        <div className="flex-1">
                          <div className={`font-semibold ${isActive ? 'text-[#C9A050]' : 'text-white'}`}>
                            {item.label}
                          </div>
                          <div className="text-xs text-white/50">
                            {item.description}
                          </div>
                        </div>
                        {isActive && (
                          <span className="text-[#C9A050]">→</span>
                        )}
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#C9A050]/20 bg-[#05201f]">
              <p className="text-center text-white/50 text-sm">
                Your life is the lab.
                <br />
                You are the scientist.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

## 4. Footer Component

**File:** `src/components/navigation/Footer.tsx`

```tsx
import Link from 'next/link'

const footerLinks = {
  explore: [
    { label: 'Books', href: '/books' },
    { label: 'Coaching', href: '/coaching' },
    { label: 'Courses', href: '/courses' },
    { label: 'Blog', href: '/blog' },
  ],
  connect: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Pinterest', href: 'https://pinterest.com' },
    { label: 'Email', href: 'mailto:hello@selfactualized.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Affiliate Disclosure', href: '/affiliate' },
  ]
}

export function Footer() {
  return (
    <footer className="bg-[#05201f] text-white/70 border-t border-[#C9A050]/20">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl text-[#C9A050]">☆</span>
              <h3 className="text-[#C9A050] font-serif text-2xl tracking-wide">
                LABORATORY OF LIFE
              </h3>
            </div>
            <p className="text-lg mb-6 leading-relaxed">
              Your life is the lab. You are the scientist.
            </p>
            <p className="text-sm text-white/50 mb-6">
              A self-actualization platform blending ancient wisdom with modern psychology.
              Conduct experiments on your own life and become who you're meant to be.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-[#C9A050] transition-colors"
                aria-label="Instagram"
              >
                📸
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-[#C9A050] transition-colors"
                aria-label="Pinterest"
              >
                📌
              </a>
              <a
                href="mailto:hello@selfactualized.com"
                className="text-2xl hover:text-[#C9A050] transition-colors"
                aria-label="Email"
              >
                ✉️
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-widest">
              Explore
            </h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#C9A050] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-widest">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#C9A050] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} The Self Actualized Life. Made with{' '}
            <span className="text-[#C9A050]">✦</span> by Rock Q Cool Box.
          </p>
          <p className="text-xs text-white/40">
            All rights reserved. We Are All Made of Stardust.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

---

## 5. Layout Integration

**File:** `src/app/layout.tsx`

```tsx
import { Inter, Playfair_Display } from 'next/font/google'
import { CartProvider } from '@/contexts/CartContext'
import { ConstellationNav } from '@/components/navigation/ConstellationNav'
import { Footer } from '@/components/navigation/Footer'
import { CartPanel } from '@/components/cart/CartPanel'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'The Laboratory of Life | Self-Actualization Platform',
  description: 'Your life is the lab. You are the scientist. Transform your reality through Random Acts of Self-Actualization.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#05201f] text-white antialiased">
        <CartProvider>
          <ConstellationNav />

          <main className="min-h-screen pt-20">
            {children}
          </main>

          <Footer />
          <CartPanel />
        </CartProvider>
      </body>
    </html>
  )
}
```

---

## 6. Shopping Cart Panel

**File:** `src/components/cart/CartPanel.tsx`

```tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import Image from 'next/image'

export function CartPanel() {
  const { isOpen, items, removeItem, toggleCart } = useCart()

  // Generate Amazon multi-cart URL
  const generateAmazonCheckoutUrl = () => {
    // Amazon Associates multi-cart format
    const asins = items.map(item => {
      const asinMatch = item.amazonUrl.match(/\/dp\/([A-Z0-9]{10})/)
      return asinMatch ? asinMatch[1] : null
    }).filter(Boolean)

    if (asins.length === 0) return '#'

    // Your Amazon Associates ID
    const associateId = 'yourtaghere-20'

    return `https://www.amazon.com/gp/aws/cart/add.html?AssociateTag=${associateId}&ASIN.1=${asins.join('&ASIN.2=')}`
  }

  const totalPrice = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''))
    return sum + (isNaN(price) ? 0 : price)
  }, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[90vw] max-w-md bg-white shadow-2xl z-[90] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-serif text-gray-900">
                Your Cart ({items.length})
              </h2>
              <button
                onClick={toggleCart}
                className="text-gray-500 hover:text-gray-900 text-2xl transition"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="p-6">
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-3xl mb-4">🛒</p>
                  <p className="text-gray-500 mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-400">
                    Start your transformation journey
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                    >
                      <div className="relative w-20 h-28 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {item.subtitle}
                        </p>
                        <p className="text-[#C9A050] font-bold text-lg">
                          {item.price}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition self-start"
                        aria-label="Remove item"
                      >
                        🗑️
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
                <div className="mb-4">
                  <div className="flex justify-between items-center text-lg font-semibold mb-1">
                    <span className="text-gray-900">Estimated Total:</span>
                    <span className="text-[#C9A050] text-2xl">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Final prices on Amazon may vary
                  </p>
                </div>

                <a
                  href={generateAmazonCheckoutUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-[#C9A050] to-[#d4af37] text-white font-bold py-4 px-6 rounded-lg text-center hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Checkout on Amazon →
                </a>

                <p className="text-xs text-center text-gray-500 mt-3">
                  As an Amazon Associate, we earn from qualifying purchases.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

## Installation Checklist

- [ ] Create all component files
- [ ] Create CartContext and provider
- [ ] Update layout.tsx to wrap with CartProvider
- [ ] Add ConstellationNav and Footer to layout
- [ ] Test navigation between pages
- [ ] Test cart add/remove functionality
- [ ] Test mobile menu
- [ ] Test responsive design
- [ ] Verify accessibility (keyboard nav, screen readers)
- [ ] Check performance (Lighthouse score)

---

## Testing Script

```bash
# 1. Create all files
# 2. Install if needed (framer-motion already installed)
# 3. Start dev server
npm run dev

# 4. Test navigation
# - Click each nav item
# - Verify active state
# - Test mobile menu
# - Test cart icon

# 5. Test cart functionality
# - Add items from /books page
# - Verify cart counter updates
# - Open cart panel
# - Remove items
# - Test checkout button

# 6. Test responsive
# - Resize browser
# - Test on mobile device
# - Verify touch interactions
```

---

## Next Steps

After navigation is working:

1. Update all pages to use new layout
2. Add "Add to Cart" buttons on book cards
3. Implement portal page transitions (optional)
4. Add loading states
5. Optimize performance

Ready to implement!

— Visual Designer (Agent 3)
