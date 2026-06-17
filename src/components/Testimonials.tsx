import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

const reviews = [
  {
    stars: 5,
    quote:
      "Webwala Studio designed and launched our website, vriseglobal.co.in, exactly as we envisioned. The team was professional, responsive, and delivered a modern, user-friendly website. Highly recommended for businesses looking for quality web design services.",
    name: "Krishna Dubey",
    role: "Owner",
    company: "Vrise Global",
    initials: "KD",
    website: "https://vriseglobal.co.in",
    domain: "vriseglobal.co.in",
    accentFrom: "#0EA5E9",
    accentTo: "#7C3AED",
  },
  {
    stars: 5,
    quote:
      "Webwala Studio did an exceptional job designing the website for FeX Foundry Alloys. They perfectly captured our company's identity and delivered a modern, professional, and visually stunning platform. Their technical expertise, attention to detail, and timely execution exceeded all our expectations.",
    name: "Manish Kumar",
    role: "Sr. Manager",
    company: "FeX Foundry Alloys",
    initials: "MK",
    website: "https://www.fexalloys.com",
    domain: "fexalloys.com",
    accentFrom: "#7C3AED",
    accentTo: "#38BDF8",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-5 w-5" fill="#FBBF24">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 scroll-mt-10"
      style={{ background: "linear-gradient(160deg, #F0F4FF 0%, #F8FAFF 50%, #F5F3FF 100%)" }}
    >
      <div className="max-w-[1200px] mx-auto px-[5%]">
        {/* Heading */}
        <motion.div
          className="text-center mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="section-label">CLIENT REVIEWS</span>
          <h2
            className="font-display font-black mb-4"
            style={{ fontSize: "clamp(26px, 3.2vw, 42px)", letterSpacing: "-1.2px", color: "#1E1B4B" }}
          >
            What Our Clients Say
          </h2>
          <p className="font-sans" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
            Real businesses. Real results. Here's what our clients have shared after working with us.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reviews.map((r, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.52, delay: idx * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -5, boxShadow: "0 20px 56px rgba(99,102,241,0.13)" }}
              style={{
                background: "white",
                borderRadius: 24,
                padding: "36px",
                border: "1.5px solid #E0E7FF",
                boxShadow: "0 4px 24px rgba(99,102,241,0.06)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Decorative quote mark */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 18,
                  right: 28,
                  fontSize: 96,
                  lineHeight: 1,
                  fontFamily: "Georgia, serif",
                  background: `linear-gradient(135deg, ${r.accentFrom}, ${r.accentTo})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  opacity: 0.12,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <Stars count={r.stars} />

              {/* Quote */}
              <blockquote
                className="font-sans flex-1 mb-7"
                style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, fontStyle: "italic" }}
              >
                &ldquo;{r.quote}&rdquo;
              </blockquote>

              {/* Divider */}
              <div style={{ height: 1, background: "#E0E7FF", marginBottom: 20 }} />

              {/* Author row */}
              <div className="flex items-center gap-3">
                {/* Initials avatar */}
                <div
                  className="flex items-center justify-center shrink-0 font-display font-black"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${r.accentFrom}, ${r.accentTo})`,
                    color: "white",
                    fontSize: 15,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {r.initials}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-display font-black" style={{ fontSize: 15, color: "#1E1B4B" }}>
                    {r.name}
                  </div>
                  <div className="font-sans" style={{ fontSize: 13, color: "#6B7280" }}>
                    {r.role} &middot; {r.company}
                  </div>
                  {r.website && (
                    <a
                      href={r.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-sans font-semibold mt-1 transition-colors"
                      style={{ fontSize: 12, color: "#7C3AED", textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#0EA5E9")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#7C3AED")}
                    >
                      <ExternalLink className="h-3 w-3" />
                      {r.domain}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
