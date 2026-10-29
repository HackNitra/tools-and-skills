---
name: feature-spec
description: This skill should be used when creating a comprehensive feature specification document for significant features. Invoke it with "/feature-spec" or "create a feature spec for...". The skill guides users through an interview-driven process, starting with the problem being solved, through business workflows and user journeys, to technical architecture. Works in any repository by discovering the project's stack, conventions and spec location rather than assuming them. NOT for small UI changes or trivial features.
---

# Feature Specification Creator

This skill guides creation of opinionated `FEATURE_SPEC.md` documents through structured interviews.

It is repo-agnostic. Nothing here assumes a particular stack, role model or directory layout: everything project-specific (terminology, roles, data conventions, where specs live) is discovered from the repository you are in, or asked of the user when there is no codebase to read.

## When to Use

Use this skill for **significant NEW features** that need formal specification:
- New major functionality (a new product area, a third-party integration, a new workflow)
- Cross-cutting concerns (authentication, permissions, billing)
- Features with complex user flows or state machines
- Architectural decisions affecting multiple packages

**Do NOT use for:**
- Small UI changes (moving a button, styling tweaks)
- Single-component features with obvious implementation
- Bug fixes or refactoring
- **Rewriting finalized specs** - A finalized `FEATURE_SPEC.md` is human-owned; see "Updating Existing Specs"

## Important Constraints

1. **New specs by default** - This skill creates new feature specs. A finalized `FEATURE_SPEC.md` is human-owned: never overwrite or edit one as a side effect of this skill. See "Updating Existing Specs".

2. **Draft output** - Output is written to `FEATURE_SPEC.draft.md` (not `FEATURE_SPEC.md`). A human must review and rename the file to finalize it. This ensures human oversight of specifications.

3. **Always ask for feature name first** - Before any context gathering, ask the user to name the feature. This establishes the scope and output location.

## Design Philosophy

Feature specs are not just documentation—they're a **thinking tool**. Writing forces you to confront gaps and flaws in your design before code exists.

### Core Principles

1. **Declare the desired state** - A spec is a declaration, not a discussion. Every section states what IS, never what MIGHT BE. There are no TBDs, no open questions, no "to be decided later." If a decision cannot be made, the spec is not ready to be written.

2. **Bigger picture first** - Before detailing the feature, understand how it fits among existing features. A feature that doesn't integrate well creates a fragmented product.

3. **One clear path** - If your spec describes multiple ways to do the same thing, the design isn't done. Good design is decisive—there should be one obvious way for users to accomplish their goal.

4. **Interaction over implementation** - Focus first on how humans will interact with this feature. What will they see? What will they feel? Implementation details come last.

5. **Optimize for emotion** - Whenever humans interact with software, they feel something. Design until it feels right, not just until it works.

6. **Writing reveals flaws** - The act of writing a spec surfaces problems. If something is hard to explain clearly, it's probably hard to use.

## Interview Process

The skill uses a **progressive disclosure interview** to extract comprehensive requirements.

### Phase 0: Feature Name (REQUIRED)

**Always start by asking for the feature name.** This establishes scope and output location.

Then work out where the spec will live (see "File Locations"). If a finalized spec already exists there, stop and follow "Updating Existing Specs" instead of overwriting it.

### Phase 1: User Description (REQUIRED)

**Let the user describe the feature in their own words first.** Don't interrupt with questions - let them brain dump everything they know about:
- The problem they're solving
- Who it's for
- How it should work
- Any constraints or requirements they have in mind

This respects the user's mental model and often surfaces information you wouldn't have thought to ask about.

### Phase 2: Bigger Picture Fit (REQUIRED)

Before diving into details, establish how this feature fits into the product:

1. **Adjacent features** - What existing features does this relate to? How do they work together?
2. **Entry points** - Where will users discover this? Does it make sense there?
3. **Consistency** - Does this follow patterns users already know from other features?
4. **Conflicts** - Does this create confusion with existing functionality?

If the feature doesn't fit naturally, revisit the design before proceeding.

### Phase 3: Context Gathering

While the user is describing (or after), gather codebase context. Derive everything from the repo you are in; do not carry over assumptions from other projects.

1. **Read the project's instructions** - `AGENTS.md`, `CLAUDE.md`, other agent rule files (e.g. `.cursor/rules`, `GEMINI.md`), `README`, contributing docs, architecture docs. Note any rules about specs or docs (who may edit them, where they live).
2. **Find existing specs** - Search for `FEATURE_SPEC*.md`, `specs/`, `docs/specs/`, `rfcs/`, `adr/` and similar. Their location, naming and style are the convention to follow.
3. **Search for related features** - Find existing similar functionality
4. **Identify patterns** - Note the stack, existing data models, API conventions, UI patterns
5. **Check for constraints** - Understand architectural boundaries (packages, services, ownership)
6. **Find terminology guides** - Look for existing style guides or terminology docs

**No codebase?** If this is a greenfield project or you are not inside a repository, skip the search and ask the user for the equivalent facts instead: stack, existing product surface, roles, and hard constraints.

### Phase 4: Interaction Design

Focus on the human-computer interaction:

1. **Visual appearance** - What will users see? Sketch the key screens/states mentally.
2. **Interaction flow** - How does it feel to use? Is it satisfying or frustrating?
3. **Feedback loops** - Does the system respond appropriately to user actions?
4. **Error experience** - When things go wrong, how does it feel?

**Iterate until it feels right.** If you can't imagine using the feature and feeling good, the design needs work.

### Phase 5: Resolution Gate (MANDATORY)

After the user has described the feature, identify ALL gaps in the requirements. Every gap must be resolved before the spec can be written. Ask questions about:

1. **Missing information** - Things they didn't mention that are needed for the spec
2. **Ambiguities** - Places where the description could be interpreted multiple ways
3. **Edge cases** - Scenarios they may not have considered
4. **Contradictions** - Inconsistencies in their description

**Do NOT ask about things they already covered clearly.** Group related questions together to minimize back-and-forth.

Areas to check for gaps:
- Problem definition (who, what, why)
- User flows (entry points, happy path, errors)
- Permissions (who can do what)
- Data model (entities, relationships, states)
- Edge cases (deletions, conflicts, limits)

**Hard rule: Do NOT proceed to spec generation while any question remains unanswered.** If the user cannot answer a question right now, tell them the spec will wait. Offer to summarize what has been decided so far, but do not write a draft with placeholders or open items.

## Interview Guidelines

### Let Users Talk First

Don't front-load questions. Let the user describe the feature, then ask only about gaps.

**Bad:** Immediately asking 10 questions before user explains anything
**Good:** "Tell me about the feature" → user explains → ask 2-3 targeted follow-ups

### Asking Questions

Ask follow-up questions **sparingly** - only for genuine gaps. If your environment has a structured question tool (e.g. `AskUserQuestion`), use it; otherwise ask in plain text:
- Missing information the user didn't cover
- Ambiguities that could go multiple ways
- Edge cases they may not have considered

**Good question patterns:**
- "What happens when X but Y?" (edge cases)
- "You said X, but earlier you mentioned Y - which is correct?" (contradictions)
- "Who is responsible for X?" (ownership/permissions)
- "What's the default when X is not specified?" (defaults)

**Group related questions** to minimize back-and-forth.

### Detecting Issues

Watch for and call out:
- **Contradictions** - "Earlier you said A, but now you're saying B"
- **Missing flows** - "What happens when the user cancels mid-flow?"
- **Undefined permissions** - "Can members do this, or only admins?"
- **Ambiguous terminology** - "When you say 'account', do you mean the user or the organization?"

### Detecting Design Flaws

Flag these as problems that must be resolved before the spec can be written:

- **Multiple paths** - "You described two ways to do X. Which is the ONE way users should do it?" (This is a design flaw, not an open question)
- **Unclear fit** - "How does this relate to [existing feature]? They seem to overlap."
- **Forced feeling** - If describing the interaction feels awkward, the design probably is too

### Completeness Checklist

Before writing the spec, verify coverage of:

- [ ] **Zero open questions** - Every question raised during the interview has a definitive answer
- [ ] **No deferred decisions** - No section contains TBD, "to be decided," or placeholder language
- [ ] All user roles can perform their required actions
- [ ] Error states have defined handling
- [ ] State transitions are complete (no dangling states)
- [ ] Terminology is consistent throughout
- [ ] Permissions are explicit, not implicit
- [ ] Defaults are specified for optional fields
- [ ] Deletion/cleanup behavior is defined
- [ ] **One clear path** - There's only ONE obvious way to accomplish each goal (no "you can also...")
- [ ] **Feels right** - You can imagine using this feature and feeling satisfied

### Cross-Cutting Concerns (Optional Reference)

If relevant to the feature, consult `references/cross-cutting-concerns.md` for common cross-cutting concerns like roles, scoping, state machines, deletion behavior, real-time updates, and billing. Not every feature needs all of these—use judgment.

That checklist is deliberately generic: for each concern that applies, find out how *this* project already handles it and write the spec to match. If the repo ships its own patterns document (for example a project-level `feature-spec` skill with its own `references/` folder under `.agents/skills/` or `.claude/skills/`, or architecture docs), it takes precedence over the generic checklist.

## Output Structure

Generate the feature spec in this order of abstraction:

### 1. FEATURE_SPEC.draft.md

The primary artifact. **Always use `.draft.md` suffix** - a human must review and rename to `FEATURE_SPEC.md` to finalize.

Structure:

```markdown
# [Feature Name] Specification

> Purpose: [One sentence describing what this document covers]

## Overview

[2-3 paragraphs explaining the feature at a high level]

## Product Integration

[How this feature fits with existing features. What's adjacent? What patterns does it follow?]

## Interaction Design

[Key screens/states. What users see. What the experience feels like.]

## Terminology

| Term | User-Facing | DB/Code | Definition |
|------|-------------|---------|------------|
| ... | ... | ... | ... |

## User Roles & Permissions

[Who can do what]

## User Flows

### Flow 1: [Name]

**Entry Point**: [Where/how user starts]

**Preconditions**: [What must be true before starting]

**Steps**:
1. [Step]
2. [Step]
...

**Result**: [What state the system is in after]

**Error Handling**: [What can go wrong and how it's handled]

## Data Model

[Entities, relationships, constraints]

## State Diagram

[If applicable - state machine for the feature]

## API Surface

[Endpoints, shapes]

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| ... | ... |

## Invariants

[Non-negotiable rules that must always hold]

## Authors

[Who contributed to this spec]
```

### 2. Test Scenarios (Optional)

If requested, generate `FEATURE_SPEC.test-scenarios.md`:

```markdown
# [Feature] Test Scenarios

## Happy Path Tests
- [ ] [Scenario description]

## Edge Cases
- [ ] [Scenario description]

## Error Handling
- [ ] [Scenario description]

## Permission Tests
- [ ] [Scenario description]
```

### 3. Technical Deep-Dives (Optional)

For complex subsystems, generate separate `[topic].md` files next to the draft:
- State machine specifications
- API contract details
- Migration strategies

## Example Interview Flow

```
Agent: What feature would you like to spec out?

User: Team invite links - shareable URLs to join a team.

Agent: Got it - "Team Invite Links". Tell me more about what you have in mind.
What problem does this solve? How should it work?

User: Right now we only have email invitations. But sometimes you want to
share a link in Slack or post it somewhere and let anyone join. It should
be reusable, expire after some time, and only owners/admins can create them.
People who click should join as members by default.

Agent: [Gathers codebase context about existing invitation system]

Agent: I see the existing email invitation system. A few gaps I need to fill:

[Asks follow-up questions - only for things not covered]
- Should links support domain restrictions (e.g., only @company.com)?
- What happens when an existing member clicks the link?
- Can admins revoke a link early, or just let it expire?

User: No domain restrictions for now. Existing members see "you're already
a member." Admins can revoke links at any time.

Agent: One potential issue: you said people join as members by default.
Should admins be able to create links that grant admin role instead?

User: Yes, role should be set when creating the link.

Agent: Here's a summary of all decisions before I write the spec:

1. Invite links are reusable, shareable URLs created by owners/admins
2. Links expire after a configurable time; admins can revoke early
3. Role (member or admin) is set at link creation time
4. No domain restrictions
5. Existing members see "you're already a member" - no error
6. Links complement (don't replace) email invitations

Does this capture everything? Any corrections?

User: That's correct, go ahead.

Agent: [Generates FEATURE_SPEC.draft.md - no open questions, all decisions final]
```

## Updating Existing Specs

**A finalized `FEATURE_SPEC.md` is human-owned.** The draft/rename step exists to guarantee human oversight of specifications, and silently editing a finalized spec would bypass it.

If a user wants to update an existing spec:
1. Check the repo's instructions (`AGENTS.md`, `CLAUDE.md`, contributing docs) for rules about editing specs. If they forbid AI edits, say so and do not edit the file.
2. Read the existing spec and run the same interview for the change, including the Resolution Gate.
3. Deliver the change as a proposal: either suggested edits in conversation, or a `FEATURE_SPEC.draft.md` written next to the existing spec for the human to review and merge.
4. Edit the finalized file directly only when the user explicitly asks for that and the repo's rules allow it.

## Project Consistency

Before writing, check for project-specific conventions:

- **Terminology guides** - Many projects have standard terms (e.g., "user" vs "member" vs "account")
- **Existing specs** - Match the style of other feature specs in the codebase
- **UX writing guidelines** - If available, use for user-facing terminology

Inconsistent terminology across specs creates confusion. When in doubt, grep the codebase for existing usage.

## File Locations

Choose the location in this order, and tell the user the path before writing:

1. **Where the user says** - an explicit path always wins.
2. **The repo's existing convention** - if specs already exist (found in Phase 3), put the new one alongside them using the same layout and naming.
3. **Adjacent to the feature's code** - if the feature lives in one clearly bounded package or directory and the repo keeps docs next to code.
4. **Fallback** - `specs/[feature-name]/FEATURE_SPEC.draft.md` at the repository root, or in the current directory when not inside a repository.

Use a kebab-case `[feature-name]`. Whatever the directory, the file is always named `FEATURE_SPEC.draft.md`; after human review it is renamed to `FEATURE_SPEC.md` to finalize.

## References

**Bundled with this skill:**
- `references/cross-cutting-concerns.md` - Generic checklist of cross-cutting concerns (roles, scoping, state machines, etc.)
- `references/interview-questions.md` - Deep-dive question bank for interviews
- `templates/FEATURE_SPEC.template.md` - Starter template for output

**In the project (discover, do not assume):**
- Existing feature specs - commonly a `specs/` or `docs/` directory, or `FEATURE_SPEC.md` files adjacent to feature code
- Project instructions and terminology/style guides
