/**
 * NextAuth.js Configuration
 * Authentication for the course platform using Railway PostgreSQL
 */

import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    newUser: '/onboarding',
  },
  providers: [
    // Email/Password authentication
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatarUrl,
        };
      },
    }),
    // Google OAuth (optional - add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // Create UserXP record when a new user signs up
      if (user.id) {
        await prisma.userXP.create({
          data: {
            userId: user.id,
            totalXp: 0,
            currentLevel: 1,
            streakDays: 0,
            longestStreak: 0,
          },
        });
      }
    },
  },
});

// Helper to get the current user in server components
export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      userXp: true,
      enrollments: {
        where: { status: 'ACTIVE' },
        include: { course: true },
      },
    },
  });

  return user;
}

// Helper to check if user is enrolled in a course
export async function isEnrolled(userId: string, courseSlug: string): Promise<boolean> {
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId,
      status: 'ACTIVE',
      course: {
        slug: courseSlug,
      },
    },
  });

  return !!enrollment;
}
