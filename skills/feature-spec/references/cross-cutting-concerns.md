# Cross-Cutting Concerns Checklist

Common concerns that feature specs should address. Use this checklist to ensure completeness.

This checklist is generic. For each concern that applies, first **discover how the current project already handles it** (search the code, read the docs, ask the user), then write the spec to match. Record what you find in the spec using the project's own names for roles, tables, events and constants. Skip any section that does not apply to the project or the feature.

## 1. Roles & Permissions

**Discover:** What roles or permission levels exist? Where is authorization enforced (middleware, policies, database rules, frontend guards)?

**Questions to answer:**
- [ ] Which roles can perform each action?
- [ ] Are there sub-permissions within a role?
- [ ] What do unauthorized users see? (hidden, disabled, error)

## 2. Scoping & Ownership

**Discover:** What do resources belong to (user, team/workspace, organization, global)? Which ownership columns or keys do existing entities carry?

**Questions to answer:**
- [ ] Who owns this resource, and at which level is it shared?
- [ ] Can privileged users see other users' data?
- [ ] Does it need more than one ownership key (e.g. both a user and a workspace)?

## 3. State Machines

**Discover:** How do existing entities model status (enums, constants, tables)? Is there a convention for active vs terminal states?

**Questions to answer:**
- [ ] What are all valid states?
- [ ] What transitions are allowed from each state?
- [ ] Are there active vs terminal groupings?
- [ ] Do transitions trigger side effects (notifications, events)?
- [ ] Is there a history/audit trail of transitions?

## 4. Deletion

**Discover:** Does the project soft delete, hard delete, or archive? Are there retention or data-protection requirements?

**Questions to answer:**
- [ ] Soft or hard delete?
- [ ] What cascades on deletion?
- [ ] Is there a recovery period?
- [ ] Do deleted items appear in any queries?

## 5. Audit, Logging & Analytics

**Discover:** What logging and tracing conventions exist? Are there audit or event tables? Which product analytics tool is used, and how are events named?

**Questions to answer:**
- [ ] What operations need an audit trail?
- [ ] Should changes be recorded as events?
- [ ] Do users need to see audit history in the UI?
- [ ] What analytics events are needed?

## 6. Real-time Updates

**Discover:** Does the project push live updates (websockets, server-sent events, polling, subscriptions)? How are channels or rooms scoped?

**Questions to answer:**
- [ ] Does this need real-time updates?
- [ ] Who receives updates? (one user, a group, everyone)
- [ ] What event names and payloads?
- [ ] Does the client need to subscribe to anything new?

## 7. Billing & Limits

**Discover:** Is there a billing provider, pricing tiers, quotas or rate limits? Where are limits defined and enforced?

**Questions to answer:**
- [ ] Does this count toward usage limits?
- [ ] Is there a soft limit (warning) or hard limit (blocking)?
- [ ] Which tiers can access this feature?
- [ ] How are limits exposed (API, UI)?

## 8. Multi-tenancy

**Discover:** Is the product multi-tenant? Where is tenant isolation enforced (application layer, row-level security, separate databases)? Can a user belong to several tenants?

**Questions to answer:**
- [ ] Is this tenant-isolated?
- [ ] Any shared resources across tenants?
- [ ] Does it involve a layer above the tenant (organization, account)?

## 9. Authentication, Credentials & Third-Party Integrations

**Discover:** How do users authenticate? How are third-party credentials and tokens stored, refreshed and scoped? Is there an existing integration abstraction to build on?

**Questions to answer:**
- [ ] New auth provider, or user-supplied credentials?
- [ ] Where are secrets stored, and who can read them?
- [ ] Do users need multiple connections to the same provider?
- [ ] How are tokens refreshed and revoked?
- [ ] What happens to the feature when a credential expires?

## 10. Async Work & Queues

**Discover:** How does the project run background work (job queue, scheduler, workers, cron)? How is progress tracked and surfaced?

**Questions to answer:**
- [ ] Scheduled, triggered, or on-demand?
- [ ] What status transitions occur?
- [ ] Retry logic? How many times?
- [ ] Capacity limits to enforce?
- [ ] Completion triggers (notifications, webhooks)?

## 11. Rollout & Migration

**Discover:** Does the project use feature flags, staged rollouts or versioned APIs? How are schema and data migrations run?

**Questions to answer:**
- [ ] Is this released behind a flag, and to whom first?
- [ ] What happens to existing data and users?
- [ ] Is the change backwards compatible for existing API clients?

---

## Conventions to Capture

Before writing the Data Model and API Surface sections, look at two or three existing entities and endpoints and note the conventions the new feature must follow:

- **Schema**: primary key type, ownership columns, timestamp columns, deletion marker, naming style
- **API**: URL and versioning style, auth requirements per route, error shape, pagination
- **Client**: where data fetching, state and permission checks live

State these in the spec in the project's own terms rather than inventing new ones.
