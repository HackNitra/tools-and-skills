---
name: debug-fast
description: Use when something is broken and time is short. A disciplined, fast debugging loop for hackathons: reproduce, isolate, hypothesize, fix, verify. Invoke with "/debug-fast" or paste an error.
---

# Debug Fast

Panic debugging (random changes) is the main time sink at a hackathon. Follow the loop.

1. **Reproduce.** Get the smallest command or click path that fails. If you cannot reproduce it, say so and ask for logs.
2. **Read the actual error.** Quote the first error line and the first stack frame in the user's code. Do not skim.
3. **Isolate.** Bisect: which side is wrong - input, code, config, network, or dependency? Use `git stash` or `git bisect` if it worked 30 minutes ago. Check env vars, ports, versions, and CORS before touching logic.
4. **Hypothesize.** State one hypothesis and the one-line experiment that would prove it wrong. Run it.
5. **Fix the cause**, not the symptom. Keep the diff small.
6. **Verify** by re-running the reproduction, then the surrounding flow.
7. **Time-box.** If 30 minutes pass with no progress, stop and propose a workaround (hardcode, swap library, use mock) and say what it costs.

## Common hackathon culprits

- Missing or wrong `.env` values; works locally, fails on deploy
- CORS, wrong base URL, `localhost` baked into the frontend
- Port already in use; stale dev server
- Node/Python version mismatch between teammates; lockfile conflicts after a merge
- Async race: missing `await`, state read before it is set
- API free-tier rate limit or expired key
- Database migration not run on the deployed instance

Never `git push --force` on a shared branch and never `rm -rf` to "fix" something without saying exactly what will be deleted.
