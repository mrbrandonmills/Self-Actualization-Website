# Database Entity Relationship Diagram

## Visual Schema Overview

This document provides visual representations of the database schema relationships for the Collective Writing AI feature.

---

## Core Entity Relationships

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USERS & AUTHENTICATION                       │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│    Users     │◄────────│   Accounts   │         │   Sessions   │
├──────────────┤         ├──────────────┤         ├──────────────┤
│ id (PK)      │         │ id (PK)      │         │ id (PK)      │
│ email        │         │ userId (FK)  │         │ sessionToken │
│ name         │         │ provider     │         │ userId (FK)  │
│ role         │         │ type         │         │ expires      │
│ membershipTier│         │ accessToken  │         └──────────────┘
│ isActive     │         └──────────────┘               │
└──────────────┘                                        │
       │                                                │
       │ owns                                           │
       ▼                                                │
┌──────────────────────────────────────────────────────┼───────────┐
│                    WRITING PROJECTS                   │           │
└───────────────────────────────────────────────────────┼───────────┘
                                                        │
┌──────────────────┐                                    │
│ WritingProjects  │◄───────────────────────────────────┘
├──────────────────┤
│ id (PK)          │
│ title            │
│ ownerId (FK)     │◄─────┐
│ status           │      │
│ visibility       │      │
│ content          │      │
│ wordCount        │      │
└──────────────────┘      │
       │                  │
       │                  │ owns
       │                  │
       ├──────────────────┼────────────────────────────────────────┐
       │                  │                                        │
       │                  │                                        │
       ▼                  │                                        ▼
┌─────────────────────────┼─────────────────────────────┐ ┌──────────────┐
│        COLLABORATION    │                             │ │  VERSIONING  │
└─────────────────────────┼─────────────────────────────┘ └──────────────┘
                          │
┌──────────────────┐      │                            ┌──────────────────┐
│  Collaborators   │      │                            │  Contributions   │
├──────────────────┤      │                            ├──────────────────┤
│ id (PK)          │      │                            │ id (PK)          │
│ projectId (FK)   │──────┘                            │ projectId (FK)   │
│ userId (FK)      │◄───────────────┐                  │ userId (FK)      │
│ role             │                │                  │ parentId (FK)    │◄──┐
│ permissions      │                │                  │ content          │   │
│ status           │                │                  │ status           │   │
└──────────────────┘                │                  │ isAiAssisted     │   │
                                    │                  │ aiGenerationId   │   │
                                    │                  │ wordCount        │   │
                     collaborates   │                  └──────────────────┘   │
                                    │                           │             │
                                    │                           │ version     │
                                    │                           │ history     │
┌───────────────────────────────────┼───────────────────────────┼─────────────┤
│                    USERS          │                           │             │
└───────────────────────────────────┼───────────────────────────┘             │
                                    │                                         │
┌──────────────────┐                │                                         │
│      Users       │────────────────┘                                         │
├──────────────────┤                                                          │
│ id (PK)          │                                                          │
│ name             │                                                          │
│ email            │                                                          │
└──────────────────┘                                                          │
       │                                                                      │
       │ creates                                                              │
       ▼                                                                      │
┌─────────────────────────────────────────────────────────────────┐          │
│                        AI INTEGRATION                            │          │
└─────────────────────────────────────────────────────────────────┘          │
                                                                              │
┌──────────────────┐                                                         │
│  AiGenerations   │                                                         │
├──────────────────┤                                                         │
│ id (PK)          │─────────────────────────────────────────────────────────┘
│ userId (FK)      │                    linked to
│ projectId (FK)   │
│ prompt           │
│ model            │
│ provider         │
│ generatedContent │
│ tokensUsed       │
│ costUsd          │
│ wasUsed          │
└──────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                   FEEDBACK & VOTING SYSTEM                       │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐                 ┌──────────────────┐
│  Contributions   │◄────────────────│    Comments      │
└──────────────────┘     comments    ├──────────────────┤
                                     │ id (PK)          │
                                     │ contributionId   │
                                     │ projectId (FK)   │
                                     │ userId (FK)      │
                                     │ parentId (FK)    │◄──┐ threading
                                     │ content          │   │
                                     │ isResolved       │   │
                                     └──────────────────┘   │
                                              │             │
                                              └─────────────┘
                                              │
                                              │ reactions
                                              ▼
                                     ┌──────────────────┐
                                     │ CommentReactions │
                                     ├──────────────────┤
                                     │ id (PK)          │
                                     │ commentId (FK)   │
                                     │ userId (FK)      │
                                     │ reactionType     │
                                     └──────────────────┘

┌──────────────────┐                 ┌──────────────────┐
│  Contributions   │◄────────────────│      Votes       │
└──────────────────┘     votes on    ├──────────────────┤
                                     │ id (PK)          │
                                     │ contributionId   │
┌──────────────────┐                 │ pollId (FK)      │
│      Polls       │◄────────────────│ userId (FK)      │
├──────────────────┤     votes on    │ voteType         │
│ id (PK)          │                 │ weight           │
│ projectId (FK)   │                 └──────────────────┘
│ createdBy (FK)   │
│ title            │
│ pollType         │
│ options (JSON)   │
│ status           │
└──────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                   NOTIFICATIONS & AUDIT                          │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐                 ┌──────────────────┐
│      Users       │◄────────────────│  Notifications   │
└──────────────────┘   receives      ├──────────────────┤
                                     │ id (PK)          │
                                     │ userId (FK)      │
                                     │ type             │
                                     │ message          │
                                     │ relatedEntityId  │
                                     │ isRead           │
                                     └──────────────────┘

┌──────────────────┐                 ┌──────────────────┐
│      Users       │◄────────────────│  ActivityLog     │
└──────────────────┘   performs      ├──────────────────┤
                                     │ id (PK)          │
┌──────────────────┐                 │ userId (FK)      │
│ WritingProjects  │◄────────────────│ projectId (FK)   │
└──────────────────┘   tracked       │ actionType       │
                                     │ entityType       │
                                     │ entityId         │
                                     │ details (JSON)   │
                                     │ ipAddress        │
                                     └──────────────────┘
```

---

## Relationship Cardinality

### One-to-Many (1:N)
```
User ──< WritingProject           (User owns many projects)
User ──< Contribution             (User creates many contributions)
User ──< Comment                  (User writes many comments)
User ──< AiGeneration             (User generates many AI outputs)
User ──< Vote                     (User casts many votes)
User ──< Notification             (User receives many notifications)

WritingProject ──< Contribution   (Project has many contributions)
WritingProject ──< Comment        (Project has many comments)
WritingProject ──< Collaborator   (Project has many collaborators)
WritingProject ──< Poll           (Project has many polls)

Contribution ──< Comment          (Contribution has many comments)
Contribution ──< Vote             (Contribution has many votes)

Comment ──< CommentReaction       (Comment has many reactions)
Comment ──< Comment               (Comment has many replies - self-referencing)

Poll ──< Vote                     (Poll has many votes)

Contribution ──< Contribution     (Contribution has many versions - self-referencing)
```

### Many-to-Many (N:M)
```
User >──< WritingProject          (via Collaborators table)
  - A user can collaborate on many projects
  - A project can have many collaborators
  - Collaborators table stores: role, permissions, status
```

### Optional One-to-One (0..1:1)
```
Contribution ──> AiGeneration     (Contribution may link to one AI generation)
```

---

## Access Control Flow

```
┌─────────────┐
│    User     │
└──────┬──────┘
       │
       │ authentication
       ▼
┌─────────────┐
│   Session   │
└──────┬──────┘
       │
       │ check permissions
       ▼
┌──────────────────────┐
│   Row-Level Security │
│   (Supabase RLS)     │
└──────┬───────────────┘
       │
       ├───► Can access project?
       │     ├─ Owner? → YES
       │     ├─ Collaborator (ACCEPTED)? → YES
       │     ├─ Public visibility? → YES
       │     └─ Otherwise → NO
       │
       ├───► Can write contribution?
       │     └─ Collaborator with can_write=true → YES
       │
       ├───► Can approve contribution?
       │     └─ Collaborator with can_approve=true → YES
       │
       └───► Can invite collaborators?
             └─ Owner or can_invite=true → YES
```

---

## Data Flow: Creating a Contribution

```
┌──────────────────────────────────────────────────────────────────┐
│ 1. User writes content (with optional AI assistance)             │
└─────────────────────┬────────────────────────────────────────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │  AI Assistance Used?   │
         └────┬──────────────┬────┘
              │ YES          │ NO
              ▼              │
    ┌──────────────────┐    │
    │  AiGeneration    │    │
    │  - Store prompt  │    │
    │  - Store output  │    │
    │  - Track cost    │    │
    └────┬─────────────┘    │
         │                  │
         │ aiGenerationId   │
         │                  │
         └─────────┬────────┘
                   ▼
         ┌──────────────────┐
         │  Contribution    │
         │  - content       │
         │  - isAiAssisted  │
         │  - status:PENDING│
         └────┬─────────────┘
              │
              ▼
    ┌──────────────────────┐
    │ Notify collaborators │
    │ (Notification table) │
    └────┬─────────────────┘
         │
         ▼
    ┌──────────────────────┐
    │ Collaborators review │
    │ - Add comments       │
    │ - Cast votes         │
    └────┬─────────────────┘
         │
         ▼
    ┌──────────────────────┐
    │ Approval threshold   │
    │ reached?             │
    └────┬────────────┬────┘
         │ YES        │ NO
         ▼            ▼
    ┌─────────┐  ┌─────────┐
    │ APPROVE │  │ REJECT  │
    └────┬────┘  └────┬────┘
         │            │
         ▼            ▼
    ┌─────────────────────────┐
    │ Update contribution     │
    │ - status = APPROVED     │
    │ - approvedBy = userId   │
    │ - approvedAt = now()    │
    └────┬────────────────────┘
         │
         ▼
    ┌─────────────────────────┐
    │ Integrate into project  │
    │ - Update project.content│
    │ - Update wordCount      │
    │ - status = INTEGRATED   │
    └────┬────────────────────┘
         │
         ▼
    ┌─────────────────────────┐
    │ Log activity            │
    │ (ActivityLog table)     │
    └─────────────────────────┘
```

---

## Performance Optimization Strategy

```
┌────────────────────────────────────────────────────────────┐
│                      QUERY OPTIMIZATION                     │
└────────────────────────────────────────────────────────────┘

1. Indexes
   ├─ Users: email (unique), membershipTier
   ├─ Projects: ownerId, status, visibility, tags (GIN)
   ├─ Contributions: projectId+status, userId, parentId
   ├─ Comments: contributionId, projectId, userId
   └─ Votes: contributionId+userId (unique), pollId+userId (unique)

2. Materialized Views (Aggregations)
   ├─ project_statistics
   │  └─ Pre-computed: contributor count, word count, last activity
   └─ user_contribution_stats
      └─ Pre-computed: projects contributed, total words, approval rate

3. Query Patterns
   ├─ Eager loading with Prisma include/select
   ├─ Limit result sets (pagination)
   ├─ Use indexes for WHERE clauses
   └─ Avoid N+1 queries

4. Caching Strategy
   ├─ Application-level: Redis for project lists
   ├─ Query results: Cache frequent queries (5 min TTL)
   └─ Static data: User profiles, project metadata

5. Database Connection Pooling
   └─ Use Supabase connection pooler (PgBouncer)
```

---

## Backup & Recovery Strategy

```
┌────────────────────────────────────────────────────────────┐
│                   BACKUP ARCHITECTURE                       │
└────────────────────────────────────────────────────────────┘

┌──────────────┐
│   Database   │
│  (Primary)   │
└──────┬───────┘
       │
       ├─── Full Backup ───────► Daily 2 AM UTC
       │                         (30-day retention)
       │
       ├─── Incremental ─────────► Every 6 hours
       │                           (7-day retention)
       │
       ├─── Point-in-Time ───────► Continuous WAL
       │    Recovery (PITR)        (7-day retention)
       │
       └─── Async Replication ──► Read Replica
                                   (Near real-time)

Recovery Time Objectives (RTO):
  ├─ Read Replica Failover: < 5 minutes
  ├─ PITR Recovery: < 30 minutes
  └─ Full Backup Restore: < 2 hours

Recovery Point Objectives (RPO):
  ├─ Read Replica: < 1 minute data loss
  ├─ PITR: 0 data loss (point in time)
  └─ Daily Backup: < 24 hours data loss
```

---

## Scaling Path

```
┌────────────────────────────────────────────────────────────┐
│                      SCALING ROADMAP                        │
└────────────────────────────────────────────────────────────┘

Phase 1: MVP (0-1K users)
├─ Single database instance (Supabase Free)
├─ No caching
└─ Basic indexes

Phase 2: Growth (1K-10K users)
├─ Upgrade to Supabase Pro
├─ Add Redis caching layer
├─ Implement materialized views
├─ Connection pooling
└─ Read replica for analytics

Phase 3: Scale (10K-100K users)
├─ Multiple read replicas
├─ Table partitioning (activity_log by month)
├─ CDN for static assets
├─ Database query optimization
└─ Horizontal sharding consideration

Phase 4: Enterprise (100K+ users)
├─ Multi-region deployment
├─ Database sharding by project
├─ Advanced caching (edge caching)
├─ Dedicated analytics database
└─ Real-time event streaming
```

---

## Security Layers

```
┌────────────────────────────────────────────────────────────┐
│                    SECURITY ARCHITECTURE                    │
└────────────────────────────────────────────────────────────┘

Layer 1: Network Security
├─ SSL/TLS encryption (in transit)
├─ VPN for database access (production)
└─ IP allowlisting (paid tier)

Layer 2: Authentication
├─ NextAuth.js (session management)
├─ OAuth providers (Google, GitHub)
├─ Password hashing (bcrypt, 12 rounds)
└─ Email verification

Layer 3: Authorization
├─ Row-Level Security (RLS) policies
├─ Role-based access control (RBAC)
├─ Granular permissions per collaborator
└─ Project visibility controls

Layer 4: Data Protection
├─ Encryption at rest (Supabase default)
├─ Sensitive data masking
├─ PII anonymization (IP addresses after 90 days)
└─ Soft deletes (GDPR compliance)

Layer 5: Audit & Monitoring
├─ Activity log (all actions tracked)
├─ Failed login attempts
├─ Anomaly detection
└─ Security alerts
```

---

## Migration Checklist

### Pre-Migration
- [ ] Backup current database (if exists)
- [ ] Review schema for errors
- [ ] Test on development environment
- [ ] Prepare rollback plan

### Migration
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Verify all tables created
- [ ] Verify all indexes created
- [ ] Verify all foreign keys created
- [ ] Check data types match schema

### Post-Migration
- [ ] Run seed script
- [ ] Test all relationships
- [ ] Verify RLS policies
- [ ] Test API endpoints
- [ ] Performance testing
- [ ] Security audit

### Production
- [ ] Use `npx prisma migrate deploy`
- [ ] Monitor for errors
- [ ] Verify no data loss
- [ ] Test critical user flows
- [ ] Update documentation

---

**Document Version**: 1.0
**Last Updated**: 2025-11-22
**Purpose**: Visual reference for database schema relationships and data flows
