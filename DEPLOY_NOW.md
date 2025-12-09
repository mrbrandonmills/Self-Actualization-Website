# 🚀 Deploy to Vercel - 3 Easy Options

Your store is ready to deploy! All changes are committed. Choose one of these methods:

---

## Option 1: GitHub Desktop (Easiest - 30 seconds) ✅

1. **Open GitHub Desktop app**
2. Click **"Push origin"** button (top right)
3. Done! Vercel will auto-deploy

---

## Option 2: VS Code (Quick - 1 minute)

1. **Open VS Code**
2. Go to **Source Control** tab (left sidebar)
3. Click **"..."** menu → **"Push"**
4. Done! Vercel will auto-deploy

---

## Option 3: Vercel Dashboard (Manual - 2 minutes)

1. Go to **https://vercel.com/dashboard**
2. Find your **"selfactualize"** project
3. Click **"Deployments"** tab
4. Click **"Redeploy"** on latest deployment
5. Or connect to GitHub and it will auto-deploy

---

## ⚠️ CRITICAL: After Deployment

**YOU MUST ADD STRIPE KEYS TO VERCEL!**

1. Go to https://vercel.com/dashboard
2. Select **"selfactualize"** project
3. **Settings** → **Environment Variables**
4. Click **"Add New"** and add these 3 variables:

### Variable 1:
```
Name: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Value: pk_test_51InphQLh14M3iXcGt1ECd1hbKKSokT7dsjrYlutwvbNzjLSrjOF8VI5qRpcsCAeqQGYRubUZMHXqDYZ7BSTj8ZND00MBDmpOA9
Environment: Production
```

### Variable 2:
```
Name: STRIPE_SECRET_KEY
Value: sk_test_51InphQLh14M3iXcGb0sBzlD1363NGdQ4sapjyHTkS38ZHcsArcTwcldLKlfdykRxsyY7O3va9lqJnKWVKpINRql600dbkQxN6R
Environment: Production
```

### Variable 3:
```
Name: NEXT_PUBLIC_SITE_URL
Value: https://selfactualize.life
Environment: Production
```

5. Click **Save**
6. **IMPORTANT:** Click **"Redeploy"** after adding env vars!

---

## ✅ What Will Be Deployed

- ✅ Complete Stripe checkout integration
- ✅ 4 books (Block A: $7.99, Block B: $9.99, Block C: $9.99, Trilogy: $24.99)
- ✅ Shopping cart with checkout
- ✅ Success page
- ✅ Social media sharing (Pinterest, Instagram, Facebook, Twitter)
- ✅ Amazon affiliate for Trilogy
- ✅ Security headers
- ✅ All documentation

---

## 🎉 After Deployment

Your store will be LIVE and ready to sell!

**Test it:**
1. Visit your live site
2. Go to /books
3. Add a book to cart
4. Test checkout with: `4242 4242 4242 4242`

---

**Commit Hash:** 13f0a9b
**Files Changed:** 14 files, 2019+ lines

**Just push and you're live!** 🚀
