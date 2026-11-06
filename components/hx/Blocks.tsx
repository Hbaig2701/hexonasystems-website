import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import type { Employee, IconName, ProofPoint } from '@/content/employees';
import type { Faq } from '@/content/faqs';
import { Tilt } from './Interactive';

/** Stagger helper for data-enter children. */
export const delay = (ms: number) => ({ ['--enter-delay' as string]: `${ms}ms` }) as CSSProperties;

const ICON_PATHS: Record<IconName, ReactNode> = {
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  route: (
    <>
      <circle cx="6" cy="19" r="2.5" />
      <circle cx="18" cy="5" r="2.5" />
      <path d="M8.5 19H15a3.5 3.5 0 000-7H9a3.5 3.5 0 010-7h6.5" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
      <path d="M14 3v5h5M9 13l2 2 4-4" />
    </>
  ),
  cash: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M7 9.5v5M17 9.5v5" />
    </>
  ),
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />,
};

export function Icon({ name, size = 22, color = 'currentColor' }: { name: IconName; size?: number; color?: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {ICON_PATHS[name]}
    </svg>
  );
}

/** A small live graphic in the corner of each role card. */
function RoleSignal({ name }: { name: IconName }) {
  if (name === 'phone' || name === 'bolt') {
    return (
      <span className="hx-wave" aria-hidden="true" style={{ color: 'var(--hx-cyan)' }}>
        <i /><i /><i /><i /><i />
      </span>
    );
  }
  return <span className="hx-ping" aria-hidden="true" />;
}

export function SectionHead({
  kicker,
  title,
  text,
  id,
}: {
  kicker?: string;
  title: ReactNode;
  text?: ReactNode;
  id?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-[40rem]" data-enter="up">
        {kicker && <p className="hx-kicker m-0 mb-4">{kicker}</p>}
        <h2 id={id} className="hx-h2 m-0">
          {title}
        </h2>
      </div>
      {text && (
        <p className="m-0 max-w-[26rem] text-[17px] leading-relaxed" style={{ color: 'var(--hx-ink-3)' }} data-enter="up">
          {text}
        </p>
      )}
    </div>
  );
}

export function RoleCard({ employee, index }: { employee: Employee; index: number }) {
  const tint = index % 2 === 0 ? 'var(--hx-cyan-soft)' : 'var(--hx-mist)';
  const body = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{ background: '#FFFFFF', color: 'var(--hx-teal)', boxShadow: 'var(--hx-shadow-1)' }}
        >
          <Icon name={employee.icon} />
        </span>
        <RoleSignal name={employee.icon} />
      </div>
      <p className="hx-kicker m-0 mt-6">Moves {employee.driver}</p>
      <h3 className="hx-h3 m-0 mt-2">{employee.name}</h3>
      <p className="m-0 mt-3 text-[16px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
        {employee.short}
      </p>
      {employee.page && (
        <span className="mt-5 inline-block text-[15px] font-medium" style={{ color: 'var(--hx-teal)' }}>
          Meet the {employee.name} <span aria-hidden="true">→</span>
        </span>
      )}
    </>
  );

  return (
    <div data-enter="up" style={delay((index % 3) * 90)}>
      {employee.page ? (
        <Tilt href={`/ai-employees/${employee.slug}`} className="hx-card block h-full no-underline" style={{ background: tint, color: 'var(--hx-ink)' }}>
          {body}
        </Tilt>
      ) : (
        <Tilt className="hx-card h-full" style={{ background: tint }}>
          {body}
        </Tilt>
      )}
    </div>
  );
}

export function ProofCard({ proof, index, accent }: { proof: ProofPoint; index: number; accent?: string }) {
  const bars = ['var(--hx-cyan)', 'var(--hx-teal)', 'var(--hx-cyan-light)'];
  return (
    <div data-enter="up" style={delay(index * 110)}>
      <Tilt
        href={`/evidence/${proof.caseSlug}`}
        max={4}
        className="hx-card flex h-full flex-col gap-4 no-underline"
        style={{
          background: '#FFFFFF',
          color: 'var(--hx-ink)',
          border: '1px solid var(--hx-line)',
          borderTop: `6px solid ${accent ?? bars[index % 3]}`,
          boxShadow: 'var(--hx-shadow-1)',
        }}
      >
        <span className="text-[14px]" style={{ color: 'var(--hx-ink-3)' }}>
          {proof.sector}
        </span>
        <span className="hx-serif text-[52px] leading-none" style={{ color: 'var(--hx-teal)' }}>
          {proof.figure}
        </span>
        <span className="text-[16px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
          {proof.label}.
        </span>
        <span className="mt-auto text-[15px] font-medium" style={{ color: 'var(--hx-teal)' }}>
          Read the case <span aria-hidden="true">→</span>
        </span>
      </Tilt>
    </div>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="border-t" style={{ borderColor: 'var(--hx-line)' }}>
      {faqs.map((f, i) => (
        <details key={f.question} className="border-b" style={{ borderColor: 'var(--hx-line)' }} data-enter="up">
          <summary className="flex items-start justify-between gap-6 py-6">
            <h3 className="m-0 text-[19px] font-semibold leading-snug" style={{ color: 'var(--hx-ink)' }}>
              {f.question}
            </h3>
            <span
              className="hx-plus mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full text-[20px]"
              style={{ background: 'var(--hx-cyan-soft)', color: 'var(--hx-teal)' }}
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className="m-0 max-w-[60rem] pb-6 text-[17px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }} id={`faq-${i}`}>
            {f.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

export function CtaPair({ secondary }: { secondary?: { label: string; href: string } }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/book" className="hx-btn hx-btn-primary">
        Book a free consult <span className="hx-arrow" aria-hidden="true">→</span>
      </Link>
      {secondary && (
        <Link href={secondary.href} className="hx-btn hx-btn-ghost">
          {secondary.label}
        </Link>
      )}
    </div>
  );
}

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-[14px]" style={{ color: 'var(--hx-ink-3)' }}>
      <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
        {trail.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            {i < trail.length - 1 ? (
              <Link href={c.path} className="hx-link">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page">{c.name}</span>
            )}
            {i < trail.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
