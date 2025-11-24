# House of Corto Gallery Techniques

**Reference:** https://www.houseofcorto.com/

## Key Gallery Techniques Extracted

### 1. Layout System

**2-Column Grid (Desktop):**
```css
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 2rem;
```

**Responsive:**
- Desktop: 2 columns
- Tablet (< 991px): 1 column
- Mobile: 1 column, full width

### 2. Image Reveal Animation

**Scale from Zero:**
```css
/* Initial state */
transform: scale(0);
opacity: 1;

/* Revealed state */
transform: scale(1);
transition: transform 0.5s ease-out;
```

**Why it works:** Creates dramatic product/book reveal that feels premium.

### 3. Smooth Transitions

**Signature Easing:**
```css
transition: margin-right 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

This cubic-bezier creates a **professional, smooth, non-linear** motion.

### 4. Text Animations

**Staggered Text Reveal:**
```css
/* Title */
transform: translateY(100%);
transition: transform 0.8s ease;

/* On hover/reveal */
transform: translateY(0);
```

### 5. Performance Optimizations

```css
will-change: transform;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

### 6. Color Accent

**Sage Green:** `#63692B` - Earthy, sophisticated category accent

---

## Adaptation for Self-Actualization Gallery

### Book/Course Grid System

**Layout:**
- 2-column grid on desktop (like Corto)
- Full-height viewport sections
- Scale-from-zero reveals
- Text swap on hover

**Color Scheme:**
- Keep Bartosz dark backgrounds (#05201f)
- Use Corto's sage green (#63692B) for category badges
- Gold (#C9A050) for featured items
- Creme (#c5d2b7) for text

**Interactions:**
1. **Image Reveal:** Scale from 0 to 1 on scroll (0.5s)
2. **Hover Effect:** Text slides up, overlay darkens (0.7s cubic-bezier)
3. **Category Filter:** Sage green accent on active category
4. **Click:** Expand to full-screen book detail view

### Implementation Files

**To Create:**
- `src/components/gallery/BookGallery.tsx` - Main grid component
- `src/components/gallery/BookGalleryItem.tsx` - Individual book card
- `src/components/gallery/GalleryFilter.tsx` - Category filtering
- `src/styles/gallery.css` - Gallery-specific styles

**Techniques to Use:**
- GSAP ScrollTrigger for scale reveals
- Framer Motion for hover animations
- Intersection Observer for lazy loading
- CSS Grid for layout

---

## CSS Patterns to Implement

### Gallery Container
```css
.book-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-2xl);
  max-width: var(--max-width-2xl);
  margin: 0 auto;
  padding: var(--space-4xl) var(--space-xl);
}

@media (max-width: 991px) {
  .book-gallery {
    grid-template-columns: 1fr;
  }
}
```

### Scale Reveal Animation
```css
.gallery-item {
  transform: scale(0);
  opacity: 1;
  will-change: transform;
  transition: transform 0.5s ease-out;
}

.gallery-item.revealed {
  transform: scale(1);
}
```

### Hover Interaction
```css
.gallery-item-inner {
  transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.gallery-item:hover .gallery-item-inner {
  transform: translateY(-8px);
}

.gallery-item-text {
  transform: translateY(100%);
  transition: transform 0.8s ease;
}

.gallery-item:hover .gallery-item-text {
  transform: translateY(0);
}
```

### Category Badge
```css
.category-badge {
  background: #63692B;  /* Corto sage green */
  color: #F2EFE7;       /* Corto light text */
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-widest);
}

.category-badge.active {
  background: #3E4F17;  /* Corto active state */
}
```

---

## Integration with Bartosz Aesthetic

**Combine:**
- House of Corto gallery layout + animations
- Bartosz dark color palette
- Museum-quality book pedestals

**Result:**
- 2-column grid with dramatic scale reveals
- Dark forest backgrounds with sage/gold accents
- Smooth 0.7s cubic-bezier transitions
- Text swap animations on hover
- Category filtering with Corto-style badges

---

**Next Steps:**
1. Create BookGallery component with 2-column grid
2. Implement scale-from-zero GSAP animations
3. Add text swap hover effects
4. Build category filtering system
5. Integrate with existing book data

**Status:** Ready to implement as enhanced Phase 5
