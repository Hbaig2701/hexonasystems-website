import { NextResponse } from 'next/server';
import { leadSchema, MIN_SUBMIT_MS } from '@/lib/audit/schema';
import { buildEnvelope, sendToCrm } from '@/lib/crm';
import { clientIp, rateLimit } from '@/lib/rate-limit';

/**
 * POST /api/lead — §9.1.
 *
 *   Validation (zod) → Rate limit (5/min/IP) → Honeypot + timing check
 *   → Make.com webhook → GHL / email / Slack / warehouse
 *
 * Runs server-side only. The GHL API key never reaches the browser.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const ip = clientIp(request.headers);

  const limit = await rateLimit(ip);
  if (!limit.success) {
    return NextResponse.json(
      { error: 'Too many submissions. Give it a minute.' },
      { status: 429, headers: { 'retry-after': '60' } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    // Do not echo the zod tree back — the client already validated the same
    // schema, so anything landing here is either a bot or a tampered payload.
    return NextResponse.json({ error: 'That submission was not valid.' }, { status: 400 });
  }

  const lead = parsed.data;

  // §9.4 — honeypot. A filled hidden field means a bot. Answer 200 so the bot
  // learns nothing from the response, and drop the payload.
  if (lead.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // §9.4 — submission timing. Under 2 seconds is not a human reading a form.
  if (lead.elapsedMs < MIN_SUBMIT_MS) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const envelope = buildEnvelope(lead);
  const delivery = await sendToCrm(envelope);

  // The visitor's breakdown does not depend on CRM plumbing succeeding. If the
  // webhook is down we still unlock their results and log loudly, rather than
  // failing a conversion over an integration.
  return NextResponse.json({
    ok: true,
    delivered: delivery.ok,
    tier: envelope.meta.tier,
  });
}
