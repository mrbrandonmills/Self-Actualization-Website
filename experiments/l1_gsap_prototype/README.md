# Layer 1: GSAP Prototype
**Purpose:** Test Multi-State Visual Convergence with GSAP + ScrollTrigger

---

## What This Spike Tests

1. **GSAP + ScrollTrigger** scroll-driven animations
2. **Multi-State Visual Convergence** (ghost fade effect)
3. **CSS 3D transforms** (`preserve-3d`, `perspective`)
4. **Lenis smooth scroll** integration
5. **Performance** (target: 60 FPS desktop, 56 FPS mobile)

---

## Dependencies

- **GSAP** (via CDN: gsap.com/docs/v3)
- **ScrollTrigger** (GSAP plugin)
- **Lenis** (via CDN: lenis.darkroom.engineering)

**No build tools required** — This is a pure HTML/CSS/JS prototype.

---

## Technical Approach

### Multi-State Visual Convergence

Each visual element (book page) has **3 ghost states**:

1. **Ghost State 1:** `opacity: 0.15`, `blur: 20px`, `z: -200px`
2. **Ghost State 2:** `opacity: 0.10`, `blur: 15px`, `z: -250px`
3. **Primary State:** `opacity: 1.0`, `blur: 0px`, `z: 0px`

As user scrolls:
- Ghost states **fade out** (opacity 0.15 → 0)
- Primary state **solidifies** (opacity 0.3 → 1.0)
- Blur reduces (20px → 0px)
- Creates visual metaphor: **uncertainty → clarity**

### GSAP Configuration

```javascript
gsap.fromTo(ghostElement, {
  z: -200,
  opacity: 0.15,
  filter: 'blur(20px)'
}, {
  scrollTrigger: {
    trigger: container,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1  // 1:1 scroll mapping
  },
  z: -pageIndex * 150,
  opacity: (self) => Math.exp(-self.progress * 5) * 0.15,  // Exponential decay
  filter: (self) => `blur(${Math.exp(-self.progress * 5) * 20}px)`,
  ease: 'none'
})
```

---

## File Structure

```
l1_gsap_prototype/
├── README.md          ← This file
├── index.html         ← Single page with ghost fade effect
├── style.css          ← CSS 3D transforms + styling
└── script.js          ← GSAP animation logic
```

---

## How to Run

1. Open `index.html` in a modern browser (Chrome, Firefox, Safari)
2. Scroll down slowly
3. Observe ghost states fading as primary state solidifies
4. Open Chrome DevTools Performance tab to measure FPS

**Expected result:** 60 FPS smooth scroll, no jank.

---

## Performance Notes

### Target Metrics

- **Desktop:** 60 FPS (M1 MacBook or equivalent)
- **Mobile:** 56 FPS (iPhone 12 or equivalent)
- **Bundle Size:** ~50KB (GSAP from CDN)
- **Memory:** <50MB JavaScript heap

### Optimization Techniques

1. **GPU Acceleration:**
   - Use `will-change: transform` on animated elements
   - Use 3D transforms (`translateZ`) to force GPU layer
   - Avoid animating `width`, `height`, `top`, `left`

2. **GSAP Optimization:**
   - Use `scrub: 1` for direct scroll mapping (no delay)
   - Use `ease: 'none'` for linear easing (no calculations)
   - Use `invalidateOnRefresh: false` to avoid recalculations

3. **CSS Optimization:**
   - Use `transform-style: preserve-3d` on parent
   - Use `backface-visibility: hidden` for culling
   - Minimize box-shadow and filter usage (except blur for effect)

---

## Known Issues

1. **Blur performance on mobile:** CSS `filter: blur()` is CPU-intensive
   - **Solution:** Reduce blur amount on mobile (20px → 10px)
   - **Alternative:** Pre-render blurred images (no real-time blur)

2. **Safari scroll jank:** Safari has known issues with `filter` + `transform`
   - **Solution:** Disable blur on Safari (detection via UA or feature test)

3. **Multiple ghost states = multiple DOM nodes:** 3 copies per page = 3x memory
   - **Solution:** For production, limit to 15 pages max (45 DOM nodes total)

---

## Next Steps (After Testing)

1. Measure FPS on desktop (Chrome DevTools)
2. Measure FPS on mobile (Remote debugging)
3. Record results in `/benchmarks/performance-metrics.md`
4. If performance is acceptable (60 FPS desktop, 55+ mobile):
   - ✅ Proceed to Layer 2 (View Transitions prototype)
5. If performance fails (<55 FPS desktop, <50 mobile):
   - ❌ Reduce ghost states (3 → 2)
   - ❌ Disable blur on mobile
   - ❌ Reduce page count (15 → 10)

---

**Created:** January 25, 2025
**Status:** Ready to test
