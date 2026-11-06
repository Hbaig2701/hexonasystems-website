import type { Metadata } from 'next';
import { AWARDS, COMMITMENTS, ENTITY_SENTENCE, KEY_FACTS, ORIGIN, PRINCIPAL, TEAM } from '@/content/firm';
import { EMPLOYEES } from '@/content/employees';
import { FIRM_FAQS } from '@/content/faqs';
import { JsonLd, breadcrumbLd, faqPageLd } from '@/lib/jsonld';
import { PageHero } from '@/components/hx/PageHero';
import { CountUp, PointerTilt, Tilt } from '@/components/hx/Interactive';
import { LogoMark } from '@/components/hx/Logo';
import { CtaPair, FaqList, RoleCard, SectionHead, delay } from '@/components/hx/Blocks';

/**
 * /firm — About. Kept at this URL because it already ranks and is linked.
 *
 * ⚠️ ENTITY_SENTENCE must render in this file (Ticket 5, check:seo). It is the
 * page an assistant is most likely to fetch when asked what Hexona is.
 */

export const metadata: Metadata = {
  title: { absolute: 'About Hexona Systems' },
  description:
    'About Hexona Systems: a Toronto AI implementation firm founded in 2022 by Hamza Baig. The team, our commitments, awards and how we work with clients.',
  alternates: { canonical: '/firm' },
};

const FIGURES = [
  { value: '2022', label: 'Founded' },
  { value: '1,500+', label: 'Businesses served' },
  { value: '1,000+', label: "Agencies run on Hexona's AI and systems" },
  { value: '45,000+', label: 'Community members trained' },
];

export default function FirmPage() {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/firm' },
  ];
  return (
    <div className="hx">
      <JsonLd data={breadcrumbLd(trail)} />
      {/* The same array drives the visible FAQ below, so schema and page match word for word. */}
      <JsonLd data={faqPageLd(FIRM_FAQS, '/firm')} />

      <PageHero
        trail={trail}
        eyebrow="About Hexona"
        title={
          <>
            We were doing this before there was a <span className="hx-mark">name for it.</span>
          </>
        }
        answer={`Hexona has been putting automation into businesses since ${ORIGIN.since}, long before the AI era began. Today we build and run AI employees for service businesses, and we only build the ones that make a business worth more.`}
        aside={
          <div className="relative aspect-square">
            <div className="hx-orbit" aria-hidden="true">
              <span style={{ top: '6%', left: '50%' }} />
              <span style={{ bottom: '18%', left: '6%' }} />
            </div>
            <div className="hx-orbit hx-orbit-2" aria-hidden="true">
              <span style={{ top: '-1%', left: '30%' }} />
            </div>
            <PointerTilt className="absolute inset-[20%]">
              <div className="hx-float h-full w-full">
                <LogoMark size="100%" draw className="hx-mark-shadow h-full w-full" />
              </div>
            </PointerTilt>
          </div>
        }
      >
        <CtaPair secondary={{ label: 'See our results', href: '/evidence' }} />
        {/* The definition, third person and verbatim. */}
        <p className="m-0 mt-8 max-w-[44rem] text-[14px] leading-relaxed" style={{ color: 'var(--hx-ink-3)' }}>
          {ENTITY_SENTENCE}
        </p>
      </PageHero>

      <section aria-label="Hexona in numbers" className="hx-band">
        <div className="hx-wrap relative grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {FIGURES.map((f, i) => (
            <div key={f.label} data-enter="up" style={delay(i * 90)}>
              <div className="hx-figure">{f.value === '2022' ? f.value : <CountUp value={f.value} />}</div>
              <div className="mt-1 text-[14px]" style={{ color: 'var(--hx-on-teal)' }}>
                {f.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="origin" className="hx-wrap py-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-enter="up">
            <p className="hx-kicker m-0 mb-4">Where we came from</p>
            <h2 id="origin" className="hx-h2 m-0">
              Built around the problems, <span className="hx-mark">not the tools.</span>
            </h2>
            <div className="hx-prose mt-8">
              {ORIGIN.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </div>
          <div data-enter="up" style={delay(120)}>
            <Tilt max={3} className="hx-card" style={{ background: 'var(--hx-cyan-soft)' }}>
              <p className="hx-kicker m-0">From the founder</p>
              <p className="hx-h3 m-0 mt-3">{PRINCIPAL.name}</p>
              <div className="hx-prose mt-5">
                {PRINCIPAL.bio.map((para) => (
                  <p key={para.slice(0, 24)} style={{ fontSize: 16 }}>
                    {para}
                  </p>
                ))}
              </div>
            </Tilt>
          </div>
        </div>
      </section>

      <section aria-labelledby="what" style={{ background: 'var(--hx-cyan-soft)' }}>
        <div className="hx-wrap py-28">
          <SectionHead
            id="what"
            kicker="What we build"
            title="AI employees, each one tied to a number buyers pay for."
            text="We build them into the tools you already use, run them for you, and report what they changed every month."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {EMPLOYEES.map((e, i) => (
              <RoleCard key={e.slug} employee={e} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="team" className="hx-wrap py-28">
        <SectionHead id="team" kicker="The team" title="The people who do the work." />
        <ul className="m-0 mt-12 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((person, i) => (
            <li key={person.name} data-enter="up" style={delay((i % 3) * 90)}>
              <Tilt max={4} className="hx-card flex items-center gap-4" style={{ background: '#FFFFFF', border: '1px solid var(--hx-line)', boxShadow: 'var(--hx-shadow-1)', padding: 24 }}>
                <span
                  className="hx-serif flex h-14 w-14 flex-none items-center justify-center rounded-2xl text-[20px]"
                  style={{ background: i % 2 ? 'var(--hx-teal)' : 'var(--hx-cyan-pale)', color: i % 2 ? '#FFFFFF' : 'var(--hx-teal-deep)' }}
                  aria-hidden="true"
                >
                  {person.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')}
                </span>
                <span>
                  <span className="block text-[18px] font-semibold">{person.name}</span>
                  <span className="block text-[15px]" style={{ color: 'var(--hx-ink-3)' }}>
                    {person.role}
                  </span>
                </span>
              </Tilt>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="commit" className="hx-band">
        <div className="hx-wrap relative py-24">
          <h2 id="commit" className="hx-h2 m-0 max-w-[20ch]" style={{ color: '#FFFFFF' }} data-enter="up">
            Four commitments you can hold us to.
          </h2>
          <dl className="m-0 mt-12 grid gap-4 md:grid-cols-2">
            {COMMITMENTS.map((c, i) => (
              <div
                key={c.term}
                data-enter="up"
                style={{ ...delay(i * 90), background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(127,227,234,0.2)' }}
                className="rounded-2xl p-7"
              >
                <dt className="text-[19px] font-semibold" style={{ color: '#FFFFFF' }}>
                  {c.term}
                </dt>
                <dd className="m-0 mt-2 text-[16px] leading-relaxed" style={{ color: 'var(--hx-on-teal)' }}>
                  {c.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="awards" className="hx-wrap py-28">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead id="awards" kicker="Recognition" title="Awards and nominations." />
            <ul className="m-0 mt-10 flex list-none flex-col gap-3 p-0">
              {AWARDS.map((a, i) => (
                <li key={a.title + a.year} data-enter="up" style={delay(i * 70)} className="flex items-center gap-5 rounded-2xl p-5">
                  <span className="hx-serif text-[22px]" style={{ color: 'var(--hx-cyan)' }}>
                    {a.year}
                  </span>
                  <span>
                    <span className="block text-[17px] font-semibold">
                      {a.href ? (
                        <a href={a.href} className="hx-link" rel="noopener noreferrer">
                          {a.title}
                        </a>
                      ) : (
                        a.title
                      )}
                    </span>
                    <span className="block text-[15px]" style={{ color: 'var(--hx-ink-3)' }}>
                      {a.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead kicker="Key facts" title="Hexona at a glance." />
            <dl className="m-0 mt-10 overflow-hidden rounded-3xl" style={{ border: '1px solid var(--hx-line)' }} data-enter="up">
              {KEY_FACTS.map((f, i) => (
                <div key={f.field} className="grid gap-1 px-6 py-4 sm:grid-cols-[0.8fr_1.2fr]" style={{ background: i % 2 ? '#FFFFFF' : 'var(--hx-cyan-soft)' }}>
                  <dt className="text-[15px] font-semibold">{f.field}</dt>
                  <dd className="m-0 text-[15px]" style={{ color: 'var(--hx-ink-2)' }}>
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq" className="hx-wrap pb-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-enter="up">
            <p className="hx-kicker m-0 mb-4">Questions</p>
            <h2 id="faq" className="hx-h2 m-0">
              About Hexona
            </h2>
          </div>
          <FaqList faqs={FIRM_FAQS} />
        </div>
      </section>
    </div>
  );
}
