import { z } from 'zod';
import { LIMITS } from '@/content/audit-model';

/**
 * lib/audit/schema.ts — validation shared between client and server (§10.1).
 * The browser gets instant, polite errors; /api/lead re-validates the same
 * shape because a client-side check is a convenience, never a control.
 */

/** §8.6: block free providers with a polite inline message. */
const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'aol.com',
  'icloud.com',
  'me.com',
  'msn.com',
  'proton.me',
  'protonmail.com',
  'gmx.com',
  'mail.com',
  'yandex.com',
  'zoho.com',
]);

export const workEmail = z
  .string()
  .trim()
  .min(1, 'Email is required.')
  .email('That doesn’t look like a valid email address.')
  .refine(
    (value) => !FREE_EMAIL_DOMAINS.has(value.split('@')[1]?.toLowerCase() ?? ''),
    'Please use your work email. That’s where the breakdown is most useful.',
  );

export const auditInputSchema = z.object({
  monthlyLeads: z.number().int().min(LIMITS.monthlyLeads.min).max(LIMITS.monthlyLeads.max),
  fastResponsePct: z.number().min(LIMITS.fastResponsePct.min).max(LIMITS.fastResponsePct.max),
  closeRate: z.number().min(LIMITS.closeRate.min).max(LIMITS.closeRate.max),
  customerValue: z.number().min(LIMITS.customerValue.min).max(LIMITS.customerValue.max),
  slowResponsePenalty: z
    .number()
    .min(LIMITS.slowResponsePenalty.min)
    .max(LIMITS.slowResponsePenalty.max),
  recoverabilityRate: z
    .number()
    .min(LIMITS.recoverabilityRate.min)
    .max(LIMITS.recoverabilityRate.max),
});

export const leadSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required.').max(120),
  email: workEmail,
  company: z.string().trim().min(1, 'Company name is required.').max(160),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  /** CASL — unchecked by default, governs marketing only (§8.6, §9.5). */
  marketingConsent: z.boolean(),

  audit: auditInputSchema,
  resultsUrl: z.string().max(600).optional(),
  sourcePage: z.string().max(200).optional(),

  utm: z
    .object({
      source: z.string().max(120).optional(),
      medium: z.string().max(120).optional(),
      campaign: z.string().max(120).optional(),
    })
    .optional(),

  /* --- Anti-spam, §9.4 --------------------------------------------------- */
  /**
   * Honeypot — a hidden field. Any value at all means a bot filled it.
   *
   * Deliberately NOT rejected here. If the schema failed it, the response would
   * be a 400 and the bot would learn that this field is a trap. It passes
   * validation and /api/lead answers 200 while dropping the payload, so a bot
   * gets a success it can learn nothing from.
   */
  website: z.string().max(200).optional(),
  /** Milliseconds between form mount and submit. Under 2s is rejected. */
  elapsedMs: z.number().int().nonnegative(),
});

export type LeadPayload = z.infer<typeof leadSchema>;

export const bookingSchema = z.object({
  revenueBand: z.enum(['<$1M', '$1–5M', '$5–20M', '$20M+']),
  monthlyLeads: z.number().int().min(0).max(1_000_000),
  driver: z.string().trim().min(1, 'A sentence is plenty.').max(2000),
  fullName: z.string().trim().min(2).max(120),
  email: workEmail,
  company: z.string().trim().min(1).max(160),
  marketingConsent: z.boolean(),
  auditResultsUrl: z.string().max(600).optional(),
  turnstileToken: z.string().max(4000).optional(),
  website: z.string().max(200).optional(), // honeypot — see the note above

  elapsedMs: z.number().int().nonnegative(),
});

export type BookingPayload = z.infer<typeof bookingSchema>;

/** Shared by client and server so the message a bot sees matches the real one. */
export const MIN_SUBMIT_MS = 2000;
