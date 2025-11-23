/**
 * Design Tokens for The Self Actualized Life
 * Museum-quality luxury design system
 * Inspired by Louis Vuitton, Hermès, Chanel, Gucci, and Apple
 */

export const designTokens = {
  // === COLOR PALETTE ===
  colors: {
    // Core brand colors
    black: '#000000',
    white: '#FFFFFF',

    // Gold accent - primary luxury accent
    gold: {
      DEFAULT: '#C9A050',
      light: '#D4AF37',
      dark: '#B89040',
      muted: 'rgba(201, 160, 80, 0.6)',
      50: 'rgba(201, 160, 80, 0.05)',
      100: 'rgba(201, 160, 80, 0.10)',
      200: 'rgba(201, 160, 80, 0.20)',
      300: 'rgba(201, 160, 80, 0.30)',
      400: 'rgba(201, 160, 80, 0.40)',
      500: '#C9A050',
      600: '#B89040',
      700: '#A78030',
      800: '#967020',
      900: '#856010',
    },

    // Grayscale with alpha transparency
    gray: {
      50: 'rgba(255, 255, 255, 0.05)',
      100: 'rgba(255, 255, 255, 0.10)',
      200: 'rgba(255, 255, 255, 0.20)',
      300: 'rgba(255, 255, 255, 0.30)',
      400: 'rgba(255, 255, 255, 0.40)',
      500: 'rgba(255, 255, 255, 0.50)',
      600: 'rgba(255, 255, 255, 0.60)',
      700: 'rgba(255, 255, 255, 0.70)',
      800: 'rgba(255, 255, 255, 0.80)',
      900: 'rgba(255, 255, 255, 0.90)',
    },

    // iOS 18 Liquid Glass Design System colors
    glass: {
      // Backgrounds
      bg: 'rgba(255, 255, 255, 0.06)',
      bgHover: 'rgba(255, 255, 255, 0.1)',
      bgActive: 'rgba(255, 255, 255, 0.14)',
      bgElevated: 'rgba(255, 255, 255, 0.08)',

      // Borders
      border: 'rgba(255, 255, 255, 0.12)',
      borderHover: 'rgba(255, 255, 255, 0.2)',
      borderAccent: 'rgba(201, 160, 80, 0.3)',
      borderSubtle: 'rgba(255, 255, 255, 0.08)',

      // Dark variants
      dark: 'rgba(0, 0, 0, 0.6)',
      panel: 'rgba(5, 5, 5, 0.9)',
      navbar: 'rgba(0, 0, 0, 0.7)',
      modal: 'rgba(10, 10, 10, 0.85)',
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
    },

    // Easing curves (as arrays for Framer Motion)
    easing: {
      // Luxury easing - smooth and elegant (PRIMARY)
      luxury: [0.22, 1, 0.36, 1],
      // Apple-style easing - refined deceleration
      apple: [0.16, 1, 0.3, 1],
      // Spring physics - bouncy effect
      spring: [0.34, 1.56, 0.64, 1],
      // Sharp - precise and quick
      sharp: [0.4, 0.0, 0.2, 1],
      // Deceleration - smooth slow down
      decel: [0.0, 0.0, 0.2, 1],
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

  // === SHADOWS ===
  shadows: {
    // Standard shadows
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

    // Gold accent shadows
    gold: {
      sm: '0 2px 8px rgba(201, 160, 80, 0.15)',
      md: '0 8px 16px rgba(201, 160, 80, 0.2)',
      lg: '0 16px 32px rgba(201, 160, 80, 0.25)',
      xl: '0 24px 48px rgba(201, 160, 80, 0.3)',
      glow: '0 0 40px rgba(201, 160, 80, 0.15)',
    },

    // Glass design system shadows
    glass: {
      default: '0 8px 32px rgba(0, 0, 0, 0.3)',
      lg: '0 16px 48px rgba(0, 0, 0, 0.4)',
      inner: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      glow: '0 0 40px rgba(201, 160, 80, 0.15)',
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
    // Gold gradients
    gold: 'linear-gradient(135deg, #D4AF37 0%, #C9A050 50%, #B89040 100%)',
    goldRadial: 'radial-gradient(circle, rgba(201, 160, 80, 0.3) 0%, transparent 70%)',
    goldShine: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent)',

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
    ease: designTokens.animation.easing.luxury,
  },

  // Normal transitions (page elements)
  normal: {
    duration: 0.4,
    ease: designTokens.animation.easing.luxury,
  },

  // Slow, dramatic reveals
  slow: {
    duration: 0.8,
    ease: designTokens.animation.easing.luxury,
  },

  // Hero section animations
  hero: {
    duration: 1,
    ease: designTokens.animation.easing.luxury,
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
