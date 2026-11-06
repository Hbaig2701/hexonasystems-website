import { ARTICLES } from '@/content/blog';
import { EMPLOYEES } from '@/content/employees';
import { INDUSTRY_LIST } from '@/content/industries';
import { CASE_STUDIES } from '@/content/evidence';

/** Link logic for article text (components/blog/RichText). No JSX, so tests can import it. */

const STATIC_LABELS: Record<string, string> = {
  '/': 'our homepage',
  '/book': 'book a free consult',
  '/score': 'the Enterprise Value Score',
  '/firm': 'about Hexona',
  '/evidence': 'our case studies',
  '/ai-employees': 'the AI employees we build',
  '/industries': 'the industries we work with',
  '/blog': 'the blog',
};

export function pathLabel(path: string): string | undefined {
  if (STATIC_LABELS[path]) return STATIC_LABELS[path];
  const [, kind, slug] = path.split('/');
  if (kind === 'blog') return ARTICLES.find((a) => a.slug === slug)?.title;
  if (kind === 'ai-employees') {
    const e = EMPLOYEES.find((x) => x.slug === slug);
    return e?.page ? `our ${e.name} page` : undefined;
  }
  if (kind === 'industries') {
    const i = INDUSTRY_LIST.find((x) => x.slug === slug);
    return i?.page ? `AI for ${i.name.toLowerCase()}` : undefined;
  }
  if (kind === 'evidence') {
    const c = CASE_STUDIES.find((x) => x.slug === slug);
    return c ? `the ${c.sector.toLowerCase()} case study` : undefined;
  }
  return undefined;
}

export const TOKEN = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+[^\s).,;:!?'"]|(?<![\w/.])\/(?:blog|ai-employees|industries|evidence)\/[a-z0-9-]+|(?<![\w/.])\/(?:book|score|firm|evidence|ai-employees|industries|blog)(?![\w/-]))/g;

/** Every site path a piece of text links to, for the blog test. */
export function pathsIn(text: string): string[] {
  return [...text.matchAll(TOKEN)].map((m) => m[0]).filter((t) => t.startsWith('/'));
}
