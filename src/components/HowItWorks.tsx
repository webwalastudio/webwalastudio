import { useState } from "react";
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
      <div className="max-w-[1200px] mx-auto">
        {/* Title */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
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
        </div>

        {/* ── MOBILE: vertical accordion ── */}
        <div className="md:hidden max-w-xl mx-auto flex flex-col gap-3">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === index;
            return (
              <div key={index}>
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
                    <p
                      className="font-sans font-bold uppercase"
                      style={{ fontSize: 10, color: "#38BDF8", letterSpacing: "2px" }}
                    >
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

                {isActive && (
                  <div
                    className="mt-2 p-4"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 14,
                    }}
                  >
                    <p
                      className="font-sans font-semibold mb-3"
                      style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}
                    >
                      Phase deliverables:
                    </p>
                    <div className="flex flex-col gap-3">
                      {item.deliverables.map((del, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-start gap-3 p-3"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: 10,
                          }}
                        >
                          <span
                            className="w-5 h-5 text-xs font-bold inline-flex items-center justify-center shrink-0 mt-0.5"
                            style={{ borderRadius: "50%", background: "rgba(56,189,248,0.2)", color: "#38BDF8" }}
                          >
                            ✓
                          </span>
                          <p
                            className="font-sans font-bold text-xs leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.9)" }}
                          >
                            {del}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── DESKTOP: 3-column grid + deliverables card ── */}
        <div className="hidden md:block">
          {/* Steps grid */}
          <div
            className="grid grid-cols-3 mb-9"
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
                <div
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className="cursor-pointer transition-all duration-[250ms]"
                  style={{
                    padding: "40px 32px",
                    background: isActive ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                  }}
                >
                  <div
                    className="font-sans font-bold uppercase mb-4"
                    style={{ fontSize: 11, color: "#38BDF8", letterSpacing: "2px" }}
                  >
                    {item.step}
                  </div>
                  <div
                    className="flex items-center justify-center mb-4"
                    style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(56,189,248,0.15)" }}
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
                </div>
              );
            })}
          </div>

          {/* Deliverables box */}
          <div
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
                <span
                  className="font-sans font-bold uppercase"
                  style={{ fontSize: 11, color: "#38BDF8", letterSpacing: "1.5px" }}
                >
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
            <p
              className="font-sans font-semibold mb-6"
              style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}
            >
              By completing this phase, you receive the following final outcomes:
            </p>
            <div className="grid grid-cols-3 gap-4">
              {steps[desktopTab].deliverables.map((del, dIdx) => (
                <div
                  key={dIdx}
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
                  <p
                    className="font-sans font-bold leading-relaxed"
                    style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}
                  >
                    {del}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
