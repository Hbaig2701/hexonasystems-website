import type { PostBlock } from '@/content/insights';

/**
 * Renders a post body from a small fixed block vocabulary rather than from
 * Markdown or MDX.
 *
 * Two reasons, both of which matter more here than the convenience of MDX would.
 * Ticket 6 requires every heading to land at a predictable level so the document
 * outline is real, and a constrained vocabulary makes that true by construction
 * rather than by review. And §3.3 pins the type scale: a Markdown pipeline would
 * quietly stop obeying it the first time somebody pasted in an h4 or a bold run,
 * because display type on this site is serif at weight 400 and never bold.
 *
 * No client JavaScript. `data-enter` is picked up by the document-wide Entrances
 * observer, and the no-JS default is fully visible.
 */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="flex flex-col">
      {blocks.map((block, i) => {
        switch (block.t) {
          case 'h2':
            return (
              <h2 key={i} className="t-display-2 mb-6 mt-14 max-w-[30ch] first:mt-0" data-enter>
                {block.text}
              </h2>
            );

          case 'ul':
            return (
              <ul key={i} className="mb-6 flex max-w-[68ch] flex-col border-t border-line" data-enter>
                {block.items?.map((item, j) => (
                  <li key={j} className="t-small border-b border-line py-4 text-fg-2">
                    {item}
                  </li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol key={i} className="mb-6 flex max-w-[68ch] flex-col border-t border-line" data-enter>
                {block.items?.map((item, j) => (
                  <li key={j} className="flex gap-5 border-b border-line py-4">
                    {/* Mono numerals with the accent, matching SectionMarker —
                        the site's enumeration system, not a decorative bullet. */}
                    <span className="t-label shrink-0 pt-0.5 text-brand">
                      {String(j + 1).padStart(2, '0')}
                    </span>
                    <span className="t-small text-fg-2">{item}</span>
                  </li>
                ))}
              </ol>
            );

          case 'note':
            return (
              <aside
                key={i}
                className="mb-6 max-w-[68ch] border-l border-brand pl-6 py-1"
                data-enter
              >
                <p className="t-small text-fg-2">{block.text}</p>
              </aside>
            );

          default:
            return (
              <p key={i} className="t-body mb-6 max-w-[68ch] text-fg-2" data-enter>
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
