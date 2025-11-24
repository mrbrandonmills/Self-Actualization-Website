'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Instagram, Twitter, Linkedin, Send } from 'lucide-react'

/**
 * BartoszFooter - Dark forest aesthetic footer
 *
 * Features:
 * - Deep forest background (#031614)
 * - Creme text (#c5d2b7)
 * - Gold accents (#C9A050)
 * - Bartosz typography
 */

const BartoszFooter = () => {
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
      { label: 'Books', href: '/books' },
      { label: 'Courses', href: '/courses' },
      { label: 'Writing Lab', href: '/writing-lab' },
      { label: 'Blog', href: '/blog' },
    ],
    company: [
      { label: 'About', href: '/about' },
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
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: Linkedin,
    },
  ]

  return (
    <footer className="bartosz-footer">
      {/* Gold Accent Divider */}
      <div className="footer-divider-top" />

      <div className="footer-container">
        {/* Main Footer Grid */}
        <div className="footer-grid">

          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="footer-column"
          >
            <Link href="/" className="footer-logo">
              <h3 className="footer-brand-text">
                The Self{' '}
                <span className="footer-brand-accent">
                  Actualized
                </span>{' '}
                Life
              </h3>
            </Link>

            <p className="footer-description">
              Transform your reality through self-actualization.
              Unlock your full potential with luxury guidance and premium resources.
            </p>

            {/* Social Links */}
            <div className="footer-social">
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
                  className="footer-social-link"
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
            className="footer-column"
          >
            <h4 className="footer-heading">
              Products
            </h4>
            <ul className="footer-link-list">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link"
                  >
                    {link.label}
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
            className="footer-column"
          >
            <h4 className="footer-heading">
              Company
            </h4>
            <ul className="footer-link-list">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link"
                  >
                    {link.label}
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
            className="footer-column"
          >
            <h4 className="footer-heading">
              Join the Journey
            </h4>
            <p className="footer-newsletter-text">
              Get weekly insights on self-actualization, mindset mastery, and transformational growth.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting || isSubscribed}
                  className="footer-input"
                  aria-label="Email address"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubscribed}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="footer-submit-button"
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
        <div className="footer-divider" />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="footer-bottom"
        >
          {/* Copyright */}
          <p className="footer-copyright">
            © {new Date().getFullYear()} The Self Actualized Life. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="footer-legal">
            {footerLinks.legal.map((link, index) => (
              <div key={link.href} className="footer-legal-item">
                <Link
                  href={link.href}
                  className="footer-legal-link"
                >
                  {link.label}
                </Link>
                {index < footerLinks.legal.length - 1 && (
                  <span className="footer-separator">•</span>
                )}
              </div>
            ))}
          </div>

          {/* Built with Love */}
          <p className="footer-love">
            Built with{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block text-[var(--color-accent-gold)]"
            >
              ♥
            </motion.span>{' '}
            for transformation
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        /* Footer Container */
        .bartosz-footer {
          position: relative;
          background: var(--color-deep-forest);
          border-top: 1px solid var(--color-ui-border);
          padding: var(--space-4xl) 0;
        }

        /* Top Divider */
        .footer-divider-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            var(--color-accent-gold),
            transparent
          );
        }

        .footer-container {
          max-width: var(--max-width-2xl);
          margin: 0 auto;
          padding: 0 var(--space-xl);
        }

        /* Grid */
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-3xl);
          margin-bottom: var(--space-3xl);
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: var(--space-2xl);
          }
        }

        /* Column */
        .footer-column {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        /* Logo */
        .footer-logo {
          display: inline-block;
          text-decoration: none;
          transition: opacity var(--transition-base);
        }

        .footer-logo:hover {
          opacity: 0.8;
        }

        .footer-brand-text {
          font-family: var(--font-serif);
          font-size: var(--font-size-h4);
          font-weight: var(--font-weight-light);
          color: var(--color-text-primary);
          line-height: var(--line-height-tight);
          letter-spacing: var(--tracking-tight);
        }

        .footer-brand-accent {
          color: var(--color-accent-gold);
          font-weight: var(--font-weight-medium);
        }

        /* Description */
        .footer-description {
          font-size: var(--font-size-small);
          color: var(--color-text-secondary);
          line-height: var(--line-height-relaxed);
          max-width: 300px;
        }

        /* Social Links */
        .footer-social {
          display: flex;
          gap: var(--space-md);
        }

        .footer-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(197, 210, 183, 0.05);
          border: 1px solid var(--color-ui-border);
          color: var(--color-text-secondary);
          transition: all var(--transition-base);
        }

        .footer-social-link:hover {
          color: var(--color-accent-gold);
          border-color: var(--color-accent-gold);
          background: rgba(201, 160, 80, 0.1);
        }

        /* Heading */
        .footer-heading {
          font-family: var(--font-serif);
          font-size: var(--font-size-body);
          font-weight: var(--font-weight-medium);
          color: var(--color-text-primary);
          letter-spacing: var(--tracking-wide);
        }

        /* Link List */
        .footer-link-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          list-style: none;
        }

        .footer-link {
          position: relative;
          font-size: var(--font-size-small);
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color var(--transition-base);
        }

        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--color-accent-gold);
          transition: width var(--transition-base);
        }

        .footer-link:hover {
          color: var(--color-accent-gold);
        }

        .footer-link:hover::after {
          width: 100%;
        }

        /* Newsletter */
        .footer-newsletter-text {
          font-size: var(--font-size-small);
          color: var(--color-text-secondary);
          line-height: var(--line-height-relaxed);
        }

        .footer-newsletter-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .footer-input {
          width: 100%;
          padding: var(--space-sm) var(--space-md);
          background: rgba(197, 210, 183, 0.05);
          border: 1px solid var(--color-ui-border);
          border-radius: var(--radius-lg);
          color: var(--color-text-primary);
          font-size: var(--font-size-small);
          transition: all var(--transition-base);
        }

        .footer-input::placeholder {
          color: var(--color-text-tertiary);
        }

        .footer-input:focus {
          outline: none;
          border-color: var(--color-accent-gold);
          background: rgba(201, 160, 80, 0.05);
        }

        .footer-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .footer-submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          width: 100%;
          padding: var(--space-sm) var(--space-lg);
          background: var(--color-accent-gold);
          color: var(--color-black-green);
          font-size: var(--font-size-small);
          font-weight: var(--font-weight-medium);
          border: none;
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .footer-submit-button:hover {
          background: var(--color-accent-sage);
          box-shadow: 0 4px 12px rgba(201, 160, 80, 0.3);
        }

        .footer-submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Divider */
        .footer-divider {
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            var(--color-ui-border),
            transparent
          );
          margin: var(--space-2xl) 0;
        }

        /* Bottom Bar */
        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-md);
          font-size: var(--font-size-small);
          color: var(--color-text-tertiary);
        }

        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .footer-copyright {
          text-align: center;
        }

        @media (min-width: 768px) {
          .footer-copyright {
            text-align: left;
          }
        }

        /* Legal Links */
        .footer-legal {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
        }

        .footer-legal-item {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
        }

        .footer-legal-link {
          position: relative;
          color: var(--color-text-tertiary);
          text-decoration: none;
          transition: color var(--transition-base);
        }

        .footer-legal-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--color-accent-gold);
          transition: width var(--transition-base);
        }

        .footer-legal-link:hover {
          color: var(--color-accent-gold);
        }

        .footer-legal-link:hover::after {
          width: 100%;
        }

        .footer-separator {
          color: rgba(197, 210, 183, 0.2);
        }

        /* Built with Love */
        .footer-love {
          display: none;
        }

        @media (min-width: 1024px) {
          .footer-love {
            display: block;
          }
        }
      `}</style>
    </footer>
  )
}

export default BartoszFooter
