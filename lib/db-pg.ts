import "server-only";

import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Postgres (Neon) backend for the data layer. Entirely inert unless
// DATABASE_URL is set: when it's absent the stores fall back to the existing
// SQLite path (lib/db.ts), so local dev and any un-migrated environment behave
// exactly as before. When it's present (e.g. on Vercel), the stores persist
// to Neon.
//
// Tables are created on first use (CREATE TABLE IF NOT EXISTS), mirroring the
// SQLite bootstrap — so there's no separate migration command to run.

export function pgEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

let sqlClient: NeonQueryFunction<false, false> | null = null;
export function getSql(): NeonQueryFunction<false, false> {
  if (!sqlClient) {
    sqlClient = neon(process.env.DATABASE_URL as string);
  }
  return sqlClient;
}

let schemaReady: Promise<void> | null = null;
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id text PRIMARY KEY,
          name text NOT NULL,
          email text NOT NULL UNIQUE,
          password_hash text NOT NULL,
          created_at text NOT NULL
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS user_state (
          user_id text PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
          planner_draft text,
          grocery_state text,
          accountability_state text,
          updated_at text NOT NULL
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id bigserial PRIMARY KEY,
          name text NOT NULL,
          email text NOT NULL,
          challenge text NOT NULL,
          goal text NOT NULL,
          time_per_day text NOT NULL,
          ip text,
          created_at text NOT NULL
        )
      `;
    })().catch((err) => {
      // Reset so the next call retries the bootstrap rather than caching a failure.
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}
