---
name: repo-init
description: Scaffold a new TypeScript monorepo in an opinionated house style — Turborepo + pnpm workspaces (catalog), Next.js App Router + React + Tailwind CSS 4 in apps/web, Postgres + Kysely (kysely-ctl migrations, kysely-codegen types) in packages/db, shared types in packages/contract, optional Fastify API in apps/api, docker-compose Postgres, single root .env, ESLint + Prettier, GitHub Actions CI. Use when the user asks to init/create/bootstrap/scaffold a new repo, project, monorepo or app or with Next + Tailwind + Turbo + Kysely.
---

# repo-init

Creates a new repository following a fixed monorepo pattern (Turbo, Kysely, editorconfig, CI checks). The bundled `template/` directory is the source of truth.

## What gets created

```
<repo>/
  apps/web/              Next.js (App Router, cacheComponents), Tailwind 4 via @tailwindcss/turbopack, @/* -> src/*
    src/app/api/health/  route that queries Postgres through @repo/db
  apps/api/              (--with-api) Fastify 5 + tsx watch, CORS, /health
  packages/db/           @repo/db: Kysely client `db` (lazy pool, HMR-safe), jsonb() helper,
                         kysely.config.ts, migrations/<UTC yyyymmddhhmmss>_init.ts, generated src/schema.ts,
                         docker/init-test-db.sh (creates <db>_test)
  packages/contract/     @repo/contract: shared types, no runtime deps
  .github/workflows/     ci.yml (db up, migrate, codegen drift, typecheck, lint, format, build, down/up)
                         migration-order.yml
  turbo.json  pnpm-workspace.yaml (catalog: typescript, @types/node)  tsconfig.json (strict base)
  docker-compose.yml (postgres:18-alpine)  .env.example -> .env  eslint.config.mjs  .prettierrc.json
  .editorconfig  .nvmrc (24)  .gitignore  AGENTS.md  CLAUDE.md (@AGENTS.md)  README.md
```

Conventions baked in: internal packages are `@repo/<name>`, export `./src/index.ts` directly (no build step); one `.env` at the root loaded by `next.config.ts` / `kysely.config.ts` via `process.loadEnvFile`; migrations are raw SQL in `sql\`\`` with a real `down`; `schema.ts` is generated and committed.

## Steps

1. **Gather inputs.** From the request, get the target directory (default: `~/Projects/<name>`), a display title, and whether an API service is wanted. Pick a Postgres host port that is free and not used by sibling projects (check `lsof -iTCP:<port> -sTCP:LISTEN` and `grep -h '"[0-9]*:5432"' ~/Projects/*/docker-compose.yml`); default 5433. Only ask the user if the name or the API choice is genuinely unclear.

2. **Scaffold.**
   ```sh
   bash ~/.claude/skills/repo-init/scripts/scaffold.sh <target-dir> --title "<Title>" --db-port <port> [--with-api]
   ```
   It refuses a non-empty directory (a lone `.git` is fine). Do not work around that. If the user wants this layered onto an existing repo, port the files by hand instead and merge with what is there.

3. **Bring versions current.** Template pins are from Oct 2026. Run `pnpm view <pkg> version` for `next`, `react`, `react-dom`, `eslint-config-next`, `turbo`, `kysely`, `kysely-ctl`, `kysely-codegen`, `fastify`, and update the pins if newer. Keep `next` and `eslint-config-next` on the same version, and `react`/`react-dom` identical. Don't jump a major without telling the user.

4. **Install and verify.** All of these must pass, in this order:
   The shell may default to an older Node; run `source ~/.nvm/nvm.sh && nvm use 24` (and `corepack enable`) in the same command as the pnpm calls. The global pnpm may be older than the pinned one; corepack picks the pinned version from `packageManager`.
   ```sh
   cd <target-dir>
   pnpm install
   pnpm format              # aligns the markdown tables after placeholders are filled
   pnpm db:up && pnpm db:migrate
   pnpm db:codegen          # must leave packages/db/src/schema.ts unchanged
   pnpm typecheck && pnpm lint && pnpm format:check
   pnpm build
   ```
   Then start `pnpm dev` in the background, `curl -s localhost:3000/api/health` and expect `{"ok":true,"database":true}` (and `localhost:4000/health` with the API). Stop the dev server afterwards. If `pnpm install` asks to approve build scripts, add the package to `allowBuilds` in `pnpm-workspace.yaml`. Also run `pnpm db:migrate:down && pnpm db:migrate` to check the reversal (CI does the same).

   If something fails, fix the template in `~/.claude/skills/repo-init/template/` too, not only the generated repo, so the next run doesn't fail the same way.

5. **Make it theirs.** Replace the example `note` table, migration and `/api/health` copy with the real domain if the user described one; update `AGENTS.md` and `README.md` (purpose, status, specs). Leave the `<!-- BEGIN:...agent-rules -->` blocks alone. `next dev` and `turbo` re-add them.

6. **Commit.** Make the initial commit (`git add -A && git commit -m "Initial scaffold"` plus the attribution trailer) only if the user asked. Don't create a GitHub remote or push unless asked.

## Optional additions (only when asked)

- **Husky + lint-staged** : add `husky`, `lint-staged` to root devDependencies, `"prepare": "husky"`, `.husky/pre-commit` running `pnpm lint-staged`, and a `lint-staged` block running `eslint --fix` / `prettier --write`.
- **Tests:** in node packages, `tsx --test` (as in `apps/api`); turbo already has a `test` task. For a test database use `<db>_test`, which `init-test-db.sh` creates.
- **Dockerfile / deploy:** write a multi-stage Dockerfile with a `migrate` target.
- **Row-level security / app role:** use `DATABASE_ADMIN_URL` for migrations and codegen, a non-superuser app role at runtime.

## Report

Tell the user the path, the commands that passed, the DB port, the versions you bumped, and anything you skipped or that failed, with the output.
