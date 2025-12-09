/**
 * Featured Content Section - Social Media Style Feed
 * Dynamic horizontal scroll with varied content types
 * Books, quotes, stats, testimonials, social posts
 */

'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { getFeaturedBooks, createAffiliateLink } from '@/data/books';
import Image from 'next/image';

interface ContentCard {
  type: 'book' | 'quote' | 'stat' | 'social' | 'testimonial' | 'author'
  data: any
}

// Create dynamic content feed mixing different types
const contentFeed: ContentCard[] = [
  // Book 1
  {
    type: 'book',
    data: getFeaturedBooks()[0]
  },
  // Quote 1
  {
    type: 'quote',
    data: {
      text: "Your patterns were learned. They can be unlearned.",
      source: "Block A: Engineering Your Patterns"
    }
  },
  // Social Post
  {
    type: 'social',
    data: {
      platform: "instagram",
      handle: "@lab.of.living",
      text: "Every one of us is trapped by problems we believe can't be solved. Until now. 🧪",
      likes: "487",
      comments: "23",
      profilePhoto: "https://www.instagram.com/lab.of.living/" // Will fetch from Instagram
    }
  },
  // Book 2
  {
    type: 'book',
    data: getFeaturedBooks()[1]
  },
  // Quote 2
  {
    type: 'quote',
    data: {
      text: "Memory is not a photograph; it's a painting that changes with every viewing.",
      source: "Block B: The Laboratory of Judgment"
    }
  },
  // Medium Article
  {
    type: 'social',
    data: {
      platform: "medium",
      handle: "@MrBrandonMills",
      text: "Exploring the intersection of AI, consciousness, and human potential through the written word.",
      url: "https://medium.com/@MrBrandonMills",
      followers: "1.2K",
      articles: "24"
    }
  },
  // Pinterest
  {
    type: 'social',
    data: {
      platform: "pinterest",
      handle: "@mrbrandonmills",
      text: "Visual inspiration for transformation, design, and the art of living intentionally.",
      url: "https://www.pinterest.com/mrbrandonmills/",
      followers: "850",
      pins: "1.5K"
    }
  },
  // Twitter/X
  {
    type: 'social',
    data: {
      platform: "twitter",
      handle: "@CryptoBMilly",
      text: "Building at the intersection of AI, blockchain, and human consciousness. NFTs, crypto, and the future of digital identity.",
      url: "https://x.com/CryptoBMilly",
      followers: "2.3K",
      tweets: "1.8K"
    }
  },
  // Testimonial
  {
    type: 'testimonial',
    data: {
      text: "I've tried countless self-help books, but Block A showed me exactly how my patterns work and gave me tangible tools to redesign them. The Laboratory method isn't theory—it's a working blueprint for transformation.",
      author: "Marcus J.",
      role: "Engineer & Entrepreneur",
      rating: 5
    }
  },
  // Book 3
  {
    type: 'book',
    data: getFeaturedBooks()[2]
  },
  // Quote 3
  {
    type: 'quote',
    data: {
      text: "We don't lose time—we misplace our attention.",
      source: "The Laboratory of Life"
    }
  },
  // Author Card - Brandon Mills
  {
    type: 'author',
    data: {
      name: "Brandon Mills",
      role: "Co-Author & AI Architect",
      bio: "Renaissance Man — Modern Era. Model, Author, AI Architect & Visual Artist.",
      instagram: "@MRBRANDONMILLS",
      instagramUrl: "https://www.instagram.com/MRBRANDONMILLS/",
      website: "brandonmills.com",
      profilePhoto: "/authors/brandon-mills.jpg"
    }
  },
  // Author Card - Jesse Doherty
  {
    type: 'author',
    data: {
      name: "Jesse Doherty",
      role: "Co-Author & Philosopher",
      bio: "Architect of the Laboratory method. Blending ancient wisdom with modern transformation.",
      instagram: "@JESSEADOHERTY",
      instagramUrl: "https://www.instagram.com/JESSEADOHERTY/",
      website: "selfactualize.life",
      profilePhoto: "/authors/jesse-doherty.jpg"
    }
  },
  // Book 4 (Trilogy)
  {
    type: 'book',
    data: getFeaturedBooks()[3]
  }
];

export function FeaturedBooksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<any>(null); // Separate ref for animations

  useLayoutEffect(() => {
    if (!triggerRef.current || !sliderRef.current) return;

    const slider = sliderRef.current;
    const cards = Array.from(slider.children) as HTMLElement[];

    // Ensure cards are visible immediately (fallback if GSAP doesn't load)
    cards.forEach((card) => {
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
    });

    // Try to initialize GSAP animations
    const initAnimations = () => {
      try {
        const totalWidth = slider.scrollWidth - window.innerWidth;

        // Ensure ScrollTrigger has latest layout info
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }

        const tween = gsap.to(slider, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: () => `+=${totalWidth * 3}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return { tween };
      } catch (error) {
        console.warn('GSAP animations could not be initialized:', error);
        return null;
      }
    };

    // Try to initialize animations with fallback
    const timeoutId = setTimeout(() => {
      const animations = initAnimations();
      if (animations) {
        animationsRef.current = animations;
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      const animations = animationsRef.current;
      if (animations?.tween?.scrollTrigger) {
        animations.tween.scrollTrigger.kill();
      }
    };
  }, []);

  const renderCard = (item: ContentCard, index: number) => {
    switch (item.type) {
      case 'book':
        return (
          <div key={`book-${index}`} className="content-card book-card">
            <div className="book-cover-small">
              <Image
                src={item.data.coverImage}
                alt={item.data.subtitle}
                width={300}
                height={450}
                className="book-image"
              />
            </div>
            <div className="book-info-compact">
              <h3 className="book-title">{item.data.subtitle}</h3>
              <p className="book-author">{item.data.author}</p>
              <a
                href={createAffiliateLink(item.data.formats[0].amazonUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="quick-buy-btn"
              >
                View on Amazon →
              </a>
            </div>
          </div>
        );

      case 'quote':
        return (
          <div key={`quote-${index}`} className="content-card quote-card">
            <div className="quote-mark">"</div>
            <p className="quote-text">{item.data.text}</p>
            <p className="quote-source">— {item.data.source}</p>
          </div>
        );

      case 'stat':
        return (
          <div key={`stat-${index}`} className="content-card stat-card">
            <div className="stat-icon">{item.data.icon}</div>
            <div className="stat-number">{item.data.number}</div>
            <div className="stat-label">{item.data.label}</div>
          </div>
        );

      case 'social':
        const socialUrl = item.data.url || (item.data.platform === 'instagram'
          ? `https://www.instagram.com/${item.data.handle.replace('@', '')}/`
          : `https://twitter.com/${item.data.handle.replace('@', '')}`);

        const isMedium = item.data.platform === 'medium';
        const isPinterest = item.data.platform === 'pinterest';
        const isTwitter = item.data.platform === 'twitter';

        return (
          <a
            key={`social-${index}`}
            href={socialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`content-card social-card clickable-card ${isMedium ? 'medium-card' : ''} ${isPinterest ? 'pinterest-card' : ''} ${isTwitter ? 'twitter-card' : ''}`}
          >
            {/* Platform-specific background */}
            {isMedium ? (
              <>
                <div className="medium-bg" />
                <div className="medium-logo">M</div>
              </>
            ) : isPinterest ? (
              <>
                <div className="pinterest-bg" />
                <div className="pinterest-logo">P</div>
              </>
            ) : isTwitter ? (
              <>
                <div className="twitter-bg" />
                <div className="twitter-logo">𝕏</div>
              </>
            ) : (
              <>
                <div className="social-bg-gradient" />
                <div className="social-profile-icon">📷</div>
              </>
            )}

            <div className="social-content">
              <div className="social-handle-large">{item.data.handle}</div>
              <p className="social-text">{item.data.text}</p>
              <div className="social-stats">
                {isMedium ? (
                  <>
                    <span>👥 {item.data.followers}</span>
                    <span>📝 {item.data.articles} articles</span>
                  </>
                ) : isPinterest ? (
                  <>
                    <span>👥 {item.data.followers}</span>
                    <span>📌 {item.data.pins} pins</span>
                  </>
                ) : isTwitter ? (
                  <>
                    <span>👥 {item.data.followers}</span>
                    <span>💬 {item.data.tweets} posts</span>
                  </>
                ) : (
                  <>
                    <span>❤️ {item.data.likes}</span>
                    <span>💬 {item.data.comments}</span>
                  </>
                )}
              </div>
            </div>
            <div className="card-overlay">Click to Visit →</div>
          </a>
        );

      case 'testimonial':
        return (
          <div key={`testimonial-${index}`} className="content-card testimonial-card">
            <div className="stars">{'⭐'.repeat(item.data.rating)}</div>
            <p className="testimonial-text">"{item.data.text}"</p>
            <div className="testimonial-author">
              <p className="author-name">{item.data.author}</p>
              <p className="author-role">{item.data.role}</p>
            </div>
          </div>
        );

      case 'author':
        return (
          <a
            key={`author-${index}`}
            href={item.data.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="content-card author-card clickable-card"
            style={{
              backgroundImage: item.data.profilePhoto
                ? `url(${item.data.profilePhoto})`
                : 'none'
            }}
          >
            {/* Dark overlay for text readability */}
            <div className="author-photo-overlay" />

            <div className="author-content">
              <div className="author-header">
                <div className="author-avatar">{item.data.name.charAt(0)}</div>
                <div>
                  <h3 className="author-card-name">{item.data.name}</h3>
                  <p className="author-card-role">{item.data.role}</p>
                </div>
              </div>
              <p className="author-bio">{item.data.bio}</p>
              <div className="author-links">
                <div className="author-link-display">
                  <span>📷</span>
                  <span>{item.data.instagram}</span>
                </div>
                <div className="author-link-display">
                  <span>🌐</span>
                  <span>{item.data.website}</span>
                </div>
              </div>
            </div>
            <div className="card-overlay">Visit Profile →</div>
          </a>
        );

      default:
        return null;
    }
  };

  return (
    <section className="bg-[var(--bg-tertiary)]">
      <div ref={sectionRef}>
        <div className="max-w-[var(--content-width-wide)] mx-auto px-4 sm:px-6 lg:px-8 py-[var(--space-xl)] sm:py-[var(--space-2xl)]">
          <h2 className="h2 mb-[var(--space-md)] text-center mx-auto">Your Journey Starts Here</h2>
          <p className="lead text-center mx-auto">
            Books, wisdom, and transformation — scroll to explore
          </p>
        </div>

        <div ref={triggerRef} className="overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-8 px-[var(--space-md)] py-[var(--space-xl)]"
            style={{ width: 'max-content' }}
          >
            {contentFeed.map((item, index) => renderCard(item, index))}
          </div>
        </div>

        <div className="text-center py-[var(--space-lg)] sm:py-[var(--space-xl)] px-4 sm:px-6 lg:px-8 mx-auto">
          <p className="text-muted text-sm sm:text-base mx-auto text-center">
            Scroll down to continue your journey →
          </p>
        </div>
      </div>

      <style jsx global>{`
        .content-card {
          flex-shrink: 0;
          width: 380px;
          min-height: 400px;
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          background: linear-gradient(
            135deg,
            rgba(212, 175, 55, 0.1) 0%,
            rgba(212, 175, 55, 0.03) 50%,
            rgba(212, 175, 55, 0.1) 100%
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 175, 55, 0.3);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(212, 175, 55, 0.1) inset,
            0 20px 60px rgba(212, 175, 55, 0.08);
          padding: 32px;
          display: flex;
          flex-direction: column;
          position: relative;
          transform-style: preserve-3d;
          perspective: 1000px;
          animation: float-card 6s ease-in-out infinite;
          cursor: default;
        }

        .content-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(212, 175, 55, 0.2) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.6s ease;
          border-radius: 24px;
        }

        .content-card::after {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            135deg,
            rgba(212, 175, 55, 0.5) 0%,
            transparent 30%,
            transparent 70%,
            rgba(212, 175, 55, 0.5) 100%
          );
          border-radius: 24px;
          opacity: 0;
          transition: opacity 0.6s ease;
          z-index: -1;
        }

        .clickable-card {
          cursor: pointer;
          text-decoration: none;
          color: inherit;
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(212, 175, 55, 0.95) 100%
          );
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 32px;
          font-size: 20px;
          font-weight: 700;
          color: #05201f;
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 24px;
          pointer-events: none;
        }

        @keyframes float-card {
          0%, 100% {
            transform: translateY(0px) rotateX(0deg);
          }
          50% {
            transform: translateY(-15px) rotateX(2deg);
          }
        }

        .content-card:nth-child(1) { animation-delay: 0s; }
        .content-card:nth-child(2) { animation-delay: -1s; }
        .content-card:nth-child(3) { animation-delay: -2s; }
        .content-card:nth-child(4) { animation-delay: -3s; }
        .content-card:nth-child(5) { animation-delay: -4s; }
        .content-card:nth-child(6) { animation-delay: -5s; }

        .content-card:hover {
          transform: translateY(-20px) scale(1.05) rotateY(5deg) rotateX(-5deg);
          border-color: rgba(212, 175, 55, 0.8);
          box-shadow:
            0 32px 80px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(212, 175, 55, 0.3) inset,
            0 40px 100px rgba(212, 175, 55, 0.25);
          animation-play-state: paused;
        }

        .content-card:hover::before {
          opacity: 1;
        }

        .content-card:hover::after {
          opacity: 1;
        }

        .clickable-card:hover .card-overlay {
          opacity: 1;
        }

        /* Book Cards */
        .book-card {
          background: linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(212,175,55,0.1) 100%);
        }

        .book-cover-small {
          width: 100%;
          margin-bottom: 24px;
          border-radius: 8px;
          overflow: hidden;
        }

        .book-image {
          width: 100%;
          height: auto;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .book-card:hover .book-image {
          transform: scale(1.05);
        }

        .book-info-compact {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .book-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--color-gold);
          line-height: 1.3;
        }

        .book-author {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
        }

        .quick-buy-btn {
          margin-top: auto;
          padding: 12px 20px;
          background: rgba(212, 175, 55, 0.2);
          border: 1px solid var(--color-gold);
          border-radius: 8px;
          color: var(--color-gold);
          text-decoration: none;
          text-align: center;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .quick-buy-btn:hover {
          background: var(--color-gold);
          color: #05201f;
        }

        /* Quote Cards */
        .quote-card {
          background: linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(0,0,0,0.5) 100%);
          justify-content: center;
        }

        .quote-mark {
          font-size: 80px;
          color: var(--color-gold);
          line-height: 0.5;
          opacity: 0.3;
          margin-bottom: 16px;
        }

        .quote-text {
          font-size: 24px;
          font-style: italic;
          color: #fff;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .quote-source {
          font-size: 14px;
          color: var(--color-gold);
          text-align: right;
        }

        /* Stat Cards */
        .stat-card {
          background: linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0.6) 100%);
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .stat-icon {
          font-size: 64px;
          margin-bottom: 20px;
          filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.6));
        }

        .stat-number {
          font-size: 72px;
          font-weight: 700;
          color: var(--color-gold);
          line-height: 1;
          margin-bottom: 16px;
          text-shadow: 0 0 30px rgba(212, 175, 55, 0.5);
        }

        .stat-label {
          font-size: 18px;
          color: rgba(255,255,255,0.8);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Social Cards - Instagram Profile Style */
        .social-card {
          background: #000;
          position: relative;
          overflow: hidden;
          justify-content: flex-end;
        }

        .social-bg-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
          opacity: 0.8;
          z-index: 0;
        }

        .social-profile-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 120px;
          opacity: 0.3;
          z-index: 1;
          filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.5));
        }

        .social-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .social-handle-large {
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .social-text {
          font-size: 16px;
          color: #fff;
          line-height: 1.6;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .social-stats {
          display: flex;
          gap: 20px;
          font-size: 14px;
          color: rgba(255,255,255,0.9);
          font-weight: 600;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        /* Medium Card */
        .medium-card {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
        }

        .medium-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 168, 0, 0.15) 0%, rgba(0, 0, 0, 0.8) 100%);
          z-index: 0;
        }

        .medium-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 180px;
          font-weight: 400;
          font-family: 'Georgia', 'Cambria', 'Times New Roman', serif;
          color: rgba(255, 255, 255, 0.08);
          z-index: 1;
          letter-spacing: -10px;
        }

        /* Pinterest Card */
        .pinterest-card {
          background: linear-gradient(135deg, #E60023 0%, #BD081C 100%);
        }

        .pinterest-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.3) 100%);
          z-index: 0;
        }

        .pinterest-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 220px;
          font-weight: 700;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: rgba(255, 255, 255, 0.12);
          z-index: 1;
        }

        /* Twitter/X Card */
        .twitter-card {
          background: linear-gradient(135deg, #000000 0%, #14171A 100%);
        }

        .twitter-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 80%, rgba(29, 155, 240, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%);
          z-index: 0;
        }

        .twitter-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 140px;
          font-weight: 700;
          color: rgba(29, 155, 240, 0.15);
          z-index: 1;
        }

        /* Testimonial Cards */
        .testimonial-card {
          background: linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(0,0,0,0.5) 100%);
        }

        .stars {
          font-size: 20px;
          margin-bottom: 16px;
          filter: drop-shadow(0 0 10px rgba(255, 193, 7, 0.5));
        }

        .testimonial-text {
          font-size: 18px;
          font-style: italic;
          color: #fff;
          line-height: 1.6;
          margin-bottom: 24px;
          flex: 1;
        }

        .testimonial-author {
          border-top: 1px solid rgba(212, 175, 55, 0.3);
          padding-top: 16px;
        }

        .author-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-gold);
        }

        .author-role {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
        }

        /* Author Cards - With Background Photos */
        .author-card {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
          overflow: hidden;
        }

        .author-photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.5) 50%,
          rgba(0, 0, 0, 0.8) 100%
          );
          z-index: 1;
        }

        .author-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .author-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .author-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-gold) 0%, rgba(212,175,55,0.6) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 700;
          color: #05201f;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
        }

        .author-card-name {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin: 0;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }

        .author-card-role {
          font-size: 13px;
          color: rgba(255,255,255,0.9);
          margin: 4px 0 0 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }

        .author-bio {
          font-size: 16px;
          color: rgba(255,255,255,0.95);
          line-height: 1.6;
          margin-bottom: 24px;
          flex: 1;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }

        .author-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .author-link-display {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .author-link-display:hover {
          background: rgba(212, 175, 55, 0.3);
          border-color: rgba(212, 175, 55, 0.5);
        }

        .author-link-display span:first-child {
          font-size: 20px;
        }

        @media (max-width: 768px) {
          .content-card {
            width: 280px;
            min-height: 350px;
            padding: 20px;
            border-radius: 16px;
          }

          .content-card:hover {
            transform: translateY(-10px) scale(1.02);
          }

          .quote-text {
            font-size: 18px;
            line-height: 1.4;
          }

          .quote-mark {
            font-size: 60px;
            margin-bottom: 12px;
          }

          .stat-number {
            font-size: 48px;
          }

          .stat-icon {
            font-size: 48px;
            margin-bottom: 16px;
          }

          .stat-label {
            font-size: 16px;
          }

          .book-title {
            font-size: 18px;
          }

          .social-profile-icon {
            font-size: 80px;
          }

          .social-handle-large {
            font-size: 20px;
          }

          .social-text {
            font-size: 14px;
          }

          .testimonial-text {
            font-size: 16px;
          }

          .author-avatar {
            width: 48px;
            height: 48px;
            font-size: 24px;
          }

          .author-card-name {
            font-size: 18px;
          }

          .author-bio {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .content-card {
            width: 260px;
            min-height: 320px;
            padding: 16px;
          }

          .quote-text {
            font-size: 16px;
          }

          .stat-number {
            font-size: 42px;
          }

          .book-cover-small {
            margin-bottom: 16px;
          }
        }
      `}</style>
    </section>
  );
}
