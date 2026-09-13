/**
 * lib/audit/state.ts — §8.8 State, sharing, persistence.
 *
 *  · Audit inputs encoded in the URL so results are shareable and survive refresh
 *  · Session state in sessionStorage so a visitor who navigates away and returns
 *    doesn't restart
 *  · ADJUSTED ASSUMPTIONS PERSIST TOO. If a visitor changes either model
 *    constant, those values are encoded alongside the four inputs — otherwise a
 *    shared link or a sales call reproduces a different number than the one the
 *    visitor actually saw, which is the fastest way to destroy the tool's
 *    credibility.
 */

import { LIMITS, MODEL, type AuditInput } from '@/content/audit-model';

export interface AuditSession extends AuditInput {
  /** The two model constants actually used, whether default or tuned. */
  slowResponsePenalty: number;
  recoverabilityRate: number;
}

export const AUDIT_PARAM = 's';
const STORAGE_KEY = 'hx-audit';

/**
 * Sized for the audience the site actually targets: operations already doing
 * $10M+. The old defaults (200 inquiries at $2,500) modelled a local services
 * business and produced a five-figure answer, which reads as irrelevant to a
 * buyer running an eight-figure company. These produce a seven-figure one,
 * which is the claim the site makes.
 */
export const DEFAULT_SESSION: AuditSession = {
  monthlyLeads: 600,
  fastResponsePct: 25,
  closeRate: 20,
  customerValue: 25_000,
  slowResponsePenalty: MODEL.slowResponsePenalty,
  recoverabilityRate: MODEL.recoverabilityRate,
};

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/**
 * Compact, dash-separated encoding: leads-fast-close-value-penalty-recoverability.
 * The two constants are stored as whole percentages so the string stays short
 * and stays legible in a pasted link.
 *
 *   /audit/results?s=200-25-20-3000-55-70
 */
export function encodeAudit(s: AuditSession): string {
  return [
    Math.round(s.monthlyLeads),
    Math.round(s.fastResponsePct),
    Math.round(s.closeRate),
    Math.round(s.customerValue),
    Math.round(s.slowResponsePenalty * 100),
    Math.round(s.recoverabilityRate * 100),
  ].join('-');
}

export function decodeAudit(raw: string | null | undefined): AuditSession | null {
  if (!raw) return null;
  const parts = raw.split('-').map(Number);
  if (parts.length < 4 || parts.some((n) => !Number.isFinite(n))) return null;

  const [leads, fast, close, value, penalty, recover] = parts;

  return {
    monthlyLeads: clamp(Math.round(leads), LIMITS.monthlyLeads.min, LIMITS.monthlyLeads.max),
    fastResponsePct: clamp(Math.round(fast), LIMITS.fastResponsePct.min, LIMITS.fastResponsePct.max),
    closeRate: clamp(Math.round(close), LIMITS.closeRate.min, LIMITS.closeRate.max),
    customerValue: clamp(Math.round(value), LIMITS.customerValue.min, LIMITS.customerValue.max),
    slowResponsePenalty: Number.isFinite(penalty)
      ? clamp(penalty / 100, LIMITS.slowResponsePenalty.min, LIMITS.slowResponsePenalty.max)
      : MODEL.slowResponsePenalty,
    recoverabilityRate: Number.isFinite(recover)
      ? clamp(recover / 100, LIMITS.recoverabilityRate.min, LIMITS.recoverabilityRate.max)
      : MODEL.recoverabilityRate,
  };
}

export function resultsUrl(s: AuditSession, origin = ''): string {
  return `${origin}/audit/results?${AUDIT_PARAM}=${encodeAudit(s)}`;
}

/* --- sessionStorage ------------------------------------------------------ */

export function saveSession(s: AuditSession): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, encodeAudit(s));
  } catch {
    // Private browsing / storage disabled. The URL still carries the state.
  }
}

export function loadSession(): AuditSession | null {
  try {
    return decodeAudit(sessionStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function clearSession(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* no-op */
  }
}

/** Set when the visitor passes the gate, so /book can attach the audit (§7.6). */
export function markGated(): void {
  try {
    sessionStorage.setItem(`${STORAGE_KEY}-gated`, '1');
  } catch {
    /* no-op */
  }
}

export function isGated(): boolean {
  try {
    return sessionStorage.getItem(`${STORAGE_KEY}-gated`) === '1';
  } catch {
    return false;
  }
}
