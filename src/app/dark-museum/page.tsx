'use client';

import { useState } from 'react';
import SmoothScrollProvider from '@/components/museum/SmoothScrollProvider';
import { CustomCursor } from '@/components/bartosz/CustomCursor';
import { VideoNoise } from '@/components/bartosz/VideoNoise';
import { DarkBookPedestal } from '@/components/bartosz/DarkBookPedestal';
import { colors, typography, spacing } from '@/lib/bartosz-design-tokens';

/**
 * DARK MUSEUM - BARTOSZ KOLENDA AESTHETIC
 *
 * Features:
 * - Dark blackGreen + creme color palette
 * - Custom morphing cursor
 * - Video noise overlay
 * - Fluid clamp() typography
 * - Sophisticated scroll experience
 */

export default function DarkMuseumPage() {
  const [showEntrance, setShowEntrance] = useState(true);

  // Entrance sequence
  if (showEntrance) {
    return (
      <div
        className="entrance-dark"
        style={{
          position: 'fixed',
          inset: 0,
          background: colors.blackGreen,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        <CustomCursor />
        <VideoNoise />

        <div className="text-center px-8">
          <h1
            style={{
              fontSize: typography.h1,
              fontFamily: typography.serif,
              fontWeight: typography.weights.light,
              color: colors.text.primary,
              marginBottom: spacing.md,
              letterSpacing: typography.tracking.tight,
              lineHeight: typography.lineHeights.tight,
            }}
          >
            The Museum of
            <br />
            <span style={{ color: colors.text.accent }}>Self-Actualization</span>
          </h1>

          <p
            style={{
              fontSize: typography.body,
              fontFamily: typography.sans,
              color: colors.text.secondary,
              marginBottom: spacing.xl,
              letterSpacing: typography.tracking.wide,
              textTransform: 'uppercase',
            }}
          >
            A Journey Through Transformation
          </p>

          <button
            onClick={() => setShowEntrance(false)}
            style={{
              padding: `${spacing.md} ${spacing.xl}`,
              background: 'transparent',
              color: colors.text.primary,
              border: `1px solid ${colors.text.primary}`,
              borderRadius: '2px',
              fontFamily: typography.sans,
              fontSize: typography.small,
              fontWeight: typography.weights.medium,
              textTransform: 'uppercase',
              letterSpacing: typography.tracking.widest,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.text.primary;
              e.currentTarget.style.color = colors.blackGreen;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = colors.text.primary;
            }}
          >
            Enter Museum →
          </button>
        </div>
      </div>
    );
  }

  return (
    <SmoothScrollProvider>
      <div
        className="dark-museum-container"
        style={{
          background: colors.blackGreen,
          minHeight: '100vh',
        }}
      >
        {/* Custom cursor */}
        <CustomCursor />

        {/* Video noise overlay */}
        <VideoNoise />

        {/* Navigation */}
        <nav
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            padding: `${spacing.lg} ${spacing.xl}`,
            background: `${colors.blackGreen}cc`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${colors.ui.border}`,
            zIndex: 1000,
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div
              style={{
                fontSize: typography.small,
                fontFamily: typography.serif,
                color: colors.text.primary,
                letterSpacing: typography.tracking.wider,
              }}
            >
              The Self <span style={{ color: colors.text.accent }}>Actualized</span> Life
            </div>

            <div className="flex gap-8">
              {['Books', 'Courses', 'Writing Lab', 'Blog', 'About'].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  style={{
                    fontSize: typography.small,
                    fontFamily: typography.sans,
                    color: colors.text.secondary,
                    textTransform: 'uppercase',
                    letterSpacing: typography.tracking.widest,
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.text.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.text.secondary;
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: `${spacing['4xl']} ${spacing.xl}`,
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: typography.h1,
              fontFamily: typography.serif,
              fontWeight: typography.weights.light,
              color: colors.text.primary,
              marginBottom: spacing.lg,
              letterSpacing: typography.tracking.tight,
              lineHeight: typography.lineHeights.tight,
              maxWidth: '900px',
            }}
          >
            Transform Your Reality Through
            <br />
            <span style={{ color: colors.text.accent, fontWeight: typography.weights.bold }}>
              Self-Actualization
            </span>
          </h1>

          <p
            style={{
              fontSize: typography.body,
              fontFamily: typography.sans,
              color: colors.text.secondary,
              marginBottom: spacing['2xl'],
              lineHeight: typography.lineHeights.relaxed,
              maxWidth: '600px',
            }}
          >
            Unlock your full potential with luxury guidance and premium resources.
            A curated collection for minds seeking transformation.
          </p>

          {/* Scroll indicator */}
          <div
            style={{
              marginTop: spacing['3xl'],
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            <div
              style={{
                fontSize: typography.small,
                fontFamily: typography.sans,
                color: colors.text.secondary,
                textTransform: 'uppercase',
                letterSpacing: typography.tracking.widest,
                marginBottom: spacing.sm,
              }}
            >
              Scroll to Explore
            </div>
            <div
              style={{
                width: '2px',
                height: '40px',
                background: `linear-gradient(to bottom, ${colors.text.secondary}, transparent)`,
                margin: '0 auto',
              }}
            />
          </div>
        </section>

        {/* Room 1: Curated Collection */}
        <section
          style={{
            minHeight: '100vh',
            padding: `${spacing['4xl']} ${spacing.xl}`,
            background: `linear-gradient(180deg, ${colors.blackGreen} 0%, ${colors.darkGreen} 100%)`,
          }}
        >
          <div
            className="max-w-7xl mx-auto"
            style={{
              marginBottom: spacing['3xl'],
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: typography.small,
                fontFamily: typography.sans,
                color: colors.text.accent,
                textTransform: 'uppercase',
                letterSpacing: typography.tracking.widest,
                marginBottom: spacing.md,
              }}
            >
              Featured Collection
            </p>
            <h2
              style={{
                fontSize: typography.h2,
                fontFamily: typography.serif,
                fontWeight: typography.weights.light,
                color: colors.text.primary,
                letterSpacing: typography.tracking.tight,
                lineHeight: typography.lineHeights.snug,
              }}
            >
              The Garden of Becoming
            </h2>
          </div>

          <DarkBookPedestal
            title="The Path to Self-Actualization"
            author="Curator's Collection"
            coverImage="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"
            description="A transformative journey into understanding your highest potential and becoming the architect of your own destiny."
            price="$24.99"
          />
        </section>

        {/* Room 2: Dual Books */}
        <section
          style={{
            minHeight: '100vh',
            padding: `${spacing['4xl']} ${spacing.xl}`,
            background: colors.darkGreen,
          }}
        >
          <div
            className="max-w-7xl mx-auto"
            style={{
              marginBottom: spacing['3xl'],
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: typography.small,
                fontFamily: typography.sans,
                color: colors.text.accent,
                textTransform: 'uppercase',
                letterSpacing: typography.tracking.widest,
                marginBottom: spacing.md,
              }}
            >
              Essential Reads
            </p>
            <h2
              style={{
                fontSize: typography.h2,
                fontFamily: typography.serif,
                fontWeight: typography.weights.light,
                color: colors.text.primary,
                letterSpacing: typography.tracking.tight,
              }}
            >
              Foundations of Wisdom
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <DarkBookPedestal
              title="Mindful Living"
              author="Essential Series"
              coverImage="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop"
              description="Discover the art of present-moment awareness and cultivate inner peace."
              price="$19.99"
            />
            <DarkBookPedestal
              title="The Creative Self"
              author="Essential Series"
              coverImage="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop"
              description="Unlock your creative potential and express your authentic voice."
              price="$22.99"
            />
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            padding: `${spacing['3xl']} ${spacing.xl}`,
            background: colors.deepForest,
            borderTop: `1px solid ${colors.ui.border}`,
          }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <p
              style={{
                fontSize: typography.small,
                fontFamily: typography.sans,
                color: colors.text.secondary,
                marginBottom: spacing.md,
              }}
            >
              © 2025 The Self Actualized Life. All rights reserved.
            </p>
            <button
              onClick={() => setShowEntrance(true)}
              style={{
                fontSize: typography.small,
                fontFamily: typography.sans,
                color: colors.text.accent,
                textTransform: 'uppercase',
                letterSpacing: typography.tracking.widest,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Return to Entrance
            </button>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Hide scrollbar but keep functionality */
        .dark-museum-container::-webkit-scrollbar {
          display: none;
        }
        .dark-museum-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </SmoothScrollProvider>
  );
}
