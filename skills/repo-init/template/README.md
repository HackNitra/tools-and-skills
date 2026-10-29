# __TITLE__

## Getting started

```sh
nvm use            # Node 24
corepack enable    # pnpm from packageManager
pnpm install
cp .env.example .env
pnpm dev:all       # Postgres up, migrations, then the web app on http://localhost:3000
```

## Repository

| Path | What it is |
| --- | --- |
| `apps/web` | Next.js app |
| `packages/db` | Postgres schema, migrations and the Kysely client |
| `packages/contract` | Shared types |

Stack: Turborepo and pnpm; Next.js, React and Tailwind; Postgres with Kysely; TypeScript.
