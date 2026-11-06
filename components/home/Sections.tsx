import Image from 'next/image';
import Link from 'next/link';
import { TRUSTED_BY } from '@/content/firm';
import { EMPLOYEES } from '@/content/employees';
import { INDUSTRY_LIST } from '@/content/industries';
import { ARTICLES } from '@/content/blog';
import { ArticleCard } from '@/components/blog/ArticleView';
import { CountUp, Tilt } from '@/components/hx/Interactive';
import { ProofCard, RoleCard, SectionHead, delay } from '@/components/hx/Blocks';

/* ---------------------------------------------------------------------------
 * Results band — four real numbers, counting up, then the trusted-by logos.
 * Every figure is from content/evidence.ts or the About page's agency count.
 * ------------------------------------------------------------------------ */

const FIGURES = [
  { value: '1,000+', label: "agencies run on Hexona's AI and systems" },
  { value: '$50,000+', label: 'recovered for one shop from missed calls' },
  { value: '18 → 3.5 hrs', label: 'weekly sales admin at a remodeller' },
  { value: '27% → 68%', label: 'customer retention at a coffee chain' },
];

export function ResultsBand() {
  return (
    <section aria-label="Results" className="hx-band">
      <div className="hx-wrap relative grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {FIGURES.map((f, i) => (
          <div key={f.label} data-enter="up" style={delay(i * 90)}>
            <div className="hx-figure">
              <CountUp value={f.value} />
            </div>
            <div className="mt-1 text-[14px]" style={{ color: 'var(--hx-on-teal)' }}>
              {f.label}
            </div>
          </div>
        ))}
      </div>
      <div className="relative border-t py-8" style={{ borderColor: 'rgba(127, 227, 234, 0.18)' }}>
        <p className="hx-wrap hx-kicker m-0 mb-5" style={{ color: 'var(--hx-cyan-light)' }}>
          Trusted by teams at
        </p>
        <div className="hx-marquee">
          <div className="hx-marquee-track items-center !gap-16 px-8">
            {[0, 1].map((copy) => (
              <ul key={copy} className="m-0 flex list-none items-center gap-16 p-0" aria-hidden={copy === 1 || undefined}>
                {TRUSTED_BY.map((org) => (
                  <li key={org.name} className="flex shrink-0 items-center">
                    {org.logo ? (
                      <Image
                        src={org.logo}
                        alt={copy === 0 ? org.name : ''}
                        width={org.width ?? 132}
                        height={org.height ?? 28}
                        style={{ height: `${26 * (org.scale ?? 1)}px`, width: 'auto', opacity: 0.8 }}
                      />
                    ) : (
                      <span className="text-[18px] font-medium">{org.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * The AI team.
 * ------------------------------------------------------------------------ */

export function Team() {
  return (
    <section aria-labelledby="team" className="hx-wrap pb-12 pt-28">
      <SectionHead
        id="team"
        kicker="Your AI team"
        title="Each one moves a number buyers pay for."
        text="Buyers don't pay more because you have a chatbot. They pay for more revenue, better margins and a business that runs without you."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {EMPLOYEES.map((e, i) => (
          <RoleCard key={e.slug} employee={e} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * The filter: why enterprise value, in three moves.
 * ------------------------------------------------------------------------ */

const VALUE = [
  { n: '01', title: 'Capture revenue you are losing', text: 'Missed calls, slow replies and old estimates nobody chased. The cheapest revenue there is, because you already paid for it.' },
  { n: '02', title: 'Cut the cost of running the business', text: 'Admin, scheduling and chasing done by software, so every new job costs less to deliver than the last.' },
  { n: '03', title: 'Make it run without you', text: 'Work documented and handled by systems, not by the owner. That is what buyers pay a premium multiple for.' },
];

export function Value() {
  return (
    <section aria-labelledby="value" className="hx-wrap py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div data-enter="up">
          <p className="hx-kicker m-0 mb-4">Our filter</p>
          <h2 id="value" className="hx-h2 m-0">
            If it doesn&rsquo;t raise what your business is worth, <span className="hx-mark">we don&rsquo;t build it.</span>
          </h2>
          <p className="hx-lead m-0 mt-6">
            Value is earnings times the multiple a buyer will pay. Every AI employee we build moves
            one or the other, and we measure which.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/score" className="hx-btn hx-btn-primary">
              Get your Enterprise Value Score <span className="hx-arrow" aria-hidden="true">→</span>
            </Link>
            <div
              className="hx-serif flex flex-wrap items-baseline gap-3 rounded-2xl px-6 py-4 text-[22px]"
              style={{ background: 'var(--hx-cyan-soft)', color: 'var(--hx-teal)' }}
            >
              <span>Earnings</span>
              <span aria-hidden="true">×</span>
              <span>Multiple</span>
              <span aria-hidden="true">=</span>
              <em className="italic">Enterprise value</em>
            </div>
          </div>
        </div>
        <ol className="m-0 flex list-none flex-col gap-4 p-0">
          {VALUE.map((v, i) => (
            <li key={v.n} data-enter="up" style={delay(i * 120)}>
              <Tilt max={3} className="hx-card flex gap-6" style={{ background: '#FFFFFF', border: '1px solid var(--hx-line)', boxShadow: 'var(--hx-shadow-1)' }}>
                <span className="hx-serif text-[32px] leading-none" style={{ color: 'var(--hx-cyan)' }}>
                  {v.n}
                </span>
                <span>
                  <span className="block text-[20px] font-semibold">{v.title}</span>
                  <span className="mt-2 block text-[16px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                    {v.text}
                  </span>
                </span>
              </Tilt>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * How it works — three steps on a line that draws across as it enters.
 * ------------------------------------------------------------------------ */

const STEPS = [
  { n: '1', title: 'Score', text: 'We measure your business on the drivers buyers look at and find the weakest ones.', bg: 'var(--hx-cyan-pale)', ink: 'var(--hx-teal-deep)' },
  { n: '2', title: 'Build', text: 'We install the AI employees that move those drivers, connected to the tools you already use.', bg: 'var(--hx-cyan)', ink: 'var(--hx-teal-ink)' },
  { n: '3', title: 'Run and prove', text: 'We run them for you and report the before-and-after numbers every month.', bg: 'var(--hx-teal)', ink: '#FFFFFF' },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how" style={{ background: 'var(--hx-cyan-soft)' }}>
      <div className="hx-wrap py-28">
        <SectionHead id="how" kicker="How it works" title="Three steps. No tools to learn." />
        <div className="relative mt-16" data-enter="up">
          <div className="hx-steps-line hidden md:block" aria-hidden="true" />
          <ol className="relative m-0 grid list-none gap-6 p-0 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.n} data-enter="up" style={delay(200 + i * 200)}>
                <span
                  className="hx-serif relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-[20px]"
                  style={{ background: s.bg, color: s.ink, boxShadow: '0 0 0 8px var(--hx-cyan-soft)' }}
                >
                  {s.n}
                </span>
                <div className="hx-card mt-6" style={{ background: '#FFFFFF', boxShadow: 'var(--hx-shadow-1)' }}>
                  <h3 className="m-0 text-[22px] font-semibold">{s.title}</h3>
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
  );
}

/* ---------------------------------------------------------------------------
 * Measured results.
 * ------------------------------------------------------------------------ */

const CASES = [
  { figure: '$50,000+', label: 'recovered from calls that used to go to voicemail', sector: 'Tire and auto service', caseSlug: 'tire-shop-missed-calls' },
  { figure: '$45,000+', label: 'added monthly revenue, with sales admin cut from 18 to 3.5 hours a week', sector: 'Roofing and remodelling', caseSlug: 'home-improvement-sales-workflow' },
  { figure: '41%', label: 'fewer project delays, with estimates approved 44% faster', sector: 'Renovation contractor', caseSlug: 'construction-project-pipeline' },
];

export function Results() {
  return (
    <section aria-labelledby="results" className="hx-wrap py-28">
      <SectionHead
        id="results"
        kicker="Case studies"
        title="Results, measured."
        text={
          <>
            Every figure was measured in the client&rsquo;s own systems.{' '}
            <Link href="/evidence" className="hx-link">
              See all case studies
            </Link>
          </>
        }
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {CASES.map((c, i) => (
          <ProofCard key={c.caseSlug} proof={c} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Industries.
 * ------------------------------------------------------------------------ */

export function Industries() {
  return (
    <section aria-labelledby="industries" className="hx-wrap pb-28">
      <h2 id="industries" className="hx-kicker m-0 mb-6" style={{ color: 'var(--hx-ink-3)' }} data-enter="up">
        Built for service businesses
      </h2>
      <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
        {INDUSTRY_LIST.map((ind, i) => (
          <li key={ind.slug} data-enter="up" style={delay(i * 60)}>
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
        ))}
      </ul>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * From the blog: the three newest articles, so new posts get a link from the
 * strongest page on the site the day they ship.
 * ------------------------------------------------------------------------ */

export function FromTheBlog() {
  const latest = ARTICLES.slice(0, 3);
  if (latest.length === 0) return null;
  return (
    <section aria-labelledby="blog" style={{ background: 'var(--hx-cyan-soft)' }}>
      <div className="hx-wrap py-24">
        <SectionHead
          id="blog"
          kicker="From the blog"
          title="Straight answers for owners."
          text={
            <>
              Costs, playbooks and this week&rsquo;s AI news.{' '}
              <Link href="/blog" className="hx-link">
                All articles
              </Link>
            </>
          }
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latest.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
