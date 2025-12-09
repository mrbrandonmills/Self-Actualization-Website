'use client'

/**
 * Social Share Buttons Component
 * Beautiful sharing buttons for Pinterest, Instagram, Facebook, Twitter/X
 */

import { useState } from 'react'
import { motion } from 'framer-motion'

export interface SocialShareProps {
  url: string
  title: string
  description: string
  image?: string
  hashtags?: string[]
  className?: string
}

export function SocialShare({
  url,
  title,
  description,
  image,
  hashtags = [],
  className = '',
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  // Ensure absolute URL
  const absoluteUrl = url.startsWith('http') ? url : `https://selfactualize.life${url}`
  const absoluteImage = image?.startsWith('http') ? image : `https://selfactualize.life${image}`

  const shareLinks = {
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(absoluteUrl)}&media=${encodeURIComponent(absoluteImage || '')}&description=${encodeURIComponent(description)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(absoluteUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(absoluteUrl)}&text=${encodeURIComponent(title)}&hashtags=${hashtags.join(',')}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(absoluteUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(absoluteUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400')
  }

  return (
    <div className={`social-share ${className}`}>
      <p className="social-share-label">Share this:</p>

      <div className="social-share-buttons">
        {/* Pinterest */}
        <motion.button
          className="share-button pinterest"
          onClick={() => handleShare('pinterest')}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          title="Share on Pinterest"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
          </svg>
          <span>Pin</span>
        </motion.button>

        {/* Facebook */}
        <motion.button
          className="share-button facebook"
          onClick={() => handleShare('facebook')}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          title="Share on Facebook"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>Share</span>
        </motion.button>

        {/* Twitter/X */}
        <motion.button
          className="share-button twitter"
          onClick={() => handleShare('twitter')}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          title="Share on Twitter/X"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span>Tweet</span>
        </motion.button>

        {/* LinkedIn */}
        <motion.button
          className="share-button linkedin"
          onClick={() => handleShare('linkedin')}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          title="Share on LinkedIn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <span>Share</span>
        </motion.button>

        {/* Copy Link */}
        <motion.button
          className={`share-button copy ${copied ? 'copied' : ''}`}
          onClick={copyToClipboard}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          title="Copy link"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {copied ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            )}
          </svg>
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </motion.button>
      </div>

      <style jsx>{`
        .social-share {
          padding: 24px 0;
        }

        .social-share-label {
          font-size: 14px;
          font-weight: 600;
          color: #D4AF37;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .social-share-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .share-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 12px;
          background: rgba(212, 175, 55, 0.05);
          color: #D4AF37;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .share-button svg {
          width: 20px;
          height: 20px;
        }

        .share-button:hover {
          background: rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.5);
        }

        .share-button.pinterest:hover {
          color: #E60023;
          border-color: #E60023;
          background: rgba(230, 0, 35, 0.1);
        }

        .share-button.facebook:hover {
          color: #1877F2;
          border-color: #1877F2;
          background: rgba(24, 119, 242, 0.1);
        }

        .share-button.twitter:hover {
          color: #1DA1F2;
          border-color: #1DA1F2;
          background: rgba(29, 161, 242, 0.1);
        }

        .share-button.linkedin:hover {
          color: #0A66C2;
          border-color: #0A66C2;
          background: rgba(10, 102, 194, 0.1);
        }

        .share-button.copy.copied {
          color: #10B981;
          border-color: #10B981;
          background: rgba(16, 185, 129, 0.1);
        }

        @media (max-width: 768px) {
          .share-button span {
            display: none;
          }

          .share-button {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  )
}
