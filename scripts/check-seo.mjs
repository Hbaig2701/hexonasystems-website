#!/usr/bin/env node
/**
 * scripts/check-seo.mjs — the AI SEO Developer Guide gate.
 *
 * Sibling to check-contrast.mjs. This exists because the entire SEO layer was
 * built once against v1 and then deleted wholesale by the v2 rewrite: no
 * robots.ts, no sitemap.ts, no structured data, and a redirect table still
 * pointing at routes v2 had removed. None of that failed a build, so none of it
 * was noticed.
 *
 * Everything checked here is structural, and structural things are exactly what
 * a rewrite silently drops. Textual checks live in this file; the semantic ones —
 * post word counts, the entity sentence's own constraints, FAQ minimums — live in
 * content/seo.test.ts, because those need to import the TypeScript rather than
 * grep it. `npm run check:seo` runs both.
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

/**
 * Strips comments before any textual check.
 *
 * Every rule below is about what the code DOES, and this codebase documents its
 * reasoning heavily — so the exact strings these checks hunt for (the AI crawler
 * names, "permanent: true", "/method") all legitimately appear in prose
 * explaining why they are absent. Scanning raw source flags the documentation of
 * a rule as a violation of it.
 */
const code = (p) =>
  read(p)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');

let failures = 0;
const fail = (msg, detail) => {
  failures += 1;
  console.error(`\n✗ ${msg}`);
  if (detail) console.error(`    ${detail}`);
};
const pass = (msg) => console.log(`✓ ${msg}`);

/* --- The two files v2 shipped without ---------------------------------- */
for (const f of ['app/robots.ts', 'app/sitemap.ts', 'app/llms.txt/route.ts']) {
  if (!existsSync(join(ROOT, f))) fail(`${f} is missing. v2 shipped without robots and sitemap once already.`);
}
if (failures === 0) pass('robots.ts, sitemap.ts and llms.txt exist.');

/* --- THE CANONICAL HOST ------------------------------------------------ *
 * Every canonical, og:url, sitemap entry and structured-data @id is built from
 * SITE.url. It shipped as the apex while the site serves www, so all of them
 * named a host that 308s. Semrush reported it as 25 sitemap errors; the real
 * cost was every canonical on the site pointing at a redirect.
 *
 * This asserts the default matches the host actually served. If the primary
 * domain changes, change both together.
 * -------------------------------------------------------------------- */
const PRODUCTION_HOST = 'https://www.hexonasystems.com';
const siteSrc = code('lib/site.ts');
if (!siteSrc.includes(`?? '${PRODUCTION_HOST}'`)) {
  fail(
    `lib/site.ts does not fall back to ${PRODUCTION_HOST}.`,
    'NEXT_PUBLIC_SITE_URL is not set in the Vercel project, so the fallback is what ships. A mismatch here puts every canonical, og:url, sitemap entry and @id on a redirecting host.',
  );
} else {
  pass(`SITE.url falls back to the host actually served (${PRODUCTION_HOST}).`);
}

/* --- TICKET 3: no AI crawler may be blocked ---------------------------- */
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

const robotsCode = code('app/robots.ts');
const blocked = AI_AGENTS.filter((a) => robotsCode.includes(a));
if (blocked.length > 0) {
  fail(
    'app/robots.ts names an AI crawler in executable code.',
    `${blocked.join(', ')} — a per-agent group makes that agent stop reading the wildcard rules entirely, silently dropping every Disallow for it. Ticket 3: one permissive wildcard, no per-bot groups.`,
  );
} else {
  pass('No AI crawler is singled out in robots.ts. All nine are covered by the wildcard.');
}

if (!robotsCode.includes('sitemap')) {
  fail('app/robots.ts does not emit a Sitemap line.');
} else {
  pass('robots.ts emits a Sitemap line.');
}

/* --- TICKET 5: the entity sentence reaches all four required places ----- */
const ENTITY_SITES = [
  ['components/home/Hero.tsx', 'homepage body, above the fold'],
  ['app/firm/page.tsx', '/firm first paragraph'],
  ['lib/jsonld.tsx', 'Organization schema description'],
  ['app/page.tsx', 'homepage meta description'],
];
const missingEntity = ENTITY_SITES.filter(([f]) => !read(f).includes('ENTITY_SENTENCE'));
if (missingEntity.length > 0) {
  fail(
    'The entity sentence is missing from a required location (Ticket 5).',
    missingEntity.map(([f, where]) => `${f} — ${where}`).join('\n    '),
  );
} else {
  pass('The entity sentence renders in all four required locations.');
}

/* --- TICKET 2 / §10: no bracketed placeholder may ship in the graph ----- */
let placeholderFailures = 0;
for (const file of ['lib/jsonld.tsx', 'content/firm.ts', 'content/faqs.ts']) {
  const src = code(file);
  const strings = [...src.matchAll(/'([^'\n]*)'|"([^"\n]*)"|`([^`]*)`/g)].map(
    (m) => m[1] ?? m[2] ?? m[3] ?? '',
  );
  const found = strings.filter((v) => /\[[a-z][a-z -]{2,}\]/i.test(v));
  if (found.length > 0) {
    placeholderFailures += 1;
    fail(`${file} has a bracketed placeholder in a string literal (Ticket 2).`, found.join('\n    '));
  }
}
if (placeholderFailures === 0) pass('No bracketed placeholder in a shipping string literal.');

/* --- TICKET 2c: schema text and visible text share one source ---------- */
const FAQ_PAGES = ['app/diagnostic/page.tsx', 'app/implementation/page.tsx', 'app/evidence/page.tsx'];
let faqFailures = 0;
for (const file of FAQ_PAGES) {
  const src = read(file);
  if (src.includes('<Faqs') && !src.includes('faqPageLd')) {
    faqFailures += 1;
    fail(`${file} renders an FAQ block with no FAQPage schema (Ticket 7).`);
  }
  if (!src.includes('<Faqs')) {
    faqFailures += 1;
    fail(`${file} has no FAQ block. Ticket 7 requires five-plus pairs on every service page.`);
  }
}
if (faqFailures === 0) pass('Every service page has an FAQ block, and every block has its schema.');

/* --- NO LINK MAY POINT AT A ROUTE THAT DOES NOT EXIST ------------------ *
 * This is the check that would have caught the live bug. /method was in the
 * primary nav of every page and the route never existed; /terms and /privacy
 * were in the footer and v2 deleted both pages. A 404 in the nav is read by a
 * visitor as a broken site and by a crawler as a soft-404 against the domain.
 * -------------------------------------------------------------------- */
const ROUTE_FILES = ['app/page.tsx'];
const routeExists = (href) => {
  const clean = href.split('#')[0].split('?')[0];
  if (clean === '/' ) return true;
  const seg = clean.replace(/^\//, '');
  return (
    existsSync(join(ROOT, 'app', seg, 'page.tsx')) ||
    existsSync(join(ROOT, 'app', `${seg}.tsx`)) ||
    ROUTE_FILES.includes(`app/${seg}/page.tsx`)
  );
};

const NAV_FILES = ['components/layout/Header.tsx', 'components/layout/Footer.tsx'];
const deadLinks = [];
for (const file of NAV_FILES) {
  const src = code(file);
  for (const m of src.matchAll(/href:\s*'(\/[^']*)'/g)) {
    if (!routeExists(m[1])) deadLinks.push(`${file}: ${m[1]}`);
  }
}
if (deadLinks.length > 0) {
  fail('A navigation link points at a route that does not exist.', deadLinks.join('\n    '));
} else {
  pass('Every nav and footer link resolves to a real route.');
}

/* --- TICKET 1: every live Wix URL has a redirect, to a route that exists */
const LIVE_WIX_URLS = [
  '/about',
  '/solutions',
  '/blog',
  '/get-started',
  '/programs',
  '/incubator',
  '/general-1',
  '/copy-of-a-i-appointment-setting',
  '/copy-of-missed-lead-capture',
  '/copy-of-about',
];
const config = code('next.config.ts');
const unredirected = LIVE_WIX_URLS.filter((u) => !config.includes(`source: '${u}'`));
if (unredirected.length > 0) {
  fail(
    'A live Wix URL has no redirect (Ticket 1). Each is a lost bookmark at cutover.',
    unredirected.join(', '),
  );
} else {
  pass(`All ${LIVE_WIX_URLS.length} live Wix URLs have a 301.`);
}

// The failure that actually shipped: a 301 into a 404.
const badTargets = [];
for (const m of config.matchAll(/destination:\s*'(\/[^']*)'/g)) {
  const dest = m[1].replace(/\/:\w+$/, '');
  if (!routeExists(dest)) badTargets.push(dest);
}
if (badTargets.length > 0) {
  fail(
    'A redirect points at a route that does not exist. This is worse than no redirect — it launders a 404 through a signal that says "follow me".',
    [...new Set(badTargets)].join(', '),
  );
} else {
  pass('Every redirect destination is a real route.');
}

if (config.includes('permanent: true')) {
  fail('next.config.ts uses `permanent: true`, which emits 308. Ticket 1 specifies 301.');
} else {
  pass('Redirects emit 301, not 308.');
}

/* --- TICKET 6: the blog is wired into nav and sitemap ------------------ */
if (!code('components/layout/Header.tsx').includes("'/insights'")) {
  fail('The blog index is not in the primary navigation (Ticket 6).');
} else {
  pass('Blog index is in the primary navigation.');
}
if (!read('app/sitemap.ts').includes('publishedPosts')) {
  fail('Blog posts are not in sitemap.xml (Ticket 6).');
} else {
  pass('Blog posts are in sitemap.xml.');
}

process.exit(failures > 0 ? 1 : 0);
