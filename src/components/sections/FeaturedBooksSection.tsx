/**
 * Featured Content Section - Social Media Style Feed
 * Dynamic horizontal scroll with varied content types
 * Books, quotes, stats, testimonials, social posts
 */

'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { Section } from '../ui';
import { gsap } from '@/lib/gsap';
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
  // Stat
  {
    type: 'stat',
    data: {
      number: "2,500+",
      label: "Readers Transformed",
      icon: "🌟"
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
      comments: "23"
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
  // Testimonial
  {
    type: 'testimonial',
    data: {
      text: "This book changed how I think about personal growth. The Laboratory method is genius.",
      author: "Sarah K.",
      role: "Reader",
      rating: 5
    }
  },
  // Stat
  {
    type: 'stat',
    data: {
      number: "3",
      label: "Building Blocks to Freedom",
      icon: "⚗️"
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
      website: "brandonmills.com"
    }
  },
  // Social Post
  {
    type: 'social',
    data: {
      platform: "twitter",
      handle: "@selfactualize",
      text: "Transformation feels like momentum, not uphill struggle. That's the difference. 🚀",
      likes: "1.2K",
      comments: "89"
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
      website: "selfactualize.life"
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

  useLayoutEffect(() => {
    if (!triggerRef.current || !sliderRef.current) return;

    const slider = sliderRef.current;
    const cards = slider.children;
    const totalWidth = slider.scrollWidth - window.innerWidth;

    const tween = gsap.to(slider, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: () => `+=${totalWidth * 1.5}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    gsap.from(cards, {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
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
        return (
          <div key={`social-${index}`} className="content-card social-card">
            <div className="social-header">
              <div className="social-platform">
                {item.data.platform === 'instagram' ? '📷' : '🐦'}
              </div>
              <div className="social-handle">{item.data.handle}</div>
            </div>
            <p className="social-text">{item.data.text}</p>
            <div className="social-stats">
              <span>❤️ {item.data.likes}</span>
              <span>💬 {item.data.comments}</span>
            </div>
          </div>
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
          <div key={`author-${index}`} className="content-card author-card">
            <div className="author-header">
              <div className="author-avatar">{item.data.name.charAt(0)}</div>
              <div>
                <h3 className="author-card-name">{item.data.name}</h3>
                <p className="author-card-role">{item.data.role}</p>
              </div>
            </div>
            <p className="author-bio">{item.data.bio}</p>
            <div className="author-links">
              <a
                href={item.data.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="author-link"
              >
                <span>📷</span>
                <span>{item.data.instagram}</span>
              </a>
              <a
                href={`https://${item.data.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="author-link"
              >
                <span>🌐</span>
                <span>{item.data.website}</span>
              </a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Section spacing="none" background="tertiary">
      <div ref={sectionRef}>
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-md)] py-[var(--space-2xl)]">
          <h2 className="h2 mb-[var(--space-md)] text-center">Your Journey Starts Here</h2>
          <p className="lead text-center">
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

        <div className="text-center py-[var(--space-xl)] px-[var(--space-md)]">
          <p className="text-muted">
            Scroll down to continue your journey →
          </p>
        </div>
      </div>

      <style jsx global>{`
        .content-card {
          flex-shrink: 0;
          width: 380px;
          min-height: 400px;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          background: rgba(212, 175, 55, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          padding: 32px;
          display: flex;
          flex-direction: column;
        }

        .content-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(212, 175, 55, 0.5);
          box-shadow: 0 20px 60px rgba(212, 175, 55, 0.2);
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

        /* Social Cards */
        .social-card {
          background: linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0.5) 100%);
        }

        .social-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .social-platform {
          font-size: 24px;
        }

        .social-handle {
          font-size: 14px;
          color: var(--color-gold);
          font-weight: 600;
        }

        .social-text {
          font-size: 18px;
          color: #fff;
          line-height: 1.6;
          margin-bottom: 24px;
          flex: 1;
        }

        .social-stats {
          display: flex;
          gap: 20px;
          font-size: 14px;
          color: rgba(255,255,255,0.6);
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

        /* Author Cards */
        .author-card {
          background: linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0.7) 100%);
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
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
        }

        .author-card-name {
          font-size: 20px;
          font-weight: 700;
          color: var(--color-gold);
          margin: 0;
        }

        .author-card-role {
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          margin: 4px 0 0 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .author-bio {
          font-size: 16px;
          color: rgba(255,255,255,0.85);
          line-height: 1.6;
          margin-bottom: 24px;
          flex: 1;
        }

        .author-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .author-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 8px;
          color: var(--color-gold);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .author-link:hover {
          background: rgba(212, 175, 55, 0.2);
          border-color: var(--color-gold);
          transform: translateX(4px);
        }

        .author-link span:first-child {
          font-size: 20px;
        }

        @media (max-width: 768px) {
          .content-card {
            width: 300px;
            min-height: 350px;
            padding: 24px;
          }

          .quote-text {
            font-size: 20px;
          }

          .stat-number {
            font-size: 56px;
          }
        }
      `}</style>
    </Section>
  );
}
