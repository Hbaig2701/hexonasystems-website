import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * lib/og.tsx — the social preview card, generated per page.
 *
 * The site shipped with no og:image at all, so every link pasted into LinkedIn,
 * Slack or iMessage rendered as a bare text box. For a firm whose entire pitch
 * is that it looks like it knows what it is doing, that is the cheapest
 * credibility on the property and it was missing.
 *
 * ⚠️ THIS IS SATORI, NOT A BROWSER. `next/og` renders through Satori, which
 * implements a deliberate subset of CSS:
 *
 *   · Flexbox only. No grid, no float, no position other than absolute.
 *   · Any element with more than one child MUST declare display:flex, or the
 *     render throws rather than degrading.
 *   · Inline styles only. The site's classes and CSS custom properties do not
 *     exist here, which is why every colour below is a literal repeated from
 *     globals.css. If a brand colour changes there, change it here too; there
 *     is no way to share them without shipping the whole stylesheet.
 *   · Fonts must be TTF or OTF buffers. WOFF2 is NOT supported, which is why
 *     assets/fonts holds TTFs rather than reusing next/font's output.
 *
 * Images are statically generated at build time and cached, so the readFile
 * calls cost nothing at request time.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

/* Literals from globals.css. See the note above about why they are copied. */
const VOID = '#0B0D0C';
const ON_VOID = '#F2F0EA';
const ON_VOID_3 = '#8E928E';
const ACCENT_ON_VOID = '#22D3EE';

const asset = (...p: string[]) => readFile(join(process.cwd(), ...p));

/**
 * The same hex field as the site background, flattened to one SVG and handed to
 * Satori as an image. Satori will not run the site's <use>/<defs> indirection
 * or its CSS animation, so this is drawn once, statically, at the card's exact
 * size.
 */
function latticeUri(): string {
  const W = OG_SIZE.width;
  const H = OG_SIZE.height;
  const R = 58;
  const stepX = R * 1.5;
  const stepY = R * Math.sqrt(3);
  const paths: string[] = [];

  for (let q = -2; q <= Math.ceil(W / stepX) + 2; q++) {
    for (let r = -2; r <= Math.ceil(H / stepY) + 2; r++) {
      const cx = stepX * q;
      const cy = stepY * (r + q / 2);
      if (cx < -R || cx > W + R || cy < -R || cy > H + R) continue;
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i;
        return `${(cx + Math.cos(a) * R).toFixed(1)} ${(cy + Math.sin(a) * R).toFixed(1)}`;
      });
      paths.push(`M${pts.join(' L')} Z`);
    }
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<g fill="none" stroke="${ACCENT_ON_VOID}" stroke-width="1" stroke-opacity="0.13">` +
    paths.map((d) => `<path d="${d}"/>`).join('') +
    `</g></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/** Long titles must not overflow the card, and three lines is the ceiling. */
function titleSize(title: string): number {
  if (title.length <= 38) return 70;
  if (title.length <= 60) return 60;
  if (title.length <= 90) return 50;
  return 42;
}

export async function ogImage({
  eyebrow,
  title,
  note,
}: {
  /** Mono, above the title. The section of the site this page belongs to. */
  eyebrow: string;
  /** The card's whole argument. Kept under about 100 characters. */
  title: string;
  /** Mono, bottom right. A figure or a qualifier. Optional. */
  note?: string;
}) {
  const [display, mono, mark] = await Promise.all([
    asset('assets/fonts', 'Newsreader-500.ttf'),
    asset('assets/fonts', 'GeistMono-500.ttf'),
    asset('public', 'hexona-mark.svg'),
  ]);
  const markUri = `data:image/svg+xml;base64,${mark.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: VOID,
          padding: '64px 72px',
          position: 'relative',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders
            this, not a browser; next/image does not exist in an ImageResponse. */}
        <img
          alt=""
          src={latticeUri()}
          width={OG_SIZE.width}
          height={OG_SIZE.height}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />

        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- see above */}
          <img alt="" src={markUri} width={42} height={39} />
          <div
            style={{
              display: 'flex',
              fontFamily: 'Mono',
              fontSize: 22,
              letterSpacing: '0.18em',
              color: ON_VOID,
              marginLeft: 18,
            }}
          >
            HEXONA SYSTEMS
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Mono',
              fontSize: 19,
              letterSpacing: '0.16em',
              color: ACCENT_ON_VOID,
              marginBottom: 22,
            }}
          >
            {eyebrow.toUpperCase()}
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Display',
              fontSize: titleSize(title),
              lineHeight: 1.12,
              color: ON_VOID,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', width: 120, height: 3, background: ACCENT_ON_VOID }} />
          {note ? (
            <div
              style={{
                display: 'flex',
                fontFamily: 'Mono',
                fontSize: 19,
                letterSpacing: '0.08em',
                color: ON_VOID_3,
              }}
            >
              {note}
            </div>
          ) : (
            <div style={{ display: 'flex' }} />
          )}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Display', data: display, weight: 500, style: 'normal' },
        { name: 'Mono', data: mono, weight: 500, style: 'normal' },
      ],
    },
  );
}
