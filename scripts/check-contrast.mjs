#!/usr/bin/env node
/**
 * scripts/check-contrast.mjs
 *
 * §10.4 requires WCAG 2.2 AA: all text ≥ 4.5:1 against its background, and an
 * automated contrast audit against BOTH the dark and light surfaces before each
 * phase sign-off. This runs that audit against the tokens themselves, so a
 * colour change can never quietly drop a pair below the floor.
 *
 * Run: npm run check:contrast
 */

import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

/** Pull `--name: #hex;` declarations out of the :root block. */
function tokens() {
  const out = {};
  for (const m of css.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) {
    out[m[1]] = m[2];
  }
  return out;
}

function luminance(hex) {
  const channel = (v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const r = channel(parseInt(hex.slice(1, 3), 16));
  const g = channel(parseInt(hex.slice(3, 5), 16));
  const b = channel(parseInt(hex.slice(5, 7), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const T = tokens();

/** [foreground, background, minimum, label]. v3 (hx-) tokens, as the pages actually pair them. */
const PAIRS = [
  ['hx-ink', 'hx-bg', 4.5, 'body and headings on white'],
  ['hx-ink-2', 'hx-bg', 4.5, 'secondary copy on white'],
  ['hx-ink-3', 'hx-bg', 4.5, 'smallest text on white'],
  ['hx-teal', 'hx-bg', 4.5, 'links, kickers and figures on white'],
  ['hx-ink', 'hx-cyan-soft', 4.5, 'text on pale cyan sections and cards'],
  ['hx-ink-2', 'hx-cyan-soft', 4.5, 'secondary copy on pale cyan'],
  ['hx-ink-3', 'hx-cyan-soft', 4.5, 'smallest text on pale cyan'],
  ['hx-teal', 'hx-cyan-soft', 4.5, 'kickers and pills on pale cyan'],
  ['hx-ink-2', 'hx-mist', 4.5, 'secondary copy on mist cards'],
  ['hx-ink-3', 'hx-mist', 4.5, 'smallest text on mist cards'],
  ['hx-teal', 'hx-mist', 4.5, 'kickers on mist cards'],
  ['hx-bg', 'hx-teal', 4.5, 'PRIMARY BUTTON label, white on teal'],
  ['hx-cyan-light', 'hx-teal', 4.5, 'figures and kickers on the teal band'],
  ['hx-on-teal', 'hx-teal', 4.5, 'body copy on the teal band'],
  ['hx-bg', 'hx-teal-deep', 4.5, 'headings in the footer'],
  ['hx-cyan-light', 'hx-teal-deep', 4.5, 'accents in the footer'],
  ['hx-on-teal', 'hx-teal-deep', 4.5, 'body copy in the footer'],
  ['hx-teal-ink', 'hx-cyan', 4.5, 'CYAN BUTTON label'],
];

/** Non-text tokens. Documented, never asserted: they must never carry text. */
const NON_TEXT = ['hx-cyan', 'hx-cyan-pale', 'hx-line', 'hx-line-2'];

let failures = 0;
const rows = [];

for (const [fg, bg, min, label] of PAIRS) {
  if (!T[fg] || !T[bg]) {
    console.error(`✗ missing token: ${!T[fg] ? fg : bg}`);
    failures += 1;
    continue;
  }
  const r = ratio(T[fg], T[bg]);
  const ok = r >= min;
  if (!ok) failures += 1;
  rows.push({ ok, r, fg, bg, min, label });
}

const width = Math.max(...rows.map((row) => `${row.fg} on ${row.bg}`.length));
for (const row of rows) {
  const pair = `${row.fg} on ${row.bg}`.padEnd(width);
  const mark = row.ok ? '✓' : '✗';
  console.log(`${mark} ${pair}  ${row.r.toFixed(2).padStart(6)}:1  (min ${row.min})  ${row.label}`);
}

console.log(`\nNon-text tokens (never render characters, so never asserted):`);
for (const name of NON_TEXT) {
  if (!T[name]) continue;
  const ground = T['hx-bg'];
  console.log(`  ${name.padEnd(width)}  ${ratio(T[name], ground).toFixed(2).padStart(6)}:1`);
}

if (failures > 0) {
  console.error(`\n✗ ${failures} pair(s) below the AA floor. Adjust the token in app/globals.css.`);
  process.exit(1);
}
console.log(`\n✓ All ${rows.length} text pairs meet WCAG 2.2 AA.`);
