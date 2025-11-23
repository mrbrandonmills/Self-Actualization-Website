'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Instagram, Twitter, Linkedin, Send } from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubscribed(true)
      setEmail('')

      // Reset success message after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000)
    }, 1000)
  }

  const footerLinks = {
    products: [
      { label: 'Books', href: '/shop?category=books' },
      { label: 'Courses', href: '/shop?category=courses' },
      { label: 'Writing Lab', href: '/shop?category=writing-lab' },
      { label: 'All Products', href: '/shop' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
      { label: 'Coaching', href: '/coaching' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  }

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: Instagram,
      color: '#E4405F',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: Twitter,
      color: '#1DA1F2',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: Linkedin,
      color: '#0A66C2',
    },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-black via-black to-gray-950 border-t border-accent/20">
      {/* Gold Accent Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="container-wide py-16 md:py-20 lg:py-24">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12 lg:mb-16">

          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <Link href="/" className="inline-block group">
              <h3 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">
                The Self{' '}
                <span className="text-accent group-hover:text-accent-hover transition-colors duration-300">
                  Actualized
                </span>{' '}
                Life
              </h3>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Transform your reality through self-actualization.
              Unlock your full potential with luxury guidance and premium resources.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-10 h-10 rounded-full glass-button flex items-center justify-center text-white/70 hover:text-accent transition-colors duration-300 group"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide">
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-accent text-sm transition-colors duration-300 inline-block relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-accent text-sm transition-colors duration-300 inline-block relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide">
              Join the Journey
            </h4>
            <p className="text-white/60 text-sm leading-relaxed">
              Get weekly insights on self-actualization, mindset mastery, and transformational growth.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting || isSubscribed}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all duration-300 glass-input disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Email address"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubscribed}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-accent hover:bg-accent-hover text-black font-medium text-sm rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-gold-sm hover:shadow-gold-md"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                    />
                    <span>Subscribing...</span>
                  </>
                ) : isSubscribed ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    >
                      ✓
                    </motion.div>
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50"
        >
          {/* Copyright */}
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} The Self Actualized Life. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link, index) => (
              <div key={link.href} className="flex items-center gap-6">
                <Link
                  href={link.href}
                  className="hover:text-accent transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
                {index < footerLinks.legal.length - 1 && (
                  <span className="text-white/20">•</span>
                )}
              </div>
            ))}
          </div>

          {/* Built with Love */}
          <p className="hidden lg:block">
            Built with{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block text-accent"
            >
              ♥
            </motion.span>{' '}
            for transformation
          </p>
        </motion.div>
      </div>

      {/* Background Gradient Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-32 bg-gradient-gold-radial opacity-20 blur-3xl pointer-events-none" />
    </footer>
  )
}

export default Footer
