import 'server-only';

import { calculateLeak, tierFor } from '@/content/audit-model';
import type { LeadPayload } from './audit/schema';

/**
 * lib/crm.ts — §9.1 architecture.
 *
 *   Browser → POST /api/lead (server-side only)
 *           → validation, rate limit, honeypot + timing
 *           → Make.com webhook
 *               ├── GoHighLevel: upsert contact + custom fields + tags + opportunity
 *               ├── Transactional email: the breakdown
 *               ├── Slack #leads notification with the figure
 *               └── Sheet/warehouse row for analytics
 *
 * Hexona already runs GoHighLevel and Make.com, so this uses existing
 * infrastructure. NEVER call GHL directly from the browser — the API key stays
 * server-side, which is why this module is `server-only`.
 */

/**
 * §9.2 custom fields. The spec enumerates the 16 below while the prose says
 * "17 fields" and the Phase 3 acceptance criterion says "13" — three different
 * counts for the same list. Implemented as enumerated; flagged for Hamza.
 */
export interface GhlCustomFields {
  audit_monthly_leads: number;
  audit_fast_response_pct: number;
  audit_close_rate: number;
  audit_customer_value: number;
  audit_annual_leak: number;
  audit_monthly_leak: number;
  audit_deals_recoverable: number;
  audit_deals_lost_to_delay: number;
  audit_penalty_used: number;
  audit_recoverability_used: number;
  audit_completed_at: string;
  audit_results_url: string;
  lead_source_page: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

export interface CrmEnvelope {
  event: 'audit_lead';
  contact: {
    fullName: string;
    email: string;
    company: string;
    phone: string;
  };
  /** CASL — governs marketing only. The breakdown email is transactional. */
  marketingConsent: boolean;
  tags: string[];
  customFields: GhlCustomFields;
  meta: {
    annualLeakFormatted: string;
    tier: string;
    /** Slack alerts @channel above this tier (§9.3). */
    alertChannel: boolean;
  };
}

export function buildEnvelope(lead: LeadPayload, now = new Date()): CrmEnvelope {
  const result = calculateLeak(
    {
      monthlyLeads: lead.audit.monthlyLeads,
      fastResponsePct: lead.audit.fastResponsePct,
      closeRate: lead.audit.closeRate,
      customerValue: lead.audit.customerValue,
    },
    {
      slowResponsePenalty: lead.audit.slowResponsePenalty,
      recoverabilityRate: lead.audit.recoverabilityRate,
    },
  );

  const tier = tierFor(result.annualLeak);

  return {
    event: 'audit_lead',
    contact: {
      fullName: lead.fullName,
      email: lead.email,
      company: lead.company,
      phone: lead.phone ?? '',
    },
    marketingConsent: lead.marketingConsent,
    tags: ['audit-completed', tier],
    customFields: {
      audit_monthly_leads: lead.audit.monthlyLeads,
      audit_fast_response_pct: lead.audit.fastResponsePct,
      audit_close_rate: lead.audit.closeRate,
      audit_customer_value: lead.audit.customerValue,
      // Rounded only at the boundary — the model itself never rounds (§8.3).
      audit_annual_leak: Math.round(result.annualLeak),
      audit_monthly_leak: Math.round(result.monthlyLeak),
      audit_deals_recoverable: Number(result.dealsRecoverable.toFixed(2)),
      audit_deals_lost_to_delay: Number(result.dealsLostToDelay.toFixed(2)),
      audit_penalty_used: lead.audit.slowResponsePenalty,
      audit_recoverability_used: lead.audit.recoverabilityRate,
      audit_completed_at: now.toISOString(),
      audit_results_url: lead.resultsUrl ?? '',
      lead_source_page: lead.sourcePage ?? '',
      utm_source: lead.utm?.source ?? '',
      utm_medium: lead.utm?.medium ?? '',
      utm_campaign: lead.utm?.campaign ?? '',
    },
    meta: {
      annualLeakFormatted: `$${Math.round(result.annualLeak).toLocaleString('en-CA')}`,
      tier,
      alertChannel: tier === 'leak-tier-4',
    },
  };
}

export async function sendToCrm(envelope: CrmEnvelope): Promise<{ ok: boolean; reason?: string }> {
  const webhook = process.env.MAKE_WEBHOOK_URL;

  if (!webhook) {
    // Not configured yet. Do not fail the visitor's submission over plumbing —
    // they still get their breakdown. Surfaced loudly in the server log so this
    // cannot quietly reach production.
    console.warn('[crm] MAKE_WEBHOOK_URL is not set, lead not delivered:', envelope.contact.email);
    return { ok: false, reason: 'webhook-not-configured' };
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(process.env.MAKE_WEBHOOK_SECRET
          ? { 'x-hexona-signature': process.env.MAKE_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify(envelope),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.error('[crm] webhook rejected', res.status, await res.text().catch(() => ''));
      return { ok: false, reason: `webhook-${res.status}` };
    }
    return { ok: true };
  } catch (error) {
    console.error('[crm] webhook failed', error);
    return { ok: false, reason: 'webhook-error' };
  }
}
