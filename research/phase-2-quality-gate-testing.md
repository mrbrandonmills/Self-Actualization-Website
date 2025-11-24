# Phase 2 Quality Gate Testing - GSAP Animation System

**Date:** November 24, 2025
**Phase:** 2 - GSAP Animation System
**Status:** Ready for Testing

---

## TESTING OVERVIEW

Phase 2 implements GSAP + ScrollTrigger for scroll-driven animations. This quality gate ensures animations are performant, smooth, and properly integrated with the Lenis smooth scroll foundation from Phase 1.

---

## QUALITY GATE 2 REQUIREMENTS

All 5 requirements must pass:

| # | Requirement | Target | Test Method |
|---|------------|--------|-------------|
| 1 | Animation Performance | 60fps | Chrome DevTools Performance |
| 2 | No Layout Shifts | CLS = 0 | Visual inspection + Lighthouse |
| 3 | Correct Trigger Points | Visual match | Scroll through test page |
| 4 | Memory Stability | No leaks | Chrome Memory Profiler |
| 5 | Cleanup Functions | No warnings | Console + Memory |

---

## TEST ENVIRONMENT

### Required Tools
- Chrome Browser (latest version)
- Chrome DevTools (Performance & Memory tabs)
- Stable internet connection
- 15 minutes of uninterrupted testing time

### Test URLs
- Production: `https://your-vercel-domain.vercel.app/gsap-test`
- Local (if needed): `http://localhost:3000/gsap-test`

---

## TEST PROCEDURE

### TEST 1: Animation Performance (60fps)

**Goal:** Verify all GSAP animations run at 60fps without drops

**Steps:**

1. **Open Chrome DevTools**
   ```
   Cmd+Option+I (Mac)
   Ctrl+Shift+I (Windows/Linux)
   ```

2. **Navigate to Performance Tab**
   - Click "Performance" in DevTools
   - Click settings gear icon
   - Enable "Screenshots" for visual reference
   - Click record button (●)

3. **Execute Scroll Test**
   - Slowly scroll from top to bottom of /gsap-test page
   - Pause at each animation section:
     - Basic Animations (6 cards)
     - Stagger Animations (8 items)
     - Scrub Animations (6 boxes)
     - Custom Timeline (3-part sequence)
   - Record for 30 seconds minimum

4. **Stop Recording**
   - Click stop button (■)
   - Wait for Chrome to process

5. **Analyze Results**
   - Look at "FPS" graph at top
   - **PASS CRITERIA:**
     - Green bars consistently at 60fps
     - No yellow/red bars during animations
     - Frame timing consistent (<16.7ms per frame)
   - **FAIL CRITERIA:**
     - FPS drops below 55fps
     - Long tasks >50ms (red bars)
     - Stuttering visible in screenshots

**Expected Result:**
```
✅ FPS: Solid 60fps during all animations
✅ No long tasks during scroll
✅ GPU acceleration active (check Layers tab)
✅ ScrollTrigger markers working (if enabled)
```

**If Failed:**
- Take screenshot of FPS graph with failures
- Note which animation type caused drops
- Check CPU usage (should be <70%)
- Verify GPU acceleration is enabled

---

### TEST 2: Layout Stability (No Shifts)

**Goal:** Verify animations don't cause Cumulative Layout Shift (CLS)

**Steps:**

1. **Open Lighthouse**
   - Chrome DevTools > Lighthouse tab
   - Device: Desktop
   - Categories: Performance only
   - Click "Analyze page load"

2. **Check CLS Score**
   - Wait for report to generate
   - Look for "Cumulative Layout Shift" metric

3. **Visual Inspection**
   - Scroll through page slowly
   - Watch for:
     - Content jumping/shifting
     - Elements popping in unexpectedly
     - Text reflow during animations

**Expected Result:**
```
✅ CLS Score: 0 (or <0.1 acceptable)
✅ No visible content shifts
✅ Animations smooth and predictable
✅ Text remains stable during fades
```

**Pass Criteria:**
- CLS ≤ 0.1
- No visual jumping

**Fail Criteria:**
- CLS > 0.25
- Visible layout shifts
- Content "popping" into place

**If Failed:**
- Note which elements shift
- Check if images have width/height
- Verify animations use transform/opacity only

---

### TEST 3: Correct Animation Triggers

**Goal:** Ensure animations trigger at intended scroll positions

**Steps:**

1. **Test Basic Animations**
   - Scroll to "Basic Animations" section
   - Animations should trigger when heading is 80% from top of viewport
   - All 6 cards should animate independently

2. **Test Stagger Effect**
   - Scroll to "Stagger Animations" section
   - Items should appear sequentially (0.1s delay between each)
   - Should feel like a cascade, not all-at-once

3. **Test Scrub Animations**
   - Scroll to "Scrub Animations" section
   - Boxes should scale in as you scroll
   - **CRITICAL:** Scroll back up - animations should reverse smoothly
   - Animation progress should match scroll position exactly

4. **Test Custom Timeline**
   - Scroll to "Custom Timeline" section
   - Should see 3-part sequence:
     1. Title fades in from below
     2. Subtitle slides in from left (overlapping title animation)
     3. Content box scales up (overlapping subtitle)

**Expected Result:**
```
✅ All animations trigger at correct scroll positions
✅ Stagger creates sequential effect (not simultaneous)
✅ Scrub animations reverse when scrolling up
✅ Custom timeline sequence feels orchestrated
✅ No animations trigger too early or too late
```

**If Failed:**
- Note which animations trigger incorrectly
- Check if Lenis smooth scroll interferes
- Verify ScrollTrigger start/end positions
- Test with ScrollTrigger markers enabled (debug mode)

---

### TEST 4: Memory Stability (No Leaks)

**Goal:** Ensure ScrollTrigger instances are properly cleaned up

**Steps:**

1. **Open Chrome DevTools > Memory**

2. **Take Baseline Snapshot**
   - Click "Take heap snapshot"
   - Label: "Baseline - Page Load"

3. **Execute Scroll Workout**
   - Scroll up and down continuously for 3 minutes
   - Cover entire page multiple times
   - Vary speed (slow/fast)
   - Pause at animation sections

4. **Take Post-Test Snapshot**
   - Click "Take heap snapshot"
   - Label: "After 3min scroll"

5. **Compare Snapshots**
   - Click "Comparison" view
   - Look at "Delta" column
   - Calculate memory growth

6. **Check for Detached DOM**
   - In snapshot, search for "Detached"
   - Should be minimal (<10 nodes)

**Expected Result:**
```
✅ Memory growth: <8MB
✅ No exponential growth trend
✅ Detached DOM nodes: <10
✅ ScrollTrigger instances cleaned up
```

**Pass Criteria:**
- Memory increase < 10MB after 3 minutes
- No linear upward trend
- Heap size stabilizes

**Fail Criteria:**
- Memory increase > 20MB
- Continuous growth (leak indicator)
- Large number of detached DOM nodes
- Browser becomes sluggish

**If Failed:**
- Check cleanup functions in useScrollAnimation
- Verify ScrollTrigger.kill() called on unmount
- Look for orphaned event listeners
- Check RAF loops are cancelled

---

### TEST 5: Console & Cleanup Verification

**Goal:** No warnings or errors in console

**Steps:**

1. **Open Console Tab**
   - Chrome DevTools > Console
   - Clear console (Cmd+K)

2. **Reload Page**
   - Hard refresh (Cmd+Shift+R)
   - Watch for errors during load

3. **Scroll Through Page**
   - Complete one full scroll from top to bottom
   - Watch for warnings during animations

4. **Check for Common Issues**
   - No "ScrollTrigger" warnings
   - No "useGSAP" errors
   - No "GSAP" deprecation warnings
   - No "Memory leak" warnings from React

**Expected Result:**
```
✅ Console clean (no errors)
✅ No ScrollTrigger warnings
✅ No React warnings about cleanup
✅ No 404s for assets
```

**If Failed:**
- Screenshot console errors
- Note which animations cause warnings
- Check if errors block functionality
- Verify all imports are correct

---

## QUALITY GATE DECISION MATRIX

After completing all 5 tests, evaluate overall status:

### ✅ GATE PASSED (Proceed to Phase 3)

**All of the following:**
- Animation Performance: ✅ PASS (60fps)
- Layout Stability: ✅ PASS (CLS ≤ 0.1)
- Trigger Points: ✅ PASS (correct timing)
- Memory Stable: ✅ PASS (<10MB growth)
- Console Clean: ✅ PASS (no errors)

**Action:** Commit changes, proceed to Phase 3 (CSS 3D Book Cards)

---

### ⚠️ GATE PARTIALLY PASSED (Minor Issues)

**1-2 minor failures:**
- Example: Occasional FPS drop to 55fps on one animation
- Example: Minor CLS (0.15) on page load
- Example: Stagger timing slightly off

**Action:**
1. Document issues in `research/phase-2-known-issues.md`
2. Create GitHub issues for future optimization
3. Proceed to Phase 3 with caution
4. Revisit Phase 2 after Phase 4 if problems worsen

---

### ❌ GATE FAILED (Critical Issues)

**3+ failures OR any critical failure:**
- Animation FPS <50fps consistently
- CLS >0.3
- Animations don't trigger correctly
- Memory leak >25MB
- Console errors blocking functionality

**Action:**
1. **STOP** - Do not proceed to Phase 3
2. **Debug** - Use Chrome DevTools to profile bottlenecks:
   ```bash
   # Enable ScrollTrigger markers for debugging
   # In src/lib/gsap.ts, set markers: true

   # Test locally with dev mode
   npm run dev
   # Open /gsap-test
   ```
3. **Fix** - Address root cause:
   - Simplify animations?
   - Reduce number of animated elements?
   - Use will-change CSS property?
   - Check Lenis integration?
4. **Re-test** - Run full Quality Gate 2 again
5. **Only proceed when gate passes**

---

## TROUBLESHOOTING

### Issue: Animations not triggering

**Possible Causes:**
1. ScrollTrigger not registered
2. Lenis smooth scroll interfering
3. Container ref not properly passed

**Solutions:**
```typescript
// Verify GSAP registration
console.log('GSAP plugins:', gsap.plugins)

// Check if Lenis is interfering
// In src/components/smooth-scroll.tsx, add:
lenis.on('scroll', ScrollTrigger.update)

// Verify container ref
console.log('Container:', containerRef.current)
```

---

### Issue: Scrub animations choppy

**Possible Causes:**
1. scrub: true is too instant
2. Heavy DOM elements
3. Too many simultaneous animations

**Solutions:**
```typescript
// Add smoothing to scrub
scrub: 1  // 1 second smoothing (was: true)

// Reduce animated elements
// Limit to visible viewport only

// Use GPU acceleration
// Add to animated elements:
style={{ willChange: 'transform' }}
```

---

### Issue: FPS drops during animations

**Possible Causes:**
1. Too many elements animating simultaneously
2. Animating layout properties (width, height, top, left)
3. No GPU acceleration

**Solutions:**
```typescript
// Reduce stagger count
stagger: 0.15  // Slower cascade (was: 0.1)

// Only animate transform + opacity
// ✅ Good: transform, opacity, scale, rotate
// ❌ Bad: width, height, top, left, margin

// Force GPU acceleration
gsap.set(element, { force3D: true })
```

---

### Issue: Memory leak detected

**Possible Causes:**
1. ScrollTrigger instances not killed
2. useGSAP cleanup not working
3. Event listeners not removed

**Solutions:**
```typescript
// Ensure proper cleanup in useGSAP
useGSAP(() => {
  // Create animations...

  // CRITICAL: Return cleanup function
  return () => {
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger && containerRef.current?.contains(trigger.vars.trigger)) {
        trigger.kill()
      }
    })
  }
}, { scope: containerRef })
```

---

## REFERENCE: Good Performance Indicators

### Chrome DevTools Performance Tab

**Good Animation Profile:**
```
FPS: ████████████████████ 60fps
Frames:  All green bars, consistent spacing
Tasks:   No red bars >50ms
GPU:     Active (check Layers tab)
```

**Bad Animation Profile (FAIL):**
```
FPS: ██  ████    ██   30-60fps (spiky)
Frames:  Yellow/red bars, inconsistent
Tasks:   Multiple red bars >100ms
GPU:     Inactive or minimal use
```

---

## SUCCESS CRITERIA SUMMARY

✅ **PHASE 2 QUALITY GATE PASSED** when:

1. All animations maintain 60fps during scroll
2. No layout shifts (CLS ≤ 0.1)
3. Animations trigger at correct scroll positions
4. Stagger creates sequential cascade effect
5. Scrub animations reverse smoothly
6. Custom timeline feels orchestrated
7. Memory stable over 3 minutes (<10MB growth)
8. Console clean (no errors/warnings)
9. Works across browsers (Chrome, Safari, Firefox)

Once all criteria pass → **GREEN LIGHT FOR PHASE 3**

---

## REPORTING RESULTS

After completing all tests, fill out this report:

```markdown
## Phase 2 Quality Gate Results

**Tester:** [Your Name]
**Date:** [Test Date]
**Environment:** [Production/Local]

### Test Results

- [ ] Test 1: Animation Performance (60fps)
  - FPS Range: [Min-Max]
  - Long Tasks: [Yes/No]
  - GPU Active: [Yes/No]
  - Result: [PASS/FAIL]

- [ ] Test 2: Layout Stability
  - CLS Score: [Score]
  - Visual Shifts: [Yes/No]
  - Result: [PASS/FAIL]

- [ ] Test 3: Correct Triggers
  - Basic Animations: [PASS/FAIL]
  - Stagger Effect: [PASS/FAIL]
  - Scrub Reverse: [PASS/FAIL]
  - Custom Timeline: [PASS/FAIL]
  - Result: [PASS/FAIL]

- [ ] Test 4: Memory Stability
  - Baseline: [XX MB]
  - After 3min: [XX MB]
  - Growth: [X MB / X%]
  - Detached Nodes: [Count]
  - Result: [PASS/FAIL]

- [ ] Test 5: Console Clean
  - Errors: [Count]
  - Warnings: [Count]
  - Result: [PASS/FAIL]

### Overall Decision

- [ ] ✅ GATE PASSED - Proceed to Phase 3
- [ ] ⚠️ GATE PARTIALLY PASSED - Proceed with caution
- [ ] ❌ GATE FAILED - Debug and retest

### Notes

[Any additional observations, issues, or recommendations]
```

---

## NEXT STEPS

### If Gate Passed:
1. Commit Phase 2 changes
2. Update project README with Phase 2 completion
3. Create Phase 3 branch (optional)
4. Begin Phase 3: CSS 3D Book Cards

### If Gate Failed:
1. Review troubleshooting section
2. Implement fixes
3. Re-run all 5 tests
4. Only proceed when passing

---

**End of Phase 2 Quality Gate Testing Document**

Ready to test? Open `/gsap-test` on your Vercel deployment and follow this guide!
