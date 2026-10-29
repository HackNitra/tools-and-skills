# __TITLE__

## Stack

Turborepo and pnpm (workspaces + catalog); Next.js (App Router), React and Tailwind CSS 4 in `apps/web`; Postgres with Kysely in `packages/db`; shared types in `packages/contract`. TypeScript everywhere, strict.

## Layout

| Path | What it is |
| --- | --- |
| `apps/web` | Next.js app. `@/*` maps to `apps/web/src/*`. |
| `packages/db` | Kysely client (`db`), migrations, generated `src/schema.ts`. |
| `packages/contract` | Types shared between apps. No runtime dependencies. |

Internal packages are named `@repo/<name>`, export TypeScript source directly (`"exports": { ".": "./src/index.ts" }`) and have no build step.

## Environment

One `.env` at the repository root, copied from `.env.example`. `apps/web/next.config.ts` and `packages/db/kysely.config.ts` load it; do not add per-app `.env` files. New variables go in `.env.example` with a comment, and in `turbo.json` `env` if a build reads them.

## Database

- `pnpm db:up` starts Postgres (docker compose), `pnpm db:migrate` applies migrations.
- `pnpm db:migrate:make <name>` creates a migration in `packages/db/migrations`. Write raw SQL with `sql\`...\`.execute(db)`, and always a working `down`.
- After changing the schema, run `pnpm db:codegen` and commit `packages/db/src/schema.ts`. Never edit it by hand. CI fails if it drifts.
- Bind JSON with the `jsonb()` helper; `::jsonb` breaks Kysely's parameter parsing.

## Commands

`pnpm dev:all` (db up, migrate, dev), `pnpm check` (typecheck + lint + format check), `pnpm build`, `pnpm format`.

Before calling work done, run `pnpm check` and `pnpm build`.
