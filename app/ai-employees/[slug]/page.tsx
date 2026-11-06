import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EMPLOYEES, employeesWithPages, getEmployee } from '@/content/employees';
import { getIndustry } from '@/content/industries';
import { PageHero } from '@/components/hx/PageHero';
import { Conversation } from '@/components/hx/Conversation';
import { Tilt } from '@/components/hx/Interactive';
import { CtaPair, FaqList, Icon, ProofCard, RoleCard, SectionHead, delay } from '@/components/hx/Blocks';
import { JsonLd, aiServiceLd, breadcrumbLd, faqPageLd } from '@/lib/jsonld';

export function generateStaticParams() {
  return employeesWithPages().map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getEmployee(slug);
  if (!e?.page) return {};
  return {
    title: e.page.metaTitle,
    description: e.page.metaDescription,
    alternates: { canonical: `/ai-employees/${e.slug}` },
  };
}

export default async function EmployeePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEmployee(slug);
  if (!e?.page) notFound();
  const p = e.page;
  const path = `/ai-employees/${e.slug}`;
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'AI Employees', path: '/ai-employees' },
    { name: e.name, path },
  ];
  const others = EMPLOYEES.filter((o) => o.slug !== e.slug).slice(0, 3);

  return (
    <div className="hx">
      <JsonLd data={breadcrumbLd(trail)} />
      <JsonLd data={aiServiceLd({ path, name: e.name, serviceType: `${e.name} implementation`, description: p.answer, audience: 'Service businesses' })} />
      <JsonLd data={faqPageLd(p.faqs, path)} />

      <PageHero
        trail={trail}
        eyebrow={`AI Employee · Moves ${e.driver}`}
        title={p.h1}
        answer={p.answer}
        aside={p.demo && <Conversation {...p.demo} />}
      >
        <CtaPair secondary={{ label: 'How it works', href: '#how' }} />
      </PageHero>

      {/* The problem, in the reader's words. */}
      <section aria-labelledby="problem" className="hx-band">
        <div className="hx-wrap relative grid gap-10 py-20 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div data-enter="up">
            <h2 id="problem" className="hx-h2 m-0" style={{ color: '#FFFFFF' }}>
              Sound familiar?
            </h2>
            <p className="m-0 mt-5 max-w-[34rem] text-[18px] leading-relaxed" style={{ color: 'var(--hx-on-teal)' }}>
              {p.intro}
            </p>
          </div>
          <ul className="m-0 grid list-none gap-3 p-0">
            {p.problems.map((x, i) => (
              <li
                key={x}
                data-enter="up"
                style={{ ...delay(i * 100), background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(127,227,234,0.2)' }}
                className="flex items-center gap-4 rounded-2xl px-5 py-4 text-[17px]"
              >
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-[14px]" style={{ background: 'var(--hx-cyan)', color: 'var(--hx-teal-ink)' }} aria-hidden="true">
                  ✕
                </span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="does" className="hx-wrap py-28">
        <SectionHead id="does" kicker="What it does" title={<>What the {e.name} handles, <span className="hx-mark">around the clock.</span></>} />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {p.does.map((d, i) => (
            <div key={d.title} data-enter="up" style={delay((i % 3) * 90)}>
              <Tilt max={4} className="hx-card h-full" style={{ background: i % 2 ? 'var(--hx-mist)' : 'var(--hx-cyan-soft)' }}>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: '#FFFFFF', color: 'var(--hx-teal)', boxShadow: 'var(--hx-shadow-1)' }}>
                  <span className="hx-serif text-[18px]">{i + 1}</span>
                </span>
                <h3 className="m-0 mt-5 text-[21px] font-semibold">{d.title}</h3>
                <p className="m-0 mt-2 text-[16px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                  {d.text}
                </p>
              </Tilt>
            </div>
          ))}
        </div>
      </section>

      {p.proof.length > 0 && (
        <section aria-labelledby="proof" className="hx-wrap pb-28">
          <SectionHead id="proof" kicker="Proof" title="What it changed for clients." />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {p.proof.map((pr, i) => (
              <ProofCard key={pr.caseSlug} proof={pr} index={i} />
            ))}
          </div>
        </section>
      )}

      <section id="how" aria-labelledby="how-h" style={{ background: 'var(--hx-cyan-soft)' }}>
        <div className="hx-wrap py-28">
          <SectionHead id="how-h" kicker="How we set it up" title="Built for you. Run by us." text="You don't learn any software. We build it around how your business already works, then keep improving it." />
          <div className="relative mt-16" data-enter="up">
            <div className="hx-steps-line hidden lg:block" aria-hidden="true" />
            <ol className="relative m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-4">
              {p.steps.map((s, i) => (
                <li key={s.title} data-enter="up" style={delay(200 + i * 160)}>
                  <span
                    className="hx-serif relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-[20px]"
                    style={{
                      background: ['var(--hx-cyan-pale)', 'var(--hx-cyan)', 'var(--hx-teal)', 'var(--hx-teal-deep)'][i % 4],
                      color: i < 2 ? 'var(--hx-teal-ink)' : '#FFFFFF',
                      boxShadow: '0 0 0 8px var(--hx-cyan-soft)',
                    }}
                  >
                    {i + 1}
                  </span>
                  <div className="hx-card mt-6" style={{ background: '#FFFFFF', boxShadow: 'var(--hx-shadow-1)', padding: 28 }}>
                    <h3 className="m-0 text-[20px] font-semibold">{s.title}</h3>
                    <p className="m-0 mt-3 text-[16px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                      {s.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {p.comparison && (
        <section aria-labelledby="compare" className="hx-wrap py-28">
          <SectionHead id="compare" kicker="Compare" title={p.comparison.caption + '.'} />
          <div className="mt-12 overflow-x-auto rounded-3xl" style={{ border: '1px solid var(--hx-line)', boxShadow: 'var(--hx-shadow-1)' }} data-enter="up">
            <table className="w-full min-w-[720px] border-collapse text-left text-[16px]">
              <caption className="sr-only">{p.comparison.caption}</caption>
              <thead>
                <tr>
                  <th scope="col" className="p-5" style={{ background: 'var(--hx-cyan-soft)' }}>
                    <span className="sr-only">Feature</span>
                  </th>
                  {p.comparison.columns.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className="p-5 text-[16px] font-semibold"
                      style={i === 0 ? { background: 'var(--hx-teal)', color: '#FFFFFF', fontFamily: 'inherit' } : { background: 'var(--hx-cyan-soft)', fontFamily: 'inherit' }}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.comparison.rows.map((r) => (
                  <tr key={r.label} style={{ borderTop: '1px solid var(--hx-line)' }}>
                    <th scope="row" className="p-5 font-medium" style={{ fontFamily: 'inherit' }}>
                      {r.label}
                    </th>
                    {r.values.map((v, i) => (
                      <td key={i} className="p-5" style={i === 0 ? { background: 'rgba(233,248,249,0.6)', color: 'var(--hx-teal)', fontWeight: 600 } : { color: 'var(--hx-ink-2)' }}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section aria-labelledby="faq" className="hx-wrap pb-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-enter="up">
            <p className="hx-kicker m-0 mb-4">Questions</p>
            <h2 id="faq" className="hx-h2 m-0">
              {e.name} FAQ
            </h2>
            <p className="m-0 mt-5 text-[17px] leading-relaxed" style={{ color: 'var(--hx-ink-3)' }}>
              Something else? Ask us on a free consult.
            </p>
            <div className="mt-8">
              <Link href="/book" className="hx-btn hx-btn-primary">
                Book a free consult <span className="hx-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <FaqList faqs={p.faqs} />
        </div>
      </section>

      <section aria-labelledby="where" className="border-t" style={{ borderColor: 'var(--hx-line)' }}>
        <div className="hx-wrap py-24">
          <h2 id="where" className="hx-kicker m-0 mb-6" style={{ color: 'var(--hx-ink-3)' }} data-enter="up">
            {e.name} for your industry
          </h2>
          <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
            {p.industries.map((s, i) => {
              const ind = getIndustry(s);
              if (!ind) return null;
              return (
                <li key={s} data-enter="up" style={delay(i * 60)}>
                  {ind.page ? (
                    <Link href={`/industries/${ind.slug}`} className="hx-pill">
                      {ind.name} <span aria-hidden="true" className="ml-2">→</span>
                    </Link>
                  ) : (
                    <span className="hx-pill" style={{ background: 'var(--hx-mist)', color: 'var(--hx-ink-2)' }}>
                      {ind.name}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <h2 className="hx-h2 m-0 mt-20" data-enter="up">
            The rest of the team
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {others.map((o, i) => (
              <RoleCard key={o.slug} employee={o} index={i + 1} />
            ))}
          </div>
          <p className="m-0 mt-8" data-enter="up">
            <Link href="/ai-employees" className="hx-link inline-flex items-center gap-2">
              <Icon name="route" size={18} /> See every AI employee
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
