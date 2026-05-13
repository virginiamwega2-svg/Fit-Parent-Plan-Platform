const KEY = "fpp:userKey";

/**
 * Returns a stable anonymous identifier for the current browser, generating
 * one on first access. Used to group session logs in the n8n data store
 * without requiring auth. Safe on the server (returns null).
 */
export function getAnonUserKey(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const existing = window.localStorage.getItem(KEY);
    if (existing) return existing;
    const fresh = generateKey();
    window.localStorage.setItem(KEY, fresh);
    return fresh;
  } catch {
    return null;
  }
}

function generateKey(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `k_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export type SessionLog = {
  userKey: string;
  email?: string;
  planHeadline: string;
  planSource: "live" | "mock";
  mode: "plan" | "workout" | "adapt" | "pantry";
  completedAt: string;
};

/**
 * Fire-and-forget log of a successful AI session. Never throws; never blocks
 * the user. The /api/log/session route forwards to n8n if configured, or
 * no-ops cleanly when N8N_WEBHOOK_URL isn't set.
 */
export function logSession(input: Omit<SessionLog, "userKey" | "completedAt"> & { userKey?: string | null }) {
  const userKey = input.userKey ?? getAnonUserKey();
  if (!userKey) return;
  const payload: SessionLog = {
    userKey,
    email: input.email,
    planHeadline: input.planHeadline,
    planSource: input.planSource,
    mode: input.mode,
    completedAt: new Date().toISOString(),
  };
  try {
    void fetch("/api/log/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // best-effort
  }
}
