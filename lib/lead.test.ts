import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { submitLead } from './lead';

/**
 * The lead pipeline is the only place on this site where a visitor hands over
 * something that can be lost. These tests cover the four ways it can go wrong:
 * bad input, a bot, too many requests, and a webhook that is not configured.
 */

const VALID = {
  name: 'Test Person',
  email: 'Test@Example.com ',
  company: 'Test Co',
  revenue: '$3M to $15M',
  systems: 'GoHighLevel and a shared inbox',
  why: 'Quotes take six days',
};

let warn: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  delete process.env.MAKE_WEBHOOK_URL;
});
afterEach(() => vi.restoreAllMocks());

describe('submitLead', () => {
  it('accepts a complete submission', async () => {
    const r = await submitLead(VALID, 'ip-accept');
    expect(r.ok).toBe(true);
  });

  it('normalises the email rather than rejecting it', async () => {
    await submitLead(VALID, 'ip-normalise');
    const logged = JSON.parse(String(warn.mock.calls[0][1]));
    expect(logged.email).toBe('test@example.com');
  });

  it('reports one error per field, not three', async () => {
    const r = await submitLead({ ...VALID, email: 'nope', why: '' }, 'ip-invalid');
    expect(r).toMatchObject({ ok: false, kind: 'invalid' });
    if (r.ok || r.kind !== 'invalid') throw new Error('expected invalid');
    expect(Object.keys(r.errors).sort()).toEqual(['email', 'why']);
    expect(Object.values(r.errors).every((m) => typeof m === 'string' && m.length > 0)).toBe(true);
  });

  it('rejects a revenue band that is not on the form', async () => {
    const r = await submitLead({ ...VALID, revenue: '$900M' }, 'ip-band');
    expect(r).toMatchObject({ ok: false, kind: 'invalid' });
  });

  it('drops a submission with the honeypot filled, and never delivers it', async () => {
    const r = await submitLead({ ...VALID, role: 'i am a bot' }, 'ip-bot');
    expect(r).toMatchObject({ ok: false, kind: 'bot' });
    expect(warn).not.toHaveBeenCalled();
  });

  it('limits to five a minute from one address', async () => {
    const ip = 'ip-rate-' + Math.random();
    for (let i = 0; i < 5; i++) {
      expect((await submitLead(VALID, ip)).ok).toBe(true);
    }
    expect(await submitLead(VALID, ip)).toMatchObject({ ok: false, kind: 'rate' });
  });

  it('counts each address separately', async () => {
    const a = 'ip-a-' + Math.random();
    const b = 'ip-b-' + Math.random();
    for (let i = 0; i < 5; i++) await submitLead(VALID, a);
    expect((await submitLead(VALID, b)).ok).toBe(true);
  });

  it('logs the whole submission when the webhook is unset, so nothing is lost', async () => {
    await submitLead(VALID, 'ip-nowebhook');
    expect(warn).toHaveBeenCalled();
    const [msg, payload] = warn.mock.calls[0];
    expect(String(msg)).toContain('MAKE_WEBHOOK_URL');
    const parsed = JSON.parse(String(payload));
    expect(parsed.why).toBe('Quotes take six days');
    expect(parsed.source).toContain('/commission');
  });

  it('posts to the webhook with the signature when both are configured', async () => {
    process.env.MAKE_WEBHOOK_URL = 'https://hook.example/x';
    process.env.MAKE_WEBHOOK_SECRET = 'shh';
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('ok', { status: 200 }));

    const r = await submitLead(VALID, 'ip-webhook');
    expect(r.ok).toBe(true);

    const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://hook.example/x');
    expect((init.headers as Record<string, string>)['x-hexona-signature']).toBe('shh');
    expect(JSON.parse(String(init.body)).company).toBe('Test Co');

    delete process.env.MAKE_WEBHOOK_URL;
    delete process.env.MAKE_WEBHOOK_SECRET;
  });

  it('still reports success to the visitor when the webhook throws', async () => {
    process.env.MAKE_WEBHOOK_URL = 'https://hook.example/x';
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network down'));
    const r = await submitLead(VALID, 'ip-throw');
    expect(r.ok).toBe(true);
    delete process.env.MAKE_WEBHOOK_URL;
  });
});
