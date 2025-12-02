'use client';

import { useEffect, useState } from 'react';
import GhostFade3DScene from '@/components/GhostFade3DScene';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Ghost Fade 3D - Production Page
 * Three.js 3D book with cinematic ghost fade convergence
 * Award-winning scroll experience
 */

export default function GhostFade3DPage() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [currentStage, setCurrentStage] = useState('Uncertainty');
  const [fps, setFps] = useState(60);
  const [diagnostics, setDiagnostics] = useState({
    scrollHeight: 0,
    windowHeight: 0,
    canScroll: false,
  });

  // Stage definitions - SIMPLIFIED MAGICAL JOURNEY
  const stages = [
    { min: 0, max: 15, name: 'Lifting', color: '#8B00FF', subtitle: 'Book rises from surface' },
    { min: 15, max: 30, name: 'Opening', color: '#FFD700', subtitle: 'Book gently opens' },
    { min: 30, max: 55, name: 'Page Flipping', color: '#FF1493', subtitle: 'Smooth magical page turn' },
    { min: 55, max: 75, name: 'Rotating', color: '#00CED1', subtitle: 'Smooth 180° to front cover' },
    { min: 75, max: 100, name: 'Hero Shot', color: '#FFFFFF', subtitle: 'Final reveal - front cover' },
  ];

  useEffect(() => {
    // Update diagnostics
    const updateDiagnostics = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const canScroll = scrollHeight > windowHeight;

      setDiagnostics({
        scrollHeight,
        windowHeight,
        canScroll,
      });

      console.log('🔍 Diagnostics:', {
        scrollHeight: `${scrollHeight}px`,
        windowHeight: `${windowHeight}px`,
        canScroll: canScroll ? '✅ YES' : '❌ NO',
        ratio: (scrollHeight / windowHeight).toFixed(2) + 'x',
      });
    };

    updateDiagnostics();
    window.addEventListener('resize', updateDiagnostics);

    // Scroll progress tracking
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setScrollPercent(percent);

      // Update stage
      for (const stage of stages) {
        if (percent >= stage.min && percent < stage.max) {
          setCurrentStage(stage.name);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    // FPS counter
    let lastTime = performance.now();
    let frames = 0;

    function updateFPS() {
      const now = performance.now();
      frames++;

      if (now >= lastTime + 1000) {
        const currentFps = Math.round((frames * 1000) / (now - lastTime));
        setFps(currentFps);
        frames = 0;
        lastTime = now;
      }

      requestAnimationFrame(updateFPS);
    }

    requestAnimationFrame(updateFPS);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDiagnostics);
    };
  }, []);

  const currentStageData = stages.find(
    (stage) => scrollPercent >= stage.min && scrollPercent < stage.max
  ) || stages[0];

  return (
    <div className="relative w-full min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      {/* Hide footer/navigation for this immersive experience */}
      <style jsx global>{`
        nav, footer {
          display: none !important;
        }
      `}</style>

      {/* Scroll Spacer - EPIC JOURNEY (2500vh) */}
      <div
        id="ghost-fade-scroll-spacer"
        className="pointer-events-none"
        style={{ height: '2500vh' }} // Epic Kasane-style journey
      />

      {/* Three.js 3D Scene (fixed viewport) */}
      <GhostFade3DScene scrollSpacerId="ghost-fade-scroll-spacer" />

      {/* UI Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {/* Scroll Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-white/5">
          <div
            className="h-full transition-all duration-100 ease-linear shadow-[0_0_20px_rgba(212,175,55,0.6)]"
            style={{
              width: `${scrollPercent}%`,
              background: `linear-gradient(90deg,
                #FF6B6B 0%,
                #FF8E53 25%,
                #FFC952 50%,
                #6BCF7F 75%,
                #00FF00 100%
              )`,
            }}
          />
        </div>

        {/* Scroll Percentage (top-left) */}
        <div className="absolute top-6 left-6 bg-black/95 border-2 border-[#D4AF37] rounded-md px-4 py-3 font-mono text-lg font-bold text-[#D4AF37] shadow-[0_4px_30px_rgba(212,175,55,0.4)]">
          Scroll: {Math.round(scrollPercent)}%
        </div>

        {/* Stage Indicator (below scroll %) */}
        <div className="absolute top-[88px] left-6 bg-black/95 border-2 border-[#D4AF37] rounded-md px-4 py-2.5 font-mono text-sm shadow-[0_4px_30px_rgba(212,175,55,0.4)]">
          <strong className="text-[#D4AF37]">Stage:</strong>{' '}
          <span
            className="font-bold text-base"
            style={{ color: currentStageData.color }}
          >
            {currentStage}
          </span>
        </div>

        {/* FPS Counter (top-right) */}
        <div
          className={`absolute top-6 right-6 bg-black/95 border-2 rounded-md px-5 py-3.5 font-mono text-xl font-bold shadow-[0_4px_30px_rgba(0,255,0,0.3)]`}
          style={{
            borderColor: fps >= 58 ? '#00FF00' : fps >= 45 ? '#FFFF00' : '#FF0000',
            color: fps >= 58 ? '#00FF00' : fps >= 45 ? '#FFFF00' : '#FF0000',
          }}
        >
          FPS: {fps}
        </div>

        {/* Scroll Diagnostics (below FPS) */}
        <div className="absolute top-[90px] right-6 bg-black/95 border-2 border-[#D4AF37] rounded-md px-4 py-2.5 font-mono text-xs leading-relaxed">
          <strong className="text-[#D4AF37]">Diagnostics:</strong>
          <div className="text-white/90 mt-1 space-y-0.5">
            <div>Scroll Height: <span className="text-[#00FF00]">{diagnostics.scrollHeight}px</span></div>
            <div>Window Height: <span className="text-[#00FF00]">{diagnostics.windowHeight}px</span></div>
            <div>Can Scroll: <span style={{ color: diagnostics.canScroll ? '#00FF00' : '#FF0000' }}>
              {diagnostics.canScroll ? '✅ YES' : '❌ NO'}
            </span></div>
          </div>
        </div>

        {/* Instructions (bottom-left) - Simplified Journey */}
        <div className="absolute bottom-6 left-6 bg-black/95 border-2 border-[#FF1493] rounded-md px-5 py-4 font-mono text-sm leading-relaxed shadow-[0_4px_30px_rgba(255,20,147,0.4)] max-w-sm">
          <strong className="block text-[#FF1493] text-base mb-2.5 font-bold">
            🪄 Simplified Magical Journey:
          </strong>
          <div className="text-white/90 space-y-1.5">
            <div>1. Scroll SLOWLY for smooth magic</div>
            <div>2. Book levitates (0-15%)</div>
            <div>3. Opens gently (15-30%)</div>
            <div>4. <span className="text-[#FF1493]">Pages flip smoothly</span> (30-55%)</div>
            <div>5. Rotates 180° to front (55-75%)</div>
            <div>6. Final hero reveal (75-100%)</div>
            <div>7. Real 3D + 900 particles ✨</div>
            <div>8. Camera stays centered - book does the work!</div>
          </div>
        </div>

        {/* Stage Markers (right side) - Enhanced for 3-book system */}
        <div className="absolute right-8 top-0 h-full w-[300px] pointer-events-none">
          {stages.map((stage, index) => (
            <div
              key={stage.name}
              className="absolute right-0 bg-black/95 rounded-md px-3.5 py-3 font-mono text-xs leading-relaxed shadow-[0_8px_30px_rgba(255,215,0,0.3)] border-2"
              style={{
                top: `${stage.min + (stage.max - stage.min) / 2}%`,
                transform: 'translateY(-50%)',
                borderColor: stage.color,
                backgroundColor: `${stage.color}20`,
                boxShadow: `0 0 20px ${stage.color}40`,
              }}
            >
              <strong
                className="block text-sm mb-1 font-bold"
                style={{ color: stage.color }}
              >
                STAGE {index + 1}
              </strong>
              <div className="text-white font-semibold">{stage.name}</div>
              <div className="text-white/70 text-[10px] mt-1.5 italic">
                {stage.subtitle}
              </div>
            </div>
          ))}
        </div>

        {/* Title (center, fades out on scroll) - Magical Journey */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-500"
          style={{
            opacity: Math.max(0, 1 - scrollPercent / 20),
            pointerEvents: scrollPercent > 20 ? 'none' : 'auto',
          }}
        >
          <h1 className="font-serif text-7xl font-bold text-[#FF1493] tracking-tight mb-4 drop-shadow-[0_8px_40px_rgba(255,20,147,0.8)]">
            Random Acts of
          </h1>
          <h2 className="font-serif text-6xl font-bold text-[#FFD700] tracking-tight mb-4 drop-shadow-[0_8px_40px_rgba(255,215,0,0.6)]">
            Self-Actualization
          </h2>
          <p className="font-sans text-2xl text-white/80 tracking-wide font-semibold">
            Building Block A & Building Block B
          </p>
          <p className="font-mono text-base text-[#8B00FF] mt-8 animate-pulse font-bold">
            🪄 Scroll to witness magical page-flipping 🪄
          </p>
        </div>
      </div>
    </div>
  );
}
