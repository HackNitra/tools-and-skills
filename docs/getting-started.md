# Getting started in 5 minutes

## 1. Install Claude Code

Follow the official guide: https://docs.claude.com/en/docs/claude-code/overview, then run `claude` inside your project folder.

## 2. Install this toolkit

Option A, as a plugin (recommended, includes skills, commands, agents and hooks):

```
/plugin marketplace add HackNitra/tools-and-skills
/plugin install hacknitra-toolkit@hacknitra
```

Option B, one skill only: copy its folder into `~/.claude/skills/`.

## 3. Your first hour

| Step | Run |
|---|---|
| Learn the habits | `/claude-code-primer` |
| Plan the project | `/hackathon-kickoff` |
| Scaffold a monorepo (optional) | `/repo-init` |
| Write a spec for a big feature | `/feature-spec` |

## 4. The rest of the weekend

`/standup` every few hours, `/cut-scope <hours>` at the halfway point, `/ship-it` early, `/prep-demo` three hours before the deadline, `/write-readme` and `/pitch-coach` at the end.

## Troubleshooting

- Skill not found: run `/plugin` and check it is enabled; restart the session.
- Hook blocks a commit: it found something that looks like a secret. Move it to `.env`.
- Still stuck: ask the organizers (`team-hacknitra`) in the HackNitra Discord, or open an issue in this repo.
