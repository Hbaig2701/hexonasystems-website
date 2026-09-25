import Link from 'next/link';
import { cn } from '@/lib/cn';
import { populatedIndustries } from '@/content/evidence';

/**
 * IndustryFilter — the shelves across the top of the library.
 *
 * NO CLIENT JAVASCRIPT. Each shelf is a plain link to /evidence?industry=id
 * and the server filters. That buys three things a useState filter would not:
 * a filtered view is a URL somebody can send to a colleague, search engines
 * index each shelf separately, and the page keeps working with scripting off,
 * which is the baseline every other component on this site holds to.
 *
 * Empty shelves are never rendered. A filter button that leads to an empty
 * list is worse than no button, because it reads as a fault rather than as an
 * absence, and while §5 keeps most shelves bare that would be the common case.
 *
 * TWO THINGS KEEP THE PAGE STILL WHEN A SHELF IS CLICKED.
 *
 * `scroll={false}` stops Next scrolling to the first page element. Without it
 * the reader is thrown back to the top of the page every time they filter,
 * which is three screens above the thing they just changed.
 *
 * The `#records` hash is the no-JavaScript half of the same fix. With
 * scripting off the browser performs a full navigation and would otherwise
 * land at the top; the hash puts it on the record section instead. Belt and
 * braces, because the two paths fail differently.
 */
/** Must match the id on the record section in app/evidence/page.tsx. */
const HASH = '#records';

export function IndustryFilter({ active }: { active?: string }) {
  const shelves = populatedIndustries();

  /* One shelf is not a choice, it is a label. Nothing to filter. */
  if (shelves.length < 2) return null;

  return (
    <nav aria-label="Filter records by industry" className="mb-14">
      <ul className="flex flex-wrap items-center gap-x-3 gap-y-3">
        <Item href={`/evidence${HASH}`} label="All" active={!active} />
        {shelves.map((s) => (
          <Item
            key={s.id}
            href={`/evidence?industry=${s.id}${HASH}`}
            label={s.label}
            active={active === s.id}
          />
        ))}
      </ul>
    </nav>
  );
}

function Item({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <li>
      <Link
        href={href}
        scroll={false}
        aria-current={active ? 'page' : undefined}
        className={cn(
          /* leading-[1.45] because t-label sets line-height 1.2, which is
             right for the single-line uppercase labels it was built for and
             collides with itself on the one shelf long enough to wrap on a
             phone. Scoped here rather than changed on t-label, which would
             move the section markers and every table header with it. */
          't-label inline-block border px-4 py-2.5 leading-[1.45] transition-colors duration-[160ms]',
          active
            ? 'border-brand bg-brand text-bg'
            : 'border-line text-fg-2 hover:border-brand hover:text-fg',
        )}
      >
        {label}
      </Link>
    </li>
  );
}
