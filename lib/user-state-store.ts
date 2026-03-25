import "server-only";

import { getDb } from "@/lib/db";

export type UserState = {
  plannerDraft?: Record<string, unknown>;
  groceryState?: Record<string, unknown>;
  accountabilityState?: Record<string, unknown>;
};

export async function getUserState(userId: string): Promise<UserState> {
  const db = getDb();
  const row = db
    .prepare(
      `
        SELECT planner_draft as plannerDraft, grocery_state as groceryState, accountability_state as accountabilityState
        FROM user_state
        WHERE user_id = ?
      `,
    )
    .get(userId) as
    | {
        plannerDraft: string | null;
        groceryState: string | null;
        accountabilityState: string | null;
      }
    | undefined;

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
  const db = getDb();
  const current = await getUserState(userId);
  const next = { ...current, ...patch };

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
  ).run({
    userId,
    plannerDraft: next.plannerDraft ? JSON.stringify(next.plannerDraft) : null,
    groceryState: next.groceryState ? JSON.stringify(next.groceryState) : null,
    accountabilityState: next.accountabilityState ? JSON.stringify(next.accountabilityState) : null,
    updatedAt: new Date().toISOString(),
  });

  return next;
}
