# Hexona Systems — website

Built to `hexona-website-spec.md` v1.0. That document is the source of truth;
code comments cite it by section (§) so any decision can be traced back.

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm test` | Unit tests — includes the §8.3 worked example ($415,800) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check:claims` | **Launch gate.** Fails while any §12 claim is unverified or any statistic is hardcoded outside `content/claims.ts` |
| `npm run verify` | typecheck → test → lint → build |

## Where things live

```
app/                  routes. One page per §3.1 sitemap entry
  styleguide/         Phase 1 deliverable, noindex. Every component, every state
  api/lead/           §9.1 lead pipeline — validation, rate limit, honeypot, Make.com
  api/og/             §8.8 shareable audit OG image
components/
  lattice/            §5 — the WebGL lattice + SVG and static fallback tiers
  audit/              §8 — the Revenue Leak Audit
  sections/           one component per homepage section (§7.1)
  ui/ layout/         the component library (§4.6)
content/
  claims.ts           ⚠️ EVERY statistic lives here and NOWHERE else (§12)
  audit-model.ts      the model constants (§8.3)
  cases.ts            case studies (§7.3)
lib/
  motion.ts           ease + duration tokens (§6.2)
  lattice/            geometry, packet simulation, scroll/pointer state channel
```

## Two things to understand before changing anything

**The lattice is the argument, not decoration** (§5). A fractured hexagonal
lattice assembles as you scroll the homepage, driven by one normalized scroll
value written by a single GSAP ScrollTrigger into `lib/lattice/state.ts`. The
render loop reads that object directly — scroll must never trigger a React
re-render. Exactly two canvases are permitted on the homepage: the background
lattice and the audit panel.

**Every statistic imports from `content/claims.ts`** (§12). The old site
published conflicting versions of the same figures across pages, and a buyer
sophisticated enough to notice is the buyer worth having. `npm run check:claims`
enforces this and will fail the launch gate if a number is hardcoded in a
component.

## Verifying the fallback tiers

Append `?lattice=` to any URL to force a tier: `webgl`, `svg`, `static`, `off`.
`static` is what `prefers-reduced-motion` gets. Turn JavaScript off entirely and
every section still renders at full opacity — that path is a hard requirement
(§14, Phase 4), not a nicety.

## Before this goes live

Run `npm run check:claims`, then work the outstanding items in
`LAUNCH-CHECKLIST.md`. Nothing marked **Asset pending** in the UI may survive
into production — it is rendered as an obvious placeholder precisely so it
cannot be missed.
