# The Hexona blog: how to write an article

Every article is one TypeScript file in `content/blog/articles/`, registered in
`content/blog/articles/index.ts`. Register it and it appears everywhere on its
own: its page at `/blog/<slug>`, the hub and category pages, the cover image,
`sitemap.xml` (with the image), `/blog/feed.xml`, `/llms.txt` and its JSON-LD.

`npm test` runs `content/blog/blog.test.ts`, which fails a draft on dashes,
banned words, long titles, missing FAQs or sources, broken internal links and
more. **A draft is not done until `npm test` passes.**

The playbook this follows is the GoHighLevel hub on hamzaautomates.com (same
author, same rules), adapted for a different reader.

## Who we write for

Owners and operators of service businesses in the US and Canada: contractors,
plumbers, HVAC, med spas, clinics, property managers, auto shops, restaurants.
They are busy, skeptical of AI hype, and they think in calls, jobs, customers
and cash. They are **not** agency owners or AI builders. Never explain how to
start an agency or resell software here; that belongs on hamzaautomates.com.

Every article should leave the reader thinking "these people know exactly what
goes wrong in a business like mine", and give them a reason to book a consult
or take the Value Score without being pushy about it.

## The four tracks (pick topics across them)

| Track | Category | What the reader wants | Examples |
|---|---|---|---|
| Buyer | `costs` | Comparing or about to buy | AI receptionist cost, AI vs answering service, best AI receptionist |
| Explainers | `guides` | To understand something new | What is an AI agent, call recording consent laws, A2P 10DLC |
| Fix it | `playbooks` | To fix a leak in the business this week | Missed call text back, review requests, no-show reminders, estimate follow-up |
| Value | `value` | A business worth more and less dependent on them | What is my business worth, owner dependence, HVAC valuation |
| News | `news` | What changed in AI and whether it matters to them | Weekly roundup, fast takes on big releases |

## Anatomy (the template renders it in this order)

1. `title`: the H1, sentence case, phrased the way people search ("How much does an AI receptionist cost in 2026?").
2. `intro`: **the answer in the first two sentences**, stated as a fact a link could sit on, with the date when a price is involved: "An AI receptionist costs between $X and $Y a month for most service businesses as of November 2026." No warm-up. Then one or two short paragraphs of context.
3. `cover` + `coverAlt`: the generated cover. Pick the style that says the point at a glance (`chat` for anything about conversations, `stat` for a cost or a number, `versus` for comparisons, `button` for an action, `type` as a last resort). `coverAlt` describes what the cover shows, in the third person.
4. `tldr`: 3 to 5 short facts.
5. `sections`: each `heading` is a question people actually ask where it fits ("Does an AI receptionist sound human?"). Use `table` for anything compared, priced or listed by state; use `figure` for an "at a glance" graphic (stats, bars, steps); `steps` for how-to; `callout` for a caveat or a rule of thumb. Aim for 5 to 9 sections and 1,200 to 2,200 words. News fast takes can be 600 to 1,000.
6. `faq`: 5 to 8. Short, direct answers that stand alone, because they become FAQPage schema and assistants quote them.
7. `sources`: at least 2, primary where possible (vendor pricing pages, the statute, the government data, the company's announcement). Every `note` says what was used and the date read: "Pricing page, read Nov 6, 2026".
8. `related`: 3 slugs.

## Voice

- Hamza Baig is the author. Write in first person **only for things Hamza or Hexona actually did, saw or said**: founded Hexona in 2022, more than 1,000 agencies running on Hexona's AI and systems, the case studies in `content/evidence.ts`, Hamza's published videos and hub articles on hamzaautomates.com. Everything else is stated as fact with a source.
- Have opinions. Say what you'd pick and why, what's overrated, what breaks, who should not buy it.
- Short paragraphs. Contractions. Plain words a plumber would use. Concrete numbers over adjectives.
- Talk about jobs, calls, customers, cash, reviews, nights and weekends. Not "workflows", "synergy" or "digital transformation".
- Name the business types: "an HVAC company with three trucks", "a med spa with two injectors".

## Banned (the test enforces most of these)

- Em dashes and en dashes. Use commas, periods, colons or parentheses. Write ranges as "5 to 10" or "$5-$10" with a hyphen.
- Words: delve, landscape, seamless, seamlessly, robust, unlock, leverage, crucial, pivotal, elevate, empower, journey, showcase, enhance, game-changer, revolutionize, cutting-edge, in today's, fast-paced, ultimately, it's worth noting, here's why, here's how, here's the thing, let's dive, in conclusion, not just, whether you're.
- "It's not X, it's Y" constructions. Reflexive lists of three. Motivational closing lines. Rhetorical questions as filler.
- Fake precision: no statistic without a source in `sources`. If you can't source it, cut it or say plainly that it's an estimate and whose.

## Facts, money and claims

- Every price, rate, limit and legal rule is checked on its source the day you write, and the date goes in the text ("as of Nov 2026") or the source note. Re-check `lastChecked` whenever you edit.
- When sources disagree, say so and say which you went with.
- Case study figures are quoted exactly as `content/evidence.ts` states them, linked with `/evidence/<slug>`. For cases with `basis: 'projected'` quote only what was found before the build, never a projection as a result.
- No income promises: no "you will make", "guaranteed", typical-results claims, or ROI promises. Say what a system does and what a real client measured.
- Laws (call recording, TCPA, A2P, HIPAA): state the rule, link the statute or regulator, and say it's general information, not legal advice.
- Never invent quotes, customers, reviews or names presented as real. Example conversations are labelled as examples.

## Links

- Write internal links as the bare path in the sentence, and RichText turns it into a link with the page's label. Labels it uses:
  - `/blog/<slug>` → that article's title
  - `/ai-employees/<slug>` → "our AI Receptionist page" (etc.)
  - `/industries/<slug>` → "AI for construction and contractors" (etc.)
  - `/evidence/<slug>` → "the tire and seasonal automotive service case study" (etc.)
  - `/book` → "book a free consult", `/firm` → "about Hexona"
  - Do not link `/score`: the Value Score is hidden from the public until it is ready.
  So write the sentence for the label: "If you want it built for you, /book." reads as "If you want it built for you, book a free consult."
- Link 2 to 4 site pages from the body of every article, where they fit the sentence. Always include at least one AI employee or industry page.
- External sources: write the full https:// address; it renders as a link labelled with the host and path.
- `**double asterisks**` make bold. Use it for the bolded lead-in of an answer capsule, sparingly.

## Scaled content check

Before publishing a page that follows a pattern (one per industry, one per state), make sure it has something its siblings don't: real numbers, steps or rules only that page needs. If two pages would differ only by the noun, write one page.

## Weekly AI news

`category: 'news'`, `kind: 'News'` for the Monday roundup or `kind: 'Analysis'` for a fast take. Only cover releases that change something for a service business (voice AI, phone, texting rules, search and AI answers, booking, payments). For each item: what shipped (linked to the announcement, with the date), what it means for an owner in one or two sentences, and whether to do anything about it. No item without a primary source. Slug format: `ai-news-week-of-<month>-<day>-<year>` for roundups.

## Topic backlog

`content/blog/BACKLOG.md` is the ranked list of topics with target queries and evidence. Take the next unclaimed topics from different tracks, and mark each one `Shipped YYYY-MM-DD` with its URL when it goes live.
