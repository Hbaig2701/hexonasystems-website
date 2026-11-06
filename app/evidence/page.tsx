import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbLd, faqPageLd } from '@/lib/jsonld';
import { EVIDENCE_FAQS } from '@/content/faqs';
import { caseStudiesByIndustry, industryLabel, populatedIndustries } from '@/content/evidence';
import { PageHero } from '@/components/hx/PageHero';
import { Tilt } from '@/components/hx/Interactive';
import { CtaPair, FaqList, delay } from '@/components/hx/Blocks';

/**
 * /evidence — Case Studies. The URL is kept because every case page under it
 * is already indexed and linked; the label everywhere is "Case Studies".
 *
 * The industry filter is a plain link with ?industry=, so it works without JS.
 */

export const metadata: Metadata = {
  title: { absolute: 'Case Studies: Hexona Systems' },
  description:
    'Ten AI and automation case studies across home services, construction, hospitality, health, coaching and automotive, each measured in the client\'s systems.',
  alternates: { canonical: '/evidence' },
};

export default async function EvidencePage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string }>;
}) {
  const { industry } = await searchParams;
  const shelf = industry && industryLabel(industry) ? industry : undefined;
  const studies = caseStudiesByIndustry(shelf);
  const shelves = populatedIndustries();
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Case Studies', path: '/evidence' },
  ];

  return (
    <div className="hx">
      <JsonLd data={faqPageLd(EVIDENCE_FAQS, '/evidence')} />
      <JsonLd data={breadcrumbLd(trail)} />

      <PageHero
        trail={trail}
        eyebrow="Case studies"
        title={
          <>
            Results, <span className="hx-mark">measured.</span>
          </>
        }
        answer="What each business was losing, what we built, and what changed, measured in the client's own systems. Client names are withheld by agreement."
      >
        <CtaPair />
      </PageHero>

      <section id="records" aria-labelledby="list" className="hx-wrap scroll-mt-24 pb-28">
        <h2 id="list" className="sr-only">
          {shelf ? `Case studies: ${industryLabel(shelf)}` : 'All case studies'}
        </h2>
        <nav aria-label="Filter by industry" className="mb-10">
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {[{ id: '', label: 'All' }, ...shelves].map((s) => {
              const active = (s.id || undefined) === shelf;
              return (
                <li key={s.id || 'all'}>
                  <Link
                    href={s.id ? `/evidence?industry=${s.id}#records` : '/evidence#records'}
                    aria-current={active ? 'page' : undefined}
                    className="hx-pill"
                    style={active ? { background: 'var(--hx-teal)', color: '#FFFFFF' } : undefined}
                  >
                    {s.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="grid gap-6 md:grid-cols-2">
          {studies.map((c, i) => (
            <div key={c.slug} data-enter="up" style={delay((i % 2) * 100)}>
              <Tilt
                href={`/evidence/${c.slug}`}
                max={3}
                className="hx-card flex h-full flex-col gap-4 no-underline"
                style={{
                  background: '#FFFFFF',
                  color: 'var(--hx-ink)',
                  border: '1px solid var(--hx-line)',
                  borderTop: `6px solid ${['var(--hx-cyan)', 'var(--hx-teal)', 'var(--hx-cyan-light)'][i % 3]}`,
                  boxShadow: 'var(--hx-shadow-1)',
                }}
              >
                <span className="flex flex-wrap items-center justify-between gap-3 text-[14px]" style={{ color: 'var(--hx-ink-3)' }}>
                  <span>{c.sector}</span>
                  {c.basis !== 'measured' && (
                    <span className="rounded-full px-3 py-1 text-[12px] font-semibold" style={{ background: 'var(--hx-mist)', color: 'var(--hx-ink-2)' }}>
                      Results in progress
                    </span>
                  )}
                </span>
                <span className="flex flex-wrap items-baseline gap-x-3">
                  <span className="hx-serif text-[48px] leading-none" style={{ color: 'var(--hx-teal)' }}>
                    {c.headline.figure}
                  </span>
                  <span className="text-[15px] font-medium" style={{ color: 'var(--hx-ink-2)' }}>
                    {c.headline.label}
                  </span>
                </span>
                <span className="hx-serif text-[22px] leading-snug">{c.title}</span>
                <span className="mt-auto pt-2 text-[15px] font-medium" style={{ color: 'var(--hx-teal)' }}>
                  Read the case study <span aria-hidden="true">→</span>
                </span>
              </Tilt>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq" style={{ background: 'var(--hx-cyan-soft)' }}>
        <div className="hx-wrap grid gap-12 py-28 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-enter="up">
            <p className="hx-kicker m-0 mb-4">Questions</p>
            <h2 id="faq" className="hx-h2 m-0">
              About these results
            </h2>
          </div>
          <FaqList faqs={EVIDENCE_FAQS} />
        </div>
      </section>
    </div>
  );
}
