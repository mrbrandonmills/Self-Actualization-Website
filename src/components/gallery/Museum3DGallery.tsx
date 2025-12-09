/**
 * Museum3D Gallery - Award-Winning 3D Book Display
 * Interactive museum-quality gallery with dramatic lighting
 * Click books to preview flip book, not direct Amazon links
 */

'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';
import { AnimatePresence } from 'framer-motion';
import { FlipBook } from '@/components/books/FlipBook';
import { Book, createAffiliateLink, formatBookPrice } from '@/data/books';

interface Museum3DGalleryProps {
  books: Book[];
  title?: string;
  subtitle?: string;
}

/**
 * Individual 3D Book Display with Pedestal
 */
function Book3D({
  book,
  position,
  onClick
}: {
  book: Book;
  position: [number, number, number];
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Subtle rotation on hover
      if (hovered) {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          Math.PI * 0.15,
          0.1
        );
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          0,
          0.1
        );
      }
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Museum Pedestal */}
      <mesh position={[0, -1.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 1, 2, 32]} />
        <meshStandardMaterial
          color="#05201f"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Pedestal Top Plate */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.9, 0.8, 0.1, 32]} />
        <meshStandardMaterial
          color="#C9A050"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Book with Cover Texture */}
      <Float
        speed={hovered ? 3 : 1}
        rotationIntensity={hovered ? 1 : 0.2}
        floatIntensity={hovered ? 1 : 0.3}
      >
        <mesh
          castShadow
          receiveShadow
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
          scale={hovered ? 1.15 : 1}
        >
          {/* Book Geometry */}
          <boxGeometry args={[2, 2.8, 0.3]} />
          <meshStandardMaterial
            map={useTexture(book.coverImage)}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>

        {/* Glow Effect on Hover */}
        {hovered && (
          <pointLight
            position={[0, 0, 2]}
            intensity={2}
            distance={5}
            color="#C9A050"
          />
        )}
      </Float>

      {/* Price Label */}
      <mesh position={[0, -0.7, 1]}>
        <planeGeometry args={[1.5, 0.4]} />
        <meshStandardMaterial
          color="#f5f3ef"
          roughness={0.1}
        />
      </mesh>

      {/* Spotlight */}
      <spotLight
        position={[0, 5, 2]}
        angle={0.3}
        penumbra={0.5}
        intensity={hovered ? 2 : 1}
        castShadow
        color={hovered ? "#C9A050" : "#ffffff"}
      />
    </group>
  );
}

/**
 * Custom texture loader hook
 */
function useTexture(url: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(url, (loadedTexture) => {
      loadedTexture.flipY = false;
      setTexture(loadedTexture);
    });
  }, [url]);

  return texture;
}

/**
 * Camera Rig with Smooth Scroll
 */
function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (cameraRef.current) {
      // Smooth camera movement based on scroll
      cameraRef.current.position.x = THREE.MathUtils.lerp(
        cameraRef.current.position.x,
        scrollProgress * 20 - 10,
        0.1
      );
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 2, 12]}
      fov={50}
    />
  );
}

/**
 * Main Museum 3D Gallery Component
 */
export function Museum3DGallery({ books, title, subtitle }: Museum3DGalleryProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Get pages for selected book (placeholder - will be dynamic when we have all blocks)
  const getBookPages = (book: Book) => {
    // For now, all books use Block A pages
    return Array.from({ length: 19 }, (_, i) => `/books/block-a/${i + 1}.png`);
  };

  return (
    <>
      {/* 3D Canvas */}
      <div className="museum-3d-container">
        {/* Header */}
        <div className="museum-header">
          {subtitle && (
            <p className="label text-accent mb-md animate-fade-in">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="h2 mb-xl text-gold animate-slide-up">
              {title}
            </h2>
          )}
          <p className="lead text-secondary max-w-2xl mx-auto mb-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Click any book to preview the full content before purchasing
          </p>
        </div>

        {/* 3D Scene */}
        <div className="canvas-wrapper">
          <Canvas
            shadows
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <CameraRig scrollProgress={scrollProgress} />

              {/* Lighting Setup */}
              <ambientLight intensity={0.3} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />

              {/* Environment */}
              <Environment preset="city" />

              {/* Floor */}
              <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -2.5, 0]}
                receiveShadow
              >
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial
                  color="#05201f"
                  roughness={0.1}
                  metalness={0.9}
                />
              </mesh>

              {/* Books Display */}
              {books.map((book, index) => (
                <Book3D
                  key={book.id}
                  book={book}
                  position={[
                    (index - books.length / 2) * 4.5,
                    0,
                    0
                  ]}
                  onClick={() => setSelectedBook(book)}
                />
              ))}
            </Suspense>
          </Canvas>
        </div>

        {/* Navigation Hint */}
        <div className="navigation-hint">
          <p className="text-sm text-accent">
            ← Drag or scroll to explore → | Click books to preview
          </p>
        </div>

        {/* Book Cards Below Canvas (2D Info) */}
        <div className="book-cards-grid">
          {books.map((book, index) => (
            <div
              key={book.id}
              className="book-card"
              onClick={() => setSelectedBook(book)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="book-card-image">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="cover-image"
                />
                <div className="overlay">
                  <button className="preview-btn">
                    📖 Preview Book
                  </button>
                </div>
              </div>

              <div className="book-card-content">
                <p className="category-badge">{book.category}</p>
                <h3 className="book-title">{book.title}</h3>
                <p className="book-subtitle">{book.subtitle}</p>
                <p className="book-price">{formatBookPrice(book.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flip Book Modal */}
      <AnimatePresence>
        {selectedBook && (
          <FlipBook
            pages={getBookPages(selectedBook)}
            bookTitle={selectedBook.title}
            amazonUrl={createAffiliateLink(selectedBook.amazonUrl)}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        .museum-3d-container {
          width: 100%;
          min-height: 100vh;
          background: var(--color-black-green);
          padding: var(--space-4xl) var(--space-md);
        }

        .museum-header {
          text-align: center;
          margin-bottom: var(--space-3xl);
          position: relative;
          z-index: 10;
        }

        .canvas-wrapper {
          width: 100%;
          height: 70vh;
          min-height: 600px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: var(--space-3xl);
          box-shadow:
            0 20px 60px rgba(201, 160, 80, 0.15),
            0 0 100px rgba(201, 160, 80, 0.1) inset;
          border: 1px solid rgba(201, 160, 80, 0.2);
        }

        .navigation-hint {
          text-align: center;
          margin-bottom: var(--space-4xl);
          opacity: 0.7;
        }

        /* Book Cards Grid (2D Info Section) */
        .book-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--space-2xl);
          max-width: var(--max-width-2xl);
          margin: 0 auto;
          padding: var(--space-2xl) 0;
        }

        .book-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
          border: 1px solid rgba(201, 160, 80, 0.1);
          animation: scaleIn 0.6s ease-out forwards;
          opacity: 0;
          transform: scale(0.8);
        }

        @keyframes scaleIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .book-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow:
            0 20px 60px rgba(201, 160, 80, 0.3),
            0 0 60px rgba(201, 160, 80, 0.2);
          border-color: rgba(201, 160, 80, 0.5);
        }

        .book-card-image {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: #fff;
        }

        .cover-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .book-card:hover .cover-image {
          transform: scale(1.05);
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(5, 32, 31, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .book-card:hover .overlay {
          opacity: 1;
        }

        .preview-btn {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #C9A050, #d4af37);
          border: none;
          border-radius: 8px;
          color: #05201f;
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(201, 160, 80, 0.4);
        }

        .preview-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(201, 160, 80, 0.6);
        }

        .book-card-content {
          padding: var(--space-lg);
          color: var(--color-white-cream);
        }

        .category-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: rgba(201, 160, 80, 0.15);
          color: #C9A050;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 4px;
          margin-bottom: var(--space-sm);
        }

        .book-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #C9A050;
          margin-bottom: var(--space-xs);
          line-height: 1.3;
        }

        .book-subtitle {
          font-size: 0.875rem;
          color: rgba(245, 243, 239, 0.7);
          margin-bottom: var(--space-md);
          line-height: 1.5;
        }

        .book-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-white-cream);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .canvas-wrapper {
            height: 50vh;
            min-height: 400px;
          }

          .book-cards-grid {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
          }

          .museum-3d-container {
            padding: var(--space-2xl) var(--space-md);
          }
        }
      `}</style>
    </>
  );
}
