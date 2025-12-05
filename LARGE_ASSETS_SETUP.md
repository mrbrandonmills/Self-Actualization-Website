# Large Assets Storage Setup with Supabase

## Why Supabase Storage?
- Free tier: 1GB storage
- Up to 50GB files supported
- Built-in CDN
- Reusable across all your projects
- Much better than Git LFS or Vercel Blob

## Setup Instructions

### 1. Create Supabase Project (One-time setup)
1. Go to https://supabase.com
2. Create account / Sign in
3. Create new project: "brandon-mills-assets"
4. Note your Project URL and anon key

### 2. Create Storage Bucket
1. In Supabase Dashboard → Storage
2. Create new bucket: `3d-models`
3. Make it PUBLIC (for CDN access)
4. Upload files:
   - `laboratory-in-the-swamp/source/scene.glb` (145MB)
   - `laboratory-in-the-swamp/textures/` (all 239 texture files)

### 3. Get CDN URLs
After upload, your file will be at:
```
https://[your-project-id].supabase.co/storage/v1/object/public/3d-models/laboratory-in-the-swamp/source/scene.glb
```

### 4. Update Environment Variables
Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_ASSETS_CDN=https://[your-project-id].supabase.co/storage/v1/object/public/3d-models
```

### 5. Update Code
The code will automatically use:
```typescript
const assetPath = `${process.env.NEXT_PUBLIC_ASSETS_CDN}/laboratory-in-the-swamp/source/scene.glb`
```

## Current Large Assets
- **Laboratory in the Swamp**: 145MB GLB + 239 texture files
  - Local path: `/Users/brandon/Downloads/laboratory-in-the-swamp/`
  - Upload to: `3d-models/laboratory-in-the-swamp/`

## Future Pattern
For ALL future large assets (>50MB):
1. Keep them OUT of Git
2. Upload to Supabase Storage bucket
3. Reference via CDN URL in code
4. Add to `.gitignore`

## Benefits
✅ No Git bloat
✅ Fast CDN delivery
✅ Reusable across projects
✅ No size limits (up to 50GB)
✅ Free tier sufficient
