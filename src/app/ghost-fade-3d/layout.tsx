import type { Metadata } from 'next';

/**
 * Custom layout for Ghost Fade 3D page
 * Removes SmoothScroll wrapper and navigation to allow native scroll
 * Required for GSAP ScrollTrigger to work properly
 */

export const metadata: Metadata = {
  title: 'Ghost Fade 3D - Blocks A & B | The Self Actualized Life',
  description:
    'Experience cinematic scroll-driven 3D transformation. Watch multiple possibilities converge into singular clarity.',
};

export default function GhostFade3DLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
