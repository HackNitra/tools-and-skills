---
name: demo-day-prep
description: Use in the last 2-3 hours of a hackathon to freeze features, verify the project works from a clean state, and package the submission. Invoke with "/demo-day-prep" or "we submit soon".
---

# Demo Day Prep

## 1. Feature freeze (announce it)

No new features. Only: bugs that break the demo flow, README, and polish. Tell the team explicitly.

## 2. Clean-state test

Verify on a machine or fresh clone that is not the developer's laptop:

- [ ] `git clone` then the README's setup steps work, copy-paste, no tribal knowledge
- [ ] `.env.example` lists every variable; no secret is committed (`git log -p | grep -i -E "key|secret|token"`)
- [ ] The deployed URL loads on a phone and on the venue wifi
- [ ] The demo flow runs start to finish three times in a row
- [ ] Seed data is present; the demo account works
- [ ] Third-party rate limits and free-tier quotas will survive judges clicking around

## 3. Safety net

- [ ] 2-minute screen recording of the full flow, saved locally and uploaded
- [ ] Screenshots of every key screen in `docs/`
- [ ] Offline fallback for the demo if wifi dies (local run, or the recording)
- [ ] Laptop charged, charger in the bag, notifications off, browser tabs prepared, font size large

## 4. Submission package

- [ ] Public repo with a good README (use `judge-readme`)
- [ ] Demo video link, live URL, team names, track and prizes selected
- [ ] Submitted early, then re-checked that the link works while logged out

Report as a checklist with pass/fail per item and a ranked list of what to fix first.
