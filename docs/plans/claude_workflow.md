# Project Workflow for Claude
## Self-Actualization Website – Ghost Fade UX R&D

**Date Created:** January 24, 2025
**Last Updated:** January 25, 2025
**Project Phase:** R&D → Implementation → Award Submission
**Target:** CSS Design Awards + Awwwards (2025)

---

## Context: What Happened Before This Workflow

### Previous Failed Attempts
- Multiple iterations of Kasane-style 3D book explosion failed completely
- Lenis + GSAP integration issues (race conditions, CSS conflicts)
- User frustration: "its literally the exact same" (no visible animation)
- **Resolution:** `git restore .` to clean slate

### User's Core Request
> "approach this as if you are one of the current css design winners and think how you would use your current skills to try and create new techniques that no one has seen yet - deep computer science research and mathematics"

### Critical Corrections Made
1. **Terminology:** Removed inappropriate "Quantum Superposition" physics terminology
   - Was: "Quantum superposition collapse" (physics)
   - Now: "Ghost Fade Convergence" (visual effect)

2. **Research Methodology:** Shifted from basic CSS to cutting-edge 2025 tech
   - Was: Searching "CSS blur performance 2024"
   - Now: WebGPU compute shaders, View Transitions API, Ray Marching, Neural Networks

---

## Phase 0: Decision Point (CURRENT PHASE)

### Research Documents Completed ✓
1. `/docs/plans/2025-01-24-award-winning-scroll-animation-research.md` (Production patterns)
2. `/docs/plans/2025-01-24-novel-animation-techniques-deep-dive.md` (10 invented techniques)
3. `/docs/plans/2025-01-24-implementation-plan-novel-techniques.md` (Original plan)
4. `/docs/plans/2025-01-24-feasibility-analysis-realistic.md` (Original feasibility)
5. `/docs/plans/2025-01-24-corrected-feasibility-cutting-edge.md` (Corrected with 2025 tech) ⭐
6. `/docs/plans/2025-01-24-visual-comparison-techniques.md` (ASCII diagrams) ⭐

### User Must Choose Implementation Approach

**Option A: Maximum Performance**
- Layers: 1 + 2 (GSAP + View Transitions)
- Desktop: 60fps | Mobile: 53fps
- Browser Support: 85%
- Award Potential: ⭐⭐⭐⭐ (High but not groundbreaking)
- Timeline: 2 weeks

**Option B: Maximum Innovation (Particles)**
- Layers: 1 + 2 + 3A + 4 (All techniques with WebGPU particles)
- Desktop: 58fps | Mobile: 42fps (marginal)
- Browser Support: 50% WebGPU, 100% fallback
- Award Potential: ⭐⭐⭐⭐⭐ (Unprecedented)
- Timeline: 4 weeks

**Option C: Maximum Innovation (Ray Marching)**
- Layers: 1 + 2 + 3B (GSAP + View Transitions + SDF morphing)
- Desktop: 52fps | Mobile: 38fps (marginal)
- Browser Support: 100%
- Award Potential: ⭐⭐⭐⭐⭐ (Mathematically beautiful)
- Timeline: 3 weeks

**Option D: Balanced (RECOMMENDED)**
- Layers: 1 + 2 + 3A (GSAP + View Transitions + Particles, NO Neural Network)
- Desktop: 60fps | Mobile: 45fps
- Browser Support: 85%
- Award Potential: ⭐⭐⭐⭐⭐ (Cutting-edge + performant)
- Timeline: 3 weeks

---

## Layer Descriptions (Progressive Enhancement)

### Layer 1: Production GSAP (Foundation)
**Tech Stack:**
- GSAP + ScrollTrigger
- CSS 3D Transforms (`preserve-3d`, `perspective: 1000px`)
- Lenis Smooth Scroll
- Next.js 15 + TypeScript

**What It Does:**
- 15 book pages fly backward in 3D space as you scroll
- Asymmetric rotations (`rotateY`)
- Depth scaling (`translateZ`)
- Opacity fading

**Success Probability:** 95%
**Performance:** 60fps desktop, 56fps mobile
**Timeline:** Week 1

**Reference Implementation:**
```typescript
// /src/components/BookExplosion/BookExplosion.tsx
pages.forEach((page, index) => {
  gsap.fromTo(pageRefs.current[index], {
    z: 0,
    rotateY: 0,
    scale: 1,
    opacity: 1,
  }, {
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    },
    z: -index * 150,
    rotateY: (index % 2 === 0 ? 1 : -1) * index * 3,
    scale: 1 - index * 0.05,
    opacity: Math.max(0.3, 1 - index * 0.04),
    ease: 'none',
  })
})
```

---

### Layer 2: View Transitions API (Interop 2025)
**Tech Stack:**
- View Transitions API (`document.startViewTransition`)
- CSS Scroll-Driven Animations
- Feature detection + fallbacks

**What It Does:**
- Click a book page → instant "zoom in" transition
- Scroll-driven transition progress
- Smooth morph between page states

**Success Probability:** 85%
**Performance:** 60fps desktop, 53fps mobile
**Browser Support:** Chrome 140+, Firefox 144+, Safari fallback
**Timeline:** Week 2

**Reference Implementation:**
```typescript
// /src/components/BookExplosion/useViewTransitions.ts
const handlePageClick = (pageIndex: number) => {
  if ('startViewTransition' in document) {
    document.startViewTransition(() => {
      setActivePage(pageIndex)
    })
  } else {
    // Safari fallback: instant transition
    setActivePage(pageIndex)
  }
}
```

```css
/* /src/components/BookExplosion/BookExplosion.module.css */
.bookPage {
  view-transition-name: var(--page-id);
}

::view-transition-old(page) {
  animation: zoom-out 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

::view-transition-new(page) {
  animation: fly-in-3d 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes fly-in-3d {
  from {
    transform: translateZ(-1000px) rotateY(180deg);
    opacity: 0;
  }
  to {
    transform: translateZ(0) rotateY(0deg);
    opacity: 1;
  }
}
```

---

### Layer 3A: WebGPU Compute Shader Particles
**Tech Stack:**
- Three.js WebGPURenderer
- Three Shading Language (TSL)
- Compute shaders for GPU particle simulation
- Curl noise force field

**What It Does:**
- 100,000 particles swarm around book pages (desktop)
- 10,000 particles on mobile
- Particles denser around pages further back (depth cues)
- Bloom post-processing (glow effect)

**Success Probability:** 70%
**Performance:** 60fps desktop, 39fps mobile (marginal)
**Browser Support:** Chrome experimental, WebGL fallback
**Timeline:** Week 3

**Reference Implementation:**
```typescript
// /src/components/BookExplosion/ParticleSystem.tsx
import { WebGPURenderer } from 'three/webgpu'
import { storageBufferAttribute, compute, tslFn, vec3 } from 'three/tsl'

const particleCount = isMobile ? 10000 : 100000

// GPU storage buffer
const positionBuffer = storageBufferAttribute(particleCount, 3)

// Compute shader (runs on GPU)
const updateParticles = tslFn(() => {
  const position = vec3(positionBuffer.element(instanceIndex))
  const curl = curlNoise(position.add(time.mul(0.1)))
  const newPosition = position.add(curl.mul(deltaTime))
  positionBuffer.element(instanceIndex).assign(newPosition)
})

// Execute compute shader
compute(updateParticles, particleCount).compute(renderer)
```

---

### Layer 3B: Ray Marching SDF Shape Morphing (Alternative to 3A)
**Tech Stack:**
- Custom GLSL fragment shader
- Signed Distance Fields (SDF)
- Glslify for SDF module imports
- Ray marching algorithm

**What It Does:**
- Book pages morph from rectangles to spheres/cubes/toruses
- Mathematically smooth transitions
- Infinite detail at any zoom level
- Adaptive quality (64 steps desktop, 32 mobile)

**Success Probability:** 65%
**Performance:** 52fps desktop, 35fps mobile (marginal)
**Browser Support:** 100%
**Timeline:** Week 3

**Reference Implementation:**
```glsl
// /src/shaders/rayMarchSDF.frag
#pragma glslify: sdfSphere = require('glsl-sdf-primitives/sdfSphere')
#pragma glslify: sdfBox = require('glsl-sdf-primitives/sdfBox')

vec2 map(vec3 p) {
  float sphereDist = sdfSphere(p, 1.0);
  float boxDist = sdfBox(p, vec3(0.8));

  // Morph based on scroll progress
  float dist = mix(boxDist, sphereDist, uScrollProgress);
  return vec2(dist, 1.0);
}

void main() {
  // Ray marching loop
  vec3 ro = cameraPosition;
  vec3 rd = normalize(rayDirection);

  float t = 0.0;
  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * t;
    vec2 res = map(p);
    if (res.x < 0.001) break;
    t += res.x;
  }

  // Shading
  vec3 color = calculateColor(ro + rd * t);
  gl_FragColor = vec4(color, 1.0);
}
```

---

### Layer 4: Neural Network Scroll Prediction (Optional)
**Tech Stack:**
- TensorFlow.js
- LSTM architecture (64 → 32 → 1)
- Web Workers for off-main-thread inference
- Real-time training on user device

**What It Does:**
- Predicts where user will scroll next
- Pages move preemptively (anticipatory UI)
- Creates "magical" feeling when predictions are accurate
- Fallback to GSAP-only if predictions fail

**Success Probability:** 55%
**Performance:** 58fps desktop, 48fps mobile
**Browser Support:** 100%
**Timeline:** Week 4 (only if Layers 1-3 are perfect)

**Reference Implementation:**
```typescript
// /src/lib/scrollPrediction.ts
import * as tf from '@tensorflow/tfjs'

const model = tf.sequential()
model.add(tf.layers.lstm({ units: 64, returnSequences: true, inputShape: [10, 2] }))
model.add(tf.layers.lstm({ units: 32 }))
model.add(tf.layers.dense({ units: 1 }))

const predictNextScroll = async (scrollHistory: number[][]) => {
  const input = tf.tensor3d([scrollHistory])
  const prediction = await model.predict(input)
  const nextScrollY = prediction.dataSync()[0]

  // Only act on high-confidence predictions
  if (confidence > 0.8) {
    preAnimatePages(nextScrollY)
  }
}
```

---

## Implementation Workflow (Option D - Recommended)

### Week 1: Layer 1 (GSAP Foundation)

**Day 1: Setup**
- [ ] Create `/src/components/BookExplosion/` directory structure
- [ ] Install dependencies: `gsap`, `@gsap/react`, `lenis`
- [ ] Configure GSAP in `/src/lib/gsap.ts` (already exists)
- [ ] Create basic component structure

**Day 2-3: GSAP Animation**
- [ ] Implement ScrollTrigger with 15 book pages
- [ ] Add CSS 3D transforms (`preserve-3d`, `perspective`)
- [ ] Configure depth explosion (translateZ, rotateY, scale, opacity)
- [ ] Test performance (expect 60fps)

**Day 4: Lenis Integration**
- [ ] Initialize Lenis smooth scroll
- [ ] Sync Lenis with ScrollTrigger: `lenis.on('scroll', ScrollTrigger.update)`
- [ ] Test momentum scrolling

**Day 5: Testing & Refinement**
- [ ] Test on desktop browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices (iPhone, Android)
- [ ] Performance profiling (Chrome DevTools)
- [ ] Adjust timing/easing for luxury feel

**Success Criteria:**
- ✓ 60fps on desktop
- ✓ 55fps+ on mobile
- ✓ Smooth Lenis integration
- ✓ No race conditions or jank

---

### Week 2: Layer 2 (View Transitions)

**Day 1: Feature Detection**
- [ ] Implement feature detection: `'startViewTransition' in document`
- [ ] Create fallback for Safari (instant transitions)
- [ ] Set up CSS with `view-transition-name`

**Day 2-3: View Transitions Implementation**
- [ ] Add click handlers to book pages
- [ ] Implement `document.startViewTransition(updateCallback)`
- [ ] Create CSS animations (::view-transition-old, ::view-transition-new)
- [ ] Test transition smoothness

**Day 4: Scroll-Driven Integration**
- [ ] Experiment with scroll-driven view transition progress
- [ ] Add `animation-timeline: scroll(root)`
- [ ] Test Chrome/Firefox (should work), Safari (fallback)

**Day 5: Testing**
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Verify fallbacks work gracefully

**Success Criteria:**
- ✓ Smooth instant transitions in Chrome/Firefox
- ✓ Graceful fallback in Safari
- ✓ No layout shifts or flashes
- ✓ Performance maintained (60fps)

---

### Week 3: Layer 3A (WebGPU Particles)

**Day 1: Setup Three.js**
- [ ] Install: `three`, `@types/three`
- [ ] Create WebGPU feature detection
- [ ] Set up WebGPURenderer with WebGL fallback
- [ ] Initialize basic scene

**Day 2: Particle System**
- [ ] Create TSL compute shader
- [ ] Implement particle storage buffer (100k particles)
- [ ] Add curl noise force field
- [ ] Test GPU performance

**Day 3: Integration with Scroll**
- [ ] Sync particle density with page depth
- [ ] More particles around pages further back
- [ ] Connect to GSAP ScrollTrigger progress

**Day 4: Post-Processing**
- [ ] Add bloom effect for particle glow
- [ ] Optimize shader performance
- [ ] Mobile optimization (reduce to 10k particles)

**Day 5: Testing**
- [ ] Desktop: Expect 60fps
- [ ] Mobile: Expect 35-45fps (may need particle reduction)
- [ ] Test WebGPU experimental vs WebGL fallback

**Success Criteria:**
- ✓ 60fps desktop with 100k particles
- ✓ 40fps+ mobile with 10k particles
- ✓ Graceful degradation if WebGPU unavailable
- ✓ Visual "wow factor" achieved

---

### Week 4: Polish & Award Submission

**Day 1-2: Visual Polish**
- [ ] High-quality book imagery (4K textures)
- [ ] Luxury design refinements (typography, spacing, colors)
- [ ] Micro-interactions (hover states, cursor effects)
- [ ] Loading states and transitions

**Day 3: Performance Optimization**
- [ ] Final performance profiling
- [ ] Optimize bundle size
- [ ] Lazy load heavy assets
- [ ] Test on low-end devices

**Day 4: Documentation & Video**
- [ ] Create project case study
- [ ] Record demo video (1-2 min)
- [ ] Write technical breakdown
- [ ] Prepare award submission assets

**Day 5: Award Submission**
- [ ] Submit to CSS Design Awards
- [ ] Submit to Awwwards
- [ ] Post on Twitter/LinkedIn
- [ ] Share with design community

**Success Criteria:**
- ✓ 60fps performance guaranteed
- ✓ Works on all major browsers
- ✓ Award-worthy visual quality
- ✓ Technical innovation documented

---

## Alternative: Week 3 Layer 3B (Ray Marching SDF)

If choosing Ray Marching instead of WebGPU Particles:

**Day 1: Shader Setup**
- [ ] Install Glslify + SDF libraries
- [ ] Create custom fragment shader
- [ ] Implement ray marching algorithm

**Day 2: SDF Implementation**
- [ ] Import SDF primitives (sphere, box, torus)
- [ ] Implement morphing logic (`mix(sdfBox, sdfSphere, progress)`)
- [ ] Test basic rendering

**Day 3: Integration**
- [ ] Connect shader to scroll progress
- [ ] Map scroll position to morph factor
- [ ] Add page textures to morphed shapes

**Day 4: Optimization**
- [ ] Adaptive quality (64 steps → 32 on mobile)
- [ ] Optimize shader performance
- [ ] Test on various GPUs

**Day 5: Testing**
- [ ] Expect 50-55fps desktop
- [ ] Expect 30-40fps mobile (marginal)
- [ ] Cross-browser compatibility

---

## Success Metrics & Award Criteria

### Performance Targets
- **Desktop:** 60fps minimum (all browsers)
- **Mobile:** 45fps minimum (acceptable)
- **Load time:** <3s on 4G
- **Bundle size:** <500KB (excluding images)

### Award Criteria (CSS Design Awards)
1. **Innovation (30%):** Novel techniques never seen before ⭐
   - WebGPU particles OR Ray marching = HIGH score
   - View Transitions API (2025 tech) = HIGH score

2. **Aesthetics (25%):** Visual beauty and polish ⭐
   - Luxury design system consistency
   - High-quality book imagery
   - Smooth animations

3. **Usability (20%):** User experience quality ⭐
   - Smooth scroll (Lenis)
   - No jank or lag
   - Works on mobile

4. **Creativity (15%):** Originality ⭐
   - Combining multiple cutting-edge techniques
   - Unique visual metaphor (uncertainty → clarity)

5. **Content (10%):** Quality of text and imagery ⭐
   - Professional copywriting
   - High-res book photos

**Estimated Score:** 8.8-9.2 / 10 (Award-winning range: 8.95+)

---

## Risk Mitigation

### Risk 1: WebGPU Performance on Mobile
**Mitigation:**
- Reduce particles: 100k → 10k → 0 (CSS-only fallback)
- Feature detection: `navigator.gpu`
- Adaptive quality based on FPS monitoring

### Risk 2: View Transitions Safari Support
**Mitigation:**
- Instant transitions (no animation) for Safari
- Progressive enhancement (works without, better with)
- Feature detection: `'startViewTransition' in document`

### Risk 3: Complex Shaders Debugging
**Mitigation:**
- Use Shadertoy for rapid prototyping
- Import proven SDF libraries (Inigo Quilez formulas)
- Fallback to simpler visuals if shaders fail

### Risk 4: Scope Creep (Layer 4 Neural Network)
**Mitigation:**
- Mark Layer 4 as OPTIONAL
- Only attempt if Layers 1-3 are perfect
- Time-box to 3 days maximum
- Easy to remove if not adding value

---

## Testing Checklist

### Browser Compatibility
- [ ] Chrome 120+ (WebGPU experimental)
- [ ] Firefox 144+ (View Transitions)
- [ ] Safari 26+ (fallbacks)
- [ ] Edge 120+
- [ ] Mobile Safari (iOS 16+)
- [ ] Chrome Mobile (Android)

### Device Testing
- [ ] Desktop (M1 MacBook)
- [ ] Desktop (Windows high-end GPU)
- [ ] Desktop (Windows integrated GPU)
- [ ] iPhone 14 (60fps target)
- [ ] iPhone 12 (55fps target)
- [ ] Android high-end (50fps target)
- [ ] Android mid-range (45fps target)

### Performance Testing
- [ ] Chrome DevTools Performance tab
- [ ] Frame rate monitoring (60fps check)
- [ ] Bundle size analysis
- [ ] Lighthouse score (>90)
- [ ] Memory usage profiling

---

## Final Deliverables

1. **Code:**
   - `/src/components/BookExplosion/` (complete component)
   - `/src/lib/gsap.ts` (GSAP config)
   - `/src/shaders/` (TSL or GLSL shaders)
   - Tests and documentation

2. **Documentation:**
   - Technical case study (how it works)
   - Performance analysis
   - Browser compatibility matrix
   - Award submission writeup

3. **Assets:**
   - Demo video (1080p, 60fps, 1-2 min)
   - Screenshots (4K)
   - GitHub repository (public)

4. **Award Submissions:**
   - CSS Design Awards submission
   - Awwwards submission
   - Social media posts

---

## Next Steps (Awaiting User Decision)

**User must choose:**

**A)** Option A: Max Performance (Layers 1+2)
**B)** Option B: Max Innovation - Particles (Layers 1+2+3A+4)
**C)** Option C: Max Innovation - Ray Marching (Layers 1+2+3B)
**D)** Option D: Balanced (Layers 1+2+3A) **← RECOMMENDED**

**Once chosen, proceed to Week 1: Layer 1 implementation.**

---

**End of Workflow Document**
