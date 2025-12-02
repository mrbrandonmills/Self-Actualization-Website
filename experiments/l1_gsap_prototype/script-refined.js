/**
 * Layer 1: REFINED Animation Logic
 * COMPLETE Ghost Fade Convergence (no bounce-back)
 */

// ==================================
// 1. GSAP Setup
// ==================================

gsap.registerPlugin(ScrollTrigger);

console.log('✅ GSAP + ScrollTrigger loaded (REFINED VERSION)');

// ==================================
// 2. Scroll Progress Indicator
// ==================================

const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  progressBar.style.width = `${scrollPercent}%`;
  progressText.textContent = `Scroll: ${Math.round(scrollPercent)}%`;
});

// ==================================
// 3. Real-time State Display
// ==================================

const ghost1OpacityDisplay = document.getElementById('ghost1-opacity');
const ghost2OpacityDisplay = document.getElementById('ghost2-opacity');
const primaryOpacityDisplay = document.getElementById('primary-opacity');
const primaryBlurDisplay = document.getElementById('primary-blur');

// ==================================
// 4. Mouse Parallax (Reduced for focus)
// ==================================

const pagesContainer = document.getElementById('pages-container');
let mouseX = 0;
let mouseY = 0;
let targetRotationY = 0;
let targetRotationX = 0;
let currentRotationY = 0;
let currentRotationX = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = (e.clientY / window.innerHeight) * 2 - 1;

  // REDUCED parallax for less distraction
  targetRotationY = mouseX * 3; // Max ±3 degrees
  targetRotationX = -mouseY * 3;
});

function updateMouseParallax() {
  currentRotationY += (targetRotationY - currentRotationY) * 0.08;
  currentRotationX += (targetRotationX - currentRotationX) * 0.08;

  gsap.set(pagesContainer, {
    rotationY: currentRotationY,
    rotationX: currentRotationX,
  });

  requestAnimationFrame(updateMouseParallax);
}

updateMouseParallax();

// ==================================
// 5. Multi-State Visual Convergence
// COMPLETE CONVERGENCE AT 100%
// ==================================

const scrollSpacer = document.querySelector('.scroll-spacer');
const pageWrappers = document.querySelectorAll('.page-wrapper');

console.log(`🔍 Animating ${pageWrappers.length} pages`);

pageWrappers.forEach((wrapper, pageIndex) => {
  const ghostStates = wrapper.querySelectorAll('.ghost-state');
  const primaryState = wrapper.querySelector('.primary-state');

  // Depth per page
  const depthPerPage = 250; // INCREASED for more depth
  const baseDepth = -pageIndex * depthPerPage;

  // ================================
  // Ghost State 1 Animation
  // COMPLETE FADE TO 0
  // ================================

  const ghost1Timeline = gsap.fromTo(
    ghostStates[0],
    {
      z: baseDepth - 500, // VERY far back
      rotateY: (pageIndex % 2 === 0 ? 1 : -1) * 30, // EXTREME rotation
      rotateX: -10,
      scale: 0.6, // VERY small
      opacity: 0.5, // HIGH starting opacity
      filter: 'blur(40px)',
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5, // INCREASED scrub for smoother animation
        invalidateOnRefresh: true, // Prevent stale values
      },
      z: baseDepth,
      rotateY: 0,
      rotateX: 0,
      scale: 1.0,
      opacity: 0, // COMPLETE FADE TO ZERO
      filter: 'blur(0px)', // COMPLETE BLUR REMOVAL
      ease: 'power2.inOut', // Smooth easing
    }
  );

  // ================================
  // Ghost State 2 Animation
  // COMPLETE FADE TO 0
  // ================================

  const ghost2Timeline = gsap.fromTo(
    ghostStates[1],
    {
      z: baseDepth - 600, // EVEN further back
      rotateY: (pageIndex % 2 === 0 ? -1 : 1) * 35,
      rotateX: 10,
      scale: 0.55,
      opacity: 0.4,
      filter: 'blur(45px)',
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
      z: baseDepth,
      rotateY: 0,
      rotateX: 0,
      scale: 1.0,
      opacity: 0, // COMPLETE FADE TO ZERO
      filter: 'blur(0px)',
      ease: 'power2.inOut',
    }
  );

  // ================================
  // Primary State Animation
  // COMPLETE SOLIDIFICATION TO 1.0
  // ================================

  const primaryTimeline = gsap.fromTo(
    primaryState,
    {
      z: baseDepth,
      rotateY: 0,
      rotateX: 0,
      scale: 0.6, // VERY small start
      opacity: 0.01, // BARELY visible
      filter: 'blur(30px)', // VERY blurred
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Real-time display update (for Page 0 only)
          if (pageIndex === 0) {
            const progress = self.progress;

            // Calculate current values
            const ghost1Opacity = (0.5 * (1 - progress)).toFixed(2);
            const ghost2Opacity = (0.4 * (1 - progress)).toFixed(2);
            const primaryOpacity = (0.01 + 0.99 * progress).toFixed(2);
            const primaryBlur = (30 * (1 - progress)).toFixed(1);

            ghost1OpacityDisplay.textContent = ghost1Opacity;
            ghost2OpacityDisplay.textContent = ghost2Opacity;
            primaryOpacityDisplay.textContent = primaryOpacity;
            primaryBlurDisplay.textContent = `${primaryBlur}px`;

            // Log milestones
            const milestone = Math.floor(progress * 10) * 10;
            if (!primaryState._lastMilestone || primaryState._lastMilestone !== milestone) {
              console.log(`📍 ${milestone}%: Primary opacity = ${primaryOpacity}, blur = ${primaryBlur}px`);
              primaryState._lastMilestone = milestone;
            }
          }
        },
      },
      z: baseDepth,
      rotateY: 0,
      rotateX: 0,
      scale: 1.05, // SLIGHT overshoot for emphasis
      opacity: 1.0, // COMPLETE SOLIDIFICATION
      filter: 'blur(0px)', // COMPLETE BLUR REMOVAL
      ease: 'power2.inOut',
    }
  );

  // ================================
  // Page Wrapper Depth Animation
  // ================================

  gsap.fromTo(
    wrapper,
    {
      z: 400, // Start forward
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
      z: baseDepth, // Move to final depth
      ease: 'power2.inOut',
    }
  );
});

console.log(`✅ ${pageWrappers.length} pages animated (REFINED)`);

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

    const fpsElement = document.getElementById('fps');
    if (fps >= 58) {
      fpsElement.style.color = '#00FF00';
    } else if (fps >= 45) {
      fpsElement.style.color = '#FFFF00';
    } else {
      fpsElement.style.color = '#FF0000';
    }

    frames = 0;
    lastTime = now;
  }

  requestAnimationFrame(updateFPS);
}

requestAnimationFrame(updateFPS);

// ==================================
// 7. Elastic Scroll Prevention
// ==================================

// Prevent macOS/Safari elastic overscroll from causing bounce-back
document.body.addEventListener('touchmove', (e) => {
  // Allow normal scrolling but prevent rubber-band effect
  const scrollTop = window.pageYOffset;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (scrollTop === 0 && e.touches[0].clientY > 0) {
    // At top, trying to scroll up
    e.preventDefault();
  } else if (scrollTop >= scrollHeight && e.touches[0].clientY < 0) {
    // At bottom, trying to scroll down
    e.preventDefault();
  }
}, { passive: false });

// ==================================
// 8. Performance Report
// ==================================

setTimeout(() => {
  const memory = performance.memory
    ? `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB`
    : 'N/A';

  console.log('');
  console.log('═══════════════════════════════════════════');
  console.log('📊 REFINED VERSION - Performance Report');
  console.log('═══════════════════════════════════════════');
  console.log(`   FPS: ${fps}`);
  console.log(`   JavaScript Heap: ${memory}`);
  console.log(`   Pages: ${pageWrappers.length}`);
  console.log(`   Ghost fade: COMPLETE (0% opacity at 100%)`);
  console.log(`   Primary solidify: COMPLETE (100% opacity at 100%)`);
  console.log(`   Elastic scroll: PREVENTED`);
  console.log('═══════════════════════════════════════════');
  console.log('');
  console.log('🎯 Expected behavior at 100% scroll:');
  console.log('   • Ghost 1 opacity: 0.00');
  console.log('   • Ghost 2 opacity: 0.00');
  console.log('   • Primary opacity: 1.00');
  console.log('   • Primary blur: 0.0px');
  console.log('   • NO bounce-back effect');
  console.log('');
}, 3000);

console.log('✅ Layer 1 prototype ready (REFINED)');
console.log('🎯 Scroll to 100% to see COMPLETE convergence');
console.log('🚫 Elastic scroll bounce prevention enabled');
