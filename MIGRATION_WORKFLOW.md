# Self Actualize - Squarespace to Luxury Next.js Migration Workflow

## Executive Summary

**Objective:** Transform selfactualize.life from Squarespace to a museum-quality Next.js platform rivaling Louis Vuitton and Chanel, with integrated collective writing AI.

**Timeline:** 7-8 weeks
**Platform:** Vercel (frontend + serverless functions)
**Database:** Vercel Postgres or Supabase
**Design Standard:** Louis Vuitton, Hermès, Chanel, Gucci luxury aesthetics

---

## Phase 1: Foundation & Setup (Week 1-2)

### 1.1 Project Initialization

**Tasks:**
- [x] Clone repository
- [x] Create CLAUDE.md forge file
- [ ] Initialize Next.js 15 project
- [ ] Configure TypeScript strict mode
- [ ] Set up Tailwind CSS + Framer Motion
- [ ] Configure ESLint + Prettier

**Agent Requirements:**
- backend-developer: Review Next.js configuration
- luxury-visual-designer: Review Tailwind config

**Commands:**
```bash
cd '/Volumes/Super Mastery/Self-Actualization-Website'
npx create-next-app@latest . --typescript --tailwind --app
npm install framer-motion gsap lenis lucide-react
npm install -D @tailwindcss/typography
```

---

### 1.2 Design System Creation

**Tasks:**
- [ ] Create `/lib/design-tokens.ts` (based on Webdesigner)
- [ ] Create `/app/globals.css` with luxury effects
- [ ] Set up color palette (Black, White, Gold)
- [ ] Define typography scale
- [ ] Configure animation system
- [ ] Create Framer Motion variants library

**Design Tokens to Include:**
```typescript
// Colors
- Primary Black: #000000
- Pure White: #FFFFFF
- Signature Gold: #C9A050
- Gold Light: #D4AF37
- Gold Dark: #B89040

// Typography
- Serif: Playfair Display, Cormorant Garamond
- Sans: Inter, -apple-system
- Scale: 12px → 128px (9xl)

// Animation
- Luxury easing: cubic-bezier(0.22, 1, 0.36, 1)
- Durations: 200ms → 1000ms
- Spring physics presets
```

**Agent Requirements:**
- luxury-visual-designer: Create and review ALL design tokens

**Files to Create:**
```
/lib/design-tokens.ts
/app/globals.css
/tailwind.config.ts
/components/ui/page-background.tsx
```

---

### 1.3 Core UI Components

**Tasks:**
- [ ] Custom cursor component (magnetic)
- [ ] Navigation with glassmorphism
- [ ] Page transition wrapper
- [ ] Smooth scroll setup (Lenis)
- [ ] Footer component
- [ ] Loading states (shimmer)

**Agent Requirements:**
- luxury-visual-designer: Review EACH component before adding next

**Components to Build:**
```
/components/custom-cursor.tsx
/components/navigation.tsx
/components/page-transition.tsx
/components/smooth-scroll.tsx
/components/footer.tsx
/components/ui/shimmer-loading.tsx
```

---

## Phase 2: Content Migration (Week 2-3)

### 2.1 Squarespace Content Export

**Tasks:**
- [ ] Export Squarespace XML/API data
- [ ] Audit all existing content:
  - Books catalog
  - Courses
  - Blog posts
  - About/Mission pages
  - Media assets
- [ ] Download all images
- [ ] Document current URL structure

**Tools:**
- Squarespace export feature
- Custom scraping scripts if needed

**Agent Requirements:**
- backend-developer: Review data export scripts

---

### 2.2 Homepage - Cinematic Hero

**Tasks:**
- [ ] Hero section with advanced parallax
- [ ] Floating gradient orbs animation
- [ ] Luxury badge with pulse
- [ ] 3D text reveal animations
- [ ] Scroll indicator
- [ ] Mouse-reactive content

**Design Inspiration:**
- Webdesigner `/components/gallery/hero.tsx`
- Apple product pages
- Louis Vuitton homepage

**Agent Requirements:**
- luxury-visual-designer: MUST review before implementation

**File:**
```
/app/page.tsx
/components/home/hero.tsx
/components/home/features-section.tsx
```

---

### 2.3 Books Catalog Page

**Tasks:**
- [ ] Books grid layout (Bento-style)
- [ ] Book card component with:
  - 3D tilt on hover
  - Gold glow effect
  - Image zoom (1.08x)
  - Glassmorphism overlay
- [ ] Book detail page
- [ ] "Buy Now" CTA with shimmer

**Data Structure:**
```typescript
interface Book {
  id: string
  title: string
  subtitle: string
  description: string
  coverImage: string
  price: number
  isbn: string
  purchaseLink: string
  previewLink?: string
}
```

**Agent Requirements:**
- luxury-visual-designer: Review book cards and layout
- backend-developer: Review data structure

**Files:**
```
/app/books/page.tsx
/components/books/book-card.tsx
/components/books/book-detail.tsx
/data/books.ts
```

---

### 2.4 Courses Catalog Page

**Tasks:**
- [ ] Course grid layout
- [ ] Course card component
- [ ] Course detail page
- [ ] Enrollment CTA
- [ ] Course curriculum display

**Data Structure:**
```typescript
interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  price: number
  level: 'beginner' | 'intermediate' | 'advanced'
  thumbnail: string
  curriculum: Module[]
}
```

**Agent Requirements:**
- luxury-visual-designer: Review course cards
- backend-developer: Review data structure

**Files:**
```
/app/courses/page.tsx
/components/courses/course-card.tsx
/components/courses/course-detail.tsx
/data/courses.ts
```

---

### 2.5 Blog Migration

**Tasks:**
- [ ] Parse Squarespace blog XML
- [ ] Create blog post template
- [ ] Category/tag system
- [ ] Search functionality
- [ ] Related posts

**Agent Requirements:**
- luxury-visual-designer: Review blog layout
- backend-developer: Review blog data parsing

**Files:**
```
/app/blog/page.tsx
/app/blog/[slug]/page.tsx
/components/blog/post-card.tsx
/lib/blog-parser.ts
```

---

## Phase 3: E-Commerce Integration (Week 3-4)

### 3.1 Stripe Setup

**Tasks:**
- [ ] Create Stripe account
- [ ] Configure products in Stripe Dashboard
- [ ] Set up webhook endpoint
- [ ] Test payment flow

**Environment Variables:**
```bash
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
```

**Agent Requirements:**
- backend-developer: Review ALL Stripe integration code

---

### 3.2 Payment API Routes

**Tasks:**
- [ ] `/api/stripe/create-checkout` - Create checkout session
- [ ] `/api/stripe/verify-purchase` - Verify payment
- [ ] `/api/webhooks/stripe` - Handle webhooks
- [ ] Success/cancel pages

**Critical Pattern:**
```typescript
// MUST use lazy initialization
export const dynamic = 'force-dynamic'

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-11-20.acacia',
  })
}
```

**Agent Requirements:**
- backend-developer: Review EVERY API route before implementation

**Files:**
```
/app/api/stripe/create-checkout/route.ts
/app/api/stripe/verify-purchase/route.ts
/app/api/webhooks/stripe/route.ts
/app/success/page.tsx
/app/cancel/page.tsx
```

---

### 3.3 Shopping Cart Experience

**Tasks:**
- [ ] Cart sidebar with glassmorphism
- [ ] Add to cart animation
- [ ] Cart state management (Zustand/React Context)
- [ ] Cart badge animation
- [ ] Checkout flow

**Agent Requirements:**
- luxury-visual-designer: Review cart UI
- backend-developer: Review state management

**Files:**
```
/components/cart-sidebar.tsx
/components/cart-badge.tsx
/lib/cart-store.ts
```

---

## Phase 4: Database & Collective Writing AI (Week 4-6)

### 4.1 Database Setup

**Tasks:**
- [ ] Choose database (Vercel Postgres recommended)
- [ ] Create database schema
- [ ] Set up Prisma ORM
- [ ] Create migrations
- [ ] Seed initial data

**Database Choice:**
- **Option A:** Vercel Postgres (native integration)
- **Option B:** Supabase (real-time features)

**Schema Design:**
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'contributor',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Writing projects
CREATE TABLE writing_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contributions
CREATE TABLE contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES writing_projects(id),
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  version INTEGER DEFAULT 1,
  ai_assisted BOOLEAN DEFAULT false,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- AI generations
CREATE TABLE ai_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES writing_projects(id),
  contribution_id UUID REFERENCES contributions(id),
  prompt TEXT NOT NULL,
  output TEXT NOT NULL,
  model VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Agent Requirements:**
- backend-developer: Review schema design and migrations

**Files:**
```
/prisma/schema.prisma
/prisma/migrations/
/lib/db.ts
```

---

### 4.2 Authentication System

**Tasks:**
- [ ] Choose auth solution (NextAuth.js recommended)
- [ ] Set up OAuth providers (Google, GitHub)
- [ ] Email/password authentication
- [ ] Protected routes
- [ ] User profile pages

**Agent Requirements:**
- backend-developer: Review auth implementation
- luxury-visual-designer: Review login/signup UI

**Files:**
```
/app/api/auth/[...nextauth]/route.ts
/app/login/page.tsx
/app/signup/page.tsx
/components/auth/login-form.tsx
/lib/auth.ts
```

---

### 4.3 Collective Writing Interface

**Tasks:**
- [ ] Project creation form
- [ ] Rich text editor (TipTap or similar)
- [ ] AI assistance panel
- [ ] Version history viewer
- [ ] Collaboration indicators
- [ ] Comment system

**UI Features:**
- Glass morphism editor container
- Floating AI assistant button
- Smooth animations for contributions
- Real-time collaboration indicators
- Luxury typography for writing

**Agent Requirements:**
- luxury-visual-designer: CRITICAL - Review writing interface UX
- backend-developer: Review real-time features

**Files:**
```
/app/writing/page.tsx
/app/writing/[projectId]/page.tsx
/components/writing/editor.tsx
/components/writing/ai-assistant.tsx
/components/writing/version-history.tsx
/lib/ai/claude-integration.ts
```

---

### 4.4 AI Integration

**Tasks:**
- [ ] OpenAI/Claude API setup
- [ ] Prompt engineering for writing assistance
- [ ] Style matching algorithm
- [ ] Content generation API routes
- [ ] Rate limiting

**AI Features:**
- Story continuation suggestions
- Character consistency checking
- Plot hole detection
- Style mimicry
- Grammar and clarity improvements

**Agent Requirements:**
- backend-developer: Review AI integration code
- luxury-visual-designer: Review AI interaction UI

**Files:**
```
/app/api/ai/generate/route.ts
/app/api/ai/analyze/route.ts
/lib/ai/prompts.ts
/lib/ai/rate-limiter.ts
```

---

## Phase 5: Premium Features (Week 6-7)

### 5.1 Membership Tiers

**Tasks:**
- [ ] Define membership levels
- [ ] Stripe subscription setup
- [ ] Content gating logic
- [ ] Member dashboard
- [ ] Upgrade/downgrade flow

**Membership Levels:**
```typescript
enum MembershipTier {
  FREE = 'free',           // Basic access
  SEEKER = 'seeker',       // $29/month - Full blog, some courses
  ACTUALIZED = 'actualized', // $99/month - All courses, writing AI
  MASTER = 'master'        // $299/month - 1-on-1 coaching, all access
}
```

**Agent Requirements:**
- backend-developer: Review subscription logic
- luxury-visual-designer: Review membership pages

---

### 5.2 Email Integration

**Tasks:**
- [ ] Set up Resend account
- [ ] Welcome email sequence
- [ ] Course enrollment emails
- [ ] Writing project notifications
- [ ] Newsletter system

**Agent Requirements:**
- backend-developer: Review email sending logic

**Files:**
```
/app/api/email/send/route.ts
/lib/email/templates.tsx
```

---

### 5.3 Admin Dashboard

**Tasks:**
- [ ] Admin authentication
- [ ] User management
- [ ] Content management
- [ ] Analytics dashboard
- [ ] Writing project moderation

**Agent Requirements:**
- luxury-visual-designer: Review admin UI
- backend-developer: Review admin authorization

**Files:**
```
/app/admin/page.tsx
/app/admin/users/page.tsx
/app/admin/writing/page.tsx
/components/admin/dashboard.tsx
```

---

## Phase 6: Polish & Launch (Week 7-8)

### 6.1 Performance Optimization

**Tasks:**
- [ ] Image optimization (next/image)
- [ ] Code splitting
- [ ] Bundle analysis
- [ ] Lazy loading
- [ ] CDN configuration
- [ ] Lighthouse audit (target: 95+)

**Agent Requirements:**
- backend-developer: Review performance optimizations

---

### 6.2 SEO Optimization

**Tasks:**
- [ ] Meta tags for all pages
- [ ] OpenGraph images
- [ ] Sitemap generation
- [ ] robots.txt
- [ ] 301 redirects from Squarespace URLs
- [ ] Schema markup

**Files:**
```
/app/sitemap.ts
/app/robots.ts
/public/robots.txt
```

---

### 6.3 Accessibility Audit

**Tasks:**
- [ ] Keyboard navigation testing
- [ ] Screen reader testing
- [ ] Color contrast verification (WCAG AA)
- [ ] Focus indicators
- [ ] ARIA labels
- [ ] Reduced motion support

**Target:** WCAG 2.1 Level AA compliance

**Agent Requirements:**
- luxury-visual-designer: Review accessibility features

---

### 6.4 Mobile Optimization

**Tasks:**
- [ ] Touch-optimized interactions
- [ ] Mobile navigation
- [ ] Responsive images
- [ ] Bottom sheet modals
- [ ] Swipe gestures
- [ ] Disable custom cursor on mobile

**Agent Requirements:**
- luxury-visual-designer: Review mobile experience

---

### 6.5 Production Deployment

**Tasks:**
- [ ] Environment variables in Vercel
- [ ] Database migration to production
- [ ] DNS configuration
- [ ] SSL certificate
- [ ] Vercel deployment
- [ ] Post-launch monitoring

**Deployment Checklist:**
```bash
# 1. Set environment variables in Vercel
# 2. Run production build locally
npm run build

# 3. Test production build
npm start

# 4. Deploy to Vercel
vercel --prod

# 5. Configure custom domain
# 6. Apply database migrations
# 7. Monitor errors
```

---

## Technical Integrations

### Required Third-Party Services

1. **Vercel**
   - Frontend hosting
   - Serverless functions
   - Edge functions
   - Blob storage
   - Postgres database

2. **Stripe**
   - Payment processing
   - Subscription management
   - Webhook handling

3. **AI Services**
   - OpenAI API (GPT-4)
   - Anthropic Claude (content generation)

4. **Email**
   - Resend (transactional emails)

5. **Analytics** (Optional)
   - Vercel Analytics
   - PostHog (product analytics)

6. **Monitoring** (Optional)
   - Sentry (error tracking)
   - Vercel Monitoring

---

## Design Standards Reference

### Visual Inspiration Sources

**Louis Vuitton**
- Gold accent usage
- Generous white space
- Elegant serif typography
- Museum-quality photography

**Chanel**
- Minimalist black & white palette
- Sophisticated interactions
- Premium brand positioning
- Timeless elegance

**Hermès**
- Artisanal quality focus
- Storytelling through design
- Luxurious material feel
- Attention to detail

**Apple**
- Smooth parallax scrolling
- Contextual cursor states
- Glassmorphism effects
- Clean minimal layouts

### Animation Principles

- **60fps minimum** - GPU-accelerated transforms
- **Spring physics** - Natural, organic motion
- **Luxury easing** - cubic-bezier(0.22, 1, 0.36, 1)
- **Stagger reveals** - Elegant sequential animations
- **Reduced motion** - Respect user preferences

---

## Testing Strategy

### Unit Tests
- Utility functions
- Data transformations
- API route logic

### Integration Tests
- Payment flow
- Authentication
- Database operations
- AI generation

### E2E Tests (Playwright)
- User registration
- Book purchase flow
- Course enrollment
- Writing project creation

### Manual Testing
- Cross-browser (Chrome, Safari, Firefox, Edge)
- Mobile devices (iOS, Android)
- Accessibility tools
- Performance profiling

---

## Risk Mitigation

### Potential Risks

1. **Content Migration Issues**
   - Risk: Data loss during Squarespace export
   - Mitigation: Multiple backups, staged migration

2. **Payment Processing Errors**
   - Risk: Failed transactions
   - Mitigation: Extensive Stripe testing, webhook validation

3. **AI Rate Limiting**
   - Risk: Exceeded API limits
   - Mitigation: Rate limiting, caching, user quotas

4. **Database Performance**
   - Risk: Slow queries at scale
   - Mitigation: Proper indexing, connection pooling

5. **SEO Drop During Migration**
   - Risk: Lost search rankings
   - Mitigation: 301 redirects, sitemap submission

---

## Success Criteria

### Launch Readiness Checklist

**Design:**
- [ ] All pages match luxury brand standards
- [ ] luxury-visual-designer approved all components
- [ ] Magnetic cursor working on desktop
- [ ] 60fps animations throughout
- [ ] Mobile responsive all breakpoints

**Functionality:**
- [ ] All books/courses display correctly
- [ ] Stripe payments processing
- [ ] Writing AI generating content
- [ ] User authentication working
- [ ] Email sending successfully

**Performance:**
- [ ] Lighthouse Performance >95
- [ ] Lighthouse Accessibility 100
- [ ] First Contentful Paint <1.5s
- [ ] No console errors

**Backend:**
- [ ] backend-developer approved all API routes
- [ ] Database queries optimized
- [ ] Error handling comprehensive
- [ ] Security audit passed

**Content:**
- [ ] All Squarespace content migrated
- [ ] Images optimized
- [ ] SEO metadata complete
- [ ] 301 redirects configured

---

## Post-Launch Roadmap

### Month 1-3
- Monitor analytics
- Gather user feedback
- Fix bugs
- Optimize conversion funnels

### Month 4-6
- Launch mobile app
- Add podcast platform
- Implement community forums
- Expand AI features

### Month 7-12
- Live coaching sessions
- Certification programs
- Affiliate program
- Advanced personalization

---

## Agent Coordination Strategy

### Parallel Development

When possible, launch agents in parallel:

```bash
# Example: Building homepage
Task(luxury-visual-designer, "Create hero section")
Task(backend-developer, "Set up API routes")

# Both run simultaneously
```

### Sequential Review

For each feature:
1. Implement
2. Review by appropriate agent(s)
3. Iterate on feedback
4. Approve and merge

### Quality Gates

No code merges to main without:
- [ ] luxury-visual-designer approval (visual components)
- [ ] backend-developer approval (API/database code)
- [ ] Passing build
- [ ] TypeScript errors resolved

---

## Communication & Collaboration

### Weekly Milestones

**Week 1:** Foundation complete
**Week 2:** Design system + homepage
**Week 3:** Content migration complete
**Week 4:** E-commerce functional
**Week 5:** Database + writing AI
**Week 6:** Premium features
**Week 7:** Polish + optimization
**Week 8:** Launch!

### Review Meetings

- Daily: Progress check
- Weekly: Milestone review
- Bi-weekly: Design review with luxury-visual-designer concept
- End of each phase: Comprehensive testing

---

## Budget & Resources

### Development Tools (Free Tier)
- Vercel (Hobby plan)
- GitHub (Free)
- Vercel Postgres (Free tier)

### Paid Services (Estimated Monthly)
- Vercel Pro: $20/month (if needed)
- Stripe: 2.9% + $0.30 per transaction
- OpenAI API: ~$50-100/month
- Anthropic Claude: ~$50-100/month
- Resend: $20/month (10k emails)
- Domain: ~$15/year

**Total Estimated:** ~$140-240/month operational costs

---

## Conclusion

This workflow transforms selfactualize.life from a basic Squarespace site into a museum-quality luxury platform that rivals the world's top fashion brands in design excellence while delivering cutting-edge collective writing AI features.

**Success is measured not just in functionality, but in the emotional response the site evokes - that same feeling you get walking into a Louis Vuitton store or unboxing an Apple product.**

Let's build something extraordinary.

---

Last Updated: 2025-11-22
