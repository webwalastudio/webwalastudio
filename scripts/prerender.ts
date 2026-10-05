/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Generates dist/<route>/index.html for every route, patching the built
// dist/index.html's <head> (title, description, canonical, OG/Twitter), injecting
// page-specific JSON-LD, and filling #root with the page's server-rendered markup
// (via the SSR bundle in dist-ssr/, built from src/entry-server.tsx), so crawlers
// see the real page content and metadata without executing JS. main.tsx then
// hydrates that markup. The untouched shell is kept as dist/app-shell.html for
// unknown URLs (see vercel.json / server.ts). The client-side useSeoMeta/useJsonLd hooks
// (src/hooks/useSeoMeta.ts) keep the same tags in sync during SPA navigation.
// Also generates dist/sitemap.xml from the same expanded page list, so it can't
// go stale independently of the actual content (see public/robots.txt for the
// canonical Sitemap: reference — no more hand-edited public/sitemap.xml).
//
// Extend PAGE_META below when a new route group (e.g. blog) gets real content —
// this file is the one place that maps a route to its prerendered <head> content.
// routes.ts is NOT used here for page-content purposes (it only holds nav
// metadata + parameterized path patterns like "/services/:slug", which aren't
// real, concrete URLs) — the services/locations data modules are the source of
// truth for the concrete page list, same as the client routes read them.

import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { pathToFileURL } from "url";
import { faqs, FAQ_TITLE, FAQ_DESCRIPTION } from "../src/data/faqs";
import { services, SERVICES_INDEX_TITLE, SERVICES_INDEX_DESCRIPTION } from "../src/data/services";
import { locations, LOCATIONS_INDEX_TITLE, LOCATIONS_INDEX_DESCRIPTION } from "../src/data/locations";
import { blogPosts } from "../src/data/blog-posts.generated";
import { BLOG_INDEX_TITLE, BLOG_INDEX_DESCRIPTION } from "../src/data/blogMeta";
import { buildFaqPageSchema, buildServiceSchema, buildLocationSchema, buildBlogPostingSchema, buildBreadcrumbSchema } from "../src/lib/schema";

const SITE_URL = "https://www.webwalastudio.com";

interface PageMeta {
  path: string;
  title: string;
  description: string;
  jsonLd: object | object[];
  /** Sitemap priority — defaults to 0.7 if omitted. */
  priority?: string;
  /** Sitemap lastmod, when known up front (blog posts: frontmatter updated ?? date). */
  lastmod?: string;
  /** Files whose last git commit date becomes lastmod when `lastmod` isn't set. */
  sources?: string[];
}

const PAGE_META: PageMeta[] = [
  {
    path: "/faq",
    title: FAQ_TITLE,
    description: FAQ_DESCRIPTION,
    jsonLd: buildFaqPageSchema(faqs),
    sources: ["src/pages/FAQPage.tsx", "src/data/faqs.ts"],
  },
  {
    path: "/services",
    title: SERVICES_INDEX_TITLE,
    description: SERVICES_INDEX_DESCRIPTION,
    jsonLd: buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
    priority: "0.8",
    sources: ["src/pages/ServicesIndexPage.tsx", "src/data/services.ts"],
  },
  ...services.map((service): PageMeta => ({
    path: `/services/${service.slug}`,
    title: `${service.heroHeading} | Webwala Studio`,
    description: service.seoDescription,
    jsonLd: [
      buildServiceSchema({ name: service.title, description: service.seoDescription, path: `/services/${service.slug}` }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.title, path: `/services/${service.slug}` },
      ]),
    ],
    priority: "0.8",
    sources: ["src/pages/ServicePage.tsx", "src/data/services.ts"],
  })),
  {
    path: "/locations",
    title: LOCATIONS_INDEX_TITLE,
    description: LOCATIONS_INDEX_DESCRIPTION,
    jsonLd: buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }]),
    priority: "0.8",
    sources: ["src/pages/LocationsIndexPage.tsx", "src/data/locations.ts"],
  },
  ...locations.map((location): PageMeta => ({
    path: `/locations/${location.slug}`,
    title: `${location.heroHeading} | Webwala Studio`,
    description: location.seoDescription,
    jsonLd: [
      buildLocationSchema({ cityName: location.cityName, region: location.region, path: `/locations/${location.slug}`, description: location.seoDescription }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
        { name: location.cityName, path: `/locations/${location.slug}` },
      ]),
    ],
    priority: "0.8",
    sources: ["src/pages/LocationPage.tsx", "src/data/locations.ts"],
  })),
  {
    path: "/blog",
    title: BLOG_INDEX_TITLE,
    description: BLOG_INDEX_DESCRIPTION,
    jsonLd: buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]),
    priority: "0.7",
    sources: ["src/pages/BlogIndexPage.tsx", "content/blog"],
  },
  ...blogPosts.map((post): PageMeta => ({
    path: `/blog/${post.slug}`,
    title: `${post.title} | Webwala Studio`,
    description: post.metaDescription,
    jsonLd: [
      buildBlogPostingSchema({ title: post.title, description: post.metaDescription, path: `/blog/${post.slug}`, datePublished: post.date, dateModified: post.updated }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
    ],
    priority: "0.6",
    lastmod: post.updated ?? post.date,
  })),
];

const distPath = path.join(process.cwd(), "dist");
const sourceHtmlPath = path.join(distPath, "index.html");

if (!fs.existsSync(sourceHtmlPath)) {
  console.error("prerender: dist/index.html not found — run vite build first.");
  process.exit(1);
}

const sourceHtml = fs.readFileSync(sourceHtmlPath, "utf-8");

// Keep the bare shell for unknown URLs before dist/index.html is overwritten
// with the prerendered homepage below.
fs.writeFileSync(path.join(distPath, "app-shell.html"), sourceHtml, "utf-8");

const ssrEntryPath = path.join(process.cwd(), "dist-ssr", "entry-server.js");
if (!fs.existsSync(ssrEntryPath)) {
  console.error("prerender: dist-ssr/entry-server.js not found — run vite build --ssr src/entry-server.tsx --outDir dist-ssr first.");
  process.exit(1);
}
const { render } = (await import(pathToFileURL(ssrEntryPath).href)) as { render: (url: string) => Promise<string> };

const ROOT_DIV = '<div id="root"></div>';
if (!sourceHtml.includes(ROOT_DIV)) {
  console.error(`prerender: ${ROOT_DIV} not found in dist/index.html.`);
  process.exit(1);
}

async function withRenderedRoot(html: string, routePath: string): Promise<string> {
  const appHtml = await render(routePath);
  // Function replacer — rendered copy contains "$" + digits (e.g. "$149").
  return html.replace(ROOT_DIV, () => `<div id="root">${appHtml}</div>`);
}

fs.writeFileSync(sourceHtmlPath, await withRenderedRoot(sourceHtml, "/"), "utf-8");

// Function replacers only, never string patterns — page copy can contain a literal
// "$" + digits (e.g. "$149"), which String.replace would misread as a backreference.
function swap(html: string, re: RegExp, value: string): string {
  return html.replace(re, (_match, p1: string, p2: string) => p1 + value + p2);
}

for (const page of PAGE_META) {
  const url = `${SITE_URL}${page.path}`;
  let html = sourceHtml;

  html = html.replace(/<title>.*?<\/title>/s, `<title>${page.title}</title>`);
  html = swap(html, /(<meta\s+name="description"\s+content=")[^"]*(")/, page.description);
  html = swap(html, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, url);
  html = swap(html, /(<meta\s+property="og:url"\s+content=")[^"]*(")/, url);
  html = swap(html, /(<meta\s+property="og:title"\s+content=")[^"]*(")/, page.title);
  html = swap(html, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, page.description);
  html = swap(html, /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, page.title);
  html = swap(html, /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, page.description);

  const jsonLdEntries = Array.isArray(page.jsonLd) ? page.jsonLd : [page.jsonLd];
  const jsonLdScripts = jsonLdEntries
    .map((entry) => `<script type="application/ld+json">${JSON.stringify(entry)}</script>`)
    .join("\n  ");
  html = html.replace(/<\/head>/, () => `${jsonLdScripts}\n  </head>`);
  html = await withRenderedRoot(html, page.path);

  const outDir = path.join(distPath, page.path);
  const outHtmlPath = path.join(outDir, "index.html");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outHtmlPath, html, "utf-8");
}
console.log(`prerender: wrote ${PAGE_META.length + 1} route(s) under dist/ (with rendered content)`);

// --- Sitemap ---

// lastmod must reflect real content changes — stamping every page with the build
// date teaches Google to ignore it. Pages without a known date use the last git
// commit touching their source files; if git history isn't available (or is a
// shallow clone, where old files all look freshly added) lastmod is omitted.
function gitLastModified(sources: string[]): string | undefined {
  try {
    if (execFileSync("git", ["rev-parse", "--is-shallow-repository"], { encoding: "utf-8" }).trim() !== "false") return undefined;
    const date = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...sources], { encoding: "utf-8" }).trim();
    return date || undefined;
  } catch {
    return undefined;
  }
}

const sitemapEntries = [
  { path: "/", priority: "1.0", lastmod: gitLastModified(["src/App.tsx", "src/components"]) },
  ...PAGE_META.map((page) => ({
    path: page.path,
    priority: page.priority ?? "0.7",
    lastmod: page.lastmod ?? (page.sources ? gitLastModified(page.sources) : undefined),
  })),
];

const sitemapUrls = sitemapEntries
  .map(({ path: p, priority, lastmod }) => (
    `  <url>\n    <loc>${SITE_URL}${p}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ""}    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  ))
  .join("\n");

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`;

const sitemapPath = path.join(distPath, "sitemap.xml");
fs.writeFileSync(sitemapPath, sitemapXml, "utf-8");
console.log(`prerender: wrote ${path.relative(process.cwd(), sitemapPath)} (${sitemapEntries.length} urls)`);
