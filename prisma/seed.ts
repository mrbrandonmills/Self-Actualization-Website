/**
 * Prisma Seed Script
 * Seeds the database with course platform data
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed Voice Options
  const voiceOptions = [
    {
      id: 'sage',
      name: 'Sage',
      description: 'Warm, wise mentor voice with a calm and reassuring presence',
      elevenlabsVoiceId: 'EXAVITQu4vr4xnSDxMaL',
    },
    {
      id: 'aria',
      name: 'Aria',
      description: 'Encouraging and supportive guide with gentle enthusiasm',
      elevenlabsVoiceId: 'FGY2WhTYpPnrIDTdsKH5',
    },
    {
      id: 'river',
      name: 'River',
      description: 'Calm and grounding presence with a meditative quality',
      elevenlabsVoiceId: 'SAz9YHcvj6GT2YYXdXww',
    },
    {
      id: 'ember',
      name: 'Ember',
      description: 'Dynamic and energizing instructor with motivating energy',
      elevenlabsVoiceId: 'CwhRBWXzGAHq8TQ4Fs17',
    },
  ];

  for (const voice of voiceOptions) {
    await prisma.voiceOption.upsert({
      where: { id: voice.id },
      update: voice,
      create: voice,
    });
  }
  console.log('Voice options seeded');

  // Seed Courses
  const coursesData = [
    {
      title: 'Engineering Your Patterns',
      slug: 'engineering-your-patterns',
      description: 'Break free from the autopilot patterns that control your life. This course reveals the unconscious programs running in your mind and gives you the tools to rewrite them.',
      priceCents: 9700,
      durationWeeks: 6,
      isPublished: true,
      bookSource: 'BLOCK_A' as const,
    },
    {
      title: 'The Self-Actualization Process',
      slug: 'self-actualization-process',
      description: 'Move beyond fixing yourself to actualizing yourself. This course reveals the path from seeking external completion to discovering the wholeness already within.',
      priceCents: 9700,
      durationWeeks: 6,
      isPublished: true,
      bookSource: 'BLOCK_A' as const,
    },
    {
      title: 'The Art of Right Judgment',
      slug: 'art-of-right-judgment',
      description: 'Develop sophisticated pattern recognition skills that transform how you see yourself and others. Move from reactive triggers to conscious responses.',
      priceCents: 9700,
      durationWeeks: 6,
      isPublished: true,
      bookSource: 'BLOCK_B' as const,
    },
    {
      title: 'Structuring Decisions in Chaos',
      slug: 'structuring-decisions-chaos',
      description: 'Learn to bridge generational and consciousness gaps, implement sustainable awareness practices, and become a translator between different frequencies.',
      priceCents: 9700,
      durationWeeks: 6,
      isPublished: true,
      bookSource: 'BLOCK_B' as const,
    },
    {
      title: 'The Laboratory of Living',
      slug: 'laboratory-of-living',
      description: 'Treat your life as research, not waiting for gurus. Learn to document transformation in real-time and discover moments of permission that collapse limitations.',
      priceCents: 9700,
      durationWeeks: 8,
      isPublished: true,
      bookSource: 'BLOCK_C' as const,
    },
    {
      title: 'Conscious Integration',
      slug: 'conscious-integration',
      description: 'Master conscious transformation without ideal conditions. Learn to bridge generational and cultural gaps, and develop archetypal fluidity.',
      priceCents: 9700,
      durationWeeks: 8,
      isPublished: true,
      bookSource: 'BLOCK_C' as const,
    },
  ];

  for (const courseData of coursesData) {
    const course = await prisma.course.upsert({
      where: { slug: courseData.slug },
      update: courseData,
      create: courseData,
    });

    // Create lessons for each course
    const lessonsPerWeek = 5;
    const totalLessons = courseData.durationWeeks * lessonsPerWeek;

    for (let i = 0; i < totalLessons; i++) {
      const weekNum = Math.floor(i / lessonsPerWeek) + 1;
      const lessonNum = (i % lessonsPerWeek) + 1;
      const lessonSlug = `week-${weekNum}-lesson-${lessonNum}`;

      await prisma.lesson.upsert({
        where: {
          idx_lessons_course_slug: {
            courseId: course.id,
            slug: lessonSlug,
          },
        },
        update: {
          title: `Week ${weekNum}, Lesson ${lessonNum}`,
          orderIndex: i,
          durationMinutes: 15,
          isFreePreview: i === 0, // First lesson is free preview
        },
        create: {
          courseId: course.id,
          title: `Week ${weekNum}, Lesson ${lessonNum}`,
          slug: lessonSlug,
          orderIndex: i,
          durationMinutes: 15,
          isFreePreview: i === 0,
        },
      });
    }

    console.log(`Course "${courseData.title}" seeded with ${totalLessons} lessons`);
  }

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
