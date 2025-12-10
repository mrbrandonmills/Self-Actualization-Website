/**
 * Admin Enrollment Seed Script
 * Enrolls Brandon and Jesse in all courses with full access
 * Adds realistic progress data for testing
 *
 * Run: npm run db:seed:admin-enrollments
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const adminEmails = [
  'brandonflexy@gmail.com',
  'jesseadoherty@gmail.com',
];

async function seedAdminEnrollments() {
  console.log('🎓 Setting up admin enrollments and progress...\n');

  // Get all courses
  const courses = await prisma.course.findMany({
    include: {
      lessons: {
        orderBy: { orderIndex: 'asc' },
      },
    },
  });

  console.log(`📚 Found ${courses.length} courses with ${courses.reduce((acc, c) => acc + c.lessons.length, 0)} total lessons\n`);

  for (const email of adminEmails) {
    console.log(`\n👤 Processing ${email}...`);

    // Find or skip user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { userXp: true },
    });

    if (!user) {
      console.log(`   ⚠️ User not found: ${email} - skipping`);
      continue;
    }

    console.log(`   ✅ Found user: ${user.name || 'No name'} (${user.id})`);

    // Update user name if it's generic
    if (!user.name || user.name === 'Student') {
      const name = email === 'brandonflexy@gmail.com' ? 'Brandon Mills' : 'Jesse Doherty';
      await prisma.user.update({
        where: { id: user.id },
        data: { name },
      });
      console.log(`   📝 Updated name to: ${name}`);
    }

    // Enroll in all courses
    let totalXpEarned = 0;
    let lessonsCompleted = 0;

    for (const course of courses) {
      // Create enrollment
      await prisma.enrollment.upsert({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id,
          },
        },
        update: {
          status: 'ACTIVE',
        },
        create: {
          userId: user.id,
          courseId: course.id,
          status: 'ACTIVE',
          stripeSessionId: `admin_enrollment_${user.id}_${course.id}`,
        },
      });

      console.log(`   📖 Enrolled in: ${course.title}`);

      // Add progress for first few lessons of each course
      const lessonsToComplete = Math.min(course.lessons.length, 5); // Complete first 5 lessons

      for (let i = 0; i < lessonsToComplete; i++) {
        const lesson = course.lessons[i];
        const isCompleted = i < 3; // First 3 lessons completed, rest in progress

        await prisma.lessonProgress.upsert({
          where: {
            userId_lessonId: {
              userId: user.id,
              lessonId: lesson.id,
            },
          },
          update: {
            status: isCompleted ? 'COMPLETED' : 'IN_PROGRESS',
            completedAt: isCompleted ? new Date(Date.now() - (lessonsToComplete - i) * 24 * 60 * 60 * 1000) : null,
            timeSpentSeconds: isCompleted ? 900 + Math.floor(Math.random() * 600) : 300 + Math.floor(Math.random() * 300),
          },
          create: {
            userId: user.id,
            lessonId: lesson.id,
            courseId: course.id,
            status: isCompleted ? 'COMPLETED' : 'IN_PROGRESS',
            completedAt: isCompleted ? new Date(Date.now() - (lessonsToComplete - i) * 24 * 60 * 60 * 1000) : null,
            timeSpentSeconds: isCompleted ? 900 + Math.floor(Math.random() * 600) : 300 + Math.floor(Math.random() * 300),
          },
        });

        if (isCompleted) {
          totalXpEarned += 50; // 50 XP per lesson
          lessonsCompleted++;
        }
      }
    }

    // Update XP
    const currentXp = totalXpEarned + 100; // Bonus XP for admin
    const level = Math.floor(currentXp / 1000) + 1;

    await prisma.userXP.upsert({
      where: { userId: user.id },
      update: {
        totalXp: currentXp,
        currentLevel: level,
        streakDays: 3,
        longestStreak: 7,
        lastActivityDate: new Date(),
      },
      create: {
        userId: user.id,
        totalXp: currentXp,
        currentLevel: level,
        streakDays: 3,
        longestStreak: 7,
        lastActivityDate: new Date(),
      },
    });

    console.log(`\n   📊 Stats for ${user.name || email}:`);
    console.log(`      • Enrolled in: ${courses.length} courses`);
    console.log(`      • Lessons completed: ${lessonsCompleted}`);
    console.log(`      • Total XP: ${currentXp}`);
    console.log(`      • Level: ${level}`);
    console.log(`      • Streak: 3 days`);
  }

  console.log('\n═══════════════════════════════════════════════════');
  console.log('✨ Admin enrollment setup complete!');
  console.log('═══════════════════════════════════════════════════');
  console.log('\nBoth admins now have:');
  console.log('• Full enrollment in all 6 courses');
  console.log('• Progress on first 5 lessons of each course');
  console.log('• XP and streak data');
  console.log('• Proper names displayed');
  console.log('\nYou can now test the full course experience!');
}

seedAdminEnrollments()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
