/**
 * LoadingScreen - Elegant Science-Themed Loading Experience
 * Bunsen burner heating water until boiling (100% loaded)
 * Fits "Laboratory of Life" theme perfectly
 */

'use client';

import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  progress: number;
  onComplete?: () => void;
}

export function LoadingScreen({ progress, onComplete }: LoadingScreenProps) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      setIsComplete(true);
      // Delay before calling onComplete for exit animation
      setTimeout(() => {
        onComplete?.();
      }, 1000);
    }
  }, [progress, isComplete, onComplete]);

  // Water temperature rises with progress (20°C to 100°C)
  const temperature = Math.round(20 + (progress * 0.8));

  // Bubbles start appearing at 70% (70°C+)
  const showBubbles = progress >= 70;

  // Steam appears at 95% (boiling point)
  const showSteam = progress >= 95;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#e8e6e1] via-[#f0eee9] to-[#f5f3ef] transition-opacity duration-1000 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ paddingTop: '6rem' }}
    >
      {/* Laboratory Title */}
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-bold text-[var(--olive-dark)]/90 mb-3">
          The Laboratory of Life
        </h1>
      </div>

      {/* Bunsen Burner + Beaker Setup */}
      <div className="relative w-80 h-96">

        {/* Steam particles (when boiling) */}
        {showSteam && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-40 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 left-1/2 w-3 h-3 bg-white/40 rounded-full animate-steam"
                style={{
                  left: `${40 + Math.random() * 20}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${2 + Math.random()}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Beaker */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 h-56">
          {/* Beaker glass outline */}
          <div className="absolute inset-0 border-4 border-[var(--olive-dark)]/30 rounded-b-3xl overflow-hidden backdrop-blur-sm bg-white/20">

            {/* Measurement markings */}
            <div className="absolute left-4 top-12 text-[var(--olive-dark)]/40 text-sm font-mono">
              100ml
            </div>
            <div className="absolute left-4 top-28 text-[var(--olive-dark)]/40 text-sm font-mono">
              50ml
            </div>

            {/* Water filling up */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#4A9EDB]/60 via-[#6BB6E8]/50 to-[#8FCEF0]/40 transition-all duration-300"
              style={{
                height: `${progress}%`,
              }}
            >
              {/* Bubbles when heating */}
              {showBubbles && (
                <>
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bottom-0 w-2 h-2 bg-white/50 rounded-full animate-bubble"
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Beaker spout */}
            <div className="absolute top-8 -right-2 w-8 h-12 border-t-4 border-r-4 border-b-4 border-[var(--olive-dark)]/30 rounded-r-lg" />
          </div>
        </div>

        {/* Bunsen Burner Base */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-20 h-32">
          {/* Burner tube */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-24 bg-gradient-to-b from-[var(--olive-dark)] to-[#4a3f35] rounded-t-md shadow-lg" />

          {/* Gas control valve */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-12 h-3 bg-[var(--olive-dark)]/80 rounded-full" />

          {/* Base */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-8 bg-gradient-to-t from-[#4a3f35] to-[var(--olive-dark)] rounded-lg shadow-xl" />
        </div>

        {/* Flame */}
        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 w-16 h-24">
          {/* Outer flame (orange) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-20 bg-gradient-to-t from-[#FF6B35] via-[#FFA500] to-transparent rounded-full opacity-80 animate-flame" />

          {/* Inner flame (blue core) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-12 bg-gradient-to-t from-[#4A9EDB] via-[#6BB6E8] to-transparent rounded-full animate-flame-core" />
        </div>
      </div>

      {/* Temperature & Progress Display */}
      <div className="mt-16 text-center">
        <div className="text-6xl font-bold text-[var(--accent-warm)]/90 mb-2 font-mono">
          {temperature}°C
        </div>
        <div className="text-lg text-[var(--olive-dark)]/50 mb-4">
          {progress < 70 && 'Heating...'}
          {progress >= 70 && progress < 95 && 'Approaching boiling point...'}
          {progress >= 95 && progress < 100 && 'Boiling!'}
          {progress === 100 && 'Experiment Ready'}
        </div>

        {/* Progress bar */}
        <div className="w-80 h-2 bg-[var(--olive-dark)]/20 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-[#FF6B35] via-[var(--accent-warm)] to-[#4A9EDB] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes steam {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-160px) scale(2);
            opacity: 0;
          }
        }

        @keyframes bubble {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(-200px) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes flame {
          0%, 100% {
            transform: translateX(-50%) scaleY(1) scaleX(1);
            opacity: 0.8;
          }
          50% {
            transform: translateX(-50%) scaleY(1.1) scaleX(0.95);
            opacity: 1;
          }
        }

        @keyframes flame-core {
          0%, 100% {
            transform: translateX(-50%) scaleY(1);
            opacity: 0.9;
          }
          50% {
            transform: translateX(-50%) scaleY(1.15);
            opacity: 1;
          }
        }

        .animate-steam {
          animation: steam linear infinite;
        }

        .animate-bubble {
          animation: bubble linear infinite;
        }

        .animate-flame {
          animation: flame 1.5s ease-in-out infinite;
        }

        .animate-flame-core {
          animation: flame-core 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
