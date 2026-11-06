/**
 * The blog registry. Import each article file and add it to ARTICLE_FILES.
 * Order doesn't matter: everything sorts by datePublished, newest first.
 *
 * The five posts written for v2 (content/insights.ts) are adapted into the same
 * shape below so the blog has one template and one URL scheme. They are marked
 * `legacy` and exempt from the newer rules (FAQ, sources) until rewritten.
 */

import type { Article, Category, CategoryId, Section } from './types';
import { POSTS } from '../insights';
import { ARTICLE_FILES } from './articles';

export const CATEGORIES: Category[] = [
  { id: 'guides', label: 'Guides', blurb: 'Plain-English explainers on AI for owners of service businesses.' },
  { id: 'costs', label: 'Costs & comparisons', blurb: 'What AI receptionists, answering services and automation actually cost, side by side.' },
  { id: 'playbooks', label: 'Playbooks', blurb: 'Step-by-step fixes for missed calls, slow follow-up, reviews, no-shows and late invoices.' },
  { id: 'value', label: 'Business value', blurb: 'What makes a service business worth more to a buyer, and how to get there.' },
  { id: 'news', label: 'AI news', blurb: 'What changed in AI this week and what it means for a service business.' },
];

export const categoryLabel = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)?.label ?? id;

export type BlogArticle = Article & { legacy?: boolean };

/** Short cover lines for the v2 posts, so the cover doesn't repeat the title. */
const LEGACY_COVER: Record<string, string> = {
  'what-is-revenue-leakage': 'The leads you paid for and never answered.',
  'revenue-leakage-vs-a-sales-problem': 'Not enough leads, or leads lost on the way in?',
  'which-revenue-leaks-to-close-first': 'Close the cheapest leak first.',
  'how-to-measure-roi-on-closing-a-revenue-leak': 'Found. Fixed. Measured.',
  'how-to-price-a-revenue-leak-in-ebitda': 'Every leak has a price in EBITDA.',
};

/** v2 posts, adapted: the answer becomes the intro, each h2 starts a section. */
function fromLegacy(): BlogArticle[] {
  return POSTS.filter((p) => p.published).map((p) => {
    const sections: Section[] = [];
    let current: Section | null = null;
    for (const b of p.body) {
      if (b.t === 'h2') {
        current = { id: (b.text ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), heading: b.text ?? '', paragraphs: [] };
        sections.push(current);
        continue;
      }
      if (!current) {
        current = { id: 'overview', heading: 'Overview', paragraphs: [] };
        sections.push(current);
      }
      if (b.t === 'ul' || b.t === 'ol') current.bullets = [...(current.bullets ?? []), ...(b.items ?? [])];
      else if (b.t === 'note') current.callout = b.text;
      else current.paragraphs = [...(current.paragraphs ?? []), b.text ?? ''];
    }
    const date = p.datePublished;
    return {
      legacy: true,
      slug: p.slug,
      category: 'value',
      kind: 'Analysis',
      title: p.title,
      seoTitle: p.metaTitle,
      description: p.description,
      datePublished: date,
      dateModified: p.dateModified ?? date,
      lastChecked: p.dateModified ?? date,
      cover: { style: 'type', text: LEGACY_COVER[p.slug] ?? p.category },
      coverAlt: `The words "${LEGACY_COVER[p.slug] ?? p.category}" in large type beside the article title.`,
      intro: [p.answer],
      tldr: [],
      sections,
      faq: [],
      sources: [],
      related: [],
      queries: [],
    };
  });
}

export const ARTICLES: BlogArticle[] = [...ARTICLE_FILES, ...fromLegacy()].sort((a, b) =>
  b.datePublished === a.datePublished ? a.slug.localeCompare(b.slug) : b.datePublished.localeCompare(a.datePublished),
);

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

export const articlesIn = (category?: CategoryId) => (category ? ARTICLES.filter((a) => a.category === category) : ARTICLES);

/** Related: the article's own picks first, then the newest in the same category. */
export function relatedTo(a: BlogArticle, n = 3): BlogArticle[] {
  const picked = a.related.map(getArticle).filter((x): x is BlogArticle => Boolean(x));
  const fill = ARTICLES.filter((x) => x.slug !== a.slug && x.category === a.category && !picked.includes(x));
  const rest = ARTICLES.filter((x) => x.slug !== a.slug && !picked.includes(x) && !fill.includes(x));
  return [...picked, ...fill, ...rest].slice(0, n);
}

export function wordCount(a: Article): number {
  const text = [
    ...a.intro,
    ...a.tldr,
    ...a.sections.flatMap((s) => [
      s.heading,
      ...(s.paragraphs ?? []),
      ...(s.bullets ?? []),
      ...(s.steps ?? []).flatMap((x) => [x.title, x.detail]),
      s.callout ?? '',
      ...(s.table ? s.table.rows.flatMap((r) => Object.values(r)) : []),
    ]),
    ...a.faq.flatMap((f) => [f.question, f.answer]),
  ].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}

export const readingMinutes = (a: Article) => Math.max(2, Math.round(wordCount(a) / 230));

export const blogPath = (slug: string) => `/blog/${slug}`;
