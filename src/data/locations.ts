import type { FaqEntry } from "../lib/schema";

export const LOCATIONS_INDEX_TITLE = "Website Design Across Delhi NCR | Webwala Studio";
export const LOCATIONS_INDEX_DESCRIPTION = "Website design agency serving Gurugram, Delhi, Noida, Faridabad & Ghaziabad. Professional websites live in 7 days, from ₹12,000 / $149.";

export interface LocationIndustry {
  /** Slug of the matching /services/:slug page. */
  serviceSlug: string;
  /** Why this industry matters in this city specifically. */
  reason: string;
}

export interface LocationPageData {
  slug: string;
  cityName: string;
  region: string;
  seoDescription: string;
  heroHeading: string;
  intro: string[];
  /** Main commercial areas served — shown as a list under `areasIntro`. */
  areasIntro: string;
  areas: string[];
  /** City-specific industry mix; each links to its service page. */
  industries: LocationIndustry[];
  /** How the project runs from this city (in person vs. online). */
  howWeWork: string[];
  /** A real project for a client in this city, if there is one. */
  localWork?: { name: string; url: string; description: string };
  /** Slugs of blog posts most relevant to this city's businesses. */
  relatedPostSlugs: string[];
  faqs: FaqEntry[];
  relatedSlugs: string[];
}

// Each city page must stand on its own: Google declined to index the original
// near-identical template pages ("Crawled – currently not indexed"), so keep the
// copy below genuinely city-specific rather than swapping the city name.
export const locations: LocationPageData[] = [
  {
    slug: "gurugram",
    cityName: "Gurugram",
    region: "Haryana",
    seoDescription: "Website design agency based in Gurugram. In-person meetings, websites live in 7 days for schools, clinics, offices & retailers — from ₹12,000 / $149.",
    heroHeading: "Website Design in Gurugram",
    intro: [
      "Gurugram is our home base, and it's the one city where we meet clients in person — at your office, your clinic, or your school — for the kickoff, the design review, and the final walkthrough. Everything else happens on WhatsApp and video calls in between, so the 7-day timeline holds either way.",
      "Being local also means we know what a Gurugram audience expects from a business website. Your visitors are comparing you against corporate brands headquartered in Cyber City and Golf Course Road, often on a phone between meetings — so a site that's slow, dated, or hard to use on mobile loses them before they've read a word.",
    ],
    areasIntro: "We work with businesses across old and new Gurugram, including:",
    areas: [
      "DLF Phases 1–5 and Cyber City",
      "Golf Course Road and Golf Course Extension Road",
      "Sohna Road",
      "MG Road and Sector 29",
      "Udyog Vihar",
      "Old Gurugram (Sectors 4–17)",
      "Dwarka Expressway and New Gurugram",
      "Manesar",
    ],
    industries: [
      { serviceSlug: "schools-institutes", reason: "Gurugram has one of the densest concentrations of private and international schools in NCR, and parents compare them online first. Admissions pages, fee information, and a notice board staff can update matter more here than anywhere." },
      { serviceSlug: "corporate-business", reason: "From Udyog Vihar consultancies to startups in Cyber City, B2B buyers check your website before they take a call. It needs to look as credible as the multinationals down the road." },
      { serviceSlug: "medical-clinics", reason: "Specialist clinics and diagnostic centres along Golf Course Road and Sohna Road compete on trust — doctor profiles, reviews, and appointment requests do the convincing." },
      { serviceSlug: "real-estate-builders", reason: "With new launches along Dwarka Expressway and Golf Course Extension Road, builders and brokers need listing pages and site-visit booking that hold up next to the big property portals." },
      { serviceSlug: "restaurants-cafes", reason: "Sector 29, Cyber Hub, and Golf Course Road diners decide where to eat from a menu and photos on their phone — a fast digital menu and reservation form beat a PDF." },
    ],
    howWeWork: [
      "For Gurugram clients, we start with an in-person discovery meeting to understand the business, look at your existing material, and agree on scope. Days 3–6 are the build, with progress shared on WhatsApp. On launch day we can sit down together to walk you through the finished site and hand over every login.",
      "If you'd rather keep it online, that works too — a quick video call can replace any of the meetings.",
    ],
    localWork: {
      name: "Vrise Global",
      url: "https://www.vriseglobal.co.in/",
      description: "A Gurugram-based EdTech company running a 360° VR immersive learning program for schools. We designed and built their website — and their owner, Krishna Dubey, says it was delivered exactly as they envisioned.",
    },
    relatedPostSlugs: ["school-website-gurugram-checklist", "website-cost-india-2026", "how-long-website-launch-timeline"],
    faqs: [
      { q: "Can we meet in person in Gurugram?", a: "Yes. Gurugram is the only city where we meet clients in person — usually for the kickoff and the final walkthrough, at your office or a convenient spot in Gurugram. Day-to-day updates happen on WhatsApp so the 7-day timeline isn't held up by scheduling." },
      { q: "Have you built websites for Gurugram businesses?", a: "Yes — for example, Vrise Global, a Gurugram EdTech company offering a 360° VR learning program for schools. You can see their live site at vriseglobal.co.in and more of our work in the portfolio on our homepage." },
      { q: "How much does a website cost for a Gurugram business?", a: "Our pricing is the same across NCR: ₹12,000 for Starter (up to 5 pages), ₹28,000 for Professional (up to 15 pages), and ₹55,000 for Business Pro (unlimited pages and e-commerce). Domain and hosting are separate, roughly ₹800–1,500 and ₹3,000–6,000 a year." },
    ],
    relatedSlugs: ["delhi", "faridabad"],
  },
  {
    slug: "delhi",
    cityName: "Delhi",
    region: "Delhi",
    seoDescription: "Website design for Delhi businesses — law firms, CAs, clinics, coaching institutes & retailers. Run fully online, live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Website Design in Delhi",
    intro: [
      "Delhi's market is dense and competitive across nearly every industry we work with. A patient choosing a clinic in South Delhi or a client choosing a lawyer near the Saket courts will usually compare three or four websites before calling anyone — and the one that looks outdated or loads slowly is the first to be ruled out.",
      "We build for Delhi businesses fully online. That isn't a compromise: it means no travel time eating into your 7-day timeline, and every decision is written down in one WhatsApp thread instead of scattered across meetings.",
    ],
    areasIntro: "We build websites for businesses across Delhi, including:",
    areas: [
      "Connaught Place",
      "Karol Bagh and Rajendra Place",
      "Lajpat Nagar and Defence Colony",
      "Nehru Place and Okhla",
      "Saket and Hauz Khas",
      "Rajouri Garden and Janakpuri",
      "Dwarka",
      "Pitampura and Netaji Subhash Place",
      "Laxmi Nagar and Preet Vihar",
    ],
    industries: [
      { serviceSlug: "law-firms", reason: "With the High Court, Saket, Tis Hazari, and Karkardooma courts all in the city, Delhi has a deep pool of advocates and firms. A clear, informational site with practice areas and lawyer profiles is how prospective clients judge credibility." },
      { serviceSlug: "ca-accounting-firms", reason: "Delhi's CA firms serve traders, startups, and professionals across the city. A service breakdown, GST and compliance resources, and a secure way to collect documents cut down on tax-season phone calls." },
      { serviceSlug: "schools-institutes", reason: "From coaching hubs in Laxmi Nagar and Rajendra Nagar to established schools, students and parents shortlist institutes online. Course pages, results, and an enquiry form that reaches someone are what fill batches." },
      { serviceSlug: "medical-clinics", reason: "South and West Delhi have a large number of specialist clinics competing for the same patients. Doctor profiles and an easy appointment request make the difference." },
      { serviceSlug: "ecommerce-stores", reason: "Retailers and wholesalers in markets like Karol Bagh and Lajpat Nagar are moving beyond WhatsApp catalogues to their own online stores with real checkout." },
    ],
    howWeWork: [
      "Delhi projects run online from start to finish: a 15-minute video call to scope the site, a shared WhatsApp thread for content and feedback, and a full walkthrough of your finished site at handover.",
      "If an in-person meeting really matters to you, we're happy to meet in Gurugram.",
    ],
    relatedPostSlugs: ["choosing-web-design-agency-questions", "gst-billing-small-business-websites", "signs-clinic-needs-new-website"],
    faqs: [
      { q: "Do you meet clients in person in Delhi?", a: "Delhi projects run fully online — video calls for kickoff and review, WhatsApp for everything in between. It keeps the 7-day timeline realistic. If you'd prefer to meet face to face, we can meet in Gurugram." },
      { q: "Can a law firm or advocate in Delhi have a website?", a: "Yes, but under Bar Council of India rules it should inform rather than advertise — practice areas, qualifications, and contact details, without solicitation or claims about results. We build law firm sites with that in mind." },
      { q: "Do you build websites for coaching institutes in Delhi?", a: "Yes. Coaching and training institutes fall under our schools and institutes websites — course and batch pages, faculty profiles, results, and an enquiry form, live within 7 days." },
    ],
    relatedSlugs: ["gurugram", "noida"],
  },
  {
    slug: "noida",
    cityName: "Noida",
    region: "Uttar Pradesh",
    seoDescription: "Website design for Noida & Greater Noida — IT firms, builders, D2C brands & schools. Run fully online, live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Website Design in Noida",
    intro: [
      "Noida's business mix is unusual for NCR: IT and services companies in Sectors 62 and 63, a steady stream of residential projects along the Expressway and in Greater Noida West, and a growing number of manufacturers and D2C brands selling online. The websites we build here usually have a specific job — capture leads, list properties, or sell products — rather than just sit there looking nice.",
      "Noida projects run fully online, with the same 7-day timeline and post-launch maintenance as everywhere else we work.",
    ],
    areasIntro: "We work with businesses across Noida and Greater Noida, including:",
    areas: [
      "Sector 18",
      "Sectors 62 and 63",
      "Film City (Sector 16A)",
      "Noida–Greater Noida Expressway (Sectors 125–137)",
      "Greater Noida West",
      "Greater Noida",
      "Phase 2 industrial area",
    ],
    industries: [
      { serviceSlug: "corporate-business", reason: "IT services and consulting firms in Sectors 62, 63, and along the Expressway sell to clients who never visit the office — the website is the first proof that you're established." },
      { serviceSlug: "real-estate-builders", reason: "Builders and channel partners marketing projects in Greater Noida West and along the Expressway need listing pages, EMI calculators, and site-visit booking — with the UP RERA registration number shown clearly." },
      { serviceSlug: "ecommerce-stores", reason: "Manufacturers and D2C brands based around Phase 2 and Sector 63 can sell directly through their own store instead of giving up margin to marketplaces." },
      { serviceSlug: "schools-institutes", reason: "Families moving into new societies across Noida and Greater Noida West look for schools online first — admissions pages and fee details need to be easy to find." },
      { serviceSlug: "medical-clinics", reason: "New residential sectors bring new clinics competing for the same households. Doctor profiles and online appointment requests help a new practice get found." },
    ],
    howWeWork: [
      "Noida projects run online: a video call to agree on scope, then the build over the following days with progress shared on WhatsApp, and a full walkthrough at handover.",
      "For real estate and e-commerce sites, we'll ask for project or product details upfront — RERA numbers, floor plans, product photos — since those take the longest to gather.",
    ],
    relatedPostSlugs: ["ecommerce-checklist-small-retailers-ncr", "website-cost-india-2026", "where-to-hire-web-designer"],
    faqs: [
      { q: "Do you meet clients in person in Noida?", a: "Noida projects run fully online — video calls and WhatsApp — which keeps the 7-day timeline realistic. If you'd prefer to meet face to face, we can meet in Gurugram." },
      { q: "Does a real estate website in Noida need to show RERA details?", a: "Projects registered with UP RERA should display their RERA registration number in their marketing, including on the website. We include it on every project page we build." },
      { q: "Can my Noida manufacturing or D2C business sell directly online?", a: "Yes. Our Business Pro plan (₹55,000) includes a full online store — product catalogue, cart, payment gateway, and inventory tracking — so you can sell without relying only on marketplaces." },
    ],
    relatedSlugs: ["ghaziabad", "delhi"],
  },
  {
    slug: "faridabad",
    cityName: "Faridabad",
    region: "Haryana",
    seoDescription: "Website design for Faridabad manufacturers, schools, clinics & builders. Product catalogues & enquiry forms, live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Website Design in Faridabad",
    intro: [
      "Faridabad is one of NCR's oldest industrial cities, and a lot of the businesses here — component manufacturers, suppliers, family-run firms — have been running for decades on relationships and referrals, with nothing online beyond a directory listing. That works until a new buyer or an export enquiry goes looking for you and finds nothing credible.",
      "We build Faridabad websites fully online, usually starting from very little: a visiting card, a few product photos, and a conversation about what you make and who you sell to.",
    ],
    areasIntro: "We work with businesses across Faridabad, including:",
    areas: [
      "NIT Faridabad",
      "Sectors 15, 16, and 21",
      "Old Faridabad",
      "Ballabhgarh",
      "Mathura Road industrial belt",
      "IMT Faridabad",
      "Greater Faridabad (Neharpar)",
    ],
    industries: [
      { serviceSlug: "corporate-business", reason: "For manufacturers and B2B suppliers, a clear product catalogue, certifications, and a quote request form give buyers — including overseas ones — a reason to get in touch." },
      { serviceSlug: "schools-institutes", reason: "Faridabad's schools increasingly compete with Delhi and Gurugram options. An admissions page with fees and transport details keeps local families from looking elsewhere." },
      { serviceSlug: "medical-clinics", reason: "Clinics and nursing homes across NIT and the sectors are often found through Google Maps first — a proper website with doctor profiles turns that search into an appointment." },
      { serviceSlug: "real-estate-builders", reason: "Projects in Greater Faridabad need listing pages and site-visit booking that make it easy for buyers comparing them with Gurugram and Noida." },
      { serviceSlug: "ca-accounting-firms", reason: "CA firms serving Faridabad's industrial units can use their site to explain services and collect documents securely during filing season." },
    ],
    howWeWork: [
      "Faridabad projects run online. If you're starting from scratch, that's normal — we'll tell you exactly what we need and help you pull your content together, so you don't need a finished brochure before we begin.",
      "Expect a video call to agree on scope, the build shared on WhatsApp as it progresses, and a full walkthrough when the site goes live.",
    ],
    relatedPostSlugs: ["how-to-pick-right-web-designer", "gst-billing-small-business-websites", "signs-clinic-needs-new-website"],
    faqs: [
      { q: "Do you meet clients in person in Faridabad?", a: "Faridabad projects run fully online — video calls and WhatsApp — which keeps the 7-day timeline realistic. If you'd prefer to meet face to face, we can meet in Gurugram." },
      { q: "We're a manufacturer with no website at all. Where do we start?", a: "Most manufacturers start with our Starter (₹12,000, up to 5 pages) or Professional (₹28,000, up to 15 pages) plan: an about page, a product catalogue, certifications, and an enquiry form. A visiting card and some product photos are enough for us to begin." },
      { q: "Can you help write the content for our website?", a: "Yes. Many Faridabad businesses don't have ready-made text, so we help you pull it together from a short conversation and whatever you already have — catalogues, brochures, or price lists. It can add a little time to the 7-day timeline, depending on how much needs to be created from scratch." },
    ],
    relatedSlugs: ["gurugram", "ghaziabad"],
  },
  {
    slug: "ghaziabad",
    cityName: "Ghaziabad",
    region: "Uttar Pradesh",
    seoDescription: "Website design for Ghaziabad retailers, schools, clinics, salons & restaurants in Indirapuram, Raj Nagar & beyond. Live in 7 days, from ₹12,000 / $149.",
    heroHeading: "Website Design in Ghaziabad",
    intro: [
      "Ghaziabad has grown into a city of large residential neighbourhoods — Indirapuram, Vaishali, Raj Nagar Extension, Crossings Republik — and the businesses that serve them: schools, clinics, salons, restaurants, and local retailers. Their customers live close by and search on their phones, which makes a fast, local-first website one of the cheapest ways to win them.",
      "Ghaziabad projects run fully online, with the same 7-day timeline, pricing, and post-launch maintenance as every other city we serve in NCR.",
    ],
    areasIntro: "We work with businesses across Ghaziabad, including:",
    areas: [
      "Indirapuram",
      "Vaishali and Kaushambi",
      "Vasundhara",
      "Raj Nagar and Raj Nagar Extension",
      "Kavi Nagar",
      "Crossings Republik",
      "Sahibabad",
      "Mohan Nagar",
    ],
    industries: [
      { serviceSlug: "schools-institutes", reason: "Families in Indirapuram, Vasundhara, and Raj Nagar Extension compare schools online before visiting. Clear admissions information and fees save the front office a lot of calls." },
      { serviceSlug: "medical-clinics", reason: "Neighbourhood clinics and diagnostic centres compete for the same nearby households — appointment requests and doctor profiles help you get chosen." },
      { serviceSlug: "salons-spas", reason: "Salons serving residential societies live on repeat customers. A service menu with prices and an easy way to book turns Instagram followers into appointments." },
      { serviceSlug: "restaurants-cafes", reason: "Restaurants in Indirapuram and Vaishali can take reservations and showcase their menu directly, instead of depending entirely on delivery apps." },
      { serviceSlug: "ecommerce-stores", reason: "Local retailers and Sahibabad manufacturers can add online ordering and delivery across NCR with a proper store." },
    ],
    howWeWork: [
      "Ghaziabad projects run online: a video call to agree on what the site needs, progress shared on WhatsApp as we build, and a full walkthrough at handover so you know how everything works.",
    ],
    relatedPostSlugs: ["salon-spa-website-online-booking", "restaurants-online-ordering-website", "ecommerce-checklist-small-retailers-ncr"],
    faqs: [
      { q: "Do you meet clients in person in Ghaziabad?", a: "Ghaziabad projects run fully online — video calls and WhatsApp — which keeps the 7-day timeline realistic. If you'd prefer to meet face to face, we can meet in Gurugram." },
      { q: "Is a website worth it for a small neighbourhood business in Ghaziabad?", a: "Usually, yes. Nearby customers search on their phones before choosing a salon, clinic, or restaurant, and a fast site with your services, prices, and location wins those searches. Our Starter plan starts at ₹12,000 with 1 month of free maintenance." },
      { q: "Can I update offers or menus myself after launch?", a: "Small changes like updated offers or menus are covered free during your maintenance period (1–3 months depending on plan), and we offer affordable annual maintenance after that." },
    ],
    relatedSlugs: ["noida", "delhi"],
  },
];

export function getLocationBySlug(slug: string): LocationPageData | undefined {
  return locations.find((location) => location.slug === slug);
}
