/**
 * Progress API
 * Handles lesson completion and progress tracking
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

// GET /api/progress?userId=xxx&courseId=xxx
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  const courseId = searchParams.get('courseId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();

    // Base query for progress
    let query = supabase
      .from('progress')
      .select(`
        *,
        lessons (
          id,
          title,
          slug,
          order_index
        )
      `)
      .eq('user_id', userId);

    // Filter by course if specified
    if (courseId) {
      query = query.eq('course_id', courseId);
    }

    const { data: progress, error } = await query;

    if (error) {
      console.error('Error fetching progress:', error);
      return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
    }

    // Get user XP
    const { data: xpData, error: xpError } = await supabase
      .from('user_xp')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (xpError && xpError.code !== 'PGRST116') {
      console.error('Error fetching XP:', xpError);
    }

    // Calculate summary
    const completedLessons = progress?.filter(p => p.status === 'completed').length ?? 0;
    const totalTimeSpent = progress?.reduce((acc, p) => acc + (p.time_spent_seconds ?? 0), 0) ?? 0;

    return NextResponse.json({
      progress: progress ?? [],
      xp: xpData ?? { total_xp: 0, current_level: 1, streak_days: 0 },
      summary: {
        completedLessons,
        totalTimeSpentMinutes: Math.round(totalTimeSpent / 60),
      }
    });
  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/progress - Mark lesson as completed
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, lessonId, courseId, timeSpentSeconds = 0 } = body;

    if (!userId || !lessonId || !courseId) {
      return NextResponse.json(
        { error: 'userId, lessonId, and courseId are required' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Check if already completed
    const { data: existing } = await supabase
      .from('progress')
      .select('status')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .single();

    const wasAlreadyCompleted = existing?.status === 'completed';

    // Upsert progress
    const { data: progressData, error: progressError } = await supabase
      .from('progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        course_id: courseId,
        status: 'completed',
        time_spent_seconds: timeSpentSeconds,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,lesson_id',
      })
      .select()
      .single();

    if (progressError) {
      console.error('Error updating progress:', progressError);
      return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
    }

    // Award XP only if not already completed
    let xpAwarded = 0;
    if (!wasAlreadyCompleted) {
      // Default XP for lesson completion
      xpAwarded = 50;

      // Award XP using the database function
      const { error: xpError } = await supabase
        .rpc('add_xp', {
          p_user_id: userId,
          p_xp_amount: xpAwarded,
        });

      if (xpError) {
        console.error('Error awarding XP:', xpError);
        // Don't fail the request, just log the error
      }
    }

    // Get updated XP
    const { data: xpData } = await supabase
      .from('user_xp')
      .select('*')
      .eq('user_id', userId)
      .single();

    return NextResponse.json({
      success: true,
      progress: progressData,
      xpAwarded,
      xp: xpData ?? { total_xp: 0, current_level: 1, streak_days: 0 },
    });
  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/progress - Update progress (e.g., time spent)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, lessonId, status, timeSpentSeconds } = body;

    if (!userId || !lessonId) {
      return NextResponse.json(
        { error: 'userId and lessonId are required' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (status) updateData.status = status;
    if (timeSpentSeconds !== undefined) updateData.time_spent_seconds = timeSpentSeconds;

    const { data, error } = await supabase
      .from('progress')
      .update(updateData)
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .select()
      .single();

    if (error) {
      console.error('Error updating progress:', error);
      return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
    }

    return NextResponse.json({ success: true, progress: data });
  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
