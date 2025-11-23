# Garden Entrance Video Sources

This directory contains the video files used for the cinematic entrance sequence.

## IMPORTANT: NO WebGL, NO 3D Graphics, NO Particle Systems

This is a SIMPLE video entrance using REAL footage. Professional, clean, and Wes Anderson-inspired.

---

## Required Videos

### Primary: `garden-entrance.mp4`
- **Duration:** 5-7 seconds
- **Resolution:** 1920x1080 (Full HD minimum, 4K preferred)
- **Aspect Ratio:** 16:9
- **Frame Rate:** 24fps or 30fps (NOT 60fps - too modern)
- **File Size:** Under 5MB if possible

**What it should show:**
- POV shot walking down a symmetrical garden path
- Formal hedges on both sides
- Warm, natural lighting (golden hour or soft afternoon)
- Clean, professional quality
- Wes Anderson aesthetic (symmetrical, pastel colors)

### Backup: `garden-entrance.webm`
- Same specs as MP4
- WebM format for browser compatibility

---

## Where to Find Free Garden Path Videos

### 1. Pexels (FREE, High Quality) ⭐ RECOMMENDED
**URL:** https://www.pexels.com/search/videos/garden%20path/

**Best Search Terms:**
- "garden path walk"
- "formal garden POV"
- "hedge garden"
- "greenhouse entrance"
- "symmetrical garden"
- "botanical garden path"

**What to Look For:**
- ✅ POV (first-person) walking shots
- ✅ Symmetrical compositions (centered)
- ✅ Natural, soft lighting
- ✅ Pastel or muted colors
- ✅ Slow, smooth camera movement
- ❌ Chaotic or messy scenes
- ❌ Oversaturated colors
- ❌ Shaky handheld footage

**How to Download:**
1. Find a video that matches Wes Anderson aesthetic
2. Click "Free Download"
3. Choose "Full HD" (1920x1080) or "4K"
4. Rename to `garden-entrance.mp4`
5. Place in `/public/videos/`
6. Test on the website

---

### 2. Pixabay (FREE, High Quality)
**URL:** https://pixabay.com/videos/search/garden%20path/

**Search Terms:**
- "garden walk"
- "formal garden"
- "botanical garden path"
- "zen garden"
- "park path"

**Download Steps:**
1. Select a suitable video
2. Click "Free Download"
3. Choose 1920x1080 or higher
4. Rename to `garden-entrance.mp4`
5. Place in `/public/videos/`

---

### 3. Artgrid (PREMIUM, Professional)
**URL:** https://artgrid.io/

**Cost:** $25/month subscription
**Quality:** Professional cinematic footage

**Why Artgrid:**
- Professional color grading
- Cinematic camera movements
- High-quality 4K footage
- Wes Anderson-style aesthetics
- Perfect for commercial projects

**Search Terms:**
- "garden path dolly"
- "formal garden walk"
- "hedge maze"
- "botanical garden POV"

---

## Wes Anderson Video Characteristics

When selecting videos, look for these qualities:

### ✅ Perfect Composition:
- Perfectly symmetrical framing
- Centered subjects
- Clean, organized layouts
- Flat, frontal perspective

### ✅ Color Palette:
- Muted pastels (soft pinks, greens, yellows)
- Warm, natural tones
- Slightly desaturated (NOT neon)
- Cream, beige, sage, dusty rose
- Like old photographs

### ✅ Camera Movement:
- Smooth, slow dolly shots
- Steady, deliberate movements
- POV walking forward
- NO shaky handheld
- NO fast pans or zooms

### ✅ Lighting:
- Soft, diffused light
- Golden hour (warm afternoon)
- Overcast (even lighting, no harsh shadows)
- NO harsh midday sun
- NO strong contrast

---

## Video Editing (If Needed)

### Free Tools:
- **iMovie** (Mac) - Basic trimming and color
- **DaVinci Resolve** (Free) - Professional grading
- **HandBrake** (Free) - Video compression

### Recommended Edits:

**1. Trim to 5-7 seconds:**
```bash
# Using FFmpeg (free command-line tool)
ffmpeg -i input.mp4 -ss 00:00:02 -t 00:00:07 -c copy garden-entrance.mp4
```

**2. Color Grading (Wes Anderson Look):**
- Slightly desaturate (90-95% saturation)
- Add warmth (+5-10 temperature)
- Lift shadows (softer blacks)
- Lower contrast (5-10%)

**3. Compress File Size:**
```bash
# Optimize for web (under 5MB)
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -vf "scale=1920:1080" -an garden-entrance.mp4
```

---

## Fallback: Static Images

If video doesn't work, use high-quality photos with Ken Burns effect.

### Required Images:
Place in `/public/images/`:

1. `garden-entrance.jpg` - Main path view
2. `garden-path-1.jpg` - Distant view
3. `garden-path-2.jpg` - Mid-distance
4. `garden-path-3.jpg` - Close view

**Image Sources (Free):**
- **Unsplash:** https://unsplash.com/s/photos/formal-garden
- **Pexels:** https://www.pexels.com/search/garden%20path/

**Search Terms:**
- "formal garden path"
- "symmetrical garden"
- "botanical garden walkway"
- "hedge garden"
- "Versailles garden"

---

## AI Video Generation (Optional)

If using Sora, Runway, or other AI tools:

**Prompt 1 (BEST):**
```
POV walking down a perfectly symmetrical formal garden path, pastel flowers on both sides, neatly trimmed hedges, warm afternoon sunlight filtering through trees, Wes Anderson aesthetic, muted pastel colors, cream and beige tones, cinematic 4K, slow smooth dolly movement, 24fps
```

**Prompt 2:**
```
First-person view slowly moving through a vintage botanical garden greenhouse, symmetrical composition, soft pink and yellow flowers, cream-colored pathways, warm natural lighting, film photography aesthetic, peaceful and whimsical, Wes Anderson color palette
```

**Prompt 3:**
```
Walking towards a yellow garden door at the end of a formal hedge maze, centered composition, pastel green hedges, warm beige gravel path, golden hour lighting, Wes Anderson style, elegant and serene, 5 seconds
```

---

## File Structure

```
/public/videos/
├── README.md (this file)
├── garden-entrance.mp4  ← MAIN ENTRANCE VIDEO (required)
├── garden-entrance.webm ← Browser fallback (optional)
└── .gitkeep
```

---

## Current Status

- [ ] `garden-entrance.mp4` - NOT ADDED YET (REQUIRED)
- [ ] `garden-entrance.webm` - NOT ADDED YET (optional)
- [ ] Fallback images - NOT ADDED YET (optional)

**Action Required:**
1. Download a suitable video from Pexels (free)
2. Rename to `garden-entrance.mp4`
3. Place in `/public/videos/`
4. Test: `npm run dev` → http://localhost:3000
5. Verify entrance plays smoothly

---

## Testing Checklist

After adding your video:

- [ ] Video loads without errors
- [ ] Plays automatically on page load
- [ ] Fades in smoothly from cream background
- [ ] Colors match Wes Anderson palette
- [ ] No WebGL or 3D graphics appear
- [ ] Falls back to image if video fails
- [ ] Works on mobile devices
- [ ] File size under 5MB

---

**Remember:** This is a SIMPLE, CLEAN entrance. Real video. No fancy effects. Just professional, Wes Anderson-inspired design.
