'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Play,
  Pause,
  Volume2,
  Check,
  ArrowRight,
  Sparkles,
  User,
  Target,
  BookOpen,
} from 'lucide-react';

// Voice options (matching lib/elevenlabs.ts)
const VOICE_OPTIONS = [
  {
    id: 'sage',
    name: 'Sage',
    description: 'Warm, thoughtful mentor voice',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'aria',
    name: 'Aria',
    description: 'Clear, encouraging guide',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'river',
    name: 'River',
    description: 'Calm, contemplative presence',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'ember',
    name: 'Ember',
    description: 'Dynamic, energizing instructor',
    color: 'from-red-500 to-orange-600',
  },
];

const EXPERIENCE_LEVELS = [
  { id: 'beginner', label: 'New to this journey', description: 'Just starting to explore personal growth' },
  { id: 'intermediate', label: 'Some experience', description: 'Familiar with self-development concepts' },
  { id: 'advanced', label: 'Deep practitioner', description: 'Extensive experience with inner work' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [experienceLevel, setExperienceLevel] = useState<string | null>(null);
  const [learningGoals, setLearningGoals] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const totalSteps = 4;

  const handlePlayVoice = async (voiceId: string) => {
    if (isPlaying === voiceId) {
      // Stop playing
      audioRef.current?.pause();
      setIsPlaying(null);
      return;
    }

    try {
      setIsLoading(true);
      setIsPlaying(voiceId);

      // Fetch voice preview
      const response = await fetch(`/api/voice?voiceId=${voiceId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch voice preview');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
    } catch (error) {
      console.error('Error playing voice:', error);
      setIsPlaying(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(null);
  };

  const handleComplete = async () => {
    // TODO: Save preferences to Supabase
    // await updateProfile(userId, { name, preferredVoice: selectedVoice, experienceLevel, learningGoals });

    // Redirect to dashboard
    router.push('/dashboard');
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return name.trim().length > 0;
      case 2:
        return selectedVoice !== null;
      case 3:
        return experienceLevel !== null;
      case 4:
        return learningGoals.length > 0;
      default:
        return false;
    }
  };

  const learningGoalOptions = [
    'Break free from limiting patterns',
    'Improve relationships',
    'Develop emotional intelligence',
    'Find deeper meaning',
    'Navigate life transitions',
    'Build conscious habits',
    'Understand myself better',
    'Create positive change',
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <audio ref={audioRef} onEnded={handleAudioEnded} className="hidden" />

      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 mx-1 rounded-full transition-colors ${
                  i < step ? 'bg-gold-500' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-white/50 text-sm">Step {step} of {totalSteps}</p>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Name */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-gold-400" />
              </div>

              <h1 className="text-3xl font-serif text-white mb-2">Welcome to your journey</h1>
              <p className="text-white/60 mb-8">What should we call you?</p>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full max-w-sm mx-auto px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-center text-lg placeholder-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
                autoFocus
              />
            </motion.div>
          )}

          {/* Step 2: Voice Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-600/20 flex items-center justify-center mx-auto mb-6">
                <Volume2 className="w-8 h-8 text-purple-400" />
              </div>

              <h1 className="text-3xl font-serif text-white mb-2">Choose your guide&apos;s voice</h1>
              <p className="text-white/60 mb-8">Your AI tutor will speak in this voice during lessons</p>

              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                {VOICE_OPTIONS.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => setSelectedVoice(voice.id)}
                    className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                      selectedVoice === voice.id
                        ? 'border-gold-500 bg-gold-500/10'
                        : 'border-white/10 hover:border-white/20 bg-white/5'
                    }`}
                  >
                    {selectedVoice === voice.id && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                    )}

                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${voice.color} flex items-center justify-center mb-3`}>
                      <Volume2 className="w-5 h-5 text-white" />
                    </div>

                    <h3 className="text-white font-medium mb-1">{voice.name}</h3>
                    <p className="text-white/50 text-sm mb-3">{voice.description}</p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayVoice(voice.id);
                      }}
                      className="flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      {isPlaying === voice.id ? (
                        <>
                          <Pause className="w-4 h-4" />
                          {isLoading ? 'Loading...' : 'Pause'}
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Preview
                        </>
                      )}
                    </button>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Experience Level */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-600/20 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-green-400" />
              </div>

              <h1 className="text-3xl font-serif text-white mb-2">Your experience level</h1>
              <p className="text-white/60 mb-8">This helps us personalize your learning journey</p>

              <div className="space-y-3 max-w-md mx-auto">
                {EXPERIENCE_LEVELS.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setExperienceLevel(level.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                      experienceLevel === level.id
                        ? 'border-gold-500 bg-gold-500/10'
                        : 'border-white/10 hover:border-white/20 bg-white/5'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      experienceLevel === level.id
                        ? 'border-gold-500 bg-gold-500'
                        : 'border-white/30'
                    }`}>
                      {experienceLevel === level.id && (
                        <Check className="w-3 h-3 text-black" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{level.label}</h3>
                      <p className="text-white/50 text-sm">{level.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Learning Goals */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-500/20 to-amber-600/20 flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-gold-400" />
              </div>

              <h1 className="text-3xl font-serif text-white mb-2">What brings you here, {name}?</h1>
              <p className="text-white/60 mb-8">Select all that resonate with you</p>

              <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                {learningGoalOptions.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => {
                      setLearningGoals(prev =>
                        prev.includes(goal)
                          ? prev.filter(g => g !== goal)
                          : [...prev, goal]
                      );
                    }}
                    className={`px-4 py-2 rounded-full border transition-all ${
                      learningGoals.includes(goal)
                        ? 'border-gold-500 bg-gold-500/20 text-gold-400'
                        : 'border-white/20 hover:border-white/30 text-white/70'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-xl text-white/60 hover:text-white transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={() => {
              if (step < totalSteps) {
                setStep(step + 1);
              } else {
                handleComplete();
              }
            }}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 text-black font-medium hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {step === totalSteps ? (
              <>
                <Sparkles className="w-5 h-5" />
                Begin Your Journey
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
