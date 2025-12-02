/**
 * Layer 2: View Transitions Prototype — Logic
 * View Transitions API + Safari Fallback
 */

// ==================================
// 1. Feature Detection
// ==================================

const supportsViewTransitions = 'startViewTransition' in document;

const supportStatus = document.getElementById('support-status');
if (supportsViewTransitions) {
  supportStatus.textContent = 'Supported ✅';
  supportStatus.classList.add('supported');
  console.log('✅ View Transitions API supported');
} else {
  supportStatus.textContent = 'Fallback (Safari) ⚠️';
  supportStatus.classList.add('fallback');
  console.log('⚠️ View Transitions API not supported — Using fallback');
}

// ==================================
// 2. Page State Management
// ==================================

let currentPageIndex = 0;
const pages = document.querySelectorAll('.page');
const navButtons = document.querySelectorAll('.nav-btn');

// Set initial active button
navButtons[currentPageIndex].classList.add('active');

// ==================================
// 3. Page Navigation Function
// ==================================

function navigateToPage(pageIndex) {
  if (pageIndex === currentPageIndex) {
    console.log(`Already on page ${pageIndex}`);
    return; // No-op if clicking current page
  }

  console.log(`Navigating from page ${currentPageIndex} → ${pageIndex}`);

  const oldPageIndex = currentPageIndex;
  const newPageIndex = pageIndex;

  // Update DOM state
  const updateDOM = () => {
    // Hide old page
    pages[oldPageIndex].classList.remove('active');

    // Show new page
    pages[newPageIndex].classList.add('active');

    // Update navigation buttons
    navButtons[oldPageIndex].classList.remove('active');
    navButtons[newPageIndex].classList.add('active');

    // Update current page index
    currentPageIndex = newPageIndex;

    console.log(`✅ DOM updated: page ${newPageIndex} is now active`);
  };

  // ==================================
  // 4. View Transition (with fallback)
  // ==================================

  if (supportsViewTransitions) {
    // Use View Transitions API
    document.startViewTransition(() => {
      updateDOM();
    });
    console.log('🎬 View transition started');
  } else {
    // Safari fallback: instant update
    updateDOM();
    console.log('⚡ Instant transition (fallback)');
  }
}

// ==================================
// 5. Navigation Button Event Listeners
// ==================================

navButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    navigateToPage(index);
  });
});

console.log('✅ Navigation buttons initialized');

// ==================================
// 6. Layout Shift Monitor (CLS)
// ==================================

let clsValue = 0;
const clsElement = document.getElementById('cls-value');

if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
        clsValue += entry.value;
        clsElement.textContent = clsValue.toFixed(4);

        // Color code CLS
        if (clsValue === 0) {
          clsElement.className = ''; // Green (default)
        } else if (clsValue < 0.1) {
          clsElement.classList.add('warning'); // Yellow
        } else {
          clsElement.classList.add('fail'); // Red
        }

        console.log(`⚠️ Layout shift detected: ${entry.value.toFixed(4)}, Total CLS: ${clsValue.toFixed(4)}`);
      }
    }
  });

  observer.observe({ type: 'layout-shift', buffered: true });
  console.log('✅ CLS monitor active');
} else {
  console.log('⚠️ PerformanceObserver not supported — CLS monitoring disabled');
  clsElement.textContent = 'N/A';
}

// ==================================
// 7. Keyboard Navigation (Optional)
// ==================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    // Previous page
    const prevIndex = currentPageIndex > 0 ? currentPageIndex - 1 : 0;
    navigateToPage(prevIndex);
  } else if (e.key === 'ArrowRight') {
    // Next page
    const nextIndex = currentPageIndex < pages.length - 1 ? currentPageIndex + 1 : currentPageIndex;
    navigateToPage(nextIndex);
  }
});

console.log('✅ Keyboard navigation enabled (← / →)');

// ==================================
// 8. Performance Logging
// ==================================

setTimeout(() => {
  console.log('📊 Performance Metrics:');
  console.log(`   View Transitions API: ${supportsViewTransitions ? 'Supported' : 'Fallback'}`);
  console.log(`   Total Pages: ${pages.length}`);
  console.log(`   CLS: ${clsValue.toFixed(4)}`);
  console.log(`   Browser: ${navigator.userAgent}`);
}, 2000);

console.log('✅ Layer 2 prototype ready');
