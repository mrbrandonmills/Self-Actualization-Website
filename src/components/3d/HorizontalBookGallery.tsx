/**
 * HorizontalBookGallery - Based on proven r3f gallery pattern
 * Horizontal scroll through book covers with parallax effects
 * Template from: https://github.com/shubh0107/image-gallery-with-react-three-fiber
 */

'use client';

import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Image as ImageImpl, useScroll } from '@react-three/drei';

interface BookImageProps {
  position: [number, number, number];
  scale: [number, number, number];
  url: string;
}

function BookImage({ position, scale, url }: BookImageProps) {
  const ref = useRef<any>(null);
  const group = useRef<THREE.Group>(null);
  const data = useScroll();

  useFrame((state, delta) => {
    if (!group.current || !ref.current) return;

    // Parallax effect - books move forward/backward based on scroll velocity
    group.current.position.z = THREE.MathUtils.damp(
      group.current.position.z,
      Math.max(0, data.delta * 50),
      4,
      delta
    );

    // Grayscale effect - less saturated when scrolling fast
    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      Math.max(0, 1 - data.delta * 1000),
      4,
      delta
    );
  });

  return (
    <group ref={group}>
      <ImageImpl ref={ref} position={position} scale={scale} url={url} />
    </group>
  );
}

interface BookPageProps {
  position: [number, number, number];
  m?: number; // margin
}

function BookPage({ position, m = 0.4 }: BookPageProps) {
  const { width } = useThree((state) => state.viewport);
  const w = width < 10 ? 1.5 / 3 : 1 / 3;

  return (
    <group position={position}>
      {/* Left book */}
      <BookImage
        position={[-width * w, 0, -1]}
        scale={[width * w - m * 2, 5, 1]}
        url="/textures/books/block-a-b-cover.png"
      />

      {/* Center book */}
      <BookImage
        position={[0, 0, 0]}
        scale={[width * w - m * 2, 5, 1]}
        url="/textures/books/block-c-cover.jpg"
      />

      {/* Right book */}
      <BookImage
        position={[width * w, 0, 1]}
        scale={[width * w - m * 2, 5, 1]}
        url="/textures/books/block-a-b-cover.png"
      />
    </group>
  );
}

export function HorizontalBookPages() {
  const { width } = useThree((state) => state.viewport);

  return (
    <>
      {/* Page 1 */}
      <BookPage position={[-width * 1, 0, 0]} />

      {/* Page 2 */}
      <BookPage position={[width * 0, 0, 0]} />

      {/* Page 3 */}
      <BookPage position={[width * 1, 0, 0]} />

      {/* Page 4 */}
      <BookPage position={[width * 2, 0, 0]} />

      {/* Page 5 */}
      <BookPage position={[width * 3, 0, 0]} />

      {/* Page 6 */}
      <BookPage position={[width * 4, 0, 0]} />
    </>
  );
}
