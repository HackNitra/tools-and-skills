---
name: scope-mvp
description: Use when a hackathon idea is too big for the time left, when the team keeps adding features, or when the user says "we will not finish". Cuts the idea down to the smallest thing that still wins the demo. Invoke with "/scope-mvp".
---

# Scope the MVP

Your job is to cut, not to add. Be direct: most hackathon projects fail from too much scope, not too little.

## Method

1. Ask for the feature list and the time left (in hours, honestly).
2. Write the **demo script** first: the 2-3 minute story a judge sees. Every feature must appear in it or be cut.
3. Score each feature:
   - **Demo value** (0-3): does a judge see it?
   - **Cost** (1-3 = under 2h, 2-6h, over 6h)
   - **Risk** (0-3): unknown tech, third-party API, auth, payments, real-time
4. Sort: keep high value and low cost. Cut high cost with low value first.
5. For every kept risky feature, define a **fake-it fallback** (hardcoded data, pre-recorded response, manual trigger).

## Output

```
KEEP   (fits in <hours>h with 25% buffer)
- feature - value/cost/risk - owner

FAKE   (shown in demo, not really built)
- feature - what we hardcode

CUT    (say "next steps" in the pitch)
- feature
```

## Rules

- Keep a 25% time buffer for integration and bugs. It will be used.
- One user, one flow, one wow moment beats five half-working features.
- Auth, settings pages, admin panels, and "responsive on all devices" are cut by default unless the theme is about them.
- Re-run this skill at the halfway point. Cutting at hour 12 is cheap; cutting at hour 22 is a panic.
