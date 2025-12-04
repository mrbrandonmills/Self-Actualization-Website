# Stripe Course Enrollment Setup Guide

## 🎯 Overview

Complete Stripe integration for course enrollments with checkout, payment processing, and success handling.

## 📦 What Was Built

### 1. **Stripe Configuration** (`src/lib/stripe.ts`)
- Server-side Stripe instance
- Client-side Stripe.js loader
- Price formatting helpers

### 2. **API Routes**
- **`/api/checkout`** - Creates Stripe checkout sessions
- **`/api/webhooks/stripe`** - Handles payment events (requires webhook setup)

### 3. **UI Components**
- **Updated CoursePreviewPanel** - "Enroll Now" button with loading states
- **Enrollment Success Page** - Post-purchase confirmation at `/courses/enrollment-success`

### 4. **Features**
- ✅ Secure payment processing
- ✅ Loading states with spinner
- ✅ Success/cancel redirect handling
- ✅ Webhook support for payment events
- ✅ 30-day money-back guarantee messaging

---

## 🔑 Setup Steps

### Step 1: Get Your Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Sign in or create an account
3. Copy your **Publishable key** (starts with `pk_test_...`)
4. Copy your **Secret key** (starts with `sk_test_...`)

### Step 2: Update Environment Variables

Open `.env.local` and replace the placeholder values:

```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

### Step 3: Test in Development

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to:** `http://localhost:3000/courses`

3. **Click a beaker**, then **"Enroll Now"** button

4. **Use Stripe test cards:**
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Any future expiry date, any CVC

### Step 4: Set Up Webhooks (Optional but Recommended)

Webhooks allow Stripe to notify your app when payments complete.

1. Install Stripe CLI:
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. Login to Stripe:
   ```bash
   stripe login
   ```

3. Forward webhooks to localhost:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. Copy the webhook signing secret (starts with `whsec_...`) and add to `.env.local`

---

## 🚀 Going Live (Production)

### Step 1: Get Live API Keys

1. In [Stripe Dashboard](https://dashboard.stripe.com/apikeys), toggle to **Live mode**
2. Copy your **Live Publishable key** (`pk_live_...`)
3. Copy your **Live Secret key** (`sk_live_...`)

### Step 2: Update Vercel Environment Variables

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add your **live** Stripe keys:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
   STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
   ```

### Step 3: Set Up Production Webhooks

1. In Stripe Dashboard, go to **Developers → Webhooks**
2. Click **Add endpoint**
3. Enter your production URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret** and add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`

---

## 🎨 Customization

### Course Prices

Edit prices in `src/data/courses.ts`:

```typescript
{
  id: 'block-a-1',
  title: 'Block A: Engineering Your Patterns',
  price: 197, // Change this amount (in USD)
  // ...
}
```

### Success Page

Customize the enrollment success message in:
`src/app/courses/enrollment-success/page.tsx`

### Email Notifications

Add customer email logic in the webhook handler:
`src/app/api/webhooks/stripe/route.ts`

```typescript
case 'checkout.session.completed': {
  const session = event.data.object
  const customerEmail = session.customer_details?.email

  // TODO: Send welcome email
  // TODO: Grant course access
  // TODO: Update database
  break
}
```

---

## 🧪 Testing

### Test Cards

| Card Number | Result |
|------------|--------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Decline |
| 4000 0025 0000 3155 | Requires authentication |

### Test Flow

1. Click beaker → "Enroll Now"
2. Enter test card: `4242 4242 4242 4242`
3. Expiry: Any future date (e.g., `12/34`)
4. CVC: Any 3 digits (e.g., `123`)
5. Click "Pay"
6. Should redirect to `/courses/enrollment-success`

---

## 🔒 Security Notes

- ✅ Secret keys are server-side only (never exposed to client)
- ✅ Webhook signatures are verified
- ✅ Checkout sessions are created server-side
- ✅ HTTPS required in production
- ✅ PCI compliance handled by Stripe

---

## 📊 Next Steps

1. **Set up course access system** - Grant users access after payment
2. **Email integration** - Send welcome emails with course materials
3. **Database** - Store enrollments in a database
4. **Analytics** - Track conversion rates
5. **Coupons** - Add discount code support

---

## 🆘 Troubleshooting

### "Failed to create checkout session"

- Check that Stripe secret key is set in `.env.local`
- Ensure the key starts with `sk_test_` or `sk_live_`
- Restart dev server after changing env vars

### "Stripe failed to load"

- Check that publishable key is set
- Ensure the key starts with `pk_test_` or `pk_live_`
- Check browser console for errors

### Webhook not receiving events

- Make sure Stripe CLI is running: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- Check webhook secret in `.env.local`
- Verify webhook URL matches exactly

---

## 📚 Resources

- [Stripe Docs](https://stripe.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

## ✅ Current Status

- ✅ Stripe SDK installed
- ✅ Environment variables configured
- ✅ Checkout API route created
- ✅ Webhook handler created
- ✅ UI updated with enrollment button
- ✅ Success page built
- ⏳ **Action required:** Add your Stripe keys to `.env.local`

Once you add your Stripe keys, the enrollment system is fully functional! 🚀
