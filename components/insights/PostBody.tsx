import type { PostBlock } from '@/content/insights';

/** Renders an article body in the v3 type system. */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="flex flex-col">
      {blocks.map((block, i) => {
        switch (block.t) {
          case 'h2':
            return (
              <h2 key={i} className="hx-h2 mb-5 mt-14 first:mt-0" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }} data-enter="up">
                {block.text}
              </h2>
            );
          case 'ul':
            return (
              <ul key={i} className="m-0 mb-6 flex list-none flex-col gap-3 p-0" data-enter="up">
                {block.items?.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[17px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                    <span aria-hidden="true" className="mt-[0.6em] h-2 w-2 flex-none rounded-full" style={{ background: 'var(--hx-cyan)' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="m-0 mb-6 flex list-none flex-col gap-4 p-0" data-enter="up">
                {block.items?.map((item, j) => (
                  <li key={j} className="flex gap-4">
                    <span className="hx-serif flex h-8 w-8 flex-none items-center justify-center rounded-full text-[15px]" style={{ background: 'var(--hx-cyan-soft)', color: 'var(--hx-teal)' }}>
                      {j + 1}
                    </span>
                    <span className="pt-0.5 text-[17px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            );
          case 'note':
            return (
              <aside key={i} className="mb-6 rounded-2xl p-6" style={{ background: 'var(--hx-cyan-soft)', borderLeft: '4px solid var(--hx-cyan)' }} data-enter="up">
                <p className="m-0 text-[16px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                  {block.text}
                </p>
              </aside>
            );
          default:
            return (
              <p key={i} className="m-0 mb-6 text-[17px] leading-[1.75]" style={{ color: 'var(--hx-ink-2)' }} data-enter="up">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
