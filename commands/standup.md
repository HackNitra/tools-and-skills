---
description: Quick team status from git history and PLAN.md, with next 3 actions
---

Create a 5-line standup for the hackathon team.

1. Read `PLAN.md` if it exists.
2. Run `git log --since="3 hours ago" --pretty=format:"%an: %s"` and `git status -sb`.
3. Report: **Done**, **In progress**, **Blocked**, **Time left vs plan**, and the **next 3 actions** ranked by impact on the demo.
4. If we are behind plan, say what to cut (see the `scope-mvp` skill).

Keep it under 15 lines.
