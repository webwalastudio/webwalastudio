import { motion } from "motion/react";
import { CalendarCheck } from "lucide-react";

interface HeroProps {
  onOpenContact: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #EFF6FF 0%, #F5F3FF 50%, #EDE9FE 100%)",
        padding: "120px 5% 80px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="orb-float absolute pointer-events-none"
        style={{
          top: "5%", right: "5%",
          width: 560, height: 560, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb-float-2 absolute pointer-events-none"
        style={{
          bottom: 0, left: 0,
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-[1200px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left — copy */}
          <div>
            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="font-display font-black leading-tight mb-6"
              style={{
                fontSize: "clamp(38px, 4.8vw, 62px)",
                letterSpacing: "-2px",
                color: "#1E1B4B",
              }}
            >
              Your Business Deserves a Website{" "}
              <span className="grad">that Works</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 max-w-xl"
              style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}
            >
              We build professional, mobile-ready websites that drive results. No hassle, no hidden fees, delivered in under 7 days.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
            >
              <motion.button
                onClick={onOpenContact}
                className="btn-shine inline-flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #0EA5E9, #7C3AED)",
                  color: "white",
                  padding: "13px 28px",
                  borderRadius: 50,
                  fontSize: 14,
                  fontWeight: 700,
                  boxShadow: "0 4px 20px rgba(124,58,237,0.25)",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
                whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(124,58,237,0.35)" }}
                whileTap={{ scale: 0.97 }}
              >
                <CalendarCheck className="h-4 w-4" />
                Book a Free Consultation
              </motion.button>
            </motion.div>

          </div>

          {/* Right — mockup */}
          <motion.div
            className="relative pb-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Browser mockup */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #EEF2FF 0%, #F0F4FF 60%, #EDE9FE 100%)",
                boxShadow: "0 30px 80px rgba(99,102,241,0.18)",
                border: "1px solid rgba(224,231,255,0.9)",
              }}
            >
              {/* Browser chrome — dots only */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: "rgba(255,255,255,0.7)", borderBottom: "1px solid rgba(224,231,255,0.6)" }}
              >
                <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF5F57" }} />
                <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FFBD2E" }} />
                <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#28C840" }} />
              </div>

              {/* Page content */}
              <div style={{ padding: "20px 20px 24px" }}>

                {/* Hero skeleton card */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.75)",
                    borderRadius: 14,
                    padding: "28px 28px 32px",
                    marginBottom: 16,
                  }}
                >
                  {/* Text skeleton lines */}
                  <div style={{ height: 11, borderRadius: 30, background: "rgba(139,116,246,0.22)", width: "72%", marginBottom: 11 }} />
                  <div style={{ height: 11, borderRadius: 30, background: "rgba(139,116,246,0.15)", width: "52%", marginBottom: 24 }} />
                  {/* Gradient CTA pill */}
                  <div
                    style={{
                      height: 40, width: 200, borderRadius: 50,
                      background: "linear-gradient(135deg, #0EA5E9, #7C3AED)",
                    }}
                  />
                </div>

                {/* 3 service cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(238,242,255,0.7)",
                        borderRadius: 12,
                        padding: "18px 16px 20px",
                      }}
                    >
                      {/* Icon block */}
                      <div
                        style={{
                          width: 34, height: 34, borderRadius: 9,
                          background: "rgba(99,102,241,0.18)",
                          marginBottom: 16,
                        }}
                      />
                      {/* Skeleton lines */}
                      <div style={{ height: 8, borderRadius: 20, background: "rgba(139,116,246,0.25)", width: "80%", marginBottom: 8 }} />
                      <div style={{ height: 8, borderRadius: 20, background: "rgba(139,116,246,0.18)", width: "60%", marginBottom: 8 }} />
                      <div style={{ height: 8, borderRadius: 20, background: "rgba(139,116,246,0.12)", width: "70%" }} />
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Floating "Site is Live!" notification card */}
            <div
              className="absolute flex items-center gap-4"
              style={{
                bottom: -24, right: -20,
                background: "white",
                borderRadius: 18,
                padding: "16px 22px",
                boxShadow: "0 20px 60px rgba(99,102,241,0.22)",
              }}
            >
              <div
                style={{
                  width: 54, height: 54, borderRadius: 14,
                  background: "linear-gradient(135deg, #D1FAE5, #A7F3D0)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, flexShrink: 0,
                }}
              >
                🚀
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#1E1B4B", marginBottom: 2 }}>Site is Live!</div>
                <div style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 400 }}>Delivered in 6 days</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
