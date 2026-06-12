import "server-only";

import { getDb } from "@/lib/db";
import { ensureSchema, getSql, pgEnabled } from "@/lib/db-pg";

export type UserState = {
  plannerDraft?: Record<string, unknown>;
  groceryState?: Record<string, unknown>;
  accountabilityState?: Record<string, unknown>;
};

type StateRow = {
  plannerDraft: string | null;
  groceryState: string | null;
  accountabilityState: string | null;
};

export async function getUserState(userId: string): Promise<UserState> {
  let row: StateRow | undefined;

  if (pgEnabled()) {
    await ensureSchema();
    const sql = getSql();
    const rows = await sql`
      SELECT planner_draft AS "plannerDraft", grocery_state AS "groceryState", accountability_state AS "accountabilityState"
      FROM user_state WHERE user_id = ${userId}
    `;
    row = rows[0] as StateRow | undefined;
  } else {
    const db = getDb();
    row = db
      .prepare(
        `
        SELECT planner_draft as plannerDraft, grocery_state as groceryState, accountability_state as accountabilityState
        FROM user_state
        WHERE user_id = ?
      `,
      )
      .get(userId) as StateRow | undefined;
  }

  if (!row) {
    return {};
  }

  return {
    plannerDraft: row.plannerDraft ? (JSON.parse(row.plannerDraft) as Record<string, unknown>) : undefined,
    groceryState: row.groceryState ? (JSON.parse(row.groceryState) as Record<string, unknown>) : undefined,
    accountabilityState: row.accountabilityState
      ? (JSON.parse(row.accountabilityState) as Record<string, unknown>)
      : undefined,
  };
}

export async function updateUserState(userId: string, patch: Partial<UserState>) {
  const current = await getUserState(userId);
  const next = { ...current, ...patch };

  const plannerDraft = next.plannerDraft ? JSON.stringify(next.plannerDraft) : null;
  const groceryState = next.groceryState ? JSON.stringify(next.groceryState) : null;
  const accountabilityState = next.accountabilityState ? JSON.stringify(next.accountabilityState) : null;
  const updatedAt = new Date().toISOString();

  if (pgEnabled()) {
    await ensureSchema();
    const sql = getSql();
    await sql`
      INSERT INTO user_state (user_id, planner_draft, grocery_state, accountability_state, updated_at)
      VALUES (${userId}, ${plannerDraft}, ${groceryState}, ${accountabilityState}, ${updatedAt})
      ON CONFLICT (user_id) DO UPDATE SET
        planner_draft = EXCLUDED.planner_draft,
        grocery_state = EXCLUDED.grocery_state,
        accountability_state = EXCLUDED.accountability_state,
        updated_at = EXCLUDED.updated_at
    `;
    return next;
  }

  const db = getDb();
  db.prepare(
    `
      INSERT INTO user_state (user_id, planner_draft, grocery_state, accountability_state, updated_at)
      VALUES (@userId, @plannerDraft, @groceryState, @accountabilityState, @updatedAt)
      ON CONFLICT(user_id) DO UPDATE SET
        planner_draft = excluded.planner_draft,
        grocery_state = excluded.grocery_state,
        accountability_state = excluded.accountability_state,
        updated_at = excluded.updated_at
    `,
  ).run({ userId, plannerDraft, groceryState, accountabilityState, updatedAt });

  return next;
}
