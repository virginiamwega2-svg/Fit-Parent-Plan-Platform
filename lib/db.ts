import "server-only";

import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "app.db");
const USERS_JSON_PATH = path.join(DATA_DIR, "users.json");
const USER_STATE_JSON_PATH = path.join(DATA_DIR, "user-state.json");

type GlobalWithDb = typeof globalThis & {
  __fit15Db?: Database.Database;
};

function bootstrapLegacyData(db: Database.Database) {
  const userCountRow = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
  const stateCountRow = db.prepare("SELECT COUNT(*) as count FROM user_state").get() as { count: number };

  if (userCountRow.count === 0 && existsSync(USERS_JSON_PATH)) {
    try {
      const rawUsers = readFileSync(USERS_JSON_PATH, "utf-8");
      const users = JSON.parse(rawUsers) as Array<{
        id: string;
        name: string;
        email: string;
        passwordHash: string;
        createdAt: string;
      }>;

      const insertUser = db.prepare(
        `
          INSERT OR IGNORE INTO users (id, name, email, password_hash, created_at)
          VALUES (@id, @name, @email, @passwordHash, @createdAt)
        `,
      );

      const transaction = db.transaction((rows: typeof users) => {
        for (const row of rows) {
          insertUser.run(row);
        }
      });

      transaction(users);
    } catch {
      // Ignore malformed legacy data.
    }
  }

  if (stateCountRow.count === 0 && existsSync(USER_STATE_JSON_PATH)) {
    try {
      const rawState = readFileSync(USER_STATE_JSON_PATH, "utf-8");
      const stateMap = JSON.parse(rawState) as Record<
        string,
        {
          plannerDraft?: Record<string, unknown>;
          groceryState?: Record<string, unknown>;
          accountabilityState?: Record<string, unknown>;
        }
      >;

      const upsertState = db.prepare(
        `
          INSERT INTO user_state (user_id, planner_draft, grocery_state, accountability_state, updated_at)
          VALUES (@userId, @plannerDraft, @groceryState, @accountabilityState, @updatedAt)
          ON CONFLICT(user_id) DO UPDATE SET
            planner_draft = excluded.planner_draft,
            grocery_state = excluded.grocery_state,
            accountability_state = excluded.accountability_state,
            updated_at = excluded.updated_at
        `,
      );

      const transaction = db.transaction((entries: Array<[string, (typeof stateMap)[string]]>) => {
        for (const [userId, value] of entries) {
          upsertState.run({
            userId,
            plannerDraft: value.plannerDraft ? JSON.stringify(value.plannerDraft) : null,
            groceryState: value.groceryState ? JSON.stringify(value.groceryState) : null,
            accountabilityState: value.accountabilityState ? JSON.stringify(value.accountabilityState) : null,
            updatedAt: new Date().toISOString(),
          });
        }
      });

      transaction(Object.entries(stateMap));
    } catch {
      // Ignore malformed legacy data.
    }
  }
}

function createDb() {
  mkdirSync(DATA_DIR, { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_state (
      user_id TEXT PRIMARY KEY,
      planner_draft TEXT,
      grocery_state TEXT,
      accountability_state TEXT,
      updated_at TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      challenge TEXT NOT NULL,
      goal TEXT NOT NULL,
      time_per_day TEXT NOT NULL,
      ip TEXT,
      created_at TEXT NOT NULL
    );
  `);

  bootstrapLegacyData(db);
  return db;
}

export function getDb() {
  const globalWithDb = globalThis as GlobalWithDb;
  if (!globalWithDb.__fit15Db) {
    globalWithDb.__fit15Db = createDb();
  }
  return globalWithDb.__fit15Db;
}
