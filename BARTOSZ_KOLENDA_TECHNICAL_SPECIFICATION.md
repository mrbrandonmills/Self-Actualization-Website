# Bartosz Kolenda Website - Complete Technical Specification

**Target Site:** https://bartoszkolenda.com/
**Analysis Date:** 2025-11-23
**Purpose:** Complete implementation blueprint for exact replication

---

## EXECUTIVE SUMMARY

The Bartosz Kolenda website is a modern, minimalist portfolio site for a landscape and garden designer. It features a sophisticated design system built with Tailwind CSS v3.4.17, fluid typography using CSS clamp(), custom cursor interactions, and a dark green aesthetic with bright accent colors.

**Key Technical Characteristics:**
- Modern JavaScript framework (likely Next.js based on structure patterns)
- Tailwind CSS v3.4.17 with extensive customization
- Fluid responsive design using clamp() functions throughout
- Custom cursor implementation with multiple interaction states
- Professional typography pairing (Figtree + Playfair Display)
- Noise/grain texture overlays for visual depth
- Sophisticated color palette with semantic naming

---

## 1. DESIGN TOKENS

### 1.1 Color Palette

**Complete Color System:**

```javascript
// tailwind.config.js colors
colors: {
  // Primary Colors
  blackGreen: '#05201f',      // Main background, navigation
  matteGreen: '#003635',      // Secondary dark, text on light backgrounds
  brightGreen: '#e2ffc2',     // Primary accent, CTAs, highlights
  creme: '#c5d2b7',          // Borders, subtle accents
  lightGreen: '#f5f6f4',     // Light backgrounds, cards

  // System Colors
  white: '#ffffff',
  black: '#000000',
  red: '#ff3c3c',           // Error states
}
```

**Color Usage Patterns:**
- **Primary Background:** `#05201f` (blackGreen) - Used for navigation, footer, and primary sections
- **Text on Dark:** `#ffffff` (white) for primary text, `#e2ffc2` (brightGreen) for accents
- **Text on Light:** `#003635` (matteGreen) for primary text
- **Interactive Elements:** `#e2ffc2` (brightGreen) for buttons, hover states
- **Borders/Dividers:** `#c5d2b7` (creme) at 1px thickness
- **Gradient Overlays:** blackGreen to matteGreen with opacity variants

### 1.2 Typography System

**Font Families:**

```css
/* Primary Sans-Serif - Figtree */
@font-face {
  font-family: 'Figtree';
  src: url('path-to-figtree.woff2') format('woff2');
  font-weight: 300 800; /* Variable font supporting 300-800 */
  font-display: swap;
  font-feature-settings: "opsz" auto; /* Optical sizing enabled */
}

/* Secondary Serif - Playfair Display */
@font-face {
  font-family: 'Playfair Display';
  src: url('path-to-playfair.woff2') format('woff2');
  font-weight: 400 900;
  font-style: italic;
  font-display: swap;
}

/* System Fallbacks */
font-family: Figtree, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
```

**Google Fonts Implementation:**

```html
<!-- Figtree - All weights used -->
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

<!-- Playfair Display - Italic variants -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
```

**Typography Scale:**

```javascript
// Complete type scale with responsive clamp() values
fontSize: {
  // Headings
  h1: 'clamp(4.0625rem, 3.125rem + 4vw, 8.125rem)',          // 65px → 130px
  h1LineHeight: 'clamp(3.90625rem, 3rem + 3.8vw, 7.8125rem)', // 62.5px → 125px

  h2: '3.875rem',              // 62px
  h2LineHeight: '4.0625rem',   // 65px
  mobileH2: '2.125rem',        // 34px
  mobileH2LineHeight: '2.25rem', // 36px

  h3: '2.75rem',               // 44px
  h3LineHeight: '2.875rem',    // 46px

  // Body Text
  text1: '1.375rem',           // 22px - Large body
  text1LineHeight: '1.75rem',  // 28px

  text2: '1.0625rem',          // 17px - Standard body
  text2LineHeight: '1.5rem',   // 24px

  text3: '0.9375rem',          // 15px - Small body
  text3LineHeight: '1.125rem', // 18px
}
```

**Letter Spacing:**

```javascript
letterSpacing: {
  headings: '-0.04em',  // H1, H2, H3
  body: '-0.02em',      // text1, text2, text3
}
```

**Font Weights:**

```javascript
fontWeight: {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
}
```

### 1.3 Spacing Scale

**Custom Spacing System:**

```javascript
spacing: {
  // Base scale
  '0': '0',
  '0.5': '0.125rem',    // 2px
  '1': '0.25rem',       // 4px
  '2': '0.5rem',        // 8px
  '3': '0.75rem',       // 12px
  '4': '1rem',          // 16px
  '5': '1.25rem',       // 20px
  '6': '1.5rem',        // 24px
  '7': '1.75rem',       // 28px
  '8': '2rem',          // 32px
  '9': '2.25rem',       // 36px
  '10': '2.5rem',       // 40px

  // Extended scale
  '12': '3rem',         // 48px
  '15': '3.75rem',      // 60px
  '20': '5rem',         // 80px
  '25': '6.25rem',      // 100px
  '30': '7.5rem',       // 120px
  '35': '8.75rem',      // 140px

  // Custom named values (from site)
  's8': '0.5rem',       // 8px
  's16': '1rem',        // 16px
  's20': '1.25rem',     // 20px
  's40': '2.5rem',      // 40px
  's60': '3.75rem',     // 60px
  's80': '5rem',        // 80px
  's100': '6.25rem',    // 100px
  's140': '8.75rem',    // 140px
}
```

**Vertical Rhythm Pattern:**
- Small sections: `py-[2.5rem]` (40px)
- Medium sections: `py-[3.75rem]` (60px)
- Large sections: `py-[5rem]` (80px)
- Extra large: `py-[7.5rem]` (120px)

### 1.4 Border Radius

**Fluid Border Radius System:**

```javascript
borderRadius: {
  none: '0',
  sm: '0.125rem',       // 2px
  DEFAULT: '0.25rem',   // 4px
  md: '0.375rem',       // 6px
  lg: '0.5rem',         // 8px
  xl: '0.75rem',        // 12px
  '2xl': '1rem',        // 16px
  '3xl': '1.5rem',      // 24px
  full: '9999px',

  // Fluid custom values
  'fluid-sm': 'clamp(1rem, 0.5rem + 2vw, 1.875rem)',        // 16px → 30px
  'fluid-md': 'clamp(1.5rem, 1rem + 2vw, 3.125rem)',        // 24px → 50px
  'fluid-lg': 'clamp(1.875rem, 1.25rem + 2.5vw, 3.125rem)', // 30px → 50px
}
```

### 1.5 Breakpoints

**Responsive Design System:**

```javascript
screens: {
  sm: '40rem',      // 640px
  md: '48rem',      // 768px
  lg: '64rem',      // 1024px
  xl: '80rem',      // 1280px
  '2xl': '96rem',   // 1536px (Tailwind default)
  '3xl': '110rem',  // 1760px
  '5xl': '120.0625rem', // 1921px
}
```

**Mobile-First Approach:**
- Base styles: 320px+
- sm: 640px+
- md: 768px+
- lg: 1024px+
- xl: 1280px+

### 1.6 Transitions & Animations

**Timing Functions:**

```javascript
transitionTimingFunction: {
  DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
}

transitionDuration: {
  150: '150ms',
  300: '300ms',
}
```

**Common Patterns:**
- Standard transitions: `transition-all duration-300`
- Color transitions: `transition-colors duration-300`
- Transform: `transition-transform duration-300`
- Backdrop blur: `transition-[backdrop-filter] duration-300`

### 1.7 Z-Index Scale

**Layering System:**

```javascript
zIndex: {
  '-1': '-1',
  '0': '0',
  '3': '3',
  '4': '4',
  '10': '10',
  '99': '99',
  '100': '100',    // Navigation
  '101': '101',    // Dropdowns
  '102': '102',    // Modals/Overlays
  '103': '103',    // Custom cursor
  '105': '105',
  '110': '110',    // Top-level overlays
  '250': '250',    // System notifications
}
```

---

## 2. COMPONENT BREAKDOWN

### 2.1 Navigation Component

**Structure:**
```html
<nav class="fixed top-0 left-0 right-0 z-100 bg-blackGreen/80 backdrop-blur-md">
  <div class="px-5 py-[1.25rem] lg:px-[2.5rem]">
    <div class="flex items-center justify-between">
      <!-- Logo/Brand -->
      <div class="text-white">
        Bart Kolenda
      </div>

      <!-- Navigation Links -->
      <div class="hidden lg:flex gap-[2.5rem]">
        <!-- Nav items -->
      </div>

      <!-- Mobile Menu Toggle -->
      <button class="lg:hidden">
        <!-- Hamburger icon -->
      </button>
    </div>
  </div>
</nav>
```

**Specifications:**
- **Position:** Fixed with sticky behavior
- **Height:** 2.75rem (44px) content, 2.88rem with padding
- **Background:** `bg-blackGreen` with 80% opacity (`bg-blackGreen/80`)
- **Backdrop Blur:** `backdrop-blur-md` (12px blur)
- **Padding:**
  - Horizontal: `px-5` (20px) mobile, `lg:px-[2.5rem]` (40px) desktop
  - Vertical: `py-[1.25rem]` (20px)
- **Z-Index:** 100
- **Text Color:** White with brightGreen hover states
- **Transition:** `transition-colors duration-300`

**Interaction States:**
- **Hover:** Links scale to `scale-[1.01]`, color changes to brightGreen
- **Active:** Underline decoration in brightGreen
- **Mobile:** Transforms to full-screen overlay menu

### 2.2 Custom Cursor Component

**HTML Structure:**
```html
<div class="mf-cursor fixed pointer-events-none z-103">
  <div class="mf-cursor-inner"></div>
</div>
```

**CSS Implementation:**

```css
.mf-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 103;
  transform: translate(-50%, -50%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.mf-cursor-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(226, 255, 194, 0.2); /* brightGreen with opacity */
  backdrop-filter: blur(12px);
  transform: scale(0.22);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  mix-blend-mode: normal;
}

/* Cursor States */
.mf-cursor.-pointer .mf-cursor-inner {
  transform: scale(0.15);
  background: rgba(226, 255, 194, 0.3);
}

.mf-cursor.-text .mf-cursor-inner {
  transform: scale(2.5);
  background: rgba(226, 255, 194, 0.1);
  backdrop-filter: blur(4px);
}

.mf-cursor.-icon .mf-cursor-inner {
  transform: scale(1.5);
  background: rgba(226, 255, 194, 0.25);
}

.mf-cursor.-active .mf-cursor-inner {
  transform: scale(1.4);
  background: rgba(226, 255, 194, 0.4);
}
```

**JavaScript Implementation Pattern:**

```javascript
// Custom cursor follows mouse position
let cursor = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0
};

document.addEventListener('mousemove', (e) => {
  cursor.targetX = e.clientX;
  cursor.targetY = e.clientY;
});

function updateCursor() {
  // Smooth following with linear interpolation
  cursor.x += (cursor.targetX - cursor.x) * 0.15;
  cursor.y += (cursor.targetY - cursor.y) * 0.15;

  const cursorElement = document.querySelector('.mf-cursor');
  cursorElement.style.transform = `translate(${cursor.x}px, ${cursor.y}px)`;

  requestAnimationFrame(updateCursor);
}

updateCursor();

// State changes on element hover
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.querySelector('.mf-cursor').classList.add('-pointer');
  });
  el.addEventListener('mouseleave', () => {
    document.querySelector('.mf-cursor').classList.remove('-pointer');
  });
});
```

**Cursor States:**
1. **Default:** Scale 0.22, subtle brightGreen glow
2. **Pointer (-pointer):** Scale 0.15, smaller on interactive elements
3. **Text (-text):** Scale 2.5, large blur around text
4. **Icon (-icon):** Scale 1.5, medium size for icons
5. **Active (-active):** Scale 1.4, more opaque on click

### 2.3 Hero Section

**Structure:**
```html
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <!-- Background gradient -->
  <div class="absolute inset-0 bg-gradient-to-b from-blackGreen to-matteGreen"></div>

  <!-- Noise overlay -->
  <div class="absolute inset-0 opacity-50 mix-blend-darken image-noise"></div>

  <!-- Content -->
  <div class="relative z-10 px-5 lg:px-[5rem] text-center">
    <h1 class="~text-h1/h1Smaller text-white mb-[2.5rem]">
      Landscape and Garden Designer
    </h1>
    <p class="text-text1 text-brightGreen max-w-[50rem] mx-auto">
      Creating beautiful outdoor spaces
    </p>
  </div>
</section>
```

**Specifications:**
- **Height:** `min-h-screen` (100vh minimum)
- **Layout:** Centered flex container
- **Background:** Gradient from blackGreen to matteGreen
- **Noise Overlay:** 50% opacity with `mix-blend-darken`
- **Content Padding:**
  - Mobile: `px-5` (20px)
  - Desktop: `lg:px-[5rem]` (80px)
- **Typography:**
  - H1: Fluid size with white color
  - Subtitle: text1 size in brightGreen
- **Max Content Width:** 50rem (800px) centered

### 2.4 Content Sections

**Standard Section Pattern:**

```html
<section class="py-[5rem] lg:py-[7.5rem] px-5 lg:px-[5rem] bg-lightGreen border-t border-creme">
  <div class="max-w-[90rem] mx-auto">
    <!-- Section header -->
    <div class="mb-[3.75rem]">
      <h2 class="~text-h2/mobileH2 text-matteGreen mb-[1.25rem]">
        Section Title
      </h2>
      <p class="text-text2 text-matteGreen/80 max-w-[40rem]">
        Section description
      </p>
    </div>

    <!-- Section content (grid/flex) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2.5rem]">
      <!-- Content items -->
    </div>
  </div>
</section>
```

**Specifications:**
- **Vertical Padding:**
  - Mobile: `py-[5rem]` (80px)
  - Desktop: `lg:py-[7.5rem]` (120px)
- **Horizontal Padding:** Same as hero section
- **Max Width:** 90rem (1440px) centered
- **Border:** 1px top border in creme color
- **Grid Pattern:** 1 → 2 → 3 columns responsive
- **Gap:** 2.5rem (40px) between items

### 2.5 Image Cards

**Card Structure:**

```html
<div class="group relative overflow-hidden ~rounded-fluid-md bg-white">
  <!-- Image -->
  <div class="relative aspect-[1.07] overflow-hidden">
    <img
      src="image.jpg"
      alt="Project name"
      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
    />
    <!-- Noise overlay on image -->
    <div class="absolute inset-0 opacity-30 mix-blend-darken image-noise"></div>
  </div>

  <!-- Card content -->
  <div class="p-[1.25rem] lg:p-[2.5rem]">
    <h3 class="text-h3 text-matteGreen mb-[0.625rem]">
      Project Title
    </h3>
    <p class="text-text2 text-matteGreen/80">
      Project description
    </p>
  </div>
</div>
```

**Specifications:**
- **Border Radius:** Fluid clamp value (1.5rem → 3.125rem)
- **Aspect Ratios:**
  - Portrait: `aspect-[0.9]` (0.9:1)
  - Standard: `aspect-[1.07]` (1.07:1)
  - Square: `aspect-[1/1]` (1:1)
  - Landscape: `aspect-[1.57]` (1.57:1)
- **Image Hover:** Scale to 1.05 with 300ms transition
- **Padding:**
  - Mobile: `p-[1.25rem]` (20px)
  - Desktop: `lg:p-[2.5rem]` (40px)
- **Background:** White or lightGreen
- **Noise:** 30% opacity with darken blend mode

### 2.6 Buttons

**Primary Button:**

```html
<button class="
  inline-flex items-center justify-center gap-2
  px-[1.25rem] py-[1rem]
  bg-brightGreen text-matteGreen
  ~rounded-[1.875rem]/[1rem]
  text-text2 font-semibold
  transition-all duration-300
  hover:bg-white hover:scale-[1.01]
  focus:outline-none focus:ring-2 focus:ring-brightGreen focus:ring-offset-2
  cursor-pointer
">
  Button Text
</button>
```

**Secondary Button (Outlined):**

```html
<button class="
  inline-flex items-center justify-center gap-2
  px-[1.25rem] py-[1rem]
  bg-transparent text-white
  border border-creme
  ~rounded-[1.875rem]/[1rem]
  text-text2 font-semibold
  transition-all duration-300
  hover:bg-brightGreen hover:text-matteGreen hover:border-brightGreen
  cursor-pointer
">
  Button Text
</button>
```

**Button Specifications:**
- **Padding:** `px-[1.25rem] py-[1rem]` (20px horizontal, 16px vertical)
- **Border Radius:** Fluid responsive (30px → 16px)
- **Typography:** text2 size (17px), semibold weight (600)
- **Transitions:** All properties, 300ms duration
- **Hover States:**
  - Primary: Background to white, scale to 1.01
  - Secondary: Fill with brightGreen, text to matteGreen
- **Focus:** Ring in brightGreen with 2px offset

### 2.7 Footer

**Structure:**

```html
<footer class="bg-blackGreen border-t border-creme/30">
  <div class="px-5 lg:px-[5rem] py-[3.75rem] lg:py-[5rem]">
    <div class="max-w-[90rem] mx-auto">
      <!-- Footer grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2.5rem] mb-[3.75rem]">
        <!-- Footer columns -->
        <div>
          <h4 class="text-text1 text-brightGreen mb-[1.25rem] font-semibold">
            Column Title
          </h4>
          <ul class="space-y-[0.625rem]">
            <li>
              <a href="#" class="text-text2 text-white/80 hover:text-brightGreen transition-colors duration-300">
                Link Text
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="pt-[2.5rem] border-t border-creme/30">
        <p class="text-text3 text-white/60 text-center">
          © 2024 Bart Kolenda. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</footer>
```

**Specifications:**
- **Background:** blackGreen
- **Border:** Top border in creme with 30% opacity
- **Padding:**
  - Vertical: 60px mobile, 80px desktop
  - Horizontal: Same as other sections
- **Grid:** 1 → 2 → 4 columns
- **Link Styles:**
  - Default: White with 80% opacity
  - Hover: brightGreen
  - Transition: 300ms colors
- **Typography:**
  - Headings: text1 size, brightGreen, semibold
  - Links: text2 size
  - Copyright: text3 size, 60% opacity white

---

## 3. CSS TECHNIQUES REFERENCE

### 3.1 Fluid Typography Implementation

**Clamp() Formula Pattern:**

```css
/* Syntax: clamp(MIN, PREFERRED, MAX) */

/* Example - H1 Heading */
font-size: clamp(4.0625rem, 3.125rem + 4vw, 8.125rem);
/*              65px        50px + 4vw    130px */

/* Formula breakdown:
   MIN: 4.0625rem (65px) - Minimum size at smallest viewport
   PREFERRED: 3.125rem + 4vw - Fluid calculation
   MAX: 8.125rem (130px) - Maximum size at largest viewport
*/
```

**Tailwind Fluid Typography Plugin Pattern:**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
        // Using ~ prefix for fluid typography
        '~h1/h1Smaller': 'clamp(4.0625rem, 3.125rem + 4vw, 8.125rem)',
        '~h2/mobileH2': 'clamp(2.125rem, 1.875rem + 1.5vw, 3.875rem)',
      }
    }
  }
}

// Usage in HTML
<h1 class="~text-h1/h1Smaller">Heading</h1>
```

**Complete Typography Clamp Values:**

```css
/* Headings */
--text-h1: clamp(4.0625rem, 3.125rem + 4vw, 8.125rem);
--text-h1-lh: clamp(3.90625rem, 3rem + 3.8vw, 7.8125rem);
--text-h2: clamp(2.125rem, 1.875rem + 1.5vw, 3.875rem);
--text-h2-lh: clamp(2.25rem, 2rem + 1.5vw, 4.0625rem);
--text-h3: clamp(1.75rem, 1.5rem + 1vw, 2.75rem);

/* Body */
--text-text1: clamp(1.125rem, 1rem + 0.5vw, 1.375rem);
--text-text2: clamp(0.9375rem, 0.875rem + 0.25vw, 1.0625rem);
```

### 3.2 Backdrop Blur Effects

**Navigation Backdrop:**

```css
.nav-backdrop {
  background: rgba(5, 32, 31, 0.8); /* blackGreen at 80% */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); /* Safari support */
}
```

**Cursor Backdrop:**

```css
.mf-cursor-inner {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(226, 255, 194, 0.2); /* Semi-transparent brightGreen */
}

/* Text hover state - less blur */
.mf-cursor.-text .mf-cursor-inner {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
```

**Browser Support:**
- Modern browsers: Full support
- Safari: Requires `-webkit-` prefix
- Fallback: Solid background color for unsupported browsers

### 3.3 Noise/Grain Texture Overlay

**SVG Noise Implementation:**

```html
<!-- Add to HTML (hidden) -->
<svg style="position: absolute; width: 0; height: 0;">
  <defs>
    <filter id="noiseFilter">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.80"
        numOctaves="4"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>
</svg>
```

**CSS Application:**

```css
.image-noise {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  mix-blend-mode: darken;
  pointer-events: none;
  background-image: url('data:image/svg+xml,...'); /* Inline SVG */
  /* OR */
  filter: url(#noiseFilter);
}

/* Variations */
.image-noise-subtle {
  opacity: 0.3;
}

.image-noise-strong {
  opacity: 0.7;
}
```

**Alternative PNG Approach:**

```css
.image-noise {
  background-image: url('/noise-texture.png');
  background-repeat: repeat;
  opacity: 0.5;
  mix-blend-mode: darken;
}
```

**Animated Grain Effect (Optional):**

```css
@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -10%); }
  20% { transform: translate(-15%, 5%); }
  30% { transform: translate(7%, -25%); }
  40% { transform: translate(-5%, 25%); }
  50% { transform: translate(-15%, 10%); }
  60% { transform: translate(15%, 0%); }
  70% { transform: translate(0%, 15%); }
  80% { transform: translate(3%, 35%); }
  90% { transform: translate(-10%, 10%); }
}

.image-noise-animated {
  animation: grain 8s steps(10) infinite;
}
```

### 3.4 Gradient Overlays

**Standard Gradient Pattern:**

```css
/* Top to bottom gradient */
.gradient-overlay {
  background: linear-gradient(
    to bottom,
    rgba(5, 32, 31, 1),      /* blackGreen 100% */
    rgba(0, 54, 53, 0.8)     /* matteGreen 80% */
  );
}

/* Bottom to top (for footer sections) */
.gradient-overlay-reverse {
  background: linear-gradient(
    to top,
    rgba(5, 32, 31, 1),
    rgba(0, 54, 53, 0)
  );
}
```

**Tailwind Classes:**

```html
<!-- Gradient backgrounds -->
<div class="bg-gradient-to-b from-blackGreen to-matteGreen"></div>
<div class="bg-gradient-to-t from-blackGreen/80 to-transparent"></div>

<!-- With opacity variants -->
<div class="bg-gradient-to-b from-blackGreen/100 to-matteGreen/80"></div>
```

**Multi-Stop Gradients:**

```css
.complex-gradient {
  background: linear-gradient(
    180deg,
    rgba(5, 32, 31, 1) 0%,
    rgba(0, 54, 53, 0.8) 50%,
    rgba(5, 32, 31, 0.6) 100%
  );
}
```

### 3.5 Mix Blend Modes

**Noise Overlay Blending:**

```css
.image-noise {
  mix-blend-mode: darken;
  /* Darkens the underlying image with noise pattern */
}
```

**Available Blend Modes Used:**
- `darken` - For noise textures
- `normal` - For standard overlays (cursor)
- Consider: `multiply`, `overlay`, `soft-light` for variations

**Browser Support:**
- Full modern browser support
- Graceful degradation: appears as normal overlay

### 3.6 Image Optimization Patterns

**Responsive Images:**

```html
<img
  src="image-800w.jpg"
  srcset="
    image-400w.jpg 400w,
    image-800w.jpg 800w,
    image-1200w.jpg 1200w,
    image-1600w.jpg 1600w
  "
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
  alt="Description"
  loading="lazy"
  class="w-full h-full object-cover"
/>
```

**Aspect Ratio Containers:**

```css
/* Using Tailwind */
.image-container {
  aspect-ratio: 1.07 / 1;
  overflow: hidden;
}

/* Manual fallback */
.image-container-fallback {
  position: relative;
  padding-bottom: 93.46%; /* (1 / 1.07) * 100 */
}

.image-container-fallback img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

## 4. INTERACTION PATTERNS

### 4.1 Scroll Behavior

**Smooth Scroll Implementation:**

```css
html {
  scroll-behavior: smooth;
}

/* For more control, use JavaScript */
```

```javascript
// Smooth scroll to anchor
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});
```

**Scroll-Triggered Animations (Optional):**

```javascript
// Intersection Observer for fade-in on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-on-scroll').forEach(el => {
  observer.observe(el);
});
```

### 4.2 Hover Interactions

**Link Hover Pattern:**

```css
.nav-link {
  color: white;
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover {
  color: #e2ffc2; /* brightGreen */
}
```

**Image Hover Zoom:**

```css
.image-card {
  overflow: hidden;
}

.image-card img {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.image-card:hover img {
  transform: scale(1.05);
}
```

**Button Hover:**

```css
.btn-primary {
  background: #e2ffc2;
  color: #003635;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  background: white;
  transform: scale(1.01);
}
```

### 4.3 Cursor State Triggers

**Element-Specific Cursor States:**

```javascript
// Pointer state for clickable elements
document.querySelectorAll('a, button, [role="button"]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.querySelector('.mf-cursor').classList.add('-pointer');
  });
  el.addEventListener('mouseleave', () => {
    document.querySelector('.mf-cursor').classList.remove('-pointer');
  });
});

// Text state for text content
document.querySelectorAll('p, h1, h2, h3, h4, h5, h6').forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.querySelector('.mf-cursor').classList.add('-text');
  });
  el.addEventListener('mouseleave', () => {
    document.querySelector('.mf-cursor').classList.remove('-text');
  });
});

// Icon state for SVG icons
document.querySelectorAll('svg, .icon').forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.querySelector('.mf-cursor').classList.add('-icon');
  });
  el.addEventListener('mouseleave', () => {
    document.querySelector('.mf-cursor').classList.remove('-icon');
  });
});

// Active state on click
document.addEventListener('mousedown', () => {
  document.querySelector('.mf-cursor').classList.add('-active');
});
document.addEventListener('mouseup', () => {
  document.querySelector('.mf-cursor').classList.remove('-active');
});
```

### 4.4 Mobile Adaptations

**Hide Custom Cursor on Touch Devices:**

```javascript
// Detect touch device
const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
};

// Hide cursor on touch devices
if (isTouchDevice()) {
  document.querySelector('.mf-cursor')?.remove();
  document.body.style.cursor = 'auto';
}
```

**Mobile Menu Toggle:**

```javascript
const mobileMenuButton = document.querySelector('[data-mobile-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

mobileMenuButton.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('translate-x-0');
  mobileMenu.classList.toggle('translate-x-full');

  // Update ARIA
  mobileMenuButton.setAttribute('aria-expanded', isOpen);

  // Prevent body scroll when menu open
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
```

**Responsive Grid Adjustments:**

```css
/* Mobile: Single column */
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

/* Tablet: Two columns */
@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: Three columns */
@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Large desktop: Four columns */
@media (min-width: 1280px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## 5. TECHNICAL STACK DETECTION

### 5.1 Framework Analysis

**Identified Technologies:**

1. **Styling Framework:** Tailwind CSS v3.4.17 (Confirmed)
   - Extensive utility classes
   - Custom configuration
   - Fluid typography system

2. **Likely JavaScript Framework:** Next.js or similar modern React framework
   - Evidence:
     - Sophisticated build output
     - Server-side rendering patterns
     - Modern bundling approach
   - Alternative possibilities: Astro, Vite + React

3. **Font Loading:** Self-hosted with @font-face
   - Figtree (woff2 format)
   - Playfair Display (woff2 format)
   - Google Fonts as alternative source

4. **Animation Library:** Likely vanilla JavaScript or lightweight library
   - No GSAP or Framer Motion detected in CSS
   - Custom cursor suggests vanilla JS or small utility

### 5.2 Build Tools

**Detected Indicators:**

```javascript
// Likely stack:
{
  "bundler": "Webpack 5 or Vite",
  "css": "Tailwind CSS 3.4.17 with PostCSS",
  "framework": "Next.js 14+ (suspected)",
  "package-manager": "npm or pnpm",
  "deployment": "Vercel or similar edge platform"
}
```

**Build Configuration Hints:**

```javascript
// postcss.config.js (likely)
module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-import': {},
    'postcss-nested': {},
  }
}
```

### 5.3 Performance Optimizations

**Identified Patterns:**

1. **Font Loading Strategy:**
   - Self-hosted fonts for performance
   - WOFF2 format (best compression)
   - `font-display: swap` for FOIT prevention

2. **Image Optimization:**
   - Lazy loading (`loading="lazy"`)
   - Aspect ratio boxes prevent layout shift
   - Object-fit for proper scaling

3. **CSS Optimization:**
   - Tailwind purges unused CSS
   - Minified output
   - Critical CSS likely inlined

4. **JavaScript:**
   - Likely code splitting by route
   - Deferred non-critical scripts
   - Modern ES modules

---

## 6. IMPLEMENTATION ROADMAP

### Phase 1: Foundation Setup (Days 1-2)

**1.1 Project Initialization:**

```bash
# Create Next.js project with Tailwind
npx create-next-app@latest bartosz-kolenda-clone
cd bartosz-kolenda-clone

# Select options:
# - TypeScript: Yes
# - ESLint: Yes
# - Tailwind CSS: Yes
# - src/ directory: Yes
# - App Router: Yes
# - Import alias: @/*
```

**1.2 Tailwind Configuration:**

Create `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blackGreen: '#05201f',
        matteGreen: '#003635',
        brightGreen: '#e2ffc2',
        creme: '#c5d2b7',
        lightGreen: '#f5f6f4',
      },
      fontFamily: {
        sans: ['Figtree', 'ui-sans-serif', 'system-ui'],
        serif: ['Playfair Display', 'serif'],
      },
      fontSize: {
        h1: ['clamp(4.0625rem, 3.125rem + 4vw, 8.125rem)', {
          lineHeight: 'clamp(3.90625rem, 3rem + 3.8vw, 7.8125rem)',
          letterSpacing: '-0.04em',
        }],
        h2: ['3.875rem', {
          lineHeight: '4.0625rem',
          letterSpacing: '-0.04em',
        }],
        mobileH2: ['2.125rem', {
          lineHeight: '2.25rem',
          letterSpacing: '-0.04em',
        }],
        h3: ['2.75rem', {
          lineHeight: '2.875rem',
          letterSpacing: '-0.04em',
        }],
        text1: ['1.375rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.02em',
        }],
        text2: ['1.0625rem', {
          lineHeight: '1.5rem',
          letterSpacing: '-0.02em',
        }],
        text3: ['0.9375rem', {
          lineHeight: '1.125rem',
          letterSpacing: '-0.02em',
        }],
      },
      spacing: {
        's8': '0.5rem',
        's16': '1rem',
        's20': '1.25rem',
        's40': '2.5rem',
        's60': '3.75rem',
        's80': '5rem',
        's100': '6.25rem',
        's140': '8.75rem',
      },
      borderRadius: {
        'fluid-sm': 'clamp(1rem, 0.5rem + 2vw, 1.875rem)',
        'fluid-md': 'clamp(1.5rem, 1rem + 2vw, 3.125rem)',
        'fluid-lg': 'clamp(1.875rem, 1.25rem + 2.5vw, 3.125rem)',
      },
      screens: {
        'sm': '40rem',
        'md': '48rem',
        'lg': '64rem',
        'xl': '80rem',
        '3xl': '110rem',
        '5xl': '120.0625rem',
      },
      zIndex: {
        '3': '3',
        '4': '4',
        '99': '99',
        '100': '100',
        '101': '101',
        '102': '102',
        '103': '103',
        '105': '105',
        '110': '110',
        '250': '250',
      },
    },
  },
  plugins: [],
}

export default config
```

**1.3 Font Setup:**

Download fonts and place in `public/fonts/`:
- Figtree (weights 300-800)
- Playfair Display (italic variants)

Create `src/app/fonts.ts`:

```typescript
import localFont from 'next/font/local'

export const figtree = localFont({
  src: [
    {
      path: '../../public/fonts/Figtree-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Figtree-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Figtree-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Figtree-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Figtree-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Figtree-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-figtree',
  display: 'swap',
})

export const playfair = localFont({
  src: [
    {
      path: '../../public/fonts/PlayfairDisplay-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/PlayfairDisplay-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-playfair',
  display: 'swap',
})
```

**1.4 Global Styles:**

Update `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-blackGreen text-white font-sans;
  }

  /* Hide default cursor */
  * {
    cursor: none !important;
  }

  /* Show default cursor on touch devices */
  @media (pointer: coarse) {
    * {
      cursor: auto !important;
    }
  }
}

@layer utilities {
  /* Fluid typography helper */
  .text-fluid-h1 {
    font-size: clamp(4.0625rem, 3.125rem + 4vw, 8.125rem);
    line-height: clamp(3.90625rem, 3rem + 3.8vw, 7.8125rem);
    letter-spacing: -0.04em;
  }

  .text-fluid-h2 {
    font-size: clamp(2.125rem, 1.875rem + 1.5vw, 3.875rem);
    line-height: clamp(2.25rem, 2rem + 1.5vw, 4.0625rem);
    letter-spacing: -0.04em;
  }
}
```

### Phase 2: Core Components (Days 3-5)

**2.1 Custom Cursor Component:**

Create `src/components/CustomCursor.tsx`:

```typescript
'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorInnerRef = useRef<HTMLDivElement>(null)
  const cursorPos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    // Check for touch device
    if ('ontouchstart' in window) {
      return // Don't render cursor on touch devices
    }

    const cursor = cursorRef.current
    if (!cursor) return

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      cursorPos.current.targetX = e.clientX
      cursorPos.current.targetY = e.clientY
    }

    // Animation loop
    const animate = () => {
      const { x, y, targetX, targetY } = cursorPos.current

      // Linear interpolation for smooth following
      cursorPos.current.x += (targetX - x) * 0.15
      cursorPos.current.y += (targetY - y) * 0.15

      cursor.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`

      requestAnimationFrame(animate)
    }

    // State change handlers
    const addPointerState = () => cursor.classList.add('-pointer')
    const removePointerState = () => cursor.classList.remove('-pointer')
    const addTextState = () => cursor.classList.add('-text')
    const removeTextState = () => cursor.classList.remove('-text')
    const addIconState = () => cursor.classList.add('-icon')
    const removeIconState = () => cursor.classList.remove('-icon')
    const addActiveState = () => cursor.classList.add('-active')
    const removeActiveState = () => cursor.classList.remove('-active')

    // Attach event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', addActiveState)
    document.addEventListener('mouseup', removeActiveState)

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', addPointerState)
      el.addEventListener('mouseleave', removePointerState)
    })

    // Add text state listeners
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span')
    textElements.forEach(el => {
      el.addEventListener('mouseenter', addTextState)
      el.addEventListener('mouseleave', removeTextState)
    })

    // Add icon state listeners
    const iconElements = document.querySelectorAll('svg, .icon')
    iconElements.forEach(el => {
      el.addEventListener('mouseenter', addIconState)
      el.addEventListener('mouseleave', removeIconState)
    })

    // Start animation
    const animationId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', addActiveState)
      document.removeEventListener('mouseup', removeActiveState)
      cancelAnimationFrame(animationId)

      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', addPointerState)
        el.removeEventListener('mouseleave', removePointerState)
      })

      textElements.forEach(el => {
        el.removeEventListener('mouseenter', addTextState)
        el.removeEventListener('mouseleave', removeTextState)
      })

      iconElements.forEach(el => {
        el.removeEventListener('mouseenter', addIconState)
        el.removeEventListener('mouseleave', removeIconState)
      })
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="mf-cursor fixed top-0 left-0 w-10 h-10 pointer-events-none z-103 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 will-change-transform hidden md:block"
    >
      <div
        ref={cursorInnerRef}
        className="mf-cursor-inner w-full h-full rounded-full bg-brightGreen/20 backdrop-blur-md transition-transform duration-300 scale-[0.22]"
      />
    </div>
  )
}
```

Add cursor styles to `globals.css`:

```css
@layer components {
  .mf-cursor.-pointer .mf-cursor-inner {
    @apply scale-[0.15] bg-brightGreen/30;
  }

  .mf-cursor.-text .mf-cursor-inner {
    @apply scale-[2.5] bg-brightGreen/10 backdrop-blur-sm;
  }

  .mf-cursor.-icon .mf-cursor-inner {
    @apply scale-[1.5] bg-brightGreen/25;
  }

  .mf-cursor.-active .mf-cursor-inner {
    @apply scale-[1.4] bg-brightGreen/40;
  }
}
```

**2.2 Navigation Component:**

Create `src/components/Navigation.tsx`:

```typescript
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
        isScrolled ? 'bg-blackGreen/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="px-5 lg:px-s80 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-text1 text-white font-semibold hover:text-brightGreen transition-colors duration-300"
          >
            Bart Kolenda
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-s40">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text2 text-white/80 hover:text-brightGreen hover:scale-[1.01] transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[4.5rem] bg-blackGreen/95 backdrop-blur-md transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-h3 text-white hover:text-brightGreen transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
```

**2.3 Noise Overlay Component:**

Create `src/components/NoiseOverlay.tsx`:

```typescript
export default function NoiseOverlay({
  opacity = 0.5,
  className = ''
}: {
  opacity?: number
  className?: string
}) {
  return (
    <>
      {/* SVG Filter Definition */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.80"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0"/>
          </filter>
        </defs>
      </svg>

      {/* Noise Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none mix-blend-darken ${className}`}
        style={{
          opacity,
          filter: 'url(#noiseFilter)',
        }}
      />
    </>
  )
}
```

**2.4 Button Component:**

Create `src/components/Button.tsx`:

```typescript
import Link from 'next/link'
import { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  className?: string
}

export default function Button({
  children,
  href,
  variant = 'primary',
  onClick,
  className = ''
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    px-5 py-4
    rounded-[clamp(1rem,0.5rem+2vw,1.875rem)]
    text-text2 font-semibold
    transition-all duration-300
    hover:scale-[1.01]
    focus:outline-none focus:ring-2 focus:ring-brightGreen focus:ring-offset-2
  `

  const variantClasses = {
    primary: 'bg-brightGreen text-matteGreen hover:bg-white',
    secondary: 'bg-transparent text-white border border-creme hover:bg-brightGreen hover:text-matteGreen hover:border-brightGreen'
  }

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  )
}
```

### Phase 3: Page Sections (Days 6-8)

**3.1 Hero Section:**

Create `src/components/sections/Hero.tsx`:

```typescript
import NoiseOverlay from '../NoiseOverlay'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blackGreen to-matteGreen" />

      {/* Noise Overlay */}
      <NoiseOverlay opacity={0.5} />

      {/* Content */}
      <div className="relative z-10 px-5 lg:px-s80 text-center">
        <h1 className="text-fluid-h1 text-white mb-s40">
          Landscape and Garden Designer
        </h1>
        <p className="text-text1 text-brightGreen max-w-[50rem] mx-auto">
          Creating beautiful outdoor spaces that bring nature and design together
        </p>
      </div>
    </section>
  )
}
```

**3.2 Content Section Template:**

Create `src/components/sections/ContentSection.tsx`:

```typescript
import { ReactNode } from 'react'

type ContentSectionProps = {
  title?: string
  description?: string
  background?: 'light' | 'dark'
  children: ReactNode
  className?: string
}

export default function ContentSection({
  title,
  description,
  background = 'light',
  children,
  className = ''
}: ContentSectionProps) {
  const bgClass = background === 'light' ? 'bg-lightGreen' : 'bg-blackGreen'
  const textClass = background === 'light' ? 'text-matteGreen' : 'text-white'

  return (
    <section className={`py-s80 lg:py-[7.5rem] px-5 lg:px-s80 ${bgClass} border-t border-creme ${className}`}>
      <div className="max-w-[90rem] mx-auto">
        {(title || description) && (
          <div className="mb-s60">
            {title && (
              <h2 className={`text-fluid-h2 ${textClass} mb-5`}>
                {title}
              </h2>
            )}
            {description && (
              <p className={`text-text2 ${textClass}/80 max-w-[40rem]`}>
                {description}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  )
}
```

**3.3 Image Card Component:**

Create `src/components/ImageCard.tsx`:

```typescript
import Image from 'next/image'
import NoiseOverlay from './NoiseOverlay'

type ImageCardProps = {
  src: string
  alt: string
  title: string
  description: string
  aspectRatio?: number
}

export default function ImageCard({
  src,
  alt,
  title,
  description,
  aspectRatio = 1.07
}: ImageCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-fluid-md bg-white">
      {/* Image Container */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <NoiseOverlay opacity={0.3} />
      </div>

      {/* Content */}
      <div className="p-5 lg:p-s40">
        <h3 className="text-h3 text-matteGreen mb-2.5">
          {title}
        </h3>
        <p className="text-text2 text-matteGreen/80">
          {description}
        </p>
      </div>
    </div>
  )
}
```

**3.4 Footer Component:**

Create `src/components/Footer.tsx`:

```typescript
import Link from 'next/link'

export default function Footer() {
  const footerSections = [
    {
      title: 'Services',
      links: [
        { label: 'Garden Design', href: '/services/garden-design' },
        { label: 'Landscape Architecture', href: '/services/landscape' },
        { label: 'Consultation', href: '/services/consultation' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Blog', href: '/blog' },
      ]
    },
    {
      title: 'Contact',
      links: [
        { label: 'Get in Touch', href: '/contact' },
        { label: 'Instagram', href: 'https://instagram.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
      ]
    },
  ]

  return (
    <footer className="bg-blackGreen border-t border-creme/30">
      <div className="px-5 lg:px-s80 py-s60 lg:py-s80">
        <div className="max-w-[90rem] mx-auto">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s40 mb-s60">
            {/* Brand */}
            <div>
              <h4 className="text-text1 text-brightGreen mb-5 font-semibold">
                Bart Kolenda
              </h4>
              <p className="text-text2 text-white/80">
                Landscape and Garden Designer
              </p>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-text1 text-brightGreen mb-5 font-semibold">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-text2 text-white/80 hover:text-brightGreen transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="pt-s40 border-t border-creme/30">
            <p className="text-text3 text-white/60 text-center">
              © 2024 Bart Kolenda. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

### Phase 4: Layout & Integration (Days 9-10)

**4.1 Root Layout:**

Update `src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { figtree, playfair } from './fonts'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'Landscape and Garden Designer | Bart Kolenda',
  description: 'Creating beautiful outdoor spaces that bring nature and design together',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${playfair.variable}`}>
      <body className={figtree.className}>
        <CustomCursor />
        <Navigation />
        <main className="pt-[4.5rem]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

**4.2 Home Page:**

Update `src/app/page.tsx`:

```typescript
import Hero from '@/components/sections/Hero'
import ContentSection from '@/components/sections/ContentSection'
import ImageCard from '@/components/ImageCard'
import Button from '@/components/Button'

export default function Home() {
  const portfolioItems = [
    {
      src: '/images/project-1.jpg',
      alt: 'Modern garden design',
      title: 'Modern Garden',
      description: 'A contemporary outdoor space blending minimalist design with natural elements'
    },
    {
      src: '/images/project-2.jpg',
      alt: 'Traditional landscape',
      title: 'Traditional Landscape',
      description: 'Classic garden design featuring perennial borders and structured pathways'
    },
    {
      src: '/images/project-3.jpg',
      alt: 'Sustainable garden',
      title: 'Sustainable Garden',
      description: 'Eco-friendly design with native plants and water conservation features'
    },
  ]

  return (
    <>
      <Hero />

      <ContentSection
        title="Featured Projects"
        description="Explore a selection of our landscape and garden design work"
        background="light"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-s40">
          {portfolioItems.map((item, index) => (
            <ImageCard key={index} {...item} />
          ))}
        </div>

        <div className="mt-s60 text-center">
          <Button href="/portfolio">
            View All Projects
          </Button>
        </div>
      </ContentSection>

      <ContentSection
        title="Design Approach"
        description="Creating outdoor spaces that harmonize with their environment"
        background="dark"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-s40">
          <div className="p-s40 bg-matteGreen rounded-fluid-md">
            <h3 className="text-h3 text-brightGreen mb-5">
              Sustainable Design
            </h3>
            <p className="text-text2 text-white/80">
              We prioritize native plants, water conservation, and eco-friendly materials in every project.
            </p>
          </div>

          <div className="p-s40 bg-matteGreen rounded-fluid-md">
            <h3 className="text-h3 text-brightGreen mb-5">
              Tailored Solutions
            </h3>
            <p className="text-text2 text-white/80">
              Each design is customized to your space, lifestyle, and vision for your outdoor environment.
            </p>
          </div>
        </div>
      </ContentSection>
    </>
  )
}
```

### Phase 5: Polish & Optimization (Days 11-12)

**5.1 Performance Optimization:**

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
```

**5.2 SEO Optimization:**

Create `src/app/metadata.ts`:

```typescript
import { Metadata } from 'next'

export const baseMetadata: Metadata = {
  metadataBase: new URL('https://bartoszkolenda.com'),
  title: {
    default: 'Landscape and Garden Designer | Bart Kolenda',
    template: '%s | Bart Kolenda'
  },
  description: 'Creating beautiful outdoor spaces that bring nature and design together. Professional landscape and garden design services.',
  keywords: ['landscape design', 'garden design', 'outdoor spaces', 'sustainable landscaping'],
  authors: [{ name: 'Bart Kolenda' }],
  creator: 'Bart Kolenda',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bartoszkolenda.com',
    siteName: 'Bart Kolenda Design',
    title: 'Landscape and Garden Designer | Bart Kolenda',
    description: 'Creating beautiful outdoor spaces that bring nature and design together',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bart Kolenda Design',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Landscape and Garden Designer | Bart Kolenda',
    description: 'Creating beautiful outdoor spaces that bring nature and design together',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

**5.3 Accessibility Improvements:**

```typescript
// Add to components as needed
aria-label="Descriptive label"
aria-expanded={isOpen}
role="button"
tabIndex={0}

// Ensure focus states
focus:outline-none focus:ring-2 focus:ring-brightGreen focus:ring-offset-2

// Keyboard navigation
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick()
  }
}}
```

---

## 7. FILE STRUCTURE

**Recommended Project Organization:**

```
bartosz-kolenda-clone/
├── public/
│   ├── fonts/
│   │   ├── Figtree-Light.woff2
│   │   ├── Figtree-Regular.woff2
│   │   ├── Figtree-Medium.woff2
│   │   ├── Figtree-SemiBold.woff2
│   │   ├── Figtree-Bold.woff2
│   │   ├── Figtree-ExtraBold.woff2
│   │   ├── PlayfairDisplay-Italic.woff2
│   │   └── PlayfairDisplay-BoldItalic.woff2
│   ├── images/
│   │   ├── hero-bg.jpg
│   │   ├── project-1.jpg
│   │   ├── project-2.jpg
│   │   └── ...
│   ├── noise-texture.png
│   └── og-image.jpg
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── fonts.ts
│   │   ├── metadata.ts
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── portfolio/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── CustomCursor.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── Button.tsx
│   │   ├── ImageCard.tsx
│   │   ├── NoiseOverlay.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── ContentSection.tsx
│   │       └── ...
│   │
│   ├── lib/
│   │   └── utils.ts
│   │
│   └── types/
│       └── index.ts
│
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 8. DEPENDENCIES

### 8.1 Core Dependencies

**package.json:**

```json
{
  "name": "bartosz-kolenda-clone",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.5",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.0.4",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.3.3"
  }
}
```

### 8.2 Font Sources

**Option 1: Google Fonts (CDN)**

```html
<!-- In app/layout.tsx or _document.tsx -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
```

**Option 2: Self-Hosted (Recommended)**

Download from:
- **Figtree:** https://fonts.google.com/specimen/Figtree
- **Playfair Display:** https://fonts.google.com/specimen/Playfair+Display

Or use Fontsource:

```bash
npm install @fontsource/figtree @fontsource/playfair-display
```

```typescript
// app/layout.tsx
import '@fontsource/figtree/300.css'
import '@fontsource/figtree/400.css'
import '@fontsource/figtree/500.css'
import '@fontsource/figtree/600.css'
import '@fontsource/figtree/700.css'
import '@fontsource/figtree/800.css'
import '@fontsource/playfair-display/400-italic.css'
import '@fontsource/playfair-display/700-italic.css'
```

### 8.3 Optional Enhancement Libraries

**For Advanced Animations (if needed):**

```bash
# GSAP for complex animations
npm install gsap

# Framer Motion for React animations
npm install framer-motion

# Intersection Observer for scroll animations
npm install react-intersection-observer
```

**For Form Handling (contact forms):**

```bash
npm install react-hook-form zod @hookform/resolvers
```

**For Analytics:**

```bash
npm install @vercel/analytics
```

---

## 9. IMPLEMENTATION CHECKLIST

### Phase 1: Foundation ✓
- [ ] Initialize Next.js project with TypeScript
- [ ] Install Tailwind CSS
- [ ] Configure Tailwind with custom theme
- [ ] Download and integrate fonts
- [ ] Set up global styles
- [ ] Create base layout structure

### Phase 2: Core Components ✓
- [ ] Build CustomCursor component
- [ ] Build Navigation component
- [ ] Build Footer component
- [ ] Build NoiseOverlay component
- [ ] Build Button component
- [ ] Test cursor states and interactions

### Phase 3: Page Sections ✓
- [ ] Create Hero section
- [ ] Create ContentSection template
- [ ] Build ImageCard component
- [ ] Create grid layouts
- [ ] Implement responsive breakpoints
- [ ] Test section spacing and rhythm

### Phase 4: Content Pages ✓
- [ ] Build home page
- [ ] Create about page
- [ ] Create portfolio page
- [ ] Create services page
- [ ] Create contact page
- [ ] Implement page transitions

### Phase 5: Polish & Testing ✓
- [ ] Add SEO metadata
- [ ] Optimize images
- [ ] Test mobile responsiveness
- [ ] Test accessibility (keyboard, screen readers)
- [ ] Test performance (Lighthouse)
- [ ] Add loading states
- [ ] Error handling
- [ ] Cross-browser testing

### Phase 6: Deployment ✓
- [ ] Set up Vercel/Netlify account
- [ ] Configure environment variables
- [ ] Deploy to staging
- [ ] QA testing
- [ ] Deploy to production
- [ ] Set up analytics
- [ ] Monitor performance

---

## 10. TECHNICAL NOTES

### 10.1 Browser Support

**Target Browsers:**
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 12+
- Chrome Mobile: Android 8+

**Critical Features:**
- CSS Grid: Full support
- Flexbox: Full support
- backdrop-filter: Requires -webkit- prefix for Safari
- clamp(): Full modern support
- aspect-ratio: Full modern support (fallback needed for older browsers)

### 10.2 Performance Targets

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Optimization Strategies:**
- Image lazy loading
- Font preloading for critical fonts
- Code splitting by route
- Minimize JavaScript bundle size
- Use Next.js Image component for automatic optimization

### 10.3 Accessibility Standards

**WCAG 2.1 Level AA Compliance:**
- Color contrast ratios: 4.5:1 for normal text, 3:1 for large text
- Keyboard navigation for all interactive elements
- Focus indicators for all focusable elements
- ARIA labels for icon buttons and complex components
- Semantic HTML throughout
- Skip to main content link

**Color Contrast Checks:**
- brightGreen (#e2ffc2) on matteGreen (#003635): ✓ Passes
- White on blackGreen (#05201f): ✓ Passes
- matteGreen on lightGreen (#f5f6f4): ✓ Passes

### 10.4 Custom Cursor Considerations

**Accessibility Concerns:**
- Hide on touch devices (implemented)
- Don't interfere with screen readers
- Maintain browser cursor for text selection
- Provide visual feedback for all interactions

**Performance:**
- Use requestAnimationFrame for smooth animation
- Transform only (no left/top for better performance)
- will-change: transform for GPU acceleration
- Cleanup event listeners on unmount

### 10.5 Responsive Design Strategy

**Breakpoint Strategy:**
- Mobile first approach
- Test at: 375px, 768px, 1024px, 1440px, 1920px
- Fluid typography scales automatically
- Grid columns adjust: 1 → 2 → 3 → 4
- Padding scales proportionally

**Testing Devices:**
- iPhone SE (375px)
- iPhone 12/13/14 (390px)
- iPad (768px)
- iPad Pro (1024px)
- Desktop (1440px+)

---

## 11. ADDITIONAL RESOURCES

### 11.1 Design References

**Typography Resources:**
- Google Fonts: https://fonts.google.com
- Fontsource: https://fontsource.org
- Type Scale Calculator: https://typescale.com

**Color Tools:**
- Contrast Checker: https://webaim.org/resources/contrastchecker/
- Color Palette Generator: https://coolors.co

**CSS Techniques:**
- Fluid Typography: https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/
- Grainy Gradients: https://css-tricks.com/grainy-gradients/
- Custom Cursors: https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/

### 11.2 Code Quality

**ESLint Configuration:**

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "@typescript-eslint/no-unused-vars": "warn"
  }
}
```

**TypeScript Configuration:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 12. SUMMARY

This technical specification provides a complete blueprint for replicating the Bartosz Kolenda website design and functionality. The implementation uses modern web technologies with a focus on performance, accessibility, and maintainability.

**Key Characteristics:**
- **Design System:** Comprehensive color, typography, and spacing tokens
- **Responsive:** Fluid typography and layouts that scale seamlessly
- **Interactive:** Custom cursor with multiple states
- **Visual Depth:** Noise overlays and backdrop blur effects
- **Performance:** Optimized images, fonts, and code splitting
- **Accessible:** WCAG 2.1 AA compliant with keyboard navigation

**Technology Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS 3.4.17
- Self-hosted fonts (Figtree + Playfair Display)
- Vanilla JavaScript for custom cursor

**Timeline:** 12 days for complete implementation following the phased roadmap.

The specification includes exact color values, typography scales, spacing systems, component code, and implementation patterns needed for pixel-perfect replication.

---

**Document Version:** 1.0
**Last Updated:** 2025-11-23
**Research Completed By:** Technical Researcher Agent
