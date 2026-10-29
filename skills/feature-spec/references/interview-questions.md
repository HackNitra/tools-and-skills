# Feature Spec Interview Questions

Deep-dive question bank organized by topic. Use these to probe further when initial answers are vague or incomplete.

## Problem & Impact

- How often does this problem occur? (daily, weekly, rarely)
- What's the cost when this problem isn't solved? (time, money, frustration)
- Who else is affected besides the primary user?
- What workarounds exist today? Why are they insufficient?
- How will we measure success? What metrics should change?

## User Journeys

### Discovery
- Is this a feature users will seek out, or should it be surfaced proactively?
- What's the learning curve? Do users need onboarding?

### Empty & Full States
- What does a new user see? (empty state)
- What happens at scale? (100x current usage)
- Are there limits? What happens when limits are hit?

### Concurrent & Conflicting Actions
- What if two users modify the same data simultaneously?
- What if a dependency is deleted mid-operation?
- What if the user loses connection mid-flow?

### Cancellation & Recovery
- Can the user cancel at any point? What's preserved?
- Is there undo? For how long?
- Can a cancelled operation be resumed?

## Permissions & Access

- Is this per-user, per-team, or global?
- What do unauthorized users see? (hidden, disabled, error)
- Can permissions be delegated or shared?
- Are there audit/compliance requirements?

## Data & State

### Lifecycle
- What triggers creation? Can it be created implicitly?
- What triggers deletion? Soft delete or hard delete?
- What cascades on deletion?
- Is there archival? Can archived items be restored?

### Relationships
- Is the relationship required or optional?
- What happens if the related entity is deleted?
- Can the relationship be changed after creation?

### Validation
- What makes an entity valid vs invalid?
- When is validation performed? (creation, update, runtime)
- Can invalid entities exist temporarily?

## Edge Cases Checklist

- [ ] User has no data yet (empty state)
- [ ] User has maximum allowed data (limits)
- [ ] Operation fails midway (partial state)
- [ ] Required dependency is missing
- [ ] Required dependency is deleted during operation
- [ ] Network failure during operation
- [ ] User lacks permissions
- [ ] Concurrent modification by another user
- [ ] Input contains special characters / unicode
- [ ] Input is at boundary values (0, max, negative)

## Contradiction Detection

Use these prompts when you notice inconsistencies:

- "Earlier you said X, but now you're describing Y. Which should it be?"
- "If X is true, how does that work with Y?"
- "You mentioned [role] can do X, but also said only [other role] can do Y. What about overlap?"
- "This flow assumes Z exists, but we haven't defined how Z gets created."

## Final Verification (Resolution Gate)

Before generating the spec, ALL questions must be resolved. No spec is written with open items.

### Verification Questions

- "Is there any user role we haven't considered?"
- "What happens in 6 months when usage grows 10x?"
- "How could a malicious user abuse this?"
- "What if we ship this partially and stop—what's the cleanup story?"
- "What's the migration path for existing data/users?"

### Decision Summary

After all questions are answered, present a numbered list of every decision made during the interview. Ask the user to confirm the list is complete and correct before writing.

If the user raises new concerns or changes a previous answer during confirmation, loop back and resolve before proceeding. The spec is not written until every item on the decision summary is confirmed.
