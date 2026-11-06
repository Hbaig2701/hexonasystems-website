import type { Metadata } from 'next';
import { EMPLOYEES } from '@/content/employees';
import { PageHero } from '@/components/hx/PageHero';
import { CtaPair, RoleCard, SectionHead } from '@/components/hx/Blocks';
import { JsonLd, breadcrumbLd } from '@/lib/jsonld';
import { LogoMark } from '@/components/hx/Logo';
import { PointerTilt } from '@/components/hx/Interactive';

export const metadata: Metadata = {
  title: 'AI Employees for Service Businesses',
  description:
    'AI employees for service businesses: receptionist, sales follow-up, dispatcher, office admin, collections and retention. Each one chosen to raise your value.',
  alternates: { canonical: '/ai-employees' },
};

const ANSWER =
  'An AI employee is software that does one job in your business end to end: answering calls, following up leads, scheduling crews or chasing invoices. Hexona builds each one into the tools you already use, runs it for you, and reports the numbers it moved.';

export default function AiEmployeesPage() {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'AI Employees', path: '/ai-employees' },
  ];
  return (
    <div className="hx">
      <JsonLd data={breadcrumbLd(trail)} />
      <PageHero
        trail={trail}
        eyebrow="Your AI team"
        title={
          <>
            AI employees that make your business <span className="hx-mark">worth more.</span>
          </>
        }
        answer={ANSWER}
        aside={
          <div className="relative aspect-square">
            <div className="hx-orbit" aria-hidden="true">
              <span style={{ top: '6%', left: '50%' }} />
              <span style={{ bottom: '18%', left: '6%' }} />
              <span style={{ top: '40%', right: '-1%' }} />
            </div>
            <div className="hx-orbit hx-orbit-2" aria-hidden="true">
              <span style={{ top: '-1%', left: '30%' }} />
              <span style={{ bottom: '4%', right: '30%' }} />
            </div>
            <PointerTilt className="absolute inset-[20%]">
              <div className="hx-float h-full w-full">
                <LogoMark size="100%" className="hx-mark-shadow h-full w-full" />
              </div>
            </PointerTilt>
          </div>
        }
      >
        <CtaPair />
      </PageHero>

      <section aria-labelledby="roles" className="hx-wrap pb-28 pt-8">
        <SectionHead
          id="roles"
          kicker="The roles"
          title="Hire for the job that's costing you most."
          text="Each AI employee moves one of the numbers a buyer looks at. We start with the one that moves yours the most."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {EMPLOYEES.map((e, i) => (
            <RoleCard key={e.slug} employee={e} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
