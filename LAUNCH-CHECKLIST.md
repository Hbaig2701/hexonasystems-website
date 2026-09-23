# What I need from you

Everything the site is missing, in the order it hurts. Reply with any section
and I'll wire it in. Nothing here can be invented: §11 of the spec is explicit
about it, and a fabricated number is exactly what a $10M+ buyer checks first.

Three mechanical gates enforce the important half:

```
npm run check:contrast   fails if any text drops below WCAG AA
npm run check:seo        fails on a dead nav link, a redirect into a 404,
                         a placeholder in structured data, a missing FAQ block,
                         or a blocked AI crawler
npm run verify           runs all of them, plus typecheck, tests and the build
```

`npm run check:claims` used to be listed here and no longer exists — v2 removed
that script along with `content/claims.ts`, because the repositioning cut almost
every contested figure. The remaining statistics carry their own reasoning in
`content/evidence.ts`.

**See also [`SEO-IMPLEMENTATION.md`](./SEO-IMPLEMENTATION.md)** — the AI SEO
Developer Guide tickets, all nine implemented against v2, with what is still
blocked on you. Three items below are now owned jointly with that document: the
confidentiality terms, `/terms` and `/privacy`, and the third-party profiles.

---

## TIER 1 — the site is actively weaker without these

### 1. The flagship case study ⚠️ biggest single gap

The site now claims it makes deca-million operations millions more. The only
real case is a childcare operator at **$80,000**, which proves the mechanism
but not the scale. A $30M buyer reads it and concludes he isn't the customer.

An empty slot is waiting in `content/cases.ts` under `enterprise-flagship`.
**Anonymised is fine and usually better** — "a $40M logistics operator" reads as
discretion, not evasion.

```
Industry / region        e.g. Logistics, Ontario
Client revenue band      e.g. $40M
What was broken          2-3 sentences, plain language
Where it leaked          the specific gaps, named
What we built            the implementation, plain language
BEFORE -> AFTER          2-3 metrics, e.g. Response 9 hr -> 4 min
The dollar result        e.g. $2.4M additional annual revenue
Timeline                 e.g. 10 weeks
Quote                    optional, with permission to attribute
```

### 2. Nine published claims still unverified

Every figure is rendered with a visible ⚠️ until you lock it. **Two of these are
in the hero**, so they're the first things anyone reads.

| Claim | Currently shows | What I need |
|---|---|---|
| `VALUE_GENERATED` ⚠️ hero | $20,000,000+ | Confirm. Generated, saved, or both? Over what period? This is the biggest number on the site. |
| `SAASPRENEUR_DIAMOND` ⚠️ hero badge | Diamond, 2025 | Confirm the award and date. It's the first claim on the page. |
| `BUSINESSES_POWERED` | 1,500+ | **Four conflicting versions exist.** 1,000+ / 10K partners / 1,500+ / 1000+ clients. Pick one and define the word. |
| `AWARDS_COUNT` | 6 | Name all six, or lower the count. The ledger names two. |
| `CONTINENTS` | 6 | Six continents, or 22 countries? Pick one. |
| `COMBINED_YEARS` | 40+ | Which team does this cover? |
| `DEVELOPER_NETWORK` | 40+ | Confirm. |
| `OPERATING_SINCE` | 2021 | Automating since 2021 but company founded 2022. Which is which? |
| `PROJECTS_COMPLETED` | 500+ | Confirm or cut. Currently rendered nowhere. |

### 3. The audit model's source

`slowResponsePenalty` (0.55) is the constant the entire model rests on. The
results panel currently prints a **red warning** where its attribution belongs.
Either is fine:

- A citable public study on lead response time, with a link, **or**
- Your own data: *"Based on outcomes across N Hexona implementations"* ← stronger

### 4. Founder portrait

Environmental, real workspace, professionally shot. Appears on the homepage and
`/about`. **Not a white-background headshot, not AI-generated, never stock.**

---

## TIER 2 — visible placeholders a visitor will notice

| What | Where | Notes |
|---|---|---|
| **2 more case studies** | `/work` | `manufacturing-coordination` (8-week build confirmed, no metrics) and `missed-lead-capture` (nothing confirmed). Same template as Tier 1. **Cut them rather than ship vague ones.** |
| **Client quote** | childcare case | The one real case has no quote. |
| **6 team portraits + bios** | `/about` | Monochrome, environmental. One line of bio each. Never stock or generated. |
| **Security + data-handling summary** | `/system` | Enterprise buyers look for this and its absence is disqualifying. Where data lives, uptime, access. |
| **Integration list** | `/system` | The real, complete list. Plus: for each of Moody's, Snowflake, Younite, Make, Zapier, OpenAI, Pabbly, is it an *integration*, a *partner*, or a *customer*? Legally different claims. |
| **Testimonial sign-off** | homepage | Four quotes transcribed from your Framer site. Confirm wording and permission to attribute by name and company. |
| **Press placements** | homepage bar | Confirm each of Yahoo Finance, Digital Journal, Digital Media Net, Brainz, GoHighLevel. Logo files welcome. |

---

## TIER 3 — operational, blocks real traffic

### Environment variables (set in Vercel → Settings → Environment Variables)

```
MAKE_WEBHOOK_URL          ← WITHOUT THIS EVERY LEAD IS LOGGED AND DROPPED
MAKE_WEBHOOK_SECRET       optional shared secret
UPSTASH_REDIS_REST_URL    rate limiting; in-memory fallback is not production-safe
UPSTASH_REDIS_REST_TOKEN
NEXT_PUBLIC_POSTHOG_KEY   audit funnel analytics; no key means no cookie banner either
NEXT_PUBLIC_SITE_URL      https://hexonasystems.com
```

### Other

- **GoHighLevel calendar embed URL** for `/book`, plus field mapping so the three
  qualifying answers and the audit URL land on the booking record.
- **The 16 GHL custom fields** from §9.2 created in your CRM.
- **Legal copy reviewed by counsel.** `/privacy` and `/terms` both carry a
  "Draft. Not reviewed by counsel. Do not publish." banner. What's under it is a
  structured brief covering everything §7.7 requires, not advice.
- **Public phone number** — the footer line hides itself until it's set.
- **Social profile URLs** — deliberately empty; an icon linking to `#` is worse.
- **Brand mark as SVG** — currently a drawn placeholder built from the lattice.

---

## TIER 4 — optional modules, fine to cut

- **Industry benchmark response times** by sector, for the post-gate breakdown.
  Supply real medians or I'll cut the module. An invented benchmark is worse
  than none.
- **Leak-source dollar split.** The three causes render without figures today
  and say so. Needs your implementation data, or leave it qualitative.

---

## Before the domain moves

`hexonasystems.com` is currently on **Wix**. Do not repoint DNS until Tier 1 and
Tier 3 are done, plus:

- [ ] Lighthouse mobile: Performance ≥ 88, Accessibility ≥ 95, LCP < 2.0s on 4G
- [ ] Real iPhone and real mid-range Android, not simulators
- [ ] VoiceOver and keyboard-only through the four audit steps
- [ ] Crawl the live Wix site and confirm the redirect table is exhaustive
- [ ] Confirm the PostHog funnel fires end to end
- [ ] `npm run check:claims` passes

---

## Deviations from the original spec

1. **Brand cyan, not amber; centred headings.** Your call, taken from the Framer
   reference. Guardrails: leak/sealed stay warm so a falling packet never reads
   as clickable, and `--light-accent` is a dark teal because brand cyan hits
   1.5:1 on the light ground.
2. **Display figures use Geist, not Geist Mono.** In a monospace the comma sits
   in a full-width advance, so `$415,800` renders with a crater around it.
   `/styleguide` block 15 keeps the mono version as a labelled anti-pattern.
3. **Next 16, not 15.** `create-next-app@latest` ships it.
4. **Raw three.js, not react-three-fiber.** §5.6 budgets <45KB excluding three
   core; r3f exceeds that alone. Measured 1.9KB.
5. **Audit visual is Canvas 2D, not WebGL.** It must work on exactly the devices
   where the WebGL tier was rejected.
6. **Redirects use `statusCode: 301`**, not `permanent: true` (which emits 308).
7. **`vercel.json` pins `framework: nextjs`.** Without it Vercel treated the repo
   as static files and 404'd every route.
8. **Audience repositioned to $10M+**, offer to bespoke implementation, and the
   Automation Institute cut from this site entirely.
