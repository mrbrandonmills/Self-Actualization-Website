import { createClient } from '@supabase/supabase-js';

// Database types - generated from schema
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          avatar_url: string | null;
          learning_goals: string[] | null;
          experience_level: 'beginner' | 'intermediate' | 'advanced' | null;
          preferred_voice: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          learning_goals?: string[] | null;
          experience_level?: 'beginner' | 'intermediate' | 'advanced' | null;
          preferred_voice?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      courses: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          price_cents: number;
          stripe_price_id: string | null;
          stripe_product_id: string | null;
          duration_weeks: number;
          is_published: boolean;
          book_source: 'block_a' | 'block_b' | 'block_c' | null;
          cover_image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          price_cents?: number;
          stripe_price_id?: string | null;
          stripe_product_id?: string | null;
          duration_weeks?: number;
          is_published?: boolean;
          book_source?: 'block_a' | 'block_b' | 'block_c' | null;
          cover_image_url?: string | null;
        };
        Update: Partial<Database['public']['Tables']['courses']['Insert']>;
      };
      lessons: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          slug: string;
          description: string | null;
          content: string | null;
          order_index: number;
          duration_minutes: number;
          is_free_preview: boolean;
          video_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          slug: string;
          description?: string | null;
          content?: string | null;
          order_index: number;
          duration_minutes?: number;
          is_free_preview?: boolean;
          video_url?: string | null;
        };
        Update: Partial<Database['public']['Tables']['lessons']['Insert']>;
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          stripe_session_id: string | null;
          stripe_subscription_id: string | null;
          status: 'active' | 'expired' | 'cancelled';
          enrolled_at: string;
          expires_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          stripe_session_id?: string | null;
          stripe_subscription_id?: string | null;
          status?: 'active' | 'expired' | 'cancelled';
          enrolled_at?: string;
          expires_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['enrollments']['Insert']>;
      };
      progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          course_id: string;
          status: 'not_started' | 'in_progress' | 'completed';
          time_spent_seconds: number;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          course_id: string;
          status?: 'not_started' | 'in_progress' | 'completed';
          time_spent_seconds?: number;
          completed_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['progress']['Insert']>;
      };
      user_xp: {
        Row: {
          user_id: string;
          total_xp: number;
          current_level: number;
          streak_days: number;
          longest_streak: number;
          last_activity_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          total_xp?: number;
          current_level?: number;
          streak_days?: number;
          longest_streak?: number;
          last_activity_date?: string | null;
        };
        Update: Partial<Database['public']['Tables']['user_xp']['Insert']>;
      };
      tutor_conversations: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          messages: TutorMessage[];
          hints_given: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          messages?: TutorMessage[];
          hints_given?: number;
        };
        Update: Partial<Database['public']['Tables']['tutor_conversations']['Insert']>;
      };
      content_embeddings: {
        Row: {
          id: string;
          course_id: string;
          lesson_id: string | null;
          content: string;
          context: string | null;
          chapter_reference: string | null;
          embedding: number[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          lesson_id?: string | null;
          content: string;
          context?: string | null;
          chapter_reference?: string | null;
          embedding?: number[] | null;
        };
        Update: Partial<Database['public']['Tables']['content_embeddings']['Insert']>;
      };
      voice_options: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          preview_url: string | null;
          elevenlabs_voice_id: string;
        };
        Insert: {
          id: string;
          name: string;
          description?: string | null;
          preview_url?: string | null;
          elevenlabs_voice_id: string;
        };
        Update: Partial<Database['public']['Tables']['voice_options']['Insert']>;
      };
    };
    Functions: {
      match_content: {
        Args: {
          query_embedding: number[];
          match_count?: number;
          filter_course_id?: string | null;
        };
        Returns: {
          id: string;
          content: string;
          context: string | null;
          chapter_reference: string | null;
          course_id: string;
          lesson_id: string | null;
          similarity: number;
        }[];
      };
      add_xp: {
        Args: {
          p_user_id: string;
          p_xp_amount: number;
        };
        Returns: void;
      };
    };
  };
}

// Tutor message type for conversation history
export interface TutorMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Environment variables check
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Lazy initialization to avoid build errors when env vars aren't set
let _supabaseClient: ReturnType<typeof createClient<Database>> | null = null;
let _supabaseAdmin: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Get Supabase client for client-side operations
 * Uses anon key with RLS policies
 */
export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  if (!_supabaseClient) {
    _supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return _supabaseClient;
}

/**
 * Get Supabase admin client for server-side operations
 * Uses service role key, bypasses RLS
 * ONLY use in API routes and server components
 */
export function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  }

  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return _supabaseAdmin;
}

// Export convenience alias
export const supabase = {
  get client() {
    return getSupabaseClient();
  },
  get admin() {
    return getSupabaseAdmin();
  },
};

// ============================================
// Helper Functions
// ============================================

/**
 * Get user's enrolled courses
 */
export async function getUserEnrollments(userId: string) {
  const { data, error } = await getSupabaseClient()
    .from('enrollments')
    .select(`
      *,
      courses (*)
    `)
    .eq('user_id', userId)
    .eq('status', 'active');

  if (error) throw error;
  return data;
}

/**
 * Check if user is enrolled in a specific course
 */
export async function isUserEnrolled(userId: string, courseSlug: string): Promise<boolean> {
  const { data, error } = await getSupabaseClient()
    .from('enrollments')
    .select(`
      id,
      courses!inner (slug)
    `)
    .eq('user_id', userId)
    .eq('status', 'active')
    .eq('courses.slug', courseSlug)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
  return !!data;
}

/**
 * Get user's progress for a course
 */
export async function getCourseProgress(userId: string, courseId: string) {
  const { data: progress, error: progressError } = await getSupabaseClient()
    .from('progress')
    .select('*')
    .eq('user_id', userId)
    .eq('course_id', courseId);

  if (progressError) throw progressError;

  // Get total lessons for the course
  const { count: totalLessons, error: countError } = await getSupabaseClient()
    .from('lessons')
    .select('*', { count: 'exact', head: true })
    .eq('course_id', courseId);

  if (countError) throw countError;

  const completedLessons = progress?.filter(p => p.status === 'completed').length ?? 0;
  const totalTimeSpent = progress?.reduce((acc, p) => acc + p.time_spent_seconds, 0) ?? 0;

  return {
    completedLessons,
    totalLessons: totalLessons ?? 0,
    percentComplete: totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0,
    totalTimeSpentMinutes: Math.round(totalTimeSpent / 60),
  };
}

/**
 * Mark a lesson as completed and award XP
 */
export async function completeLesson(userId: string, lessonId: string, courseId: string) {
  const supabaseAdmin = getSupabaseAdmin();

  // Update or insert progress
  const { error: progressError } = await supabaseAdmin
    .from('progress')
    .upsert({
      user_id: userId,
      lesson_id: lessonId,
      course_id: courseId,
      status: 'completed',
      completed_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id,lesson_id',
    });

  if (progressError) throw progressError;

  // Award XP (50 for lesson completion)
  const { error: xpError } = await supabaseAdmin
    .rpc('add_xp', {
      p_user_id: userId,
      p_xp_amount: 50,
    });

  if (xpError) throw xpError;

  return { success: true, xpAwarded: 50 };
}

/**
 * Get user's XP and level information
 */
export async function getUserXP(userId: string) {
  const { data, error } = await getSupabaseClient()
    .from('user_xp')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;

  if (!data) {
    return {
      totalXp: 0,
      currentLevel: 1,
      streakDays: 0,
      longestStreak: 0,
      xpToNextLevel: 1000,
      levelProgress: 0,
    };
  }

  const xpForCurrentLevel = (data.current_level - 1) * 1000;
  const xpToNextLevel = data.current_level * 1000;
  const progressInLevel = data.total_xp - xpForCurrentLevel;
  const levelProgress = Math.round((progressInLevel / 1000) * 100);

  return {
    totalXp: data.total_xp,
    currentLevel: data.current_level,
    streakDays: data.streak_days,
    longestStreak: data.longest_streak,
    xpToNextLevel: xpToNextLevel - data.total_xp,
    levelProgress,
  };
}

/**
 * Save AI tutor conversation
 */
export async function saveTutorConversation(
  userId: string,
  lessonId: string,
  messages: TutorMessage[],
  hintsGiven: number = 0
) {
  const { data, error } = await getSupabaseAdmin()
    .from('tutor_conversations')
    .upsert({
      user_id: userId,
      lesson_id: lessonId,
      messages,
      hints_given: hintsGiven,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id,lesson_id',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get AI tutor conversation history
 */
export async function getTutorConversation(userId: string, lessonId: string) {
  const { data, error } = await getSupabaseClient()
    .from('tutor_conversations')
    .select('*')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

/**
 * Search content using vector similarity (RAG)
 */
export async function searchContent(
  queryEmbedding: number[],
  matchCount: number = 5,
  courseId?: string
) {
  const { data, error } = await getSupabaseClient()
    .rpc('match_content', {
      query_embedding: queryEmbedding,
      match_count: matchCount,
      filter_course_id: courseId ?? null,
    });

  if (error) throw error;
  return data;
}

/**
 * Create enrollment (used by Stripe webhook)
 */
export async function createEnrollment(
  userId: string,
  courseId: string,
  stripeSessionId: string
) {
  const { data, error } = await getSupabaseAdmin()
    .from('enrollments')
    .upsert({
      user_id: userId,
      course_id: courseId,
      stripe_session_id: stripeSessionId,
      status: 'active',
    }, {
      onConflict: 'user_id,course_id',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get course by slug with lessons
 */
export async function getCourseWithLessons(courseSlug: string) {
  const { data, error } = await getSupabaseClient()
    .from('courses')
    .select(`
      *,
      lessons (
        id,
        title,
        slug,
        description,
        order_index,
        duration_minutes,
        is_free_preview
      )
    `)
    .eq('slug', courseSlug)
    .eq('is_published', true)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get lesson with content (for enrolled users)
 */
export async function getLesson(courseSlug: string, lessonSlug: string) {
  const { data, error } = await getSupabaseClient()
    .from('lessons')
    .select(`
      *,
      courses!inner (
        id,
        title,
        slug
      )
    `)
    .eq('slug', lessonSlug)
    .eq('courses.slug', courseSlug)
    .single();

  if (error) throw error;
  return data;
}
