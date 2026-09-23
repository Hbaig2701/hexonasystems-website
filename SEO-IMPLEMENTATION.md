# AI SEO Developer Guide — implementation record

Against **Hexona Systems · AI SEO Fixes — Developer Implementation Guide v1.0**,
implemented on v2.

Run `npm run check:seo` to verify everything below mechanically. It is wired into
`npm run verify`, alongside `check:contrast`.

---

## Read this first

**The guide was written for the Wix site. This is the v2 Next.js property, which
is a different business.** The Wix site sold appointment setters to childcare
operators and medspas; v2 sells a fixed-fee leakage diagnostic to operating
companies at $10M–$100M and prices findings in EBITDA. Every ticket was
implemented against v2's positioning rather than transcribed, and where the
guide's letter contradicted v2's argument, v2 won and the divergence is recorded
below.

**v2 shipped with no SEO layer at all.** Not a thin one — none. No `robots.ts`,
no `sitemap.ts`, no structured data of any kind, no `/blog` route, and a redirect
table still pointing at routes v2 had deleted. That is a regression against even
the Wix site, which served both a robots.txt and a sitemap. None of it failed a
build, which is why `npm run check:seo` now exists: everything it checks is
structural, and structural things are exactly what a rewrite silently drops.

### Three live bugs found and fixed

1. **Five redirects were 301-ing into 404s.** `next.config.ts` still carried v1's
   table pointing at `/work/*` and `/system`, both deleted. A redirect to a dead
   route is strictly worse than no redirect: it launders a 404 through a signal
   that says "this moved, follow me", so a crawler drops the original URL from its
   index and gains nothing in exchange.
2. **`/method` was in the primary navigation of every page and the route never
   existed.** A 404 in the nav reads as a broken site to a visitor and as a
   soft-404 against the domain to a crawler.
3. **`/terms` and `/privacy` were in the footer of every page and v2 deleted both
   pages.** Gated rather than removed — see Ticket 1.

### Two corrections to the guide itself

Both from crawling the live Wix sitemaps on 2026-09-05, so the old-URL half of
the redirect table is not guesswork:

1. The guide says `/programs` "is linked in the footer but has no matching page".
   It returns 200 and serves a real Programs page.
2. The guide misses `/copy-of-about` entirely, which serves the Case Studies page.
   That is a **fourth** unedited default slug, not three. Following the guide as
   written would have left it 404ing at cutover.

---

## Ticket 1 — Broken URL slugs · **DONE**

`next.config.ts` rebuilt. All eleven live Wix URLs plus the three
`/challenge-page/<uuid>` Online Programs pages either carry over or 301, and
every v1 Next.js route that v2 deleted is covered too.

| Live Wix URL | Serves | → |
|---|---|---|
| `/` | Home | carries over |
| `/about` | About | `/firm` |
| `/incubator` | Incubator | `/firm` |
| `/programs` | Programs | `/firm` |
| `/solutions` | Solutions | `/implementation` |
| `/blog` | Blog | `/insights` |
| `/get-started` | Get Started | `/diagnostic` |
| `/general-1` | A.I Appointment Setting | `/implementation` |
| `/copy-of-a-i-appointment-setting` | Missed Lead Capture | `/diagnostic` |
| `/copy-of-missed-lead-capture` | E-Commerce Automation | `/implementation` |
| `/copy-of-about` | Case Studies | `/evidence` |
| `/challenge-page/<uuid>` ×3 | Online Programs | `/firm` |

Also covered: `/system`, `/work`, `/work/:slug`, `/audit`, `/audit/results`,
`/book`, `/pricing` from v1; `/case-studies` and `/case-studies/:slug` in case the
Wix rename in the guide's own Ticket 1 happens before the DNS cutover.

Verified locally: every one of those returns **301** and the destination returns
**200**. `check:seo` now asserts both halves — that each live Wix URL is covered,
and that no redirect destination is a route that does not exist.

**Two judgement calls for Hamza.** `/copy-of-a-i-appointment-setting` serves
"Missed Lead Capture", which is the symptom this firm now sells the diagnosis of,
so it goes to `/diagnostic` rather than to a build page. And both Institute URLs
(`/incubator`, `/programs`) land on `/firm`, because §1.2 moves the Institute to a
separate property — repoint them the day that property exists, since they are the
only inbound links it will start with.

**⚠️ `/terms` and `/privacy` are gated, not fixed.** The footer links are behind
`LEGAL_LIVE = false` in `Footer.tsx`. Unlike `/method` these two *should* exist —
a firm taking systems access and holding client data is expected to publish them,
and a buyer's legal function will look. Writing them is not a developer's call.
Set the flag and add the routes together; `check:seo` will fail if the flag is set
without them.

---

## Ticket 2 — Structured data · **DONE**

`lib/jsonld.tsx`, new. The point is the `@id` graph, not the individual blocks:
schema scattered across pages with no identifiers describes N unrelated things,
and the same schema with a stable `@id` referenced everywhere describes one entity
with N properties.

```
ORG_ID        https://hexonasystems.com/#organization
WEBSITE_ID    https://hexonasystems.com/#website
PRINCIPAL_ID  https://hexonasystems.com/#hamza-baig
```

Organization, WebSite and Person are emitted **site-wide from `app/layout.tsx`**,
so every `@id` reference resolves on the page it appears on — a crawler that
fetches one post in isolation must not see an author reference pointing at nothing.

| Page | Blocks |
|---|---|
| `/` | Organization + ProfessionalService, WebSite, Person, BreadcrumbList |
| `/firm` | same, + BreadcrumbList |
| `/diagnostic` | + Service (with a real `Offer`), FAQPage |
| `/implementation` | + Service (range, not a price), FAQPage |
| `/evidence` | + FAQPage |
| `/insights` | + Blog |
| `/insights/<slug>` | + BlogPosting |

Choices worth knowing:

- **`ProfessionalService`, not bare `LocalBusiness`.** It is a LocalBusiness
  subtype, so the Toronto address is still read as a real place of business, and it
  is the accurate subtype for a diligence firm.
- **This file inherits §5 and §10.** Structured data is the worst place to break
  the sourcing rule, because an assistant repeats it verbatim and with more
  confidence than the page had. So: every optional field routes through `prune()`
  and an unsupplied value is **absent**, never bracketed. No `aggregateRating`, no
  `review`, and **no `award`** — the awards in `firm.ts` are unlinked and
  `CREDENTIALS[1].verified` is false, and an unverifiable award in schema is the
  §1.3 problem with a machine-readable wrapper.
- **The diagnostic `Offer` carries $5,000 because the page publishes it.**
  Implementation carries the $25k–$75k range rather than a point price, because a
  point price would contradict the one honest thing the pricing says.

Verified locally: 40 blocks across 8 pages, all valid JSON, no placeholders, no
malformed `@id`s, every reference resolving.

**Still needed:** postal code, and the `sameAs` URLs (Ticket 9).

---

## Ticket 3 — AI crawler access · **DONE**

`app/robots.ts`, new — v2 served no robots.txt, so with no Sitemap directive
discovery fell back entirely to crawling internal links on a six-page site with no
external inbound links.

One permissive wildcard, deliberately. Per-agent `Allow` groups are the expensive
mistake: the moment one exists, a bot matching it stops reading the wildcard group
entirely and every `Disallow` is silently dropped for that agent. `/styleguide` is
the only exclusion.

**Verified on the live Wix site, 2026-09-05:** it disallows only `*?lightbox=` and
PetalBot. Not one of the nine AI agents in the guide's list is blocked today, so
this cutover is like-for-like on AI access rather than a change that needs
watching. `check:seo` fails if any of the nine appears in executable code there.

**Server-side rendering verified**, which is what the guide's `curl` check is
actually for. Fetching as `GPTBot` and `ClaudeBot` against a production build
returns the entity sentence, full post bodies and every FAQ answer in the raw
HTML. v2's no-JS contract helps here: `[data-enter]` alone is the *final* state and
only `.js [data-enter]` is hidden, so a failed bundle renders a complete page.

---

## Ticket 4 — Contradictory numbers · **NOT APPLICABLE ON v2**

Worth recording rather than silently dropping. v1 had twelve claims in conflict and
a `check-claims.mjs` gate enforcing a single source of truth. v2 deleted both the
gate and `claims.ts` — and it did not need them, because the repositioning cut
almost every contested figure. What remains is small, internally consistent, and
carries its own reasoning in `content/evidence.ts` (the $6B and 500-audit pair is
defined in plain words on the page precisely because those two figures get
divided).

The one thing Ticket 4's discipline would still catch: `FIRM.email` is
`hamza@hexonasystems.com` while the guide's Ticket 2 block uses the same address —
so no conflict there any more. Nothing outstanding.

---

## Ticket 5 — Entity-definition sentence · **DONE**

```
Hexona Systems is a Toronto-based operational diligence firm that runs fixed-fee
revenue leakage diagnostics and builds the process automation, CRM and reporting
systems that close what those diagnostics find, for operating companies between
$10M and $100M in revenue across home services, construction, automotive and
hospitality.
```

`ENTITY_SENTENCE` in `content/firm.ts`, rendering in all four required places:
homepage hero, `/firm` first paragraph, the Organization `description`, and the
homepage meta description.

**v2 does not have the problem Ticket 5 was written for — it has the opposite
one.** The Wix copy ran to "a beacon of progress"; v2's copy is disciplined and
assumes you already know what a diagnostic is. `FIRM.positioning` is four words.
Nothing on the site defines the firm for a reader who arrives without the category,
which is exactly the reader an assistant is. A human reaching the hero already
knows what this is from the strap and the mark; a model does not.

Rendered in small type beneath the hero lead, deliberately: it is the least
interesting sentence on the page to a human and the most useful one to a machine,
and the hierarchy should say so. Still selectable DOM text at a readable size.

`check:seo` enforces the guide's acceptance criteria — city, category, ≥2
deliverables, ≥2 industries, none of the four banned adjectives, present in all
four files — plus one of its own: the sentence must state the `$10M` range, because
a definition that omits it invites the old SMB-agency reading straight back in.

**The industries come from `INDUSTRIES` in `content/evidence.ts`**, the site's own
published taxonomy, rather than being invented. That file flags an unresolved
positioning question — those verticals are SMB shapes and the firm sells at
$10M–$100M — and this sentence deliberately does not resolve it. It states the
range and the sectors together, so it stays true whichever way that call goes.

---

## Ticket 6 — Blog · **DONE, all ten posts written**

Ships at **`/insights`**, with `/blog` and `/blog/:slug` 301'd to it, so the
guide's acceptance criterion is met. Index, `[slug]` route, `BlogPosting` schema
per post, a `Blog` node on the index, **Insights** in the primary navigation, and
all ten in `sitemap.xml` with real `lastModified` dates from the posts themselves.

**⚠️ THE TEN TOPICS ARE NOT THE GUIDE'S TEN, AND THAT IS THE MOST SIGNIFICANT
DECISION IN THIS BRANCH.**

The guide lists "How much does an AI appointment setter cost?", "AI receptionist
vs. answering service: which is right for a small business?", and eight more in
that shape. Publishing those verbatim would have done active damage rather than
nothing: "which is right for a small business" beside a stated $10M–$100M
operating range is the §5 failure in article form. The same reader who dismisses a
property over a sub-$1M engagement record dismisses it over a blog written for
somebody a tenth his size.

The guide's *intent* — answer the question a buyer actually types, in plain
language, be quotable — carries entirely. Its audience assumption does not. So the
ten are rewritten for the operating-partner buyer:

| | |
|---|---|
| What is revenue leakage, and how is it measured? | Diagnosis |
| How much does a revenue leakage diagnostic cost? | Cost |
| How long does a revenue leakage diagnostic take? | Engagement |
| Revenue leakage vs. a sales problem: which one do you have? | Diagnosis |
| Operational diligence vs. management consulting | Comparison |
| Which revenue leaks are worth closing first? | Strategy |
| How do you measure the ROI of closing a revenue leak? | Measurement |
| How to price a revenue leak in EBITDA | Measurement |
| What access does a diagnostic need, and what should you demand? | Engagement |
| What happens if a diagnostic finds nothing worth fixing? | Engagement |

Ticket 6's content rules are enforced structurally rather than by review. The
direct answer is a **separate field** rendered above the first heading, so it
cannot drift down the page, and `check:seo` fails the build if a post is under 800
words, if its answer exceeds 100, if it contains no number, or if its title is not
shaped as a question, a comparison or a task. One further test fails if any post's
title, description or standfirst addresses a small business.

**Nothing about the firm is invented.** Every figure traces to `firm.ts`,
`diagnostic.ts` or `evidence.ts`. Where a post needs a market statistic nobody has
measured — EBITDA multiples above all — it does not assert one: it works from
arithmetic with its assumptions stated and adjustable in the text, or says plainly
that the figure depends on the reader's own numbers. The EBITDA post carries a
`todo` recording exactly that.

Three posts carry `todo` notes naming real firm data that would strengthen them:
the real distribution of elapsed engagement times, and the confidentiality terms.

---

## Ticket 7 — Pricing page and FAQ blocks · **DONE**

**The pricing half resolved itself.** v2 publishes $5,000 for the diagnostic and
$25k–$75k for implementation, on `/diagnostic` and `/implementation`. There is no
gap for a `/pricing` page to fill, so `/pricing` 301s to `/diagnostic` rather than
duplicating published figures on a third page. The guide's actual requirement —
"publish starting-from figures and the variables that move the price" — is already
met, and better than the guide asked.

**FAQ blocks: `content/faqs.ts`** — 8 pairs on `/diagnostic`, 7 on
`/implementation`, 6 on `/evidence`, all with `FAQPage` schema.

Two things about how they are built:

- **Not an accordion.** Ticket 7 warns against putting answers behind a click. The
  usual compromise is native `<details>`, which keeps the text in the HTML; this
  goes further and drops the disclosure entirely. It removes the failure mode
  instead of mitigating it, and it is the idiom this site already uses — `BUILDS`,
  `DELIVERABLES`, `REQUIREMENTS` and `TERMS` are all `<dl>` lists that state
  everything at once. Questions are real `<h3>` elements, as the ticket requires.
- **The schema and the visible text are the same array.** Each page renders it *and*
  passes it to `faqPageLd()`, so Ticket 2c's word-for-word rule holds structurally.
  Drift is not possible.

**⚠️ THE HIGHEST-VALUE FAQ IS DELIBERATELY MISSING.** `content/diagnostic.ts` calls
confidentiality and systems access "the most important unanswered question on the
site" and leaves `CONFIDENTIALITY` empty on purpose, because an invented security
posture is worse than an absent one and a specific false one is actionable. That
reasoning binds harder in an FAQ, so those questions stay out. The
`what-access-does-a-diagnostic-need` post lists the six questions a buyer's IT or
legal function will ask and pointedly does **not** answer them on the firm's
behalf. Fill `CONFIDENTIALITY` and both the section and that post get materially
stronger.

---

## Ticket 8 — Partner logos · **ALREADY HANDLED, BETTER THAN THE GUIDE ASKED**

No change made, and none needed. The guide flags Moody's Analytics and Snowflake
under an unexplained "Our Partners" heading next to an unnamed Fortune 500 claim.
On v2 the Fortune 500 claim is gone entirely, and `TRUSTED_BY` carries the heading
"Trusted by teams **at**" — a preposition doing real work, claiming people at those
organisations rather than the organisations as clients. `content/firm.ts` documents
the reasoning and warns against dropping it.

That is a more precise fix than the guide proposed. Left alone.

---

## Ticket 9 — Third-party presence · **DEV SIDE DONE**

`PROFILES` in `content/firm.ts` holds seven target platforms — LinkedIn (firm and
principal), Crunchbase, Google Business Profile, Clutch, G2, DesignRush — and feeds
the Organization `sameAs` automatically. Closing this later is one line per
profile, never a schema change.

**Only `verified` entries with a URL are emitted.** A `sameAs` pointing at a
profile that does not exist is a broken assertion about identity, and entity
resolution penalises exactly that — the same gate `CREDENTIALS` and `AWARDS`
already apply to `href`. A test enforces it.

Marketing owns the rest. One note: the guide's advice to collect ten Clutch
reviews sits awkwardly beside §5, since a review from a sub-$10M client contradicts
an ICP this site refuses to publish below. Worth a decision before the profiles go
live. The guide's other advice — stop buying syndicated press placement —
`content/firm.ts` already argues for twice, independently.

---

## What is left, in the order it unblocks things

1. **Hamza — `CONFIDENTIALITY` in `content/diagnostic.ts`.** Six questions, already
   written out there. Unblocks the site's most important missing section *and* the
   strongest FAQ, *and* the access post.
2. **Hamza — `/terms` and `/privacy`.** Both footer links are dark until the pages
   exist. A buyer's legal function will look.
3. **Hamza — `FIRM.phone`, postal code, and `href` on the awards.** Each one
   surfaces automatically once set.
4. **Marketing — the seven third-party profiles.** Longest lead time; start now.
5. **Founder — the two positioning calls already flagged in the code**: whether the
   SMB industry shelves in `content/evidence.ts` belong under the engagement
   record, and the `LEAKAGE_SCALE.period` window.
6. **At cutover — re-crawl the live Wix site** and confirm the redirect table is
   still exhaustive. It was on 2026-09-05.

---

## Commands

```bash
npm run check:seo   # this guide's gate: redirects (and their destinations),
                    # crawler access, entity sentence, schema placeholders,
                    # dead nav links, FAQ minimums, post word counts
npm run verify      # typecheck → test → lint → contrast → seo → build
```
