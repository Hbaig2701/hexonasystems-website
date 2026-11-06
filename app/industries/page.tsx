import type { Metadata } from 'next';
import Link from 'next/link';
import { INDUSTRY_LIST } from '@/content/industries';
import { PageHero } from '@/components/hx/PageHero';
import { CtaPair, SectionHead, delay } from '@/components/hx/Blocks';
import { Tilt } from '@/components/hx/Interactive';
import { JsonLd, breadcrumbLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'AI for Service Businesses by Industry',
  description:
    'How Hexona builds AI employees for construction, home services, med spas, property management, automotive and hospitality businesses in the US and Canada.',
  alternates: { canonical: '/industries' },
};

const ANSWER =
  'Every industry loses money in the same places: calls nobody answers, leads nobody follows up and admin nobody has time for. What changes is the detail, so we build each AI employee around how your industry actually works.';

export default function IndustriesPage() {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries' },
  ];
  return (
    <div className="hx">
      <JsonLd data={breadcrumbLd(trail)} />
      <PageHero trail={trail} eyebrow="Industries" title={<>Built for <span className="hx-mark">service businesses.</span></>} answer={ANSWER}>
        <CtaPair />
      </PageHero>

      <section aria-labelledby="list" className="hx-wrap pb-28 pt-8">
        <SectionHead id="list" kicker="Industries" title="Find your industry." />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRY_LIST.map((ind, i) => (
            <div key={ind.slug} data-enter="up" style={delay((i % 3) * 90)}>
              <Tilt
                href={ind.page ? `/industries/${ind.slug}` : undefined}
                className="hx-card flex h-full flex-col no-underline"
                style={{ background: i % 2 ? 'var(--hx-mist)' : 'var(--hx-cyan-soft)', color: 'var(--hx-ink)', minHeight: 180 }}
              >
                <h3 className="hx-h3 m-0">{ind.name}</h3>
                <p className="m-0 mt-3 text-[16px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                  {ind.page ? ind.page.metaDescription.split(':')[0] + '.' : 'Page coming soon. Ask us about it on a free consult.'}
                </p>
                {ind.page && (
                  <span className="mt-auto pt-5 text-[15px] font-medium" style={{ color: 'var(--hx-teal)' }}>
                    See how it works <span aria-hidden="true">→</span>
                  </span>
                )}
              </Tilt>
            </div>
          ))}
        </div>
        <p className="m-0 mt-10 text-[16px]" style={{ color: 'var(--hx-ink-3)' }} data-enter="up">
          Don&rsquo;t see yours?{' '}
          <Link href="/book" className="hx-link">
            Tell us what you do
          </Link>{' '}
          and we&rsquo;ll tell you honestly whether we can help.
        </p>
      </section>
    </div>
  );
}
