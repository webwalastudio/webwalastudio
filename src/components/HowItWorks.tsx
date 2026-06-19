import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Compass, Rocket, ChevronDown } from "lucide-react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const desktopTab = activeTab < 0 ? 0 : activeTab;

  const steps = [
    {
      step: "01",
      title: "Discovery",
      subtitle: "Day 1-2 • Research & Materials",
      description: "We understand your business goals, target audience, and collect your branding materials.",
      icon: Search,
      deliverables: [
        "Market & industry competitive research document.",
        "Sitemap mapping & UX outline wireframes.",
        "Branding content assets collection.",
      ],
    },
    {
      step: "02",
      title: "Design & Build",
      subtitle: "Day 3-5 • UI layout & backend code",
      description: "Our team designs a modern, mobile-responsive layout and integrates necessary features.",
      icon: Compass,
      deliverables: [
        "High-converting, bespoke homepage mock layout.",
        "Fully-coded backend integrations & custom fields setup.",
        "100% responsive smartphone & tablet screen layout check.",
      ],
    },
    {
      step: "03",
      title: "Go Live",
      subtitle: "Day 6-7 • Testing & Launch",
      description: "After your review, we launch the site and ensure it's optimized for search engines.",
      icon: Rocket,
      deliverables: [
        "Cross-browser & device testing on mobile, tablet & desktop.",
        "Final client review walkthrough & revision sign-off.",
        "Handover with admin access, credentials & maintenance guide.",
      ],
    },
  ];

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        padding: "100px 5%",
        background: "linear-gradient(160deg, #1E1B4B 0%, #312E81 50%, #1E1B4B 100%)",
      }}
    >
      {/* Dot grid overlay */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* Glass sphere orbs */}
      <div className="glass-sphere-blue orb-float absolute pointer-events-none" style={{ top: "-10%", right: "-5%", width: 500, height: 500 }} />
      <div className="glass-sphere orb-float-2 absolute pointer-events-none" style={{ bottom: "-10%", left: "-5%", width: 420, height: 420 }} />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 32, rotateX: 6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ transformPerspective: 800 }}
        >
          <span className="section-label-dark">HOW IT WORKS</span>
          <h2
            className="font-display font-black mb-4"
            style={{ fontSize: "clamp(26px, 3.2vw, 42px)", letterSpacing: "-1.2px" }}
          >
            Simple. Fast. Effective.
          </h2>
          <p className="font-sans" style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
            Our streamlined process ensures you get a professional website live in under 7 days without the typical agency headaches.
          </p>
        </motion.div>

        {/* ── MOBILE: vertical accordion ── */}
        <div className="md:hidden max-w-xl mx-auto flex flex-col gap-3">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <div
                  onClick={() => setActiveTab(isActive ? -1 : index)}
                  className="flex items-center gap-4 p-4 cursor-pointer transition-all duration-200"
                  style={{
                    background: isActive ? "rgba(56,189,248,0.1)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isActive ? "rgba(56,189,248,0.3)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 14,
                  }}
                >
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(56,189,248,0.15)" }}
                  >
                    <Icon className="h-5 w-5" style={{ color: "#38BDF8" }} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-sans font-bold uppercase" style={{ fontSize: 10, color: "#38BDF8", letterSpacing: "2px" }}>
                      {item.step}. {item.subtitle}
                    </p>
                    <h3 className="font-display font-extrabold text-white" style={{ fontSize: 16 }}>
                      {item.title}
                    </h3>
                  </div>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 transition-transform duration-200"
                    style={{ color: "#38BDF8", transform: isActive ? "rotate(180deg)" : "none" }}
                  />
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mt-2 p-4"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 14,
                        }}
                      >
                        <p className="font-sans font-semibold mb-3" style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                          Phase deliverables:
                        </p>
                        <div className="flex flex-col gap-3">
                          {item.deliverables.map((del, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-start gap-3 p-3"
                              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}
                            >
                              <span
                                className="w-5 h-5 text-xs font-bold inline-flex items-center justify-center shrink-0 mt-0.5"
                                style={{ borderRadius: "50%", background: "rgba(56,189,248,0.2)", color: "#38BDF8" }}
                              >
                                ✓
                              </span>
                              <p className="font-sans font-bold text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>
                                {del}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── DESKTOP: 3-column grid + deliverables ── */}
        <div className="hidden md:block">
          {/* Steps grid */}
          <div className="relative grid grid-cols-3 mb-9">
            {/* Connecting line */}
            <div
              className="absolute top-[68px] left-[16.67%] right-[16.67%] h-[1px] pointer-events-none"
              style={{ background: "linear-gradient(to right, rgba(56,189,248,0.15), rgba(56,189,248,0.4), rgba(56,189,248,0.15))" }}
            />
            {/* Active progress line */}
            <motion.div
              className="absolute top-[68px] left-[16.67%] h-[2px] pointer-events-none"
              style={{ background: "linear-gradient(to right, #38BDF8, #A78BFA)" }}
              animate={{ width: `${(desktopTab / 2) * 66.66}%` }}
              transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            />

            <div
              className="grid grid-cols-3 col-span-3"
              style={{
                gap: 2,
                background: "rgba(255,255,255,0.05)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}
            >
              {steps.map((item, index) => {
                const Icon = item.icon;
                const isActive = desktopTab === index;
                return (
                  <motion.div
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className="cursor-pointer relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                    style={{
                      padding: "40px 32px",
                      background: isActive ? "rgba(56,189,248,0.08)" : "rgba(255,255,255,0.04)",
                      transition: "background 0.25s",
                    }}
                    whileHover={{ background: "rgba(56,189,248,0.06)" }}
                  >
                    {/* Ghost step number */}
                    <div
                      className="absolute right-4 bottom-4 font-display font-black pointer-events-none select-none"
                      style={{
                        fontSize: 96,
                        lineHeight: 1,
                        color: "rgba(255,255,255,0.03)",
                        letterSpacing: "-4px",
                      }}
                    >
                      {item.step}
                    </div>

                    <div
                      className="font-sans font-bold uppercase mb-4"
                      style={{ fontSize: 11, color: "#38BDF8", letterSpacing: "2px" }}
                    >
                      {item.step}
                    </div>
                    <div
                      className="flex items-center justify-center mb-4"
                      style={{
                        width: 52, height: 52, borderRadius: 14,
                        background: isActive ? "rgba(56,189,248,0.2)" : "rgba(56,189,248,0.12)",
                        boxShadow: isActive ? "0 0 20px rgba(56,189,248,0.2)" : "none",
                        transition: "all 0.25s",
                      }}
                    >
                      <Icon className="h-6 w-6" style={{ color: "#38BDF8" }} />
                    </div>
                    <div
                      className="inline-block mb-3"
                      style={{
                        background: "rgba(56,189,248,0.12)",
                        color: "#38BDF8",
                        padding: "4px 14px",
                        borderRadius: 50,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {item.subtitle}
                    </div>
                    <h3
                      className="font-display font-extrabold mb-2"
                      style={{ fontSize: 20, letterSpacing: "-0.5px" }}
                    >
                      {item.title}
                    </h3>
                    <p className="font-sans" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                      {item.description}
                    </p>

                    {isActive && (
                      <motion.div
                        layoutId="step-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[3px]"
                        style={{ background: "linear-gradient(to right, #38BDF8, #A78BFA)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Deliverables box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={desktopTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "var(--radius-lg)",
                padding: 36,
              }}
            >
              <div
                className="flex flex-row justify-between items-center gap-4 mb-6 pb-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div>
                  <span className="font-sans font-bold uppercase" style={{ fontSize: 11, color: "#38BDF8", letterSpacing: "1.5px" }}>
                    Active Phase Deliverable
                  </span>
                  <h4 className="font-display font-extrabold text-white" style={{ fontSize: 20 }}>
                    Phase {steps[desktopTab].step} • {steps[desktopTab].title}
                  </h4>
                </div>
                <span
                  style={{
                    background: "rgba(56,189,248,0.12)",
                    color: "#38BDF8",
                    border: "1px solid rgba(56,189,248,0.2)",
                    padding: "4px 14px",
                    borderRadius: 50,
                    fontSize: 11,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  {steps[desktopTab].subtitle}
                </span>
              </div>
              <p className="font-sans font-semibold mb-6" style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                By completing this phase, you receive the following final outcomes:
              </p>
              <div className="grid grid-cols-3 gap-4">
                {steps[desktopTab].deliverables.map((del, dIdx) => (
                  <motion.div
                    key={dIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: dIdx * 0.07, duration: 0.25 }}
                    className="flex flex-col gap-3 p-4"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 14,
                    }}
                  >
                    <span
                      className="w-6 h-6 text-xs font-bold inline-flex items-center justify-center shrink-0"
                      style={{ borderRadius: "50%", background: "rgba(56,189,248,0.2)", color: "#38BDF8" }}
                    >
                      ✓
                    </span>
                    <p className="font-sans font-bold leading-relaxed" style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>
                      {del}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
