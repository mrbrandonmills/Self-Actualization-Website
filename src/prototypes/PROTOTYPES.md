# Website Prototype Reference
## Personal Publishing Site — Design System & Feature Specifications

> **Purpose:** This document consolidates design patterns, interaction models, and visual systems extracted from 10 award-winning websites. Use this as the authoritative reference for AI-assisted development.

**Related:** For technical R&D prototypes (Ghost Fade UX mechanics), see `/experiments/`

### Distinction
- **`/src/prototypes/`** (this directory) = Design system reference (visual patterns, color palette, module concepts)
- **`/experiments/`** = Technical R&D spikes (GSAP, View Transitions, WebGPU - working code)

---

## Table of Contents
1. [Design Principles](#design-principles)
2. [Color System](#color-system)
3. [Core Feature Modules](#core-feature-modules)
4. [Technical Architecture](#technical-architecture)
5. [Page-Specific Applications](#page-specific-applications)
6. [Source References](#source-references)
7. [Implementation Priority](#implementation-priority)

---

## Design Principles

### Guiding Philosophy
```
COMPLEXITY → SIMPLICITY
Through visual organization, transitions do the cognitive work.
The site should think FOR the user, not make them think.
```

### Core Tenets
| Principle | Description | Source |
|-----------|-------------|--------|
| **Progressive Disclosure** | Reveal information through scroll, not all at once | Nauta, Glyphic |
| **Motion = Meaning** | Every animation explains a relationship | Monolith, Kasane |
| **Breathing Room** | Generous white space creates focus | Mockupper, House of Corto |
| **Editorial Reverence** | Treat written content like artifacts, not filler | Obys Library |
| **Brand Continuity** | Recurring visual elements thread the experience | Telemetry |

---

## Color System

### Primary Palette: "Literary Organic"
Derived from House of Corto & Bartosz Kolenda

```css
:root {
  /* Backgrounds */
  --bg-primary: #F2EDE6;      /* Warm cream / ivory — evokes book pages */
  --bg-secondary: #FFFFFF;     /* Pure white — for contrast sections */
  
  /* Primary Accent: Olive Family */
  --olive-dark: #3D4A23;       /* Deep forest — primary buttons, headers */
  --olive-mid: #6B7B4C;        /* Muted sage — secondary elements */
  --olive-light: #8A9A6A;      /* Light moss — hover states, highlights */
  
  /* Text */
  --text-primary: #2A2A2A;     /* Near-black — body copy */
  --text-secondary: #3D4A23;   /* Olive-tinted — subheadings */
  --text-muted: #6B7B4C;       /* Sage — captions, metadata */
  
  /* Functional */
  --accent-warm: #C4A35A;      /* Gold/amber — CTAs, highlights */
  --accent-pop: #E85D04;       /* Burnt orange — alerts, key actions */
  --error: #9B2C2C;
  --success: #3D4A23;
}
```

### Palette Application Rules
```
BACKGROUND    → --bg-primary (default), --bg-secondary (alternating sections)
TYPOGRAPHY    → --text-primary (body), --olive-dark (headings)
INTERACTIVE   → --olive-dark (default), --olive-mid (hover), --accent-warm (CTA)
IMAGERY       → Should contain warm tones that complement cream/olive
```

### Color Ratios
- **60%** — Background cream/white
- **30%** — Olive greens (UI, typography)
- **10%** — Warm accents (gold, orange for key moments)

---

## Core Feature Modules

### MODULE 1: 3D Scroll-Driven Hero
**Sources:** Kasane Keyboard, The Monolith Project

#### Concept
A 3D book model that responds to scroll position:
1. **Initial State:** Book resting on surface (wood texture, slight rotation)
2. **Scroll 0-30%:** Book lifts, begins to rotate toward viewer
3. **Scroll 30-60%:** Book "explodes" — cover separates, pages fan out, spine breaks apart
4. **Scroll 60-90%:** Pieces fly toward camera, orbit around viewport
5. **Scroll 90-100%:** Pieces reassemble into complete book, now facing forward

#### Technical Requirements
```yaml
framework: React / Next.js
3d_engine: Three.js or React Three Fiber (R3F)
animation: GSAP ScrollTrigger
model_format: glTF / GLB
performance:
  - Lazy load 3D assets
  - Use LOD (Level of Detail) for mobile
  - Preload critical textures
  - Target 60fps on mid-tier devices
```

#### Implementation Notes
```javascript
// Pseudo-structure for scroll-driven 3D
const BookHero = () => {
  const scrollProgress = useScrollProgress(); // 0 to 1
  
  return (
    <Canvas>
      <BookModel 
        explodeProgress={mapRange(scrollProgress, 0.3, 0.6, 0, 1)}
        reassembleProgress={mapRange(scrollProgress, 0.6, 1, 0, 1)}
        rotation={scrollProgress * Math.PI * 0.5}
      />
    </Canvas>
  );
};
```

---

### MODULE 2: Cinematic Camera & Scene Transitions
**Sources:** The Monolith Project, Nauta

#### Concept
Camera movement that pulls user through 3D space, transitioning between "scenes" via portals/keyholes.

#### Transition Types
| Type | Description | Use Case |
|------|-------------|----------|
| **Keyhole/Portal** | Camera flies through aperture into new scene | Book → Book interior world |
| **Dolly Through** | Camera pushes forward through content | Section to section |
| **Orbital Reveal** | Camera rotates around object revealing new angle | Product showcase |
| **Z-Axis Fade** | Previous content recedes on Z, new content advances | Page transitions |

#### Technical Requirements
```yaml
animation_library: GSAP with ScrollTrigger
camera_controls: Custom or Three.js OrbitControls (modified)
scene_management: React state or GSAP timeline
easing: Custom cubic-bezier for cinematic feel
  - Enter: cubic-bezier(0.25, 0.1, 0.25, 1)
  - Exit: cubic-bezier(0.55, 0.055, 0.675, 0.19)
```

---

### MODULE 3: Horizontal Scroll Sections
**Source:** Telemetry.io

#### Concept
Sections that scroll horizontally while vertical scroll continues, creating lateral content exploration.

#### Implementation Pattern
```javascript
// GSAP horizontal scroll section
gsap.to(".horizontal-container", {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-wrapper",
    pin: true,
    scrub: 1,
    end: () => "+=" + document.querySelector(".horizontal-container").offsetWidth
  }
});
```

#### Use Cases
- Book genre browsing (scroll through shelves)
- Timeline/process visualization
- Gallery showcases

---

### MODULE 4: Recurring Brand Element (Mascot/Object)
**Source:** Telemetry.io

#### Concept
A consistent visual element (book, character, icon) that reappears throughout the scroll journey, creating continuity and brand personality.

#### Implementation
```yaml
element: 3D book model or 2D illustrated book character
appearances:
  - Hero section (full size, interactive)
  - Section transitions (flies across, small scale)
  - CTA sections (reappears to "guide" user)
  - Footer (resting state, waves goodbye)
behavior:
  - Responds to scroll position
  - Has idle animations when in view
  - Subtle parallax offset from scroll
```

---

### MODULE 5: Editorial Content Presentation
**Source:** Obys Library

#### Concept
Treat essays, blogs, and written content as curated artifacts—not just text on a page.

#### Design Patterns

**Pull Quotes as Heroes**
```html
<blockquote class="pull-quote">
  <p>"The best stories don't just tell—they transform."</p>
  <cite>— Book Title, Chapter 3</cite>
</blockquote>
```
```css
.pull-quote {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 300;
  line-height: 1.2;
  color: var(--olive-dark);
  margin: 4rem 0;
  padding-left: 2rem;
  border-left: 4px solid var(--olive-mid);
}
```

**Numbered Sections**
```
Essays:(3)
Featured Authors:(6)
Recent Posts:(12)
```
Creates scannable hierarchy without heavy headings.

**Author Spotlights**
- Circular avatar
- Name + role
- Brief bio or quote
- Link to author page

---

### MODULE 6: Complex Information Architecture
**Sources:** Nauta, Glyphic Bio

#### Concept
Transform complex processes/ecosystems into visually-guided journeys where transitions explain relationships.

#### Techniques
| Technique | Implementation |
|-----------|----------------|
| **Chunking** | Max 3-5 concepts per scroll section |
| **Visual Hierarchy as Narrative** | What appears first = most important |
| **Animated Connectors** | Lines/paths that draw between related items |
| **Progressive Stats** | Numbers that count up as section enters view |
| **Process Steps** | Numbered, icon-driven, single row |

#### Process Flow Pattern
```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  WRITE  │ →  │  EDIT   │ →  │ PUBLISH │ →  │  SELL   │
│   01    │    │   02    │    │   03    │    │   04    │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
```

---

### MODULE 7: Gallery Display System
**Source:** Paolo Vendramini

#### Concept
Non-standard gallery layouts that make browsing feel like discovery, not catalog shopping.

#### Layout Options
```
SCATTERED FLOAT          STAGGERED GRID           FOCUS + THUMBNAILS
┌───┐                    ┌─────┐ ┌───┐            ┌─────────────┐
│   │    ┌────┐          │     │ │   │            │             │
└───┘    │    │          │     │ └───┘            │   FEATURE   │
    ┌────┴────┐          └─────┘                  │             │
    │         │          ┌───┐ ┌─────┐            └─────────────┘
    └─────────┘          │   │ │     │            ┌──┐┌──┐┌──┐┌──┐
         ┌───┐           └───┘ └─────┘            └──┘└──┘└──┘└──┘
         │   │
         └───┘
```

#### Interaction Behaviors
- **Hover:** Image scales slightly, shadow deepens, title reveals
- **Click:** Image expands to fill viewport, content slides in
- **Scroll:** Subtle parallax on images at different rates

---

### MODULE 8: Typography & White Space System
**Source:** Mockupper.ai

#### Playful Typography Rules
```css
/* Expressive Headlines */
.headline-playful {
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.9;
}

/* Repeated emphasis */
.label-repeat {
  /* "Upload Upload Upload" pattern */
  display: flex;
  gap: 1rem;
  opacity-cascade: 1, 0.6, 0.3; /* Fading repetition */
}

/* Oversized stats */
.stat-hero {
  font-size: clamp(4rem, 15vw, 12rem);
  font-weight: 900;
  color: var(--olive-dark);
}
```

#### White Space Guidelines
```
Section padding:    min 8rem vertical
Content max-width:  65ch for body text
Image breathing:    min 2rem margin all sides
Between sections:   min 12rem (use background color change)
```

---

## Technical Architecture

### Recommended Stack
```yaml
framework: Next.js 14+ (App Router)
styling: Tailwind CSS + CSS Variables
animation: 
  - GSAP (ScrollTrigger, timeline)
  - Framer Motion (component animations)
3d: 
  - React Three Fiber
  - Drei (helpers)
  - Three.js
cms: Sanity or Contentful (for essays/blogs)
deployment: Vercel
```

### Performance Targets
```yaml
lighthouse:
  performance: 90+
  accessibility: 95+
  best_practices: 95+
  seo: 100

core_web_vitals:
  LCP: < 2.5s
  FID: < 100ms
  CLS: < 0.1
```

### File Structure
```
/src
├── /components
│   ├── /3d
│   │   ├── BookModel.tsx
│   │   ├── SceneTransition.tsx
│   │   └── ScrollCamera.tsx
│   ├── /sections
│   │   ├── HeroBook.tsx
│   │   ├── HorizontalScroll.tsx
│   │   ├── ProcessFlow.tsx
│   │   └── Gallery.tsx
│   ├── /editorial
│   │   ├── PullQuote.tsx
│   │   ├── AuthorCard.tsx
│   │   └── NumberedSection.tsx
│   └── /ui
│       ├── Button.tsx
│       ├── Typography.tsx
│       └── Container.tsx
├── /styles
│   ├── globals.css
│   ├── variables.css
│   └── animations.css
├── /lib
│   ├── gsap.ts
│   ├── scroll.ts
│   └── three-utils.ts
├── /hooks
│   ├── useScrollProgress.ts
│   ├── useInView.ts
│   └── useMediaQuery.ts
└── /prototypes
    └── PROTOTYPES.md (this file)
```

---

## Page-Specific Applications

### Homepage
```
┌────────────────────────────────────────────────────────┐
│  HERO: 3D Book explosion/reassembly (Module 1)         │
│  - Book on wood surface → explodes → reassembles       │
│  - Scroll-driven, full viewport                        │
├────────────────────────────────────────────────────────┤
│  SECTION: What We Do (Module 6)                        │
│  - Process flow: Write → Edit → Publish → Sell         │
│  - Animated connectors, numbered steps                 │
├────────────────────────────────────────────────────────┤
│  SECTION: Featured Books (Module 3 + 7)                │
│  - Horizontal scroll gallery                           │
│  - Unique card layouts, not grid                       │
├────────────────────────────────────────────────────────┤
│  SECTION: Latest Essays (Module 5)                     │
│  - Pull quote hero                                     │
│  - 3 featured posts with author cards                  │
├────────────────────────────────────────────────────────┤
│  FOOTER: Recurring book element waves goodbye (Mod 4)  │
└────────────────────────────────────────────────────────┘
```

### Book Detail Page
```
┌────────────────────────────────────────────────────────┐
│  HERO: Keyhole transition INTO the book (Module 2)     │
│  - Camera flies through book cover into "world"        │
├────────────────────────────────────────────────────────┤
│  SECTION: Book Details                                 │
│  - Large cover image (parallax)                        │
│  - Title, author, description                          │
│  - Buy CTA with --accent-warm                          │
├────────────────────────────────────────────────────────┤
│  SECTION: Excerpt / Preview                            │
│  - Editorial presentation (Module 5)                   │
│  - Pull quotes from reviews                            │
├────────────────────────────────────────────────────────┤
│  SECTION: Related Books (Module 7)                     │
│  - Scattered gallery layout                            │
└────────────────────────────────────────────────────────┘
```

### Essays/Blog Index
```
┌────────────────────────────────────────────────────────┐
│  HEADER: "Essays:(12)" numbered label                  │
├────────────────────────────────────────────────────────┤
│  FEATURED: Large pull quote from latest essay          │
├────────────────────────────────────────────────────────┤
│  GRID: Staggered editorial cards                       │
│  - Title, excerpt, author avatar, date                 │
│  - Hover: subtle lift + shadow                         │
├────────────────────────────────────────────────────────┤
│  SIDEBAR/SECTION: Featured Authors (Module 5)          │
│  - Circular avatars, names, links                      │
└────────────────────────────────────────────────────────┘
```

### Gallery/Portfolio Page
```
┌────────────────────────────────────────────────────────┐
│  LAYOUT: Paolo Vendramini-style scattered display      │
│  - Non-uniform sizing                                  │
│  - Overlapping edges                                   │
│  - Parallax on scroll                                  │
│  - Click expands to full detail                        │
└────────────────────────────────────────────────────────┘
```

---

## Source References

### Complete Site Index
| # | Site | URL | Primary Feature |
|---|------|-----|-----------------|
| 1 | Kasane Keyboard | https://kasane-keyboard.com/ | 3D scroll explosion |
| 2 | Bartosz Kolenda | https://bartoszkolenda.com/ | Color palette |
| 3 | House of Corto | https://www.houseofcorto.com/ | Color palette |
| 4 | The Monolith Project | https://themonolithproject.net/ | Cinematic camera |
| 5 | Glyphic Bio | https://www.glyphic.bio/ | Complex info simplified |
| 6 | Telemetry.io | https://telemetry.io/ | Horizontal scroll + mascot |
| 7 | Obys Library | https://library.obys.agency/ | Editorial presentation |
| 8 | Mockupper.ai | https://mockupper.ai/ | Typography + white space |
| 9 | Nauta | https://www.getnauta.com/ | Visual info architecture |
| 10 | Paolo Vendramini | https://www.paolovendramini.com/ | Gallery display |

### Agency Credits
| Site | Built By | Notable Tech |
|------|----------|--------------|
| Kasane | Unknown | Three.js, GSAP |
| Monolith | Ethan Chiu, Fabian Tjoe-A-On | Three.js, GSAP, React |
| Glyphic | Obys Agency | GSAP, WebGL |
| Telemetry | Unknown | Framer |
| Obys Library | Obys Agency | WebGL, GSAP |
| Mockupper | MONOGRID | Framer |
| Nauta | Replica Agency | GSAP, Astro |
| Paolo V. | ET Studio | GSAP, Nuxt.js |

---

## Implementation Priority

### Phase 1: Foundation
- [ ] Color system CSS variables
- [ ] Typography scale
- [ ] Base component library
- [ ] Responsive grid system

### Phase 2: Core Interactions
- [ ] GSAP ScrollTrigger setup
- [ ] Basic scroll-driven animations
- [ ] Section transitions
- [ ] Horizontal scroll sections

### Phase 3: 3D Integration
- [ ] React Three Fiber setup
- [ ] Book model (commission or create)
- [ ] Scroll-driven 3D controller
- [ ] Explosion/reassembly animation

### Phase 4: Content Systems
- [ ] Editorial component library
- [ ] Gallery layouts
- [ ] CMS integration
- [ ] Blog/essay templates

### Phase 5: Polish
- [ ] Keyhole transitions
- [ ] Recurring mascot element
- [ ] Micro-interactions
- [ ] Performance optimization

---

## AI Prompt Templates

### For 3D Development
```
Create a React Three Fiber component that renders a 3D book model.
The book should respond to a `scrollProgress` prop (0-1) where:
- 0-0.3: Book rotates slowly on Y axis
- 0.3-0.6: Book "explodes" into separate parts (cover, pages, spine)
- 0.6-1.0: Parts reassemble into complete book facing camera

Use GSAP for easing. Target 60fps. Include fallback for mobile.
```

### For Scroll Animations
```
Using GSAP ScrollTrigger, create a horizontal scroll section that:
- Pins when it enters viewport
- Scrolls horizontally through 4 cards
- Each card fades/scales in as it becomes centered
- Unpins after last card

Use scrub for smooth scroll-linked animation.
```

### For Editorial Components
```
Create a PullQuote component with:
- Large quote text (clamp sizing)
- Citation with book title
- Left border accent in olive color
- Fade-in animation when in view

Follow the color system: --olive-dark for text, --olive-mid for border.
```

---

## Notes for AI Assistants

When developing from this prototype reference:

1. **Always reference the color system** — Use CSS variables, never hardcoded colors
2. **Prioritize performance** — 3D and animations must not block main thread
3. **Progressive enhancement** — Core content works without JS, animations enhance
4. **Mobile-first** — Simplify/disable complex 3D on mobile, maintain usability
5. **Accessibility** — Respect prefers-reduced-motion, maintain focus states
6. **Consistency** — The recurring book element should feel like a character

---

*Document Version: 1.0*  
*Last Updated: November 2025*  
*Sources: 10 Awwwards-recognized websites*
