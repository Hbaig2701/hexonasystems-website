import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd, breadcrumbLd, recordLd } from '@/lib/jsonld';
import { CASE_STUDIES, type CaseStudy } from '@/content/evidence';
import { EMPLOYEES } from '@/content/employees';
import { INDUSTRY_LIST } from '@/content/industries';
import { PageHero } from '@/components/hx/PageHero';
import { CtaPair, RoleCard, delay } from '@/components/hx/Blocks';

/**
 * A single case study.
 *
 * The honesty rules from v2 carry over unchanged, because they are the reason
 * the numbers are believable: a projected study shows what was FOUND and says
 * plainly that results are in progress; every study ends with how it was
 * measured; client names are withheld unless the client agreed in writing.
 */

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

const find = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);

function metaDescription(study: CaseStudy): string {
  const where = `${study.sector}, client name withheld.`;
  const body =
    study.basis === 'measured'
      ? [study.found ? `${study.found} found` : null, study.result].filter(Boolean).join(', ') + '.'
      : `${study.found ?? study.headline.figure}. Built and live; final results in progress.`;
  const full = `${body} ${where}`;
  return full.length <= 160 ? full : `${body} ${study.sector}.`.slice(0, 160);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = find(slug);
  if (!study) return { title: 'Case study not found' };
  return {
    title: study.metaTitle ?? study.sector,
    description: metaDescription(study),
    alternates: { canonical: `/evidence/${study.slug}` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = find(slug);
  if (!study) notFound();
  const projected = study.basis === 'projected';
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Case Studies', path: '/evidence' },
    { name: study.metaTitle ?? study.sector, path: `/evidence/${study.slug}` },
  ];
  // Internal links: the AI employees and industry pages that cite this case.
  const employees = EMPLOYEES.filter((e) => e.page?.proof.some((p) => p.caseSlug === study.slug));
  const industries = INDUSTRY_LIST.filter((i) => i.page?.proof.some((p) => p.caseSlug === study.slug));

  const figures = projected
    ? [
        { label: study.foundFigure ? 'Found before the build' : 'Delivered', figure: study.foundFigure ?? study.headline.figure, note: study.foundFigure ? study.found : study.headline.label },
        { label: 'Status', figure: 'In progress', note: 'Built and live. The measurement period has not closed yet.' },
      ]
    : [
        { label: 'Found before the build', figure: study.foundFigure ?? '—', note: study.found },
        { label: 'Result', figure: study.headline.figure, note: study.headline.label },
        { label: 'Window', figure: study.window ?? 'Not stated', note: study.window ? undefined : 'The source does not state one. See how this was measured, below.' },
      ];

  return (
    <div className="hx">
      <JsonLd data={recordLd({ slug: study.slug, title: study.title, description: metaDescription(study) })} />
      <JsonLd data={breadcrumbLd(trail)} />

      <PageHero
        trail={trail}
        eyebrow={[study.sector, study.region, study.clientName].filter(Boolean).join(' · ')}
        title={study.title}
        answer={
          projected
            ? 'This system is live and the measurement period has not closed. The figures below are what the business was losing before the build. Anything forward-looking is labelled a projection.'
            : study.situation[0]
        }
      >
        <CtaPair secondary={{ label: 'All case studies', href: '/evidence' }} />
      </PageHero>

      <section aria-label="Key figures" className="hx-band">
        <div className={`hx-wrap relative grid gap-8 py-14 ${figures.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {figures.map((f, i) => (
            <div key={f.label} data-enter="up" style={delay(i * 100)}>
              <div className="hx-kicker" style={{ color: 'var(--hx-cyan-light)' }}>
                {f.label}
              </div>
              <div className="hx-figure mt-2">{f.figure}</div>
              {f.note && (
                <div className="mt-2 max-w-[22rem] text-[14px] leading-relaxed" style={{ color: 'var(--hx-on-teal)' }}>
                  {f.note}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <article className="hx-wrap py-24">
        <div className="mx-auto max-w-[52rem]">
          <section aria-labelledby="situation" data-enter="up">
            <h2 id="situation" className="hx-h2 m-0">
              The situation
            </h2>
            <div className="hx-prose mt-6">
              {(projected ? study.situation : study.situation.slice(1)).map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="found" className="mt-20" data-enter="up">
            <h2 id="found" className="hx-h2 m-0">
              What we found
            </h2>
            <ul className="m-0 mt-8 flex list-none flex-col gap-3 p-0">
              {study.whatWeFound.map((f) => (
                <li key={f.leak} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl px-6 py-5" style={{ background: 'var(--hx-cyan-soft)' }}>
                  <span className="max-w-[32rem] text-[16px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                    {f.leak}
                  </span>
                  {f.figure && (
                    <span className="hx-serif text-[24px]" style={{ color: 'var(--hx-teal)' }}>
                      {f.figure}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="built" className="mt-20" data-enter="up">
            <h2 id="built" className="hx-h2 m-0">
              What we built
            </h2>
            <ol className="m-0 mt-8 flex list-none flex-col gap-4 p-0">
              {study.whatWeBuilt.map((b, i) => (
                <li key={b.slice(0, 30)} className="flex gap-5">
                  <span className="hx-serif flex h-9 w-9 flex-none items-center justify-center rounded-full text-[16px]" style={{ background: 'var(--hx-teal)', color: '#FFFFFF' }}>
                    {i + 1}
                  </span>
                  <span className="pt-1 text-[17px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                    {b}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="changed" className="mt-20" data-enter="up">
            <h2 id="changed" className="hx-h2 m-0">
              {projected ? 'What is expected' : 'What changed'}
            </h2>
            {projected && (
              <p className="m-0 mt-6 text-[17px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                Nothing in this section is a measured result. Any before-and-after figures are the
                delivered system as the client reports it, and everything else is a projection from
                measurements taken before the build.
              </p>
            )}
            {study.whatChanged && study.whatChanged.length > 0 && (
              <div className="mt-8 overflow-x-auto rounded-3xl" style={{ border: '1px solid var(--hx-line)' }}>
                <table className="w-full min-w-[520px] border-collapse text-left text-[16px]">
                  <caption className="sr-only">{projected ? 'Reported before and after' : 'Measured before and after'}</caption>
                  <thead>
                    <tr style={{ background: 'var(--hx-cyan-soft)' }}>
                      <th scope="col" className="p-4 font-semibold" style={{ fontFamily: 'inherit' }}>Metric</th>
                      <th scope="col" className="p-4 font-semibold" style={{ fontFamily: 'inherit' }}>Before</th>
                      <th scope="col" className="p-4 font-semibold" style={{ fontFamily: 'inherit', color: 'var(--hx-teal)' }}>After</th>
                    </tr>
                  </thead>
                  <tbody>
                    {study.whatChanged.map((c) => (
                      <tr key={c.metric} style={{ borderTop: '1px solid var(--hx-line)' }}>
                        <th scope="row" className="p-4 font-medium" style={{ fontFamily: 'inherit' }}>{c.metric}</th>
                        <td className="p-4" style={{ color: 'var(--hx-ink-2)' }}>{c.before}</td>
                        <td className="p-4 font-semibold" style={{ color: 'var(--hx-teal)' }}>{c.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <ul className="m-0 mt-8 grid list-none gap-3 p-0 sm:grid-cols-2">
              {study.outcomes.map((o) => (
                <li key={o} className="flex gap-3 rounded-2xl p-5" style={{ border: '1px solid var(--hx-line)' }}>
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--hx-cyan)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-none">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  <span className="text-[16px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                    {o}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="measured" className="mt-20 rounded-3xl p-8" style={{ background: 'var(--hx-mist)' }} data-enter="up">
            <h2 id="measured" className="hx-h3 m-0">
              {projected ? 'What has and has not been measured' : 'How this was measured'}
            </h2>
            <p className="m-0 mt-4 text-[17px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
              {study.verification}
            </p>
            {!study.clientName && (
              <p className="m-0 mt-4 text-[15px]" style={{ color: 'var(--hx-ink-3)' }}>
                The client&rsquo;s name is withheld by agreement. The figures are unaltered.
              </p>
            )}
          </section>
        </div>
      </article>

      {(employees.length > 0 || industries.length > 0) && (
        <section aria-labelledby="related" style={{ background: 'var(--hx-cyan-soft)' }}>
          <div className="hx-wrap py-24">
            <h2 id="related" className="hx-h2 m-0" data-enter="up">
              The AI employees behind results like this
            </h2>
            {employees.length > 0 && (
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {employees.slice(0, 3).map((e, i) => (
                  <RoleCard key={e.slug} employee={e} index={i + 1} />
                ))}
              </div>
            )}
            {industries.length > 0 && (
              <p className="m-0 mt-10 flex flex-wrap items-center gap-3" data-enter="up">
                <span className="text-[15px]" style={{ color: 'var(--hx-ink-3)' }}>
                  Industries:
                </span>
                {industries.map((ind) => (
                  <Link key={ind.slug} href={`/industries/${ind.slug}`} className="hx-pill" style={{ background: '#FFFFFF' }}>
                    {ind.name} <span aria-hidden="true" className="ml-2">→</span>
                  </Link>
                ))}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
