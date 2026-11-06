import Link from 'next/link';
import { CATEGORIES, articlesIn } from '@/content/blog';

/** Category pills for the blog hub and category pages. Empty categories are hidden. */
export function CategoryNav({ active }: { active?: string }) {
  return (
    <nav aria-label="Blog categories" className="mb-10">
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {[{ id: '', label: 'All' }, ...CATEGORIES].map((c) => {
          const on = (c.id || undefined) === active;
          const count = articlesIn(c.id ? (c.id as Parameters<typeof articlesIn>[0]) : undefined).length;
          if (c.id && count === 0) return null;
          return (
            <li key={c.id || 'all'}>
              <Link
                href={c.id ? `/blog/category/${c.id}` : '/blog'}
                aria-current={on ? 'page' : undefined}
                className="hx-pill"
                style={on ? { background: 'var(--hx-teal)', color: '#FFFFFF' } : undefined}
              >
                {c.label} <span className="ml-2 opacity-60">{count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

