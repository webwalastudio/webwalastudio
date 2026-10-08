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
- [ ] Re-request the other 4 location pages. They were requested in batches 2–3 (Oct 6–7), *before* PR #6 changed their content, so Google may have fetched the old template version:
  - [ ] https://www.webwalastudio.com/locations/delhi
  - [ ] https://www.webwalastudio.com/locations/noida
  - [ ] https://www.webwalastudio.com/locations/faridabad
  - [ ] https://www.webwalastudio.com/locations/ghaziabad

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
- [x] https://www.webwalastudio.com/blog/how-to-pick-right-web-designer
- [x] https://www.webwalastudio.com/blog/where-to-hire-web-designer
- [x] https://www.webwalastudio.com/blog/signs-clinic-needs-new-website
- [x] https://www.webwalastudio.com/blog/school-website-gurugram-checklist
- [x] https://www.webwalastudio.com/blog/choosing-web-design-agency-questions

The remaining 6 older blog posts don't need manual requests — Google will reach them through internal links and the sitemap.

## Check progress — around 2026-10-12

- [ ] Indexing → Pages: is the **Indexed** count rising from 5 (Oct 8)? Expect double digits by now; under 10 means it's time to prioritize external links.
- [ ] Is the "Discovered – currently not indexed" validation status moving (Started → Passed)?
- [ ] Has `/locations/gurugram` left "Crawled – currently not indexed"? Check it with URL Inspection.
- [ ] Are any other location pages showing up under "Crawled – currently not indexed"? They got the same content fix in PR #6.
- [ ] Still stuck after 2–3 weeks? Next step is external links: Google Business Profile and local directories (see `docs/seo-phase-4-6-plan.md`).
