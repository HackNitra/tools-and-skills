# Skills catalog

Our own skills live here. Third-party collections are linked to their maintainers; their code and skill files are not copied into this repository.

## Our own skills

| Skill | Use it for |
|---|---|
| [repo-init](repo-init/SKILL.md) | Scaffold our TypeScript monorepo: Next.js, Tailwind, Turborepo, pnpm, Kysely/Postgres, and CI. |
| [feature-spec](feature-spec/SKILL.md) | Interview for a significant feature and write a `FEATURE_SPEC.draft.md` for human review. |
| [hackathon-kickoff](hackathon-kickoff/SKILL.md) | Turn a team and a theme into a pitch, MVP scope, task split and timeline. |
| [scope-mvp](scope-mvp/SKILL.md) | Cut an oversized idea down to what wins the demo. |
| [claude-code-primer](claude-code-primer/SKILL.md) | Habits for working effectively with Claude Code in a team. |
| [debug-fast](debug-fast/SKILL.md) | A time-boxed debugging loop with common hackathon culprits. |
| [ship-it](ship-it/SKILL.md) | Pick a host, wire env vars and get a public URL. |
| [demo-day-prep](demo-day-prep/SKILL.md) | Feature freeze, clean-state test, backups and submission package. |
| [judge-readme](judge-readme/SKILL.md) | A README judges understand in 60 seconds. |
| [pitch-coach](pitch-coach/SKILL.md) | 3-minute pitch, demo run-sheet and judge Q&A. |

For Claude Code, copy the complete skill folder into `~/.claude/skills/`, including its templates, scripts, and references.

## Third-party collections

| Collection / source | Use it for | Selection advice |
|---|---|---|
| [Superpowers](https://github.com/obra/superpowers) | An integrated development workflow covering brainstorming, planning, implementation, testing, and review. | Choose when you want a consistent process across development tasks. |
| [Matt Pocock's skills](https://github.com/mattpocock/skills) | Composable engineering workflows, including `tdd`, `grill-me`, and `grill-with-docs`. | Choose individual workflows when you want targeted help. |
| [Vercel agent-skills](https://github.com/vercel-labs/agent-skills) | React/Next.js performance, component composition, and web interface reviews. | Start with `vercel-react-best-practices` and `vercel-composition-patterns` for our Next.js stack. |
| [Impeccable](https://github.com/pbakaus/impeccable) | Visual design iteration, UI critique, polish, and accessibility audits. | A starting choice for improving interfaces. |
| [Anthropic skills](https://github.com/anthropics/skills) | A broader reference collection, including `frontend-design` and document workflows. | Consider `frontend-design` as an alternative for visual design; choose other skills by task. |
| [agent-browser](https://github.com/vercel-labs/agent-browser) | Browser automation and testing through a CLI and its accompanying skill. | Add when your existing browser integration does not cover the work. |

## Choosing a combination

Listing a collection here does not mean every skill should be installed. These are our suggested starting combinations, not enforced profiles:

- **Individual workflows:** Matt's `tdd`, Vercel's React and composition skills, and Impeccable. Add a requirements interview only when needed.
- **Integrated workflow:** Superpowers, Vercel's React and composition skills, and Impeccable. Start without Matt's overlapping planning, TDD, and review workflows.
- **Browser automation:** add agent-browser to either combination if needed. [Claude in Chrome](../mcps/README.md) is already documented in our setup.

Choose one lead workflow for each task:

| Overlap | How to choose |
|---|---|
| Our `feature-spec`, Superpowers brainstorming, and Matt's interviews | Use `feature-spec` for our formal feature draft. Choose a different interview workflow when its output fits better; avoid repeating the same requirements interview through each collection. |
| Superpowers and Matt's TDD/planning/review skills | Use one as the main engineering workflow for a task. |
| Impeccable, Anthropic `frontend-design`, and Vercel `web-design-guidelines` | Start with one design workflow. Vercel's guidelines are an optional focused interface audit; they partially overlap with Impeccable's audit. |
| Existing browser tools and agent-browser | Choose a browser tool for the task; the extra CLI is optional. |

Our `repo-init` supplies the project scaffold. Vercel's skills help with subsequent React work; neither replaces the other.

## Installation

Run shell commands from the project where you want the skills, not from this catalog repository. Commands beginning with `/plugin` run inside Claude Code. These instructions document upstream installation paths checked on **2026-11-02**; they do not install anything automatically.

The [skills CLI](https://github.com/vercel-labs/skills) requires Node.js 22.20 or later. Its interactive installer lets you choose skills and agents. It installs into the current project by default; `-g` selects global installation. Use one installation method per collection per agent to avoid duplicate copies.

### Superpowers

In Claude Code:

```text
/plugin install superpowers@claude-plugins-official
```

For other agents, follow [upstream installation instructions](https://github.com/obra/superpowers#installation). Install once per agent, through one marketplace.

### Matt Pocock's skills

For selected skills, use the interactive installer:

```sh
npx skills@latest add mattpocock/skills
```

Select `tdd` to start, plus `setup-matt-pocock-skills` as recommended upstream. Add `grill-with-docs` if you want that requirements workflow. Run `/setup-matt-pocock-skills` once per project in Claude Code to configure issue tracking and document locations.

For the full collection as a Claude Code plugin instead, see [plugins](../plugins/README.md#optional-skill-plugins). Do not install both copies. Other agents' setup is documented [upstream](https://github.com/mattpocock/skills#installation-30-second-setup).

### Vercel agent-skills

```sh
npx skills add vercel-labs/agent-skills
```

Select `vercel-react-best-practices` and `vercel-composition-patterns`. These are the skill names; the upstream folder names omit the `vercel-` prefix. `web-design-guidelines` remains an optional UI audit and is already listed in our installed skills.

### Impeccable

```sh
npx impeccable install
```

Reload your coding tool, then run `/impeccable init` in Claude Code. See the [upstream guide](https://github.com/pbakaus/impeccable) for other agents. Try `/impeccable critique` or `/impeccable polish` with a specific page or component.

### Anthropic skills

To select the visual design skill without installing the whole collection:

```sh
npx skills add anthropics/skills --skill frontend-design
```

For document skills and Claude's plugin installation, follow the [upstream README](https://github.com/anthropics/skills). The repository includes both open-source and source-available skills; each skill's license applies.

### agent-browser

Install the CLI, its browser, and the agent integration separately:

```sh
npm install -g agent-browser
agent-browser install
npx skills add vercel-labs/agent-browser
```

The skill points the agent to workflow instructions supplied by the installed CLI. Installing the skill alone does not install the executable or browser. See [upstream setup](https://github.com/vercel-labs/agent-browser#installation) for local dependencies and other installation methods.

## Other skills already in use

The [root README](../README.md#third-party-skills-i-have-installed-not-copied-get-them-from-the-source) also lists Neon skills, `building-components`, `find-skills`, and `turborepo`. They remain part of the existing setup.

## Maintenance

For skills installed through the skills CLI, use `npx skills check` and `npx skills update`. Follow each project's upstream instructions for plugins and dedicated installers. Recheck commands and overlap advice when updating this catalog, and update the checked date above. Cloning this repository does not install or pin the third-party collections.
