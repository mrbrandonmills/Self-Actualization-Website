/**
 * Layer 1: GSAP Prototype — ENHANCED Animation Logic
 * Multi-State Visual Convergence with Mouse Parallax
 */

// ==================================
// 1. GSAP Setup
// ==================================

gsap.registerPlugin(ScrollTrigger);

console.log('✅ GSAP + ScrollTrigger loaded (ENHANCED VERSION)');

// ==================================
// 2. Scroll Progress Indicator
// ==================================

const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;

  progressBar.style.width = `${scrollPercent}%`;
  progressText.textContent = `Scroll: ${Math.round(scrollPercent)}%`;

  console.log(`Scroll: ${Math.round(scrollPercent)}%`); // Debug logging
});

// ==================================
// 3. Mouse Parallax Effect
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
  targetRotationY = mouseX * 5; // Max ±5 degrees
  targetRotationX = -mouseY * 5; // Max ±5 degrees (inverted)
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

console.log('✅ Mouse parallax enabled');

// ==================================
// 4. Multi-State Visual Convergence
// ==================================

const scrollSpacer = document.querySelector('.scroll-spacer');
const pageWrappers = document.querySelectorAll('.page-wrapper');

pageWrappers.forEach((wrapper, pageIndex) => {
  const ghostStates = wrapper.querySelectorAll('.ghost-state');
  const primaryState = wrapper.querySelector('.primary-state');

  // Depth per page (pages further back in scroll)
  const depthPerPage = 200; // INCREASED from 150
  const baseDepth = -pageIndex * depthPerPage;

  console.log(`Page ${pageIndex}: baseDepth = ${baseDepth}px`);

  // ================================
  // Ghost State 1 Animation
  // ================================

  gsap.fromTo(
    ghostStates[0],
    {
      z: baseDepth - 300, // INCREASED from -200
      rotateY: (pageIndex % 2 === 0 ? 1 : -1) * 15, // INCREASED from 5
      scale: 0.85, // REDUCED from 0.95
      opacity: 0.3, // INCREASED from 0.15
      filter: 'blur(25px)', // INCREASED from 20px
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // 1:1 scroll mapping
        onUpdate: (self) => {
          console.log(`Ghost 1 [Page ${pageIndex}]: progress = ${(self.progress * 100).toFixed(1)}%`);
        },
      },
      z: baseDepth - 100,
      rotateY: (pageIndex % 2 === 0 ? 1 : -1) * 3,
      scale: 0.95,
      opacity: (self) => {
        // Exponential decay: ghost fades out as scroll progresses
        const progress = self.progress;
        const opacity = Math.exp(-progress * 6) * 0.3; // INCREASED decay rate
        return opacity;
      },
      filter: (self) => {
        // Blur reduces as ghost fades
        const progress = self.progress;
        const blurAmount = Math.exp(-progress * 6) * 25; // INCREASED
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
      z: baseDepth - 400, // INCREASED from -250
      rotateY: (pageIndex % 2 === 0 ? -1 : 1) * 20, // INCREASED from 7
      scale: 0.8, // REDUCED from 0.92
      opacity: 0.2, // INCREASED from 0.10
      filter: 'blur(30px)', // INCREASED from 15px
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          console.log(`Ghost 2 [Page ${pageIndex}]: progress = ${(self.progress * 100).toFixed(1)}%`);
        },
      },
      z: baseDepth - 150,
      rotateY: (pageIndex % 2 === 0 ? -1 : 1) * 4,
      scale: 0.93,
      opacity: (self) => {
        const progress = self.progress;
        const opacity = Math.exp(-progress * 6) * 0.2; // INCREASED decay rate
        return opacity;
      },
      filter: (self) => {
        const progress = self.progress;
        const blurAmount = Math.exp(-progress * 6) * 30; // INCREASED
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
      scale: 0.8, // REDUCED from 0.9 for more dramatic reveal
      opacity: 0.1, // REDUCED from 0.3
      filter: 'blur(15px)', // INCREASED from 5px
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          console.log(`Primary [Page ${pageIndex}]: progress = ${(self.progress * 100).toFixed(1)}%`);
        },
      },
      z: baseDepth,
      rotateY: 0,
      scale: 1.0,
      opacity: (self) => {
        // Inverse of ghost fade: primary solidifies
        const progress = self.progress;
        const uncertainty = Math.exp(-progress * 6); // INCREASED decay rate
        const opacity = 1 - uncertainty * 0.9; // 0.1 → 1.0 (MORE DRAMATIC)
        return opacity;
      },
      filter: (self) => {
        const progress = self.progress;
        const uncertainty = Math.exp(-progress * 6);
        const blurAmount = uncertainty * 15; // 15px → 0px (MORE DRAMATIC)
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

console.log(`✅ ${pageWrappers.length} pages animated (ENHANCED)`);

// ==================================
// 5. FPS Counter (for debugging)
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
// 6. Mobile Detection & Optimization
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
// 7. Performance Monitoring
// ==================================

// Log performance metrics to console
setTimeout(() => {
  const memory = performance.memory
    ? `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB`
    : 'N/A';

  console.log('📊 Performance Metrics (ENHANCED):');
  console.log(`   FPS: ${fps}`);
  console.log(`   JavaScript Heap: ${memory}`);
  console.log(`   Scroll Height: ${scrollSpacer.offsetHeight}px`);
  console.log(`   Pages Animated: ${pageWrappers.length}`);
  console.log(`   Mouse Parallax: Enabled`);
  console.log(`   Scroll Progress: Tracked`);
}, 3000);

console.log('✅ Layer 1 prototype ready (ENHANCED VERSION)');
console.log('ℹ️  Native browser scroll + Mouse parallax');
console.log('🎯 Scroll down to see DRAMATIC ghost fade convergence');
