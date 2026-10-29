# [Feature Name] Specification

> Purpose: This document declares the desired state for [feature name]. Every decision is final. There are no open questions or deferred items — if something is written here, it is decided.

## Overview

[2-3 paragraphs explaining:
- What this feature does at a high level
- Why it exists (the problem it solves)
- Key concepts users need to understand]

## Product Integration

[How this feature fits with existing features:
- Adjacent features and how they work together
- Entry points: where users discover it
- Existing patterns it follows]

## Interaction Design

[Key screens/states, what users see at each one, and what the experience feels like, including the error experience]

## Terminology

| Term | User-Facing | DB/Code | Definition |
|------|-------------|---------|------------|
| **[Term 1]** | [UI label] | `table_name` / `ClassName` | [Clear definition] |
| **[Term 2]** | [UI label] | `table_name` / `ClassName` | [Clear definition] |

## User Roles & Permissions

### [Role 1]

- [Can/Cannot] [action]
- [Can/Cannot] [action]

### [Role 2]

- [Can/Cannot] [action]
- [Can/Cannot] [action]

### Key Principle

> [One sentence summarizing the permission model]

## User Flows

### Flow 1: [Primary Happy Path]

**Entry Point**: [Where/how user accesses this]

**Preconditions**: [What must be true before starting]

**Steps**:

1. User [action]
2. System [response]
3. User [action]
4. System [response]

**Result**: [What state the system is in after completion]

**Error Handling**: [What can go wrong and how it's handled]

### Flow 2: [Secondary Flow or Edge Case]

**Entry Point**: [Where/how user accesses this]

**Preconditions**: [What must be true]

**Steps**:

1. [Step]
2. [Step]

**Result**: [End state]

## Data Model

### Relationships

```
[entity_a]
    │
    ├──────────────────────────┐
    ↓                          ↓
[entity_b]                 [entity_c]
(description)              (description)
    │                          │
    └──────────────────────────┘
                  ↓
           [entity_d]
           (links b to c)
```

### Key Constraints

- **[Constraint 1]**: [Description]
- **[Constraint 2]**: [Description]

### Database Tables

#### `table_name`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `foreign_id` | UUID | FK to other_table |
| `status` | TEXT | [list of valid values] |
| `metadata` | JSONB | [what it contains] |

## State Diagram

[If the feature has a state machine]

```
[initial] ──create──> [state_a] ──action──> [state_b]
                          │                     │
                          │                     │
                     ──cancel──>           ──complete──>
                          │                     │
                          ↓                     ↓
                      [cancelled]           [completed]
```

### State Definitions

| State | Description | Valid Transitions |
|-------|-------------|-------------------|
| `state_a` | [description] | `state_b`, `cancelled` |
| `state_b` | [description] | `completed` |

## API Surface

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v1/resource` | POST | Create new resource |
| `/v1/resource/:id` | GET | Get resource details |
| `/v1/resource/:id` | PATCH | Update resource |
| `/v1/resource/:id` | DELETE | Delete resource |

### Request/Response Shapes

```typescript
// Create request
interface CreateResourceRequest {
  name: string;
  // ...
}

// Response
interface ResourceResponse {
  id: string;
  name: string;
  // ...
}
```

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| [Decision 1] | [Why we chose this approach] |
| [Decision 2] | [Why we chose this approach] |

## Invariants

### Core Principles (Non-Negotiable)

> [The most important rule that must always hold]

### Rules

1. **[Rule 1]**: [Description]
2. **[Rule 2]**: [Description]
3. **[Rule 3]**: [Description]

## Authors

- **[Name]** - [Role/contribution]
