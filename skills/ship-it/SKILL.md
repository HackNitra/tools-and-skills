---
name: ship-it
description: Use when the user wants to get their hackathon project deployed with a public URL fast. Picks the quickest host for the stack, wires environment variables and a health check. Invoke with "/ship-it" or "deploy this".
---

# Ship It

## Steps

1. Detect the stack (`package.json`, `pyproject.toml`, `Dockerfile`, `docker-compose.yml`) and report what you found.
2. Recommend the fastest host that fits, with one reason. Defaults:
   - Static or Next.js frontend: Vercel or Netlify
   - Node/Python API or long-running server (WebSockets, bots): Railway, Fly.io, Render, or Neon Functions
   - Postgres: Neon (see the `neon-postgres` skill)
   - Discord/Slack bot: a small always-on service; not serverless
3. List the environment variables the app needs by reading the code, then create or update `.env.example` (names only, never values).
4. Add a `/health` or `/api/health` endpoint if there is none.
5. Walk the user through deploy commands and secrets setup. Ask before running anything that publishes or spends money.
6. Verify the deployed URL: health check returns 200, one real flow works, logs are readable.
7. Put the live URL at the top of the README.

## Rules

- Never commit secrets. If one was committed, tell the user to rotate it; deleting it from the latest commit is not enough.
- Deploy a skeleton early, then redeploy often. Last-hour first deploys fail.
- Free tiers sleep: warm the app up right before the demo.
