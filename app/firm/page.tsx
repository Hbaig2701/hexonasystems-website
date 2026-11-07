import type { Metadata } from 'next';
import Image from 'next/image';
import { COMMITMENTS, ENTITY_SENTENCE, KEY_FACTS, ORIGIN, PRINCIPAL, TEAM } from '@/content/firm';
import { AWARD_YEARS, EARLY_YEARS, HIGHLEVEL_BIO, INTERVIEWS, NOMINATIONS, PHOTOS, WORKED_WITH, type Photo } from '@/content/recognition';
import { EMPLOYEES } from '@/content/employees';
import { FIRM_FAQS } from '@/content/faqs';
import { JsonLd, breadcrumbLd, faqPageLd } from '@/lib/jsonld';
import { PageHero } from '@/components/hx/PageHero';
import { CountUp, Tilt } from '@/components/hx/Interactive';
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

function Shot({ photo, sizes = '(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw', priority = false }: { photo: Photo; sizes?: string; priority?: boolean }) {
  return (
    <figure className="m-0">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full rounded-2xl"
        style={{ border: '1px solid var(--hx-line)' }}
      />
      <figcaption className="mt-2 text-[13px] leading-snug" style={{ color: 'var(--hx-ink-3)' }}>
        {photo.caption}
      </figcaption>
    </figure>
  );
}

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
        answer={`Hamza Baig founded Hexona in ${ORIGIN.since} and was automating local businesses before ChatGPT launched. Today we build and run AI employees for service businesses, and we only build the ones that make a business worth more.`}
        aside={
          <Tilt max={4} className="overflow-hidden rounded-3xl p-3" style={{ background: '#FFFFFF', boxShadow: 'var(--hx-shadow-2)' }}>
            <Shot photo={PHOTOS.diamondStage} priority sizes="(min-width: 1024px) 420px, 100vw" />
          </Tilt>
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
            <h3 className="hx-h3 m-0 mt-12">Before ChatGPT</h3>
            <p className="m-0 mt-3 text-[15px]" style={{ color: 'var(--hx-ink-3)' }}>
              Public dates: the domain registration and the upload dates on the channel.
            </p>
            <ol className="m-0 mt-6 flex list-none flex-col gap-4 p-0">
              {EARLY_YEARS.map((y) => (
                <li key={y.year} className="grid grid-cols-[4.5rem_1fr] gap-4">
                  <span className="hx-serif text-[26px] leading-none" style={{ color: 'var(--hx-teal)' }}>
                    {y.year}
                  </span>
                  <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[16px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                    {y.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
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
        <SectionHead
          id="awards"
          kicker="Recognition"
          title={
            <>
              Awarded by HighLevel, <span className="hx-mark">three years running.</span>
            </>
          }
          text="SaaSpreneur awards count the client accounts an agency runs on HighLevel: Platinum for 500+, Diamond for 1,000+. Affilionaire awards are for referring new HighLevel customers."
        />
        <div className="mt-14 flex flex-col gap-16">
          {AWARD_YEARS.map((y) => (
            <div key={y.year} className="grid gap-8 lg:grid-cols-[0.32fr_1fr]" data-enter="up">
              <div>
                <p className="hx-serif m-0 text-[48px] leading-none" style={{ color: 'var(--hx-teal)' }}>
                  {y.year}
                </p>
                <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
                  {y.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[16px] leading-relaxed">
                      <span aria-hidden="true" style={{ color: 'var(--hx-teal)' }}>✓</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid items-start gap-5 sm:grid-cols-3">
                {y.photos.map((p) => (
                  <Shot key={p.src} photo={p} sizes="(min-width: 1024px) 260px, (min-width: 640px) 33vw, 100vw" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="introduced" style={{ background: 'var(--hx-cyan-soft)' }}>
        <div className="hx-wrap grid gap-14 py-24 lg:grid-cols-[1.2fr_0.8fr]">
          <div data-enter="up">
            <p className="hx-kicker m-0 mb-4">In HighLevel&rsquo;s words</p>
            <h2 id="introduced" className="hx-h2 m-0">How HighLevel introduces Hamza.</h2>
            <blockquote className="hx-serif m-0 mt-8 border-l-4 pl-6 text-[22px] leading-snug" style={{ borderColor: 'var(--hx-teal)' }}>
              &ldquo;{HIGHLEVEL_BIO.quote}&rdquo;
            </blockquote>
            <p className="m-0 mt-4 text-[14px]" style={{ color: 'var(--hx-ink-3)' }}>
              From his speaker profile on{' '}
              <a className="hx-link" href={HIGHLEVEL_BIO.source} rel="noopener">
                HighLevel&rsquo;s LevelUp 2026 site
              </a>
              , read {HIGHLEVEL_BIO.read}.
            </p>
          </div>
          <div data-enter="up" style={delay(120)}>
            <h3 className="hx-h3 m-0">Nominations</h3>
            <ul className="m-0 mt-6 flex list-none flex-col gap-3 p-0">
              {NOMINATIONS.map((n) => (
                <li key={n.title} className="flex items-center gap-5 rounded-2xl p-5" style={{ background: '#FFFFFF' }}>
                  <span className="hx-serif text-[22px]" style={{ color: 'var(--hx-teal)' }}>
                    {n.year}
                  </span>
                  <span>
                    <span className="block text-[17px] font-semibold">{n.title}</span>
                    <span className="block text-[15px]" style={{ color: 'var(--hx-ink-3)' }}>
                      {n.who}, nominated
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="outside" className="hx-wrap py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
          <div data-enter="up">
            <SectionHead id="outside" kicker="Outside HighLevel" title="Who Hamza has worked and learned with." />
            <ul className="m-0 mt-8 flex list-none flex-col gap-3 p-0">
              {WORKED_WITH.items.map((it) => (
                <li key={it} className="flex gap-3 text-[16px] leading-relaxed">
                  <span aria-hidden="true" style={{ color: 'var(--hx-teal)' }}>✓</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <h3 className="hx-h3 m-0 mt-14">Interviews and podcasts</h3>
            <ul className="m-0 mt-6 flex list-none flex-col gap-4 p-0">
              {INTERVIEWS.map((i) => (
                <li key={i.href} className="text-[16px] leading-relaxed">
                  <a className="hx-link font-semibold" href={i.href} rel="noopener">
                    {i.show}
                  </a>{' '}
                  <span style={{ color: 'var(--hx-ink-3)' }}>
                    ({i.date}): {i.topic}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid items-start gap-5 sm:grid-cols-2" data-enter="up" style={delay(120)}>
            {WORKED_WITH.photos.map((p) => (
              <Shot key={p.src} photo={p} sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw" />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="facts" className="hx-wrap pb-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHead id="facts" kicker="Key facts" title="Hexona at a glance." />
          </div>
          <dl className="m-0 overflow-hidden rounded-3xl" style={{ border: '1px solid var(--hx-line)' }} data-enter="up">
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
