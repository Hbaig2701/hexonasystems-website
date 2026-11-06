# Hexona blog backlog

Built Nov 6, 2026 from DataforSEO (Google Ads search volume, US, location 2840; Labs keyword difficulty), the keyword research behind the v3 site, a study of flowtivity.ai/blog, and the hamzaautomates.com/gohighlevel playbook. Volumes are US monthly searches as of Nov 2026; KD is DataforSEO difficulty 0 to 100 (lower is easier). Re-check volumes quarterly.

## How to use this file

- **Scheduled runs take the next unclaimed topics from different tracks, top down.** Skip anything marked `Shipped`. If the next two unclaimed topics share a track, take the first and keep going down for one from another track.
- When a topic ships, add `Shipped YYYY-MM-DD: https://www.hexonasystems.com/blog/<slug>` under its title.
- Every topic must still pass the README rules: answer first, sourced facts with dates, no dashes, 5 to 8 FAQs, 2+ internal links, and something only Hexona can add (a case study, a build we've done, a real opinion). If a topic can't get that today, mark it `Deferred: <reason>` and take the next one.
- Track codes: **C** = costs & comparisons, **G** = guides, **P** = playbooks, **V** = business value, **N** = AI news.

## Shipped in the launch batch (Nov 6, 2026)

1. G · what-is-an-ai-agent (what is an ai agent, 22,200/mo)
2. C · ai-receptionist-cost (ai receptionist cost/pricing, answering service cost)
3. C · ai-receptionist-vs-answering-service
4. C · ai-receptionist-vs-hiring-a-receptionist (receptionist salary, 1,600)
5. C · best-ai-receptionist-for-small-business (best ai receptionist, 320 + 320)
6. C · after-hours-answering-service (1,000/mo, $143 CPC)
7. G · ai-agent-examples (1,600)
8. G · two-party-consent-states (3,600)
9. G · a2p-10dlc-explained (880)
10. G · how-to-get-recommended-by-chatgpt
11. P · missed-call-text-back (390)
12. P · speed-to-lead (880)
13. P · database-reactivation
14. P · how-to-get-more-google-reviews (480)
15. P · appointment-reminder-texts (390)
16. V · hvac-maintenance-agreements (1,300)
17. V · what-is-my-business-worth (1,300)
18. V · how-to-make-your-business-run-without-you
19. V · hvac-business-valuation (110)
20. N · ai-news-week-of-november-2-2026, plus one fast take

(The batch writers' final slugs are the source of truth; check `content/blog/articles/batch-*.ts`.)

## Ranked backlog

### 21. Answering service for property management: AI, human or both?
- Track C · slug `answering-service-for-property-management`
- Queries: answering service for property management (880, KD 0), ai for property management (720, KD 12), property management after hours
- Angle: maintenance emergencies vs routine requests, tenant vs owner vs prospect calls, AppFolio/Buildium/Yardi work orders, fair housing caution on leasing calls. Link /industries/property-management.

### 22. AI for construction companies: 9 places it pays off first
- Track G · slug `ai-for-construction-companies`
- Queries: ai for construction (2,400, KD 17), ai in construction, ai for contractors (110)
- Angle: office work, not robots: estimating follow-up, approvals, subcontractor scheduling, safety docs. Use construction-project-pipeline and home-improvement-sales-workflow cases. Different from /industries/construction (that page sells; this one teaches).

### 23. Virtual receptionist vs AI receptionist vs answering service: what each costs per call
- Track C · slug `virtual-receptionist-cost`
- Queries: virtual receptionist (2,900, CPC $111), virtual receptionist cost (50), ai phone answering service (2,900)
- Angle: per-minute vs per-call vs flat, worked example for 300 calls a month at three vendors, dated.

### 24. How to choose an AI automation company (questions to ask before you sign)
- Track C · slug `how-to-choose-an-ai-automation-company`
- Queries: ai automation agency (4,400, KD 19), ai consultant (8,100), ai consultant near me (720), ai consulting services (1,900)
- Angle: written for the owner doing the hiring. Red flags, ownership of accounts and data, who runs it after launch, how results are measured. Be fair to competitors.

### 25. ServiceTitan vs Jobber vs Housecall Pro: which AI features matter
- Track C · slug `servicetitan-vs-jobber-vs-housecall-pro-ai`
- Queries: field service management software (18,100, CPC $108), servicetitan ai (90), jobber ai (140), housecall pro ai (70)
- Angle: only what each vendor's own pages say their AI does, dated; what still needs an outside AI employee.

### 26. What does an AI voice agent sound like? Real call examples for service businesses
- Track G · slug `ai-voice-agent-examples`
- Queries: ai voice agent (33,100 with Aug 2026 spike; base ~1,600-3,600, KD 38), ai phone agent (2,400)
- Angle: transcripts of example calls (labelled), what callers notice, disclosure, accents, latency. Embed or link Hamza's voice agent build video if clean.

### 27. Speed to lead for HVAC and plumbing: a 60-second response setup
- Track P · slug `speed-to-lead-hvac-plumbing`
- Queries: speed to lead (880), lead response time, hvac leads
- Angle: niche-specific steps (emergency vs maintenance leads, after-hours dispatch), only if it adds more than /blog/speed-to-lead. Otherwise skip (scaled content check).

### 28. How to get paid faster: invoice reminder texts and emails that work
- Track P · slug `invoice-reminder-texts`
- Queries: late payment reminder, how to get clients to pay invoices, automate invoice reminders, payment reminder template
- Angle: cadence (day 0, 3, 7, 14, 30), templates, deposits, card on file. Link /ai-employees/ai-collections.

### 29. AI SDR vs a human appointment setter for a service business
- Track C · slug `ai-sdr-vs-appointment-setter`
- Queries: ai sdr (1,600, KD 27), ai sales agent (1,300, KD 15), ai appointment setter (320, KD 4)
- Angle: high-ticket service sales (roofing, solar, remodelling). Use coaching-lead-scoring and solar cases.

### 30. AI scheduling assistant: how automated dispatch actually works
- Track G · slug `ai-scheduling-assistant`
- Queries: ai scheduling assistant (1,000, KD 29), ai dispatcher (320, KD 4), ai scheduling software (140)
- Angle: plumbing-field-service-platform found waste (projected case rules), rules a dispatcher follows, what still needs a human.

### 31. How to prepare a service business for sale: a 12-month checklist
- Track V · slug `how-to-prepare-a-business-for-sale`
- Queries: sell my business (1,600), how to sell my business (720), business exit strategy (720), exit planning (720)
- Angle: the 10 drivers (content/drivers.ts), clean books, recurring revenue, documented systems; link /book (the /score tool is hidden until it is ready, so do not link it).

### 32. SDE vs EBITDA: which one is your business valued on?
- Track V · slug `sde-vs-ebitda`
- Queries: sde multiple (140), ebitda multiple small business, business valuation multiples (110)

### 33. What an AI receptionist should say first (disclosure, recording notice, scripts)
- Track P · slug `ai-receptionist-script`
- Queries: ai receptionist script, answering service script, call recording disclosure
- Angle: openers by industry and state consent rules; link /blog/two-party-consent-states.

### 34. Plumbing business valuation: what buyers look at
- Track V · slug `plumbing-business-valuation`
- Queries: plumbing business valuation (40), how to sell a plumbing business (20)
- Scaled content check: only with plumbing-specific facts (service vs new construction mix, licensing, fleet). Otherwise fold into #31.

### 35. Med spa no-shows: deposits, reminders and waitlists
- Track P · slug `med-spa-no-shows`
- Queries: med spa no show policy, med spa deposit, appointment reminder texts
- Angle: medspa-booking-system found figures (projected rules), deposit policies, HIPAA note.

### 36. AI chatbot for your website: is it worth it for a service business?
- Track C · slug `ai-chatbot-for-business`
- Queries: ai chatbot for business (4,400, KD 20s), ai chatbot for small business
- Angle: chat vs text vs voice, what converts, where it fails.

### 37. AI for restaurants and cafes: retention, reservations and reviews
- Track G · slug `ai-for-restaurants`
- Queries: ai for restaurants (720, KD 20)
- Angle: coffee-loyalty-programme case.

### 38. Is AI bookkeeping ready for a service business?
- Track C · slug `ai-bookkeeper`
- Queries: ai bookkeeper (1,600, KD 28)
- Angle: honest limits; we don't build bookkeeping, say who should. Link the clean-financials driver.

### 39. HVAC membership programs that renew themselves
- Track P · slug `hvac-membership-renewals`
- Queries: hvac membership program, hvac maintenance agreement renewals
- Scaled content check against /blog/hvac-maintenance-agreements; ship only with renewal-specific steps and templates.

### 40. How AI Mode and AI Overviews pick local businesses (update quarterly)
- Track G · slug `google-ai-mode-local-businesses`
- Queries: google ai mode local business, ai overviews small business
- Angle: refresh of /blog/how-to-get-recommended-by-chatgpt with Google-specific changes; re-check monthly.

## Weekly news

- **Monday:** `ai-news-week-of-<month>-<day>-<year>` roundup of the previous week (5 to 8 items, each with a primary source and a "do anything?" line).
- **Any weekday:** a fast take (`category: 'news'`, `kind: 'Analysis'`) within 24 hours when something ships that changes how a service business answers phones, texts customers, gets found in search or AI answers, books or gets paid. Examples: a new realtime voice model or price cut, carrier or FCC texting rule changes, Google Business Profile or AI Mode local changes, ChatGPT local recommendations or booking features.

## Updates to existing pages

- Re-check every price in the cost articles on the 1st of each month; update `lastChecked`, and `dateModified` when a figure changes.
- Rewrite the five v2 articles (what-is-revenue-leakage and siblings) to the v3 format with FAQs and sources, and drop their remaining references to the $3M to $15M range.
