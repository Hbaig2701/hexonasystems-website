'use client';

import { Button } from '@/components/ui/Button';
import { DataPanel } from '@/components/ui/DataPanel';
import { SectionEyebrow } from '@/components/layout/SectionEyebrow';
import {
  comparableCase,
  INDUSTRY_BENCHMARKS,
  LEAK_SOURCES,
  LEAK_SOURCES_ATTRIBUTED,
  sealingSketch,
} from '@/content/breakdown';
import { formatMoney, type AuditResult } from '@/content/audit-model';
import { resultsUrl, type AuditSession } from '@/lib/audit/state';

/**
 * §8.7 — THE BREAKDOWN (post-gate).
 *
 * Everything from §8.4, plus the industry benchmark, the ranked leak sources,
 * the sealing sketch for their volume band, an auto-matched comparable case,
 * and a booking CTA with their figures pre-attached.
 */

export function Breakdown({ session, result }: { session: AuditSession; result: AuditResult }) {
  const sketch = sealingSketch(session.monthlyLeads);
  const comparable = comparableCase(result.annualLeak);
  const share = resultsUrl(session);

  return (
    <div className="flex flex-col gap-16 rounded-md border border-hairline bg-surface p-7 md:p-12">
      <div>
        <p className="type-label mb-4 text-accent">Unlocked</p>
        <h3 className="type-display-3 max-w-[26ch]">
          {formatMoney(result.annualLeak)}, itemised, and what closing it looks like.
        </h3>
        <p className="type-micro mt-4 text-quaternary">
          A copy is on its way to your inbox. One email, as promised.
        </p>
      </div>

      {/* ---- Industry benchmark ------------------------------------------- */}
      <section>
        <SectionEyebrow index="01" label="Your benchmark" className="mb-8" />
        {INDUSTRY_BENCHMARKS.length > 0 ? (
          <p className="type-body max-w-[60ch] text-secondary">
            Benchmark comparison renders here once industry medians are configured.
          </p>
        ) : (
          <div className="rounded-md border border-dashed border-hairline-bright bg-surface-inset p-6">
            <p className="type-label mb-3 text-leak">Asset pending · industry benchmark</p>
            <p className="type-body max-w-[60ch] text-secondary">
              §8.7 requires real median response times by sector to render this module. Supply the
              data, or cut the module. An invented benchmark is worse than no benchmark, and this
              is exactly the figure a sophisticated buyer checks.
            </p>
          </div>
        )}
      </section>

      {/* ---- The three biggest leak sources ------------------------------- */}
      <section>
        <SectionEyebrow index="02" label="Where it leaks, ranked" className="mb-8" />
        <div className="flex flex-col">
          {LEAK_SOURCES.map((source) => (
            <div
              key={source.rank}
              className="flex flex-col gap-3 border-t border-hairline py-6 md:flex-row md:gap-8"
            >
              <span className="type-figure shrink-0 text-[15px] text-accent md:w-16">
                {String(source.rank).padStart(2, '0')}
              </span>
              <div>
                <h4 className="mb-2 text-[18px] font-medium text-primary">{source.title}</h4>
                <p className="type-body max-w-[62ch] text-secondary">{source.detail}</p>
              </div>
            </div>
          ))}
        </div>
        {!LEAK_SOURCES_ATTRIBUTED && (
          <p className="type-micro mt-6 max-w-[62ch] text-quaternary">
            <span className="text-leak">Ranking is qualitative.</span> §8.3 folds &ldquo;never
            reached&rdquo; and &ldquo;reached late&rdquo; into one blended constant on purpose, so a
            dollar split across these three cannot be derived from the model. It comes from
            Hexona&apos;s implementation data. We size them against your operation on the call.
          </p>
        )}
      </section>

      {/* ---- What sealing it looks like ----------------------------------- */}
      <section>
        <SectionEyebrow index="03" label="What sealing it looks like" className="mb-8" />
        <DataPanel header={sketch.band} headerRight={`${session.monthlyLeads} inquiries / month`}>
          <ol className="flex flex-col">
            {sketch.steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-5 border-b border-hairline py-4 last:border-b-0 last:pb-0"
              >
                <span className="type-micro mt-1 shrink-0 text-quaternary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="type-body max-w-[60ch] text-secondary">{step}</span>
              </li>
            ))}
          </ol>
        </DataPanel>
      </section>

      {/* ---- Comparable case ---------------------------------------------- */}
      <section>
        <SectionEyebrow index="04" label="A comparable build" className="mb-8" />
        <p className="type-body mb-6 max-w-[60ch] text-secondary">
          Closest to your figures in our launch set: {comparable.label}.
        </p>
        <Button href={`/work/${comparable.slug}`} variant="secondary" arrow>
          Read the full breakdown
        </Button>
      </section>

      {/* ---- CTA ----------------------------------------------------------- */}
      <section className="border-t border-hairline pt-10">
        <h4 className="type-display-3 mb-4 max-w-[24ch]">
          Thirty minutes, and we map your gaps live.
        </h4>
        <p className="type-body mb-8 max-w-[56ch] text-secondary">
          If there isn&apos;t enough leakage to justify a build, we&apos;ll say so.
        </p>
        <Button href={`/book?audit=${encodeURIComponent(share)}`} variant="primary" size="large" arrow>
          Book a systems review
        </Button>
        <p className="type-micro mt-4 text-quaternary">
          Your audit results will be attached to this booking.
        </p>
      </section>
    </div>
  );
}
