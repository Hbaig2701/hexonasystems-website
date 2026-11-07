import type { Metadata } from 'next';
import Script from 'next/script';
import { PageHero } from '@/components/hx/PageHero';
import { delay } from '@/components/hx/Blocks';
import { ConsultForm } from './ConsultForm';
import { ReviewsCompact } from '@/components/hx/Reviews';
import { JsonLd, breadcrumbLd } from '@/lib/jsonld';
import { FIRM } from '@/content/firm';

export const metadata: Metadata = {
  title: 'Book a free consult',
  description:
    'Book a free one-hour consult with Hexona. We look at your numbers and tell you which AI employee would increase your business value first.',
  alternates: { canonical: '/book' },
};

/** GoHighLevel booking calendar. form_embed.js resizes the iframe to fit. */
const BOOKING_URL = 'https://apply.aigrowthcompany.co/widget/booking/FqLRFlMoNaycdXJdzkfQ';
const BOOKING_EMBED_JS = 'https://apply.aigrowthcompany.co/js/form_embed.js';

const NEXT = [
  { term: 'Pick a time that suits you', detail: 'Choose a slot in the calendar and you get a confirmation straight away. If we are not the right fit, we say so.' },
  { term: 'A free one-hour consult', detail: 'We look at how calls, leads and admin run today and where the money is going missing.' },
  { term: 'A clear recommendation', detail: 'Which AI employee to start with, what it would change, and a fixed scope and price. No obligation.' },
];

export default function BookPage() {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Book a free consult', path: '/book' },
  ];
  return (
    <div className="hx">
      <JsonLd data={breadcrumbLd(trail)} />
      <PageHero
        trail={trail}
        eyebrow="Free consult"
        title={<>Let&rsquo;s find what&rsquo;s holding your <span className="hx-mark">value back.</span></>}
        answer="A free one-hour consult. Pick a time in the calendar below and we will look at how your calls, leads and admin run today."
      />

      <section aria-label="Book a time" className="hx-wrap pb-28">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="min-w-0">
            <div
              id="calendar"
              className="overflow-hidden rounded-3xl p-2 sm:p-4"
              style={{ background: '#FFFFFF', border: '1px solid var(--hx-line)', boxShadow: 'var(--hx-shadow-2)' }}
            >
              <iframe
                src={BOOKING_URL}
                title="Book a free consult with Hexona"
                id="PGvVW4ynhAHZ0mRDcsvc_1794018729988"
                allow="payment"
                scrolling="no"
                className="block w-full"
                style={{ border: 'none', overflow: 'hidden', minHeight: 720 }}
              />
              <noscript>
                <p className="m-0 p-4">
                  <a className="hx-link" href={BOOKING_URL}>Open the booking calendar</a>
                </p>
              </noscript>
            </div>
            <Script src={BOOKING_EMBED_JS} strategy="afterInteractive" />
            <details className="mt-6 rounded-3xl p-6 sm:p-8" style={{ background: 'var(--hx-mist)' }}>
              <summary className="cursor-pointer text-[17px] font-semibold">No time that works? Send us a message instead</summary>
              <div className="mt-6">
                <ConsultForm />
              </div>
            </details>
          </div>
          <aside data-enter="up" style={delay(120)}>
            <h2 className="hx-h3 m-0">What happens next</h2>
            <ol className="m-0 mt-6 flex list-none flex-col gap-4 p-0">
              {NEXT.map((n, i) => (
                <li key={n.term} className="flex gap-4 rounded-2xl p-5" style={{ background: i % 2 ? 'var(--hx-mist)' : 'var(--hx-cyan-soft)' }}>
                  <span className="hx-serif flex h-9 w-9 flex-none items-center justify-center rounded-full text-[17px]" style={{ background: 'var(--hx-teal)', color: '#FFFFFF' }}>
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-[17px] font-semibold">{n.term}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                      {n.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <ReviewsCompact />
            </div>
            <p className="m-0 mt-6 text-[15px]" style={{ color: 'var(--hx-ink-3)' }}>
              Rather email? <a className="hx-link" href={`mailto:${FIRM.email}`}>{FIRM.email}</a>
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
