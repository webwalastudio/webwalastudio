import { lazy, Suspense, useState, useCallback } from "react";
import { MotionConfig } from "motion/react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, CalendarCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import ScrollProgress from "../components/ScrollProgress";

const Footer       = lazy(() => import("../components/Footer"));
const ContactModal = lazy(() => import("../components/ContactModal"));

const faqs = [
  {
    q: "How long does it take to build my website?",
    a: "Most websites are designed, built, and launched within 7 days. The timeline depends on how quickly you can share your content (text, images, logo). Once we have everything, we move fast.",
  },
  {
    q: "What do I need to provide to get started?",
    a: "Just your business name, logo (if you have one), a rough idea of what you want, and any photos or text you'd like on the site. No logo? No problem — we can help you with that too. We guide you through the entire process.",
  },
  {
    q: "Is the website mobile-friendly?",
    a: "Yes, 100%. Every website we build is fully responsive — it looks great and works perfectly on phones, tablets, and desktops. Mobile-first design is a core part of our process, not an afterthought.",
  },
  {
    q: "Do you offer website maintenance after launch?",
    a: "Yes. All plans include free maintenance — 1 month with Starter, 2 months with Professional, and 3 months with Business Pro. After that, we offer affordable annual maintenance packages so your site stays fast, secure, and up to date.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. The price you see is what you pay for the build. The only additional costs are domain name (₹800–1,500/year) and hosting (₹3,000–6,000/year) if you don't already have them — and we'll guide you through setting those up.",
  },
  {
    q: "What types of businesses do you work with?",
    a: "We work with schools, clinics, restaurants, retailers, manufacturers, consultants, NGOs, and more. If you have a business and need a professional online presence, we can help — regardless of industry.",
  },
  {
    q: "Do you work with clients outside Delhi NCR?",
    a: "Yes. We work remotely with clients across India. Everything — from the briefing to the final delivery — is handled online via WhatsApp, email, and video calls. Location is no barrier.",
  },
  {
    q: "What happens after the website goes live?",
    a: "We hand over everything — the website, login credentials, and a walkthrough. During your free maintenance period, we handle any bugs, updates, or small changes at no extra cost. After that, we stay available on WhatsApp for support.",
  },
  {
    q: "Do you help with domain and hosting setup?",
    a: "Yes. If you don't have a domain or hosting yet, we'll guide you through purchasing them on trusted platforms. We can also manage the setup for you so you don't have to deal with the technical side.",
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="liquid-glass"
            style={{ borderRadius: 16, overflow: "hidden", cursor: "pointer" }}
            onClick={() => setOpenIndex(isOpen ? null : idx)}
          >
            <div className="flex items-center justify-between gap-4" style={{ padding: "20px 24px" }}>
              <span
                className="font-display font-bold"
                style={{ fontSize: 15, color: isOpen ? "#7C3AED" : "#1E1B4B", lineHeight: 1.4, transition: "color 0.2s" }}
              >
                {faq.q}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
                style={{
                  flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: isOpen ? "linear-gradient(135deg, #0EA5E9, #7C3AED)" : "rgba(124,58,237,0.08)",
                  transition: "background 0.22s",
                }}
              >
                <Plus style={{ width: 15, height: 15, color: isOpen ? "white" : "#7C3AED", strokeWidth: 2.5, transition: "color 0.22s" }} />
              </motion.div>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ padding: "0 24px 22px", borderTop: "1px solid rgba(224,231,255,0.6)", paddingTop: 16 }}>
                    <p className="font-sans" style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.75 }}>
                      {faq.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function FAQPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const handleOpenContact = useCallback(() => setIsContactOpen(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-bg-cream flex flex-col">
        <ScrollProgress />
        <Navbar onOpenContact={handleOpenContact} />

        <main className="flex-1">
          {/* Hero */}
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
                <span className="section-label">FAQ</span>
                <h1
                  className="font-display font-black mb-5"
                  style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-1.8px", color: "#1E1B4B" }}
                >
                  Got Questions?
                </h1>
                <p className="font-sans mb-8" style={{ fontSize: 17, color: "#4B5563", lineHeight: 1.75 }}>
                  Everything you need to know before getting started.{" "}
                  Can't find your answer?{" "}
                  <a href="https://wa.me/919818726094" target="_blank" rel="noopener noreferrer"
                    style={{ color: "#7C3AED", fontWeight: 700, textDecoration: "none" }}>
                    Chat with us on WhatsApp.
                  </a>
                </p>
              </motion.div>
            </div>
          </section>

          {/* FAQ accordion */}
          <section style={{ padding: "60px 5% 80px", background: "#F8FAFF" }}>
            <div className="max-w-[860px] mx-auto">
              <FAQAccordion />
            </div>
          </section>

          {/* Bottom CTA */}
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
                  Still have questions?
                </h2>
                <p className="font-sans mb-8" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
                  Book a free 15-minute call and we'll answer everything — no pressure, no commitment.
                </p>
                <button
                  onClick={handleOpenContact}
                  className="btn-shine btn-gradient inline-flex items-center justify-center gap-2 font-sans font-bold"
                  style={{ fontSize: 15, padding: "14px 32px", borderRadius: 50 }}
                >
                  <CalendarCheck className="h-5 w-5" />
                  Book a Free Consultation
                </button>
              </motion.div>
            </div>
          </section>
        </main>

        <Suspense fallback={null}>
          <Footer onOpenContact={handleOpenContact} />
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} prefilledPlan={null} />
        </Suspense>
      </div>
    </MotionConfig>
  );
}
