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
 */
export function IndustryFilter({ active }: { active?: string }) {
  const shelves = populatedIndustries();

  /* One shelf is not a choice, it is a label. Nothing to filter. */
  if (shelves.length < 2) return null;

  return (
    <nav aria-label="Filter records by industry" className="mb-14">
      <ul className="flex flex-wrap items-center gap-x-3 gap-y-3">
        <Item href="/evidence" label="All" active={!active} />
        {shelves.map((s) => (
          <Item
            key={s.id}
            href={`/evidence?industry=${s.id}`}
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
        aria-current={active ? 'page' : undefined}
        className={cn(
          't-label inline-block border px-4 py-2.5 transition-colors duration-[160ms]',
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
