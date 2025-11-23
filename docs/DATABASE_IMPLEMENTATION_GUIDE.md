# Database Implementation Guide

## Overview
This guide provides step-by-step instructions for implementing the Collective Writing AI database using Supabase and Prisma.

---

## Technology Stack Decision

### Chosen: Supabase (PostgreSQL)

**Final Recommendation: Supabase**

#### Why Supabase?

**1. Real-time Collaboration (Critical)**
- Built-in real-time subscriptions via WebSockets
- Perfect for live collaborative writing
- See collaborators typing, changes as they happen
- Instant notifications and updates

**2. PostgreSQL Features**
- JSONB support for flexible metadata
- Full-text search for content discovery
- Array types for tags
- Advanced indexing (GIN, BRIN)
- Row-Level Security for fine-grained access control

**3. Vercel Integration**
- Official Vercel integration
- Environment variable management
- Automatic connection pooling
- Edge function compatibility

**4. Cost-Effective**
- **Free Tier Includes:**
  - 500MB database storage
  - 2GB file storage
  - 50,000 monthly active users
  - Unlimited API requests
  - Social OAuth providers
  - Row-Level Security
  - Real-time subscriptions

**5. Developer Experience**
- Excellent Prisma support
- Auto-generated REST API
- Built-in authentication (NextAuth.js compatible)
- Database migrations support
- Studio for database management
- Comprehensive documentation

**6. Scalability**
- Easy vertical scaling (upgrade plan)
- Read replicas available on higher tiers
- Point-in-time recovery
- Automated backups

**7. Security**
- Row-Level Security policies
- SSL by default
- API key management
- IP allowlisting (paid tiers)

#### Comparison with Alternatives

| Feature | Supabase | Vercel Postgres | PlanetScale |
|---------|----------|-----------------|-------------|
| Database | PostgreSQL | PostgreSQL | MySQL |
| Real-time | Built-in | No | Limited |
| Free Tier Storage | 500MB | 256MB | 5GB |
| Row-Level Security | Yes | Limited | No |
| Full-text Search | Native | Native | Limited |
| Prisma Support | Excellent | Good | Good |
| File Storage | Included | Separate | Separate |
| Authentication | Built-in | Separate | Separate |
| WebSockets | Included | Manual | Manual |

---

## Step-by-Step Implementation

### Phase 1: Initial Setup

#### 1.1 Create Supabase Project

```bash
# Visit https://supabase.com/dashboard
# Click "New Project"
# Fill in:
#   - Project Name: self-actualized-life
#   - Database Password: [generate strong password]
#   - Region: [closest to users, e.g., us-east-1]
#   - Plan: Free (upgrade later)
```

**Save these values:**
- Project URL: `https://[project-ref].supabase.co`
- Anon/Public Key: `eyJ...` (for client-side)
- Service Role Key: `eyJ...` (for server-side, NEVER expose)
- Database Password: `[your-password]`

#### 1.2 Get Connection Strings

In Supabase Dashboard:
1. Go to Settings → Database
2. Copy connection strings:

```env
# Connection pooling (recommended for Vercel)
DATABASE_URL="postgres://postgres.xxxx:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection (for migrations)
DIRECT_URL="postgres://postgres.xxxx:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

# Supabase specific
NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."
```

#### 1.3 Configure Environment Variables

Create `/Volumes/Super Mastery/Self-Actualization-Website/.env.local`:

```env
# Database
DATABASE_URL="postgres://postgres.xxxx:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgres://postgres.xxxx:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="[generate with: openssl rand -base64 32]"

# AI Providers
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
```

**Add to .gitignore:**
```bash
echo ".env.local" >> .gitignore
```

---

### Phase 2: Install Dependencies

```bash
cd /Volumes/Super\ Mastery/Self-Actualization-Website

# Install Prisma
npm install -D prisma
npm install @prisma/client

# Install Supabase client
npm install @supabase/supabase-js

# Install NextAuth.js
npm install next-auth @next-auth/prisma-adapter

# Install additional utilities
npm install bcryptjs
npm install -D @types/bcryptjs
```

---

### Phase 3: Initialize Prisma

#### 3.1 Verify Schema File

The schema file has already been created at:
`/Volumes/Super Mastery/Self-Actualization-Website/prisma/schema.prisma`

#### 3.2 Generate Prisma Client

```bash
npx prisma generate
```

This creates the type-safe Prisma Client in `node_modules/@prisma/client`.

---

### Phase 4: Database Migration

#### 4.1 Create Initial Migration

```bash
# Create migration files
npx prisma migrate dev --name init

# This will:
# 1. Create migration SQL files
# 2. Apply migration to database
# 3. Regenerate Prisma Client
```

#### 4.2 Review Migration

Check `prisma/migrations/[timestamp]_init/migration.sql` to ensure all tables were created.

#### 4.3 Alternative: Push Schema (Development Only)

For rapid prototyping without migration history:

```bash
npx prisma db push
```

---

### Phase 5: Create Prisma Client Instance

Create `/Volumes/Super Mastery/Self-Actualization-Website/lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**Why this pattern?**
- Prevents multiple Prisma instances in development (Next.js hot reload)
- Singleton pattern for production
- Proper logging configuration

---

### Phase 6: Seed Initial Data

Create `/Volumes/Super Mastery/Self-Actualization-Website/prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123!@#', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@selfactualized.life' },
    update: {},
    create: {
      email: 'admin@selfactualized.life',
      passwordHash: adminPassword,
      name: 'Admin User',
      bio: 'Platform administrator',
      role: 'ADMIN',
      membershipTier: 'PREMIUM',
      emailVerified: new Date(),
    },
  })
  console.log('Created admin user:', admin.email)

  // Create test users
  const testPassword = await bcrypt.hash('test123', 12)

  const user1 = await prisma.user.upsert({
    where: { email: 'writer1@test.com' },
    update: {},
    create: {
      email: 'writer1@test.com',
      passwordHash: testPassword,
      name: 'Alice Writer',
      bio: 'Passionate about collaborative storytelling',
      membershipTier: 'PRO',
      emailVerified: new Date(),
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'writer2@test.com' },
    update: {},
    create: {
      email: 'writer2@test.com',
      passwordHash: testPassword,
      name: 'Bob Contributor',
      bio: 'Love writing with AI assistance',
      membershipTier: 'BASIC',
      emailVerified: new Date(),
    },
  })

  console.log('Created test users')

  // Create sample project
  const project = await prisma.writingProject.create({
    data: {
      title: 'The Journey to Self-Actualization',
      description: 'A collaborative exploration of personal growth and transformation',
      content: 'Chapter 1: The Beginning\n\nEvery journey starts with a single step...',
      genre: 'Self-Help',
      status: 'ACTIVE',
      visibility: 'PUBLIC',
      ownerId: user1.id,
      tags: ['self-help', 'personal-growth', 'transformation'],
      wordCount: 150,
      targetWordCount: 50000,
      settings: {
        allowAiSuggestions: true,
        requireApproval: true,
        votingThreshold: 0.6,
      },
    },
  })

  console.log('Created sample project:', project.title)

  // Add collaborators
  await prisma.collaborator.create({
    data: {
      projectId: project.id,
      userId: user1.id,
      role: 'OWNER',
      status: 'ACCEPTED',
      joinedAt: new Date(),
      permissions: {
        canRead: true,
        canWrite: true,
        canApprove: true,
        canInvite: true,
        canDelete: true,
      },
    },
  })

  await prisma.collaborator.create({
    data: {
      projectId: project.id,
      userId: user2.id,
      role: 'CONTRIBUTOR',
      status: 'ACCEPTED',
      joinedAt: new Date(),
      invitedBy: user1.id,
      permissions: {
        canRead: true,
        canWrite: true,
        canApprove: false,
        canInvite: false,
        canDelete: false,
      },
    },
  })

  console.log('Added collaborators')

  // Create sample contribution
  const contribution = await prisma.contribution.create({
    data: {
      projectId: project.id,
      userId: user2.id,
      content: 'As we embark on this journey together, we must first understand what self-actualization truly means. It is not merely about achieving goals, but about becoming the fullest expression of ourselves.',
      section: 'Chapter 1',
      position: 1,
      contributionType: 'ADDITION',
      isAiAssisted: false,
      status: 'APPROVED',
      approvedBy: user1.id,
      approvedAt: new Date(),
      wordCount: 42,
    },
  })

  console.log('Created sample contribution')

  // Create sample AI generation
  const aiGen = await prisma.aiGeneration.create({
    data: {
      userId: user1.id,
      projectId: project.id,
      prompt: 'Write an introduction about the importance of self-awareness in personal growth',
      model: 'gpt-4',
      provider: 'openai',
      generatedContent: 'Self-awareness is the cornerstone of personal growth. Without understanding who we are, we cannot determine where we want to go...',
      temperature: 0.7,
      maxTokens: 500,
      tokensUsed: 156,
      costUsd: 0.00468,
      qualityRating: 4,
      wasUsed: true,
      metadata: {
        purpose: 'content-generation',
        section: 'introduction',
      },
    },
  })

  console.log('Created AI generation record')

  // Create sample comment
  await prisma.comment.create({
    data: {
      contributionId: contribution.id,
      projectId: project.id,
      userId: user1.id,
      content: 'Great addition! This really captures the essence of what we are trying to convey.',
      contentType: 'TEXT',
    },
  })

  console.log('Created sample comment')

  console.log('Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

#### Add seed script to package.json:

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

#### Install ts-node for seeding:

```bash
npm install -D ts-node
```

#### Run seed:

```bash
npx prisma db seed
```

---

### Phase 7: Configure NextAuth.js

Create `/Volumes/Super Mastery/Self-Actualization-Website/lib/auth.ts`:

```typescript
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.passwordHash) {
          throw new Error('Invalid credentials')
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash)

        if (!isValid) {
          throw new Error('Invalid credentials')
        }

        if (!user.isActive || user.deletedAt) {
          throw new Error('Account is inactive')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatarUrl,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.membershipTier = user.membershipTier
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.membershipTier = token.membershipTier as string
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === 'development',
}
```

Create `/Volumes/Super Mastery/Self-Actualization-Website/app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

---

### Phase 8: Row-Level Security (RLS)

While Prisma doesn't natively support RLS, you can add policies directly in Supabase:

#### In Supabase SQL Editor:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT
  USING (auth.uid()::text = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE
  USING (auth.uid()::text = id);

-- Projects: Owner and collaborators can read
CREATE POLICY "Project access" ON writing_projects
  FOR SELECT
  USING (
    owner_id = auth.uid()::text
    OR id IN (
      SELECT project_id FROM collaborators
      WHERE user_id = auth.uid()::text AND status = 'ACCEPTED'
    )
    OR visibility = 'PUBLIC'
  );

-- Contributions: Based on project access
CREATE POLICY "Contribution access" ON contributions
  FOR SELECT
  USING (
    project_id IN (
      SELECT id FROM writing_projects
      WHERE owner_id = auth.uid()::text
        OR id IN (
          SELECT project_id FROM collaborators
          WHERE user_id = auth.uid()::text AND status = 'ACCEPTED'
        )
    )
  );

-- Collaborators can read their projects
CREATE POLICY "Collaborator access" ON collaborators
  FOR SELECT
  USING (user_id = auth.uid()::text OR project_id IN (
    SELECT id FROM writing_projects WHERE owner_id = auth.uid()::text
  ));
```

---

### Phase 9: Testing the Setup

Create `/Volumes/Super Masty/Self-Actualization-Website/tests/db.test.ts`:

```typescript
import { prisma } from '@/lib/prisma'

async function testDatabaseConnection() {
  try {
    // Test connection
    await prisma.$connect()
    console.log('✓ Database connection successful')

    // Test query
    const userCount = await prisma.user.count()
    console.log(`✓ Found ${userCount} users`)

    // Test relationships
    const projects = await prisma.writingProject.findMany({
      include: {
        owner: true,
        collaborators: {
          include: {
            user: true,
          },
        },
        contributions: {
          take: 5,
        },
      },
      take: 5,
    })
    console.log(`✓ Found ${projects.length} projects with relationships`)

    // Test AI generations
    const aiGenCount = await prisma.aiGeneration.count()
    console.log(`✓ Found ${aiGenCount} AI generations`)

    console.log('\n✓ All database tests passed!')
  } catch (error) {
    console.error('✗ Database test failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

testDatabaseConnection()
```

Run test:
```bash
npx ts-node tests/db.test.ts
```

---

### Phase 10: Create Database Utilities

Create `/Volumes/Super Mastery/Self-Actualization-Website/lib/db-utils.ts`:

```typescript
import { prisma } from './prisma'

// Get user with all related data
export async function getUserWithRelations(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      ownedProjects: {
        where: { deletedAt: null },
        orderBy: { updatedAt: 'desc' },
      },
      collaborations: {
        where: { status: 'ACCEPTED' },
        include: {
          project: true,
        },
      },
      contributions: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  })
}

// Get project with full details
export async function getProjectWithDetails(projectId: string, userId: string) {
  // Check access first
  const hasAccess = await checkProjectAccess(projectId, userId)
  if (!hasAccess) {
    throw new Error('Access denied')
  }

  return await prisma.writingProject.findUnique({
    where: { id: projectId },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
      collaborators: {
        where: { status: 'ACCEPTED' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      },
      contributions: {
        where: { deletedAt: null },
        orderBy: { position: 'asc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatarUrl: true,
                },
              },
            },
          },
        },
      },
    },
  })
}

// Check if user has access to project
export async function checkProjectAccess(projectId: string, userId: string) {
  const project = await prisma.writingProject.findUnique({
    where: { id: projectId },
    include: {
      collaborators: {
        where: {
          userId: userId,
          status: 'ACCEPTED',
        },
      },
    },
  })

  if (!project) return false
  if (project.ownerId === userId) return true
  if (project.collaborators.length > 0) return true
  if (project.visibility === 'PUBLIC') return true

  return false
}

// Create contribution with AI tracking
export async function createContribution({
  projectId,
  userId,
  content,
  aiGenerationId,
}: {
  projectId: string
  userId: string
  content: string
  aiGenerationId?: string
}) {
  const wordCount = content.split(/\s+/).length

  return await prisma.contribution.create({
    data: {
      projectId,
      userId,
      content,
      contributionType: 'ADDITION',
      isAiAssisted: !!aiGenerationId,
      aiGenerationId,
      wordCount,
      status: 'PENDING',
    },
  })
}

// Track AI generation
export async function trackAiGeneration({
  userId,
  projectId,
  prompt,
  model,
  provider,
  generatedContent,
  tokensUsed,
  costUsd,
}: {
  userId: string
  projectId?: string
  prompt: string
  model: string
  provider: string
  generatedContent: string
  tokensUsed: number
  costUsd: number
}) {
  return await prisma.aiGeneration.create({
    data: {
      userId,
      projectId,
      prompt,
      model,
      provider,
      generatedContent,
      tokensUsed,
      costUsd,
    },
  })
}
```

---

## Next Steps

### Immediate Tasks
1. Set up Supabase project
2. Configure environment variables
3. Run migrations
4. Seed initial data
5. Test database connection

### Development Tasks
1. Create API routes for CRUD operations
2. Implement real-time subscriptions
3. Build authentication flow
4. Create project management UI
5. Implement collaborative editing
6. Add AI integration endpoints

### Production Readiness
1. Configure production database
2. Set up database backups
3. Implement monitoring and alerts
4. Add performance optimization
5. Configure RLS policies
6. Set up CI/CD for migrations

---

## Troubleshooting

### Common Issues

**Issue: "Can't reach database server"**
```bash
# Check connection string format
# Ensure DATABASE_URL and DIRECT_URL are correct
# Verify Supabase project is not paused
```

**Issue: "Prisma Client not generated"**
```bash
npx prisma generate
```

**Issue: "Migration failed"**
```bash
# Reset database (CAUTION: deletes all data)
npx prisma migrate reset

# Or push schema without migrations
npx prisma db push
```

**Issue: "Connection pool timeout"**
```bash
# Use connection pooling URL
# Increase pool size in Supabase settings
# Add connection limit to schema:
# datasource db {
#   url = env("DATABASE_URL")
#   relationMode = "prisma"
# }
```

---

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

---

**Document Version**: 1.0
**Last Updated**: 2025-11-22
