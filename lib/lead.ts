import 'server-only';
import { z } from 'zod';
import { REVENUE_BANDS } from '@/content/commission';

/**
 * lib/lead.ts — the lead pipeline .env.example has described since v1 and which
 * no code implemented.
 *
 * The spec was already written down: a webhook, an optional shared secret so
 * the receiver can reject anything that did not come from this site, and a
 * 5-per-minute-per-IP limit backed by Upstash with an in-memory fallback.
 * `zod`, `@upstash/ratelimit`, `@upstash/redis` and `server-only` were all in
 * package.json, unused. v2 dropped the implementation the same way it dropped
 * the SEO layer.
 *
 * The original spec routed through Make.com to fan out to GoHighLevel, email
 * and Slack. That hop is gone: the lead posts straight to a GoHighLevel
 * inbound webhook, and GHL's own workflow does the fanning out. One fewer
 * service between a form submission and the CRM, and one fewer bill.
 *
 * ⚠️ THE ENV VAR IS VENDOR-NEUTRAL ON PURPOSE. It is LEAD_WEBHOOK_URL, not
 * GHL_WEBHOOK_URL, because this is the second receiver in this file's short
 * life and it will not be the last. Nothing below knows or cares what is on
 * the other end.
 *
 * ⚠️ A LEAD IS NEVER LOST TO A CONFIGURATION PROBLEM. If LEAD_WEBHOOK_URL is
 * unset, or Make returns an error, or the request times out, the submission is
 * written to the server log in full and the visitor is still told it arrived,
 * because from their side it did: the site has their answers. What it does not
 * do is claim delivery it cannot make, so every one of those paths logs loudly
 * enough to find in Vercel's log stream.
 *
 * `server-only` is not decoration. This module reads the webhook secret, and
 * importing it from a client component must fail the build rather than ship it.
 */

const MAX_LEN = 4000;

export const leadSchema = z.object({
  name: z.string().trim().min(1, 'Tell us who you are.').max(120),
  email: z.string().trim().toLowerCase().email('That does not look like an email address.').max(200),
  /**
   * Deliberately loose. Phone formats differ by country in ways no regex gets
   * right, and the cost of rejecting a real number is losing the lead outright,
   * while the cost of accepting a malformed one is somebody squinting at it for
   * a second. So: strip everything that is not a digit and insist on enough of
   * them to be a real number. `+`, spaces, dashes, dots and parens all pass.
   */
  phone: z
    .string()
    .trim()
    .min(1, 'We need a number for the call.')
    .max(40)
    .refine((v) => (v.match(/\d/g) ?? []).length >= 7, 'That is too short to be a phone number.'),
  company: z.string().trim().min(1, 'Which company?').max(200),
  website: z.string().trim().max(300).optional(),
  revenue: z.enum(REVENUE_BANDS, { message: 'Pick the closest band.' }),
  headcount: z.string().trim().max(120).optional(),
  systems: z.string().trim().min(2, 'Even one line helps.').max(MAX_LEN),
  why: z.string().trim().min(2, 'This is the most useful answer on the form.').max(MAX_LEN),
  timing: z.string().trim().max(200).optional(),
  /**
   * Honeypot. Real people never see it, so anything in it is a bot.
   *
   * ⚠️ NO `.max(0)` HERE, AND THAT IS THE WHOLE TRICK. Validating it would
   * fail the parse and return `invalid`, which hands the bot a field-by-field
   * explanation of what to fix and invites a retry. It has to pass validation
   * so the explicit check below can accept the submission, discard it, and
   * report success. A test covers this, because it is the kind of thing that
   * gets "tidied up" into a validation rule by someone being helpful.
   */
  role: z.string().optional(),
});

export type Lead = z.infer<typeof leadSchema>;

/**
 * In-memory limiter, used when Upstash is not configured.
 *
 * ⚠️ PER INSTANCE, WHICH IS NOT THE SAME AS PER SITE. Serverless runs many
 * instances, so this bounds a single one and nothing more. .env.example says
 * the same thing: fine locally, NOT sufficient in production. It exists so the
 * form is never wide open, not so Upstash can be skipped.
 */
const memory = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const LIMIT = 5;

function memoryLimit(key: string): boolean {
  const now = Date.now();
  const hits = (memory.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  memory.set(key, hits);
  if (memory.size > 5000) memory.clear();
  return hits.length <= LIMIT;
}

async function withinRateLimit(ip: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return memoryLimit(ip);

  try {
    const { Ratelimit } = await import('@upstash/ratelimit');
    const { Redis } = await import('@upstash/redis');
    const limiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(LIMIT, '1 m'),
      prefix: 'hexona:lead',
    });
    const { success } = await limiter.limit(ip);
    return success;
  } catch (err) {
    /* Upstash being down must not take the form down with it. */
    console.error('[lead] rate limiter unavailable, falling back to memory', err);
    return memoryLimit(ip);
  }
}

export type LeadResult =
  | { ok: true }
  | { ok: false; kind: 'invalid'; errors: Record<string, string> }
  | { ok: false; kind: 'rate' }
  | { ok: false; kind: 'bot' };

export async function submitLead(raw: unknown, ip: string): Promise<LeadResult> {
  const parsed = leadSchema.safeParse(raw);

  if (!parsed.success) {
    /* zod 4: `flatten()` is deprecated, and reading `issues` directly is both
       version-stable and clearer about what it produces. First error per field
       wins; a field showing three complaints at once helps nobody. */
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, kind: 'invalid', errors };
  }

  /* Silently accepted, never delivered. A bot told it failed just retries. */
  if (parsed.data.role) return { ok: false, kind: 'bot' };

  if (!(await withinRateLimit(ip))) return { ok: false, kind: 'rate' };

  await deliver(parsed.data, ip);
  return { ok: true };
}

async function deliver(lead: Lead, ip: string): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL;

  /**
   * ⚠️ SHAPED SO GOHIGHLEVEL CAN MAP IT WITHOUT A WORKFLOW STEP.
   *
   * GHL matches an inbound webhook onto a contact by `email` and `phone`, both
   * of which go through under those exact names already. What its contact
   * record also wants is `firstName`, `lastName` and `companyName`, rather than
   * the single `name` and `company` this form collects. Sending both shapes costs
   * a few bytes and saves building a mapping step that would then be the thing
   * that silently breaks when somebody renames a field.
   *
   * Everything else goes through verbatim, for custom fields.
   */
  const [firstName, ...rest] = lead.name.split(/\s+/);
  const payload = {
    ...lead,
    firstName,
    lastName: rest.join(' '),
    companyName: lead.company,
    source: 'hexonasystems.com/commission',
    receivedAt: new Date().toISOString(),
    ip,
  };

  if (!url) {
    console.warn(
      '[lead] LEAD_WEBHOOK_URL is not set. The lead was NOT delivered to the CRM. ' +
        'Full submission follows so it can be recovered from the log.',
      JSON.stringify(payload),
    );
    return;
  }

  try {
    /* GoHighLevel does not verify a signature on an inbound webhook; the URL
       itself is the secret. Kept optional for whatever sits here next. */
    const secret = process.env.LEAD_WEBHOOK_SECRET;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(secret ? { 'x-hexona-signature': secret } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error(
        `[lead] webhook returned ${res.status}. Lead NOT delivered.`,
        JSON.stringify(payload),
      );
    }
  } catch (err) {
    console.error('[lead] webhook threw. Lead NOT delivered.', err, JSON.stringify(payload));
  }
}
