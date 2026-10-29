import { type Kysely, sql } from "kysely";

// Example table so the stack works end to end. Replace it with the real schema.
export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`
    CREATE TABLE note (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      body text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `.execute(db);
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await sql`DROP TABLE IF EXISTS note`.execute(db);
}
