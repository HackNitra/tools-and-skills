---
name: claude-code-primer
description: Use when the user is new to Claude Code or asks how to work effectively with it during a hackathon. Teaches the habits that matter: CLAUDE.md, plan mode, small tasks, verification, skills, subagents, and team conventions. Invoke with "/claude-code-primer".
---

# Claude Code Primer for Hackathons

Explain briefly and practically, then offer to set up the repo for them.

## The six habits

1. **Write a `CLAUDE.md`.** Stack, commands (run, test, lint), conventions, "do not touch" areas. Claude reads it every session. Start from `templates/CLAUDE.md` in this repo.
2. **Plan before code.** Use plan mode (Shift+Tab) for anything over ~30 minutes of work. Review the plan; cheap to fix then, expensive later.
3. **Small, verifiable tasks.** "Add a POST /teams endpoint and a test" beats "build the backend". Ask Claude to run the tests or the app itself.
4. **Give it the way to check.** A test command, a curl, a screenshot via the browser tool. Claude without verification guesses.
5. **Commit often.** Small commits are undo points. Branch per teammate to avoid merge fights.
6. **Keep context clean.** `/clear` between unrelated tasks, `/compact` on long ones, subagents for research so the main session stays focused.

## Useful built-ins

`/init` (generate CLAUDE.md), `/clear`, `/compact`, `/plugin`, `/mcp`, `/agents`, `/code-review`, `/security-review`, `@file` to attach files, `!cmd` to run shell commands.

## Team conventions to agree in the first hour

- One person owns `CLAUDE.md` changes; others propose via PR
- Each teammate works in their own branch or git worktree
- Secrets only in `.env`, never in prompts or commits
- Review AI-written code before merging: you are responsible for what you demo

## Pitfalls

Accepting huge diffs unread, letting the agent add dependencies freely, skipping tests on the demo path, and pasting API keys into chat.
