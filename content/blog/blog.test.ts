import { describe, expect, it } from 'vitest';
import { ARTICLES } from './index';
import { ARTICLE_FILES } from './articles';
import { pathLabel, pathsIn } from '@/lib/blog-links';
import type { Article } from './types';

/**
 * The mechanical half of content/blog/README.md. Every new article must pass
 * these before it ships; the scheduled writers run `npm test` before opening a PR.
 */

const BANNED = [
  'delve', 'landscape', 'seamless', 'robust', 'unlock', 'leverage', 'crucial', 'pivotal', 'elevate',
  'empower', 'journey', 'showcase', 'enhance', 'game-changer', 'game changer', 'revolutionize', 'revolutionise',
  'cutting-edge', "in today's", 'fast-paced', 'ultimately', "it's worth noting", "here's why", "here's how",
  "here's the thing", "let's dive", 'in conclusion', 'not just', "whether you're",
];

const INCOME = [/you will make/i, /guaranteed? (results|revenue|income|roi)/i, /passive income/i, /easy money/i];

/** Every string in an article, flattened. */
function strings(a: Article): string[] {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === 'string') out.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk({ ...a, queries: [], sources: a.sources.map((s) => [s.label, s.note]) });
  return out;
}

const SUFFIX = ' · Hexona Systems';

describe('blog registry', () => {
  it('has unique slugs', () => {
    const slugs = ARTICLES.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('uses lowercase hyphenated slugs', () => {
    for (const a of ARTICLES) expect(a.slug, a.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });
});

describe.each(ARTICLE_FILES.map((a) => [a.slug, a] as const))('article %s', (_slug, a) => {
  const all = strings(a);

  it('keeps the rendered <title> at 60 characters or less', () => {
    const rendered = (a.seoTitle ?? a.title) + SUFFIX;
    expect(rendered.length, rendered).toBeLessThanOrEqual(60);
  });

  it('keeps the description between 110 and 160 characters', () => {
    expect(a.description.length).toBeGreaterThanOrEqual(110);
    expect(a.description.length).toBeLessThanOrEqual(160);
  });

  it('has valid dates, modified on or after published', () => {
    for (const d of [a.datePublished, a.dateModified, a.lastChecked]) expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(a.dateModified >= a.datePublished).toBe(true);
  });

  it('answers in the intro, early', () => {
    expect(a.intro.length).toBeGreaterThan(0);
    const firstTwo = a.intro[0].split(/(?<=[.!?])\s+/).slice(0, 2).join(' ');
    expect(firstTwo.split(/\s+/).length, 'first two sentences').toBeLessThanOrEqual(75);
  });

  it('has a short version, sections, FAQs and sources', () => {
    expect(a.tldr.length).toBeGreaterThanOrEqual(3);
    expect(a.tldr.length).toBeLessThanOrEqual(5);
    expect(a.sections.length).toBeGreaterThanOrEqual(a.category === 'news' ? 2 : 4);
    expect(a.faq.length).toBeGreaterThanOrEqual(5);
    expect(a.faq.length).toBeLessThanOrEqual(8);
    expect(a.sources.length).toBeGreaterThanOrEqual(2);
    for (const s of a.sources) {
      expect(s.url, s.label).toMatch(/^https:\/\//);
      expect(s.note.length, s.label).toBeGreaterThan(10);
    }
    for (const f of a.faq) expect(f.answer.length, f.question).toBeGreaterThan(40);
  });

  it('has unique section anchors', () => {
    const ids = a.sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('uses no em or en dashes', () => {
    const bad = all.filter((s) => /[–—]/.test(s));
    expect(bad, bad.join('\n')).toEqual([]);
  });

  it('avoids the banned words', () => {
    const hits = all.flatMap((s) => BANNED.filter((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(s)).map((w) => `${w}: ${s.slice(0, 80)}`));
    expect(hits, hits.join('\n')).toEqual([]);
  });

  it('makes no income claims', () => {
    const hits = all.filter((s) => INCOME.some((re) => re.test(s)));
    expect(hits, hits.join('\n')).toEqual([]);
  });

  it('links 2 or more site pages, and every link resolves', () => {
    const paths = all.flatMap(pathsIn);
    const broken = paths.filter((p) => !pathLabel(p));
    expect(broken, broken.join(', ')).toEqual([]);
    expect(new Set(paths).size, 'distinct internal links').toBeGreaterThanOrEqual(2);
  });

  it('points related at real articles', () => {
    expect(a.related.length).toBeGreaterThanOrEqual(1);
    for (const r of a.related) expect(ARTICLES.some((x) => x.slug === r), r).toBe(true);
  });

  it('has cover alt text', () => {
    expect(a.coverAlt.length).toBeGreaterThan(15);
  });
});
