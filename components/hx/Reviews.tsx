import { RATING, REVIEWS, type Review } from '@/content/reviews';
import { SectionHead, delay } from './Blocks';

function Stars({ n, size = 16 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8z"
            fill={i <= n ? 'var(--hx-teal)' : 'var(--hx-line)'}
          />
        </svg>
      ))}
    </span>
  );
}

/** "4.8 · 74 Google reviews", linking to the profile. */
export function RatingBadge() {
  return (
    <a
      href={RATING.url}
      className="inline-flex items-center gap-3 rounded-full px-4 py-2 text-[15px] no-underline"
      style={{ background: 'var(--hx-cyan-soft)', color: 'var(--hx-ink)' }}
      rel="noopener"
      target="_blank"
    >
      <Stars n={5} />
      <span>
        <strong>{RATING.value}</strong> from {RATING.count} Google reviews
      </span>
    </a>
  );
}

function ReviewCard({ r, index }: { r: Review; index: number }) {
  return (
    <figure
      className="m-0 flex h-full flex-col rounded-3xl p-7"
      style={{ background: '#FFFFFF', border: '1px solid var(--hx-line)', boxShadow: 'var(--hx-shadow-1)', ...delay(index * 70) }}
      data-enter="up"
    >
      <Stars n={r.stars} />
      <blockquote className="m-0 mt-4 flex-1 text-[17px] leading-relaxed" style={{ color: 'var(--hx-ink)' }}>
        &ldquo;{r.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 text-[15px]" style={{ color: 'var(--hx-ink-3)' }}>
        <span className="font-semibold" style={{ color: 'var(--hx-ink-2)' }}>
          {r.name}
        </span>
        {r.context ? `, ${r.context}` : ''} · Google review, {r.year}
      </figcaption>
    </figure>
  );
}

/** Homepage section: the rating plus the best reviews, word for word. */
export function Reviews({ limit = REVIEWS.length, title = 'What owners say.' }: { limit?: number; title?: string }) {
  return (
    <section aria-labelledby="reviews" className="hx-wrap pb-28">
      <SectionHead id="reviews" kicker="Google reviews" title={title} text={<RatingBadge />} />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.slice(0, limit).map((r, i) => (
          <ReviewCard key={r.name} r={r} index={i} />
        ))}
      </div>
    </section>
  );
}

/** Two short reviews for a sidebar, e.g. beside the booking form. */
export function ReviewsCompact() {
  return (
    <div className="flex flex-col gap-4">
      <RatingBadge />
      {REVIEWS.slice(1, 3).map((r) => (
        <figure key={r.name} className="m-0 rounded-2xl p-5" style={{ background: 'var(--hx-mist)' }}>
          <Stars n={r.stars} size={14} />
          <blockquote className="m-0 mt-3 text-[15px] leading-relaxed">&ldquo;{r.quote}&rdquo;</blockquote>
          <figcaption className="mt-3 text-[14px]" style={{ color: 'var(--hx-ink-3)' }}>
            {r.name} · Google review, {r.year}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
