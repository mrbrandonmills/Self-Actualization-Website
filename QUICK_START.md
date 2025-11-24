# Quick Start Guide - Immersive Garden Experience

## TL;DR - Get It Running in 5 Minutes

### Step 1: Download Audio Files (2 minutes)
Go to **Freesound.org** and download these (or similar):
- `garden-ambience.mp3` - Search: "garden birds ambient"
- `peaceful-stream.mp4` - Search: "stream water flowing"
- `zen-meditation.mp3` - Search: "meditation bells"

Place in: `/public/audio/`

### Step 2: Download Video Files (2 minutes)
Go to **Pexels.com/videos** and download these (or similar):
- `garden-main.mp4` - Search: "garden path nature"
- `stream-flow.mp4` - Search: "stream water rocks"
- `grass-sway.mp4` - Search: "grass wind field"

Place in: `/public/videos/`

### Step 3: Run Development Server (1 minute)
```bash
cd "/Volumes/Super Mastery/Self-Actualization-Website"
npm run dev
```

Open: `http://localhost:3000`

### Step 4: Test Features
- Click the **vinyl icon** (bottom-right) to play music
- **Hover over book cards** to see rainbow glow effects
- **Hover over navigation** links to see color changes
- **Wait 30 seconds** to see video crossfade
- **Watch particles** float and glow

## What You Should See

### Visual Elements:
1. **Background**: Crossfading nature videos with subtle blur
2. **Particles**: 30+ floating fireflies and light orbs
3. **Music Player**: Pill-shaped player in bottom-right corner
4. **Rainbow Colors**: Every card and link has unique vibrant color
5. **Light Effects**: Volumetric beams, glowing orbs, rainbow refraction

### Interactive Elements:
1. **Music Player**: Click vinyl to play/pause, animated waveforms
2. **Book Cards**: Hover for unique color glow (coral, lavender, peach, etc.)
3. **Course Cards**: Hover for unique color glow (golden, violet, seafoam, etc.)
4. **Navigation**: Hover to see link text change to unique color
5. **Video Background**: Auto-rotates every 30 seconds

## Quick Troubleshooting

### Music Not Playing?
- Check files exist in `/public/audio/`
- Click the vinyl icon (no autoplay allowed by browsers)
- Check browser console for errors
- Try different browser (Chrome works best)

### Videos Not Showing?
- Check files exist in `/public/videos/`
- Ensure MP4 format (H.264 codec)
- Keep files under 10MB each
- Check Network tab in DevTools for 404s

### Particles Not Animating?
- Check browser supports CSS animations
- Disable "Reduce Motion" in OS settings
- Try different browser
- Check Performance tab - should be 60fps

### Colors Not Showing?
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Clear browser cache
- Check imports in component files
- Inspect elements to see inline styles

## Asset Requirements

### Audio Specs:
- Format: MP3
- Duration: 3-5 minutes (loopable)
- Size: < 5MB each
- Sample Rate: 44.1kHz or 48kHz

### Video Specs:
- Format: MP4 (H.264 codec)
- Resolution: 1920x1080 (minimum)
- Duration: 15-30 seconds (loopable)
- Size: < 10MB each
- Frame Rate: 24fps or 30fps

## Free Asset Sources

### Audio:
- **Freesound.org** (best) - Free, high quality, CC0
- **YouTube Audio Library** - Free, no attribution needed
- **Zapsplat.com** - Free with account

### Video:
- **Pexels.com/videos** (best) - Free, 4K, no attribution
- **Pixabay.com/videos** - Free, good quality
- **Coverr.co** - Curated free videos

### AI Generation (Future):
- **Sora** (OpenAI) - Limited beta access
- **Runway Gen-3** - Available now ($)
- **Pika Labs** - Available now ($)

## File Structure

```
/public/
  /audio/
    garden-ambience.mp3      ← Add this
    peaceful-stream.mp3      ← Add this
    zen-meditation.mp3       ← Add this
    README.md                ✓ Already created
  /videos/
    garden-main.mp4          ← Add this
    stream-flow.mp4          ← Add this
    grass-sway.mp4           ← Add this
    README.md                ✓ Already created
```

## Color Reference

### Books (hover to see):
1. Card 1: Coral Sunset (#FF6B6B)
2. Card 2: Lavender Dream (#A78BFA)
3. Card 3: Peachy Keen (#FDBA74)
4. Card 4: Ocean Breeze (#67E8F9)
5. Card 5: Mint Fresh (#6EE7B7)
6. Card 6: Rose Garden (#FB7185)

### Courses (hover to see):
1. Card 1: Golden Hour (#FCD34D)
2. Card 2: Violet Sky (#C084FC)
3. Card 3: Seafoam (#5EEAD4)
4. Card 4: Cherry Blossom (#F9A8D4)
5. Card 5: Lime Zest (#BEF264)
6. Card 6: Sky Blue (#7DD3FC)

### Navigation (hover to see):
- Books: Coral (#FF6B6B)
- Courses: Golden (#FCD34D)
- Writing Lab: Ocean (#67E8F9)
- Blog: Lavender (#A78BFA)
- About: Mint (#6EE7B7)

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type check
npm run type-check
```

## Performance Tips

1. **Optimize Videos**: Use FFmpeg to compress to < 5-10MB
2. **Lazy Load Audio**: Audio only loads on first click
3. **Limit Particles**: Already optimized to 30-40 total
4. **GPU Acceleration**: Uses `transform` and `opacity` only
5. **Code Splitting**: Components load only when needed

## Browser Testing Checklist

- [ ] Chrome Desktop - Full features
- [ ] Safari Desktop - Full features
- [ ] Firefox Desktop - Full features
- [ ] Chrome Mobile - Optimized experience
- [ ] Safari iOS - Test video background
- [ ] Chrome Android - Test particles

## Accessibility Features

- ✓ Keyboard navigable (Tab, Enter, Space)
- ✓ ARIA labels on all controls
- ✓ Color contrast WCAG AA compliant
- ✓ Screen reader compatible
- ✓ Respects reduced motion preference
- ✓ Touch targets 44px minimum

## Need Help?

1. Check `/IMPLEMENTATION_SUMMARY.md` - Complete overview
2. Check `/IMMERSIVE_GARDEN_IMPLEMENTATION.md` - Detailed guide
3. Check `/public/videos/README.md` - Video instructions
4. Check `/public/audio/README.md` - Audio instructions
5. Check browser console for errors
6. Check Network tab for failed assets

## Keyboard Shortcuts

- `Tab` - Navigate through interactive elements
- `Enter/Space` - Activate buttons
- `Esc` - Close modals/menus
- `Cmd/Ctrl + R` - Refresh page
- `Cmd/Ctrl + Shift + R` - Hard refresh (clear cache)

## What Makes It "Jaw-Droppingly Fun"?

1. **Unique Colors**: Every button/card has its own vibrant rainbow color
2. **Rotating Vinyl**: Music player vinyl spins when playing (3s rotation)
3. **Waveform Viz**: 4 animated bars sync with music mood
4. **Crossfading Videos**: 3 AI-ready nature scenes rotate every 30s
5. **Floating Fireflies**: 30+ glowing particles with organic movement
6. **Light Orbs**: 8 pulsing spheres create atmospheric depth
7. **Volumetric Beams**: 5 light beams drift from top with blur
8. **Rainbow Refractions**: Subtle color-shifting ambience
9. **Glassmorphism**: Frosted glass effects throughout
10. **Smooth 60fps**: GPU-accelerated animations

## Deploy Checklist

Before deploying to production:

- [ ] Audio files added and tested
- [ ] Video files added and tested
- [ ] Mobile tested on real devices
- [ ] Lighthouse score > 90 (all categories)
- [ ] Browser testing complete
- [ ] Accessibility audit passed
- [ ] File sizes optimized (< 10MB total)
- [ ] Environment variables set (if using AI APIs)
- [ ] Analytics configured
- [ ] Error monitoring configured

---

**Version**: 1.0.0
**Status**: Ready for Assets ✓
**Build Status**: ✅ SUCCESS
**Next Step**: Add audio and video files, then deploy!

Enjoy your jaw-droppingly immersive garden experience! 🌸✨🎵
