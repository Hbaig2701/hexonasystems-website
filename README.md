# Hexona Systems — website

The site at https://www.hexonasystems.com. Next.js 16 (App Router), Tailwind v4,
deployed on Vercel from `main`.

**Positioning:** AI employees for US service businesses, built only where they
raise enterprise value. Headline: "AI that increases enterprise value."

> This Next.js has breaking changes from older versions. Read the guide in
> `node_modules/next/dist/docs/` before changing framework code (see AGENTS.md).

## Run it

```bash
npm ci
npm run dev       # http://localhost:3000
npm run verify    # typecheck, tests, lint, contrast, SEO checks, build
```

CI (`.github/workflows/ci.yml`) runs `npm run verify` on every PR and push to
main. Dependabot opens grouped weekly dependency PRs.

## Where things live

| What | Where |
|---|---|
| Brand facts, team, awards, profiles | `content/firm.ts` |
| AI employee pages (`/ai-employees/[slug]`) | `content/employees.ts` |
| Industry pages (`/industries/[slug]`) | `content/industries.ts` |
| Case studies (`/evidence`) | `content/evidence.ts` |
| Google reviews on the homepage and `/book` | `content/reviews.ts` |
| Blog articles | `content/blog/articles/*.ts`, registered in `content/blog/articles/index.ts` |
| How to write an article | `content/blog/README.md`, ideas in `content/blog/BACKLOG.md` |
| Privacy and terms | `content/legal.ts` |
| Redirects and security headers | `next.config.ts` |
| Structured data (JSON-LD) | `lib/jsonld.tsx` |
| Design tokens and the `hx-` CSS layer | `app/globals.css` |
| Fonts (self-hosted) | `app/fonts/` |

Pages are data-driven: add an entry to the content file and the page, sitemap,
llms.txt and llms-full.txt pick it up on the next build.

## Brand figures — one set, used everywhere

| Figure | Value |
|---|---|
| Founded | 2022 |
| Businesses served | 1,500+ |
| Agencies running on Hexona's AI and systems | 1,000+ |
| Community members | 45,000+ |
| Google rating | 4.8 from 74 reviews (update `content/reviews.ts` as it changes) |

If any of these changes, change it here, in `content/firm.ts`, and tell whoever
runs the other properties (hamzabaig.com, profiles, press) so they match.

## Leads, analytics and search

- **Leads:** the `/book` form posts to `LEAD_WEBHOOK_URL` (a GoHighLevel inbound
  webhook) with `source: hexonasystems.com/book`. Unset, submissions are only
  written to the Vercel logs (search for `[lead]`). See `.env.example`.
- **Analytics:** Vercel Web Analytics (cookie-free) and Google Tag Manager
  `GTM-KZ9XN392`, which carries GA4, and Microsoft Clarity `za1mxg117d` (heatmaps, recordings). All are in `app/layout.tsx`; the privacy
  policy in `content/legal.ts` must be updated before adding any other tag.
- **Indexing:** `app/sitemap.ts`, `app/robots.ts`, `/llms.txt`, `/llms-full.txt`
  and `/blog/feed.xml`. `.github/workflows/indexnow.yml` notifies Bing (and so
  ChatGPT search) after content changes; `npm run indexnow -- --all` resubmits
  everything by hand.
- **Client login:** `/login` redirects to `https://app.hexonasystems.com/`, and
  the footer links to it.

## Hidden for now

`/score` (Enterprise Value Score) works by direct link but is `noindex`, out of
the sitemap, nav and llms.txt until it is ready. Do not link it from articles.
