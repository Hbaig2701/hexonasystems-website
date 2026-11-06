import { Icon, delay } from './Blocks';
import type { IconName } from '@/content/employees';

/**
 * An illustrative conversation card: what the AI employee actually does, shown
 * as a short exchange that plays in message by message. It is an example, not
 * a transcript, and is labelled as one.
 */
export function Conversation({
  title,
  icon,
  messages,
  outcome,
}: {
  title: string;
  icon: IconName;
  messages: { from: 'caller' | 'ai'; text: string }[];
  outcome: string;
}) {
  return (
    <figure className="m-0">
      <div className="hx-card" style={{ background: '#FFFFFF', boxShadow: 'var(--hx-shadow-2)', border: '1px solid var(--hx-line)', padding: 24 }}>
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'var(--hx-cyan-soft)', color: 'var(--hx-teal)' }}>
              <Icon name={icon} size={20} />
            </span>
            <span className="text-[15px] font-semibold">{title}</span>
          </span>
          <span className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--hx-ink-3)' }}>
            <span className="hx-ping" aria-hidden="true" /> Live
          </span>
        </div>
        <ol className="m-0 flex list-none flex-col gap-3 p-0">
          {messages.map((m, i) => (
            <li
              key={i}
              data-enter="up"
              style={delay(500 + i * 450)}
              className={m.from === 'ai' ? 'self-end' : 'self-start'}
            >
              <span
                className="block max-w-[19rem] rounded-2xl px-4 py-3 text-[15px] leading-snug"
                style={
                  m.from === 'ai'
                    ? { background: 'var(--hx-teal)', color: '#FFFFFF', borderBottomRightRadius: 6 }
                    : { background: 'var(--hx-mist)', color: 'var(--hx-ink)', borderBottomLeftRadius: 6 }
                }
              >
                <span className="sr-only">{m.from === 'ai' ? 'AI: ' : 'Caller: '}</span>
                {m.text}
              </span>
            </li>
          ))}
        </ol>
        <p
          className="m-0 mt-5 flex items-center gap-2 rounded-xl px-4 py-3 text-[14px] font-medium"
          style={{ background: 'var(--hx-cyan-soft)', color: 'var(--hx-teal)', ...delay(500 + messages.length * 450) }}
          data-enter="up"
        >
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
          {outcome}
        </p>
      </div>
      <figcaption className="mt-3 text-center text-[13px]" style={{ color: 'var(--hx-ink-3)' }}>
        Example conversation
      </figcaption>
    </figure>
  );
}
