import "server-only";

import { createHash, createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE_NAME = "fit15_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

type SessionPayload = {
  userId: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
};

type SessionUser = {
  id: string;
  email: string;
  name: string;
};

function getAuthSecret() {
  return process.env.NEXT_AUTH_SECRET ?? "dev-only-change-me";
}

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf-8");
}

function sign(value: string) {
  return createHmac("sha256", getAuthSecret()).update(value).digest("base64url");
}

function stableHash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 120_000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, savedHash] = storedHash.split(":");
  if (!salt || !savedHash) {
    return false;
  }

  const providedHash = pbkdf2Sync(password, salt, 120_000, 64, "sha512").toString("hex");
  const providedDigest = Buffer.from(stableHash(providedHash), "hex");
  const savedDigest = Buffer.from(stableHash(savedHash), "hex");
  return timingSafeEqual(providedDigest, savedDigest);
}

export function createSessionToken(user: SessionUser) {
  const iat = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    iat,
    exp: iat + SESSION_TTL_SECONDS,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);
  const expectedDigest = Buffer.from(stableHash(expectedSignature), "hex");
  const actualDigest = Buffer.from(stableHash(signature), "hex");
  if (!timingSafeEqual(expectedDigest, actualDigest)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as SessionPayload;
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp <= now) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
