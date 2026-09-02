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

/** [foreground, background, minimum, label] — `min` is 3.0 for large display type. */
const PAIRS = [
  // --- Dark surfaces ------------------------------------------------------
  ['text-primary', 'base', 4.5, 'body / headings'],
  ['text-secondary', 'base', 4.5, 'lead + body copy'],
  ['text-tertiary', 'base', 4.5, 'labels'],
  ['text-quaternary', 'base', 4.5, 'annotations — the AA floor'],
  ['text-primary', 'surface', 4.5, 'card headings'],
  ['text-secondary', 'surface', 4.5, 'card body'],
  ['text-tertiary', 'surface', 4.5, 'card labels'],
  ['text-quaternary', 'surface', 4.5, 'card annotations'],
  ['text-secondary', 'surface-raised', 4.5, 'raised panel body'],
  ['text-tertiary', 'surface-raised', 4.5, 'panel header labels'],
  ['accent', 'base', 4.5, 'accent text on page'],
  ['accent', 'surface', 4.5, 'accent text on cards'],
  ['accent', 'surface-raised', 4.5, 'accent on raised panels'],
  ['accent-bright', 'base', 4.5, 'accent hover'],
  ['signal-leak', 'base', 4.5, 'leak figures'],
  ['signal-leak', 'surface', 4.5, 'leak figures on cards'],
  ['signal-sealed', 'base', 4.5, 'sealed figures'],
  ['signal-sealed', 'surface', 4.5, 'sealed figures on cards'],
  ['base', 'accent', 4.5, 'PRIMARY BUTTON label on accent fill'],

  // --- Light editorial surface -------------------------------------------
  ['light-primary', 'light-base', 4.5, 'light headings'],
  ['light-secondary', 'light-base', 4.5, 'light body'],
  ['light-tertiary', 'light-base', 4.5, 'light labels'],
  ['light-accent', 'light-base', 4.5, 'accent text on light ground'],
  ['light-primary', 'light-surface', 4.5, 'light card headings'],
  ['light-secondary', 'light-surface', 4.5, 'light card body'],
  ['light-tertiary', 'light-surface', 4.5, 'light card labels'],
  ['light-accent', 'light-surface', 4.5, 'accent on light cards'],
];

/** Non-text tokens. Documented, never asserted — they must never carry text. */
const NON_TEXT = ['text-decorative', 'hairline', 'hairline-bright', 'grid-line'];

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
  console.log(`  ${name.padEnd(width)}  ${ratio(T[name], T.base).toFixed(2).padStart(6)}:1 on base`);
}

if (failures > 0) {
  console.error(`\n✗ ${failures} pair(s) below the AA floor. §10.4: do not darken text tokens.`);
  process.exit(1);
}
console.log(`\n✓ All ${rows.length} text pairs meet WCAG 2.2 AA on both surfaces.`);
