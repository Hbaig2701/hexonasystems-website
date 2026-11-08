/**
 * The shape of one blog article. Every article is a data file in
 * content/blog/articles/, rendered by one template (components/blog/ArticleView),
 * so layout, schema and SEO stay identical across the whole blog.
 *
 * Writing rules for every field live in content/blog/README.md, and
 * content/blog/blog.test.ts enforces the mechanical ones.
 */

import type { Faq } from '../faqs';

export type CategoryId = 'guides' | 'costs' | 'playbooks' | 'value' | 'news';

export interface Category {
  id: CategoryId;
  label: string;
  /** One line for the category index and llms.txt. */
  blurb: string;
}

/** The hero cover, rendered to a PNG by app/blog/[slug]/opengraph-image.tsx. */
export type Cover =
  /** A chat or text exchange, two to three short bubbles. */
  | { style: 'chat'; messages: { from: 'them' | 'ai'; text: string }[] }
  /** One big number with a label: "$0.10 a minute". */
  | { style: 'stat'; value: string; label: string }
  /** A short line of large type. */
  | { style: 'type'; text: string }
  /** A UI button with a pointer, and a small caption. */
  | { style: 'button'; text: string; caption: string }
  /** A small two-column comparison, up to four rows. */
  | { style: 'versus'; left: string; right: string; rows: [string, string][] };

/** An inline "at a glance" graphic. Rendered as real HTML, so its text is crawlable. */
export type Figure =
  | { kind: 'stats'; caption: string; items: { value: string; label: string }[] }
  | { kind: 'bars'; caption: string; items: { label: string; value: number; display: string }[] }
  | { kind: 'steps'; caption: string; items: string[] };

export interface Table {
  caption: string;
  columns: { key: string; label: string }[];
  rows: Record<string, string>[];
}

export interface Section {
  /** Anchor for the table of contents. */
  id: string;
  /** Phrase it as the question people actually search, where it fits. */
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: { title: string; detail: string }[];
  table?: Table;
  figure?: Figure;
  /** A short highlighted note: a caveat, a rule of thumb, a warning. */
  callout?: string;
}

export interface Source {
  label: string;
  url: string;
  /** What it was used for, and the date it was read: "Pricing page, read Nov 6, 2026". */
  note: string;
}

export interface Article {
  slug: string;
  category: CategoryId;
  /** Short label for cards and the format line: Guide, Comparison, Playbook, News, Analysis. */
  kind: string;
  /** The H1. Sentence case. */
  title: string;
  /** The <title>, at most 43 characters (the site adds " · Hexona Systems"). Defaults to title. */
  seoTitle?: string;
  /** Meta description, 120 to 160 characters. */
  description: string;
  datePublished: string;
  dateModified: string;
  /** The date every fact and price was last checked against its source. */
  lastChecked: string;
  cover: Cover;
  /** Describes what the cover shows, third person, for alt text. */
  coverAlt: string;
  /** The answer, first. The first two sentences are what Google and assistants quote. */
  intro: string[];
  /** 3 to 5 short facts. */
  tldr: string[];
  sections: Section[];
  /** 5 to 8. Becomes FAQPage schema, so the answers must stand alone. */
  faq: Faq[];
  sources: Source[];
  /** 3 slugs of related articles. */
  related: string[];
  /** The searches this page is written for. Not rendered; used for planning and reporting. */
  queries: string[];
  /**
   * Optional closing call to action, shown after the last section. Write it for
   * this article's reader, tie it to what Hexona builds, and never promise a
   * ranking or a result nobody controls.
   */
  cta?: { title: string; text: string };
}
