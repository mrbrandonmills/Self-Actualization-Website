# Deployment Guide

## Issue: 145MB Laboratory Model

The professional laboratory 3D model is **145MB** and cannot be pushed to GitHub (100MB limit).

**Current Status:**
- ✅ Code is in Git
- ❌ 145MB model file is gitignored (won't deploy)
- ⚠️ Scene loads locally but NOT on Vercel

## Solution: Upload to Vercel Blob Storage

### Step 1: Create Vercel Blob Store
1. Go to https://vercel.com/dashboard
2. Select your project: `Self-Actualization-Website`
3. Go to **Storage** tab
4. Click **Create** → **Blob**
5. Create store named: `assets`
6. Copy the `BLOB_READ_WRITE_TOKEN`

### Step 2: Upload Model
```bash
# Install Vercel Blob SDK (if not installed)
npm install @vercel/blob

# Set token
export BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."

# Upload the 145MB model
node scripts/upload-assets.js
```

### Step 3: Configure Environment
The script will output a CDN URL. Add it to:

**Local `.env.local`:**
```bash
NEXT_PUBLIC_ASSETS_CDN=https://your-project.public.blob.vercel-storage.com
```

**Vercel Dashboard:**
1. Go to Settings → Environment Variables
2. Add: `NEXT_PUBLIC_ASSETS_CDN` = (same URL from above)
3. Apply to: Production, Preview, Development

### Step 4: Deploy
```bash
git push origin main
```

Vercel will auto-deploy and use the CDN URL for the model.

## Alternative: Temporary Smaller Model

If you need to deploy immediately without Blob Storage setup, I can:
1. Switch to Japanese Garden (31MB) - fits in Git
2. Or Persian Garden (100MB) - barely fits in Git

Let me know!
