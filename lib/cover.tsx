import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Cover } from '@/content/blog/types';

/**
 * Blog covers. One PNG per article (1200×630), used as the hero image on the
 * page, the card image on the hub, the og:image and the RSS enclosure.
 *
 * Left: the brand mark, the format and the title. Right: a deep-teal panel
 * with a small graphic that says what the article is about at a glance (a chat
 * exchange, one big number, a button, a two-column comparison or large type).
 * Same idea as Flowtivity's covers, drawn in Hexona's colours.
 */

export const COVER_SIZE = { width: 1200, height: 630 };

const INK = '#0E1E24';
const TEAL = '#0B5566';
const DEEP = '#073B47';
const CYAN = '#35C6D1';
const CYAN_LIGHT = '#7FE3EA';
const ON_TEAL = '#CFE9EC';

function lattice(): string {
  const W = COVER_SIZE.width;
  const H = COVER_SIZE.height;
  const R = 46;
  const sx = R * 1.5;
  const sy = R * Math.sqrt(3);
  const paths: string[] = [];
  for (let q = -1; q <= Math.ceil(W / sx) + 1; q++) {
    for (let r = -1; r <= Math.ceil(H / sy) + 1; r++) {
      const cx = sx * q;
      const cy = sy * r + (q % 2 ? sy / 2 : 0);
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i;
        return `${(cx + Math.cos(a) * R).toFixed(1)} ${(cy + Math.sin(a) * R).toFixed(1)}`;
      });
      paths.push(`M${pts.join(' L')} Z`);
    }
  }
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">` +
    `<g fill="none" stroke="${TEAL}" stroke-opacity="0.09" stroke-width="1">${paths.map((d) => `<path d="${d}"/>`).join('')}</g></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

function titleSize(t: string) {
  if (t.length <= 40) return 56;
  if (t.length <= 64) return 48;
  if (t.length <= 90) return 41;
  return 35;
}

function Graphic({ cover }: { cover: Cover }) {
  switch (cover.style) {
    case 'chat':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          {cover.messages.slice(0, 3).map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.from === 'ai' ? 'flex-end' : 'flex-start' }}>
              <div
                style={{
                  display: 'flex',
                  maxWidth: 360,
                  padding: '16px 20px',
                  borderRadius: 22,
                  fontFamily: 'Inter',
                  fontSize: 24,
                  lineHeight: 1.3,
                  background: m.from === 'ai' ? CYAN : 'rgba(255,255,255,0.12)',
                  color: m.from === 'ai' ? '#062B33' : '#FFFFFF',
                  borderBottomRightRadius: m.from === 'ai' ? 6 : 22,
                  borderBottomLeftRadius: m.from === 'ai' ? 22 : 6,
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
      );
    case 'stat':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', fontFamily: 'Display', fontSize: cover.value.length > 9 ? 84 : 112, lineHeight: 1, color: CYAN_LIGHT }}>{cover.value}</div>
          <div style={{ display: 'flex', marginTop: 22, fontFamily: 'Inter', fontSize: 28, lineHeight: 1.3, color: ON_TEAL, maxWidth: 380 }}>{cover.label}</div>
        </div>
      );
    case 'button':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', position: 'relative' }}>
            <div style={{ display: 'flex', padding: '26px 44px', borderRadius: 999, background: '#FFFFFF', color: TEAL, fontFamily: 'Inter', fontWeight: 600, fontSize: 34, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
              {cover.text}
            </div>
            <svg width="54" height="54" viewBox="0 0 24 24" style={{ position: 'absolute', right: -18, bottom: -34 }}>
              <path d="M4 2l16 9-7 2-3 7z" fill="#FFFFFF" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ display: 'flex', marginTop: 56, fontFamily: 'Inter', fontSize: 24, color: ON_TEAL }}>{cover.caption}</div>
        </div>
      );
    case 'versus':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', fontFamily: 'Inter', fontSize: 22 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <div style={{ display: 'flex', flex: 1, padding: '12px 16px', borderRadius: 14, background: CYAN, color: '#062B33', fontWeight: 600 }}>{cover.left}</div>
            <div style={{ display: 'flex', flex: 1, padding: '12px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.14)', color: '#FFFFFF', fontWeight: 600 }}>{cover.right}</div>
          </div>
          {cover.rows.slice(0, 4).map(([l, r], i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <div style={{ display: 'flex', flex: 1, padding: '10px 16px', color: CYAN_LIGHT }}>{l}</div>
              <div style={{ display: 'flex', flex: 1, padding: '10px 16px', color: ON_TEAL }}>{r}</div>
            </div>
          ))}
        </div>
      );
    case 'type':
    default:
      return (
        <div style={{ display: 'flex', fontFamily: 'Display', fontSize: 52, lineHeight: 1.12, color: CYAN_LIGHT }}>
          {cover.style === 'type' ? cover.text : ''}
        </div>
      );
  }
}

export async function coverImage({ title, kind, cover }: { title: string; kind: string; cover: Cover }) {
  const [display, mono, inter, interSemi, mark] = await Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/Newsreader-500.ttf')),
    readFile(join(process.cwd(), 'assets/fonts/GeistMono-500.ttf')),
    readFile(join(process.cwd(), 'assets/fonts/inter-latin-500-normal.woff')),
    readFile(join(process.cwd(), 'assets/fonts/inter-latin-600-normal.woff')),
    readFile(join(process.cwd(), 'public/hexona-mark.svg')),
  ]);
  const markUri = `data:image/svg+xml;base64,${mark.toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#FFFFFF', position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders this */}
        <img alt="" src={lattice()} width={COVER_SIZE.width} height={COVER_SIZE.height} style={{ position: 'absolute', top: 0, left: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 600, padding: '56px 0 56px 64px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders this */}
            <img alt="" src={markUri} width={40} height={37} />
            <div style={{ display: 'flex', marginLeft: 14, fontFamily: 'Mono', fontSize: 18, letterSpacing: '0.16em', color: TEAL }}>
              HEXONA · {kind.toUpperCase()}
            </div>
          </div>
          <div style={{ display: 'flex', fontFamily: 'Display', fontSize: titleSize(title), lineHeight: 1.1, color: INK }}>{title}</div>
          <div style={{ display: 'flex', width: 140, height: 8, borderRadius: 4, background: CYAN }} />
        </div>
        <div style={{ display: 'flex', flex: 1, padding: 40 }}>
          <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40, borderRadius: 36, background: DEEP, boxShadow: '0 30px 60px rgba(7,59,71,0.35)' }}>
            <Graphic cover={cover} />
          </div>
        </div>
      </div>
    ),
    {
      ...COVER_SIZE,
      fonts: [
        { name: 'Display', data: display, weight: 500, style: 'normal' },
        { name: 'Mono', data: mono, weight: 500, style: 'normal' },
        { name: 'Inter', data: inter, weight: 500, style: 'normal' },
        { name: 'Inter', data: interSemi, weight: 600, style: 'normal' },
      ],
    },
  );
}
