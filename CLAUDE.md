# Self Actualize - Luxury Self-Actualization Platform

## Project Overview

**The Self Actualized Life** - A luxury digital platform for self-actualization featuring books, courses, collective writing AI, and premium content experiences that rival Louis Vuitton and Chanel in design quality.

**Brand Positioning:** Museum-quality self-development platform combining philosophy, psychology, and practical transformation tools.

**Tech Stack:**
- Next.js 16.0.7 (App Router + Turbopack)
- TypeScript 5.7.2
- Tailwind CSS + Framer Motion
- React Three Fiber + Drei (3D experiences)
- Vercel (Hosting + Edge Functions)
- Database: TBD (PostgreSQL via Vercel or Supabase for collective writing AI)
- Stripe (Premium course payments)
- AI Integration: OpenAI/Anthropic Claude for collective writing features

---

## 🚨 MANDATORY: Feature Review Process

**CRITICAL REQUIREMENT:** Every component, feature, and code addition MUST be reviewed by:

### 1. Luxury Visual Designer Review
**Agent:** `luxury-visual-designer`
**Scope:** ALL visual components, layouts, animations, and UI elements

**Launch when:**
- Creating new page layouts
- Building navigation components
- Designing product/course cards
- Implementing animations
- Adding any visual element

**Quality Standard:** Museum-quality aesthetics rivaling Louis Vuitton, Hermès, Chanel, and Gucci

### 2. Backend Code Review
**Agent:** `backend-developer`
**Scope:** ALL API routes, database queries, server components, and data logic

**Launch when:**
- Creating API routes
- Building database schemas
- Implementing authentication
- Adding payment processing
- Creating server actions

**Quality Standard:** Secure, optimized, scalable backend architecture

### Review Process Workflow

```bash
# For every new feature:

1. PLAN the feature (brainstorming skill if needed)

2. IMPLEMENT with appropriate agent:
   - Visual: Use luxury-visual-designer agent
   - Backend: Use backend-developer agent
   - Full-stack: Use both in parallel

3. REVIEW before merging:
   - luxury-visual-designer reviews ALL visual code
   - backend-developer reviews ALL backend code

4. ITERATE based on feedback

5. COMMIT only after passing both reviews
```

**No feature may be deployed without passing both applicable reviews.**

---

## Project Goals

### Primary Objectives

1. **Migrate from Squarespace to Webflow/Next.js**
   - Preserve existing content (books, courses, blog)
   - Upgrade to luxury design standards
   - Improve performance and SEO

2. **Implement Collective Writing AI Project**
   - Database-backed collaborative writing platform
   - AI-assisted content generation
   - User contribution tracking
   - Version control for collaborative works

3. **Premium E-Commerce Experience**
   - Book sales (digital + physical)
   - Course enrollment system
   - Premium membership tiers
   - Stripe integration

4. **Luxury Brand Experience**
   - Louis Vuitton-level visual design
   - Cinematic animations
   - Magnetic cursor interactions
   - Glassmorphism effects
   - 60fps performance

---

## Architecture

### Directory Structure

```
/app                          # Next.js App Router
  /api                       # API routes (force-dynamic)
    /books                   # Book management
    /courses                 # Course enrollment
    /writing                 # Collective writing AI
    /stripe                  # Payment processing
    /webhooks                # External webhooks
  /books                     # Book catalog pages
  /courses                   # Course pages
  /writing                   # Collective writing interface
  /blog                      # Content/articles
  /about                     # About/mission pages
  /admin                     # Admin dashboard

/components                   # React components
  /ui                        # Reusable luxury UI components
  /books                     # Book-specific components
  /courses                   # Course components
  /writing                   # Writing platform components

/lib                         # Utilities and helpers
  /design-tokens.ts          # Luxury design system
  /db                        # Database utilities
  /ai                        # AI integration helpers

/data                        # Static data files
/public                      # Static assets
```

---

## Critical Build Patterns

### API Routes with Third-Party SDKs

**IMPORTANT:** Never initialize third-party SDK clients at the module level in API routes.

#### ❌ Wrong Pattern (Causes Build Errors)

```typescript
import Stripe from 'stripe'

// This will FAIL during build when env vars aren't available
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

export async function POST(request: Request) {
  const session = await stripe.checkout.sessions.create({...})
}
```

#### ✅ Correct Pattern (Lazy Initialization)

```typescript
import Stripe from 'stripe'

// Always add this to API routes
export const dynamic = 'force-dynamic'

// Lazy initialization - SDK created only when route is called
function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-11-20.acacia',
  })
}

export async function POST(request: Request) {
  const stripe = getStripe()
  const session = await stripe.checkout.sessions.create({...})
}
```

---

## Key Features to Implement

### Phase 1: Foundation (Week 1-2) ✅ COMPLETED
- [x] Next.js project setup with TypeScript
- [x] Luxury design system (design tokens, CSS effects)
- [x] **3D Book Journey Homepage** - KASANÉ-style flying book with 87 pages
- [x] Lenis smooth scroll integration
- [x] Bunsen burner loading screen (Laboratory theme)
- [x] High-res cover textures (front + back)
- [x] Dynamic scroll-based lighting system
- [x] Page preloading system (89 assets)
- [x] **Museum3D Gallery** - Award-worthy 3D book display with pedestals
- [x] **FlipBook Component** - 19-page interactive preview with CSS 3D transforms
- [x] Amazon affiliate integration (selfactualize.life-20)
- [x] Security updates (Next.js 16.0.7, React 19.2.1)

**Review Requirements:**
- luxury-visual-designer: ALL visual components
- backend-developer: Project setup, database schema

### Phase 2: Content Migration (Week 2-3) 🚧 IN PROGRESS
- [x] Books catalog page - Museum3D Gallery implemented
- [x] FlipBook preview system - Working with 19 pages
- [ ] **PENDING:** Blocks B & C page integration (user will provide)
- [ ] Course catalog page
- [ ] Blog migration from Squarespace
- [ ] About/Mission pages
- [ ] SEO optimization

**Review Requirements:**
- luxury-visual-designer: Book/course card designs, layouts
- backend-developer: Content fetching, data structures

### Phase 3: E-Commerce (Week 3-4)
- [ ] Stripe payment integration
- [ ] Book purchase flow
- [ ] Course enrollment system
- [ ] Shopping cart with glassmorphism
- [ ] Payment success/failure pages

**Review Requirements:**
- luxury-visual-designer: Cart UI, checkout flow
- backend-developer: Payment routes, webhook handling

### Phase 4: Collective Writing AI (Week 4-6)
- [ ] Database schema for collaborative writing
- [ ] User authentication system
- [ ] Writing interface with AI assistance
- [ ] Version control for collaborative works
- [ ] AI content generation integration
- [ ] User contribution tracking

**Review Requirements:**
- luxury-visual-designer: Writing interface, AI interactions
- backend-developer: Database design, AI integration, auth

### Phase 5: Premium Features (Week 6-7)
- [ ] Membership tiers
- [ ] Premium content gating
- [ ] Email integration (Resend)
- [ ] Analytics dashboard
- [ ] Admin panel

**Review Requirements:**
- luxury-visual-designer: Admin UI, membership pages
- backend-developer: Auth logic, gating, analytics

### Phase 6: Polish & Launch (Week 7-8)
- [ ] Performance optimization
- [ ] Accessibility audit (WCAG AA)
- [ ] Mobile optimization
- [ ] SEO final pass
- [ ] Production deployment

**Review Requirements:**
- luxury-visual-designer: Final polish, mobile experience
- backend-developer: Performance, security audit

---

## Database Design (Collective Writing AI)

### Initial Schema Concepts

```typescript
// Users table
interface User {
  id: string
  email: string
  name: string
  role: 'contributor' | 'editor' | 'admin'
  createdAt: Date
}

// Writing Projects
interface WritingProject {
  id: string
  title: string
  description: string
  status: 'draft' | 'active' | 'completed'
  createdBy: string // User ID
  createdAt: Date
  updatedAt: Date
}

// Contributions
interface Contribution {
  id: string
  projectId: string
  userId: string
  content: string
  version: number
  aiAssisted: boolean
  createdAt: Date
  approved: boolean
}

// AI Generations
interface AIGeneration {
  id: string
  projectId: string
  contributionId: string
  prompt: string
  output: string
  model: string
  createdAt: Date
}
```

**Database Options:**
1. **Vercel Postgres** - Native Vercel integration
2. **Supabase** - PostgreSQL + real-time features
3. **PlanetScale** - MySQL with branching

**Recommendation:** Vercel Postgres for simplicity, or Supabase for real-time collaborative features.

---

## Design System Foundation

### Luxury Design Tokens

Based on Webdesigner luxury patterns:

**Colors:**
- Black: `#000000` (primary text, backgrounds)
- White: `#FFFFFF` (clean backgrounds)
- Gold: `#C9A050` (accent, CTAs, highlights)
- Gold Light: `#D4AF37` (hover states)
- Gold Dark: `#B89040` (pressed states)

**Typography:**
- Serif: Playfair Display, Cormorant Garamond (headings)
- Sans: Inter, -apple-system (body text)
- Scale: 12px → 128px (9xl for hero)

**Animation:**
- Luxury easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Spring physics for natural movement
- 60fps GPU-accelerated (transform + opacity only)

**Effects:**
- Glassmorphism (backdrop blur + saturation)
- Magnetic cursor (100px detection radius)
- Shimmer loading states
- Gold glow effects
- 3D card transforms

---

## Environment Variables

```bash
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...  # For migrations

# Authentication (if using NextAuth.js)
NEXTAUTH_URL=https://selfactualize.life
NEXTAUTH_SECRET=your_secret

# Stripe
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...

# AI Integration
OPENAI_API_KEY=sk_...
ANTHROPIC_API_KEY=sk-ant-...

# Email
RESEND_API_KEY=re_...

# Base URL
NEXT_PUBLIC_BASE_URL=https://selfactualize.life

# Vercel
VERCEL_URL=auto-populated
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

---

## Deployment

### Vercel Configuration

**Build Command:** `npm run build`
**Output Directory:** `.next`
**Install Command:** `npm install`

**Environment Variables:** Add all secrets in Vercel dashboard

**Domains:**
- Production: `selfactualize.life` (or custom domain)
- Preview: Auto-generated for each branch

---

## Code Standards

### TypeScript
- Strict mode enabled
- No `any` types - use `unknown` or proper typing
- Interfaces for all data structures
- Zod for runtime validation

### API Routes
- Always use `export const dynamic = 'force-dynamic'`
- Lazy initialization for SDK clients
- Validate inputs with Zod
- Proper error handling with try/catch
- Return appropriate HTTP status codes

### Components
- Server components by default
- `'use client'` only when needed
- Custom hooks for reusable logic
- Focused, single-purpose components

### Luxury Design Standards
- 60fps animations (transform + opacity only)
- Magnetic cursor on interactive elements
- Glassmorphism for premium feel
- Shimmer loading states
- Gold accents sparingly
- Museum-quality spacing

---

## Testing Checklist

Before each deployment:
- [ ] Local build succeeds (`npm run build`)
- [ ] TypeScript errors resolved
- [ ] luxury-visual-designer reviewed visual components
- [ ] backend-developer reviewed API routes
- [ ] All environment variables set in Vercel
- [ ] Database migrations applied
- [ ] Lighthouse score >90 (Performance, Accessibility, SEO)
- [ ] Mobile responsive tested
- [ ] Accessibility keyboard navigation works

---

## Development Workflow

1. **Plan Feature**
   - Use brainstorming skill if needed
   - Define clear requirements
   - Design database schema if applicable

2. **Implement with Agent Review**
   ```bash
   # Visual components
   Task tool → luxury-visual-designer

   # Backend logic
   Task tool → backend-developer
   ```

3. **Test Locally**
   ```bash
   npm run dev
   npm run build
   ```

4. **Review Process**
   - Visual review by luxury-visual-designer
   - Backend review by backend-developer
   - Iterate based on feedback

5. **Commit & Deploy**
   ```bash
   git add -A
   git commit -m "feat: descriptive message"
   git push
   ```

6. **Verify Production**
   - Check Vercel deployment
   - Test on live URL
   - Monitor for errors

---

## Claude Code Instructions

### DO NOT Create Documentation
**NEVER create documentation files for completed work.** This includes:
- README files for features
- Setup guides
- Plan documents
- Markdown summaries

Just write the code and commit it. The user will ask if they need docs.

### Agent Usage Guidelines

**Always use Task tool for:**
- luxury-visual-designer: ALL visual components
- backend-developer: ALL API routes and database code
- qa-engineer: Testing after major features
- integration-test-validator: Before production deployment

**Launch agents in parallel when possible:**
```typescript
// Single message with multiple Task calls
Task(luxury-visual-designer, "Review hero component")
Task(backend-developer, "Review API route")
```

---

## Success Metrics

### Design Quality
- Aesthetic matches Louis Vuitton/Chanel luxury standards
- All interactions feel premium (60fps, smooth)
- Magnetic cursor enhances UX
- Glassmorphism used tastefully

### Performance
- Lighthouse Performance: 95+
- Lighthouse Accessibility: 100
- First Contentful Paint: <1.5s
- Time to Interactive: <3s

### Business Goals
- Book sales conversion rate
- Course enrollment rate
- Collective writing participation
- User retention and engagement

---

## Collective Writing AI Features

### Core Functionality

1. **Project Creation**
   - Users create collaborative writing projects
   - Define theme, genre, goals
   - Set collaboration rules

2. **AI-Assisted Writing**
   - Claude/GPT integration for suggestions
   - Style matching based on existing content
   - Plot consistency checking
   - Character development assistance

3. **Version Control**
   - Track all contributions
   - Approve/reject changes
   - Merge different storylines
   - History visualization

4. **Collaboration Tools**
   - Real-time editing indicators
   - Comments and feedback
   - Voting on direction
   - Role-based permissions

---

## Migration from Squarespace

### Content Audit
1. Books catalog
2. Courses offered
3. Blog posts
4. About/Mission pages
5. Media assets (images, videos)

### Migration Strategy
1. Export Squarespace content (XML/API)
2. Parse and transform to Next.js data structure
3. Recreate layouts with luxury design
4. Migrate images to Vercel Blob/Cloudinary
5. Set up 301 redirects for SEO
6. Test all content rendering
7. Launch with DNS switch

---

## Future Enhancements

### Phase 7+
- [ ] Mobile app (React Native)
- [ ] Podcast platform integration
- [ ] Live coaching sessions
- [ ] Community forums
- [ ] Certification programs
- [ ] Affiliate program
- [ ] Advanced AI features (voice synthesis, image generation)

---

## 🏛️ Museum3D Gallery Implementation

### Component Architecture
**File:** `src/components/gallery/Museum3DGallery.tsx`

**Features:**
- React Three Fiber 3D canvas with Turbopack optimization
- 3D book models on museum pedestals (dark teal + gold)
- Interactive hover effects (lift, rotate, golden glow)
- Click to preview flip book (not direct Amazon links)
- Dramatic lighting system (spotlights + ambient)
- Floating animations via Drei Float component
- 2D card grid fallback below 3D scene
- Amazon affiliate CTA on last page of flip book

### Custom Texture Loading Pattern
```typescript
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
```

### Critical Lessons Learned

#### 1. Text3D Component Requires Font Files
**Problem:** Text3D from `@react-three/drei` needs font JSON files or causes production crash.

```typescript
// ❌ FAILS without /public/fonts/playfair-display-regular.json
<Text3D font="/fonts/playfair-display-regular.json" ...>
  THE LABORATORY OF LIFE
</Text3D>
```

**Solution Options:**
- Generate font JSON using Facetype.js
- Use troika-three-text (no JSON required)
- Use HTML text overlays
- Skip 3D text entirely

#### 2. Turbopack CSS Import Order
**Critical:** Next.js 16 Turbopack enforces strict CSS import order.

```css
/* ❌ WRONG - Build fails */
@tailwind base;
@import '../styles/globals.css';

/* ✅ CORRECT - @import FIRST */
@import '../styles/globals.css';
@tailwind base;
```

#### 3. Next.js 16 Turbopack Configuration
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  reactStrictMode: false, // Required for R3F
  turbopack: {}, // Required for Next.js 16

  // REMOVED - deprecated in Next.js 16
  // eslint: { ignoreDuringBuilds: true },
}
```

### Flip Book Integration
**File:** `src/components/books/FlipBook.tsx`

**Working Features:**
- 19 pages per book (Block A fully functional)
- CSS 3D page turn animation (600ms duration)
- Keyboard navigation (Arrow keys, Escape)
- Progress bar and page counter
- Amazon affiliate link on last page
- AnimatePresence for smooth modal transitions
- Mobile responsive

**Page Structure:**
```
/public/books/
  /block-a/
    1.png   → Front cover (Vitruvian brain)
    2-18.png → Content pages
    19.png  → Conclusion + Amazon CTA
```

### Pending Tasks
1. **Receive Blocks B & C from user** (ZIP files)
2. Extract pages to `/public/books/block-b/` and `/public/books/block-c/`
3. Update `src/data/books.ts` with correct cover paths
4. Update `getBookPages()` function in Museum3DGallery for dynamic routing
5. Mobile testing (iOS Safari, Android Chrome)
6. WebGL fallback for older devices

### Production Status
- ✅ Next.js 16.0.7 (0 vulnerabilities)
- ✅ React 19.2.1 (0 vulnerabilities)
- ✅ Turbopack enabled and working
- ✅ CSS import order compliant
- ✅ 3D gallery stable in production
- ✅ All builds passing

**Live URL:** https://selfactualize-git-main-brandons-projects-c4dfa14a.vercel.app/books

---

## Support & Resources

### Documentation
- Design System: `/docs/DESIGN_SYSTEM.md`
- API Reference: `/docs/API.md`
- Database Schema: `/docs/DATABASE.md`

### Learning Resources
- Framer Motion: https://www.framer.com/motion/
- Next.js 15: https://nextjs.org/docs
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres

---

Last Updated: 2025-12-10

**This is not just a website. This is a luxury self-actualization experience.**

---

## 🎓 AI-Native Course Platform (LIVE)

### Status: PRODUCTION READY ✅

**URL:** https://selfactualize.life

### Tech Stack
- **Database:** Railway PostgreSQL (Prisma ORM)
- **Auth:** NextAuth.js v5 with credentials + Google OAuth
- **Payments:** Stripe Checkout with webhooks
- **AI Tutor:** Claude Sonnet 4 with streaming SSE
- **Voice:** ElevenLabs TTS (4 voice options)
- **Email:** Resend (domain verified: selfactualize.life)

### Features Implemented

#### 6 Courses with 200 Lessons
| Course | Weeks | Lessons | Block |
|--------|-------|---------|-------|
| Engineering Your Patterns | 6 | 30 | A |
| Self-Actualization Process | 6 | 30 | A |
| Art of Right Judgment | 6 | 30 | B |
| Structuring Decisions in Chaos | 6 | 30 | B |
| Laboratory of Living | 8 | 40 | C |
| Conscious Integration | 8 | 40 | C |

#### XP & Gamification System
- 50 XP per lesson completion
- Level = XP / 1000 + 1
- Streak tracking (consecutive days)
- Longest streak record
- Real-time dashboard updates

#### Guest Checkout → Auto Account Creation
1. Guest pays via Stripe (no login required)
2. Webhook creates account with temp password
3. Welcome email sent via Resend
4. User enrolled in purchased course(s)
5. Login with email + temp password

#### Learning Environment
- `body.learning-mode` hides main nav/footer
- Dashboard and lesson pages are isolated
- Clean top bar: "Back to Site" | "Learning Portal" | "Browse Courses"
- AI Tutor sidebar with streaming responses
- Voice toggle with ElevenLabs TTS

### Admin Test Accounts
| Email | Password | Role |
|-------|----------|------|
| brandonflexy@gmail.com | SelfActualize2025! | ADMIN |
| jesseadoherty@gmail.com | SelfActualize2025! | ADMIN |

### API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/[...nextauth]` | * | NextAuth.js handler |
| `/api/auth/signup` | POST | User registration |
| `/api/checkout` | POST | Stripe checkout session |
| `/api/dashboard` | GET | User dashboard data |
| `/api/enrollment/check` | GET | Check course access |
| `/api/progress` | GET/POST/PATCH | Lesson progress + XP |
| `/api/tutor` | POST | AI Tutor streaming |
| `/api/voice` | GET/POST | ElevenLabs TTS |
| `/api/webhooks/stripe` | POST | Payment webhooks |

### Environment Variables (Vercel Production)
```
DATABASE_URL          # Railway PostgreSQL
DIRECT_URL            # Railway PostgreSQL (direct)
NEXTAUTH_SECRET       # Auth encryption
NEXTAUTH_URL          # https://selfactualize.life
ANTHROPIC_API_KEY     # Claude AI
ELEVENLABS_API_KEY    # Voice TTS
RESEND_API_KEY        # Transactional emails
STRIPE_SECRET_KEY     # Payments
STRIPE_WEBHOOK_SECRET # Webhook verification
```

### Key Files

| File | Purpose |
|------|---------|
| `/src/lib/auth.ts` | NextAuth.js config |
| `/src/lib/prisma.ts` | Prisma client singleton |
| `/src/lib/claude.ts` | AI Tutor client |
| `/src/lib/elevenlabs.ts` | Voice synthesis |
| `/src/lib/resend.ts` | Email client |
| `/src/data/courses.ts` | Course definitions |
| `/src/data/lessons.ts` | Lesson content |
| `/prisma/schema.prisma` | Database schema |
| `/prisma/seed.ts` | Database seeding |

### Database Commands
```bash
npm run db:seed              # Seed courses + lessons
npm run db:seed:admins       # Create admin accounts
npm run db:reset:admin-progress  # Reset test data
npx prisma db push           # Push schema changes
npx prisma studio            # Visual database editor
```
