import Link from 'next/link';
import type { ReactNode } from 'react';
import { TOKEN, pathLabel } from '@/lib/blog-links';

/**
 * Turns plain article text into linked text, so writers never hand-write JSX:
 *
 *   - a site path (/blog/x, /ai-employees/x, /industries/x, /evidence/x, /score,
 *     /book, /firm) becomes a link labelled with that page's name;
 *   - a full https:// address becomes an external link labelled with its host
 *     and path;
 *   - **double asterisks** become bold.
 *
 * A path the site does not know is left as plain text (and the blog test fails
 * on it), so a typo can never ship as a broken link.
 */

export function RichText({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const tok = m[0];
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    if (tok.startsWith('**')) {
      out.push(
        <strong key={at} style={{ color: 'var(--hx-ink)' }}>
          {tok.slice(2, -2)}
        </strong>,
      );
    } else if (tok.startsWith('http')) {
      const u = new URL(tok);
      const label = (u.host.replace(/^www\./, '') + (u.pathname === '/' ? '' : u.pathname)).replace(/\/$/, '');
      out.push(
        <a key={at} href={tok} className="hx-link" rel="noopener noreferrer" target="_blank">
          {label}
        </a>,
      );
    } else {
      const label = pathLabel(tok);
      out.push(
        label ? (
          <Link key={at} href={tok} className="hx-link">
            {label}
          </Link>
        ) : (
          tok
        ),
      );
    }
    last = at + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
