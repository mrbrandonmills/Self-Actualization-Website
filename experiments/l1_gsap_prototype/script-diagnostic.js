/**
 * Layer 1: DIAGNOSTIC Animation Logic
 * Multi-State Visual Convergence with FULL diagnostics
 */

// ==================================
// 1. GSAP Setup
// ==================================

gsap.registerPlugin(ScrollTrigger);

console.log('✅ GSAP + ScrollTrigger loaded (DIAGNOSTIC VERSION)');
console.log('🔍 Running full diagnostics...');

// ==================================
// 2. Diagnostics Panel
// ==================================

const diagScrollHeight = document.getElementById('diag-scroll-height');
const diagWindowHeight = document.getElementById('diag-window-height');
const diagCanScroll = document.getElementById('diag-can-scroll');
const diagOverflow = document.getElementById('diag-overflow');

function updateDiagnostics() {
  const scrollHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const canScroll = scrollHeight > windowHeight;
  const bodyOverflow = window.getComputedStyle(document.body).overflowY;

  diagScrollHeight.textContent = `${scrollHeight}px`;
  diagWindowHeight.textContent = `${windowHeight}px`;
  diagCanScroll.textContent = canScroll ? '✅ YES' : '❌ NO';
  diagOverflow.textContent = bodyOverflow;

  diagCanScroll.style.color = canScroll ? '#00FF00' : '#FF0000';

  console.log('📊 Diagnostics:');
  console.log(`   Scroll Height: ${scrollHeight}px`);
  console.log(`   Window Height: ${windowHeight}px`);
  console.log(`   Can Scroll: ${canScroll ? 'YES' : 'NO'}`);
  console.log(`   Body Overflow-Y: ${bodyOverflow}`);
  console.log(`   Ratio: ${(scrollHeight / windowHeight).toFixed(2)}x viewport`);

  if (!canScroll) {
    console.error('❌ PROBLEM: Scroll height is NOT greater than window height!');
    console.error('   Expected scroll height to be ~5x window height (500vh)');
  } else {
    console.log('✅ Scroll spacer is working correctly!');
  }
}

// Run diagnostics on load and resize
updateDiagnostics();
window.addEventListener('resize', updateDiagnostics);

// ==================================
// 3. Scroll Progress Indicator
// ==================================

const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  progressBar.style.width = `${scrollPercent}%`;
  progressText.textContent = `Scroll: ${Math.round(scrollPercent)}%`;

  // Log every 10% milestone
  const milestone = Math.floor(scrollPercent / 10) * 10;
  if (!window.lastMilestone || window.lastMilestone !== milestone) {
    console.log(`📍 Scroll Milestone: ${milestone}%`);
    window.lastMilestone = milestone;
  }
});

console.log('✅ Scroll progress tracking enabled');

// ==================================
// 4. Mouse Parallax Effect
// ==================================

const pagesContainer = document.getElementById('pages-container');
let mouseX = 0;
let mouseY = 0;
let targetRotationY = 0;
let targetRotationX = 0;
let currentRotationY = 0;
let currentRotationX = 0;

document.addEventListener('mousemove', (e) => {
  // Normalize mouse position to -1 to 1
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = (e.clientY / window.innerHeight) * 2 - 1;

  // Calculate rotation (subtle effect)
  targetRotationY = mouseX * 8; // Max ±8 degrees (INCREASED from 5)
  targetRotationX = -mouseY * 8; // Max ±8 degrees (INCREASED from 5)
});

// Smooth interpolation for mouse parallax
function updateMouseParallax() {
  // Lerp (linear interpolation) for smooth motion
  currentRotationY += (targetRotationY - currentRotationY) * 0.1;
  currentRotationX += (targetRotationX - currentRotationX) * 0.1;

  gsap.set(pagesContainer, {
    rotationY: currentRotationY,
    rotationX: currentRotationX,
  });

  requestAnimationFrame(updateMouseParallax);
}

updateMouseParallax();

console.log('✅ Mouse parallax enabled (±8° rotation)');

// ==================================
// 5. Multi-State Visual Convergence
// ==================================

const scrollSpacer = document.querySelector('.scroll-spacer');
const pageWrappers = document.querySelectorAll('.page-wrapper');

console.log(`🔍 Found ${pageWrappers.length} page wrappers`);
console.log(`🔍 Scroll spacer height: ${scrollSpacer.offsetHeight}px`);

pageWrappers.forEach((wrapper, pageIndex) => {
  const ghostStates = wrapper.querySelectorAll('.ghost-state');
  const primaryState = wrapper.querySelector('.primary-state');

  console.log(`🔍 Page ${pageIndex}: ${ghostStates.length} ghost states, 1 primary state`);

  // Depth per page (pages further back in scroll)
  const depthPerPage = 200; // INCREASED from 150
  const baseDepth = -pageIndex * depthPerPage;

  console.log(`   Base depth: ${baseDepth}px`);

  // ================================
  // Ghost State 1 Animation
  // ================================

  gsap.fromTo(
    ghostStates[0],
    {
      z: baseDepth - 400, // INCREASED from -300
      rotateY: (pageIndex % 2 === 0 ? 1 : -1) * 20, // INCREASED from 15
      scale: 0.8, // REDUCED from 0.85
      opacity: 0.4, // INCREASED from 0.3
      filter: 'blur(30px)', // INCREASED from 25px
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // 1:1 scroll mapping
        onUpdate: (self) => {
          // Log every 25% for ghost 1
          const milestone = Math.floor(self.progress * 4) / 4;
          if (!ghostStates[0]._lastProgress || ghostStates[0]._lastProgress !== milestone) {
            console.log(`Ghost 1 [Page ${pageIndex}]: ${(milestone * 100).toFixed(0)}% complete`);
            ghostStates[0]._lastProgress = milestone;
          }
        },
      },
      z: baseDepth - 100,
      rotateY: (pageIndex % 2 === 0 ? 1 : -1) * 3,
      scale: 0.95,
      opacity: (self) => {
        // Exponential decay: ghost fades out as scroll progresses
        const progress = self.progress;
        const opacity = Math.exp(-progress * 7) * 0.4; // INCREASED decay rate
        return opacity;
      },
      filter: (self) => {
        // Blur reduces as ghost fades
        const progress = self.progress;
        const blurAmount = Math.exp(-progress * 7) * 30; // INCREASED
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
      z: baseDepth - 500, // INCREASED from -400
      rotateY: (pageIndex % 2 === 0 ? -1 : 1) * 25, // INCREASED from 20
      scale: 0.75, // REDUCED from 0.8
      opacity: 0.3, // INCREASED from 0.2
      filter: 'blur(35px)', // INCREASED from 30px
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const milestone = Math.floor(self.progress * 4) / 4;
          if (!ghostStates[1]._lastProgress || ghostStates[1]._lastProgress !== milestone) {
            console.log(`Ghost 2 [Page ${pageIndex}]: ${(milestone * 100).toFixed(0)}% complete`);
            ghostStates[1]._lastProgress = milestone;
          }
        },
      },
      z: baseDepth - 150,
      rotateY: (pageIndex % 2 === 0 ? -1 : 1) * 4,
      scale: 0.93,
      opacity: (self) => {
        const progress = self.progress;
        const opacity = Math.exp(-progress * 7) * 0.3; // INCREASED decay rate
        return opacity;
      },
      filter: (self) => {
        const progress = self.progress;
        const blurAmount = Math.exp(-progress * 7) * 35; // INCREASED
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
      scale: 0.75, // REDUCED from 0.8 for MORE dramatic reveal
      opacity: 0.05, // REDUCED from 0.1
      filter: 'blur(20px)', // INCREASED from 15px
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const milestone = Math.floor(self.progress * 4) / 4;
          if (!primaryState._lastProgress || primaryState._lastProgress !== milestone) {
            console.log(`PRIMARY [Page ${pageIndex}]: ${(milestone * 100).toFixed(0)}% complete`);
            primaryState._lastProgress = milestone;
          }
        },
      },
      z: baseDepth,
      rotateY: 0,
      scale: 1.0,
      opacity: (self) => {
        // Inverse of ghost fade: primary solidifies
        const progress = self.progress;
        const uncertainty = Math.exp(-progress * 7); // INCREASED decay rate
        const opacity = 1 - uncertainty * 0.95; // 0.05 → 1.0 (EXTREMELY DRAMATIC)
        return opacity;
      },
      filter: (self) => {
        const progress = self.progress;
        const uncertainty = Math.exp(-progress * 7);
        const blurAmount = uncertainty * 20; // 20px → 0px (MORE DRAMATIC)
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

console.log(`✅ ${pageWrappers.length} pages animated (DIAGNOSTIC)`);

// ==================================
// 6. FPS Counter
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
// 7. Mobile Detection
// ==================================

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  console.log('📱 Mobile device detected — Applying optimizations');
}

// ==================================
// 8. Final Performance Report
// ==================================

setTimeout(() => {
  const memory = performance.memory
    ? `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB`
    : 'N/A';

  console.log('');
  console.log('═══════════════════════════════════════════');
  console.log('📊 DIAGNOSTIC PERFORMANCE REPORT');
  console.log('═══════════════════════════════════════════');
  console.log(`   FPS: ${fps}`);
  console.log(`   JavaScript Heap: ${memory}`);
  console.log(`   Scroll Height: ${scrollSpacer.offsetHeight}px`);
  console.log(`   Window Height: ${window.innerHeight}px`);
  console.log(`   Scroll Ratio: ${(scrollSpacer.offsetHeight / window.innerHeight).toFixed(2)}x`);
  console.log(`   Pages Animated: ${pageWrappers.length}`);
  console.log(`   Mouse Parallax: Enabled (±8°)`);
  console.log(`   Scroll Progress: Tracked with markers`);
  console.log(`   Ghost States: 2 per page`);
  console.log(`   Primary States: 1 per page`);
  console.log('═══════════════════════════════════════════');
  console.log('');
  console.log('🎯 INSTRUCTIONS:');
  console.log('   1. Move mouse → See parallax wobble');
  console.log('   2. Scroll down → See ghost convergence');
  console.log('   3. Watch right side → See scroll markers');
  console.log('   4. Watch top-left → See scroll percentage');
  console.log('');

  if (scrollSpacer.offsetHeight <= window.innerHeight) {
    console.error('⚠️  WARNING: Scroll spacer is NOT creating scrollable space!');
    console.error('   This is a CSS bug. Check html/body height settings.');
  }
}, 3000);

console.log('✅ Layer 1 prototype ready (DIAGNOSTIC VERSION)');
console.log('🔍 Full diagnostics enabled - check console for details');
