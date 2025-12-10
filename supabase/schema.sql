-- Self-Actualization Course Platform Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Users profile (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  learning_goals TEXT[],
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
  preferred_voice TEXT DEFAULT 'sage',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL DEFAULT 9700,
  stripe_price_id TEXT,
  stripe_product_id TEXT,
  duration_weeks INTEGER DEFAULT 6,
  is_published BOOLEAN DEFAULT false,
  book_source TEXT CHECK (book_source IN ('block_a', 'block_b', 'block_c')),
  cover_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lessons within courses
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  content TEXT,
  order_index INTEGER NOT NULL,
  duration_minutes INTEGER DEFAULT 15,
  is_free_preview BOOLEAN DEFAULT false,
  video_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, slug)
);

-- User enrollments
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  stripe_session_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);

-- Progress tracking
CREATE TABLE public.progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  time_spent_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Gamification - XP and streaks
CREATE TABLE public.user_xp (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversation history for AI tutor
CREATE TABLE public.tutor_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  messages JSONB DEFAULT '[]'::jsonb,
  hints_given INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- RAG embeddings for book content
CREATE TABLE public.content_embeddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id),
  content TEXT NOT NULL,
  context TEXT,
  chapter_reference TEXT,
  embedding vector(1536),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for vector similarity search
CREATE INDEX ON public.content_embeddings
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Voice preferences
CREATE TABLE public.voice_options (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  preview_url TEXT,
  elevenlabs_voice_id TEXT NOT NULL
);

-- Insert default voice options
INSERT INTO public.voice_options (id, name, description, elevenlabs_voice_id) VALUES
('sage', 'Sage', 'Warm, thoughtful mentor voice', 'EXAVITQu4vr4xnSDxMaL'),
('aria', 'Aria', 'Clear, encouraging guide', 'FGY2WhTYpPnrIDTdsKH5'),
('river', 'River', 'Calm, contemplative presence', 'SAz9YHcvj6GT2YYXdXww'),
('ember', 'Ember', 'Dynamic, energizing instructor', 'CwhRBWXzGAHq8TQ4Fs17');

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_xp ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_options ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read/update their own
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Courses: Anyone can view published courses
CREATE POLICY "Anyone can view published courses" ON public.courses
  FOR SELECT USING (is_published = true);

-- Lessons: View free previews OR enrolled courses
CREATE POLICY "Users can view lessons for enrolled courses" ON public.lessons
  FOR SELECT USING (
    is_free_preview = true
    OR EXISTS (
      SELECT 1 FROM public.enrollments
      WHERE enrollments.course_id = lessons.course_id
      AND enrollments.user_id = auth.uid()
      AND enrollments.status = 'active'
    )
  );

-- Enrollments: Users see their own
CREATE POLICY "Users can view own enrollments" ON public.enrollments
  FOR SELECT USING (auth.uid() = user_id);

-- Progress: Users manage their own
CREATE POLICY "Users can manage own progress" ON public.progress
  FOR ALL USING (auth.uid() = user_id);

-- User XP: Users see their own
CREATE POLICY "Users can manage own XP" ON public.user_xp
  FOR ALL USING (auth.uid() = user_id);

-- Tutor conversations: Users see their own
CREATE POLICY "Users can manage own conversations" ON public.tutor_conversations
  FOR ALL USING (auth.uid() = user_id);

-- Content embeddings: Accessible to authenticated users
CREATE POLICY "Authenticated users can search content" ON public.content_embeddings
  FOR SELECT TO authenticated USING (true);

-- Voice options: Anyone can view
CREATE POLICY "Anyone can view voice options" ON public.voice_options
  FOR SELECT USING (true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function for vector similarity search
CREATE OR REPLACE FUNCTION match_content(
  query_embedding vector(1536),
  match_count INT DEFAULT 5,
  filter_course_id UUID DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  context TEXT,
  chapter_reference TEXT,
  course_id UUID,
  lesson_id UUID,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ce.id,
    ce.content,
    ce.context,
    ce.chapter_reference,
    ce.course_id,
    ce.lesson_id,
    1 - (ce.embedding <=> query_embedding) AS similarity
  FROM public.content_embeddings ce
  WHERE (filter_course_id IS NULL OR ce.course_id = filter_course_id)
  ORDER BY ce.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');

  INSERT INTO public.user_xp (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update XP
CREATE OR REPLACE FUNCTION public.add_xp(
  p_user_id UUID,
  p_xp_amount INTEGER
)
RETURNS void AS $$
DECLARE
  v_new_total INTEGER;
  v_new_level INTEGER;
BEGIN
  UPDATE public.user_xp
  SET
    total_xp = total_xp + p_xp_amount,
    last_activity_date = CURRENT_DATE,
    streak_days = CASE
      WHEN last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN streak_days + 1
      WHEN last_activity_date = CURRENT_DATE THEN streak_days
      ELSE 1
    END,
    longest_streak = GREATEST(longest_streak,
      CASE
        WHEN last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN streak_days + 1
        ELSE 1
      END
    ),
    updated_at = NOW()
  WHERE user_id = p_user_id
  RETURNING total_xp INTO v_new_total;

  -- Calculate level (every 1000 XP = 1 level)
  v_new_level := GREATEST(1, v_new_total / 1000 + 1);

  UPDATE public.user_xp
  SET current_level = v_new_level
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SEED DATA: COURSES
-- ============================================

INSERT INTO public.courses (title, slug, description, price_cents, duration_weeks, is_published, book_source) VALUES
(
  'Engineering Your Patterns',
  'engineering-your-patterns',
  'Break free from societal programming and transform your communication and addiction patterns. Learn to recognize the unconscious behaviors that control your life and develop conscious alternatives.',
  9700,
  6,
  true,
  'block_a'
),
(
  'The Self-Actualization Process',
  'self-actualization-process',
  'Explore your path to consciousness and authentic relationships. Understand how technology can serve your growth and create sustainable transformation.',
  9700,
  6,
  true,
  'block_a'
),
(
  'The Art of Right Judgment',
  'art-of-right-judgment',
  'Develop pattern recognition and emotional intelligence for conscious community building. Master the art of discernment without falling into judgment.',
  9700,
  6,
  true,
  'block_b'
),
(
  'Structuring Decisions in Chaos',
  'structuring-decisions-chaos',
  'Navigate generational gaps and implement structured decisions in chaotic environments. Bridge divides and foster collective evolution.',
  9700,
  6,
  true,
  'block_b'
),
(
  'The Laboratory of Living',
  'laboratory-of-living',
  'Discover moments of permission, use technology as a mirror, and navigate the awakening crisis. Real experiments from real transformation.',
  9700,
  8,
  true,
  'block_c'
),
(
  'Conscious Integration',
  'conscious-integration',
  'Master conscious transformation, bridge generational and cultural gaps, and develop archetypal fluidity. The synthesis of all patterns.',
  9700,
  8,
  true,
  'block_c'
);
