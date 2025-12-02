/**
 * Layer 1: GSAP Prototype — Animation Logic (WITHOUT Lenis)
 * Multi-State Visual Convergence (Ghost Fade Effect)
 *
 * FIXED: Removed Lenis dependency - GSAP handles scroll directly
 */

// ==================================
// 1. GSAP Setup
// ==================================

gsap.registerPlugin(ScrollTrigger);

console.log('✅ GSAP + ScrollTrigger loaded');

// ==================================
// 2. Multi-State Visual Convergence
// ==================================

const scrollSpacer = document.querySelector('.scroll-spacer');
const pageWrappers = document.querySelectorAll('.page-wrapper');

pageWrappers.forEach((wrapper, pageIndex) => {
  const ghostStates = wrapper.querySelectorAll('.ghost-state');
  const primaryState = wrapper.querySelector('.primary-state');

  // Depth per page (pages further back in scroll)
  const depthPerPage = 150;
  const baseDepth = -pageIndex * depthPerPage;

  // ================================
  // Ghost State 1 Animation
  // ================================

  gsap.fromTo(
    ghostStates[0],
    {
      z: baseDepth - 200,
      rotateY: (pageIndex % 2 === 0 ? 1 : -1) * 5,
      scale: 0.95,
      opacity: 0.15,
      filter: 'blur(20px)',
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // 1:1 scroll mapping
        // markers: true, // Uncomment for debugging
      },
      z: baseDepth - 100,
      rotateY: (pageIndex % 2 === 0 ? 1 : -1) * 2,
      scale: 0.98,
      opacity: (self) => {
        // Exponential decay: ghost fades out as scroll progresses
        const progress = self.progress;
        return Math.exp(-progress * 5) * 0.15;
      },
      filter: (self) => {
        // Blur reduces as ghost fades
        const progress = self.progress;
        const blurAmount = Math.exp(-progress * 5) * 20;
        return `blur(${blurAmount}px)`;
      },
      ease: 'none',
    }
  );

  // ================================
  // Ghost State 2 Animation
  // ================================

  gsap.fromTo(
    ghostStates[1],
    {
      z: baseDepth - 250,
      rotateY: (pageIndex % 2 === 0 ? -1 : 1) * 7,
      scale: 0.92,
      opacity: 0.10,
      filter: 'blur(15px)',
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
      z: baseDepth - 150,
      rotateY: (pageIndex % 2 === 0 ? -1 : 1) * 3,
      scale: 0.96,
      opacity: (self) => {
        const progress = self.progress;
        return Math.exp(-progress * 5) * 0.10;
      },
      filter: (self) => {
        const progress = self.progress;
        const blurAmount = Math.exp(-progress * 5) * 15;
        return `blur(${blurAmount}px)`;
      },
      ease: 'none',
    }
  );

  // ================================
  // Primary State Animation
  // ================================

  gsap.fromTo(
    primaryState,
    {
      z: baseDepth,
      rotateY: 0,
      scale: 0.9,
      opacity: 0.3,
      filter: 'blur(5px)',
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
      z: baseDepth,
      rotateY: 0,
      scale: 1.0,
      opacity: (self) => {
        // Inverse of ghost fade: primary solidifies
        const progress = self.progress;
        const uncertainty = Math.exp(-progress * 5);
        return 1 - uncertainty * 0.7; // 0.3 → 1.0
      },
      filter: (self) => {
        const progress = self.progress;
        const uncertainty = Math.exp(-progress * 5);
        const blurAmount = uncertainty * 5; // 5px → 0px
        return `blur(${blurAmount}px)`;
      },
      ease: 'none',
    }
  );

  // ================================
  // Page Wrapper Depth Animation
  // ================================

  gsap.fromTo(
    wrapper,
    {
      z: 0,
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
      z: baseDepth,
      ease: 'none',
    }
  );
});

console.log(`✅ ${pageWrappers.length} pages animated (WITHOUT Lenis)`);

// ==================================
// 3. FPS Counter (for debugging)
// ==================================

let lastTime = performance.now();
let frames = 0;
let fps = 60;

function updateFPS() {
  const now = performance.now();
  frames++;

  if (now >= lastTime + 1000) {
    fps = Math.round((frames * 1000) / (now - lastTime));
    document.getElementById('fps').textContent = fps;

    // Color code: green (60), yellow (45-59), red (<45)
    const fpsElement = document.getElementById('fps');
    if (fps >= 60) {
      fpsElement.style.color = '#00FF00'; // Green
    } else if (fps >= 45) {
      fpsElement.style.color = '#FFFF00'; // Yellow
    } else {
      fpsElement.style.color = '#FF0000'; // Red
    }

    frames = 0;
    lastTime = now;
  }

  requestAnimationFrame(updateFPS);
}

requestAnimationFrame(updateFPS);

console.log('✅ FPS counter running');

// ==================================
// 4. Mobile Detection & Optimization
// ==================================

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  console.log('📱 Mobile device detected — Applying optimizations');

  // Reduce blur on mobile (already handled in CSS, but JS can disable entirely)
  const ghostStates = document.querySelectorAll('.ghost-state');
  ghostStates.forEach((ghost) => {
    // Optional: Disable blur entirely on low-end mobile
    // ghost.style.filter = 'none';
  });
}

// ==================================
// 5. Performance Monitoring
// ==================================

// Log performance metrics to console
setTimeout(() => {
  const memory = performance.memory
    ? `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB`
    : 'N/A';

  console.log('📊 Performance Metrics:');
  console.log(`   FPS: ${fps}`);
  console.log(`   JavaScript Heap: ${memory}`);
  console.log(`   Scroll Height: ${scrollSpacer.offsetHeight}px`);
  console.log(`   Pages Animated: ${pageWrappers.length}`);
  console.log(`   Lenis: NOT USED (GSAP handles scroll directly)`);
}, 3000);

console.log('✅ Layer 1 prototype ready (WITHOUT Lenis smooth scroll)');
console.log('ℹ️  Native browser scroll - GSAP ScrollTrigger handles animation');
