import type { Metadata } from 'next';
import Link from 'next/link';
import { PageFrame } from '@/components/layout/PageFrame';
import { SectionEyebrow } from '@/components/layout/SectionEyebrow';
import { ResultsHydrator } from './hydrator';
import { AUDIT_PARAM, decodeAudit } from '@/lib/audit/state';
import { calculateLeak, formatMoney } from '@/content/audit-model';

/**
 * /audit/results — §3.1.
 *
 * "Shareable/restorable results view, hydrated from URL state. NOT part of the
 *  live flow — the in-flow gate is inline (§8.6). This route exists so a shared
 *  or bookmarked link resolves."
 */

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstParam(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const params = await searchParams;
  const encoded = firstParam(params[AUDIT_PARAM]);
  const session = decodeAudit(encoded);

  if (!session) {
    return {
      title: 'Audit results',
      robots: { index: false, follow: true },
    };
  }

  const result = calculateLeak(session, {
    slowResponsePenalty: session.slowResponsePenalty,
    recoverabilityRate: session.recoverabilityRate,
  });
  const figure = formatMoney(result.annualLeak);

  return {
    title: `${figure} a year is leaking`,
    description: `Based on ${session.monthlyLeads} inquiries a month with ${session.fastResponsePct}% answered inside five minutes, ${figure} is leaving this business every year.`,
    // Shared links preview with the number visible (§8.8).
    openGraph: {
      title: `${figure} a year is leaking`,
      description: 'The Revenue Leak Audit · Hexona Systems',
      images: [{ url: `/api/og?s=${encoded}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [`/api/og?s=${encoded}`],
    },
    // A shared result is a private figure about someone's business.
    robots: { index: false, follow: true },
  };
}

export default async function AuditResultsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const session = decodeAudit(firstParam(params[AUDIT_PARAM]));

  if (!session) {
    return (
      <PageFrame>
        <div className="page-shell section-pad">
          <SectionEyebrow index="01" label="Audit results" className="mb-12" />
          <h1 className="type-display-2 mb-6 max-w-[20ch]">
            That link didn&apos;t carry any numbers.
          </h1>
          <p className="type-lead mb-10 max-w-[54ch] text-secondary">
            Results are encoded in the URL, so a truncated or edited link has nothing to restore.
            The audit takes under a minute to run again.
          </p>
          <Link
            href="/audit"
            className="type-label text-accent transition-colors hover:text-accent-bright"
          >
            Run the audit →
          </Link>
        </div>
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <div className="page-shell pb-24 pt-24 md:pt-32">
        <SectionEyebrow index="01" label="Audit results" className="mb-12" />
        <ResultsHydrator session={session} />
      </div>
    </PageFrame>
  );
}
