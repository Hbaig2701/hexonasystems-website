/**
 * content/audit-model.ts — all constants in ONE place, adjustable by Hamza.
 * Spec §8.3.
 */

export interface AuditInput {
  monthlyLeads: number; // Q1 · integer, 1–100,000
  fastResponsePct: number; // Q2 · 0–100
  closeRate: number; // Q3 · 1–100 — of leads you ACTUALLY SPEAK TO
  customerValue: number; // Q4 · 1–10,000,000 (first-year value, whole dollars)
}

export interface AuditResult {
  monthlyLeak: number; // $
  annualLeak: number; // $
  dealsRecoverable: number; // deals/mo, AFTER the haircut — the number we bill against
  dealsLostToDelay: number; // deals/mo lost to slow response, BEFORE the haircut
  slowLeads: number;
  currentDeals: number;
  potentialDeals: number;
}

export const MODEL = {
  // Conversion penalty applied to leads not reached within 5 minutes.
  // 0.55 means slow-response leads convert 55% worse than fast ones.
  // CONSERVATIVE by design. See §8.5 on defensibility.
  slowResponsePenalty: 0.55,

  // Share of delay-lost deals that instant response actually recovers.
  // Not all are recoverable — some were never real. This haircut keeps it honest.
  recoverabilityRate: 0.7,
};

/**
 * ⚠️ [ASSET NEEDED · §8.5] `slowResponsePenalty` must be attributed before
 * launch, to either:
 *   (a) a citable public study on lead response time, linked directly beneath
 *       the model, or
 *   (b) Hexona's own observed client data, stated as such:
 *       "Based on outcomes across N Hexona implementations."
 * Option (b) is stronger and Hamza has the data. DO NOT SHIP AN UNATTRIBUTED
 * CONSTANT — the attribution renders from here, and is deliberately visible in
 * the UI as a pending placeholder until it is filled in.
 */
export const MODEL_SOURCE = {
  attributed: false,
  /** Rendered beneath the model once `attributed` flips to true. */
  text: '',
  href: '',
} as const;

/** Bounds enforced by both the UI and the server-side zod schema (§9.1). */
export const LIMITS = {
  monthlyLeads: { min: 1, max: 100_000 },
  fastResponsePct: { min: 0, max: 100 },
  closeRate: { min: 1, max: 100 },
  customerValue: { min: 1, max: 10_000_000 },
  /** The two model constants, when a visitor tunes them (§8.4). */
  slowResponsePenalty: { min: 0.2, max: 0.9 },
  recoverabilityRate: { min: 0.3, max: 1.0 },
} as const;

export function calculateLeak(
  input: AuditInput,
  model: { slowResponsePenalty: number; recoverabilityRate: number } = MODEL,
): AuditResult {
  const { monthlyLeads: L, fastResponsePct: R, closeRate: C, customerValue: V } = input;

  const fastLeads = L * (R / 100);
  const slowLeads = L - fastLeads;

  // NOTE ON THE CLOSE-RATE BASE.
  // Q3 asks for the close rate among leads you actually speak to. Fast-response
  // leads are, by definition, spoken to — so C applies to them directly. Slow
  // leads are penalised: fewer are reached at all, and those reached convert worse.
  // Both effects are folded into slowResponsePenalty, which is why it is a single
  // blended constant rather than two. Do not apply C to the raw lead count without
  // the penalty — that would assume perfect contact, which no business achieves.
  const currentDeals =
    fastLeads * (C / 100) + slowLeads * (C / 100) * (1 - model.slowResponsePenalty);

  // Ceiling: every lead reached inside five minutes, closing at the same rate.
  const potentialDeals = L * (C / 100);

  const dealsLostToDelay = potentialDeals - currentDeals;
  const dealsRecoverable = dealsLostToDelay * model.recoverabilityRate;

  return {
    monthlyLeak: dealsRecoverable * V,
    annualLeak: dealsRecoverable * V * 12,
    dealsRecoverable,
    dealsLostToDelay,
    slowLeads,
    currentDeals,
    potentialDeals,
  };
}

/* ---------------------------------------------------------------------------
 * RENDERING — §8.3 rounding rule.
 *
 * All arithmetic runs on unrounded floats. Rounding happens ONLY at render, and
 * the displayed breakdown must always multiply out to the displayed total.
 * Deal counts render to TWO DECIMALS (11.55, not 11.6) precisely so a visitor
 * checking the chain by hand arrives at the same figure. Currency renders to
 * whole dollars. Never round an intermediate value and then multiply it.
 * ------------------------------------------------------------------------ */

export function formatDeals(n: number): string {
  return n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatMoney(n: number): string {
  return `$${Math.round(n).toLocaleString('en-CA')}`;
}

export function formatCompactMoney(n: number): string {
  const rounded = Math.round(n);
  if (rounded >= 1_000_000) return `$${(rounded / 1_000_000).toFixed(1)}M`;
  if (rounded >= 1_000) return `$${Math.round(rounded / 1_000)}K`;
  return `$${rounded}`;
}

/* ---------------------------------------------------------------------------
 * SEGMENTATION — §9.3. Boundaries are half-open (lower inclusive, upper
 * exclusive) so no value maps to two tiers.
 * ------------------------------------------------------------------------ */

export type LeakTier = 'leak-tier-1' | 'leak-tier-2' | 'leak-tier-3' | 'leak-tier-4';

export function tierFor(annualLeak: number): LeakTier {
  if (annualLeak < 50_000) return 'leak-tier-1';
  if (annualLeak < 250_000) return 'leak-tier-2';
  if (annualLeak < 1_000_000) return 'leak-tier-3';
  return 'leak-tier-4';
}
