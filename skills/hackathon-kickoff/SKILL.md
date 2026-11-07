---
name: hackathon-kickoff
description: Use at the very start of a hackathon, when the user has a team and a theme but no clear plan. Turns a rough idea into a one-sentence pitch, a scoped MVP, a task split per teammate and an hour-by-hour plan. Invoke with "/hackathon-kickoff" or "we have 24 hours, help us plan".
---

# Hackathon Kickoff

Goal: in 15 minutes, leave with a plan the whole team can start executing. Do not write code in this skill.

## Ask first (one message, all at once)

1. Hackathon length and the hard deadline for submission and demo.
2. Team size and each person's strongest skill.
3. Theme, sponsor prizes or judging criteria, if any.
4. The idea, even if vague. If there is none, offer three ideas that fit the theme and the team's skills.
5. Tech the team already knows. Default to that, not to what is trendy.

## Produce

1. **One-sentence pitch**: `For <who> who <problem>, <name> is a <what> that <benefit>.` If it needs two sentences, the idea is not clear yet.
2. **The demo moment**: the single 30-second thing a judge will see work. Everything is built backwards from it.
3. **MVP scope**: a must-have list (max 3 items) and a cut list (everything else). Use the `scope-mvp` skill if the idea is large.
4. **Task split**: one owner per task, tasks sized at 1-3 hours, with the dependencies between them marked. Put the riskiest or least-known task first.
5. **Timeline** as a table, scaled to the real hackathon length:

| Phase | Share of time | Output |
|---|---|---|
| Plan and set up | 10% | repo, stack, env, deploy skeleton live |
| Core build | 45% | the demo moment works end to end, ugly is fine |
| Integrate and cut | 15% | merge, fix, cut scope that is not working |
| Polish and README | 15% | UI pass, README, screenshots |
| Pitch and demo prep | 15% | rehearsed demo, backup recording |

6. **Risks**: the top three things that could kill the demo, each with a fallback.

## Rules

- Deploy a hello-world in the first hour. A project that only runs on one laptop is a risk.
- Prefer boring, known tech. A new framework costs hours you do not have.
- Mock what is not the point. If the demo does not need real auth, skip real auth.
- Write the plan to `PLAN.md` in the repo so every teammate and every Claude session reads the same thing.
