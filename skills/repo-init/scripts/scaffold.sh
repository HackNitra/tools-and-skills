#!/usr/bin/env bash
# Scaffold a Turborepo + pnpm monorepo: Next.js + Tailwind web app, Kysely/Postgres db package,
# shared contract package, optional Fastify API.
#
# Usage: scaffold.sh <target-dir> [--title "Pretty Name"] [--db-port 5433] [--with-api] [--no-git]
set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMPLATE="$SKILL_DIR/template"

target=""
title=""
db_port="5433"
with_api=0
git_init=1

while [ $# -gt 0 ]; do
  case "$1" in
    --title) title="$2"; shift 2 ;;
    --db-port) db_port="$2"; shift 2 ;;
    --with-api) with_api=1; shift ;;
    --no-git) git_init=0; shift ;;
    -*) echo "unknown option: $1" >&2; exit 2 ;;
    *) target="$1"; shift ;;
  esac
done

if [ -z "$target" ]; then
  echo "usage: scaffold.sh <target-dir> [--title NAME] [--db-port PORT] [--with-api] [--no-git]" >&2
  exit 2
fi

mkdir -p "$target"
target="$(cd "$target" && pwd)"

# Refuse to write over an existing project. An empty dir, or one holding only .git, is fine.
if [ -n "$(ls -A "$target" | grep -v '^\.git$' || true)" ]; then
  echo "error: $target is not empty" >&2
  exit 1
fi

base="$(basename "$target")"
name="$(echo "$base" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')"
db="$(echo "$name" | tr '-' '_')"
[ -n "$title" ] || title="$base"
# Newest pnpm 11 (the major the template's pnpm-workspace.yaml settings are written for).
pnpm_version="$(npm view 'pnpm@^11' version 2>/dev/null | tail -1 | awk '{print $NF}' | tr -d "'")"
[ -n "$pnpm_version" ] || pnpm_version="11.28.5"
migration_ts="$(date -u +%Y%m%d%H%M%S)"

# Copy everything except the optional pieces.
(cd "$TEMPLATE" && tar --exclude='./optional' -cf - .) | (cd "$target" && tar -xf -)

if [ "$with_api" = 1 ]; then
  mkdir -p "$target/apps/api"
  (cd "$TEMPLATE/optional/api" && tar -cf - .) | (cd "$target/apps/api" && tar -xf -)
  cat >>"$target/.env.example" <<'EOF'

# API service (apps/api). All optional.
API_PORT=4000
API_HOST=localhost
API_WEB_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
EOF
  perl -0pi -e 's/(\| `packages\/db` \| Kysely)/| `apps\/api` | Fastify service, run with tsx. Health at `\/health`. |\n$1/' "$target/AGENTS.md"
  perl -0pi -e 's/(\| `packages\/db` \| Postgres)/| `apps\/api` | Fastify API |\n$1/' "$target/README.md"
fi

mv "$target/packages/db/migrations/__MIGRATION_TS___init.ts" \
  "$target/packages/db/migrations/${migration_ts}_init.ts"

# Fill placeholders in every text file.
export NAME="$name" DB="$db" TITLE="$title" DB_PORT="$db_port" PNPM_VERSION="$pnpm_version"
find "$target" -type f -not -path '*/.git/*' -print0 | xargs -0 perl -pi -e '
  s/__NAME__/$ENV{NAME}/g;
  s/__DB_PORT__/$ENV{DB_PORT}/g;
  s/__DB__/$ENV{DB}/g;
  s/__TITLE__/$ENV{TITLE}/g;
  s/__PNPM_VERSION__/$ENV{PNPM_VERSION}/g;
'

cp "$target/.env.example" "$target/.env"

if [ "$git_init" = 1 ] && [ ! -d "$target/.git" ]; then
  git -C "$target" init -q -b main
fi

cat <<EOF
scaffolded $title
  dir:      $target
  package:  $name
  database: $db (localhost:$db_port)
  api:      $([ "$with_api" = 1 ] && echo yes || echo no)
  pnpm:     $pnpm_version
EOF
