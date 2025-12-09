# Add Your Stripe Keys

## Step 1: Get Your Keys

Go to: https://dashboard.stripe.com/test/apikeys

Copy:
- **Publishable key** (pk_test_...)
- **Secret key** (sk_test_...)

## Step 2: Update .env.local

Open `.env.local` and replace the placeholders:

```bash
# Replace these lines:
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# With your actual keys:
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...  (paste your actual key)
STRIPE_SECRET_KEY=sk_test_51...  (paste your actual key)
STRIPE_WEBHOOK_SECRET=whsec_...  (you'll get this after setting up webhooks)
```

## Step 3: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000/books and test checkout!

## Step 4: Add to Vercel (Production)

1. Go to https://vercel.com/dashboard
2. Select "selfactualize" project
3. Settings → Environment Variables
4. Add the same variables (but use LIVE keys: pk_live_... and sk_live_...)

---

**Can't find your keys?**
- Check Vercel dashboard: https://vercel.com/dashboard
- Check Railway: https://railway.app/ (if you use it)
- Generate new test keys: https://dashboard.stripe.com/test/apikeys
