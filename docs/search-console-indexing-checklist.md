# Search Console: Request Indexing Checklist

Context: on 2026-10-05, 30 of 33 pages were stuck at **"Discovered – currently not indexed"**. The fix (PR #3) now puts full page content in the HTML. These steps ask Google to recheck the pages.

**How to request indexing for one URL:** paste it into the "Inspect any URL" bar at the top of Search Console → Enter → **Request indexing** → wait 1–2 min → **Got it**. Google allows about 10 a day; if you see "Quota exceeded", continue the next day. Skip any URL that already says "URL is on Google".

## Done — 2026-10-05

- [x] Validate fix on "Discovered – currently not indexed" (Indexing → Pages)
- [x] Resubmitted `sitemap.xml` (Sitemaps)
- [x] Requested indexing:
  - [x] https://www.webwalastudio.com/
  - [x] https://www.webwalastudio.com/services/medical-clinics
  - [x] https://www.webwalastudio.com/services/salons-spas
  - [x] https://www.webwalastudio.com/services/schools-institutes
  - [x] https://www.webwalastudio.com/locations/gurugram
  - [x] https://www.webwalastudio.com/blog/website-cost-india-2026
  - [x] https://www.webwalastudio.com/blog/master-salon-bengaluru-website-launch

## Progress — 2026-10-08

- **Indexed: 3 → 5.** Indexed so far: the homepage, `/blog/website-cost-india-2026`, `/blog/master-salon-bengaluru-website-launch` (all crawled Oct 5 after the manual requests), plus `/blog/gst-billing-small-business-websites` and `/services/law-firms` (crawled Aug 23).
- **Discovered – currently not indexed: 30 → 27**, validation **Started**.
- **Crawled – currently not indexed: 1** — `/locations/gurugram`. Cause: the 5 location pages were near-identical templates (only ~76 words unique per city). Fixed in PR #6 — each city page now has its own areas, industries, how-we-work notes, related guides, and FAQs (Gurugram: 585 unique words).
- [x] Re-requested indexing for https://www.webwalastudio.com/locations/gurugram after PR #6 went live
- [x] Re-request the other 4 location pages. They were requested in batches 2–3 (Oct 6–7), *before* PR #6 changed their content, so Google may have fetched the old template version. *(Done 2026-10-14.)*
  - [x] https://www.webwalastudio.com/locations/delhi
  - [x] https://www.webwalastudio.com/locations/noida
  - [x] https://www.webwalastudio.com/locations/faridabad
  - [x] https://www.webwalastudio.com/locations/ghaziabad

## Batch 2 — 2026-10-06 (Tuesday) ✅ done

- [x] https://www.webwalastudio.com/locations/delhi
- [x] https://www.webwalastudio.com/locations/noida
- [x] https://www.webwalastudio.com/services/restaurants-cafes
- [x] https://www.webwalastudio.com/services/ecommerce-stores
- [x] https://www.webwalastudio.com/services/corporate-business
- [x] https://www.webwalastudio.com/services/ca-accounting-firms
- [x] https://www.webwalastudio.com/services/law-firms
- [x] https://www.webwalastudio.com/services/real-estate-builders
- [x] https://www.webwalastudio.com/faq
- [x] https://www.webwalastudio.com/blog

## Batch 3 — 2026-10-07 (Wednesday) ✅ done

- [x] https://www.webwalastudio.com/locations/faridabad
- [x] https://www.webwalastudio.com/locations/ghaziabad
- [x] https://www.webwalastudio.com/services
- [x] https://www.webwalastudio.com/locations
- [x] https://www.webwalastudio.com/blog/salon-spa-website-online-booking
- [x] https://www.webwalastudio.com/blog/how-to-pick-right-web-designer *(merged into the agency-questions guide on 2026-10-14; now redirects)*
- [x] https://www.webwalastudio.com/blog/where-to-hire-web-designer
- [x] https://www.webwalastudio.com/blog/signs-clinic-needs-new-website
- [x] https://www.webwalastudio.com/blog/school-website-gurugram-checklist
- [x] https://www.webwalastudio.com/blog/choosing-web-design-agency-questions

## Check progress — 2026-10-12 ✅ (checked 2026-10-14)

- [x] Indexing → Pages: is the **Indexed** count rising from 5 (Oct 8)? **Yes — 11 indexed, 22 not indexed.**
- [x] Is the "Discovered – currently not indexed" validation status moving? **Still Started; 27 → 21 pages.**
- [x] Has `/locations/gurugram` left "Crawled – currently not indexed"? **Yes.**
- [x] Are any other pages under "Crawled – currently not indexed"? **Yes, one: `/blog/how-to-pick-right-web-designer` (crawled Oct 10)** — see below.

## Progress — 2026-10-14

- **Indexed: 5 → 11.** Not indexed: 22 (21 "Discovered – currently not indexed", validation Started; 1 "Crawled – currently not indexed").
- **Crawled – currently not indexed: `/blog/how-to-pick-right-web-designer`.** Cause: it duplicated the already-indexed `/blog/choosing-web-design-agency-questions` almost point for point. Fixed in PR #8 — merged into one guide ("How to Choose a Web Design Agency", ~1,380 words) at the indexed URL; the old URL 308-redirects to it. Expect the old URL to move to **"Page with redirect"** — that's correct; do **not** click Validate fix on that row.
- [x] Requested indexing (2026-10-14):
  - [x] https://www.webwalastudio.com/blog/choosing-web-design-agency-questions (merged guide)
  - [x] 4 location pages (see the Oct 8 to-do above)
  - [x] https://www.webwalastudio.com/blog/how-long-website-launch-timeline
  - [x] https://www.webwalastudio.com/blog/website-maintenance-what-needs-updating
  - [x] https://www.webwalastudio.com/blog/ecommerce-checklist-small-retailers-ncr
  - [x] https://www.webwalastudio.com/blog/restaurants-online-ordering-website
  - [x] https://www.webwalastudio.com/blog/website-cost-india-vs-usa-canada-uae

Every page in the sitemap has now been requested at least once (`/blog/gst-billing-small-business-websites` was already indexed). Only re-request a page from here on if its content changes substantially.

## Check progress — 2026-10-21 ✅ (checked 2026-10-20)

- [x] Indexing → Pages: is the **Indexed** count rising from 11? **Only to 12** — slower than hoped (see below).
- [ ] Has the "Discovered – currently not indexed" validation moved from Started to **Passed**? **Still Started; 21 pages.**
- [ ] Has `/blog/how-to-pick-right-web-designer` moved to **"Page with redirect"**? Not shown yet — check next time.
- [x] Any new pages under "Crawled – currently not indexed"? **No — 0.** Both content fixes (PR #6, PR #8) worked.

## Progress — 2026-10-20

- **Indexed: 11 → 12.** Not indexed: 21, all "Discovered – currently not indexed" (validation Started). "Crawled – currently not indexed": **0**.
- The remaining 21 are waiting in Google's crawl queue — not a content or technical problem. Re-requesting them won't help. The fix is links from other sites, which make Google crawl the site more often.
- External links so far:
  - [x] Vrise Global footer credit live — "Website by Webwala Studio" → https://www.webwalastudio.com/ (dofollow; rendered by JavaScript, so Google may take longer to see it)
  - [x] ~~FeX Alloys, Master Salon footer credits~~ — clients declined. For future projects, put the credit line in the quote upfront.
  - [x] Instagram bio links to webwalastudio.com (nofollow, but sends visitors)
  - [x] Google Business Profile reviewed: verified, 5.0 from 3 reviews (one per client, all replied), areas served "Gurugram and nearby areas", phone matches the site
- Business Profile to-dos:
  - [ ] Edit services: add the 8 industries that have service pages
  - [ ] Service area: list Gurugram, Delhi, Noida, Faridabad, Ghaziabad (the map currently highlights east Delhi/Ghaziabad)
  - [ ] Add 3–5 photos of client sites
  - [ ] Post weekly (project screenshot or blog link)
  - [ ] Optional: website link with `?utm_source=google&utm_medium=organic&utm_campaign=gbp` to track profile visits in GA4
  - [ ] Send the **Ask for review** link to each new client on launch day
- Directory and profile links (one or two a week):
  - [ ] Clutch
  - [ ] GoodFirms
  - [ ] Justdial
  - [ ] Sulekha
  - [ ] DesignRush or Behance (3 projects as case studies)

## Check progress — around 2026-10-27

- [ ] Indexing → Pages: is the **Indexed** count rising from 12?
- [ ] Has the "Discovered – currently not indexed" validation moved from Started to **Passed**?
- [ ] Has `/blog/how-to-pick-right-web-designer` moved to **"Page with redirect"**?
- [ ] Any new pages under "Crawled – currently not indexed"? Click the row and check whether the page duplicates another one.
