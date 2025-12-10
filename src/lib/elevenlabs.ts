/**
 * ElevenLabs Voice Client
 * Handles text-to-speech for AI Tutor voice responses
 */

import { ElevenLabsClient } from 'elevenlabs';

// Voice options with ElevenLabs voice IDs
export const VOICE_OPTIONS = {
  sage: {
    id: 'sage',
    name: 'Sage',
    description: 'Warm, thoughtful mentor voice',
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah
  },
  aria: {
    id: 'aria',
    name: 'Aria',
    description: 'Clear, encouraging guide',
    voiceId: 'FGY2WhTYpPnrIDTdsKH5', // Laura
  },
  river: {
    id: 'river',
    name: 'River',
    description: 'Calm, contemplative presence',
    voiceId: 'SAz9YHcvj6GT2YYXdXww', // River
  },
  ember: {
    id: 'ember',
    name: 'Ember',
    description: 'Dynamic, energizing instructor',
    voiceId: 'CwhRBWXzGAHq8TQ4Fs17', // Gigi
  },
} as const;

export type VoiceId = keyof typeof VOICE_OPTIONS;

// Lazy initialization
let _client: ElevenLabsClient | null = null;

function getClient(): ElevenLabsClient {
  if (!process.env.ELEVENLABS_API_KEY) {
    throw new Error('ELEVENLABS_API_KEY environment variable is not set');
  }

  if (!_client) {
    _client = new ElevenLabsClient({
      apiKey: process.env.ELEVENLABS_API_KEY,
    });
  }

  return _client;
}

/**
 * Generate speech from text
 * Returns audio as a Buffer (MP3 format)
 */
export async function generateSpeech(
  text: string,
  voiceId: VoiceId = 'sage'
): Promise<Buffer> {
  const client = getClient();
  const voice = VOICE_OPTIONS[voiceId];

  if (!voice) {
    throw new Error(`Invalid voice ID: ${voiceId}`);
  }

  const audioStream = await client.textToSpeech.convert(voice.voiceId, {
    text,
    model_id: 'eleven_turbo_v2_5', // Fast, high-quality model
    output_format: 'mp3_44100_128',
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0.4,
      use_speaker_boost: true,
    },
  });

  // Collect the stream into a buffer
  const chunks: Buffer[] = [];
  for await (const chunk of audioStream) {
    chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks);
}

/**
 * Generate a voice preview for the onboarding flow
 * Returns audio as a Buffer (MP3 format)
 */
export async function generateVoicePreview(voiceId: VoiceId): Promise<Buffer> {
  const previewText = VOICE_OPTIONS[voiceId]
    ? `Hello, I'm ${VOICE_OPTIONS[voiceId].name}. I'll be your guide on this journey of self-discovery. Together, we'll explore the patterns that shape your life and find new paths forward.`
    : 'Hello, I\'m your AI tutor. I\'ll be your guide on this journey of self-discovery.';

  return generateSpeech(previewText, voiceId);
}

/**
 * Generate streaming speech (for real-time TTS)
 * Returns a ReadableStream of audio chunks
 */
export async function generateSpeechStream(
  text: string,
  voiceId: VoiceId = 'sage'
): Promise<ReadableStream<Uint8Array>> {
  const client = getClient();
  const voice = VOICE_OPTIONS[voiceId];

  if (!voice) {
    throw new Error(`Invalid voice ID: ${voiceId}`);
  }

  const audioStream = await client.textToSpeech.convert(voice.voiceId, {
    text,
    model_id: 'eleven_turbo_v2_5',
    output_format: 'mp3_44100_128',
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0.4,
      use_speaker_boost: true,
    },
  });

  // Convert async iterable to ReadableStream
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of audioStream) {
          controller.enqueue(new Uint8Array(chunk));
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}

/**
 * Get all available voice options
 */
export function getVoiceOptions() {
  return Object.values(VOICE_OPTIONS);
}

/**
 * Get voice by ID
 */
export function getVoiceById(voiceId: VoiceId) {
  return VOICE_OPTIONS[voiceId] || VOICE_OPTIONS.sage;
}

export { getClient };
