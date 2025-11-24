/**
 * Design Tokens for The Self Actualized Life
 * Wes Anderson-Inspired Nature Aesthetic
 * Warm pastels, organic animations, whimsical details
 */

export const designTokens = {
  // === HYPER-REALISTIC ULTRA-SATURATED COLOR PALETTE ===
  colors: {
    // Base colors - warm and inviting
    cream: '#F5EFE6',          // Vintage Paper - primary background
    beige: '#EDE3D3',          // Warm Beige - secondary background
    charcoal: '#3A3A3A',       // Soft charcoal for text (NOT pure black)
    white: '#FFFFFF',

    // === HYPER-SATURATED PRIMARY COLORS ===
    hyperSaturated: {
      electricGreen: { base: '#00FF41', light: '#66FF80', dark: '#00C933' },
      vividSky: { base: '#00D4FF', light: '#66E6FF', dark: '#00A8CC' },
      hotCoral: { base: '#FF3E5C', light: '#FF7089', dark: '#CC3149' },
      sunshineYellow: { base: '#FFD700', light: '#FFE866', dark: '#CCAC00' },
      deepViolet: { base: '#8B00FF', light: '#A966FF', dark: '#6B00CC' },
      neonPink: { base: '#FF006E', light: '#FF66A3', dark: '#CC0058' },
      orangeFlame: { base: '#FF6B00', light: '#FF9A66', dark: '#CC5500' },
      turquoisePop: { base: '#00FFD4', light: '#66FFE5', dark: '#00CCA9' },
    },

    // === ULTRA-SATURATED RAINBOW PALETTE (for unique buttons/cards) ===
    rainbow: {
      // Book Card Colors (6 unique) - ULTRA-SATURATED
      coralSunset: { base: '#FF3E5C', glow: 'rgba(255, 62, 92, 0.6)' },
      lavenderDream: { base: '#8B00FF', glow: 'rgba(139, 0, 255, 0.6)' },
      peachyKeen: { base: '#FF6B00', glow: 'rgba(255, 107, 0, 0.6)' },
      oceanBreeze: { base: '#00D4FF', glow: 'rgba(0, 212, 255, 0.6)' },
      mintFresh: { base: '#00FF41', glow: 'rgba(0, 255, 65, 0.6)' },
      roseGarden: { base: '#FF006E', glow: 'rgba(255, 0, 110, 0.6)' },

      // Course Card Colors (6 unique) - ULTRA-SATURATED
      goldenHour: { base: '#FFD700', glow: 'rgba(255, 215, 0, 0.6)' },
      violetSky: { base: '#8B00FF', glow: 'rgba(139, 0, 255, 0.6)' },
      seafoam: { base: '#00FFD4', glow: 'rgba(0, 255, 212, 0.6)' },
      cherryBlossom: { base: '#FF006E', glow: 'rgba(255, 0, 110, 0.6)' },
      limeZest: { base: '#00FF41', glow: 'rgba(0, 255, 65, 0.6)' },
      skyBlue: { base: '#00D4FF', glow: 'rgba(0, 212, 255, 0.6)' },
    },

    // Navigation Link Colors (5 unique)
    navColors: {
      books: '#FF6B6B',        // coral
      courses: '#FCD34D',      // golden
      writingLab: '#67E8F9',   // ocean
      blog: '#A78BFA',         // lavender
      about: '#6EE7B7',        // mint
    },

    // Wes Anderson Pastels
    dustyRose: {
      DEFAULT: '#E8B4B8',      // Primary dusty pink
      light: '#F5D7DA',        // Lighter rose
      dark: '#D4A5A5',         // Deeper rose
      muted: 'rgba(232, 180, 184, 0.6)',
    },

    mintGreen: {
      DEFAULT: '#B8D4C8',      // Primary mint/sage
      light: '#D4E8DD',        // Lighter mint
      dark: '#9EC5AB',         // Deeper sage
      muted: 'rgba(184, 212, 200, 0.6)',
    },

    softYellow: {
      DEFAULT: '#F4E8C1',      // Primary soft yellow
      light: '#FFF8E7',        // Cream yellow
      dark: '#E8D4A5',         // Golden yellow
      muted: 'rgba(244, 232, 193, 0.6)',
    },

    mutedBlue: {
      DEFAULT: '#A8C5D1',      // Primary muted blue
      light: '#C5D8E0',        // Lighter blue
      dark: '#8BABC1',         // Deeper blue
      muted: 'rgba(168, 197, 209, 0.6)',
    },

    terracotta: {
      DEFAULT: '#C67856',      // Primary terracotta
      light: '#D89A7A',        // Lighter terracotta
      dark: '#B85C3E',         // Deeper terracotta
      muted: 'rgba(198, 120, 86, 0.6)',
    },

    // Nature-inspired greens (for grass, trees)
    nature: {
      grass: '#B8D4C8',        // Grass green
      grassLight: '#C8E4D8',   // Light grass
      grassDark: '#9EC5AB',    // Dark grass
      forestGreen: '#6B8E7A',  // Forest
      moss: '#8A9A7B',         // Moss green
    },

    // Sunlight colors
    sunlight: {
      golden: '#F4E8C1',       // Golden light
      amber: '#E8D4A5',        // Amber glow
      warmGlow: '#FFF8E7',     // Warm glow
    },

    // Water/River colors
    water: {
      river: '#A8C5D1',        // River blue
      ripple: '#8BABC1',       // Deeper blue
      mist: 'rgba(168, 197, 209, 0.3)',
    },

    // Vintage film grain overlay
    vintage: {
      grain: 'rgba(138, 120, 100, 0.03)',
      sepia: 'rgba(232, 212, 180, 0.1)',
    },
  },

  // === TYPOGRAPHY ===
  typography: {
    fontFamily: {
      // Playfair Display for luxury headings
      serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
      // Inter for clean body text
      sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    },

    // Font scale (mobile-first, fluid responsive)
    scale: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
      '8xl': '6rem',      // 96px
      '9xl': '8rem',      // 128px
    },

    // Line height for readability
    lineHeight: {
      none: '1',
      tight: '1.1',
      snug: '1.2',
      normal: '1.5',
      relaxed: '1.75',
      loose: '2',
    },

    // Letter spacing for luxury feel
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
      luxury: '0.2em',    // For uppercase luxury text
      ultra: '0.3em',     // For extra luxury uppercase
    },

    // Font weights
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },

  // === SPACING SYSTEM ===
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
    '5xl': '8rem',    // 128px
    '6xl': '12rem',   // 192px
    '7xl': '16rem',   // 256px

    // Touch-friendly sizes
    touch: '44px',    // Minimum touch target (WCAG AAA)
    touchLg: '48px',  // Comfortable touch target
  },

  // === ANIMATION TIMING ===
  animation: {
    // Duration in milliseconds
    duration: {
      instant: 100,
      fast: 200,       // Hover effects, button presses
      normal: 400,     // Card reveals, element transitions
      slow: 600,       // Complex animations
      slower: 800,     // Hero sections, page transitions
      slowest: 1000,   // Dramatic reveals
      organic: 3000,   // Slow organic animations (grass sway, clouds)
      ambient: 6000,   // Very slow ambient animations (sunlight pulse)
    },

    // Easing curves (as arrays for Framer Motion)
    easing: {
      // Whimsical easing - playful and organic
      whimsical: [0.34, 1.2, 0.64, 1],
      // Organic easing - natural and smooth
      organic: [0.45, 0.05, 0.55, 0.95],
      // Gentle easing - soft and calm
      gentle: [0.22, 1, 0.36, 1],
      // Spring physics - bouncy effect
      spring: [0.34, 1.56, 0.64, 1],
      // Smooth - very smooth transitions
      smooth: [0.4, 0.0, 0.2, 1],
    },
  },

  // === BORDER RADIUS ===
  borderRadius: {
    none: '0',
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    full: '9999px',   // Pill shape
  },

  // === SOFT SHADOWS (Wes Anderson style - subtle, not harsh) ===
  shadows: {
    // Soft vintage shadows
    sm: '0 2px 4px 0 rgba(0, 0, 0, 0.08)',
    md: '0 4px 8px -1px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 16px -2px rgba(0, 0, 0, 0.15)',
    xl: '0 12px 24px -4px rgba(0, 0, 0, 0.18)',
    '2xl': '0 20px 40px -8px rgba(0, 0, 0, 0.2)',

    // Pastel accent shadows
    pastel: {
      rose: '0 4px 12px rgba(232, 180, 184, 0.3)',
      mint: '0 4px 12px rgba(184, 212, 200, 0.3)',
      yellow: '0 4px 12px rgba(244, 232, 193, 0.3)',
      blue: '0 4px 12px rgba(168, 197, 209, 0.3)',
      terracotta: '0 4px 12px rgba(198, 120, 86, 0.3)',
    },

    // Soft inner shadows for depth
    inner: {
      soft: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
      medium: 'inset 0 4px 8px rgba(0, 0, 0, 0.1)',
    },
  },

  // === BLUR EFFECTS ===
  blur: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
    '3xl': '64px',

    // Glass design system blur
    glass: '24px',
    glassLg: '40px',
    glassSm: '16px',
  },

  // === BREAKPOINTS ===
  breakpoints: {
    xs: '375px',    // Small mobile
    sm: '640px',    // Large mobile
    md: '768px',    // Tablet
    lg: '1024px',   // Desktop
    xl: '1280px',   // Large desktop
    '2xl': '1536px', // Extra large
  },

  // === Z-INDEX LAYERS ===
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 10,
    sticky: 20,
    overlay: 30,
    modal: 40,
    popover: 50,
    toast: 60,
    tooltip: 70,
    cursor: 9999,
  },

  // === GRADIENTS ===
  gradients: {
    // Sage Garden gradients
    sage: 'linear-gradient(135deg, #A8B88C 0%, #8A9A5B 50%, #6B7A3D 100%)',
    sageRadial: 'radial-gradient(circle, rgba(138, 154, 91, 0.3) 0%, transparent 70%)',
    sageShine: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent)',

    // Black fades
    blackFade: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%)',
    blackFadeTop: 'linear-gradient(to top, transparent 0%, rgba(0, 0, 0, 0.7) 100%)',

    // Glass gradients
    glassLight: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)',
    glassShine: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 40%)',
    glassEdge: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
  },

  // === GLASS DESIGN SYSTEM ===
  glass: {
    blur: '24px',
    blurLg: '40px',
    blurSm: '16px',
    saturation: '180%',
    brightness: '105%',
  },
} as const

// === FRAMER MOTION VARIANTS ===
export const motionVariants = {
  // Fade in from bottom (DEFAULT)
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  },

  // Fade in from top
  fadeInDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
  },

  // Fade in from left
  fadeInLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 },
  },

  // Fade in from right
  fadeInRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  },

  // Scale in (subtle)
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },

  // Scale in (dramatic)
  scaleInDramatic: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },

  // Stagger children (for lists, grids)
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  // Fast stagger (for quick reveals)
  staggerFast: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  },

  // Slow stagger (for dramatic effect)
  staggerSlow: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  },

  // Card hover effect
  cardHover: {
    rest: {
      scale: 1,
      y: 0,
    },
    hover: {
      scale: 1.02,
      y: -8,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Image zoom on hover
  imageZoom: {
    rest: {
      scale: 1,
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },

  // Magnetic effect (follows cursor)
  magnetic: {
    rest: {
      x: 0,
      y: 0,
    },
    hover: (custom: { x: number; y: number }) => ({
      x: custom.x * 0.3,
      y: custom.y * 0.3,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  },

  // Overlay (for modals, panels)
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },

  // Slide from right (for panels, cart)
  slideFromRight: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },

  // Slide from left
  slideFromLeft: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },

  // Slide from bottom (for mobile menus)
  slideFromBottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  },
}

// === ANIMATION PRESETS ===
export const animationPresets = {
  // Fast interactions (hover, clicks)
  fast: {
    duration: 0.2,
    ease: designTokens.animation.easing.gentle,
  },

  // Normal transitions (page elements)
  normal: {
    duration: 0.4,
    ease: designTokens.animation.easing.gentle,
  },

  // Slow, dramatic reveals
  slow: {
    duration: 0.8,
    ease: designTokens.animation.easing.gentle,
  },

  // Hero section animations
  hero: {
    duration: 1,
    ease: designTokens.animation.easing.gentle,
  },

  // Spring physics for bouncy effects
  spring: {
    type: 'spring' as const,
    stiffness: 700,
    damping: 25,
  },

  // Smooth spring (less bouncy)
  smoothSpring: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
  },

  // Gentle spring (very smooth)
  gentleSpring: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 20,
  },
}

// Export individual token groups for convenience
export const { colors, typography, spacing, animation, borderRadius, shadows, blur, breakpoints, zIndex, gradients, glass } = designTokens

export default designTokens
