import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEmployee } from '@/content/employees';
import { getIndustry, industriesWithPages } from '@/content/industries';
import { PageHero } from '@/components/hx/PageHero';
import { Conversation } from '@/components/hx/Conversation';
import { Tilt } from '@/components/hx/Interactive';
import { CtaPair, FaqList, Icon, ProofCard, SectionHead, delay } from '@/components/hx/Blocks';
import { JsonLd, aiServiceLd, breadcrumbLd, faqPageLd } from '@/lib/jsonld';

export function generateStaticParams() {
  return industriesWithPages().map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind?.page) return {};
  return {
    title: ind.page.metaTitle,
    description: ind.page.metaDescription,
    alternates: { canonical: `/industries/${ind.slug}` },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind?.page) notFound();
  const p = ind.page;
  const path = `/industries/${ind.slug}`;
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries' },
    { name: ind.name, path },
  ];

  return (
    <div className="hx">
      <JsonLd data={breadcrumbLd(trail)} />
      <JsonLd data={aiServiceLd({ path, name: `AI employees for ${ind.name.toLowerCase()}`, serviceType: 'AI implementation', description: p.answer, audience: ind.name })} />
      <JsonLd data={faqPageLd(p.faqs, path)} />

      <PageHero trail={trail} eyebrow={`Industries · ${ind.name}`} title={p.h1} answer={p.answer} aside={p.demo && <Conversation {...p.demo} />}>
        <CtaPair secondary={{ label: 'See the results', href: '#proof' }} />
      </PageHero>

      <section aria-labelledby="problems" className="hx-band">
        <div className="hx-wrap relative py-24">
          <div className="max-w-[44rem]" data-enter="up">
            <h2 id="problems" className="hx-h2 m-0" style={{ color: '#FFFFFF' }}>
              Where the money goes missing.
            </h2>
            <p className="m-0 mt-5 text-[18px] leading-relaxed" style={{ color: 'var(--hx-on-teal)' }}>
              {p.intro}
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {p.problems.map((x, i) => (
              <div
                key={x.title}
                data-enter="up"
                style={{ ...delay(i * 100), background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(127,227,234,0.2)' }}
                className="rounded-2xl p-6"
              >
                <span className="hx-serif text-[28px]" style={{ color: 'var(--hx-cyan-light)' }}>
                  0{i + 1}
                </span>
                <h3 className="m-0 mt-3 text-[19px] font-semibold" style={{ color: '#FFFFFF', fontFamily: 'inherit' }}>
                  {x.title}
                </h3>
                <p className="m-0 mt-2 text-[15px] leading-relaxed" style={{ color: 'var(--hx-on-teal)' }}>
                  {x.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="team" className="hx-wrap py-28">
        <SectionHead
          id="team"
          kicker="Your AI team"
          title={<>The AI employees that fit <span className="hx-mark">{ind.name.toLowerCase()}.</span></>}
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {p.team.map((t, i) => {
            const emp = getEmployee(t.slug);
            if (!emp) return null;
            return (
              <div key={t.slug} data-enter="up" style={delay((i % 2) * 100)}>
                <Tilt
                  href={emp.page ? `/ai-employees/${emp.slug}` : undefined}
                  max={4}
                  className="hx-card flex h-full gap-5 no-underline"
                  style={{ background: i % 2 ? 'var(--hx-mist)' : 'var(--hx-cyan-soft)', color: 'var(--hx-ink)' }}
                >
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl" style={{ background: '#FFFFFF', color: 'var(--hx-teal)', boxShadow: 'var(--hx-shadow-1)' }}>
                    <Icon name={emp.icon} />
                  </span>
                  <span className="flex flex-col">
                    <span className="hx-kicker">Moves {emp.driver}</span>
                    <span className="hx-h3 mt-1">{emp.name}</span>
                    <span className="mt-2 text-[16px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                      {t.why}
                    </span>
                    {emp.page && (
                      <span className="mt-4 text-[15px] font-medium" style={{ color: 'var(--hx-teal)' }}>
                        Meet the {emp.name} <span aria-hidden="true">→</span>
                      </span>
                    )}
                  </span>
                </Tilt>
              </div>
            );
          })}
        </div>
      </section>

      <section id="proof" aria-labelledby="proof-h" style={{ background: 'var(--hx-cyan-soft)' }}>
        <div className="hx-wrap py-28">
          <SectionHead id="proof-h" kicker="Proof" title="Results from companies like yours." text="Measured in each client's own systems. Client names are withheld by agreement." />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {p.proof.map((pr, i) => (
              <ProofCard key={pr.caseSlug} proof={pr} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="faq" className="hx-wrap py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-enter="up">
            <p className="hx-kicker m-0 mb-4">Questions</p>
            <h2 id="faq" className="hx-h2 m-0">
              What {ind.name.split(' ')[0].toLowerCase()} owners ask us
            </h2>
            <div className="mt-8">
              <Link href="/book" className="hx-btn hx-btn-primary">
                Book a free consult <span className="hx-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <FaqList faqs={p.faqs} />
        </div>
      </section>
    </div>
  );
}
