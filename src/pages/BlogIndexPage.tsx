import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { blogPosts } from "../data/blog-posts.generated";
import { BLOG_INDEX_TITLE, BLOG_INDEX_DESCRIPTION } from "../data/blogMeta";
import { useSeoMeta, useJsonLd } from "../hooks/useSeoMeta";
import { buildBreadcrumbSchema } from "../lib/schema";
import PageShell, { useContactModal } from "../components/PageShell";
import { RevealText, SpotlightCard } from "../components/fx";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function BlogIndexContent() {
  const { openContact } = useContactModal();

  useSeoMeta({ title: BLOG_INDEX_TITLE, description: BLOG_INDEX_DESCRIPTION, path: "/blog" });
  useJsonLd(buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]));

  return (
    <>
      <section
        className="relative overflow-hidden text-center"
        style={{
          padding: "140px 5% 80px",
          background: "linear-gradient(160deg, #EFF6FF 0%, #F5F3FF 50%, #EDE9FE 100%)",
        }}
      >

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="section-label">BLOG</span>
            <RevealText as="h1" text="Guides for Building a Better Business Website" className="font-display font-black mb-5" style={{ fontSize: "clamp(36px, 5.4vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#1E1B4B" }} />
            <p className="font-sans mb-8" style={{ fontSize: 17, color: "#4B5563", lineHeight: 1.75 }}>
              Practical, no-fluff guides on pricing, timelines, and what to actually build.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "60px 5% 100px", background: "#F8FAFF" }}>
        <div className="max-w-[860px] mx-auto flex flex-col gap-5">
          {blogPosts.map((post, idx) => (
            <SpotlightCard
              key={post.slug}
              lift={5}
              className="group"
              style={{ borderRadius: 16 }}
              motionProps={{
                initial: { opacity: 0, y: 28, scale: 0.97 },
                whileInView: { opacity: 1, y: 0, scale: 1 },
                viewport: { once: true, margin: "-40px" },
                transition: { duration: 0.55, delay: idx * 0.03, ease: [0.21, 0.47, 0.32, 0.98] },
              }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="fx-card liquid-glass flex flex-col gap-2"
                style={{ borderRadius: 16, padding: "24px", textDecoration: "none" }}
              >
                <span className="font-sans font-semibold" style={{ fontSize: 12, color: "#7C3AED", letterSpacing: "0.3px" }}>
                  {formatDate(post.date)}
                </span>
                <span className="font-display font-bold" style={{ fontSize: 19, color: "#1E1B4B", lineHeight: 1.3 }}>
                  {post.title}
                </span>
                <p className="font-sans" style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.6 }}>
                  {post.excerpt}
                </p>
                <span className="font-sans font-bold inline-flex items-center gap-1.5 mt-1" style={{ fontSize: 13, color: "#7C3AED" }}>
                  Read more <ArrowRight className="fx-arrow" style={{ width: 14, height: 14 }} />
                </span>
              </Link>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section
        className="relative overflow-hidden text-center"
        style={{
          padding: "80px 5% 100px",
          background: "linear-gradient(160deg, #EFF6FF 0%, #F5F3FF 50%, #EDE9FE 100%)",
          borderTop: "1.5px solid #E0E7FF",
        }}
      >
        <div className="relative z-10 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label">READY TO START</span>
            <RevealText text="Have a specific question?" className="font-display font-black mb-4" style={{ fontSize: "clamp(30px, 4.2vw, 48px)", lineHeight: 1.08, letterSpacing: "-0.03em", color: "#1E1B4B" }} />
            <p className="font-sans mb-8" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
              Book a free 15-minute call — we'll answer it directly, no pressure.
            </p>
            <button
              onClick={() => openContact()}
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

export default function BlogIndexPage() {
  return (
    <PageShell whatsAppSource="blog_index">
      <BlogIndexContent />
    </PageShell>
  );
}
