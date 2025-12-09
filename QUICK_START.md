# 🚀 Quick Start - Store Setup

## Immediate Next Steps

### 1. Get Your Stripe Keys (5 minutes)

1. Go to [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. Copy your test keys
3. Update `.env.local`:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
```

### 2. Add Your 4th Book (2 minutes)

Open `src/data/books.ts` and add your 4th book details around line 74.

### 3. Test Locally (2 minutes)

```bash
npm run dev
```

Visit http://localhost:3000/books and test checkout with card `4242 4242 4242 4242`

### 4. Deploy to Vercel (5 minutes)

```bash
vercel --prod
```

Then add your Stripe keys in Vercel dashboard → Environment Variables.

---

## What's Been Set Up ✅

### Stripe Integration
- ✅ Full checkout flow for products/books
- ✅ Cart system with localStorage persistence
- ✅ Success page with order confirmation
- ✅ Webhook handler for payment events
- ✅ Loading states and error handling

### Store Features
- ✅ Beautiful liquid glass cart UI
- ✅ Product data structure ready
- ✅ Shipping address collection
- ✅ Multi-currency support (USD)

### Social Media
- ✅ Open Graph meta tags for Pinterest, Instagram, Facebook
- ✅ Social sharing buttons component
- ✅ Pinterest Rich Pins support
- ✅ Twitter Cards integration

### Deployment
- ✅ Vercel configuration with security headers
- ✅ Environment variable structure
- ✅ Webhook endpoint configured
- ✅ CDN for assets

---

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── checkout/
│   │   │   └── products/route.ts     # Product checkout API
│   │   └── webhooks/
│   │       └── stripe/route.ts       # Stripe webhook handler
│   ├── books/
│   │   └── page.tsx                  # Books catalog page
│   └── store/
│       └── success/page.tsx          # Purchase success page
├── components/
│   ├── social/
│   │   ├── SocialMeta.tsx           # SEO & social meta tags
│   │   └── SocialShare.tsx          # Share buttons
│   └── store/
│       └── CartWidget.tsx           # Shopping cart
├── contexts/
│   └── CartContext.tsx              # Cart state management
├── data/
│   ├── books.ts                     # Your books data
│   └── products.ts                  # Product catalog
└── lib/
    ├── stripe-client.ts             # Client-side Stripe
    └── stripe-server.ts             # Server-side Stripe
```

---

## Configuration Files

- **`.env.local`** - Local environment variables (Stripe keys, etc.)
- **`vercel.json`** - Deployment configuration
- **`STORE_SETUP_GUIDE.md`** - Complete setup guide
- **`STRIPE_SETUP.md`** - Original Stripe setup (for courses)

---

## Current Book Pricing

All books: **$9.99 each**

To change pricing, update the `price` field in `src/data/books.ts` (prices are in cents):

```typescript
price: 999,  // $9.99
price: 1499, // $14.99
price: 1999, // $19.99
```

---

## Testing Cards

| Card Number | Result |
|------------|--------|
| 4242 4242 4242 4242 | ✅ Success |
| 4000 0000 0000 0002 | ❌ Decline |
| 4000 0025 0000 3155 | 🔐 Requires authentication |

Use any future expiry date (e.g., 12/34) and any CVC (e.g., 123).

---

## Social Media Accounts Needed

Before going live, set up:

- [ ] Pinterest Business account
- [ ] Instagram Business account (linked to Facebook)
- [ ] Twitter/X account
- [ ] Facebook Page (optional but recommended)

Update social handles in `src/components/social/SocialMeta.tsx` (line 44-45):

```typescript
<meta name="twitter:creator" content="@yourhandle" />
<meta name="twitter:site" content="@yourhandle" />
```

---

## Support

Full documentation: `STORE_SETUP_GUIDE.md`

**Stripe Issues**: Check `.env.local` has correct keys and restart dev server

**Vercel Issues**: Ensure environment variables are set in dashboard

**Checkout Not Working**: Check browser console for errors

---

**You're almost there! Just add your Stripe keys and you're ready to sell! 🎉**
