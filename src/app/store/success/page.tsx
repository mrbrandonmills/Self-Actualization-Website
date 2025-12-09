'use client'

/**
 * Purchase Success Page - Store
 * Beautiful confirmation page after successful Stripe checkout
 */

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function StoreSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Clear cart after successful purchase
    if (typeof window !== 'undefined') {
      localStorage.removeItem('3d-store-cart')
    }

    // Simulate loading for smooth transition
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-black-green)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">⚗️</div>
          <p className="text-gold text-xl">Processing your order...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--color-black-green)] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="success-container"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="success-icon"
        >
          ✨
        </motion.div>

        {/* Heading */}
        <h1 className="h1 text-center mb-md">
          <span className="text-gold">Transformation</span> Unlocked!
        </h1>

        {/* Description */}
        <p className="lead text-center mb-xl max-w-2xl">
          Your purchase was successful. Check your email for order confirmation and download links.
          Your journey to self-actualization begins now.
        </p>

        {/* Session ID (for reference) */}
        {sessionId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="session-info"
          >
            <p className="text-sm text-gray-400">
              Order ID: <code className="text-gold">{sessionId.slice(-12)}</code>
            </p>
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-md justify-center flex-wrap mt-xl"
        >
          <Link href="/books" className="btn btn-primary">
            Continue Shopping
          </Link>
          <Link href="/" className="btn btn-outline">
            Return Home
          </Link>
        </motion.div>

        {/* What's Next Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="next-steps"
        >
          <h3 className="text-xl font-semibold text-gold mb-md text-center">What's Next?</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-gold text-xl">📧</span>
              <span>Check your email for order confirmation and download links</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold text-xl">📚</span>
              <span>Access your purchased books in your library</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold text-xl">🚀</span>
              <span>Begin your transformation journey today</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .success-container {
          max-width: 800px;
          width: 100%;
          background: rgba(212, 175, 55, 0.05);
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 24px;
          padding: 64px 48px;
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5),
                      0 0 40px rgba(212, 175, 55, 0.1);
        }

        .success-icon {
          font-size: 120px;
          text-align: center;
          margin-bottom: 32px;
          filter: drop-shadow(0 0 30px rgba(212, 175, 55, 0.6));
        }

        .session-info {
          text-align: center;
          padding: 16px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          margin: 24px 0;
        }

        .session-info code {
          font-family: 'Monaco', 'Courier New', monospace;
          padding: 4px 8px;
          background: rgba(212, 175, 55, 0.1);
          border-radius: 4px;
        }

        .next-steps {
          margin-top: 48px;
          padding: 32px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 16px;
          border: 1px solid rgba(212, 175, 55, 0.2);
        }

        .next-steps ul {
          color: rgba(255, 255, 255, 0.9);
          list-style: none;
          padding: 0;
        }

        .next-steps li {
          padding: 8px 0;
        }

        @media (max-width: 768px) {
          .success-container {
            padding: 48px 24px;
          }

          .success-icon {
            font-size: 80px;
          }
        }
      `}</style>
    </main>
  )
}
