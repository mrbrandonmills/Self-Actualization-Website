# Database Schema - Collective Writing AI

## Overview
This document defines the database schema for The Self Actualized Life platform's collective writing AI feature, enabling collaborative content creation with AI assistance.

## Database Technology Recommendation

### Recommended: **Supabase (PostgreSQL)**

**Rationale:**
1. **Real-time Collaboration**: Built-in real-time subscriptions perfect for live collaboration
2. **PostgreSQL Power**: Full SQL capabilities with JSONB, full-text search, and advanced indexing
3. **Authentication**: Built-in auth system compatible with NextAuth.js
4. **Vercel Integration**: Seamless deployment with Vercel projects
5. **Free Tier**: Generous limits (500MB database, 2GB bandwidth, 50MB file storage)
6. **Row-Level Security**: Built-in RLS for fine-grained permissions
7. **Developer Experience**: Excellent Prisma support, migrations, and tooling
8. **Scalability**: Easy vertical and horizontal scaling path

**Why Not Others:**
- **Vercel Postgres**: Limited real-time capabilities, less feature-rich
- **PlanetScale**: MySQL limitations (no foreign keys in some configs), less suited for complex relationships

## Schema Design

### 1. Users Table

**Purpose**: Store user accounts, authentication, and profile information

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique user identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email for authentication |
| emailVerified | TIMESTAMP | NULLABLE | Email verification timestamp |
| password_hash | VARCHAR(255) | NULLABLE | Hashed password (nullable for OAuth) |
| name | VARCHAR(255) | NOT NULL | User display name |
| bio | TEXT | NULLABLE | User biography |
| avatar_url | VARCHAR(500) | NULLABLE | Profile image URL |
| role | ENUM | NOT NULL, DEFAULT 'USER' | Global role (USER, ADMIN) |
| membership_tier | ENUM | NOT NULL, DEFAULT 'FREE' | Subscription tier (FREE, BASIC, PRO, PREMIUM) |
| is_active | BOOLEAN | NOT NULL, DEFAULT true | Account status |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Account creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |
| deleted_at | TIMESTAMP | NULLABLE | Soft delete timestamp |

**Indexes:**
- `idx_users_email` on `email`
- `idx_users_membership_tier` on `membership_tier`
- `idx_users_active` on `is_active, deleted_at`

---

### 2. Accounts Table (OAuth)

**Purpose**: NextAuth.js OAuth provider integration

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique account identifier |
| user_id | UUID | FOREIGN KEY → users.id, NOT NULL | Reference to user |
| type | VARCHAR(50) | NOT NULL | Account type (oauth, credentials) |
| provider | VARCHAR(50) | NOT NULL | Provider name (google, github) |
| provider_account_id | VARCHAR(255) | NOT NULL | Provider's user ID |
| refresh_token | TEXT | NULLABLE | OAuth refresh token |
| access_token | TEXT | NULLABLE | OAuth access token |
| expires_at | INTEGER | NULLABLE | Token expiration timestamp |
| token_type | VARCHAR(50) | NULLABLE | Token type |
| scope | VARCHAR(255) | NULLABLE | OAuth scopes |
| id_token | TEXT | NULLABLE | OpenID token |
| session_state | VARCHAR(255) | NULLABLE | Session state |

**Indexes:**
- `idx_accounts_user` on `user_id`
- `idx_accounts_provider` on `provider, provider_account_id` (UNIQUE)

---

### 3. Sessions Table

**Purpose**: NextAuth.js session management

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique session identifier |
| session_token | VARCHAR(255) | UNIQUE, NOT NULL | Session token |
| user_id | UUID | FOREIGN KEY → users.id, NOT NULL | Reference to user |
| expires | TIMESTAMP | NOT NULL | Session expiration |

**Indexes:**
- `idx_sessions_token` on `session_token`
- `idx_sessions_user` on `user_id`

---

### 4. Writing Projects Table

**Purpose**: Store collaborative writing project metadata

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique project identifier |
| title | VARCHAR(500) | NOT NULL | Project title |
| description | TEXT | NULLABLE | Project description |
| content | TEXT | NOT NULL, DEFAULT '' | Current project content |
| genre | VARCHAR(100) | NULLABLE | Genre/category |
| status | ENUM | NOT NULL, DEFAULT 'DRAFT' | Project status (DRAFT, ACTIVE, COMPLETED, PUBLISHED, ARCHIVED) |
| visibility | ENUM | NOT NULL, DEFAULT 'PRIVATE' | Visibility (PRIVATE, COLLABORATORS_ONLY, PUBLIC) |
| owner_id | UUID | FOREIGN KEY → users.id, NOT NULL | Project creator |
| featured_image_url | VARCHAR(500) | NULLABLE | Cover image URL |
| tags | TEXT[] | DEFAULT '{}' | Array of tags |
| word_count | INTEGER | NOT NULL, DEFAULT 0 | Current word count |
| target_word_count | INTEGER | NULLABLE | Target word count goal |
| publication_date | TIMESTAMP | NULLABLE | Publication timestamp |
| settings | JSONB | NOT NULL, DEFAULT '{}' | Project configuration (AI model preferences, etc.) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |
| deleted_at | TIMESTAMP | NULLABLE | Soft delete timestamp |

**Indexes:**
- `idx_projects_owner` on `owner_id`
- `idx_projects_status` on `status, deleted_at`
- `idx_projects_visibility` on `visibility`
- `idx_projects_tags` on `tags` using GIN
- `idx_projects_created` on `created_at DESC`
- `idx_projects_search` on `title, description` using GIN (full-text search)

---

### 5. Collaborators Table

**Purpose**: Many-to-many relationship between users and projects

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique collaborator record |
| project_id | UUID | FOREIGN KEY → writing_projects.id, NOT NULL | Reference to project |
| user_id | UUID | FOREIGN KEY → users.id, NOT NULL | Reference to user |
| role | ENUM | NOT NULL, DEFAULT 'CONTRIBUTOR' | Project role (OWNER, EDITOR, CONTRIBUTOR, REVIEWER) |
| permissions | JSONB | NOT NULL, DEFAULT '{}' | Granular permissions (can_read, can_write, can_approve, can_invite) |
| invited_by | UUID | FOREIGN KEY → users.id, NULLABLE | Who invited this collaborator |
| invited_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Invitation timestamp |
| joined_at | TIMESTAMP | NULLABLE | When user accepted |
| status | ENUM | NOT NULL, DEFAULT 'PENDING' | Invitation status (PENDING, ACCEPTED, DECLINED, REMOVED) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_collaborators_project` on `project_id, status`
- `idx_collaborators_user` on `user_id, status`
- `idx_collaborators_unique` on `project_id, user_id` (UNIQUE)

---

### 6. Contributions Table

**Purpose**: Track individual contributions to projects with versioning

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique contribution identifier |
| project_id | UUID | FOREIGN KEY → writing_projects.id, NOT NULL | Reference to project |
| user_id | UUID | FOREIGN KEY → users.id, NOT NULL | Contributor |
| parent_id | UUID | FOREIGN KEY → contributions.id, NULLABLE | Previous version (for tracking edits) |
| content | TEXT | NOT NULL | Contribution content |
| content_delta | JSONB | NULLABLE | Content diff from parent (for efficiency) |
| section | VARCHAR(255) | NULLABLE | Section/chapter identifier |
| position | INTEGER | NOT NULL, DEFAULT 0 | Position in project |
| contribution_type | ENUM | NOT NULL | Type (ADDITION, EDIT, DELETION, RESTRUCTURE) |
| is_ai_assisted | BOOLEAN | NOT NULL, DEFAULT false | Whether AI was used |
| ai_generation_id | UUID | FOREIGN KEY → ai_generations.id, NULLABLE | Link to AI generation |
| status | ENUM | NOT NULL, DEFAULT 'PENDING' | Approval status (PENDING, APPROVED, REJECTED, INTEGRATED) |
| approved_by | UUID | FOREIGN KEY → users.id, NULLABLE | Who approved |
| approved_at | TIMESTAMP | NULLABLE | Approval timestamp |
| rejection_reason | TEXT | NULLABLE | Reason for rejection |
| word_count | INTEGER | NOT NULL, DEFAULT 0 | Contribution word count |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Contribution timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |
| deleted_at | TIMESTAMP | NULLABLE | Soft delete timestamp |

**Indexes:**
- `idx_contributions_project` on `project_id, status, created_at DESC`
- `idx_contributions_user` on `user_id, created_at DESC`
- `idx_contributions_parent` on `parent_id`
- `idx_contributions_status` on `status, deleted_at`
- `idx_contributions_ai` on `is_ai_assisted, ai_generation_id`

---

### 7. AI Generations Table

**Purpose**: Track AI-generated content for analytics and billing

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique generation identifier |
| user_id | UUID | FOREIGN KEY → users.id, NOT NULL | User who requested |
| project_id | UUID | FOREIGN KEY → writing_projects.id, NULLABLE | Associated project |
| prompt | TEXT | NOT NULL | User prompt |
| context | JSONB | NULLABLE | Additional context provided |
| model | VARCHAR(100) | NOT NULL | AI model used (gpt-4, claude-3, etc.) |
| provider | VARCHAR(50) | NOT NULL | Provider (openai, anthropic, etc.) |
| generated_content | TEXT | NOT NULL | AI output |
| temperature | DECIMAL(3,2) | NULLABLE | Model temperature setting |
| max_tokens | INTEGER | NULLABLE | Max tokens requested |
| tokens_used | INTEGER | NOT NULL | Actual tokens consumed |
| cost_usd | DECIMAL(10,6) | NOT NULL | Generation cost |
| quality_rating | INTEGER | NULLABLE | User rating 1-5 |
| was_used | BOOLEAN | NOT NULL, DEFAULT false | Whether output was integrated |
| metadata | JSONB | NOT NULL, DEFAULT '{}' | Additional metadata |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Generation timestamp |

**Indexes:**
- `idx_ai_gen_user` on `user_id, created_at DESC`
- `idx_ai_gen_project` on `project_id`
- `idx_ai_gen_model` on `model, created_at DESC`
- `idx_ai_gen_cost` on `cost_usd`

---

### 8. Comments Table

**Purpose**: Feedback and discussion on contributions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique comment identifier |
| contribution_id | UUID | FOREIGN KEY → contributions.id, NULLABLE | Associated contribution |
| project_id | UUID | FOREIGN KEY → writing_projects.id, NOT NULL | Associated project |
| user_id | UUID | FOREIGN KEY → users.id, NOT NULL | Commenter |
| parent_id | UUID | FOREIGN KEY → comments.id, NULLABLE | Parent comment (for threading) |
| content | TEXT | NOT NULL | Comment content |
| content_type | ENUM | NOT NULL, DEFAULT 'TEXT' | Content type (TEXT, MARKDOWN) |
| is_resolved | BOOLEAN | NOT NULL, DEFAULT false | Resolution status |
| resolved_by | UUID | FOREIGN KEY → users.id, NULLABLE | Who resolved |
| resolved_at | TIMESTAMP | NULLABLE | Resolution timestamp |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Comment timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |
| deleted_at | TIMESTAMP | NULLABLE | Soft delete timestamp |

**Indexes:**
- `idx_comments_contribution` on `contribution_id, created_at`
- `idx_comments_project` on `project_id, created_at DESC`
- `idx_comments_user` on `user_id`
- `idx_comments_parent` on `parent_id`
- `idx_comments_resolved` on `is_resolved`

---

### 9. Comment Reactions Table

**Purpose**: Track reactions to comments

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique reaction identifier |
| comment_id | UUID | FOREIGN KEY → comments.id, NOT NULL | Associated comment |
| user_id | UUID | FOREIGN KEY → users.id, NOT NULL | User who reacted |
| reaction_type | VARCHAR(50) | NOT NULL | Reaction type (LIKE, HEART, THUMBS_UP, etc.) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Reaction timestamp |

**Indexes:**
- `idx_reactions_comment` on `comment_id`
- `idx_reactions_unique` on `comment_id, user_id, reaction_type` (UNIQUE)

---

### 10. Votes Table

**Purpose**: Track voting on project decisions and contributions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique vote identifier |
| project_id | UUID | FOREIGN KEY → writing_projects.id, NOT NULL | Associated project |
| contribution_id | UUID | FOREIGN KEY → contributions.id, NULLABLE | Associated contribution |
| poll_id | UUID | FOREIGN KEY → polls.id, NULLABLE | Associated poll |
| user_id | UUID | FOREIGN KEY → users.id, NOT NULL | Voter |
| vote_type | ENUM | NOT NULL | Vote type (APPROVE, REJECT, ABSTAIN) |
| weight | INTEGER | NOT NULL, DEFAULT 1 | Vote weight (based on role/tier) |
| comment | TEXT | NULLABLE | Optional comment with vote |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Vote timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_votes_project` on `project_id`
- `idx_votes_contribution` on `contribution_id`
- `idx_votes_poll` on `poll_id`
- `idx_votes_unique_contribution` on `contribution_id, user_id` (UNIQUE, WHERE contribution_id IS NOT NULL)
- `idx_votes_unique_poll` on `poll_id, user_id` (UNIQUE, WHERE poll_id IS NOT NULL)

---

### 11. Polls Table

**Purpose**: Create polls for project direction decisions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique poll identifier |
| project_id | UUID | FOREIGN KEY → writing_projects.id, NOT NULL | Associated project |
| created_by | UUID | FOREIGN KEY → users.id, NOT NULL | Poll creator |
| title | VARCHAR(500) | NOT NULL | Poll question |
| description | TEXT | NULLABLE | Detailed description |
| poll_type | ENUM | NOT NULL | Type (SINGLE_CHOICE, MULTIPLE_CHOICE, APPROVAL) |
| options | JSONB | NOT NULL | Poll options array |
| status | ENUM | NOT NULL, DEFAULT 'ACTIVE' | Status (DRAFT, ACTIVE, CLOSED) |
| closes_at | TIMESTAMP | NULLABLE | Poll closing time |
| results_visible | BOOLEAN | NOT NULL, DEFAULT true | Whether results are public |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_polls_project` on `project_id, status`
- `idx_polls_creator` on `created_by`
- `idx_polls_closes` on `closes_at`

---

### 12. Notifications Table

**Purpose**: User notification system

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique notification identifier |
| user_id | UUID | FOREIGN KEY → users.id, NOT NULL | Recipient |
| type | VARCHAR(100) | NOT NULL | Notification type |
| title | VARCHAR(500) | NOT NULL | Notification title |
| message | TEXT | NOT NULL | Notification message |
| link | VARCHAR(500) | NULLABLE | Related link |
| related_entity_type | VARCHAR(100) | NULLABLE | Entity type (project, contribution, etc.) |
| related_entity_id | UUID | NULLABLE | Entity ID |
| is_read | BOOLEAN | NOT NULL, DEFAULT false | Read status |
| read_at | TIMESTAMP | NULLABLE | Read timestamp |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Notification timestamp |

**Indexes:**
- `idx_notifications_user` on `user_id, is_read, created_at DESC`
- `idx_notifications_entity` on `related_entity_type, related_entity_id`

---

### 13. Activity Log Table

**Purpose**: Audit trail for all significant actions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique log entry identifier |
| user_id | UUID | FOREIGN KEY → users.id, NULLABLE | User who performed action |
| project_id | UUID | FOREIGN KEY → writing_projects.id, NULLABLE | Associated project |
| action_type | VARCHAR(100) | NOT NULL | Action type |
| entity_type | VARCHAR(100) | NOT NULL | Entity affected |
| entity_id | UUID | NOT NULL | Entity ID |
| details | JSONB | NOT NULL, DEFAULT '{}' | Action details |
| ip_address | VARCHAR(45) | NULLABLE | User IP address |
| user_agent | TEXT | NULLABLE | User agent string |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Action timestamp |

**Indexes:**
- `idx_activity_user` on `user_id, created_at DESC`
- `idx_activity_project` on `project_id, created_at DESC`
- `idx_activity_entity` on `entity_type, entity_id`
- `idx_activity_created` on `created_at DESC`

---

## Relationships Summary

### One-to-Many Relationships
- `users` → `writing_projects` (owner_id)
- `users` → `contributions` (user_id)
- `users` → `ai_generations` (user_id)
- `users` → `comments` (user_id)
- `users` → `votes` (user_id)
- `writing_projects` → `contributions` (project_id)
- `writing_projects` → `comments` (project_id)
- `contributions` → `comments` (contribution_id)
- `contributions` → `contributions` (parent_id - self-referencing)
- `comments` → `comments` (parent_id - self-referencing)

### Many-to-Many Relationships
- `users` ↔ `writing_projects` (via `collaborators`)

### Optional Relationships
- `contributions` → `ai_generations` (ai_generation_id)
- `ai_generations` → `writing_projects` (project_id)

---

## Data Integrity Rules

### Cascade Behaviors

**ON DELETE CASCADE:**
- `accounts.user_id` → `users.id`
- `sessions.user_id` → `users.id`
- `comment_reactions.comment_id` → `comments.id`

**ON DELETE SET NULL:**
- `collaborators.invited_by` → `users.id`
- `contributions.approved_by` → `users.id`
- `comments.resolved_by` → `users.id`
- `ai_generations.project_id` → `writing_projects.id`

**ON DELETE RESTRICT:**
- `writing_projects.owner_id` → `users.id` (must transfer ownership first)
- `contributions.project_id` → `writing_projects.id`
- `votes.contribution_id` → `contributions.id`

### Check Constraints
- `users.membership_tier` IN ('FREE', 'BASIC', 'PRO', 'PREMIUM')
- `writing_projects.status` IN ('DRAFT', 'ACTIVE', 'COMPLETED', 'PUBLISHED', 'ARCHIVED')
- `contributions.status` IN ('PENDING', 'APPROVED', 'REJECTED', 'INTEGRATED')
- `votes.weight` >= 0
- `ai_generations.quality_rating` BETWEEN 1 AND 5
- `ai_generations.tokens_used` >= 0
- `ai_generations.cost_usd` >= 0

---

## Performance Optimization

### Materialized Views (Consider for Analytics)

**project_statistics:**
```sql
CREATE MATERIALIZED VIEW project_statistics AS
SELECT
  p.id,
  p.title,
  COUNT(DISTINCT c.id) as total_contributions,
  COUNT(DISTINCT col.user_id) as total_collaborators,
  COUNT(DISTINCT com.id) as total_comments,
  SUM(c.word_count) as total_words_contributed,
  MAX(c.created_at) as last_contribution_at
FROM writing_projects p
LEFT JOIN contributions c ON p.id = c.project_id
LEFT JOIN collaborators col ON p.id = col.project_id
LEFT JOIN comments com ON p.id = com.project_id
GROUP BY p.id;
```

**user_contribution_stats:**
```sql
CREATE MATERIALIZED VIEW user_contribution_stats AS
SELECT
  u.id,
  u.name,
  COUNT(DISTINCT c.project_id) as projects_contributed,
  COUNT(c.id) as total_contributions,
  SUM(c.word_count) as total_words_written,
  COUNT(CASE WHEN c.status = 'APPROVED' THEN 1 END) as approved_contributions,
  COUNT(CASE WHEN c.is_ai_assisted THEN 1 END) as ai_assisted_contributions
FROM users u
LEFT JOIN contributions c ON u.id = c.user_id
GROUP BY u.id;
```

### Partitioning Strategy

**Activity Log Partitioning (by month):**
```sql
CREATE TABLE activity_log (
  -- columns
) PARTITION BY RANGE (created_at);

CREATE TABLE activity_log_2025_01 PARTITION OF activity_log
  FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
```

---

## Security Considerations

### Row-Level Security (RLS) Examples

**Projects - Users can only see projects they own or collaborate on:**
```sql
CREATE POLICY project_access ON writing_projects
  FOR SELECT
  USING (
    owner_id = current_user_id()
    OR id IN (
      SELECT project_id FROM collaborators
      WHERE user_id = current_user_id() AND status = 'ACCEPTED'
    )
    OR visibility = 'PUBLIC'
  );
```

**Contributions - Based on project access:**
```sql
CREATE POLICY contribution_access ON contributions
  FOR SELECT
  USING (
    project_id IN (
      SELECT id FROM writing_projects WHERE -- project access policy
    )
  );
```

### Sensitive Data Protection
- Password hashes use bcrypt with salt rounds >= 12
- OAuth tokens encrypted at rest
- IP addresses anonymized after 90 days (GDPR compliance)
- Soft deletes for user data (GDPR right to erasure)

---

## Backup and Recovery Strategy

### Backup Schedule
- **Full Backup**: Daily at 2 AM UTC
- **Incremental Backup**: Every 6 hours
- **Point-in-Time Recovery**: Enabled (7-day retention)
- **Replication**: Async replication to read replica

### Critical Data Priority
1. `users`, `writing_projects`, `contributions` (core data)
2. `comments`, `votes`, `collaborators` (collaboration data)
3. `ai_generations` (billing and analytics)
4. `activity_log` (audit trail)
5. `notifications` (transient, can be regenerated)

---

## Migration Strategy

### Phase 1: Core Tables
1. Users, Accounts, Sessions (authentication)
2. Writing Projects (core feature)
3. Collaborators (access control)

### Phase 2: Collaboration Features
4. Contributions (content versioning)
5. Comments, Comment Reactions (feedback)
6. Votes, Polls (decision-making)

### Phase 3: AI Integration
7. AI Generations (AI tracking)
8. Link contributions to AI generations

### Phase 4: Auxiliary Features
9. Notifications (user engagement)
10. Activity Log (audit trail)

---

## Monitoring and Maintenance

### Key Metrics to Track
- Query performance (slow query log threshold: 100ms)
- Table sizes and growth rate
- Index usage and efficiency
- Connection pool utilization
- Replication lag
- Backup success rate

### Regular Maintenance Tasks
- **Weekly**: VACUUM ANALYZE on large tables
- **Monthly**: Review and optimize slow queries
- **Quarterly**: Review index usage and add/remove as needed
- **Annually**: Archive old activity logs

---

## Next Steps

1. **Set up Supabase Project**
   - Create project on supabase.com
   - Configure connection string
   - Enable Row-Level Security

2. **Initialize Prisma**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

3. **Create Schema File**
   - Implement schema.prisma (see Part 3)

4. **Generate and Run Migrations**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Seed Initial Data**
   - Create seed script
   - Add test users and sample projects

6. **Configure Authentication**
   - Set up NextAuth.js with Prisma adapter
   - Configure OAuth providers

7. **Implement RLS Policies**
   - Add security policies in Supabase dashboard
   - Test access control

8. **Set Up Monitoring**
   - Configure Supabase alerts
   - Set up query performance monitoring

---

**Document Version**: 1.0
**Last Updated**: 2025-11-22
**Author**: Backend Developer Agent
