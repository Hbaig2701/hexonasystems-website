#!/usr/bin/env node
/**
 * scripts/indexnow.mjs — tell Bing a URL changed, instead of waiting to be crawled.
 *
 * IndexNow is a push protocol. Bing, Yandex, Seznam and Naver consume it;
 * GOOGLE DOES NOT, so this is a Bing-side lever — which matters because Bing's
 * index is what ChatGPT search and Copilot read.
 *
 * ⚠️ THE KEY IS PUBLIC BY DESIGN AND THAT IS NOT A MISTAKE.
 * It is a proof-of-control token, not a credential: anyone can read it at
 * https://www.hexonasystems.com/<key>.txt, and that is exactly how the protocol
 * verifies the submitter controls the domain. It grants nothing.
 *
 * Which is why it must NEVER be a Bing Webmaster API key. Those look similar —
 * both 32 hex characters — but one is a credential for the account and the
 * other is meant to be published. Using the first as the second hands over API
 * access to anyone who fetches the file. The key here was generated locally and
 * has no privileges attached to it anywhere.
 *
 * ⚠️ ONLY SUBMIT URLS THAT ACTUALLY CHANGED.
 * IndexNow is for change notification. Pinging the whole sitemap on a schedule
 * when nothing has changed is how a domain gets its submissions deprioritised,
 * and the deprioritisation is not announced. `--all` exists for the one-off
 * initial submission and warns when used.
 *
 * Usage:
 *   npm run indexnow -- https://www.hexonasystems.com/insights/some-post
 *   npm run indexnow -- --changed content/insights.ts app/firm/page.tsx
 *   npm run indexnow -- --all        # initial submission only
 *   npm run indexnow -- --dry-run …  # print what would be sent, send nothing
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ENDPOINT = 'https://api.indexnow.org/indexnow';
const HOST = 'www.hexonasystems.com';
const ORIGIN = `https://${HOST}`;
const ROOT = process.cwd();

/* --- The key, read from the published file so there is one source of truth -- */
function readKey() {
  const files = readdirSync(join(ROOT, 'public')).filter((f) => /^[0-9a-f]{8,128}\.txt$/.test(f));
  if (files.length === 0) {
    throw new Error(
      'No IndexNow key file in public/. Expected a file named <key>.txt whose contents are the key.',
    );
  }
  if (files.length > 1) {
    throw new Error(`Multiple key files in public/: ${files.join(', ')}. There must be exactly one.`);
  }
  const key = readFileSync(join(ROOT, 'public', files[0]), 'utf8').trim();
  const expected = files[0].replace(/\.txt$/, '');
  if (key !== expected) {
    throw new Error(
      `public/${files[0]} must contain exactly its own filename as contents. Found "${key}".`,
    );
  }
  return key;
}

/* --- Every URL the site publishes, from the live sitemap ------------------- */
async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

/**
 * Map changed source files to the URLs they affect.
 *
 * Deliberately broad per section rather than clever. A change inside
 * content/insights.ts could be any post, and working out which one would mean
 * diffing a TypeScript array — more fragile than submitting twelve URLs, and
 * twelve is nothing against the daily limits. What matters is that this only
 * fires when those files actually changed, which is the rule that counts.
 */
function urlsForChangedFiles(files, all) {
  const out = new Set();
  const section = (prefix) => all.filter((u) => new URL(u).pathname.startsWith(prefix));

  for (const f of files) {
    if (f.startsWith('content/insights.ts')) section('/insights').forEach((u) => out.add(u));
    else if (f.startsWith('content/evidence.ts')) section('/evidence').forEach((u) => out.add(u));
    else if (f.startsWith('content/faqs.ts')) {
      [`${ORIGIN}/diagnostic`, `${ORIGIN}/implementation`, `${ORIGIN}/evidence`].forEach((u) => out.add(u));
    } else if (f.startsWith('content/firm.ts') || f.startsWith('content/diagnostic.ts')) {
      // These two feed nearly every page, including the entity sentence.
      all.forEach((u) => out.add(u));
    } else {
      // app/<route>/page.tsx  →  /<route>
      const m = f.match(/^app\/(.+)\/page\.tsx$/);
      if (m) {
        const route = '/' + m[1].replace(/\/\[.+\]$/, '');
        section(route).forEach((u) => out.add(u));
        if (route === '/') out.add(`${ORIGIN}/`);
      }
    }
  }
  return [...out];
}

/* --------------------------------------------------------------------------- */

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const rest = args.filter((a) => a !== '--dry-run');

  const key = readKey();
  const all = await sitemapUrls();
  let urls;

  if (rest[0] === '--all') {
    console.warn(
      '⚠️  Submitting every URL. This is for the FIRST submission only.\n' +
        '    Repeating it when nothing has changed gets a domain deprioritised.\n',
    );
    urls = all;
  } else if (rest[0] === '--changed') {
    urls = urlsForChangedFiles(rest.slice(1), all);
    if (urls.length === 0) {
      console.log('No published URL is affected by those files. Submitting nothing.');
      return;
    }
  } else if (rest.length > 0) {
    urls = rest;
  } else {
    console.error('Nothing to submit. Pass URLs, --changed <files…>, or --all.');
    process.exit(1);
  }

  // Never submit a URL off this host: IndexNow rejects the whole batch for one
  // foreign URL, and a typo would silently cost every other URL in the request.
  const foreign = urls.filter((u) => !u.startsWith(`${ORIGIN}/`) && u !== `${ORIGIN}/`);
  if (foreign.length > 0) {
    console.error(`✗ Not on ${HOST}:\n    ${foreign.join('\n    ')}`);
    process.exit(1);
  }

  console.log(`${dryRun ? 'Would submit' : 'Submitting'} ${urls.length} URL(s):`);
  for (const u of urls) console.log('   ' + u.replace(ORIGIN, ''));
  if (dryRun) return;

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation: `${ORIGIN}/${key}.txt`, urlList: urls }),
  });

  // 200 accepted · 202 accepted, key validation pending · 4xx is a real failure.
  if (res.status === 200 || res.status === 202) {
    console.log(`\n✓ ${res.status} — accepted.`);
  } else {
    console.error(`\n✗ ${res.status} ${res.statusText}\n${(await res.text()).slice(0, 500)}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`✗ ${err.message}`);
  process.exit(1);
});
