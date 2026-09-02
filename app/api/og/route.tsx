import { ImageResponse } from 'next/og';
import { calculateLeak, formatDeals, formatMoney } from '@/content/audit-model';
import { decodeAudit } from '@/lib/audit/state';

/**
 * GET /api/og?s=200-25-20-3000-55-70 — §8.8.
 *
 * "Auto-generated OG image rendering the headline figure, so a shared link
 *  previews with the number visible. This is a genuine viral mechanic."
 *
 * Rendered from the same encoded state the results page hydrates from, so the
 * preview and the page can never disagree.
 */

export const runtime = 'edge';

const BASE = '#0A0C10';
const SURFACE = '#101318';
const HAIRLINE = '#1C212A';
const ACCENT = '#22D3EE';
const PRIMARY = '#F4F6F8';
const SECONDARY = '#A8B1BD';
const QUATERNARY = '#767E8A';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const session = decodeAudit(searchParams.get('s'));

  const result = session
    ? calculateLeak(session, {
        slowResponsePenalty: session.slowResponsePenalty,
        recoverabilityRate: session.recoverabilityRate,
      })
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 28,
          background: BASE,
          padding: 60,
          // The background grid field, §4.5 — same 72px module as the site.
          backgroundImage:
            'linear-gradient(to right, #12161C 1px, transparent 1px), linear-gradient(to bottom, #12161C 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              background: ACCENT,
              transform: 'rotate(45deg)',
              display: 'flex',
            }}
          />
          <div
            style={{
              color: PRIMARY,
              fontSize: 22,
              letterSpacing: 6,
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Hexona Systems
          </div>
        </div>

        {result && session ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: SECONDARY, fontSize: 26, letterSpacing: 3, display: 'flex' }}>
              BASED ON THEIR NUMBERS
            </div>
            <div
              style={{
                color: ACCENT,
                fontSize: 128,
                lineHeight: 1,
                marginTop: 14,
                letterSpacing: -4,
                display: 'flex',
              }}
            >
              {formatMoney(result.annualLeak)}
            </div>
            <div
              style={{
                color: PRIMARY,
                fontSize: 34,
                marginTop: 26,
                letterSpacing: 2,
                display: 'flex',
              }}
            >
              LEAVING THIS BUSINESS EVERY YEAR
            </div>
            <div
              style={{
                display: 'flex',
                gap: 44,
                marginTop: 36,
                paddingTop: 26,
                borderTop: `1px solid ${HAIRLINE}`,
              }}
            >
              <Stat label="Inquiries / month" value={String(session.monthlyLeads)} />
              <Stat label="Answered in 5 min" value={`${session.fastResponsePct}%`} />
              <Stat
                label="Recoverable deals / month"
                value={formatDeals(result.dealsRecoverable)}
              />
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                color: PRIMARY,
                fontSize: 96,
                lineHeight: 1.02,
                letterSpacing: -3,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span>Your revenue isn&apos;t lost.</span>
              <span>
                It&apos;s <span style={{ color: ACCENT }}>leaking</span>.
              </span>
            </div>
            <div style={{ color: SECONDARY, fontSize: 30, marginTop: 28, display: 'flex' }}>
              Run the Revenue Leak Audit. Four questions, under a minute.
            </div>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: SURFACE,
            border: `1px solid ${HAIRLINE}`,
            borderRadius: 6,
            padding: '18px 26px',
          }}
        >
          <div style={{ color: QUATERNARY, fontSize: 22, letterSpacing: 2, display: 'flex' }}>
            THE REVENUE LEAK AUDIT
          </div>
          <div style={{ color: SECONDARY, fontSize: 22, display: 'flex' }}>
            hexonasystems.com/audit
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ color: PRIMARY, fontSize: 40, display: 'flex' }}>{value}</div>
      <div style={{ color: QUATERNARY, fontSize: 20, letterSpacing: 2, display: 'flex' }}>
        {label.toUpperCase()}
      </div>
    </div>
  );
}
