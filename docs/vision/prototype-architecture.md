# Prototype Architecture — Two-Track System
**Project:** Self-Actualization Website — Ghost Fade UX R&D
**Created:** January 25, 2025
**Purpose:** Clarify the distinction between design prototypes and technical prototypes

---

## Overview

This project uses a **two-track prototype system** to separate design concerns from technical concerns:

1. **Design System Prototypes** (`/src/prototypes/`) — Visual language, color palette, module concepts
2. **Technical R&D Prototypes** (`/experiments/`) — Working code, performance testing, Ghost Fade UX mechanics

---

## Track 1: Design System Prototypes

**Location:** `/src/prototypes/PROTOTYPES.md`

### What It Is

A comprehensive **design specification document** extracted from 10 award-winning websites (Kasane Keyboard, Bartosz Kolenda, House of Corto, The Monolith Project, etc.).

### What It Contains

**Color System:**
- Primary palette: "Literary Organic"
- Olive greens (#3D4A23, #6B7B4C, #8A9A6A)
- Cream backgrounds (#F2EDE6)
- Gold/amber accents (#C4A35A)

**Module Concepts:**
- MODULE 1: 3D Scroll-Driven Hero (book explosion/reassembly)
- MODULE 2: Cinematic Camera Transitions (keyhole/portal effects)
- MODULE 3: Horizontal Scroll Sections
- MODULE 4: Recurring Brand Element (mascot/book character)
- MODULE 5: Editorial Content Presentation (pull quotes, author cards)
- MODULE 6: Complex Information Architecture (process flows)
- MODULE 7: Gallery Display System (non-standard layouts)
- MODULE 8: Typography & White Space System

**Technical Stack:**
- Next.js 14+ (App Router)
- Tailwind CSS + CSS Variables
- GSAP + Framer Motion
- React Three Fiber + Drei
- Sanity or Contentful (CMS)

**Page Architectures:**
- Homepage layout
- Book detail page
- Essays/blog index
- Gallery/portfolio page

### What It's NOT

❌ Working code
❌ Performance-tested
❌ Ghost Fade UX mechanics
❌ Isolated spikes

### When to Use

- **Starting visual design work** (colors, typography, spacing)
- **Planning page layouts** (homepage, book detail, essays)
- **Designing component library** (buttons, cards, galleries)
- **Choosing animation libraries** (GSAP, Framer Motion)

---

## Track 2: Technical R&D Prototypes

**Location:** `/experiments/`

### What They Are

**Isolated, minimal, working code prototypes** that test specific Ghost Fade UX techniques for performance and feasibility.

### What They Contain

**Layer 1: GSAP Prototype** (`l1_gsap_prototype/`)
- Multi-State Visual Convergence (ghost fade effect)
- GSAP + ScrollTrigger + Lenis smooth scroll
- 5 book pages, 3 ghost states each
- FPS counter, performance logging
- **Status:** Ready to test

**Layer 2: View Transitions Prototype** (`l2_view_transition_prototype/`)
- View Transitions API with feature detection
- Safari fallback (instant transitions)
- CLS monitoring (layout shift detection)
- Keyboard navigation (← / →)
- **Status:** Ready to test

**Layer 3: WebGPU Particles Prototype** (`l3_particles_prototype/`)
- Three.js particle system (50k particles)
- Scroll-reactive motion
- WebGL fallback (production-ready)
- Auto-rotate toggle (Space key)
- **Status:** Ready to test

### What They're NOT

❌ Design system reference
❌ Color palette
❌ Typography system
❌ Page layouts
❌ Production-ready code

### When to Use

- **Testing performance** (FPS measurements, GPU memory usage)
- **Validating techniques** (does Ghost Fade work at 60 FPS?)
- **Browser compatibility** (Chrome, Firefox, Safari fallbacks)
- **Mobile optimization** (reduce particle count, disable blur)
- **Proof of concept** (show stakeholders the effect)

---

## How They Work Together

### Integration Workflow

```
┌─────────────────────────────────────────────────────┐
│  DESIGN SYSTEM PROTOTYPES                           │
│  /src/prototypes/PROTOTYPES.md                      │
│                                                      │
│  Defines:                                            │
│  • Color palette (olive greens, cream backgrounds)  │
│  • Typography scale (clamp sizing, line heights)    │
│  • Module concepts (3D hero, horizontal scroll)     │
│  • Page architectures (homepage, book detail)       │
└───────────────────┬─────────────────────────────────┘
                    │
                    │ Informs visual design of...
                    ▼
┌─────────────────────────────────────────────────────┐
│  TECHNICAL R&D PROTOTYPES                           │
│  /experiments/                                       │
│                                                      │
│  Tests:                                              │
│  • Ghost Fade UX mechanics (multi-state convergence)│
│  • GSAP scroll-driven animations (60 FPS?)          │
│  • View Transitions API (layout shift = 0?)         │
│  • WebGPU particles (50k at 60 FPS?)                │
└───────────────────┬─────────────────────────────────┘
                    │
                    │ Performance validation for...
                    ▼
┌─────────────────────────────────────────────────────┐
│  PRODUCTION CODE                                     │
│  /src/baseline-gsap/                                │
│  /src/view-transitions/                             │
│  /src/particles-webgpu/                             │
│                                                      │
│  Combines:                                           │
│  • Colors from design system                        │
│  • Ghost Fade mechanics from experiments            │
│  • Typography from design system                    │
│  • Performance targets from benchmarks              │
└─────────────────────────────────────────────────────┘
```

### Example: Building the Homepage Hero

**Step 1: Consult Design System**
- Reference: `/src/prototypes/PROTOTYPES.md` → MODULE 1: 3D Scroll-Driven Hero
- Extract: Color palette (olive greens), typography scale, spacing system

**Step 2: Test Ghost Fade Mechanics**
- Reference: `/experiments/l1_gsap_prototype/` → Multi-State Visual Convergence
- Measure: FPS (target 60), memory usage, scroll smoothness
- Validate: Does the ghost fade effect work at production quality?

**Step 3: Build Production Component**
- Location: `/src/components/HeroBook.tsx`
- Combine: Design system colors + Ghost Fade GSAP animation
- Integrate: Lenis smooth scroll, performance optimizations
- Test: Lighthouse score, Core Web Vitals

**Step 4: Record Benchmarks**
- Location: `/benchmarks/performance-metrics.md`
- Measure: Actual FPS, CLS, LCP, JavaScript heap size
- Compare: Against targets (60 FPS desktop, 45 FPS mobile)

---

## File Structure Summary

```
Self-Actualization-Website/
├── project.yaml                    ← Infrastructure config (references both)
├── docs/
│   ├── vision/
│   │   ├── 2025-ghost-fade-core-idea.md         ← Single source of truth
│   │   └── prototype-architecture.md            ← This file
│   └── plans/
│       └── claude_workflow.md
├── benchmarks/
│   └── performance-metrics.md      ← Performance targets (for experiments)
├── experiments/                    ← TECHNICAL R&D SPIKES
│   ├── README.md
│   ├── l1_gsap_prototype/          ← Working code: GSAP + Ghost Fade
│   ├── l2_view_transition_prototype/  ← Working code: View Transitions
│   └── l3_particles_prototype/     ← Working code: WebGPU particles
├── src/
│   ├── prototypes/                 ← DESIGN SYSTEM REFERENCE
│   │   └── PROTOTYPES.md           ← Colors, modules, page layouts
│   ├── baseline-gsap/              ← Future production Layer 1
│   ├── view-transitions/           ← Future production Layer 2
│   └── particles-webgpu/           ← Future production Layer 3
└── [existing Next.js app structure]
```

---

## Rules for AI Agents

### When Working on Design

**Read:** `/src/prototypes/PROTOTYPES.md`

**Use for:**
- Color palette decisions
- Typography choices
- Page layout architecture
- Module selection
- Component design

**Do NOT:**
- Use for performance testing
- Use for Ghost Fade mechanics
- Use for browser compatibility
- Assume code is production-ready

---

### When Working on Ghost Fade UX

**Read:** `/experiments/README.md` and individual prototype folders

**Use for:**
- Performance validation (FPS, memory)
- Browser compatibility testing
- Ghost Fade animation mechanics
- Technical feasibility

**Do NOT:**
- Use for color palette
- Use for typography system
- Use for page layouts
- Integrate into production before Mac mini ready

---

### When Integrating Production Code

**Read both:**
1. `/src/prototypes/PROTOTYPES.md` (design system)
2. `/experiments/[layer]/` (Ghost Fade mechanics)

**Combine:**
- Colors/typography from design system
- Animation code from experiments
- Performance targets from benchmarks

**Validate:**
- Lighthouse score (>90)
- Core Web Vitals (LCP <2.5s, CLS <0.1)
- FPS (60 desktop, 45 mobile)

---

## Decision Matrix

| If you need to... | Consult... |
|-------------------|------------|
| Choose colors | `/src/prototypes/PROTOTYPES.md` → Color System |
| Test Ghost Fade performance | `/experiments/l1_gsap_prototype/` |
| Design homepage layout | `/src/prototypes/PROTOTYPES.md` → Page-Specific Applications |
| Validate View Transitions work | `/experiments/l2_view_transition_prototype/` |
| Set typography scale | `/src/prototypes/PROTOTYPES.md` → Module 8 |
| Test particle system FPS | `/experiments/l3_particles_prototype/` |
| Plan horizontal scroll section | `/src/prototypes/PROTOTYPES.md` → Module 3 |
| Verify Safari fallback | `/experiments/l2_view_transition_prototype/` |
| Design pull quote component | `/src/prototypes/PROTOTYPES.md` → Module 5 |
| Measure JavaScript heap size | `/experiments/[layer]/script.js` (console logs) |

---

## Version History

**v1.0** (January 25, 2025)
- Initial separation of design vs technical prototypes
- Cross-references added to both directories
- project.yaml updated with both locations

---

**End of Document**

This architecture ensures clean separation of concerns while enabling seamless integration when the Mac mini infrastructure is ready.
