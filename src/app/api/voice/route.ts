/**
 * Voice API
 * Handles text-to-speech generation for AI Tutor
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateSpeech, generateVoicePreview, VoiceId, VOICE_OPTIONS } from '@/lib/elevenlabs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/voice?voiceId=sage - Get voice preview
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const voiceId = searchParams.get('voiceId') as VoiceId | null;

  if (!voiceId || !VOICE_OPTIONS[voiceId]) {
    return NextResponse.json(
      { error: 'Valid voiceId is required (sage, aria, river, ember)' },
      { status: 400 }
    );
  }

  try {
    const audioBuffer = await generateVoicePreview(voiceId);

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Voice preview error:', error);

    if (error instanceof Error && error.message.includes('ELEVENLABS_API_KEY')) {
      return NextResponse.json(
        { error: 'Voice service not configured' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate voice preview' },
      { status: 500 }
    );
  }
}

// POST /api/voice - Generate speech from text
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, voiceId = 'sage' } = body as {
      text: string;
      voiceId?: VoiceId;
    };

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'text is required' },
        { status: 400 }
      );
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: 'text must be 5000 characters or less' },
        { status: 400 }
      );
    }

    if (!VOICE_OPTIONS[voiceId]) {
      return NextResponse.json(
        { error: 'Invalid voiceId. Must be: sage, aria, river, or ember' },
        { status: 400 }
      );
    }

    const audioBuffer = await generateSpeech(text, voiceId);

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Voice generation error:', error);

    if (error instanceof Error && error.message.includes('ELEVENLABS_API_KEY')) {
      return NextResponse.json(
        { error: 'Voice service not configured' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate speech' },
      { status: 500 }
    );
  }
}
