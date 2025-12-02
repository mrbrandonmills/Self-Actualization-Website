# Ghost Fade UX — Performance Metrics & Benchmarks
**Project:** Self-Actualization Website
**Purpose:** Define measurable performance targets for each technical layer

---

## Overall Performance Targets (All Layers Combined)

### Desktop (M1 MacBook Pro or equivalent)

| Metric | Target | Minimum | Ideal |
|--------|--------|---------|-------|
| **Frame Rate** | 60 FPS | 55 FPS | 60 FPS |
| **Load Time (4G)** | <3s | <5s | <2s |
| **Load Time (WiFi)** | <1.5s | <3s | <1s |
| **Bundle Size** | <500KB | <750KB | <350KB |
| **First Contentful Paint (FCP)** | <1.2s | <2s | <0.8s |
| **Largest Contentful Paint (LCP)** | <2.5s | <4s | <1.5s |
| **Cumulative Layout Shift (CLS)** | <0.1 | <0.25 | 0 |
| **Time to Interactive (TTI)** | <3.5s | <5s | <2.5s |

### Mobile (iPhone 12 or equivalent)

| Metric | Target | Minimum | Ideal |
|--------|--------|---------|-------|
| **Frame Rate** | 45 FPS | 40 FPS | 55 FPS |
| **Load Time (4G)** | <4s | <6s | <3s |
| **Load Time (WiFi)** | <2s | <3.5s | <1.5s |
| **Bundle Size** | <350KB | <500KB | <250KB |
| **First Contentful Paint (FCP)** | <1.5s | <2.5s | <1s |
| **Largest Contentful Paint (LCP)** | <3s | <5s | <2s |
| **Cumulative Layout Shift (CLS)** | <0.1 | <0.25 | 0 |
| **Time to Interactive (TTI)** | <4s | <6s | <3s |

---

## Layer 1: GSAP Baseline

### Technical Specifications

**Technologies:**
- GSAP + ScrollTrigger
- CSS 3D Transforms (`preserve-3d`, `perspective`)
- Lenis Smooth Scroll

**What gets measured:**
- Scroll smoothness (frame drops during scroll)
- Animation timing accuracy
- Memory usage (DOM nodes, GSAP instances)
- JavaScript execution time

### Performance Targets

#### Desktop

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Frame Rate** | 60 FPS | Chrome DevTools Performance tab |
| **Scroll Jank** | 0 dropped frames | ScrollTrigger markers + profiling |
| **JavaScript Heap** | <50MB | Chrome DevTools Memory tab |
| **Main Thread Blocking** | <50ms tasks | Long Task API |
| **Bundle Size (GSAP)** | ~50KB gzipped | webpack-bundle-analyzer |

#### Mobile

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Frame Rate** | 56 FPS | Remote debugging (Chrome DevTools) |
| **Scroll Jank** | <5 dropped frames | Visual inspection + profiling |
| **JavaScript Heap** | <30MB | Remote debugging |
| **Main Thread Blocking** | <100ms tasks | Long Task API |

### Test Scenarios

**Scenario 1: Single Page Scroll**
- User scrolls from top to bottom (full page height: 2000vh)
- All 15 book pages animate (depth, rotation, scale, opacity)
- Expected: 60 FPS throughout, no jank

**Scenario 2: Rapid Scroll (Mouse Wheel)**
- User rapidly scrolls back and forth
- GSAP scrub should keep up without lag
- Expected: Smooth animation, no tearing

**Scenario 3: Touch Scroll (Mobile)**
- User swipes with momentum
- Lenis smooth scroll integrates with ScrollTrigger
- Expected: 55+ FPS, natural momentum feel

### Success Criteria

✅ **Pass:** 60 FPS on desktop, 55+ FPS on mobile, zero console errors
⚠️ **Warning:** 55-59 FPS desktop, 50-54 FPS mobile, minor warnings
❌ **Fail:** <55 FPS desktop, <50 FPS mobile, or crashes

---

## Layer 2: View Transitions API

### Technical Specifications

**Technologies:**
- View Transitions API (`document.startViewTransition`)
- CSS Scroll-Driven Animations
- Feature detection + Safari fallback

**What gets measured:**
- Transition smoothness (no flash of unstyled content)
- Layout shift during transitions
- Feature detection accuracy
- Fallback behavior quality

### Performance Targets

#### Desktop

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Transition Duration** | 0.6s | CSS animation-duration |
| **Frame Rate (during transition)** | 60 FPS | Chrome DevTools Performance |
| **Layout Shift (CLS)** | 0 | Lighthouse + manual testing |
| **JavaScript Execution** | <10ms | Performance API |

#### Mobile

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Transition Duration** | 0.6s | CSS animation-duration |
| **Frame Rate (during transition)** | 53 FPS | Remote debugging |
| **Layout Shift (CLS)** | 0 | Lighthouse + manual testing |
| **JavaScript Execution** | <15ms | Performance API |

### Test Scenarios

**Scenario 1: Page Navigation Transition**
- User clicks on a book page in the background
- View Transition zooms page from small to full size
- Expected: Smooth morph, no flicker

**Scenario 2: Scroll-Driven Transition Progress**
- User scrolls, transition progress mapped to scroll position
- Chrome/Firefox: Smooth animation
- Safari: Instant transition (fallback)
- Expected: No layout shifts, graceful degradation

**Scenario 3: Rapid Navigation**
- User rapidly clicks between pages
- View Transitions queue correctly
- Expected: No overlapping transitions, clean state management

### Browser Compatibility Tests

| Browser | Version | Expected Behavior | Test Result |
|---------|---------|-------------------|-------------|
| **Chrome** | 140+ | Full View Transitions support | ⏳ Pending |
| **Firefox** | 144+ | Full View Transitions support | ⏳ Pending |
| **Safari** | 16+ | Fallback (instant transitions) | ⏳ Pending |
| **Edge** | 120+ | Full View Transitions support | ⏳ Pending |
| **Mobile Safari** | 16+ | Fallback (instant transitions) | ⏳ Pending |

### Success Criteria

✅ **Pass:** Smooth transitions in Chrome/Firefox, graceful fallback in Safari, zero CLS
⚠️ **Warning:** Minor layout shifts (<0.1 CLS), 55+ FPS
❌ **Fail:** Layout shifts (>0.1 CLS), flicker, or crashes

---

## Layer 3A: WebGPU Particle System

### Technical Specifications

**Technologies:**
- Three.js WebGPURenderer
- TSL (Three Shading Language) compute shaders
- Curl noise force field
- WebGL fallback

**What gets measured:**
- Particle count at 60 FPS
- GPU memory usage
- Compute shader execution time
- Fallback quality (WebGL vs WebGPU)

### Performance Targets

#### Desktop (WebGPU)

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Particle Count** | 100,000 | Three.js inspector |
| **Frame Rate** | 60 FPS | Chrome DevTools Performance |
| **GPU Memory** | <200MB | Three.js `renderer.info` |
| **Compute Shader Time** | <5ms per frame | GPU profiling |
| **Bundle Size (Three.js)** | ~150KB gzipped | webpack-bundle-analyzer |

#### Desktop (WebGL Fallback)

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Particle Count** | 25,000 | Three.js inspector |
| **Frame Rate** | 55 FPS | Chrome DevTools Performance |
| **GPU Memory** | <100MB | Three.js `renderer.info` |

#### Mobile (WebGL)

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Particle Count** | 10,000 | Three.js inspector |
| **Frame Rate** | 45 FPS | Remote debugging |
| **GPU Memory** | <50MB | Three.js `renderer.info` |
| **Battery Impact** | <5% per minute | Manual testing |

### Test Scenarios

**Scenario 1: Static Particle Field**
- 100,000 particles (desktop) or 10,000 (mobile)
- No scroll interaction, just curl noise animation
- Expected: 60 FPS desktop, 45+ FPS mobile

**Scenario 2: Scroll-Reactive Motion**
- Particles respond to scroll velocity
- Density increases around pages further back
- Expected: Smooth particle motion, no stuttering

**Scenario 3: WebGPU Feature Detection**
- Test on browser without WebGPU support
- Fallback to WebGL with 25k particles
- Expected: Graceful degradation, no crashes

### GPU Compatibility Tests

| Device | GPU | Expected Particle Count | Test Result |
|--------|-----|------------------------|-------------|
| **M1 MacBook** | Apple M1 | 100,000 (WebGPU) | ⏳ Pending |
| **Windows Laptop** | NVIDIA RTX 3060 | 100,000 (WebGPU) | ⏳ Pending |
| **Windows Laptop** | Intel Integrated | 25,000 (WebGL) | ⏳ Pending |
| **iPhone 14** | A15 Bionic | 10,000 (WebGL) | ⏳ Pending |
| **Android** | Snapdragon 8 Gen 2 | 10,000 (WebGL) | ⏳ Pending |

### Success Criteria

✅ **Pass:** 60 FPS desktop (100k particles), 45+ FPS mobile (10k particles), graceful fallback
⚠️ **Warning:** 55+ FPS desktop, 40+ FPS mobile, minor particle reduction needed
❌ **Fail:** <50 FPS desktop, <35 FPS mobile, crashes, or black screen

---

## Layer 3B: Ray Marching SDF (Experimental)

### Performance Targets

**Note:** This layer is experimental only (not v1 production)

#### Desktop

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Frame Rate** | 52 FPS | Chrome DevTools Performance |
| **Ray Marching Steps** | 64 | GLSL uniform |
| **Shader Compile Time** | <500ms | Console timing |
| **GPU Memory** | <50MB | Three.js `renderer.info` |

#### Mobile

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Frame Rate** | 35 FPS | Remote debugging |
| **Ray Marching Steps** | 32 | GLSL uniform (adaptive) |
| **Shader Compile Time** | <1s | Console timing |

### Success Criteria

⚠️ **Experimental:** 50+ FPS desktop acceptable, 30+ FPS mobile marginal
❌ **Skip:** <45 FPS desktop, <30 FPS mobile → Use Layer 3A instead

---

## Layer 4: Neural Network Scroll Prediction (Experimental)

### Performance Targets

**Note:** This layer is experimental only (not v1 production)

#### Desktop

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Inference Time** | <15ms | TensorFlow.js profiling |
| **Prediction Frequency** | 30 Hz (every 33ms) | Performance API |
| **Model Size** | <100KB | webpack-bundle-analyzer |
| **Main Thread Blocking** | 0ms (Web Worker) | Long Task API |
| **Frame Rate** | 58 FPS | Chrome DevTools Performance |

#### Mobile

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Inference Time** | <25ms | TensorFlow.js profiling |
| **Prediction Frequency** | 20 Hz (every 50ms) | Performance API |
| **Model Size** | <100KB | webpack-bundle-analyzer |
| **Frame Rate** | 48 FPS | Remote debugging |
| **Battery Impact** | <3% per minute | Manual testing |

### Success Criteria

⚠️ **Experimental:** 55+ FPS desktop acceptable, prediction accuracy >70%
❌ **Skip:** Predictions feel glitchy, accuracy <60%, or FPS drops below 50

---

## Testing Tools

### Automated Tools

1. **Lighthouse** (Google Chrome)
   - Performance score (target: >90)
   - Accessibility score (target: >95)
   - Best Practices score (target: >90)

2. **WebPageTest** (webpagetest.org)
   - Load time analysis
   - Filmstrip view (visual progress)
   - Network waterfall

3. **webpack-bundle-analyzer**
   - Bundle size breakdown
   - Identify large dependencies

4. **Three.js Inspector** (browser extension)
   - GPU memory usage
   - Draw calls
   - Texture size

### Manual Testing Checklist

- [ ] Scroll from top to bottom (smooth, no jank)
- [ ] Rapid scroll back and forth (GSAP keeps up)
- [ ] Click page transitions (no flicker, smooth morph)
- [ ] Mobile touch scroll (natural momentum, 45+ FPS)
- [ ] Safari fallback (instant transitions work)
- [ ] WebGPU fallback to WebGL (particles still render)
- [ ] Console (zero errors, zero warnings)
- [ ] Network tab (bundle size acceptable)
- [ ] Memory profiling (no leaks over 5 minutes)

---

## Benchmark Recording Template

When testing each prototype, record results here:

### Layer 1: GSAP Prototype

**Test Date:** _____________
**Device:** _____________
**Browser:** _____________

| Metric | Target | Actual | Pass/Fail |
|--------|--------|--------|-----------|
| Frame Rate (Desktop) | 60 FPS | ___ FPS | ⏳ |
| Frame Rate (Mobile) | 56 FPS | ___ FPS | ⏳ |
| Bundle Size | <50KB | ___ KB | ⏳ |
| JavaScript Heap | <50MB | ___ MB | ⏳ |

**Notes:** _____________________________________________

### Layer 2: View Transitions Prototype

**Test Date:** _____________
**Device:** _____________
**Browser:** _____________

| Metric | Target | Actual | Pass/Fail |
|--------|--------|--------|-----------|
| Transition Smoothness | 60 FPS | ___ FPS | ⏳ |
| Layout Shift (CLS) | 0 | ___ | ⏳ |
| Safari Fallback | Works | ___ | ⏳ |

**Notes:** _____________________________________________

### Layer 3A: WebGPU Particles Prototype

**Test Date:** _____________
**Device:** _____________
**Browser:** _____________

| Metric | Target | Actual | Pass/Fail |
|--------|--------|--------|-----------|
| Particle Count | 100,000 (desktop) | ___ | ⏳ |
| Frame Rate | 60 FPS | ___ FPS | ⏳ |
| GPU Memory | <200MB | ___ MB | ⏳ |
| WebGL Fallback | Works | ___ | ⏳ |

**Notes:** _____________________________________________

---

## Continuous Monitoring (Post-Launch)

Once deployed to production, monitor:

- **Real User Monitoring (RUM):** Actual user FPS, load times
- **Error tracking:** Sentry or similar (catch crashes in the wild)
- **Analytics:** Scroll depth, time on page, interaction rate
- **A/B testing:** Ghost Fade vs standard scroll (conversion impact)

**Target metrics (production):**
- 95th percentile load time <5s
- 95th percentile FPS >50
- Error rate <0.1%
- User satisfaction (qualitative feedback)

---

**Last Updated:** January 25, 2025
**Next Review:** After each prototype is tested
