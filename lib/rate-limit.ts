import 'server-only';

/**
 * lib/rate-limit.ts — §9.1: "Rate limit (Upstash, 5/min/IP)".
 *
 * Upstash when it is configured. When it is not — local development, preview
 * deploys without secrets — an in-memory limiter takes over so the code path is
 * always exercised and never silently absent. The in-memory version is
 * per-instance and therefore NOT sufficient for production; the warning says so.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

type Limiter = (key: string) => Promise<{ success: boolean; remaining: number }>;

let upstash: Limiter | null = null;
let upstashInit = false;

const memory = new Map<string, number[]>();

function memoryLimiter(key: string): { success: boolean; remaining: number } {
  const now = Date.now();
  const hits = (memory.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  memory.set(key, hits);

  // Opportunistic sweep so the map cannot grow without bound.
  if (memory.size > 5000) {
    for (const [k, v] of memory) {
      if (v.every((t) => now - t >= WINDOW_MS)) memory.delete(k);
    }
  }

  return { success: hits.length <= MAX_REQUESTS, remaining: Math.max(0, MAX_REQUESTS - hits.length) };
}

async function getUpstash(): Promise<Limiter | null> {
  if (upstashInit) return upstash;
  upstashInit = true;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    console.warn(
      '[rate-limit] Upstash is not configured, falling back to a per-instance in-memory limiter. ' +
        'This is NOT sufficient for production (§9.1).',
    );
    return null;
  }

  const [{ Ratelimit }, { Redis }] = await Promise.all([
    import('@upstash/ratelimit'),
    import('@upstash/redis'),
  ]);

  const limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(MAX_REQUESTS, '1 m'),
    prefix: 'hx-lead',
    analytics: false,
  });

  upstash = async (key: string) => {
    const res = await limiter.limit(key);
    return { success: res.success, remaining: res.remaining };
  };
  return upstash;
}

export async function rateLimit(key: string) {
  const limiter = await getUpstash();
  if (limiter) {
    try {
      return await limiter(key);
    } catch (error) {
      console.error('[rate-limit] Upstash failed, using in-memory fallback', error);
    }
  }
  return memoryLimiter(key);
}

/** Best-effort client IP behind Vercel's proxy. */
export function clientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}
