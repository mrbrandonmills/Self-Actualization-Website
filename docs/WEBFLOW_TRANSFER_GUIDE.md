# Webflow Transfer Guide - The Self Actualized Life

## Executive Summary

This guide explains how to transfer your luxury Next.js prototype to Webflow while maintaining the museum-quality design standards. The Next.js version serves as a **design reference and component library** - all the luxury patterns, animations, and interactions can be replicated in Webflow using custom code.

---

## Why This Approach Works

**What We Built in Next.js:**
- ✅ Luxury design system (colors, typography, spacing, animations)
- ✅ Component prototypes (cursor, navigation, hero, cards)
- ✅ Working interactions (3D tilt, magnetic cursor, glassmorphism)
- ✅ Complete CSS for all luxury effects

**What Transfers to Webflow:**
- ✅ All CSS → Webflow Custom Code (Page Head or Project Settings)
- ✅ Design tokens → Webflow style guide
- ✅ Components → Webflow elements with custom code embeds
- ✅ Animations → Webflow interactions + custom JavaScript
- ✅ CMS → Webflow CMS for books/courses

---

## Phase 1: Webflow Account Setup (Day 1)

### 1.1 Create Webflow Account

**URL:** https://webflow.com/dashboard

**Plan Recommendation:**
- **Starter Plan** ($14/month) for development
- **CMS Plan** ($23/month) for production with books/courses
- **Business Plan** ($39/month) if you need e-commerce

**What You Get:**
- Visual designer
- CMS (50-2,000 items depending on plan)
- Hosting with CDN
- SSL certificate
- Custom code support
- 100+ page templates

### 1.2 Create New Project

1. Click "New Project"
2. Choose "Blank Site" (not a template)
3. Name: "The Self Actualized Life"
4. Open Webflow Designer

---

## Phase 2: Transfer Luxury CSS (Day 1-2)

### 2.1 Extract Global CSS

**From:** `/Volumes/Super Mastery/Self-Actualization-Website/src/app/globals.css`

**To:** Webflow Project Settings → Custom Code → Head Code

**Steps:**

1. **Copy the entire globals.css file**
2. **Wrap in `<style>` tags:**

```html
<style>
/* The Self Actualized Life - Luxury Design System */

/* Paste entire contents of globals.css here */

/* Example: */
:root {
  --gold: #C9A050;
  --gold-light: #D4AF37;
  --gold-dark: #B89040;
  --black: #000000;
  --white: #FFFFFF;
}

.glass {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px) saturate(180%) brightness(105%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glow-gold-hover:hover {
  box-shadow:
    0 0 40px rgba(201, 160, 80, 0.4),
    0 0 80px rgba(201, 160, 80, 0.3),
    0 0 120px rgba(201, 160, 80, 0.2);
}

/* ... all other CSS ... */
</style>
```

3. **Paste into Webflow:**
   - Webflow Designer → Settings (⚙️)
   - Custom Code tab
   - Paste in "Head Code" section
   - Save

### 2.2 Set Up Design Tokens

**Webflow Style Manager:**
- Font Variables → Playfair Display (Google Fonts), Inter
- Color Variables → Black, White, Gold (#C9A050)
- Spacing Variables → 4px base scale
- Animation Variables → 200ms, 400ms, 600ms, 800ms

**Add Google Fonts:**
```html
<!-- Add to Custom Code → Head -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

## Phase 3: Build Navigation (Day 2)

### 3.1 Create Navbar Component

**Webflow Steps:**

1. **Add Navbar Element:**
   - Drag "Navbar" from Add Panel
   - Set to "Fixed" position
   - Z-index: 50

2. **Apply Glassmorphism:**
   - Add class: `navbar-glass`
   - Background: `rgba(5, 5, 5, 0.95)`
   - Backdrop filter: `blur(40px)`
   - Border bottom: `1px solid rgba(255, 255, 255, 0.1)`

3. **Add Logo:**
   - Text element: "The Self Actualized Life"
   - Font: Playfair Display
   - Size: 24px desktop, 20px mobile
   - Color: White

4. **Add Nav Links:**
   - Link block for each: Books, Courses, Writing Lab, Blog, About
   - Font: Inter
   - Size: 14px
   - Color: `rgba(255, 255, 255, 0.6)`
   - Hover: `rgba(255, 255, 255, 1)`

5. **Add Gold Underline Animation:**
   - Create interaction on hover
   - Animate: Border bottom (0% → 100% width)
   - Duration: 300ms
   - Easing: Custom cubic-bezier [0.22, 1, 0.36, 1]

6. **Add Cart Icon:**
   - Use SVG embed or Webflow icon
   - Position: Absolute right
   - Add badge with gold background

### 3.2 Mobile Menu

1. **Hamburger Button:**
   - Webflow's built-in menu button
   - Style with white color

2. **Mobile Menu Panel:**
   - Full screen overlay
   - Background: `rgba(5, 5, 5, 0.95)`
   - Backdrop blur: 40px
   - Slide in from right

3. **Menu Animation:**
   - Use Webflow interactions
   - Slide animation: X 100% → 0%
   - Duration: 400ms

---

## Phase 4: Build Hero Section (Day 3)

### 4.1 Hero Container

**Webflow Structure:**
```
Section (min-height: 100vh)
  ├─ Div (animated orbs container - absolute)
  │    ├─ Div (gold orb with gold gradient)
  │    └─ Div (white orb with white gradient)
  ├─ Container (hero content)
       ├─ Div (luxury badge)
       ├─ H1 (hero title)
       ├─ Div (subtitle words)
       ├─ Div (divider with gold line)
       └─ Div (CTA buttons)
```

### 4.2 Animated Gradient Orbs

**Custom Code Embed in Section:**

```html
<style>
.gold-orb {
  position: absolute;
  top: -300px;
  left: -300px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(201,160,80,0.3) 0%, transparent 70%);
  filter: blur(80px);
  animation: floatOrb 8s ease-in-out infinite;
  pointer-events: none;
}

.white-orb {
  position: absolute;
  bottom: -250px;
  right: -250px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%);
  filter: blur(80px);
  animation: floatOrb 10s ease-in-out infinite reverse;
  pointer-events: none;
}

@keyframes floatOrb {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.2;
  }
  50% {
    transform: translate(20px, 20px) scale(1.2);
    opacity: 0.3;
  }
}
</style>

<div class="gold-orb"></div>
<div class="white-orb"></div>
```

### 4.3 Hero Title with 3D Effect

**Webflow Interaction:**
1. **Trigger:** Page load
2. **Initial state:**
   - Opacity: 0
   - Transform: rotateX(-30deg)
3. **Animation:**
   - Opacity: 0 → 1
   - RotateX: -30deg → 0deg
   - Duration: 1200ms
   - Easing: Cubic bezier [0.22, 1, 0.36, 1]

### 4.4 Glass CTAs

**Button Classes:**
```css
.glass-button {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 16px 32px;
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.glass-button:hover {
  border-color: rgba(201, 160, 80, 0.6);
  box-shadow: 0 0 30px rgba(201, 160, 80, 0.3);
  transform: scale(1.02);
}
```

---

## Phase 5: Set Up Webflow CMS (Day 4)

### 5.1 Create Books Collection

**Webflow CMS Panel:**

1. **Add Collection:**
   - Name: "Books"
   - Singular: "Book"

2. **Collection Fields:**
   - Title (Plain Text)
   - Slug (Generated from Title)
   - Subtitle (Plain Text)
   - Description (Rich Text)
   - Cover Image (Image)
   - Price (Number)
   - Category (Option: Philosophy, Psychology, Practice)
   - Featured (Switch)

3. **Collection Template Page:**
   - Automatically created at `/books/[slug]`

### 5.2 Create Courses Collection

**Same process as Books:**

**Fields:**
- Title
- Slug
- Description (Rich Text)
- Instructor (Plain Text)
- Duration (Plain Text, e.g., "8 weeks")
- Level (Option: Beginner, Intermediate, Advanced)
- Price (Number)
- Modules (Number)
- Thumbnail (Image)
- Featured (Switch)

### 5.3 Add Sample Content

**Books Collection:**
1. Click "Add Book"
2. Fill in all fields
3. Add 6 books from sample data
4. Publish

**Courses Collection:**
1. Click "Add Course"
2. Fill in all fields
3. Add 6 courses from sample data
4. Publish

---

## Phase 6: Build Product Cards (Day 5)

### 6.1 Book Card Component

**Webflow Structure:**
```
Collection List (Books)
  └─ Collection Item
       └─ Link Block (to dynamic page)
            ├─ Div (card container with class "book-card")
            │    ├─ Div (image container)
            │    │    └─ Image (dynamic: Cover Image)
            │    └─ Div (content overlay with "glass")
            │         ├─ Badge (Category)
            │         ├─ H3 (Title)
            │         ├─ P (Subtitle)
            │         └─ Div (price with gold color)
```

**Apply Classes:**
```css
.book-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  perspective: 1000px;
}

.book-card:hover {
  transform: scale(1.02);
}

.book-card:hover .glow-gold-hover {
  box-shadow:
    0 0 40px rgba(201, 160, 80, 0.4),
    0 0 80px rgba(201, 160, 80, 0.3),
    0 0 120px rgba(201, 160, 80, 0.2);
}
```

### 6.2 Add Webflow Interactions

**Card Hover:**
1. **Trigger:** Hover on .book-card
2. **Action:** Scale 1.02, box-shadow glow
3. **Duration:** 600ms
4. **Easing:** Custom [0.22, 1, 0.36, 1]

**Image Zoom:**
1. **Trigger:** Hover on .book-card
2. **Action:** Scale image 1.08
3. **Duration:** 600ms

---

## Phase 7: Add Magnetic Cursor (Day 6)

### 7.1 Custom Code for Cursor

**Add to Custom Code → Before `</body>` tag:**

```html
<script>
// Magnetic Custom Cursor
(function() {
  // Create cursor elements
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  cursor.appendChild(cursorDot);
  document.body.appendChild(cursor);

  // Track mouse position
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor following
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Magnetic effect on interactive elements
  const magneticElements = document.querySelectorAll('a, button, [data-cursor-magnetic]');

  magneticElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-link');
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-link');
    });
  });
})();
</script>

<style>
.custom-cursor {
  position: fixed;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(201, 160, 80, 0.6);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  mix-blend-mode: difference;
}

.cursor-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  background: #C9A050;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.custom-cursor.cursor-link {
  width: 60px;
  height: 60px;
  border-color: rgba(201, 160, 80, 1);
  box-shadow: 0 0 20px rgba(201, 160, 80, 0.4);
}

@media (max-width: 768px) {
  .custom-cursor {
    display: none;
  }
}
</style>
```

---

## Phase 8: Footer (Day 7)

### 8.1 Footer Structure

**Webflow:**
```
Footer Section
  └─ Container
       ├─ Div (4-column grid on desktop)
       │    ├─ Div (Brand column)
       │    ├─ Div (Products column)
       │    ├─ Div (Company column)
       │    └─ Div (Newsletter column)
       └─ Div (bottom bar with copyright)
```

### 8.2 Newsletter Form

**Webflow Form Element:**
1. Add Form Block
2. Email input with `.glass` class
3. Submit button with gold gradient
4. Success/Error messages styled

**Form Submission:**
- Webflow native form handling
- Or integrate with ConvertKit/Mailchimp via Zapier

---

## Phase 9: Connect Domain (Day 8)

### 9.1 DNS Configuration

**From Squarespace/Current Host:**

1. **Get Webflow DNS Records:**
   - Webflow Dashboard → Project Settings → Publishing
   - Click "Add Custom Domain"
   - Enter: selfactualize.life
   - Webflow provides DNS records

2. **Add to Current DNS Provider:**

   **A Records:**
   ```
   @ (root) → 75.2.70.75
   www → 75.2.70.75
   ```

   **CNAME Record (if using subdomain):**
   ```
   www → proxy-ssl.webflow.com
   ```

3. **Wait for Propagation:**
   - Usually 1-24 hours
   - Check: https://www.whatsmydns.net

4. **Enable SSL in Webflow:**
   - Automatic after DNS verification
   - Free Let's Encrypt certificate

### 9.2 Redirect Old Squarespace URLs

**Webflow 301 Redirects:**

1. **Project Settings → Hosting → Redirects**

2. **Add Redirects:**
   ```
   /old-blog-post → /blog/new-blog-post
   /shop → /books
   /courses-old → /courses
   ```

3. **Wildcard Redirects:**
   ```
   /blog/* → /articles/:splat
   ```

---

## Phase 10: E-Commerce Setup (Optional - Day 9-10)

### 10.1 Webflow E-Commerce

**If Using Webflow E-Commerce Plan ($29-$74/month):**

1. **Enable E-Commerce:**
   - Project Settings → E-Commerce
   - Add payment provider (Stripe)

2. **Create Products:**
   - Books and Courses as products
   - Set prices
   - Add to cart functionality built-in

3. **Checkout Flow:**
   - Webflow provides checkout pages
   - Customize with brand styling

### 10.2 Alternative: External Checkout

**Use Stripe Payment Links:**
1. Create product in Stripe Dashboard
2. Generate payment link
3. Add link to "Buy Now" buttons in Webflow
4. Redirect to Stripe-hosted checkout

---

## Phase 11: Collective Writing AI Integration

### 11.1 External App Approach

**Since Webflow doesn't support complex backend:**

**Option A: Separate Next.js App**
- Keep Next.js app for Writing Lab feature
- Deploy to Vercel
- Iframe embed in Webflow page
- URL: `writing.selfactualize.life`

**Option B: Webflow + Xano/Supabase**
- Use Xano or Supabase as backend
- API calls from Webflow custom code
- Real-time features via webhooks

**Option C: Webflow + Memberstack**
- Use Memberstack for user authentication
- Custom JavaScript for writing features
- API integration with OpenAI/Anthropic

**Recommended:** Keep Writing Lab as separate Next.js app at subdomain

---

## Cost Comparison

### Webflow Hosting

| Plan | Price | Features |
|------|-------|----------|
| Starter | $14/month | 1 site, 50 pages, 50 CMS items |
| CMS | $23/month | 2,000 CMS items, client billing |
| Business | $39/month | 10,000 CMS items, code export |
| E-Commerce | $29/month | 500 products, 2% transaction fee |

### Total Estimated Monthly Costs

**MVP (Webflow CMS + Stripe):**
- Webflow CMS: $23/month
- Domain: $1/month (amortized)
- **Total: $24/month**

**With E-Commerce:**
- Webflow E-Commerce: $29/month
- Stripe fees: 2.9% + $0.30 per transaction
- **Total: $30/month + transaction fees**

**With Writing Lab (Next.js on Vercel):**
- Webflow CMS: $23/month
- Vercel Pro: $20/month
- Supabase: $25/month
- AI costs: $50-100/month
- **Total: $118-143/month**

---

## Maintenance Checklist

### Weekly
- [ ] Backup Webflow site (Project Settings → Backup)
- [ ] Check analytics
- [ ] Monitor forms and emails

### Monthly
- [ ] Review CMS content
- [ ] Update product prices if needed
- [ ] Check broken links
- [ ] Performance audit (GTmetrix, PageSpeed)

### Quarterly
- [ ] Update custom code if needed
- [ ] Review and optimize images
- [ ] SEO audit
- [ ] User feedback review

---

## Troubleshooting

### Issue: Custom Code Not Working

**Solution:**
1. Check console for JavaScript errors
2. Ensure code is in correct location (Head vs Body)
3. Verify syntax (missing semicolons, etc.)
4. Publish site and test on live URL (not Designer)

### Issue: CMS Items Not Showing

**Solution:**
1. Check Collection List settings
2. Verify filter conditions
3. Ensure items are published (not draft)
4. Check limit settings (default is 10)

### Issue: Animations Janky

**Solution:**
1. Use transform/opacity (GPU accelerated)
2. Avoid animating width/height/margin
3. Add `will-change: transform` to animated elements
4. Reduce animation complexity on mobile

### Issue: Forms Not Submitting

**Solution:**
1. Check form settings in Webflow
2. Verify email notifications configured
3. Test in incognito mode (cookies/cache issue)
4. Check spam folder for confirmations

---

## Advanced: Webflow API Integration

### For Collective Writing AI

**If you want to manage writing projects in Webflow CMS:**

1. **Create Writing Projects Collection:**
   - Fields: Title, Description, Status, Author, Content

2. **Use Webflow API:**
   ```javascript
   fetch('https://api.webflow.com/collections/{COLLECTION_ID}/items', {
     method: 'POST',
     headers: {
       'Authorization': 'Bearer YOUR_API_KEY',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       fields: {
         title: 'New Project',
         _archived: false,
         _draft: false
       }
     })
   })
   ```

3. **Limitations:**
   - No real-time collaboration in Webflow
   - Limited to CRUD operations
   - No complex queries

**Recommendation:** Keep complex writing features in Next.js app.

---

## Timeline Summary

| Day | Task | Hours |
|-----|------|-------|
| 1 | Account setup, global CSS | 4 |
| 2 | Navigation + design tokens | 4 |
| 3 | Hero section | 4 |
| 4 | CMS setup (Books, Courses) | 3 |
| 5 | Product cards + interactions | 4 |
| 6 | Magnetic cursor + footer | 4 |
| 7 | Footer + polish | 3 |
| 8 | Domain + DNS | 2 |
| 9-10 | E-commerce (optional) | 6 |
| **Total** | **Full transfer** | **34 hours** |

---

## Next Steps

1. **Review This Guide**
2. **Sign Up for Webflow** (CMS plan recommended)
3. **Start with Phase 1** (account setup)
4. **Transfer CSS** (Phase 2) - this gives you 80% of the luxury look
5. **Build one section at a time** (Phases 3-7)
6. **Test thoroughly** before DNS transfer
7. **Transfer domain** (Phase 9)
8. **Launch** 🚀

---

## Support Resources

- **Webflow University:** https://university.webflow.com
- **Webflow Forum:** https://forum.webflow.com
- **This Codebase:** Reference for all CSS, animations, interactions

---

**Remember:** The Next.js version is your **luxury design reference**. Every component, animation, and interaction can be replicated in Webflow with custom code. Take your time, test thoroughly, and maintain the museum-quality standards we've established.

**Your luxury brand deserves a luxury website. This guide ensures you get there.** ✨
