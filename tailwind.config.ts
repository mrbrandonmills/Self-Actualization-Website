import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Mobile-first responsive breakpoints
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      // Luxury color palette
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: {
          DEFAULT: '#C9A050',
          light: '#D4AF37',
          dark: '#B89040',
          muted: 'rgba(201, 160, 80, 0.6)',
          hover: '#B89040',
        },
        gold: {
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
        // Glass design system colors
        glass: {
          border: 'rgba(255, 255, 255, 0.12)',
          'border-hover': 'rgba(255, 255, 255, 0.2)',
          'border-accent': 'rgba(201, 160, 80, 0.3)',
          bg: 'rgba(255, 255, 255, 0.06)',
          'bg-hover': 'rgba(255, 255, 255, 0.1)',
        },
      },

      // Typography
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },

      // Mobile-optimized font sizes with fluid scaling
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
        '7xl': ['4.5rem', { lineHeight: '1.2' }],
        '8xl': ['6rem', { lineHeight: '1.2' }],
        '9xl': ['8rem', { lineHeight: '1.2' }],
      },

      // Letter spacing for luxury typography
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
        luxury: '0.2em',
        ultra: '0.3em',
      },

      // Touch-friendly spacing
      spacing: {
        touch: '44px', // Minimum touch target size
        'touch-lg': '48px',
      },

      // Luxury animation timing
      transitionDuration: {
        fast: '200ms',
        normal: '400ms',
        slow: '600ms',
        slower: '800ms',
      },

      // Luxury easing curves
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.22, 1, 0.36, 1)',
        apple: 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      // Backdrop blur for glass effects
      backdropBlur: {
        glass: '24px',
        'glass-lg': '40px',
        'glass-sm': '16px',
      },

      // Box shadows with gold accents
      boxShadow: {
        gold: '0 0 20px rgba(201, 160, 80, 0.3), 0 0 40px rgba(201, 160, 80, 0.2)',
        'gold-sm': '0 2px 8px rgba(201, 160, 80, 0.15)',
        'gold-md': '0 8px 16px rgba(201, 160, 80, 0.2)',
        'gold-lg': '0 16px 32px rgba(201, 160, 80, 0.25)',
        'gold-xl': '0 24px 48px rgba(201, 160, 80, 0.3)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.4)',
      },

      // Custom animations
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        shimmer: 'shimmer 2s infinite',
        float: 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
      },

      // Background images
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #C9A050 50%, #B89040 100%)',
        'gradient-gold-radial': 'radial-gradient(circle, rgba(201, 160, 80, 0.3) 0%, transparent 70%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
