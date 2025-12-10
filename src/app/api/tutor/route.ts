/**
 * AI Tutor API
 * Handles streaming chat with course-specific AI tutor
 */

import { NextRequest } from 'next/server';
import { createTutorStream, TutorMessage, TutorContext } from '@/lib/claude';
import { getCourseBySlug } from '@/data/courses';
import { getLessonById } from '@/data/lessons';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, lessonId, courseSlug, userId, userName } = body as {
      messages: TutorMessage[];
      lessonId: string;
      courseSlug: string;
      userId?: string;
      userName?: string;
    };

    // Validate required fields
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages array is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!lessonId || !courseSlug) {
      return new Response(JSON.stringify({ error: 'lessonId and courseSlug are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get course and lesson data for context
    const course = getCourseBySlug(courseSlug);
    const lesson = getLessonById(lessonId);

    if (!course || !lesson) {
      return new Response(JSON.stringify({ error: 'Course or lesson not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build tutor context
    const context: TutorContext = {
      courseSlug,
      courseName: course.title,
      lessonTitle: lesson.title,
      lessonConcept: lesson.keyConcept,
      lessonPractice: lesson.practice,
      weekNumber: lesson.weekNumber,
      userName,
    };

    // Create streaming response
    const stream = await createTutorStream(messages, context);

    // Create a TransformStream to convert the Anthropic stream to SSE format
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta') {
              const delta = event.delta;
              if ('text' in delta) {
                // Send as SSE format
                const data = JSON.stringify({ type: 'text', content: delta.text });
                controller.enqueue(encoder.encode(`data: ${data}\n\n`));
              }
            } else if (event.type === 'message_stop') {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
            }
          }
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          const errorData = JSON.stringify({ type: 'error', message: 'Stream error occurred' });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Tutor API error:', error);

    // Check for specific API key error
    if (error instanceof Error && error.message.includes('ANTHROPIC_API_KEY')) {
      return new Response(JSON.stringify({ error: 'AI service not configured' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
