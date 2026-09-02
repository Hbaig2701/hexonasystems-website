import { describe, expect, it } from 'vitest';
import {
  calculateLeak,
  formatDeals,
  formatMoney,
  MODEL,
  tierFor,
  type AuditInput,
} from './audit-model';

/**
 * Phase 3 acceptance (§14): "The §8.3 worked example produces exactly $415,800
 * in a passing unit test."
 */

describe('calculateLeak — the §8.3 worked example', () => {
  const input: AuditInput = {
    monthlyLeads: 200,
    fastResponsePct: 25,
    closeRate: 20,
    customerValue: 3000,
  };
  const r = calculateLeak(input);

  it('splits leads into fast and slow', () => {
    expect(r.slowLeads).toBe(150); // fastLeads 50, slowLeads 150
  });

  it('computes currentDeals as 23.5', () => {
    // 10 + (150 × 0.20 × 0.45) = 10 + 13.5
    expect(r.currentDeals).toBeCloseTo(23.5, 10);
  });

  it('computes potentialDeals as 40', () => {
    expect(r.potentialDeals).toBeCloseTo(40, 10);
  });

  it('computes dealsLostToDelay as 16.5 — what delay COSTS', () => {
    expect(r.dealsLostToDelay).toBeCloseTo(16.5, 10);
  });

  it('computes dealsRecoverable as 11.55 — what we believe is RECOVERABLE', () => {
    // (40 − 23.5) × 0.70
    expect(r.dealsRecoverable).toBeCloseTo(11.55, 10);
  });

  it('produces exactly $34,650 monthly and $415,800 annual', () => {
    expect(Math.round(r.monthlyLeak)).toBe(34_650);
    expect(Math.round(r.annualLeak)).toBe(415_800);
  });

  it('renders the headline figure as $415,800', () => {
    expect(formatMoney(r.annualLeak)).toBe('$415,800');
  });

  it('renders deal counts to two decimals so the chain reconciles by hand', () => {
    expect(formatDeals(r.dealsRecoverable)).toBe('11.55');
    expect(formatDeals(r.dealsLostToDelay)).toBe('16.50');
    expect(formatDeals(r.currentDeals)).toBe('23.50');
    expect(formatDeals(r.potentialDeals)).toBe('40.00');
  });

  it('displayed breakdown multiplies out to the displayed total (§8.3)', () => {
    // A skeptical CFO checking by hand: 11.55 × $3,000 × 12 = $415,800
    const byHand = Number(formatDeals(r.dealsRecoverable)) * input.customerValue * 12;
    expect(formatMoney(byHand)).toBe(formatMoney(r.annualLeak));
  });
});

describe('calculateLeak — edges', () => {
  it('returns zero leak when every lead is already answered fast', () => {
    const r = calculateLeak({
      monthlyLeads: 500,
      fastResponsePct: 100,
      closeRate: 30,
      customerValue: 5000,
    });
    expect(r.dealsLostToDelay).toBeCloseTo(0, 10);
    expect(r.annualLeak).toBeCloseTo(0, 10);
  });

  it('scales the leak with the penalty when a visitor tunes the assumptions', () => {
    const input: AuditInput = {
      monthlyLeads: 200,
      fastResponsePct: 25,
      closeRate: 20,
      customerValue: 3000,
    };
    const conservative = calculateLeak(input, { ...MODEL, slowResponsePenalty: 0.3 });
    const aggressive = calculateLeak(input, { ...MODEL, slowResponsePenalty: 0.8 });
    expect(conservative.annualLeak).toBeLessThan(aggressive.annualLeak);
    // Still a serious number at the conservative end — the point of §8.4's
    // "adjust assumptions" affordance.
    expect(conservative.annualLeak).toBeGreaterThan(200_000);
  });
});

describe('tierFor — §9.3 half-open boundaries', () => {
  it('maps each boundary value to exactly one tier', () => {
    expect(tierFor(0)).toBe('leak-tier-1');
    expect(tierFor(49_999)).toBe('leak-tier-1');
    expect(tierFor(50_000)).toBe('leak-tier-2');
    expect(tierFor(249_999)).toBe('leak-tier-2');
    expect(tierFor(250_000)).toBe('leak-tier-3');
    expect(tierFor(999_999)).toBe('leak-tier-3');
    expect(tierFor(1_000_000)).toBe('leak-tier-4');
    expect(tierFor(50_000_000)).toBe('leak-tier-4');
  });

  it('puts the worked example in tier 3', () => {
    expect(tierFor(415_800)).toBe('leak-tier-3');
  });
});
