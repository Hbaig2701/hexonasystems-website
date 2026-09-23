import { describe, expect, it } from 'vitest';
import { ENTITY_SENTENCE, PROFILES } from './firm';
import { DIAGNOSTIC_FAQS, EVIDENCE_FAQS, IMPLEMENTATION_FAQS } from './faqs';
import { postWordCount, publishedPosts } from './insights';

/**
 * The semantic half of the AI SEO Developer Guide gate. The textual half is
 * scripts/check-seo.mjs; `npm run check:seo` runs both.
 *
 * These are tests rather than grep because they need to import the content
 * modules and count real words, which a regex cannot do honestly.
 *
 * Note that v2 arrived with no test script at all, though vitest was still a
 * devDependency. `npm test` is restored in package.json.
 */

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

describe('Ticket 5 — the entity sentence', () => {
  it('names the city', () => {
    expect(ENTITY_SENTENCE).toMatch(/Toronto/);
  });

  it('names the category of business', () => {
    expect(ENTITY_SENTENCE).toMatch(/operational diligence/i);
  });

  it('names at least two concrete deliverables', () => {
    const deliverables = [
      /diagnostic/i,
      /process automation/i,
      /CRM/,
      /reporting/i,
    ].filter((re) => re.test(ENTITY_SENTENCE));
    expect(deliverables.length).toBeGreaterThanOrEqual(2);
  });

  it('names at least two industries', () => {
    const industries = [
      /home services/i,
      /construction/i,
      /automotive/i,
      /hospitality/i,
      /health/i,
    ].filter((re) => re.test(ENTITY_SENTENCE));
    expect(industries.length).toBeGreaterThanOrEqual(2);
  });

  it('states the operating range, so it cannot be read as an SMB agency', () => {
    // The specific failure this guards: v1 was repositioned from an SMB
    // automation agency, and a definition sentence that omits the range invites
    // exactly the old reading back in.
    expect(ENTITY_SENTENCE).toMatch(/\$10M/);
  });

  it('contains no puffery', () => {
    // The guide names these four explicitly. They are banned because they are
    // unfalsifiable, which is what makes them worthless to a crawler and, by
    // §10, unpublishable here regardless.
    for (const adjective of ['leading', 'pioneering', 'world-class', 'cutting-edge']) {
      expect(ENTITY_SENTENCE.toLowerCase()).not.toContain(adjective);
    }
  });
});

describe('Ticket 6 — the blog', () => {
  const posts = publishedPosts();

  it('publishes ten posts', () => {
    expect(posts.length).toBeGreaterThanOrEqual(10);
  });

  it.each(posts.map((p) => [p.slug, p] as const))('%s is at least 800 words', (_slug, post) => {
    expect(postWordCount(post)).toBeGreaterThanOrEqual(800);
  });

  it.each(posts.map((p) => [p.slug, p] as const))(
    '%s answers its title question inside 100 words',
    (_slug, post) => {
      expect(post.answer.trim().length).toBeGreaterThan(0);
      expect(words(post.answer)).toBeLessThanOrEqual(100);
    },
  );

  it.each(posts.map((p) => [p.slug, p] as const))(
    '%s contains at least one real number',
    (_slug, post) => {
      const all = [post.answer, ...post.body.flatMap((b) => b.items ?? [b.text ?? ''])].join(' ');
      expect(all).toMatch(/\d/);
    },
  );

  it('writes every title to a question, a comparison or a task', () => {
    // "Written to the question, not the keyword." Three shapes are legitimate,
    // and all three are things somebody types.
    for (const post of posts) {
      const shaped =
        post.title.includes('?') || /\bvs\b/i.test(post.title) || /^How to /i.test(post.title);
      expect(shaped, `"${post.title}" is not written to a question, comparison or task`).toBe(true);
    }
  });

  it('has no duplicate slugs', () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('never addresses a small business, which would contradict the ICP', () => {
    // ⚠️ THE REASON THIS TEST EXISTS. The guide's own ten topics were written for
    // the Wix site's SMB buyer — "which is right for a small business" — and the
    // firm now sells at $10M-$100M. §5 refuses an engagement record below that
    // range because a reader who finds one dismisses the whole property; a post
    // written for somebody a tenth his size does the same damage. If a future
    // post needs this vocabulary, it needs a different audience decision first.
    for (const post of posts) {
      const surface = `${post.title} ${post.description} ${post.answer}`.toLowerCase();
      expect(surface, `"${post.title}" addresses an SMB reader`).not.toMatch(
        /small business|solopreneur|side hustle/,
      );
    }
  });
});

describe('Ticket 7 — FAQ blocks', () => {
  it.each([
    ['diagnostic', DIAGNOSTIC_FAQS],
    ['implementation', IMPLEMENTATION_FAQS],
    ['evidence', EVIDENCE_FAQS],
  ] as const)('%s has at least five Q&A pairs', (_page, faqs) => {
    expect(faqs.length).toBeGreaterThanOrEqual(5);
  });

  it('has no empty or stub answers anywhere', () => {
    const every = [...DIAGNOSTIC_FAQS, ...IMPLEMENTATION_FAQS, ...EVIDENCE_FAQS];
    for (const faq of every) {
      expect(faq.question.trim().length).toBeGreaterThan(0);
      expect(faq.answer.trim().length).toBeGreaterThan(40);
    }
  });

  it('states the clock anchored to systems access wherever it states it at all', () => {
    // content/firm.ts insists on this everywhere, and an FAQ is the surface most
    // likely to be quoted back. "Two weeks" without the anchor is the claim that
    // reads as a bait-and-switch the first time it slips.
    const every = [...DIAGNOSTIC_FAQS, ...IMPLEMENTATION_FAQS, ...EVIDENCE_FAQS];
    for (const faq of every) {
      if (/two week/i.test(faq.answer)) {
        expect(faq.answer, `"${faq.question}" says two weeks without the access anchor`).toMatch(
          /access/i,
        );
      }
    }
  });
});

describe('Ticket 9 — third-party profiles', () => {
  it('emits no sameAs for a profile without a URL', () => {
    // A sameAs pointing at a profile that does not exist is a broken assertion
    // about identity, and entity resolution penalises exactly that.
    for (const profile of PROFILES) {
      if (profile.verified) expect(profile.url.length).toBeGreaterThan(0);
    }
  });
});
