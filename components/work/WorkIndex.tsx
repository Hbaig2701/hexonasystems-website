'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/cn';
import type { CaseStudy } from '@/content/cases';

/** §7.3 — the index, filterable by industry. */
export function WorkIndex({ cases }: { cases: CaseStudy[] }) {
  const industries = useMemo(
    () => ['All', ...Array.from(new Set(cases.map((c) => c.industry)))],
    [cases],
  );
  const [filter, setFilter] = useState('All');

  const visible = filter === 'All' ? cases : cases.filter((c) => c.industry === filter);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {industries.map((industry) => (
          <button
            key={industry}
            type="button"
            onClick={() => setFilter(industry)}
            aria-pressed={filter === industry}
            className={cn(
              'rounded-md border px-4 py-2 text-[13px] transition-all duration-[240ms]',
              filter === industry
                ? 'border-accent bg-accent-wash text-primary'
                : 'border-hairline text-secondary hover:border-hairline-bright hover:text-primary',
            )}
          >
            {industry}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((study) => (
          <Card
            key={study.slug}
            href={`/work/${study.slug}`}
            className="group/card flex h-full flex-col p-7"
          >
            <p className="type-label mb-6 text-quaternary">
              {study.industry} · {study.region}
            </p>

            {study.headline ? (
              <>
                <p className="type-figure mb-3 text-[clamp(2rem,3.4vw,2.8rem)] text-accent">
                  {study.headline.value}
                </p>
                <p className="type-label mb-6 text-tertiary">{study.headline.label}</p>
              </>
            ) : (
              <div className="mb-6 rounded-md border border-dashed border-hairline-bright p-4">
                <p className="type-label mb-2 text-leak">Asset pending</p>
                <p className="type-micro text-quaternary">
                  Headline metric required before launch (§7.1 S5).
                </p>
              </div>
            )}

            <p className="text-small mb-5 text-secondary">{study.problem}</p>

            {/* Hover reveals the full result set (§7.3). Height animates rather
                than display, so nothing pops. */}
            {study.metrics.length > 0 && (
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:grid-rows-[1fr] group-focus-visible/card:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <dl className="border-t border-hairline pt-4">
                    {study.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex items-baseline justify-between gap-4 py-1.5"
                      >
                        <dt className="type-micro text-quaternary">{metric.label}</dt>
                        <dd className="type-figure text-[13px] text-sealed">{metric.after}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            <span className="type-label mt-auto pt-6 text-tertiary transition-colors group-hover/card:text-accent">
              Read the case →
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}
