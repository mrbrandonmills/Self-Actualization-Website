'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface EntranceSequenceProps {
  onComplete: () => void;
  videoSrc?: string;
}

export default function EntranceSequence({ onComplete, videoSrc }: EntranceSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Auto-play video on mount
    if (videoRef.current) {
      videoRef.current.play().catch((err) => console.log('Autoplay prevented:', err));
    }

    // Fade out entrance after video ends or 8 seconds
    const timer = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 2,
        ease: 'power2.inOut',
        onComplete: () => {
          onComplete();
        },
      });
    }, videoEnded ? 500 : 8000);

    return () => clearTimeout(timer);
  }, [videoEnded, onComplete]);

  const handleSkip = () => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        onComplete();
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      {/* Entrance video */}
      {videoSrc ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          onEnded={() => setVideoEnded(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        // Fallback: Text-based entrance
        <div className="text-center">
          <h1 className="text-7xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome
          </h1>
          <p className="text-2xl text-white/80 tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
            To the Museum of Self-Actualization
          </p>
        </div>
      )}

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-10 right-10 px-6 py-3 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full hover:bg-white/20 transition-all duration-300"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Enter Museum →
      </button>

      {/* Entrance vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  );
}
