# Contributing

Anyone at a HackNitra event can add to this repo. Small, tested, useful beats big and clever.

## Add a skill

1. `mkdir skills/<name>` (lowercase, hyphens) and create `skills/<name>/SKILL.md`:

   ```markdown
   ---
   name: <name>              # must equal the folder name
   description: Use when ... # when to trigger it, in one or two sentences
   ---

   # Title
   Instructions Claude follows.
   ```
2. Put long reference material in `references/` and templates in `templates/` next to `SKILL.md`; link to them from the skill.
3. Run `node scripts/validate.mjs`.
4. Try it in Claude Code (`/plugin marketplace add .` then `/plugin install hacknitra-toolkit@hacknitra`, or copy the folder to `~/.claude/skills/`).
5. Open a pull request.

## Add a command or agent

- Commands: `commands/<name>.md` with a `description` in the frontmatter. `$ARGUMENTS` receives what the user types after the command.
- Agents: `agents/<name>.md` with `name`, `description` and the minimal `tools` list.

## Guidelines

- Skills should be **repo-agnostic**: discover the stack, never assume one.
- Be concrete: checklists, templates, exact output formats. Avoid generic advice.
- Never commit secrets, tokens, or personal data. Auth happens through OAuth on first use.
- Credit sources if you adapt someone else's work, and keep third-party skills as links, not copies.
- Commit messages in Slovak or English: `funkcionalita: ...`, `dokumentácia: ...`, `oprava: ...`.

Be kind. See the [Code of Conduct](CODE_OF_CONDUCT.md).
