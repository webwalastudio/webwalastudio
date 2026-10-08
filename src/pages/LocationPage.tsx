import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { CalendarCheck, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { getLocationBySlug, locations } from "../data/locations";
import { services } from "../data/services";
import { blogPosts } from "../data/blog-posts.generated";
import { useSeoMeta, useJsonLd } from "../hooks/useSeoMeta";
import { buildLocationSchema, buildBreadcrumbSchema, buildFaqPageSchema } from "../lib/schema";
import PageShell, { useContactModal } from "../components/PageShell";

const H2_STYLE = { fontSize: "clamp(20px, 2.4vw, 28px)", letterSpacing: "-0.8px", color: "#1E1B4B" };
const BODY_STYLE = { fontSize: 16, color: "#374151", lineHeight: 1.8 };

function NotFoundContent() {
  return (
    <section className="relative overflow-hidden text-center" style={{ padding: "160px 5% 120px" }}>
      <div className="relative z-10 max-w-xl mx-auto">
        <h1 className="font-display font-black mb-5" style={{ fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-0.9px", color: "#1E1B4B" }}>
          Location not found
        </h1>
        <Link
          to="/locations"
          className="btn-shine btn-gradient inline-flex items-center justify-center gap-2 font-sans font-bold"
          style={{ fontSize: 15, padding: "14px 32px", borderRadius: 50, textDecoration: "none" }}
        >
          View all locations
        </Link>
      </div>
    </section>
  );
}

function LocationPageContent({ slug }: { slug: string }) {
  const { openContact } = useContactModal();
  const location = getLocationBySlug(slug)!;
  const related = locations.filter((l) => location.relatedSlugs.includes(l.slug));
  const industries = location.industries.flatMap((industry) => {
    const service = services.find((s) => s.slug === industry.serviceSlug);
    return service ? [{ ...industry, title: service.title }] : [];
  });
  const relatedPosts = location.relatedPostSlugs.flatMap((postSlug) => blogPosts.filter((post) => post.slug === postSlug));

  useSeoMeta({ title: `${location.heroHeading} | Webwala Studio`, description: location.seoDescription, path: `/locations/${location.slug}` });
  useJsonLd([
    buildLocationSchema({ cityName: location.cityName, region: location.region, path: `/locations/${location.slug}`, description: location.seoDescription }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Locations", path: "/locations" },
      { name: location.cityName, path: `/locations/${location.slug}` },
    ]),
    buildFaqPageSchema(location.faqs),
  ]);

  return (
    <>
      <section
        className="relative overflow-hidden text-center"
        style={{
          padding: "140px 5% 80px",
          background: "linear-gradient(160deg, #EFF6FF 0%, #F5F3FF 50%, #EDE9FE 100%)",
        }}
      >
        <div className="dot-grid-light absolute inset-0 pointer-events-none" />
        <div className="glass-sphere-blue orb-float absolute pointer-events-none" style={{ top: "-15%", right: "-5%", width: 400, height: 400 }} />
        <div className="glass-sphere orb-float-2 absolute pointer-events-none" style={{ bottom: "-15%", left: "-5%", width: 350, height: 350 }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div
              className="inline-flex items-center justify-center mb-5"
              style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(124,58,237,0.1)" }}
            >
              <MapPin style={{ width: 28, height: 28, color: "#7C3AED" }} />
            </div>
            <span className="section-label">{location.region.toUpperCase()}</span>
            <h1
              className="font-display font-black mb-5"
              style={{ fontSize: "clamp(30px, 3.8vw, 48px)", letterSpacing: "-1.8px", color: "#1E1B4B" }}
            >
              {location.heroHeading}
            </h1>
            <button
              onClick={() => openContact(`${location.cityName} Website Consult`)}
              className="btn-shine btn-gradient inline-flex items-center justify-center gap-2 font-sans font-bold"
              style={{ fontSize: 15, padding: "14px 32px", borderRadius: 50 }}
            >
              <CalendarCheck className="h-5 w-5" />
              Book a Free Consultation
            </button>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "70px 5% 80px", background: "#F8FAFF" }}>
        <div className="max-w-[860px] mx-auto">
          {location.intro.map((paragraph, idx) => (
            <p key={idx} className="font-sans mb-6" style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
              {paragraph}
            </p>
          ))}

          <h2 className="font-display font-black mt-10 mb-4" style={H2_STYLE}>
            Areas we serve in {location.cityName}
          </h2>
          <p className="font-sans mb-4" style={BODY_STYLE}>{location.areasIntro}</p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-2 font-sans" style={{ fontSize: 15, color: "#374151", lineHeight: 1.6 }}>
            {location.areas.map((area) => (
              <li key={area} className="flex items-start gap-2">
                <MapPin style={{ width: 16, height: 16, color: "#7C3AED", flexShrink: 0, marginTop: 3 }} />
                <span>{area}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-display font-black mt-12 mb-6" style={H2_STYLE}>
            Websites we build for {location.cityName} businesses
          </h2>
          <div className="flex flex-col gap-4">
            {industries.map((industry) => (
              <Link
                key={industry.serviceSlug}
                to={`/services/${industry.serviceSlug}`}
                className="liquid-glass block"
                style={{ borderRadius: 14, padding: "18px 20px", textDecoration: "none" }}
              >
                <span className="flex items-center justify-between gap-3 mb-1">
                  <span className="font-sans font-bold" style={{ fontSize: 15, color: "#1E1B4B" }}>{industry.title}</span>
                  <ArrowRight style={{ width: 16, height: 16, color: "#7C3AED", flexShrink: 0 }} />
                </span>
                <span className="font-sans block" style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.65 }}>{industry.reason}</span>
              </Link>
            ))}
          </div>

          {location.localWork && (
            <>
              <h2 className="font-display font-black mt-12 mb-4" style={H2_STYLE}>
                Recent work in {location.cityName}
              </h2>
              <div className="liquid-glass" style={{ borderRadius: 14, padding: "20px 22px" }}>
                <a
                  href={location.localWork.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans font-bold mb-2"
                  style={{ fontSize: 16, color: "#1E1B4B", textDecoration: "none" }}
                >
                  {location.localWork.name}
                  <ExternalLink style={{ width: 15, height: 15, color: "#7C3AED" }} />
                </a>
                <p className="font-sans" style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.7 }}>{location.localWork.description}</p>
              </div>
            </>
          )}

          <h2 className="font-display font-black mt-12 mb-4" style={H2_STYLE}>
            How we work with {location.cityName} clients
          </h2>
          {location.howWeWork.map((paragraph, idx) => (
            <p key={idx} className="font-sans mb-4" style={BODY_STYLE}>{paragraph}</p>
          ))}

          {relatedPosts.length > 0 && (
            <>
              <h2 className="font-display font-black mt-12 mb-6" style={H2_STYLE}>
                Guides for {location.cityName} businesses
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="liquid-glass flex items-center justify-between gap-3"
                    style={{ borderRadius: 14, padding: "16px 18px", textDecoration: "none" }}
                  >
                    <span className="font-sans font-semibold" style={{ fontSize: 14, color: "#1E1B4B" }}>{post.title}</span>
                    <ArrowRight style={{ width: 16, height: 16, color: "#7C3AED", flexShrink: 0 }} />
                  </Link>
                ))}
              </div>
            </>
          )}

          <h2 className="font-display font-black mt-12 mb-6" style={H2_STYLE}>
            {location.cityName} website FAQs
          </h2>
          <div className="flex flex-col gap-4">
            {location.faqs.map((faq) => (
              <div key={faq.q} className="liquid-glass" style={{ borderRadius: 14, padding: "18px 20px" }}>
                <h3 className="font-sans font-bold mb-2" style={{ fontSize: 15, color: "#1E1B4B" }}>{faq.q}</h3>
                <p className="font-sans" style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ padding: "60px 5% 80px", background: "white" }}>
          <div className="max-w-[860px] mx-auto">
            <h2 className="font-display font-black mb-6" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", letterSpacing: "-0.8px", color: "#1E1B4B" }}>
              Nearby locations
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((l) => (
                <Link
                  key={l.slug}
                  to={`/locations/${l.slug}`}
                  className="liquid-glass flex items-center justify-between gap-3"
                  style={{ borderRadius: 14, padding: "18px 20px", textDecoration: "none" }}
                >
                  <span className="font-sans font-bold" style={{ fontSize: 14, color: "#1E1B4B" }}>{l.cityName}</span>
                  <ArrowRight style={{ width: 16, height: 16, color: "#7C3AED", flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="relative overflow-hidden text-center"
        style={{
          padding: "80px 5% 100px",
          background: "linear-gradient(160deg, #EFF6FF 0%, #F5F3FF 50%, #EDE9FE 100%)",
          borderTop: "1.5px solid #E0E7FF",
        }}
      >
        <div className="dot-grid-light absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label">READY TO START</span>
            <h2 className="font-display font-black mb-4" style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-1px", color: "#1E1B4B" }}>
              Ready for your {location.cityName} website?
            </h2>
            <p className="font-sans mb-8" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
              Book a free 15-minute call — we'll walk you through pricing, timeline, and what we'd need from you.
            </p>
            <button
              onClick={() => openContact(`${location.cityName} Website Consult`)}
              className="btn-shine btn-gradient inline-flex items-center justify-center gap-2 font-sans font-bold"
              style={{ fontSize: 15, padding: "14px 32px", borderRadius: 50 }}
            >
              <CalendarCheck className="h-5 w-5" />
              Book a Free Consultation
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = slug ? getLocationBySlug(slug) : undefined;

  return (
    <PageShell whatsAppSource="location_page">
      {location ? <LocationPageContent slug={location.slug} /> : <NotFoundContent />}
    </PageShell>
  );
}
