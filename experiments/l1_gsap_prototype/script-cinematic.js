/**
 * Layer 1: CINEMATIC Animation Logic
 * 5-Stage Ghost Fade Convergence Journey
 * Award-Winning Scroll Experience
 */

// ==================================
// 1. GSAP Setup
// ==================================

gsap.registerPlugin(ScrollTrigger);

console.log('✅ GSAP + ScrollTrigger loaded (CINEMATIC VERSION)');
console.log('🎬 5-stage transformation journey activated');
console.log('📏 Scroll distance: 800vh (3x longer)');

// ==================================
// 2. Scroll Progress & Stage Tracking
// ==================================

const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const stageIndicator = document.getElementById('stage-name');

const stages = [
  { min: 0, max: 20, name: 'Uncertainty', color: '#FF6B6B' },
  { min: 20, max: 40, name: 'Ghost 2 Fading', color: '#FF8E53' },
  { min: 40, max: 60, name: 'Ghost 1 Fading', color: '#FFC952' },
  { min: 60, max: 85, name: 'Primary Solidifying', color: '#6BCF7F' },
  { min: 85, max: 100, name: 'Mastery', color: '#00FF00' },
];

let currentStage = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  progressBar.style.width = `${scrollPercent}%`;
  progressText.textContent = `Scroll: ${Math.round(scrollPercent)}%`;

  // Update stage indicator
  for (let i = 0; i < stages.length; i++) {
    if (scrollPercent >= stages[i].min && scrollPercent < stages[i].max) {
      if (currentStage !== i) {
        stageIndicator.textContent = stages[i].name;
        stageIndicator.style.color = stages[i].color;
        currentStage = i;
        console.log(`🎬 STAGE ${i + 1}: ${stages[i].name} (${Math.round(scrollPercent)}%)`);
      }
      break;
    }
  }
});

// ==================================
// 3. Real-time State Display
// ==================================

const ghost1OpacityDisplay = document.getElementById('ghost1-opacity');
const ghost2OpacityDisplay = document.getElementById('ghost2-opacity');
const primaryOpacityDisplay = document.getElementById('primary-opacity');
const primaryBlurDisplay = document.getElementById('primary-blur');

// ==================================
// 4. Mouse Parallax (Subtle)
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

  // Very subtle parallax for cinematic feel
  targetRotationY = mouseX * 2; // Max ±2 degrees
  targetRotationX = -mouseY * 2;
});

function updateMouseParallax() {
  currentRotationY += (targetRotationY - currentRotationY) * 0.05;
  currentRotationX += (targetRotationX - currentRotationX) * 0.05;

  gsap.set(pagesContainer, {
    rotationY: currentRotationY,
    rotationX: currentRotationX,
  });

  requestAnimationFrame(updateMouseParallax);
}

updateMouseParallax();

// ==================================
// 5. CINEMATIC MULTI-STAGE CONVERGENCE
// ==================================

const scrollSpacer = document.querySelector('.scroll-spacer');
const pageWrappers = document.querySelectorAll('.page-wrapper');

console.log(`🎬 Animating ${pageWrappers.length} pages with cinematic staging`);

pageWrappers.forEach((wrapper, pageIndex) => {
  const ghostStates = wrapper.querySelectorAll('.ghost-state');
  const primaryState = wrapper.querySelector('.primary-state');

  const depthPerPage = 300; // INCREASED depth
  const baseDepth = -pageIndex * depthPerPage;

  // ================================
  // GHOST STATE 2: Fades EARLY (Stage 2: 20-50%)
  // ================================

  gsap.fromTo(
    ghostStates[1],
    {
      z: baseDepth - 700,
      rotateY: (pageIndex % 2 === 0 ? -1 : 1) * 40,
      rotateX: 15,
      scale: 0.5,
      opacity: 0.6,
      filter: 'blur(50px)',
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: '40% bottom', // Fades out by 40% scroll
        scrub: 2, // Slower, more cinematic
        invalidateOnRefresh: true,
      },
      z: baseDepth,
      rotateY: 0,
      rotateX: 0,
      scale: 1.0,
      opacity: 0, // COMPLETE fade
      filter: 'blur(0px)',
      ease: 'power3.out', // Dramatic ease-out
      onUpdate: function () {
        if (pageIndex === 0) {
          const progress = this.progress();
          const opacity = (0.6 * (1 - progress)).toFixed(2);
          ghost2OpacityDisplay.textContent = opacity;
        }
      },
    }
  );

  // ================================
  // GHOST STATE 1: Fades MID (Stage 3: 40-70%)
  // ================================

  gsap.fromTo(
    ghostStates[0],
    {
      z: baseDepth - 600,
      rotateY: (pageIndex % 2 === 0 ? 1 : -1) * 35,
      rotateX: -12,
      scale: 0.55,
      opacity: 0.6,
      filter: 'blur(50px)',
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: '20% top', // Starts fading at 20%
        end: '60% bottom', // Fades out by 60% scroll
        scrub: 2,
        invalidateOnRefresh: true,
      },
      z: baseDepth,
      rotateY: 0,
      rotateX: 0,
      scale: 1.0,
      opacity: 0, // COMPLETE fade
      filter: 'blur(0px)',
      ease: 'power3.out',
      onUpdate: function () {
        if (pageIndex === 0) {
          const progress = this.progress();
          const opacity = (0.6 * (1 - progress)).toFixed(2);
          ghost1OpacityDisplay.textContent = opacity;
        }
      },
    }
  );

  // ================================
  // PRIMARY STATE: 3-Stage Solidification
  // Stage 1 (0-50%): Invisible
  // Stage 2 (50-85%): Opacity increases (0 → 1)
  // Stage 3 (85-100%): Blur removes (40px → 0px)
  // ================================

  // Timeline for primary state (multi-stage)
  const primaryTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: scrollSpacer,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2, // Slower, more cinematic
      invalidateOnRefresh: true,
    },
  });

  primaryTimeline
    // Stage 1 (0-50%): Stays invisible while ghosts fade
    .fromTo(
      primaryState,
      {
        z: baseDepth,
        rotateY: 0,
        rotateX: 0,
        scale: 0.5,
        opacity: 0,
        filter: 'blur(40px)',
      },
      {
        z: baseDepth,
        rotateY: 0,
        rotateX: 0,
        scale: 0.6,
        opacity: 0, // STAYS invisible
        filter: 'blur(40px)', // STAYS blurred
        duration: 0.5, // Takes 50% of timeline
        ease: 'none',
      }
    )
    // Stage 2 (50-85%): Opacity increases (0 → 1)
    .to(primaryState, {
      scale: 0.95,
      opacity: 1.0, // FULL opacity
      filter: 'blur(40px)', // STILL blurred
      duration: 0.35, // Takes 35% of timeline
      ease: 'power2.inOut',
      onUpdate: function () {
        if (pageIndex === 0) {
          const totalProgress = primaryTimeline.scrollTrigger.progress;
          let opacity, blur;

          if (totalProgress < 0.5) {
            opacity = 0;
            blur = 40;
          } else if (totalProgress < 0.85) {
            const stageProgress = (totalProgress - 0.5) / 0.35;
            opacity = stageProgress;
            blur = 40;
          } else {
            opacity = 1.0;
            const stageProgress = (totalProgress - 0.85) / 0.15;
            blur = 40 * (1 - stageProgress);
          }

          primaryOpacityDisplay.textContent = opacity.toFixed(2);
          primaryBlurDisplay.textContent = `${blur.toFixed(1)}px`;
        }
      },
    })
    // Stage 3 (85-100%): Blur removes (40px → 0px)
    .to(primaryState, {
      scale: 1.08, // SLIGHT overshoot
      opacity: 1.0, // Maintains full opacity
      filter: 'blur(0px)', // COMPLETE blur removal
      duration: 0.15, // Takes final 15% of timeline
      ease: 'power2.out',
    });

  // ================================
  // Page Wrapper Depth Animation
  // ================================

  gsap.fromTo(
    wrapper,
    {
      z: 500,
    },
    {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
        invalidateOnRefresh: true,
      },
      z: baseDepth,
      ease: 'power2.inOut',
    }
  );
});

console.log(`✅ ${pageWrappers.length} pages animated (CINEMATIC)`);
console.log('🎬 Staged convergence: Ghost 2 → Ghost 1 → Primary');

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
// 7. Performance Report
// ==================================

setTimeout(() => {
  const memory = performance.memory
    ? `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB`
    : 'N/A';

  console.log('');
  console.log('═══════════════════════════════════════════');
  console.log('🎬 CINEMATIC VERSION - Performance Report');
  console.log('═══════════════════════════════════════════');
  console.log(`   FPS: ${fps}`);
  console.log(`   JavaScript Heap: ${memory}`);
  console.log(`   Scroll Distance: 800vh (3x longer)`);
  console.log(`   Pages: ${pageWrappers.length}`);
  console.log('');
  console.log('🎭 5-Stage Convergence Timeline:');
  console.log('   Stage 1 (0-20%):   Uncertainty (all visible)');
  console.log('   Stage 2 (20-40%):  Ghost 2 fading');
  console.log('   Stage 3 (40-60%):  Ghost 1 fading');
  console.log('   Stage 4 (60-85%):  Primary solidifying');
  console.log('   Stage 5 (85-100%): Primary sharpening');
  console.log('');
  console.log('📊 Final State (100% scroll):');
  console.log('   Ghost 1: 0.00 opacity');
  console.log('   Ghost 2: 0.00 opacity');
  console.log('   Primary: 1.00 opacity, 0.0px blur');
  console.log('═══════════════════════════════════════════');
  console.log('');
}, 3000);

console.log('✅ Layer 1 prototype ready (CINEMATIC)');
console.log('🎬 Scroll SLOWLY to experience 5-stage transformation');
console.log('⏱️  3x longer journey for award-winning impact');
