'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BookPedestalProps {
  title: string;
  author: string;
  coverImage: string;
  description: string;
  price: string;
  glowColor?: string;
}

export default function BookPedestal({
  title,
  author,
  coverImage,
  description,
  price,
  glowColor = '#8A9A5B',
}: BookPedestalProps) {
  const bookRef = useRef<HTMLDivElement>(null);
  const pedestalRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!bookRef.current || !pedestalRef.current) return;

    // Scroll-triggered rotation and reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pedestalRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        markers: false,
      },
    });

    // Book rises and rotates as you scroll
    tl.fromTo(
      bookRef.current,
      {
        y: 100,
        rotationY: -45,
        opacity: 0,
      },
      {
        y: 0,
        rotationY: 0,
        opacity: 1,
        ease: 'power2.out',
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={pedestalRef}
      className="relative flex flex-col items-center justify-center min-h-screen"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pedestal base */}
      <div className="pedestal-base">
        <div className="pedestal-column" />
        <div className="pedestal-top" />
      </div>

      {/* Book on pedestal */}
      <div
        ref={bookRef}
        className="book-container"
        style={{
          transform: isHovered ? 'rotateY(15deg) translateY(-20px)' : 'rotateY(0deg) translateY(0px)',
          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div className="book-cover" style={{ boxShadow: `0 20px 60px ${glowColor}40` }}>
          <img src={coverImage} alt={title} className="w-full h-full object-cover rounded-lg" />

          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at center, ${glowColor}30, transparent 70%)`,
              filter: 'blur(20px)',
            }}
          />
        </div>
      </div>

      {/* Book information */}
      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">{author}</p>
        <p className="book-description">{description}</p>
        <div className="flex items-center gap-4 mt-6">
          <span className="book-price">{price}</span>
          <button className="book-cta">Add to Collection</button>
        </div>
      </div>

      <style jsx>{`
        .pedestal-base {
          position: relative;
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .pedestal-column {
          width: 80px;
          height: 300px;
          background: linear-gradient(180deg, #f5f5f0 0%, #e8e8e0 100%);
          border-radius: 8px;
          box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.1),
            inset 0 2px 4px rgba(255, 255, 255, 0.5);
        }

        .pedestal-top {
          width: 120px;
          height: 20px;
          background: linear-gradient(180deg, #ffffff 0%, #f0f0e8 100%);
          border-radius: 4px;
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        }

        .book-container {
          position: absolute;
          top: 50%;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .book-cover {
          width: 280px;
          height: 400px;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .book-info {
          position: absolute;
          bottom: 10%;
          text-align: center;
          max-width: 500px;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease-out 0.5s forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .book-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #2c3e2c;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .book-author {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          color: #6b7b6b;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .book-description {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          line-height: 1.6;
          color: #4a5a4a;
          margin-bottom: 1.5rem;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        .book-price {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #8a9a5b;
        }

        .book-cta {
          padding: 12px 32px;
          background: linear-gradient(135deg, #8a9a5b 0%, #6b7b4b 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(138, 154, 91, 0.3);
        }

        .book-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(138, 154, 91, 0.4);
        }
      `}</style>
    </div>
  );
}
