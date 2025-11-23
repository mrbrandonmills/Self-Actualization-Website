'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MuseumRoomProps {
  videoSrc?: string;
  posterImage?: string;
  roomTitle: string;
  roomSubtitle?: string;
  children: ReactNode;
  backgroundColor?: string;
}

export default function MuseumRoom({
  videoSrc,
  posterImage,
  roomTitle,
  roomSubtitle,
  children,
  backgroundColor = '#f5f5f0',
}: MuseumRoomProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roomRef.current || !overlayRef.current) return;

    // Pin the room while scrolling through its content
    const pinTrigger = ScrollTrigger.create({
      trigger: roomRef.current,
      start: 'top top',
      end: '+=200%',
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    // Fade in the room title
    gsap.fromTo(
      `.room-title-${roomTitle.replace(/\s+/g, '-')}`,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: roomRef.current,
          start: 'top 60%',
          end: 'top 30%',
          scrub: 1,
        },
      }
    );

    // Video playback sync with scroll (if video exists)
    if (videoRef.current && videoSrc) {
      const video = videoRef.current;

      ScrollTrigger.create({
        trigger: roomRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (video.duration) {
            video.currentTime = video.duration * self.progress;
          }
        },
      });
    }

    return () => {
      pinTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [videoSrc, roomTitle]);

  return (
    <div
      ref={roomRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Video background */}
      {videoSrc && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          poster={posterImage}
          muted
          playsInline
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Gradient overlay for readability */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"
      />

      {/* Room title */}
      <div className={`room-title-${roomTitle.replace(/\s+/g, '-')} absolute top-20 left-0 right-0 z-10 text-center`}>
        <h2 className="text-6xl font-bold text-white drop-shadow-lg tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          {roomTitle}
        </h2>
        {roomSubtitle && (
          <p className="text-xl text-white/90 mt-4 drop-shadow tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
            {roomSubtitle}
          </p>
        )}
      </div>

      {/* Room content (pedestals, etc.) */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
