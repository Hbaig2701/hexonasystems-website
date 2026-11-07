# Open items

What is still outstanding after the November 2026 rebuild. Owner in brackets.

## Decisions and assets (Hamza)

- [ ] **Funnel subdomains.** Twelve unrelated GoHighLevel funnels (lifecoaching,
      getmedicalinsurance, restaurantraffle, …) live on hexonasystems.com
      subdomains. Move them to their own domains.
- [ ] **Google Business Profile.** Description and category still describe the
      September "operational diligence" positioning. Update to AI employees.
      Do not use an address where the business does not operate.
- [ ] **Reviews that name a trade.** Ask clients in one or two target niches
      (e.g. HVAC, home services) for reviews that mention the trade.
- [ ] **Awards and press.** `content/recognition.ts` (mirrors the GoHighLevel hub's About
      page). Add the 2026 Affilionaire photo and any new interviews to both.
- [ ] **Public phone number** (`FIRM.phone`). One number used everywhere, or none.
- [ ] **Legal review** of `/privacy` and `/terms` by counsel.
- [ ] **Founder photography** from the talk and, later, a proper shoot.
- [ ] **Vercel 2FA** on every account that can deploy production.
- [ ] **Vercel Analytics** switched on in the Vercel dashboard (project → Analytics).
- [ ] **Search Console and Bing Webmaster Tools:** verify the site, submit
      `https://www.hexonasystems.com/sitemap.xml`, request indexing for `/`,
      `/ai-employees` and `/firm`.
- [ ] **Profiles:** claim and update Crunchbase; set up Clutch. Add each to
      PROFILES in `content/firm.ts` once live.
- [ ] **Booking:** set `LEAD_WEBHOOK_URL` in Vercel, send one test from `/book`,
      and confirm it lands in GoHighLevel.

## Content

- [ ] Weekly article publishing is **paused until January 2027** while
      Tropika settles the index after the Wix → Vercel move. Restart it against
      the keywords from Tropika's search research.
- [ ] `/score`: finish and unhide, or remove.
- [ ] Thin hub pages (`/industries`, `/ai-employees`, `/book`) could carry more
      copy once the freeze lifts.

## Engineering

- [ ] Content-Security-Policy header. Needs allowances for Google Tag Manager,
      GA4 and Vercel Analytics; test against GTM preview before shipping.
- [ ] A ruleset on `main` requiring the CI check to pass before merge
      (GitHub → Settings → Rules).
