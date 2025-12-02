# Layer 2: View Transitions Prototype
**Purpose:** Test View Transitions API with scroll-driven progress + Safari fallback

---

## What This Spike Tests

1. **View Transitions API** (`document.startViewTransition`)
2. **Scroll-driven transition progress** (Interop 2025 feature)
3. **Page navigation transitions** (click → zoom effect)
4. **Safari fallback** (instant transitions, no animation)
5. **Zero layout shift** (CLS = 0)

---

## Dependencies

- **View Transitions API** (Chrome 140+, Firefox 144+)
- **CSS Scroll-Driven Animations** (Safari 26+, Chrome 115+)
- **Feature detection** (progressive enhancement)

**No external libraries required** — Uses native browser APIs only.

---

## Technical Approach

### View Transitions API

```javascript
// Trigger a view transition
document.startViewTransition(() => {
  // Update DOM state here
  currentPage = nextPage;
  renderPage(currentPage);
});
```

### CSS View Transition Pseudo-Elements

```css
.page {
  view-transition-name: var(--page-id);
}

::view-transition-old(page) {
  animation: zoom-out 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

::view-transition-new(page) {
  animation: zoom-in 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
```

### Scroll-Driven Transition Progress

```css
::view-transition-group(page) {
  animation-timeline: scroll(root);
  animation-range: entry 0% exit 100%;
}
```

---

## File Structure

```
l2_view_transition_prototype/
├── README.md          ← This file
├── index.html         ← 3 pages with navigation
├── style.css          ← View transition animations
└── script.js          ← Feature detection + fallback logic
```

---

## How to Run

1. Open `index.html` in Chrome 140+ or Firefox 144+
2. Click navigation buttons to switch between pages
3. Observe smooth zoom transition
4. Test in Safari → Should see instant transitions (fallback)
5. Open Chrome DevTools Performance tab to measure CLS

**Expected result:** Smooth transitions, zero layout shift.

---

## Performance Notes

### Target Metrics

- **Transition Duration:** 0.6s (feels premium, not rushed)
- **Frame Rate:** 60 FPS during transition
- **Layout Shift (CLS):** 0 (no jumps or flickers)
- **JavaScript Execution:** <10ms (minimal overhead)

### Browser Support

| Browser | Version | Support | Behavior |
|---------|---------|---------|----------|
| Chrome | 140+ | ✅ Full | Smooth view transitions |
| Firefox | 144+ | ✅ Full | Smooth view transitions |
| Safari | 16+ | ⚠️ Fallback | Instant (no animation) |
| Edge | 120+ | ✅ Full | Smooth view transitions |

### Feature Detection

```javascript
if ('startViewTransition' in document) {
  // Browser supports View Transitions API
  document.startViewTransition(updateCallback);
} else {
  // Safari fallback: instant update
  updateCallback();
}
```

---

## Known Issues

1. **Safari doesn't support View Transitions API yet**
   - **Solution:** Feature detection → instant transitions
   - **UX Impact:** Minimal (instant still functional)

2. **Layout shifts can occur if DOM changes size**
   - **Solution:** Use CSS `view-transition-class` to constrain dimensions
   - **Prevention:** Ensure all pages have same container size

3. **Scroll-driven transitions are experimental**
   - **Solution:** Test in Chrome Canary with flag enabled
   - **Fallback:** Use regular view transitions (not scroll-driven)

---

## Experimental Features (Optional)

### Scroll-Driven View Transition Progress

**Status:** Experimental (Chrome Canary with flag)

**How to enable:**
1. Open `chrome://flags`
2. Enable "Experimental Web Platform features"
3. Restart Chrome

**Test:** Scroll should control transition progress (0% → 100%)

**Expected:** Transition animates in sync with scroll position

---

## Next Steps (After Testing)

1. Test view transitions in Chrome/Firefox
2. Test Safari fallback (instant transitions)
3. Measure layout shift (CLS should be 0)
4. Record results in `/benchmarks/performance-metrics.md`
5. If successful:
   - ✅ Proceed to Layer 3A (WebGPU particles prototype)
6. If layout shifts occur (CLS > 0.1):
   - ❌ Fix CSS (constrain dimensions, use `contain`)

---

**Created:** January 25, 2025
**Status:** Ready to test
