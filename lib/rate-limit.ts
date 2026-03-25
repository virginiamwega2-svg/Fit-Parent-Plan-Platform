import "server-only";

type Bucket = {
  count: number;
  resetAt: number;
};

type CheckInput = {
  key: string;
  max: number;
  windowMs: number;
};

type CheckOutput = {
  limited: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

type GlobalWithRateLimit = typeof globalThis & {
  __fit15RateLimitBuckets?: Map<string, Bucket>;
};

function getBuckets() {
  const globalWithMap = globalThis as GlobalWithRateLimit;
  if (!globalWithMap.__fit15RateLimitBuckets) {
    globalWithMap.__fit15RateLimitBuckets = new Map<string, Bucket>();
  }
  return globalWithMap.__fit15RateLimitBuckets;
}

export function getClientIp(request: Request) {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() ?? "unknown";
}

export function checkRateLimit(input: CheckInput): CheckOutput {
  const now = Date.now();
  const buckets = getBuckets();
  const bucket = buckets.get(input.key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(input.key, { count: 1, resetAt: now + input.windowMs });
    return {
      limited: false,
      remaining: input.max - 1,
      retryAfterSeconds: Math.ceil(input.windowMs / 1000),
    };
  }

  bucket.count += 1;
  buckets.set(input.key, bucket);

  const retryAfterMs = Math.max(0, bucket.resetAt - now);
  return {
    limited: bucket.count > input.max,
    remaining: Math.max(0, input.max - bucket.count),
    retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
  };
}
