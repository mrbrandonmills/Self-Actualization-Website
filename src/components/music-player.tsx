'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Music2 } from 'lucide-react'

interface Track {
  id: string
  title: string
  artist: string
  url: string
  color: string
}

const TRACKS: Track[] = [
  {
    id: 'garden-ambience',
    title: 'Garden Ambience',
    artist: 'Birds • Water • Wind Chimes',
    url: '/audio/garden-ambience.mp3',
    color: '#6EE7B7', // mint green
  },
  {
    id: 'peaceful-stream',
    title: 'Peaceful Stream',
    artist: 'Flowing Water • Nature',
    url: '/audio/peaceful-stream.mp3',
    color: '#67E8F9', // ocean blue
  },
  {
    id: 'zen-meditation',
    title: 'Zen Meditation',
    artist: 'Calm • Serenity',
    url: '/audio/zen-meditation.mp3',
    color: '#A78BFA', // lavender
  },
]

/**
 * MusicPlayer - Floating pill-shaped music player with glassmorphism
 * Features: rotating vinyl icon, waveform visualization, draggable, expandable
 */
export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = TRACKS[currentTrackIndex]

  // Handle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      // First user interaction - enable autoplay
      if (!hasInteracted) {
        setHasInteracted(true)
      }
      audioRef.current.play().catch((error) => {
        console.log('Audio playback failed:', error)
      })
      setIsPlaying(true)
    }
  }

  // Handle mute/unmute
  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Next track
  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length)
    setIsPlaying(false)
  }

  // Update audio source when track changes
  useEffect(() => {
    if (audioRef.current && hasInteracted) {
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.log('Audio playback failed:', error)
        })
      }
    }
  }, [currentTrackIndex, hasInteracted, isPlaying])

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[60]"
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 1.5,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Pill container with glassmorphism */}
      <motion.div
        className="relative rounded-full shadow-2xl cursor-pointer select-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15))',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: `0 8px 32px rgba(0,0,0,0.1), 0 0 40px ${currentTrack.color}40`,
        }}
        animate={{
          width: isExpanded ? 320 : 60,
          boxShadow: isExpanded
            ? `0 8px 32px rgba(0,0,0,0.15), 0 0 60px ${currentTrack.color}60`
            : `0 8px 32px rgba(0,0,0,0.1), 0 0 40px ${currentTrack.color}40`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {/* Content */}
        <div className="flex items-center gap-3 px-3 py-3">
          {/* Vinyl Record Icon (rotating when playing) */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              togglePlay()
            }}
            className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${currentTrack.color}, ${currentTrack.color}dd)`,
            }}
            animate={{
              rotate: isPlaying ? 360 : 0,
            }}
            transition={{
              rotate: {
                repeat: isPlaying ? Infinity : 0,
                duration: 3,
                ease: 'linear',
              },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Vinyl grooves effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-white/20" />
              <div className="absolute w-5 h-5 rounded-full border-2 border-white/30" />
              <div className="absolute w-2 h-2 rounded-full bg-white/40" />
            </div>

            {/* Play/Pause icon */}
            <div className="relative z-10">
              {isPlaying ? (
                <Pause size={18} className="text-white" fill="white" />
              ) : (
                <Play size={18} className="text-white ml-0.5" fill="white" />
              )}
            </div>
          </motion.button>

          {/* Track Info (animated) */}
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                key="track-info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 overflow-hidden min-w-0"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.p
                  className="text-sm font-medium text-gray-800 truncate"
                  key={currentTrack.title}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentTrack.title}
                </motion.p>
                <p className="text-xs text-gray-600 truncate">
                  {currentTrack.artist}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Waveform Visualization */}
          {isExpanded && (
            <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full"
                  style={{
                    background: `linear-gradient(to top, ${currentTrack.color}, ${currentTrack.color}aa)`,
                  }}
                  animate={{
                    height: isPlaying
                      ? [8, 16, 12, 20][i]
                      : 8,
                  }}
                  transition={{
                    repeat: isPlaying ? Infinity : 0,
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                    repeatType: 'reverse',
                  }}
                />
              ))}
            </div>
          )}

          {/* Controls (when expanded) */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Volume control */}
              <motion.button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? (
                  <VolumeX size={16} className="text-gray-700" />
                ) : (
                  <Volume2 size={16} className="text-gray-700" />
                )}
              </motion.button>

              {/* Next track button */}
              <motion.button
                onClick={nextTrack}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Next track"
              >
                <Music2 size={16} className="text-gray-700" />
              </motion.button>

              {/* Collapse button */}
              <motion.button
                onClick={() => setIsExpanded(false)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Collapse"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-gray-700"
                >
                  <path
                    d="M6 4L10 8L6 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle, ${currentTrack.color}20, transparent)`,
            filter: 'blur(20px)',
          }}
        />
      </motion.div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Helper text on first load */}
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ delay: 2 }}
          className="absolute -top-12 right-0 bg-black/80 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap"
        >
          Click to play garden sounds
          <div
            className="absolute bottom-0 right-6 w-0 h-0"
            style={{
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid rgba(0,0,0,0.8)',
              transform: 'translateY(100%)',
            }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}
