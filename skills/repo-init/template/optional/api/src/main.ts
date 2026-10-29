import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import cors from "@fastify/cors";
import type { Health } from "@repo/contract";
import { db, sql } from "@repo/db";
import Fastify from "fastify";

const rootEnv = fileURLToPath(new URL("../../../.env", import.meta.url));
if (existsSync(rootEnv)) {
  process.loadEnvFile(rootEnv);
}

const port = Number(process.env.API_PORT ?? 4000);
const host = process.env.API_HOST ?? "localhost";
const origins = (process.env.API_WEB_ORIGINS ?? "http://localhost:3000").split(
  ",",
);

const app = Fastify({ logger: true });
await app.register(cors, { origin: origins });

app.get("/health", async (_request, reply) => {
  let database = false;
  try {
    await sql`select 1`.execute(db);
    database = true;
  } catch {
    // Reported in the body; the service itself is up.
  }
  const body: Health = { ok: true, database };
  return reply.code(database ? 200 : 503).send(body);
});

await app.listen({ port, host });
