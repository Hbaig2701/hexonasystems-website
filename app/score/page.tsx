import type { Metadata } from 'next';
import { PageHero } from '@/components/hx/PageHero';
import { JsonLd, breadcrumbLd } from '@/lib/jsonld';
import { drivers } from '@/content/drivers';
import { delay } from '@/components/hx/Blocks';
import { ScoreTool } from './ScoreTool';

export const metadata: Metadata = {
  title: 'Enterprise Value Score: Free Assessment',
  description:
    'What is your business worth to a buyer? Score it on the 10 drivers of enterprise value in about five minutes. Free, no email needed, and it shows you what to fix first.',
  alternates: { canonical: '/score' },
};

export default function ScorePage() {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Enterprise Value Score', path: '/score' },
  ];
  return (
    <div className="hx">
      <JsonLd data={breadcrumbLd(trail)} />
      <PageHero
        trail={trail}
        eyebrow="Free · About 5 minutes"
        title={
          <>
            Would a buyer want your business <span className="hx-mark">today?</span>
          </>
        }
        answer="The Enterprise Value Score rates your business on the 10 things buyers look at, from clean financials to how much it depends on you. You get a score out of 100, your two biggest gaps, and the AI employee to start with."
      />

      <section aria-label="The score" className="hx-wrap pb-24">
        <div className="mx-auto max-w-[60rem]">
          <ScoreTool />
        </div>
      </section>

      <section aria-labelledby="drivers" style={{ background: 'var(--hx-cyan-soft)' }}>
        <div className="hx-wrap py-24">
          <p className="hx-kicker m-0 mb-4" data-enter="up">
            What it measures
          </p>
          <h2 id="drivers" className="hx-h2 m-0 max-w-[22ch]" data-enter="up">
            The 10 drivers of enterprise value.
          </h2>
          <p className="hx-lead m-0 mt-5 max-w-[42rem]" data-enter="up">
            Value is earnings times the multiple a buyer will pay. These are the things that move the multiple, and
            for each one there is a practical way to put AI to work.
          </p>
          <ol className="m-0 mt-12 grid list-none gap-4 p-0 md:grid-cols-2">
            {drivers.map((d, i) => (
              <li key={d.id} data-enter="up" style={{ ...delay((i % 2) * 80), background: '#FFFFFF', boxShadow: 'var(--hx-shadow-1)' }} className="hx-card">
                <div className="flex gap-5">
                  <span className="hx-serif text-[28px] leading-none" style={{ color: 'var(--hx-cyan)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block text-[19px] font-semibold">{d.name}</span>
                    <span className="mt-2 block text-[15px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                      <strong>Buyers want:</strong> {d.buyerWants}.
                    </span>
                    <span className="mt-1 block text-[15px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                      <strong>AI helps:</strong> {d.aiHelps}.
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
