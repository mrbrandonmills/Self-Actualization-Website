# Garden Ambience Audio Files

This directory contains ambient nature sounds for the floating music player.

## Audio Tracks

The music player rotates between three ambient nature soundscapes:

### Track 1: Garden Ambience
**Filename:** `garden-ambience.mp3`

**Sound Elements:**
- Gentle bird chirping (cardinals, robins, songbirds)
- Soft wind through leaves
- Distant wind chimes
- Light rustling grass
- Peaceful, calming atmosphere

**Duration:** 3-5 minutes (seamlessly loopable)

### Track 2: Peaceful Stream
**Filename:** `peaceful-stream.mp3`

**Sound Elements:**
- Flowing water over smooth stones
- Gentle babbling brook
- Occasional water drips
- Light forest ambience
- Meditative, tranquil mood

**Duration:** 3-5 minutes (seamlessly loopable)

### Track 3: Zen Meditation
**Filename:** `zen-meditation.mp3`

**Sound Elements:**
- Soft temple bells
- Light wind chimes
- Distant nature sounds
- Peaceful silence between elements
- Contemplative, serene atmosphere

**Duration:** 3-5 minutes (seamlessly loopable)

## Where to Get Audio

### Option 1: Free Sound Libraries (RECOMMENDED)

**Freesound.org** (Creative Commons)
- https://freesound.org/
- Search: "garden ambience", "stream water", "wind chimes"
- Filter by Creative Commons license
- Download high-quality WAV/MP3

**YouTube Audio Library**
- https://www.youtube.com/audiolibrary
- Free music and sound effects
- No attribution required
- Download directly

**Zapsplat**
- https://www.zapsplat.com/
- Free sound effects (requires free account)
- Excellent nature sounds
- High quality audio

**BBC Sound Effects**
- https://sound-effects.bbcrewind.co.uk/
- 33,000+ free sound effects
- Nature and ambience category
- Creative Commons licensed

### Option 2: Royalty-Free Premium Libraries

**Epidemic Sound** ($15/month)
- https://www.epidemicsound.com/
- High-quality ambient tracks
- Commercial license included

**Artlist** ($9.99/month)
- https://artlist.io/
- Ambient nature music
- Lifetime license per subscription

**AudioJungle** (Pay per track)
- https://audiojungle.net/
- One-time purchase
- Commercial license

### Option 3: Create Your Own

**Using AI Audio Generation:**

**Mubert AI** - https://mubert.com/
```
Prompt: "Peaceful garden ambience with birds, gentle wind, and soft chimes"
Style: Ambient, Nature, Meditation
Duration: 5 minutes
```

**Soundraw** - https://soundraw.io/
- AI music generation
- Ambient/Nature categories
- Customize mood and instruments

**AIVA** - https://www.aiva.ai/
- AI composition
- Ambient soundscapes

**Field Recording (DIY):**
1. Use smartphone or audio recorder
2. Record in peaceful garden/park
3. Early morning for best bird sounds
4. Edit out unwanted noises
5. Create seamless loop

## Audio Specifications

### Technical Requirements:
- **Format:** MP3 or AAC
- **Sample Rate:** 44.1kHz or 48kHz
- **Bit Rate:** 128kbps minimum (192kbps recommended)
- **Channels:** Stereo
- **Duration:** 3-5 minutes
- **Loop:** Seamless (first/last second should match)
- **File Size:** Under 5MB per track

### Optimization:

Using **Audacity** (Free):
1. Open audio file
2. Effect > Normalize (to -3dB)
3. Effect > Fade In (first 2 seconds)
4. Effect > Fade Out (last 2 seconds)
5. File > Export > MP3 (192kbps)

Using **FFmpeg** (Command line):
```bash
# Convert to optimized MP3
ffmpeg -i input.wav -codec:a libmp3lame -b:a 192k -ar 44100 output.mp3

# Create seamless loop (crossfade)
ffmpeg -i input.mp3 -filter_complex "
  [0:a]asplit=2[main][end];
  [end]atrim=end=2,afade=t=out:st=0:d=2[fadeout];
  [main]atrim=start=0:end=2,afade=t=in:st=0:d=2[fadein];
  [fadeout][fadein]acrossfade=d=2
" output-loop.mp3
```

## File Structure

Place audio files in this directory:

```
/public/audio/
├── README.md (this file)
├── garden-ambience.mp3     # Track 1
├── peaceful-stream.mp3     # Track 2
└── zen-meditation.mp3      # Track 3
```

## Licensing Considerations

### Creative Commons:
- Check attribution requirements
- Include credits in website footer if needed
- Most CC0 (public domain) requires no attribution

### Royalty-Free:
- One-time purchase for lifetime use
- Check if commercial use is allowed
- Save license documentation

### Example Attribution (if required):
```
Audio Credits:
- "Garden Morning" by SoundDesigner - Freesound.org (CC BY 4.0)
- "Stream Flow" by NatureRecordings - Zapsplat (Free License)
```

## Fallback Behavior

If audio files are not present:
- Music player will still display
- Clicking play will show friendly error
- Site functionality remains intact
- No broken audio elements

## Testing Checklist

After adding audio files:

- [ ] Files load without errors
- [ ] Audio plays smoothly on click
- [ ] Loops seamlessly (no gaps or clicks)
- [ ] Volume control works
- [ ] Mute button functions correctly
- [ ] Track switching works
- [ ] Mobile devices can play audio
- [ ] Audio stops when navigating away
- [ ] File sizes are optimized (< 5MB each)
- [ ] No copyright issues

## Recommended Searches

When looking for free audio:

**For Garden Ambience:**
- "garden birds morning"
- "backyard nature sounds"
- "peaceful garden ambience"
- "wind chimes soft"
- "gentle breeze leaves"

**For Stream Sounds:**
- "flowing stream water"
- "babbling brook"
- "river peaceful"
- "water over rocks"
- "creek forest"

**For Meditation:**
- "zen garden sounds"
- "meditation bells"
- "peaceful ambience"
- "calm nature background"
- "tranquil soundscape"

## Creating Seamless Loops

### Method 1: Crossfade (Recommended)
1. Duplicate the first 5 seconds
2. Place at the end
3. Crossfade for 2 seconds
4. Trim excess

### Method 2: Natural Loop Point
1. Find similar waveform points at start/end
2. Trim to match
3. Small fade in/out (0.5s)
4. Test loop multiple times

### Method 3: Silence Padding
1. Add 1 second silence at start
2. Add 1 second silence at end
3. Fade in from silence
4. Fade out to silence
5. Creates natural breathing room

## Questions?

Contact the development team or refer to the main project README.

---

**Note:** The music player enhances the user experience but is not required for site functionality. Users can choose to play, pause, or mute at any time.
