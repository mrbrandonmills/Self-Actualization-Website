# Ghost Fade UX — Experiments Index
**Project:** Self-Actualization Website
**Purpose:** Isolated prototype spikes for each technical layer

---

## Overview

This directory contains **isolated, minimal prototypes** for each technical layer of the Ghost Fade UX system.

**Related:** For design system, color palette, and visual modules, see `/src/prototypes/PROTOTYPES.md`

### Distinction
- **`/experiments/`** (this directory) = Technical R&D spikes (working code, performance testing)
- **`/src/prototypes/`** = Design system reference (visual patterns, color palette, module concepts)

**DO NOT** integrate these into production until:
1. Each prototype is performance-tested
2. Code is reviewed and approved
3. Mac mini infrastructure is ready

---

## Layer 1: GSAP Prototype

**Path:** `l1_gsap_prototype/`

**What it tests:**
- GSAP + ScrollTrigger scroll-driven animations
- Multi-State Visual Convergence (ghost fade effect)
- CSS 3D transforms (`preserve-3d`, `perspective`)
- Lenis smooth scroll integration

**Performance target:** 60 FPS desktop, 55 FPS mobile

**Status:** ⏳ Not started

---

## Layer 2: View Transitions Prototype

**Path:** `l2_view_transition_prototype/`

**What it tests:**
- View Transitions API (`document.startViewTransition`)
- Scroll-driven transition progress
- Safari fallback (instant transitions)
- Cross-page navigation transitions

**Performance target:** 60 FPS desktop, 53 FPS mobile

**Status:** ⏳ Not started

---

## Layer 3A: WebGPU Particles Prototype

**Path:** `l3_particles_prototype/`

**What it tests:**
- Three.js WebGPURenderer
- TSL (Three Shading Language) compute shaders
- 25,000-100,000 particle systems
- Scroll-reactive motion
- WebGL fallback

**Performance target:** 60 FPS desktop (100k particles), 45 FPS mobile (10k particles)

**Status:** ⏳ Not started

---

## Layer 3B: Ray Marching SDF Prototype (Experimental)

**Path:** `l3_raymarch_prototype/`

**What it tests:**
- Custom GLSL fragment shaders
- Ray marching algorithm
- Signed Distance Fields (SDF)
- Shape morphing (rectangle → sphere)

**Performance target:** 50-55 FPS desktop, 35-40 FPS mobile

**Status:** ⏳ Experimental only (not v1 production)

---

## Layer 4: Neural Network Scroll Prediction (Experimental)

**Path:** `l4_tfjs_lstm_spike/`

**What it tests:**
- TensorFlow.js LSTM model
- Scroll position prediction
- Real-time training on user device
- Web Workers (off-main-thread inference)

**Performance target:** 58 FPS desktop, 48 FPS mobile

**Status:** ⏳ Experimental only (not v1 production)

---

## Testing Protocol

Each prototype must include:

1. **README.md** — What the spike tests, dependencies, known issues
2. **Performance notes** — FPS measurements on different devices
3. **Browser compatibility** — Which browsers work/fail
4. **Fallback strategy** — What happens when tech is unsupported

---

## Integration Checklist (Before Production)

Before moving prototype code into `src/`, verify:

- [ ] Performance targets met (60 FPS desktop minimum)
- [ ] Works on mobile devices (45 FPS minimum)
- [ ] Browser fallbacks tested (Safari, older Chrome/Firefox)
- [ ] No console errors or warnings
- [ ] Code is modular and documented
- [ ] Bundle size acceptable (<500KB per layer)

---

**Last Updated:** January 25, 2025
