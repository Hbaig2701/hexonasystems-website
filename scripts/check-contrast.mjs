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

/**
 * Derived grounds. A token is not always what text actually sits on: the
 * lattice paints a cyan stroke over the dark surfaces at stroke-opacity 0.16
 * inside an element at opacity 0.75, so text crossed by a lattice line is
 * really on that blend, not on the flat token. Checking only the flat tokens
 * is what let --on-void-3 ship at 4.10:1 against the ground it meets in
 * practice while reporting 5.00:1 against one it never meets alone.
 *
 * Keep these two constants in step with .lattice / .lattice-cell in
 * globals.css. If the lattice gets louder, this gets stricter, which is the
 * correct direction for it to fail in.
 */
const LATTICE_ALPHA = 0.16 * 0.75;

function over(bgHex, fgHex, alpha) {
  const ch = (i) => {
    const b = parseInt(bgHex.slice(1 + i * 2, 3 + i * 2), 16);
    const f = parseInt(fgHex.slice(1 + i * 2, 3 + i * 2), 16);
    return Math.round(b + (f - b) * alpha)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${ch(0)}${ch(1)}${ch(2)}`;
}

/** [foreground, background, minimum, label] */
const PAIRS = [
  // --- PAPER --------------------------------------------------------------
  ['ink', 'paper', 4.5, 'body and headings'],
  ['ink-2', 'paper', 4.5, 'secondary copy'],
  ['ink-3', 'paper', 4.5, 'smallest permitted text'],
  ['ink', 'paper-sunk', 4.5, 'figure block figure'],
  ['ink-2', 'paper-sunk', 4.5, 'sunk panel copy'],
  ['ink-3', 'paper-sunk', 4.5, 'figure block annotation'],
  ['ink', 'paper-raised', 4.5, 'text on raised white'],
  ['accent', 'paper', 4.5, 'accent text and rules'],
  ['paper', 'accent', 4.5, 'PRIMARY BUTTON label on paper surface'],
  ['loss', 'paper', 4.5, 'loss figure'],
  ['loss', 'paper-sunk', 4.5, 'loss figure on sunk panel'],

  // --- VOID ---------------------------------------------------------------
  ['on-void', 'void', 4.5, 'body and headings'],
  ['on-void-2', 'void', 4.5, 'secondary copy'],
  ['on-void-3', 'void', 4.5, 'tertiary, table headers'],
  ['on-void-2', 'void-raised', 4.5, 'zebra row copy'],
  ['on-void-3', 'void-raised', 4.5, 'table header on zebra'],
  ['accent-on-void', 'void', 4.5, 'accent text on dark'],
  ['ink', 'paper', 4.5, 'PRIMARY BUTTON on void: paper fill, ink text'],
  ['void', 'accent-on-void', 4.5, 'primary button hover on void'],
  ['loss-on-void', 'void', 4.5, 'loss figure on dark'],
  ['loss-on-void', 'void-raised', 4.5, 'loss figure on zebra'],

  // --- VOID, UNDER THE LATTICE --------------------------------------------
  // The grounds that text on a dark section actually meets.
  ['on-void', '@lattice-void', 4.5, 'headings crossed by a lattice line'],
  ['on-void-2', '@lattice-void', 4.5, 'body copy crossed by a lattice line'],
  ['on-void-3', '@lattice-void', 4.5, 'SMALLEST TEXT crossed by a lattice line'],
  ['loss-on-void', '@lattice-void', 4.5, 'loss figure crossed by a lattice line'],
  ['accent-on-void', '@lattice-void', 4.5, 'accent text crossed by a lattice line'],
];

/** Non-text tokens. Documented, never asserted — they must never carry text. */
const NON_TEXT = ['ink-mark', 'rule', 'rule-strong', 'void-rule'];

let failures = 0;
const rows = [];

/* Derived grounds are named with a leading @ and computed, not looked up. */
T['@lattice-void'] = over(T['void'], T['accent-on-void'], LATTICE_ALPHA);
T['@lattice-void-raised'] = over(T['void-raised'], T['accent-on-void'], LATTICE_ALPHA);

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
  const ground = name.startsWith('void') ? T.void : T.paper;
  console.log(`  ${name.padEnd(width)}  ${ratio(T[name], ground).toFixed(2).padStart(6)}:1`);
}

if (failures > 0) {
  console.error(`\n✗ ${failures} pair(s) below the AA floor. §3.2: do not darken any text token.`);
  process.exit(1);
}
console.log(`\n✓ All ${rows.length} text pairs meet WCAG 2.2 AA on both surfaces.`);
