# tools-and-skills

Skills, MCP servers and plugins I use with Claude Code, shared for Hack Nitra attendees.

## My own skills (copied here, in `skills/`)

- **repo-init**: scaffolds a TypeScript monorepo (Turborepo, pnpm, Next.js, Tailwind 4, Kysely/Postgres, CI).
- **feature-spec**: interview-driven feature specification document.

Install: copy a folder into `~/.claude/skills/`.

## Third-party skills I have installed (not copied; get them from the source)

- Neon skills (`neon`, `neon-auth`, `neon-postgres`, `neon-functions`, `neon-realtime`, `neon-object-storage`, `neon-ai-gateway`, `neon-postgres-branches`, `neon-postgres-egress-optimizer`): via the `neon-postgres@neon` plugin.
- `building-components`, `find-skills`, `turborepo`, `web-design-guidelines`: via `npx skills add` / the skills.sh registry.

## Third-party collections to choose from

See the [skills catalog](skills/README.md) for Superpowers, Matt Pocock's skills, Vercel agent-skills, Impeccable, Anthropic's skills, and agent-browser: what each is for, how to install it, and where they overlap.

These are options for attendees, not an install-everything bundle or a claim that all are installed. Third-party skill files stay upstream; `skills/` contains our own implementations and the catalog.

## MCP servers and plugins

See [`mcps/`](mcps/README.md) and [`plugins/`](plugins/README.md).
