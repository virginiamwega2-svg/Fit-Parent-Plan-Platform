import "server-only";

import { randomUUID } from "node:crypto";
import { getDb } from "@/lib/db";
import { ensureSchema, getSql, pgEnabled } from "@/lib/data/pg";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

export type SafeUser = Omit<UserRecord, "passwordHash">;

export function sanitizeUser(user: UserRecord): SafeUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export async function findUserByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (pgEnabled()) {
    await ensureSchema();
    const sql = getSql();
    const rows = await sql`
      SELECT id, name, email, password_hash AS "passwordHash", created_at AS "createdAt"
      FROM users WHERE email = ${normalizedEmail}
    `;
    return (rows[0] as UserRecord | undefined) ?? null;
  }

  const db = getDb();
  const row = db
    .prepare(
      `
        SELECT id, name, email, password_hash as passwordHash, created_at as createdAt
        FROM users
        WHERE email = ?
      `,
    )
    .get(normalizedEmail) as UserRecord | undefined;
  return row ?? null;
}

export async function findUserById(id: string) {
  if (pgEnabled()) {
    await ensureSchema();
    const sql = getSql();
    const rows = await sql`
      SELECT id, name, email, password_hash AS "passwordHash", created_at AS "createdAt"
      FROM users WHERE id = ${id}
    `;
    return (rows[0] as UserRecord | undefined) ?? null;
  }

  const db = getDb();
  const row = db
    .prepare(
      `
        SELECT id, name, email, password_hash as passwordHash, created_at as createdAt
        FROM users
        WHERE id = ?
      `,
    )
    .get(id) as UserRecord | undefined;
  return row ?? null;
}

export async function createUser(input: { name: string; email: string; passwordHash: string }) {
  const normalizedEmail = input.email.trim().toLowerCase();
  const user: UserRecord = {
    id: randomUUID(),
    name: input.name.trim(),
    email: normalizedEmail,
    passwordHash: input.passwordHash,
    createdAt: new Date().toISOString(),
  };

  if (pgEnabled()) {
    await ensureSchema();
    const sql = getSql();
    const exists = await sql`SELECT id FROM users WHERE email = ${normalizedEmail}`;
    if (exists.length > 0) {
      return null;
    }
    await sql`
      INSERT INTO users (id, name, email, password_hash, created_at)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${user.passwordHash}, ${user.createdAt})
    `;
    return user;
  }

  const db = getDb();
  const exists = db.prepare("SELECT id FROM users WHERE email = ?").get(normalizedEmail);
  if (exists) {
    return null;
  }

  db.prepare(
    `
      INSERT INTO users (id, name, email, password_hash, created_at)
      VALUES (@id, @name, @email, @passwordHash, @createdAt)
    `,
  ).run(user);

  return user;
}
