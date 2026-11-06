import Image from 'next/image';
import Link from 'next/link';
import type { BlogArticle } from '@/content/blog';
import { blogPath, categoryLabel, readingMinutes, relatedTo } from '@/content/blog';
import type { Figure, Table } from '@/content/blog/types';
import { PRINCIPAL } from '@/content/firm';
import { RichText } from './RichText';
import { Breadcrumbs, FaqList, delay } from '@/components/hx/Blocks';
import { LatticeCanvas } from '@/components/hx/LatticeCanvas';
import { Tilt } from '@/components/hx/Interactive';

const fmt = (d: string) =>
  new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

/**
 * The one article template. Order, top to bottom: breadcrumb, H1, byline and
 * dates, the answer, cover, key takeaways, on-this-page, sections (each can
 * carry paragraphs, bullets, steps, a table, an "at a glance" figure and a
 * callout), mid-article consult box, FAQ, sources, author, keep reading.
 */
export function ArticleView({ article: a }: { article: BlogArticle }) {
  const related = relatedTo(a);
  const midpoint = Math.ceil(a.sections.length / 2);
  return (
    <div className="hx">
      <header className="hx-hero">
        <LatticeCanvas className="hx-hero-canvas" />
        <div className="hx-wrap pb-10 pt-12">
          <div className="mx-auto max-w-[46rem]">
            <Breadcrumbs
              trail={[
                { name: 'Home', path: '/' },
                { name: 'Blog', path: '/blog' },
                { name: categoryLabel(a.category), path: `/blog/category/${a.category}` },
              ]}
            />
            <p className="hx-eyebrow m-0 mb-6" data-enter="up">
              {a.kind} · {categoryLabel(a.category)}
            </p>
            <h1 className="hx-h1 m-0" style={{ fontSize: 'clamp(2.25rem, 4.6vw, 3.5rem)', ...delay(80) }} data-enter="rise">
              {a.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px]" style={{ color: 'var(--hx-ink-3)', ...delay(140) }} data-enter="up">
              <Link href="/firm" rel="author" className="flex items-center gap-2.5 no-underline" style={{ color: 'var(--hx-ink)' }}>
                <Image src="/images/hamza-baig.jpg" alt="Hamza Baig" width={36} height={36} className="rounded-full" />
                <span className="font-semibold">{PRINCIPAL.name}</span>
              </Link>
              <span>
                Published <time dateTime={a.datePublished}>{fmt(a.datePublished)}</time>
              </span>
              {a.dateModified !== a.datePublished && (
                <span>
                  Updated <time dateTime={a.dateModified}>{fmt(a.dateModified)}</time>
                </span>
              )}
              <span>{readingMinutes(a)} min read</span>
            </div>
          </div>
        </div>
      </header>

      <article className="hx-wrap pb-20">
        <div className="mx-auto max-w-[46rem]">
          {/* The answer. First prose on the page, above the cover and every heading. */}
          <div className="text-[19px] leading-[1.7]" style={{ color: 'var(--hx-ink)' }}>
            {a.intro.map((p, i) => (
              <p key={i} className="m-0 mb-5">
                <RichText text={p} />
              </p>
            ))}
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element -- generated PNG route, served as is */}
          <img
            src={`${blogPath(a.slug)}/opengraph-image`}
            alt={a.coverAlt}
            width={1200}
            height={630}
            className="my-8 h-auto w-full rounded-3xl"
            style={{ boxShadow: 'var(--hx-shadow-2)', border: '1px solid var(--hx-line)' }}
          />

          {a.tldr.length > 0 && (
            <aside aria-labelledby="tldr" className="mb-10 rounded-3xl p-7" style={{ background: 'var(--hx-cyan-soft)', borderLeft: '5px solid var(--hx-cyan)' }}>
              <h2 id="tldr" className="hx-kicker m-0 mb-4">
                The short version
              </h2>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {a.tldr.map((t) => (
                  <li key={t} className="flex gap-3 text-[17px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                    <span aria-hidden="true" className="mt-[0.6em] h-2 w-2 flex-none rounded-full" style={{ background: 'var(--hx-teal)' }} />
                    <span>
                      <RichText text={t} />
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {a.sections.length >= 4 && (
            <nav aria-labelledby="toc" className="mb-12 rounded-3xl p-7" style={{ border: '1px solid var(--hx-line)' }}>
              <h2 id="toc" className="hx-kicker m-0 mb-4">
                On this page
              </h2>
              <ol className="m-0 flex flex-col gap-2 pl-5 text-[16px]" style={{ color: 'var(--hx-ink-3)' }}>
                {a.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="hx-link">
                      {s.heading}
                    </a>
                  </li>
                ))}
                {a.faq.length > 0 && (
                  <li>
                    <a href="#faq" className="hx-link">
                      Questions people ask
                    </a>
                  </li>
                )}
              </ol>
            </nav>
          )}

          {a.sections.map((s, i) => (
            <div key={s.id}>
              <section aria-labelledby={s.id} className="mb-12 scroll-mt-28">
                <h2 id={s.id} className="hx-h2 m-0 mb-5 scroll-mt-28" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.15rem)' }}>
                  {s.heading}
                </h2>
                {s.paragraphs?.map((p, j) => (
                  <p key={j} className="m-0 mb-5 text-[17px] leading-[1.75]" style={{ color: 'var(--hx-ink-2)' }}>
                    <RichText text={p} />
                  </p>
                ))}
                {s.bullets && (
                  <ul className="m-0 mb-6 flex list-none flex-col gap-3 p-0">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[17px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                        <span aria-hidden="true" className="mt-[0.6em] h-2 w-2 flex-none rounded-full" style={{ background: 'var(--hx-cyan)' }} />
                        <span>
                          <RichText text={b} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.steps && (
                  <ol className="m-0 mb-6 flex list-none flex-col gap-4 p-0">
                    {s.steps.map((st, k) => (
                      <li key={st.title} className="flex gap-4">
                        <span className="hx-serif flex h-9 w-9 flex-none items-center justify-center rounded-full text-[16px]" style={{ background: 'var(--hx-teal)', color: '#FFFFFF' }}>
                          {k + 1}
                        </span>
                        <span className="pt-1">
                          <span className="block text-[18px] font-semibold">{st.title}</span>
                          <span className="mt-1 block text-[17px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                            <RichText text={st.detail} />
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
                {s.table && <ArticleTable table={s.table} />}
                {s.figure && <ArticleFigure figure={s.figure} />}
                {s.callout && (
                  <p className="m-0 mb-6 rounded-2xl p-5 text-[16px] leading-relaxed" style={{ background: 'var(--hx-mist)', color: 'var(--hx-ink-2)' }}>
                    <RichText text={s.callout} />
                  </p>
                )}
              </section>
              {i === midpoint - 1 && a.sections.length > 3 && <ConsultBox />}
            </div>
          ))}

          {a.faq.length > 0 && (
            <section aria-labelledby="faq" className="mb-14 scroll-mt-28">
              <h2 id="faq" className="hx-h2 m-0 mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.15rem)' }}>
                Questions people ask
              </h2>
              <FaqList faqs={a.faq} />
            </section>
          )}

          {a.sources.length > 0 && (
            <section aria-labelledby="sources" className="mb-14">
              <h2 id="sources" className="hx-h3 m-0 mb-4">
                Sources
              </h2>
              <p className="m-0 mb-4 text-[15px]" style={{ color: 'var(--hx-ink-3)' }}>
                Facts and prices checked on {fmt(a.lastChecked)}. Prices change, so confirm on the source before you buy.
              </p>
              <ol className="m-0 flex flex-col gap-2 pl-5 text-[15px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                {a.sources.map((s) => (
                  <li key={s.url + s.label}>
                    <a href={s.url} className="hx-link" rel="noopener noreferrer" target="_blank">
                      {s.label}
                    </a>
                    . {s.note}
                  </li>
                ))}
              </ol>
            </section>
          )}

          <AuthorCard />
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="keep-reading" style={{ background: 'var(--hx-cyan-soft)' }}>
          <div className="hx-wrap py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="keep-reading" className="hx-h2 m-0">
                Keep reading
              </h2>
              <Link href="/blog" className="hx-link">
                All articles <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((r, i) => (
                <ArticleCard key={r.slug} article={r} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function ArticleTable({ table }: { table: Table }) {
  return (
    <figure className="m-0 mb-7">
      <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--hx-line)' }}>
        <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
          <caption className="sr-only">{table.caption}</caption>
          <thead>
            <tr style={{ background: 'var(--hx-teal)', color: '#FFFFFF' }}>
              {table.columns.map((c) => (
                <th key={c.key} scope="col" className="p-4 font-semibold" style={{ fontFamily: 'inherit' }}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r, i) => (
              <tr key={i} style={{ background: i % 2 ? '#FFFFFF' : 'var(--hx-cyan-soft)' }}>
                {table.columns.map((c, j) =>
                  j === 0 ? (
                    <th key={c.key} scope="row" className="p-4 align-top font-semibold" style={{ fontFamily: 'inherit' }}>
                      <RichText text={r[c.key] ?? ''} />
                    </th>
                  ) : (
                    <td key={c.key} className="p-4 align-top" style={{ color: 'var(--hx-ink-2)' }}>
                      <RichText text={r[c.key] ?? ''} />
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-[14px]" style={{ color: 'var(--hx-ink-3)' }}>
        {table.caption}
      </figcaption>
    </figure>
  );
}

/** "At a glance" graphics, as real HTML so the numbers are crawlable and quotable. */
function ArticleFigure({ figure: f }: { figure: Figure }) {
  return (
    <figure className="m-0 mb-7 overflow-hidden rounded-3xl" style={{ background: 'var(--hx-teal)', color: '#FFFFFF' }} data-enter="up">
      <div className="p-7">
        {f.kind === 'stats' && (
          <div className={`grid gap-6 ${f.items.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
            {f.items.map((it) => (
              <div key={it.label}>
                <div className="hx-figure">{it.value}</div>
                <div className="mt-1 text-[14px] leading-snug" style={{ color: 'var(--hx-on-teal)' }}>
                  {it.label}
                </div>
              </div>
            ))}
          </div>
        )}
        {f.kind === 'bars' && (
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {(() => {
              const max = Math.max(...f.items.map((x) => x.value));
              return f.items.map((it) => (
                <li key={it.label}>
                  <div className="flex justify-between gap-4 text-[15px]">
                    <span>{it.label}</span>
                    <span style={{ color: 'var(--hx-cyan-light)' }}>{it.display}</span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full" style={{ background: 'rgba(127,227,234,0.18)' }} aria-hidden="true">
                    <div className="h-full rounded-full" style={{ width: `${Math.max(3, (it.value / max) * 100)}%`, background: 'var(--hx-cyan)' }} />
                  </div>
                </li>
              ));
            })()}
          </ul>
        )}
        {f.kind === 'steps' && (
          <ol className="m-0 flex list-none flex-wrap items-center gap-3 p-0">
            {f.items.map((it, i) => (
              <li key={it} className="flex items-center gap-3">
                <span className="rounded-full px-4 py-2 text-[15px]" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(127,227,234,0.35)' }}>
                  {it}
                </span>
                {i < f.items.length - 1 && (
                  <span aria-hidden="true" style={{ color: 'var(--hx-cyan-light)' }}>
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
      <figcaption className="px-7 py-3 text-[13px]" style={{ background: 'var(--hx-teal-deep)', color: 'var(--hx-on-teal)' }}>
        At a glance: {f.caption}
      </figcaption>
    </figure>
  );
}

function ConsultBox() {
  return (
    <aside className="mb-12 grid gap-5 rounded-3xl p-7 sm:grid-cols-[1fr_auto] sm:items-center" style={{ background: 'var(--hx-teal-deep)', color: '#FFFFFF' }}>
      <div>
        <p className="hx-serif m-0 text-[24px] leading-snug">Want this set up for you?</p>
        <p className="m-0 mt-2 text-[15px] leading-relaxed" style={{ color: 'var(--hx-on-teal)' }}>
          We build and run AI employees for service businesses. A free one-hour consult tells you which one would pay back first.
        </p>
      </div>
      <Link href="/book" className="hx-btn hx-btn-cyan">
        Book a free consult <span className="hx-arrow" aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}

function AuthorCard() {
  return (
    <aside aria-label="About the author" className="flex flex-wrap items-start gap-5 rounded-3xl p-7" style={{ border: '1px solid var(--hx-line)', boxShadow: 'var(--hx-shadow-1)' }}>
      <Image src="/images/hamza-baig.jpg" alt="Hamza Baig, founder of Hexona Systems" width={72} height={72} className="rounded-2xl" />
      <div className="min-w-0 flex-1">
        <p className="hx-kicker m-0">Written by</p>
        <p className="hx-h3 m-0 mt-1">{PRINCIPAL.name}</p>
        <p className="m-0 mt-2 text-[15px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
          Founder of Hexona Systems, building automation for businesses since 2021. More than 1,000 agencies run on Hexona&rsquo;s AI and systems, and
          Hamza teaches AI automation to a community of more than 45,000 members.
        </p>
        <p className="m-0 mt-3 flex flex-wrap gap-4 text-[15px]">
          <Link href="/firm" className="hx-link">
            About Hexona
          </Link>
          <a href="https://www.youtube.com/@hamza_automates" className="hx-link" rel="noopener noreferrer" target="_blank">
            YouTube
          </a>
          <a href="https://www.linkedin.com/in/hamzautomates/" className="hx-link" rel="noopener noreferrer" target="_blank">
            LinkedIn
          </a>
        </p>
      </div>
    </aside>
  );
}

export function ArticleCard({ article: a, index, featured = false }: { article: BlogArticle; index: number; featured?: boolean }) {
  return (
    <div data-enter="up" style={delay((index % 3) * 90)} className={featured ? 'md:col-span-3' : undefined}>
      <Tilt
        href={blogPath(a.slug)}
        max={featured ? 2 : 3}
        className={`hx-card flex h-full overflow-hidden no-underline ${featured ? 'flex-col md:flex-row' : 'flex-col'}`}
        style={{ background: '#FFFFFF', color: 'var(--hx-ink)', padding: 0, boxShadow: 'var(--hx-shadow-1)', border: '1px solid var(--hx-line)' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- generated PNG route */}
        <img
          src={`${blogPath(a.slug)}/opengraph-image`}
          alt={a.coverAlt}
          width={1200}
          height={630}
          loading={featured ? 'eager' : 'lazy'}
          className={`h-auto w-full ${featured ? 'md:w-[58%] md:flex-none md:self-center' : ''}`}
          style={{ borderBottom: '1px solid var(--hx-line)' }}
        />
        <span className={`flex flex-1 flex-col gap-2 ${featured ? 'justify-center p-8' : 'p-6'}`}>
          <span className="hx-kicker">
            {a.kind} · {readingMinutes(a)} min read
          </span>
          <span className={`hx-serif leading-snug ${featured ? 'text-[30px]' : 'text-[21px]'}`}>{a.title}</span>
          {featured && (
            <span className="text-[16px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
              {a.description}
            </span>
          )}
          <span className="mt-auto pt-2 text-[14px]" style={{ color: 'var(--hx-ink-3)' }}>
            {fmt(a.datePublished)}
          </span>
        </span>
      </Tilt>
    </div>
  );
}
