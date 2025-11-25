/**
 * BookCard3D Component
 * Phase 3: CSS 3D Book Cards
 *
 * Photorealistic 3D book card with:
 * - Visible spine and page thickness
 * - Aged paper colors (#F8F4E8)
 * - 4-layer shadow system for depth
 * - Smooth hover interactions
 * - GPU-accelerated CSS 3D transforms
 *
 * Inspired by Kasane Keyboard's 3D card system
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './book-card-3d.module.css'

export interface BookCard3DProps {
  title: string
  author: string
  coverImage: string
  pages: number
  width?: number
  height?: number
}

export function BookCard3D({
  title,
  author,
  coverImage,
  pages,
  width = 300,
  height = 450,
}: BookCard3DProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Calculate page thickness (20 visible page edges)
  const pageEdges = Math.min(pages, 20)

  return (
    <div
      className={styles.bookCard3D}
      style={{ width: `${width}px`, height: `${height}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${styles.bookContainer} ${isHovered ? styles.hovered : ''}`}>
        {/* Front Cover */}
        <div className={styles.bookCover}>
          <div className={styles.coverImageWrapper}>
            <Image
              src={coverImage}
              alt={`${title} by ${author}`}
              fill
              sizes={`${width}px`}
              className={styles.coverImage}
            />
          </div>

          {/* Cover overlay for texture/aging */}
          <div className={styles.coverOverlay} />

          {/* Title and author embossed on cover */}
          <div className={styles.coverText}>
            <h3 className={styles.coverTitle}>{title}</h3>
            <p className={styles.coverAuthor}>{author}</p>
          </div>
        </div>

        {/* Spine (right edge, rotated 90deg) */}
        <div className={styles.bookSpine}>
          <span className={styles.spineText}>{title}</span>
        </div>

        {/* Back Cover */}
        <div className={styles.bookBack}>
          <div className={styles.backTexture} />
        </div>

        {/* Page Edges (stacked for thickness effect) */}
        <div className={styles.bookPages}>
          {[...Array(pageEdges)].map((_, i) => (
            <div
              key={i}
              className={styles.pageEdge}
              style={{
                transform: `translateZ(${-i * 0.5}px)`,
                opacity: 1 - i * 0.03,
              }}
            />
          ))}
        </div>

        {/* Corner curl effect (top-right) */}
        <div className={styles.cornerCurl} />
      </div>

      {/* Metadata (below book) */}
      <div className={styles.bookMetadata}>
        <p className={styles.metaTitle}>{title}</p>
        <p className={styles.metaAuthor}>{author}</p>
        <p className={styles.metaPages}>{pages} pages</p>
      </div>
    </div>
  )
}
