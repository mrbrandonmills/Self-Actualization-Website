# 🛍️ Store Setup Guide - Self-Actualization Website

## Overview

Your store is now fully integrated with Stripe for direct book sales! This guide will walk you through the complete setup process to get your store live.

---

## 📋 Quick Checklist

- [ ] Get Stripe API keys
- [ ] Update `.env.local` with Stripe keys
- [ ] Add your 4th book to the books data
- [ ] Upload book cover images
- [ ] Set up Stripe webhook
- [ ] Configure Vercel environment variables
- [ ] Deploy to Vercel
- [ ] Test checkout flow
- [ ] Set up social media accounts
- [ ] Configure marketing automation

---

## 🔑 Step 1: Stripe Setup

### Get Your Stripe Keys

1. **Sign up for Stripe** (if you haven't already):
   - Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
   - Complete the account setup

2. **Get Test Keys** (for development):
   - Navigate to [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
   - Copy your **Publishable key** (starts with `pk_test_...`)
   - Copy your **Secret key** (starts with `sk_test_...`)

3. **Update `.env.local`**:
   ```bash
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY
   STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

### Test in Development

1. **Start your dev server**:
   ```bash
   npm run dev
   ```

2. **Test the checkout flow**:
   - Visit `http://localhost:3000/books`
   - Add a book to cart
   - Click checkout
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry (e.g., `12/34`)
   - Any CVC (e.g., `123`)

### Set Up Webhooks (Optional but Recommended)

Webhooks allow Stripe to notify your app when payments complete.

1. **Install Stripe CLI**:
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. **Login**:
   ```bash
   stripe login
   ```

3. **Forward webhooks**:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Copy the webhook secret** and add to `.env.local`:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
   ```

---

## 📚 Step 2: Add Your 4th Book

Open `src/data/books.ts` and uncomment/add your 4th book:

```typescript
{
  id: 'your-fourth-book-id',
  title: 'Your Book Title',
  subtitle: 'Your Subtitle',
  description: 'Full description of your book...',
  coverImage: '/books/book-4/cover.png',
  price: 999, // $9.99 in cents
  category: 'Laboratory',
  slug: 'your-book-slug',
  author: 'Rock Q Cool Box',
  featured: true,
  format: 'Digital PDF + ePub',
  publishDate: '2024',
}
```

---

## 🎨 Step 3: Upload Book Cover Images

1. Place your book cover images in: `public/books/`
2. Recommended structure:
   ```
   public/
   └── books/
       ├── block-a/
       │   └── 1.png
       ├── block-b/
       │   └── cover.png
       ├── block-c/
       │   └── cover.png
       └── block-d/
           └── cover.png
   ```

3. **Image specifications** for best social sharing:
   - **Size**: 1200×630px (for Open Graph)
   - **Format**: PNG or JPG
   - **File size**: Under 1MB
   - **Alternative sizes**: 1200×1200px (for Pinterest)

---

## 🚀 Step 4: Deploy to Vercel

### Initial Setup

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Link your project**:
   ```bash
   vercel link
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

   **For Production (Live Keys)**:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
   STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_PRODUCTION_WEBHOOK_SECRET
   NEXT_PUBLIC_SITE_URL=https://selfactualize.life
   NEXT_PUBLIC_ASSETS_CDN=https://kkzt5qgg975pmbhr.public.blob.vercel-storage.com
   ```

4. **Redeploy** after adding environment variables:
   ```bash
   vercel --prod
   ```

### Set Up Production Webhooks

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your production URL: `https://selfactualize.life/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret** and add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`

---

## 📱 Step 5: Social Media Integration

### Pinterest Setup

1. **Create a Pinterest Business account**:
   - Go to [pinterest.com/business](https://www.pinterest.com/business/create/)

2. **Claim your website**:
   - Add meta tag to your site (already set up in `SocialMeta.tsx`)
   - Verify domain ownership

3. **Create Rich Pins**:
   - Your site is already configured with Open Graph tags
   - Test with [Pinterest Rich Pins Validator](https://developers.pinterest.com/tools/url-debugger/)

4. **Add Pinterest widget** to your site (optional):
   - Get your Pinterest profile URL
   - Add follow button to footer/header

### Instagram Setup

1. **Create an Instagram Business account**
2. **Link to Facebook Page**
3. **Add Instagram handle** to social sharing:
   - Update Twitter creator in `SocialMeta.tsx` if you want to include Instagram handle

4. **Instagram Stories & Posts**:
   - Use share buttons on book pages to copy link
   - Share in Instagram stories with product stickers
   - Create product posts with book covers

### Social Sharing Features

Already implemented:
- ✅ Open Graph meta tags for all pages
- ✅ Pinterest-optimized images (Rich Pins)
- ✅ Share buttons (Pinterest, Facebook, Twitter, LinkedIn)
- ✅ Copy-to-clipboard functionality

**To use social sharing on book pages:**

Add to your book detail pages:

```tsx
import { SocialShare } from '@/components/social/SocialShare'
import { SocialMeta, generateBookMeta } from '@/components/social/SocialMeta'

// In your component:
<SocialMeta {...generateBookMeta(book)} />
<SocialShare
  url={`/books/${book.slug}`}
  title={book.title}
  description={book.description}
  image={book.coverImage}
  hashtags={['selfactualization', 'personalgrowth', 'transformation']}
/>
```

---

## 🤖 Step 6: Marketing Automation

### Email Marketing Setup

**Recommended: ConvertKit or Mailchimp**

1. **Create account** at [convertkit.com](https://convertkit.com) or [mailchimp.com](https://mailchimp.com)

2. **Create automation sequences**:
   - Welcome email after purchase
   - Book delivery email (with download links)
   - Follow-up sequence (days 1, 3, 7, 14, 30)

3. **Integrate with Stripe webhooks**:

   Update `src/app/api/webhooks/stripe/route.ts`:

   ```typescript
   case 'checkout.session.completed': {
     const session = event.data.object
     const customerEmail = session.customer_details?.email

     // Send to email provider
     await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         api_key: process.env.CONVERTKIT_API_KEY,
         email: customerEmail,
         fields: {
           first_name: session.customer_details?.name?.split(' ')[0],
           product: session.metadata?.cartItems,
         },
       }),
     })

     break
   }
   ```

### Social Media Automation

**Recommended: Buffer or Later**

1. **Schedule posts** showcasing books
2. **Auto-post** new blog content to social media
3. **Pinterest scheduling** for product pins

### Analytics Setup

**Google Analytics 4**:

1. Create GA4 property
2. Add tracking code to `app/layout.tsx`:

```tsx
import Script from 'next/script'

// In your layout:
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YOUR_ID');
  `}
</Script>
```

**Facebook Pixel** (for ads):

Similar setup in `app/layout.tsx` with Meta Pixel code.

---

## ✅ Step 7: Testing Checklist

### Before Going Live

- [ ] Test checkout with Stripe test card
- [ ] Verify webhook receives events (check Stripe dashboard logs)
- [ ] Test success page redirects correctly
- [ ] Cart persists across page reloads
- [ ] Social share buttons work on all platforms
- [ ] Open Graph images display correctly (use [opengraph.xyz](https://www.opengraph.xyz/))
- [ ] Mobile responsive design works
- [ ] Email notifications send (if configured)

### After Going Live

- [ ] Complete a real purchase with a small amount
- [ ] Verify customer receives confirmation email
- [ ] Check Stripe dashboard for payment
- [ ] Monitor webhook logs for any errors
- [ ] Test social sharing on real accounts
- [ ] Check Google Analytics tracking

---

## 🎯 Pricing Strategy

Current pricing: **$9.99 per book**

**Bundle options** to consider:

Update `src/data/products.ts` to add bundles:

```typescript
{
  id: 'complete-collection',
  name: 'Complete Laboratory Collection',
  type: 'bundle',
  price: 2999, // $29.99 (save $10)
  description: 'All 4 books in the Laboratory series',
  // ... other fields
}
```

---

## 🔧 Troubleshooting

### "Stripe keys not configured"
- Restart dev server after adding env vars
- Check `.env.local` has no typos
- Ensure keys start with `pk_test_` or `sk_test_`

### Checkout button doesn't work
- Check browser console for errors
- Verify Stripe publishable key is set
- Check network tab for API errors

### Webhook events not received
- Ensure Stripe CLI is running (`stripe listen`)
- Check webhook signature secret matches
- Verify webhook URL is correct

### Social images not showing
- Images must be absolute URLs
- Check image file exists in `public/` folder
- Validate with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

---

## 📞 Support & Resources

- **Stripe Docs**: [stripe.com/docs](https://stripe.com/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Pinterest for Business**: [business.pinterest.com](https://business.pinterest.com/)

---

## 🎉 You're Ready!

Your store is now fully configured with:

- ✅ Stripe payment processing
- ✅ Beautiful cart and checkout experience
- ✅ Social media integration (Pinterest, Instagram, Facebook, Twitter)
- ✅ Success page and email notifications
- ✅ Vercel deployment configuration
- ✅ Webhook support for order processing

**Next steps**:
1. Add your 4th book details
2. Get your Stripe keys
3. Deploy to Vercel
4. Start selling! 🚀

---

**Made with ⚗️ by The Self Actualized Life**
