/**
 * WES ANDERSON DESIGN TOKENS
 *
 * Authentic Wes Anderson aesthetic based on reference images:
 * - Muted, pastel color palette (NOT neon, NOT oversaturated)
 * - Warm, natural tones
 * - Photographic quality
 * - Clean, symmetrical layouts
 * - Vintage typography
 *
 * Reference films: The Grand Budapest Hotel, Moonrise Kingdom,
 * The French Dispatch, Fantastic Mr. Fox
 */

export const WesAndersonColors = {
  // Primary Pastels (from reference images)
  cream: '#F5EFE6',
  beige: '#EDE3D3',
  warmWhite: '#FAF7F0',

  // Accent Colors (muted, sophisticated)
  yellow: '#F4D35E',        // Yellow door, sunlight
  mustard: '#E8B84E',       // Warm brass tones

  green: '#6B8E23',         // Hedge green
  sage: '#8A9A5B',          // Soft foliage
  mint: '#A4C3A2',          // Light garden tones

  pink: '#E8B4B8',          // Soft flowers, fabrics
  rose: '#D4A5A5',          // Vintage rose
  blush: '#F2D7D5',         // Pale pink accents

  sky: '#A8C5D1',           // Sky blue, water
  powder: '#B5D3E7',        // Soft powder blue

  red: '#D4595C',           // Dusty red, chairs
  brick: '#C85A54',         // Warm terracotta

  teal: '#5EADB5',          // Pool water, vintage teal
  aqua: '#7EC4CF',          // Soft aqua

  // Neutrals (warm tones)
  charcoal: '#3A3A3A',      // Text, borders
  gray: '#6B6B6B',          // Secondary text
  lightGray: '#C4C4C4',     // Dividers, subtle elements

  // Background Tones
  paper: '#F8F5F0',         // Warm paper texture
  canvas: '#EFEBE3',        // Canvas background
} as const

export const WesAndersonTypography = {
  // Primary font families
  serif: '"Futura", "Playfair Display", Georgia, serif',     // Titles, headers
  body: '"Archer", "Inter", "Helvetica Neue", sans-serif',   // Body text
  mono: '"Courier New", "JetBrains Mono", monospace',        // Code, special elements

  // Font sizes (responsive scale)
  sizes: {
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
  },

  // Font weights
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Letter spacing
  tracking: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Line heights
  leading: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const

export const WesAndersonSpacing = {
  // Spacing scale (consistent rhythm)
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
} as const

export const WesAndersonBorders = {
  // Border widths (bold, clean lines)
  thin: '1px',
  normal: '2px',
  thick: '3px',
  heavy: '4px',

  // Border radius (minimal - Wes Anderson prefers sharp corners)
  none: '0',
  sm: '2px',
  md: '4px',
  lg: '8px',

  // Border colors
  colors: {
    charcoal: WesAndersonColors.charcoal,
    gray: WesAndersonColors.gray,
    lightGray: WesAndersonColors.lightGray,
  },
} as const

export const WesAndersonShadows = {
  // Hard shadows (NOT soft gradients - Wes Anderson style)
  none: 'none',
  sm: '4px 4px 0 rgba(58, 58, 58, 1)',
  md: '6px 6px 0 rgba(58, 58, 58, 1)',
  lg: '8px 8px 0 rgba(58, 58, 58, 1)',
  xl: '12px 12px 0 rgba(58, 58, 58, 1)',

  // Soft shadows (for depth, NOT hard edges)
  soft: '0 4px 20px rgba(0, 0, 0, 0.08)',
  medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
} as const

export const WesAndersonAnimations = {
  // Easing functions (elegant, refined)
  easing: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
    // Wes Anderson preferred easing (smooth, cinematic)
    cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },

  // Duration (NOT too fast - Wes Anderson is deliberate)
  duration: {
    instant: '100ms',
    fast: '200ms',
    normal: '400ms',
    slow: '600ms',
    slower: '800ms',
    slowest: '1000ms',
  },
} as const

export const WesAndersonLayout = {
  // Max widths (centered, symmetrical)
  maxWidth: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Container padding
  padding: {
    mobile: WesAndersonSpacing.lg,
    tablet: WesAndersonSpacing.xl,
    desktop: WesAndersonSpacing['2xl'],
  },

  // Grid gaps
  gap: {
    sm: WesAndersonSpacing.md,
    md: WesAndersonSpacing.lg,
    lg: WesAndersonSpacing.xl,
    xl: WesAndersonSpacing['2xl'],
  },
} as const

/**
 * BREAKPOINTS
 * Responsive design breakpoints
 */
export const WesAndersonBreakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

/**
 * COLOR PALETTES
 * Pre-composed color schemes for different sections
 */
export const WesAndersonPalettes = {
  // Garden palette (natural, warm)
  garden: {
    primary: WesAndersonColors.green,
    secondary: WesAndersonColors.yellow,
    accent: WesAndersonColors.pink,
    background: WesAndersonColors.cream,
    text: WesAndersonColors.charcoal,
  },

  // Ocean/Pool palette (cool, refreshing)
  water: {
    primary: WesAndersonColors.teal,
    secondary: WesAndersonColors.sky,
    accent: WesAndersonColors.yellow,
    background: WesAndersonColors.powder,
    text: WesAndersonColors.charcoal,
  },

  // Warm palette (cozy, inviting)
  warm: {
    primary: WesAndersonColors.red,
    secondary: WesAndersonColors.mustard,
    accent: WesAndersonColors.pink,
    background: WesAndersonColors.beige,
    text: WesAndersonColors.charcoal,
  },

  // Neutral palette (clean, professional)
  neutral: {
    primary: WesAndersonColors.charcoal,
    secondary: WesAndersonColors.gray,
    accent: WesAndersonColors.yellow,
    background: WesAndersonColors.paper,
    text: WesAndersonColors.charcoal,
  },
} as const

/**
 * UTILITY FUNCTIONS
 */

/**
 * Get a color from the palette with TypeScript autocomplete
 */
export function getColor(color: keyof typeof WesAndersonColors): string {
  return WesAndersonColors[color]
}

/**
 * Get a spacing value with TypeScript autocomplete
 */
export function getSpacing(size: keyof typeof WesAndersonSpacing): string {
  return WesAndersonSpacing[size]
}

/**
 * Get a shadow value
 */
export function getShadow(size: keyof typeof WesAndersonShadows): string {
  return WesAndersonShadows[size]
}

/**
 * Generate CSS custom properties for Wes Anderson theme
 * Use this in your global CSS or Tailwind config
 */
export function generateCSSVariables(): Record<string, string> {
  const vars: Record<string, string> = {}

  // Colors
  Object.entries(WesAndersonColors).forEach(([key, value]) => {
    vars[`--wa-color-${key}`] = value
  })

  // Spacing
  Object.entries(WesAndersonSpacing).forEach(([key, value]) => {
    vars[`--wa-spacing-${key}`] = value
  })

  // Shadows
  Object.entries(WesAndersonShadows).forEach(([key, value]) => {
    vars[`--wa-shadow-${key}`] = value
  })

  return vars
}
