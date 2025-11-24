/**
 * BARTOSZ KOLENDA INSPIRED DESIGN SYSTEM
 * Dark, sophisticated, landscape designer aesthetic
 * For Self-Actualization Museum
 */

export const bartoszTokens = {
  colors: {
    // Primary palette (from Bartosz site)
    blackGreen: '#05201f',      // Deep forest black
    creme: '#c5d2b7',           // Soft sage creme
    darkGreen: '#0a2f2e',       // Slightly lighter black-green
    lightCreme: '#d4e0cb',      // Lighter sage
    accentGold: '#C9A050',      // Luxury gold accent

    // Supporting colors
    deepForest: '#031614',      // Even darker background
    mist: '#e8f0e0',            // Very light sage mist
    charcoal: '#1a2e2d',        // Medium dark

    // Text hierarchy
    text: {
      primary: '#c5d2b7',       // Creme for body text
      secondary: '#9aab8e',     // Muted creme
      accent: '#C9A050',        // Gold for highlights
      inverse: '#05201f',       // Dark on light backgrounds
    },

    // UI elements
    ui: {
      background: '#05201f',    // Main dark background
      surface: '#0a2f2e',       // Card/panel backgrounds
      border: '#1a2e2d',        // Subtle borders
      hover: '#162f2e',         // Hover states
      active: '#1f3837',        // Active/pressed states
    }
  },

  typography: {
    // Fluid font sizes using clamp()
    // Mobile → Desktop smooth scaling
    h1: 'clamp(2.5rem, 1.5rem + 2.5vw, 4.5rem)',       // 40px → 72px
    h2: 'clamp(2rem, 1.25rem + 1.875vw, 3.5rem)',     // 32px → 56px
    h3: 'clamp(1.75rem, 1.125rem + 1.563vw, 3rem)',   // 28px → 48px
    h4: 'clamp(1.5rem, 1rem + 1.25vw, 2.5rem)',       // 24px → 40px
    h5: 'clamp(1.25rem, 0.875rem + 0.938vw, 2rem)',   // 20px → 32px
    body: 'clamp(1rem, 0.875rem + 0.313vw, 1.25rem)', // 16px → 20px
    small: 'clamp(0.875rem, 0.75rem + 0.313vw, 1.125rem)', // 14px → 18px

    // Font families
    serif: "'Playfair Display', serif",
    sans: "'Inter', -apple-system, sans-serif",

    // Font weights
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    // Line heights
    lineHeights: {
      tight: 1.1,
      snug: 1.3,
      normal: 1.5,
      relaxed: 1.7,
      loose: 2,
    },

    // Letter spacing
    tracking: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    }
  },

  spacing: {
    // Consistent spacing scale
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
    '2xl': '4rem',   // 64px
    '3xl': '6rem',   // 96px
    '4xl': '8rem',   // 128px
    '5xl': '12rem',  // 192px
  },

  effects: {
    // Custom cursor states
    cursor: {
      default: {
        width: '20px',
        height: '20px',
        background: 'rgba(197, 210, 183, 0.3)',
        backdropFilter: 'blur(10px)',
      },
      hover: {
        width: '60px',
        height: '60px',
        background: 'rgba(197, 210, 183, 0.15)',
        backdropFilter: 'blur(15px)',
      },
      bookInspect: {
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, rgba(201, 160, 80, 0.2) 0%, transparent 70%)',
        backdropFilter: 'blur(20px)',
      }
    },

    // Backdrop blur levels
    blur: {
      none: '0',
      sm: 'blur(4px)',
      md: 'blur(8px)',
      lg: 'blur(16px)',
      xl: 'blur(24px)',
    },

    // Box shadows
    shadows: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
      md: '0 4px 16px rgba(0, 0, 0, 0.4)',
      lg: '0 8px 32px rgba(0, 0, 0, 0.5)',
      xl: '0 16px 48px rgba(0, 0, 0, 0.6)',
      glow: '0 0 40px rgba(201, 160, 80, 0.3)',
    },

    // Transitions
    transitions: {
      fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
      normal: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: '0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      smooth: '0.735s cubic-bezier(0.65, 0.05, 0, 1)',
    }
  },

  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1280px',
    wide: '1536px',
  }
};

// Export individual tokens for convenience
export const {
  colors,
  typography,
  spacing,
  effects,
  breakpoints
} = bartoszTokens;
