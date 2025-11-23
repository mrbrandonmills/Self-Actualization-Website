# AI Video Generation Guide for Museum Experience

## Overview

This museum experience is designed to showcase your books like art pieces in a Wes Anderson + Alexander McQueen fusion aesthetic. Each "room" needs AI-generated cinematic video backgrounds.

---

## Video Specifications

### Technical Requirements
- **Format:** MP4 (H.264 codec)
- **Resolution:** 1920x1080 (1080p) minimum, 4K preferred
- **Aspect Ratio:** 16:9
- **Frame Rate:** 24fps or 30fps
- **Duration:** 5-10 seconds (will loop seamlessly)
- **File Size:** Optimize to under 10MB per video

### Aesthetic Requirements
- **Color Grading:** Wes Anderson pastel palette (sage greens, soft pinks, warm ambers)
- **Symmetry:** Perfect center framing when possible
- **Lighting:** Natural, soft, cinematic
- **Drama:** McQueen-inspired emotional intensity
- **Quality:** Photo-realistic, NOT illustrative

---

## Recommended AI Video Tools

### 1. **Runway Gen-3 Alpha** (Recommended)
- **Cost:** $12/month (Standard plan)
- **Commercial use:** ✅ Allowed
- **Best for:** Realistic architectural and nature scenes
- **URL:** https://runwayml.com

**How to use:**
1. Sign up at runwayml.com
2. Go to Gen-3 Alpha
3. Use "Text to Video" or "Image to Video"
4. Input the prompts below
5. Download MP4 files

### 2. **OpenAI Sora** (Alternative)
- **Cost:** $20/month (ChatGPT Plus)
- **Commercial use:** ✅ Allowed
- **Best for:** Smooth camera movements
- **URL:** https://chat.openai.com

**How to use:**
1. Subscribe to ChatGPT Plus
2. Access Sora from the model selector
3. Use prompts below
4. Download generated videos

---

## Video Prompts for Each Room

### **Entrance Video** (`/public/videos/entrance-greenhouse.mp4`)

**Runway Gen-3 Prompt:**
```
FPV drone dolly shot moving forward down a symmetrical greenhouse pathway with lush tropical plants on both sides, sage green and pastel pink flowers, natural daylight streaming through glass ceiling, Wes Anderson cinematography, symmetrical composition, smooth camera movement, 4K, cinematic, ultra-realistic
```

**Alternative (shorter):**
```
Slow dolly shot through symmetrical garden path with tropical plants, pastel colors, natural light, cinematic
```

**Reference Image:** Use `/Users/brandon/Downloads/wes anderson/6.webp` as reference

---

### **Room 1: Garden of Becoming** (`/public/videos/garden-overhead.mp4`)

**Runway Gen-3 Prompt:**
```
Overhead aerial crane shot rising above a formal English garden with geometric hedges forming symmetrical patterns, pastel rose bushes in bloom, sage green topiary, golden hour lighting, Wes Anderson color palette, smooth crane up movement, 4K, cinematic, photorealistic
```

**Camera Movement:** Crane up (starts low, rises slowly)

**Alternative:**
```
Aerial drone shot of symmetrical rose garden, geometric hedges, pastel colors, warm natural lighting
```

---

### **Room 2: Library of Transformation** (`/public/videos/library-fpv.mp4`)

**Runway Gen-3 Prompt:**
```
FPV first-person view shot flying through a grand library with floor-to-ceiling wooden bookshelves, warm amber lighting from vintage lamps, leather-bound books, ornate wooden ladder, smooth forward movement through the aisles, cinematic depth of field, Wes Anderson aesthetic, ultra-realistic, 4K
```

**Camera Movement:** FPV dolly forward

**Alternative:**
```
First-person walkthrough of elegant library with wooden shelves, warm lighting, vintage books, smooth camera
```

---

### **Room 3: Collective Writing Atelier** (`/public/videos/writing-room-crane.mp4`)

**Runway Gen-3 Prompt:**
```
Crane shot revealing a circular writing room with symmetrical rows of vintage wooden desks, each with a typewriter, soft natural light from tall arched windows, lavender and cream color palette, Art Nouveau details, smooth crane reveal movement, cinematic composition, photorealistic, 4K
```

**Camera Movement:** Crane reveal (starts close, pulls back and up)

**Alternative:**
```
Circular room with vintage writing desks arranged symmetrically, soft window light, lavender tones, crane shot
```

---

### **Room 4: Philosophy Salon** (`/public/videos/salon-orbit.mp4`)

**Runway Gen-3 Prompt:**
```
360-degree orbital shot circling around a luxurious circular reading room with rainbow-colored vintage armchairs arranged in a perfect circle, ultra-saturated velvet upholstery (coral, mint, gold, lavender), art deco chandelier overhead, parquet floor with radial pattern, smooth orbital camera movement, high saturation like infrared photography, Wes Anderson meets Alexander McQueen, 4K, cinematic
```

**Camera Movement:** Orbital 360°

**Reference Image:** Use `/Users/brandon/Downloads/wes anderson/2.webp` for color inspiration

**Alternative:**
```
Orbital shot around circular room with rainbow vintage chairs, high color saturation, luxury interior, smooth rotation
```

---

## Using Stock Footage (Plan B)

If AI generation isn't working, use premium stock footage:

### Recommended Stock Sites
1. **Artgrid.io** - Cinematic footage ($299/year)
2. **Adobe Stock** - High-quality clips (subscription)
3. **Pexels/Pixabay** - Free but limited selection

### Search Terms
- "Aerial garden drone shot"
- "FPV library walkthrough"
- "Symmetrical interior architecture"
- "Vintage reading room"
- "Greenhouse path POV"

---

## Installation Instructions

### 1. Create Videos Directory
```bash
mkdir -p /Volumes/Super\ Mastery/Self-Actualization-Website/public/videos
```

### 2. Add Your Generated Videos
Place your MP4 files in `/public/videos/` with these exact names:
- `entrance-greenhouse.mp4`
- `garden-overhead.mp4`
- `library-fpv.mp4`
- `writing-room-crane.mp4`
- `salon-orbit.mp4`

### 3. Uncomment Video Sources
In `/src/app/page.tsx`, uncomment the `videoSrc` props:

**Change from:**
```tsx
// videoSrc="/videos/entrance-greenhouse.mp4"
```

**To:**
```tsx
videoSrc="/videos/entrance-greenhouse.mp4"
```

Do this for all 5 video references.

---

## Video Optimization (Important!)

Before adding videos to your site, optimize them:

### Using FFmpeg (Recommended)
```bash
# Install ffmpeg
brew install ffmpeg

# Optimize video (reduces file size, maintains quality)
ffmpeg -i input.mp4 -vcodec h264 -crf 23 -preset medium -acodec aac -b:a 128k output.mp4
```

### Using Online Tools
- **HandBrake** (free desktop app): https://handbrake.fr
- **CloudConvert** (online): https://cloudconvert.com

**Target:** Keep each video under 10MB for fast loading

---

## Advanced: Image-to-Video (Best Results)

For MAXIMUM control, use this two-step process:

### Step 1: Generate Still Image
Use Midjourney or DALL-E to create the perfect room image:

**Example Midjourney Prompt:**
```
Symmetrical greenhouse pathway with tropical plants, Wes Anderson color palette, pastel pinks and sage greens, natural daylight, architectural photography, ultra-realistic, 8K --ar 16:9 --style raw
```

### Step 2: Animate with Runway
1. Upload your still image to Runway Gen-3
2. Use "Image to Video" mode
3. Add camera movement prompt: "Slow dolly forward, smooth camera movement"
4. Generate video

This gives you complete control over composition AND movement.

---

## Testing Your Videos

1. Start dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. Check that:
   - Videos load smoothly
   - Looping is seamless
   - Colors match aesthetic
   - Camera movements feel cinematic

---

## Troubleshooting

### Videos won't play
- Ensure files are MP4 (H.264 codec)
- Check file paths are correct
- Try restarting dev server

### Videos are choppy
- Reduce file size (see optimization section)
- Lower resolution to 1080p
- Check frame rate is 24fps or 30fps

### Videos don't loop seamlessly
- Trim first/last frames in video editor
- Use shorter clips (5-7 seconds ideal)
- Consider adding crossfade in CSS

---

## Color Grading Reference

Match the Wes Anderson palette from your reference images:

**Primary Colors:**
- Sage Green: `#8A9A5B`
- Soft Pink: `#f4c2c2`
- Warm Amber: `#d4a574`
- Lavender: `#e8d8f5`
- Cream: `#f5f5f0`

**Lighting:**
- Warm, natural, soft
- Golden hour preferred
- NO harsh shadows
- Gentle gradients

---

## Next Steps

1. ✅ Sign up for Runway Gen-3 or Sora
2. ✅ Generate 5 videos using prompts above
3. ✅ Optimize videos to < 10MB each
4. ✅ Add to `/public/videos/` directory
5. ✅ Uncomment `videoSrc` props in page.tsx
6. ✅ Test and refine

---

**Questions?** The museum is ready to showcase your work. Just add the cinematic backgrounds and watch it come alive!
