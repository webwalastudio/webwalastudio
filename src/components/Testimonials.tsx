import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { RevealText, SpotlightCard } from "./fx";

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
  {
    stars: 5,
    quote:
      "Thanks to Webwala Studio — great job on this project! The quality of work is excellent and it was delivered right on time. Extremely professional and detail-oriented. The final output exceeded my expectations, highly recommend.",
    name: "Murshad Ali",
    role: "Owner",
    company: "Master Salon",
    initials: "MA",
    website: "https://www.master-salon.com",
    domain: "master-salon.com",
    accentFrom: "#B45309",
    accentTo: "#DB2777",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-5">
      {Array.from({ length: count }).map((_, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 20 20"
          className="h-5 w-5"
          fill="#FBBF24"
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 400, damping: 14, delay: 0.25 + i * 0.08 }}
          style={{ filter: "drop-shadow(0 2px 4px rgba(251,191,36,0.35))" }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 scroll-mt-10"
      style={{ background: "linear-gradient(160deg, #F0F4FF 0%, #F8FAFF 50%, #F5F3FF 100%)" }}
    >
      <div className="max-w-[1200px] mx-auto px-[5%] relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 32, rotateX: 6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ transformPerspective: 800 }}
        >
          <span className="section-label">CLIENT REVIEWS</span>
          <RevealText
            text="What Our Clients"
            accent="Say"
            className="font-display font-black mb-4"
            style={{ fontSize: "clamp(32px, 4.6vw, 56px)", lineHeight: 1.06, letterSpacing: "-0.03em", color: "#1E1B4B" }}
          />
          <p className="font-sans" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
            Real businesses. Real results. Here's what our clients have shared after working with us.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((r, idx) => (
            <SpotlightCard
              key={idx}
              className="group transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(99,102,241,0.16)]"
              glow={`${r.accentFrom}1F`}
              motionProps={{
                initial: { opacity: 0, y: 40, rotate: idx === 0 ? -2 : idx === 2 ? 2 : 0 },
                whileInView: { opacity: 1, y: 0, rotate: 0 },
                viewport: { once: true, margin: "-40px" },
                transition: { duration: 0.7, delay: idx * 0.12, ease: [0.21, 0.47, 0.32, 0.98] },
              }}
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
                className="transition-all duration-500 group-hover:scale-125 group-hover:-rotate-6 group-hover:opacity-30!"
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
                  className="flex items-center justify-center shrink-0 font-display font-black transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]"
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
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
