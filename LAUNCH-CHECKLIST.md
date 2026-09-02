# Launch checklist

Everything below blocks production. Each item cites the spec section that
requires it. Run `npm run check:claims` first — it mechanically enforces items
1 and 2.

---

## 1. Claims — lock every figure to one value (§12)

Twelve claims are `status: 'pending'` in `content/claims.ts`. Each renders today
at its best-available value with a visible ⚠️ marker on the page. Resolve the
conflict, set the value, flip `status` to `'verified'`.

**Bringing the Framer design's numbers in made the §12 problem worse, not
better** — there are now four different figures for "how many businesses" across
four sources. That is exactly the corrosion §12 warns about: the buyer
sophisticated enough to check is the buyer worth having.

| Claim | Conflicting versions found | Recommendation |
|---|---|---|
| `BUSINESSES_POWERED` | 1,000+ (spec) / 10K partners (portfolio) / **1,500+** (Framer) / 1000+ clients (Framer table) | **Four versions.** Define powered vs partners vs clients vs supported, then lock one |
| `VALUE_GENERATED` | **$20,000,000+** — Framer only | Largest number on the site. Confirm basis (generated? saved? both?) and period |
| `AWARDS_COUNT` | 5 (current site, one named) / **6** (Framer) | Name all six in THE RECORD, or reduce the count |
| `SAASPRENEUR_DIAMOND` | Diamond 2025 — Framer only | **This is the hero news badge**, so it is the first claim anyone reads. Confirm first |
| `BUILDERS_TRAINED` | 15,000 / 40,000+ / 47,000 | 40,000+ if defensible |
| `CONTINENTS` | 22 countries / "five or more" / six continents | "Six continents" |
| `SOCIAL_FOLLOWING` | 100,000+ / 109,000 IG / 200,000+ / 250,000+ | "200,000+ across platforms (2026)", dated |
| `OPERATING_SINCE` | Automating since 2021 (Framer) vs company founded 2022 (spec) | Both can be true. Say which is which |
| `DEVELOPER_NETWORK` | 40+ — Framer table only | Confirm |
| `MRR` | $100K+, press releases only | §12 recommends publishing |
| `COMBINED_YEARS` | 40+ | Confirm which team it represents |
| `PROJECTS_COMPLETED` | 500+, homepage only | Confirm and keep, or cut. **Not rendered anywhere** |

Verified and safe to use freely: `SAASPRENEUR` (Platinum, 2024, top 0.01%) and
the whole daycare case.

## 2. No statistic hardcoded outside `claims.ts` (§12)

Currently passing. `npm run check:claims` greps for it and will fail if a figure
gets inlined into a component later.

---

## 3. Assets that block launch (§11)

Every one of these renders today as a deliberately ugly **Asset pending**
placeholder. §14 Phase 6: no labelled placeholder may survive into production —
resolve it or cut the section.

- [ ] **Founder portrait** — environmental, high resolution, real workspace,
      professionally shot. Not a white-background headshot, not AI-generated,
      never stock (§15). Appears on `/` §9 and `/about`.
- [ ] **Case study data** for `manufacturing-coordination` and
      `missed-lead-capture`: before/after metrics, timeline, systems replaced,
      client quote. §7.1 S5 is explicit — **cut the card rather than ship a vague
      number**. `content/cases.ts` has `published: false` ready for that.
- [ ] **Client quote** for the childcare case (§7.3, "In their words").
- [ ] **Audit model source** (§8.5) — the slow-response penalty must be
      attributed to a citable study or to Hexona's own client data
      ("Based on outcomes across N Hexona implementations", which is stronger).
      Set `MODEL_SOURCE` in `content/audit-model.ts`. The UI currently prints a
      red warning in its place. **Do not ship an unattributed constant.**
- [ ] **Partner logo permissions** (§11.5) — confirm Moody's Analytics,
      Snowflake, Younite, Make, Zapier, OpenAI and Pabbly may be displayed, and
      in what capacity. Partner, integration and customer are legally different
      claims; everything currently renders under the narrowest one.
- [ ] **Award evidence** — the Platinum SaaSPreneur certificate or link, plus
      evidence for the other four if "5 awards" is retained. Add `href` to rows
      in `RECORD`.
- [ ] **13 incubator testimonials transcribed to text**, with permission to
      attribute (§7.5.5, §11.7). Keep the screenshots as supporting evidence —
      but words inside an image are invisible to search, to screen readers, and
      to anyone skimming.
- [ ] **Homepage testimonials** — the four in `content/testimonials.ts` were
      transcribed from the Framer design. Confirm the exact wording against the
      original submissions and permission to attribute by name and company.
      Typos in the source were left as written rather than silently corrected;
      flag any that should be cleaned up.
- [ ] **Team portraits** — six people in `content/team.ts` render placeholders
      until real photographs exist. Monochrome and environmental, per the
      reference design. **Never stock, never AI-generated** (§15, §11.8) — an
      invented likeness of a real colleague is worse than an empty frame.
- [ ] **Team bios** — one line each. Optional field; cards render fine without.
- [ ] **Press logo files** for the As Featured On bar. Currently wordmarks in
      mono type, which drop-in replace without a layout change.
- [ ] **Complete integration list** (§7.2.4).
- [ ] **Incubator curriculum modules** (§7.5.3) — the single biggest reason that
      page converts poorly today is that it lists nothing concrete.
- [ ] **Security and data-handling summary** (§7.2.5) — enterprise-adjacent
      buyers look for this and its absence is disqualifying.
- [ ] **Industry benchmark response times** (§8.7), or cut that module.
- [ ] **Pricing bands**, or the approved language for declining to publish them.
- [ ] **Brand mark in SVG** (§11.13) — `components/layout/Logo.tsx` currently
      holds a drawn placeholder built from the lattice's own language.
- [ ] **Public phone number** — `COMPANY.phone` is empty and the footer line
      hides itself until it is set.
- [ ] **Social profile URLs** — `SOCIAL` in `Footer.tsx` is deliberately empty.
      A footer icon linking to `#` is worse than no icon.

## 4. Legal (§7.7, §11)

- [ ] `/privacy` and `/terms` carry **counsel-reviewed copy**. Both ship today
      behind an unmissable "Draft — not reviewed by counsel. Do not publish"
      banner. What is under it is a structured drafting brief covering
      everything §7.7 enumerates, not legal advice. Set `reviewed={true}` and a
      real `updated` date once reviewed.
- [ ] Retention period stated as an actual period.
- [ ] Email provider named explicitly among the processors.

## 5. Integrations to wire (§9.1)

- [ ] `MAKE_WEBHOOK_URL` — without it `/api/lead` logs a warning and drops the
      lead. The visitor still gets their breakdown; nothing reaches the CRM.
- [ ] Create the §9.2 custom fields in GoHighLevel. **Note the spec's own
      inconsistency**: it enumerates 16 fields, the prose says "17 fields", and
      the Phase 3 acceptance criterion says "13". `lib/crm.ts` implements the 16
      enumerated. Confirm which is intended.
- [ ] `UPSTASH_REDIS_REST_URL` / `_TOKEN`. Without them a per-instance
      in-memory limiter takes over — fine locally, **not sufficient in
      production**.
- [ ] `NEXT_PUBLIC_POSTHOG_KEY` — no key means no PostHog and no cookie bar.
- [ ] GoHighLevel calendar embed on `/book`, with field mapping so the three
      qualifying answers and the audit URL land on the booking record.
- [ ] Cloudflare Turnstile on the **booking form only** (§9.4). Never on the
      audit — a visible challenge there would gut completion.
- [ ] Skool application URL for the `/incubator` CTA.
- [ ] Verify a test submission creates a GHL contact with every custom field
      populated and the correct `leak-tier-*` tag.

## 6. Verification still to run on real hardware

Everything below needs a browser and devices, which the build could not do for
itself.

- [ ] **Lighthouse**: mobile Performance ≥ 88, Accessibility ≥ 95, LCP < 2.0s on
      throttled 4G (§14 Phase 4). Run against both the dark pages and the light
      editorial sections (§10.4).
- [ ] **Lattice at 60fps on an M1 Air, ≥ 30fps on a mid-tier Android** (§14
      Phase 2). Force each tier with `?lattice=webgl|svg|static|off`.
- [ ] **Reduced motion** — set the OS preference and confirm the static
      assembled lattice, instant odometers, and no sweep/convergence/cursor
      field. The page must be fully persuasive in this state (§6.5).
- [ ] **JavaScript disabled** — every section readable at full opacity, the
      accordions open natively, the audit section shows its static fallback.
      Mechanically verified (no `.js-enabled` in SSR HTML, odometers server-render
      their final values, 9 native `<details>`), but look at it.
- [ ] **VoiceOver and keyboard-only** end to end, especially the four audit steps
      and the sliders (§10.4).
- [ ] **Cross-browser**: Safari, Chrome, Firefox, Edge; iOS Safari and Chrome
      Android on **real devices, not simulators** (§14 Phase 6).
- [ ] **Crawl the current live site** and confirm the §7.3 redirect table is
      exhaustive. Any live URL not in it and not carried over is a lost bookmark.
      Verify the exact current e-commerce slug in particular — it is a guess.
- [ ] JSON-LD through Google's Rich Results Test.
- [ ] Confirm every PostHog funnel step fires: `audit_started` →
      `audit_step_completed` → `audit_completed` → `audit_email_captured` →
      `booking_submitted`.

---

## Known deviations from the spec

0. **The accent is brand cyan (#22D3EE), not the spec's molten amber**, and
   section headings are centred behind a pill eyebrow. Both are deliberate
   client decisions taken from the existing Framer design: the logo, the live
   site and the reference are all cyan, and a brand colour that disagrees with
   the mark is a brand colour that is wrong. §15 lists "everything centred" as a
   template marker, so the compromise is centred *headings* over deliberately
   varied *content* — grids, splits, ledgers, full-bleed panels — which keeps
   the rhythm the anti-pattern is actually about.

   Three guardrails came with it:
   - `--signal-leak` and `--signal-sealed` stay warm/green so a falling packet
     can never read as something clickable.
   - `--light-accent` is a dark teal (#0A5A6B, 6.9:1). The brand cyan reaches
     1.5:1 on the light editorial ground and is unreadable there.
   - Glow is gradient-only, one hue, never behind body copy.

   `npm run check:contrast` measures all 27 text pairs on both surfaces on every
   verify run. **It caught a real defect in the spec's own token table**:
   `--light-tertiary` was documented as 4.9:1 but measured 4.45:1 on the light
   base and 4.07:1 on light cards. It has been darkened to #5F646C.

0b. **Display figures use Geist, not Geist Mono** (§4.3 specified mono for "Big
   numbers"). The reason is mechanical, not aesthetic: in a monospace the comma
   and the dollar sign are small glyphs centred inside a full-width advance, so
   `$415,800` renders with a visible crater either side of the comma. No other
   monospace face fixes it. Figures now use Geist with `tabular-nums` +
   `lining-nums`, so digits still share an identical advance — columns align and
   the odometer roll still works — while separators take their natural width.
   Mono is retained for the small uppercase technical labels, which is where it
   earns its keep. The face is a single token, `--font-figure`. `/styleguide`
   block 15 shows both treatments side by side, with the mono kept as a labelled
   anti-pattern so it does not get "restored" by someone reading §4.3.

   Related fix: `Odometer` sized its digit cells at a hardcoded `0.62em`, which
   matched no real font metric and put digits and separators on different
   rhythms. Now `1ch` — exactly the advance of `0` in the active font.

1. **Next 16, not Next 15** (§10.1). `create-next-app@latest` ships 16; the App
   Router API used here is unchanged and 16 is the current stable.
2. **The lattice is raw three.js, not react-three-fiber** (§10.1 stack table).
   §5.6 sets a hard budget of "< 45KB gzipped excluding three.js core" and makes
   it a Phase 2 acceptance criterion; r3f exceeds that on its own. The scene is
   one `LineSegments` plus one `Points` mutated imperatively every frame with no
   React involvement by design, so r3f's ergonomics were never used. **Measured:
   1.9 KB gz of lattice code on top of 128.5 KB gz of three.js core.**
3. **The audit's leak visualisation is Canvas 2D, not WebGL** (§5.5 permits it as
   the second canvas but does not mandate the API). It is ~30 cells in a
   contained panel, it costs nothing to run, and — critically — it must work on
   exactly the devices where the WebGL tier was rejected. The audit is the
   conversion centrepiece; it does not get to be the thing that fails on a
   mid-tier Android.
4. **Redirects use `statusCode: 301`, not Next's `permanent: true`**, which would
   emit 308. §7.3 specifies 301.
5. **The OG image uses the default sans font**, not Geist. Loading a webfont into
   `ImageResponse` means a network fetch per render; revisit if the preview
   typography matters enough.
