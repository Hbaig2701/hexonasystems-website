#!/usr/bin/env node
/**
 * scripts/check-claims.mjs — the §14 Phase 6 launch gate.
 *
 * Two checks, both of which must pass before production:
 *
 *   1. Every ⚠️ claim from §12 is locked to a single value in claims.ts —
 *      i.e. no claim is still `status: 'pending'`.
 *   2. A grep confirming NO STATISTIC IS HARDCODED ANYWHERE ELSE. Every figure
 *      on every page imports from content/claims.ts.
 *
 * Run: npm run check:claims
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SCAN_DIRS = ['app', 'components'];
const ALLOWLIST = new Set([
  // The audit renders figures computed from the visitor's own inputs; those are
  // not claims about Hexona and do not belong in claims.ts.
  'components/audit',
  'content',
  // The styleguide deliberately shows sample figures.
  'app/styleguide',
]);

/** Patterns that look like a marketing statistic hardcoded into a component. */
const SUSPECT = [
  /\b\d{1,3},\d{3}\+/g, // 40,000+
  /\b\d+,?\d*\s*\+\s*(businesses|builders|agencies|students|clients)/gi,
  /\$\d+K\+/g, // $100K+
  /\b\d+\s*(continents|countries)\b/gi,
  /top\s+0\.\d+%/gi,
];

let failures = 0;

/* --- Check 1: pending claims -------------------------------------------
 * Only claims the site actually PUBLISHES gate the launch. Membership of
 * ALL_CLAIMS is what "published" means: constants kept in the file but left
 * out of that map are retired (the Automation Institute's audience figures,
 * for instance) and must not block a release for a page nobody can reach.
 */
const claimsSrc = readFileSync(join(ROOT, 'content/claims.ts'), 'utf8');

const allClaimsBlock = claimsSrc.match(/export const ALL_CLAIMS[^=]*=\s*\{([\s\S]*?)\n\};/);
if (!allClaimsBlock) {
  console.error('✗ could not locate ALL_CLAIMS in content/claims.ts');
  process.exit(1);
}
const published = new Set(
  [...allClaimsBlock[1].matchAll(/^\s*(\w+),/gm)].map((m) => m[1]),
);

const pending = [...claimsSrc.matchAll(/export const (\w+): Claim = \{[\s\S]*?\n\};/g)]
  .filter((m) => m[0].includes("status: 'pending'"))
  .map((m) => m[1])
  .filter((name) => published.has(name));

const retired = [...claimsSrc.matchAll(/export const (\w+): Claim = \{/g)]
  .map((m) => m[1])
  .filter((name) => !published.has(name));

if (pending.length > 0) {
  console.error(`\n✗ ${pending.length} claim(s) still pending §12 verification:\n`);
  for (const name of pending) console.error(`    ${name}`);
  console.error('\n  Lock each to a single evidenced value, then flip status to "verified".');
  failures += 1;
} else {
  console.log('✓ Every published claim in content/claims.ts is verified.');
}

if (retired.length > 0) {
  console.log(
    `  (${retired.length} retired claim(s) not published, so not gated: ${retired.join(', ')})`,
  );
}

/* --- Check 2: no statistic hardcoded outside claims.ts ------------------ */
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(tsx?|mdx)$/.test(entry)) out.push(full);
  }
  return out;
}

const hardcoded = [];
for (const dir of SCAN_DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const rel = relative(ROOT, file);
    if ([...ALLOWLIST].some((prefix) => rel.startsWith(prefix))) continue;

    const src = readFileSync(file, 'utf8');
    for (const pattern of SUSPECT) {
      for (const match of src.matchAll(pattern)) {
        hardcoded.push(`${rel}: ${match[0].trim()}`);
      }
    }
  }
}

if (hardcoded.length > 0) {
  console.error(`\n✗ ${hardcoded.length} statistic(s) hardcoded outside content/claims.ts:\n`);
  for (const hit of hardcoded) console.error(`    ${hit}`);
  console.error('\n  Import from content/claims.ts instead (§12 implementation requirement).');
  failures += 1;
} else {
  console.log('✓ No statistic is hardcoded outside content/claims.ts.');
}

process.exit(failures > 0 ? 1 : 0);
