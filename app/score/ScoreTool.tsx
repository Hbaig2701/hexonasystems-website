'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { drivers } from '@/content/drivers';
import { getEmployee } from '@/content/employees';
import { QUESTION_COUNT, band, decodeAnswers, encodeAnswers, scoreAnswers, type ScoreResult } from '@/lib/score';

const QUESTIONS = drivers.flatMap((driver) => driver.statements.map((statement) => ({ driver, statement })));
const SCALE = [
  { n: 1, label: 'Not at all' },
  { n: 2, label: 'Rarely' },
  { n: 3, label: 'Partly' },
  { n: 4, label: 'Mostly' },
  { n: 5, label: 'Completely' },
];

type Stage = { step: 'intro' } | { step: 'question'; index: number } | { step: 'result'; answers: number[] };

/**
 * The Enterprise Value Score: 20 statements, one at a time, then the result.
 * Nothing is sent anywhere. The answers live in the URL hash so a result can be
 * bookmarked or shared, and reloading the page keeps it.
 */
export function ScoreTool() {
  const [stage, setStage] = useState<Stage>({ step: 'intro' });
  const [answers, setAnswers] = useState<number[]>([]);
  const topRef = useRef<HTMLDivElement>(null);

  // A shared or reloaded result arrives in the hash.
  useEffect(() => {
    const fromHash = decodeAnswers(window.location.hash.slice(1));
    if (fromHash) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the URL once on mount
      setAnswers(fromHash);
      setStage({ step: 'result', answers: fromHash });
    }
  }, []);

  useEffect(() => {
    if (stage.step === 'intro') return;
    const el = topRef.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [stage]);

  const answer = (index: number, n: number) => {
    const next = [...answers];
    next[index] = n;
    setAnswers(next);
    if (index + 1 < QUESTION_COUNT) {
      setStage({ step: 'question', index: index + 1 });
    } else {
      window.history.replaceState(null, '', `#${encodeAnswers(next)}`);
      setStage({ step: 'result', answers: next });
    }
  };

  const restart = () => {
    setAnswers([]);
    window.history.replaceState(null, '', window.location.pathname);
    setStage({ step: 'question', index: 0 });
  };

  return (
    <div ref={topRef} className="scroll-mt-28">
      {stage.step === 'intro' && <Intro onStart={() => setStage({ step: 'question', index: 0 })} />}
      {stage.step === 'question' && (
        <Question
          index={stage.index}
          value={answers[stage.index]}
          onAnswer={(n) => answer(stage.index, n)}
          onBack={() => setStage(stage.index === 0 ? { step: 'intro' } : { step: 'question', index: stage.index - 1 })}
        />
      )}
      {stage.step === 'result' && <Result result={scoreAnswers(stage.answers)} onRestart={restart} />}
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="hx-card grid gap-10 md:grid-cols-[1.2fr_0.8fr]" style={{ background: '#FFFFFF', border: '1px solid var(--hx-line)', boxShadow: 'var(--hx-shadow-2)', padding: 40 }}>
      <div>
        <h2 className="hx-h2 m-0" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
          20 statements. About five minutes.
        </h2>
        <p className="m-0 mt-4 text-[17px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
          Rate how true each one is for your business today. Be honest: the score is only useful if it shows you
          where the gaps really are. Nothing is sent anywhere, and you don&rsquo;t need to give us your email.
        </p>
        <button type="button" onClick={onStart} className="hx-btn hx-btn-primary mt-8 cursor-pointer">
          Start my score <span className="hx-arrow" aria-hidden="true">→</span>
        </button>
      </div>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {['Your overall score out of 100', 'A score for each of the 10 drivers', 'Your two biggest gaps', 'The AI employee to start with'].map((x) => (
          <li key={x} className="flex items-center gap-3 rounded-2xl px-5 py-4 text-[16px]" style={{ background: 'var(--hx-cyan-soft)' }}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--hx-teal)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7" />
            </svg>
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Question({
  index,
  value,
  onAnswer,
  onBack,
}: {
  index: number;
  value: number | undefined;
  onAnswer: (n: number) => void;
  onBack: () => void;
}) {
  const q = QUESTIONS[index];
  const headingRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => headingRef.current?.focus({ preventScroll: true }), [index]);
  const pct = Math.round((index / QUESTION_COUNT) * 100);

  return (
    <div className="hx-card" style={{ background: '#FFFFFF', border: '1px solid var(--hx-line)', boxShadow: 'var(--hx-shadow-2)', padding: 0, overflow: 'hidden' }}>
      <div role="progressbar" aria-label="Score progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} className="h-2 w-full" style={{ background: 'var(--hx-mist)' }}>
        <div className="h-full transition-[width] duration-500" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, var(--hx-cyan), var(--hx-teal))' }} />
      </div>
      <div className="p-8 sm:p-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="hx-kicker">{q.driver.scoreName}</span>
          <span className="text-[14px]" style={{ color: 'var(--hx-ink-3)' }}>
            {index + 1} of {QUESTION_COUNT}
          </span>
        </div>
        {/* key restarts the fade for each new statement */}
        <p
          key={index}
          ref={headingRef}
          tabIndex={-1}
          id="score-question"
          className="hx-serif m-0 mt-6 text-[clamp(1.6rem,3vw,2.25rem)] leading-snug outline-none"
          style={{ animation: 'hx-fade-in 400ms ease both' }}
        >
          {q.statement}
        </p>
        <div role="group" aria-labelledby="score-question" className="mt-10 grid grid-cols-5 gap-2 sm:gap-3">
          {SCALE.map((s) => {
            const on = value === s.n;
            return (
              <button
                key={s.n}
                type="button"
                aria-pressed={on}
                aria-label={`${s.n}, ${s.label}`}
                onClick={() => onAnswer(s.n)}
                className="flex min-h-[72px] cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border transition-[transform,background-color,border-color,box-shadow] duration-200 hover:-translate-y-0.5"
                style={{
                  background: on ? 'var(--hx-teal)' : 'var(--hx-cyan-soft)',
                  borderColor: on ? 'var(--hx-teal)' : 'var(--hx-line)',
                  color: on ? '#FFFFFF' : 'var(--hx-ink)',
                  boxShadow: on ? 'var(--hx-shadow-1)' : 'none',
                }}
              >
                <span className="hx-serif text-[24px] leading-none">{s.n}</span>
                <span className="hidden text-[13px] sm:block" style={{ color: on ? 'var(--hx-on-teal)' : 'var(--hx-ink-3)' }}>
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex justify-between text-[13px] sm:hidden" style={{ color: 'var(--hx-ink-3)' }} aria-hidden="true">
          <span>Not at all</span>
          <span>Completely</span>
        </div>
        <button type="button" onClick={onBack} className="hx-link mt-8 cursor-pointer border-0 bg-transparent p-0 text-[15px]">
          ← Back
        </button>
      </div>
    </div>
  );
}

function Gauge({ value }: { value: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- no animation for reduced motion
      setShown(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 1400, 1);
      setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  const r = 88;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto h-[220px] w-[220px]">
      <svg viewBox="0 0 220 220" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="110" cy="110" r={r} fill="none" stroke="rgba(127,227,234,0.2)" strokeWidth="16" />
        <circle cx="110" cy="110" r={r} fill="none" stroke="var(--hx-cyan)" strokeWidth="16" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - shown / 100)} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="hx-serif text-[64px] leading-none" style={{ color: '#FFFFFF' }}>
          {shown}
        </span>
        <span className="text-[14px]" style={{ color: 'var(--hx-on-teal)' }}>
          out of 100
        </span>
      </div>
    </div>
  );
}

function Result({ result, onRestart }: { result: ScoreResult; onRestart: () => void }) {
  const b = band(result.overall);
  const [copied, setCopied] = useState(false);
  const [bars, setBars] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setBars(true), 300);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <section aria-labelledby="your-score" className="hx-card grid items-center gap-10 md:grid-cols-[auto_1fr]" style={{ background: 'var(--hx-teal)', color: '#FFFFFF', padding: 40 }}>
        <Gauge value={result.overall} />
        <div>
          <p className="hx-kicker m-0" style={{ color: 'var(--hx-cyan-light)' }}>
            Your Enterprise Value Score
          </p>
          <h2 id="your-score" className="hx-h2 m-0 mt-3" style={{ color: '#FFFFFF' }}>
            {b.label}
          </h2>
          <p className="m-0 mt-4 max-w-[36rem] text-[17px] leading-relaxed" style={{ color: 'var(--hx-on-teal)' }}>
            {b.text} Your strongest driver is <strong style={{ color: '#FFFFFF' }}>{result.strongest.short.toLowerCase()}</strong>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book" className="hx-btn hx-btn-cyan">
              Go through it on a free consult <span className="hx-arrow" aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              className="hx-btn hx-btn-outline-dark cursor-pointer bg-transparent"
              onClick={() => {
                void navigator.clipboard?.writeText(window.location.href).then(() => setCopied(true));
              }}
            >
              {copied ? 'Link copied' : 'Copy link to this result'}
            </button>
          </div>
        </div>
      </section>

      <section aria-labelledby="gaps" className="grid gap-6 md:grid-cols-2">
        <h2 id="gaps" className="sr-only">
          Your two biggest gaps
        </h2>
        {result.gaps.map((g, i) => {
          const emp = getEmployee(g.employee);
          const score = result.byDriver.find((d) => d.driver.id === g.id)?.score ?? 0;
          return (
            <div key={g.id} className="hx-card flex flex-col gap-3" style={{ background: i ? 'var(--hx-mist)' : 'var(--hx-cyan-soft)' }}>
              <span className="hx-kicker">Gap {i + 1} · {score}/100</span>
              <span className="hx-h3">{g.name}</span>
              <span className="text-[16px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                <strong style={{ color: 'var(--hx-ink)' }}>What a buyer wants:</strong> {g.buyerWants}.
              </span>
              <span className="text-[16px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                <strong style={{ color: 'var(--hx-ink)' }}>Build first:</strong> {g.buildFirst}.
              </span>
              {emp && (
                <span className="mt-auto pt-3">
                  {emp.page ? (
                    <Link href={`/ai-employees/${emp.slug}`} className="hx-btn hx-btn-primary !min-h-[44px] !px-5 !py-3 text-[15px]">
                      Meet the {emp.name} <span className="hx-arrow" aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <span className="text-[15px] font-medium" style={{ color: 'var(--hx-teal)' }}>
                      The {emp.name} handles this.
                    </span>
                  )}
                </span>
              )}
            </div>
          );
        })}
      </section>

      <section aria-labelledby="all" className="hx-card" style={{ background: '#FFFFFF', border: '1px solid var(--hx-line)', boxShadow: 'var(--hx-shadow-1)' }}>
        <h2 id="all" className="hx-h3 m-0">
          All 10 drivers
        </h2>
        <ul className="m-0 mt-6 flex list-none flex-col gap-4 p-0">
          {result.byDriver.map(({ driver, score }, i) => (
            <li key={driver.id}>
              <div className="flex justify-between gap-4 text-[15px]">
                <span className="font-medium">
                  {driver.name}
                  {driver.weight === 2 && (
                    <span className="ml-2 text-[13px] font-normal" style={{ color: 'var(--hx-ink-3)' }}>
                      counts double
                    </span>
                  )}
                </span>
                <span style={{ color: 'var(--hx-ink-3)' }}>{score}</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full" style={{ background: 'var(--hx-mist)' }} aria-hidden="true">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: bars ? `${Math.max(score, 2)}%` : '0%',
                    background: score < 40 ? 'var(--hx-cyan)' : 'var(--hx-teal)',
                    transition: `width 1100ms cubic-bezier(0.22,1,0.36,1) ${i * 70}ms`,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
        <p className="m-0 mt-8 text-[14px] leading-relaxed" style={{ color: 'var(--hx-ink-3)' }}>
          The score isn&rsquo;t a valuation and won&rsquo;t estimate a sale price. It shows you what to improve. For a
          formal valuation, talk to a business broker or a valuation professional.
        </p>
        <button type="button" onClick={onRestart} className="hx-link mt-4 cursor-pointer border-0 bg-transparent p-0 text-[15px]">
          Retake the score
        </button>
      </section>
    </div>
  );
}
