import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { CalendarCheck, Zap, Smartphone, ChevronDown, Monitor, Tablet } from "lucide-react";

interface HeroProps {
  onOpenContact: () => void;
}

const words = ["that Works", "that Sells", "that Grows", "that Converts"];
const devices = ["desktop", "tablet", "mobile"] as const;
type Device = typeof devices[number];

/* ── Device mockups ── */
function DesktopMockup() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #EEF2FF 0%, #F0F4FF 60%, #EDE9FE 100%)",
        boxShadow: "0 40px 100px rgba(99,102,241,0.22), 0 8px 32px rgba(99,102,241,0.1), 0 0 0 1px rgba(224,231,255,0.9)",
      }}
    >
      {/* Chrome */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "rgba(255,255,255,0.72)", borderBottom: "1px solid rgba(224,231,255,0.7)" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57", flexShrink: 0 }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E", flexShrink: 0 }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840", flexShrink: 0 }} />
        <div className="flex items-center gap-1.5" style={{ flex: 1, height: 20, borderRadius: 20, background: "rgba(224,231,255,0.7)", marginLeft: 10, paddingLeft: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(99,102,241,0.5)", flexShrink: 0 }} />
          <div style={{ height: 6, borderRadius: 10, background: "rgba(99,102,241,0.18)", width: "55%" }} />
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: "18px 18px 22px" }}>
        <div style={{ background: "rgba(255,255,255,0.8)", borderRadius: 12, padding: "22px 22px 26px", marginBottom: 12 }}>
          <div style={{ height: 9, borderRadius: 30, background: "rgba(124,58,237,0.2)", width: "70%", marginBottom: 9 }} />
          <div style={{ height: 9, borderRadius: 30, background: "rgba(124,58,237,0.12)", width: "48%", marginBottom: 20 }} />
          <div style={{ height: 34, width: 160, borderRadius: 50, background: "linear-gradient(135deg, #0EA5E9, #7C3AED)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { accent: "rgba(56,189,248,0.25)", w: "75%" },
            { accent: "rgba(167,139,250,0.25)", w: "60%" },
            { accent: "rgba(14,165,233,0.25)", w: "80%" },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(238,242,255,0.8)", borderRadius: 10, padding: "14px 12px 16px" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: item.accent, marginBottom: 11 }} />
              <div style={{ height: 6, borderRadius: 20, background: "rgba(124,58,237,0.22)", width: item.w, marginBottom: 6 }} />
              <div style={{ height: 6, borderRadius: 20, background: "rgba(124,58,237,0.14)", width: "55%", marginBottom: 6 }} />
              <div style={{ height: 6, borderRadius: 20, background: "rgba(124,58,237,0.1)", width: "68%" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabletMockup() {
  return (
    /* iPad-style portrait frame, centered */
    <div style={{ width: 270, margin: "0 auto" }}>
      <div
        style={{
          borderRadius: 28,
          border: "12px solid #C8D0E2",
          background: "linear-gradient(160deg, #EEF2FF 0%, #F0F4FF 60%, #EDE9FE 100%)",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(99,102,241,0.22), inset 0 0 0 1px rgba(255,255,255,0.6), 0 0 0 1px rgba(180,190,210,0.5)",
        }}
      >
        {/* Top bezel — camera dot */}
        <div style={{ height: 24, background: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#B8C2D6" }} />
        </div>

        {/* Screen content */}
        <div style={{ background: "linear-gradient(160deg, #EEF2FF 0%, #F0F4FF 60%, #EDE9FE 100%)", padding: "10px 10px 12px" }}>
          {/* Mini browser chrome */}
          <div
            className="flex items-center gap-1.5 mb-2 px-2 py-1.5"
            style={{ background: "rgba(255,255,255,0.75)", borderRadius: 8, border: "1px solid rgba(224,231,255,0.7)" }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#28C840" }} />
            <div style={{ flex: 1, height: 10, borderRadius: 20, background: "rgba(224,231,255,0.8)", marginLeft: 6 }} />
          </div>

          {/* Hero card */}
          <div style={{ background: "rgba(255,255,255,0.82)", borderRadius: 10, padding: "14px", marginBottom: 8 }}>
            <div style={{ height: 7, borderRadius: 20, background: "rgba(124,58,237,0.2)", width: "80%", marginBottom: 7 }} />
            <div style={{ height: 7, borderRadius: 20, background: "rgba(124,58,237,0.12)", width: "58%", marginBottom: 14 }} />
            <div style={{ height: 28, borderRadius: 30, background: "linear-gradient(135deg, #0EA5E9, #7C3AED)" }} />
          </div>

          {/* 2-column service cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
            {[
              { accent: "rgba(56,189,248,0.25)", w: "78%" },
              { accent: "rgba(167,139,250,0.25)", w: "62%" },
              { accent: "rgba(14,165,233,0.25)", w: "85%" },
              { accent: "rgba(124,58,237,0.2)", w: "70%" },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(238,242,255,0.8)", borderRadius: 8, padding: "10px" }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: item.accent, marginBottom: 8 }} />
                <div style={{ height: 5, borderRadius: 10, background: "rgba(124,58,237,0.22)", width: item.w, marginBottom: 5 }} />
                <div style={{ height: 5, borderRadius: 10, background: "rgba(124,58,237,0.12)", width: "55%" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bezel — home bar */}
        <div style={{ height: 20, background: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 52, height: 4, borderRadius: 2, background: "#B8C2D6" }} />
        </div>
      </div>
    </div>
  );
}

function MobileMockup() {
  return (
    <div
      style={{
        width: 195,
        margin: "0 auto",
        borderRadius: 36,
        border: "10px solid #D4DAEA",
        background: "linear-gradient(160deg, #EEF2FF 0%, #F0F4FF 60%, #EDE9FE 100%)",
        overflow: "hidden",
        boxShadow: "0 32px 80px rgba(99,102,241,0.22), 0 0 0 1px rgba(224,231,255,0.6)",
      }}
    >
      {/* Dynamic island / notch */}
      <div style={{ height: 28, background: "rgba(255,255,255,0.72)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 68, height: 8, borderRadius: 20, background: "#C8D0E0" }} />
      </div>
      {/* Content */}
      <div style={{ padding: "10px" }}>
        {/* Hero card */}
        <div style={{ background: "rgba(255,255,255,0.8)", borderRadius: 10, padding: "14px", marginBottom: 8 }}>
          <div style={{ height: 7, borderRadius: 20, background: "rgba(124,58,237,0.2)", width: "90%", marginBottom: 7 }} />
          <div style={{ height: 7, borderRadius: 20, background: "rgba(124,58,237,0.12)", width: "68%", marginBottom: 12 }} />
          <div style={{ height: 30, borderRadius: 30, background: "linear-gradient(135deg, #0EA5E9, #7C3AED)" }} />
        </div>
        {/* Stacked cards */}
        {[
          "rgba(56,189,248,0.22)",
          "rgba(167,139,250,0.22)",
          "rgba(14,165,233,0.22)",
        ].map((accent, i) => (
          <div key={i} style={{ background: "rgba(238,242,255,0.8)", borderRadius: 8, padding: "10px", marginBottom: 6, display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ height: 5, borderRadius: 10, background: "rgba(124,58,237,0.22)", width: "80%", marginBottom: 5 }} />
              <div style={{ height: 5, borderRadius: 10, background: "rgba(124,58,237,0.12)", width: "60%" }} />
            </div>
          </div>
        ))}
      </div>
      {/* Bottom nav */}
      <div style={{ padding: "8px 14px 4px", background: "rgba(255,255,255,0.85)", borderTop: "1px solid rgba(224,231,255,0.7)", display: "flex", justifyContent: "space-around" }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ width: 22, height: 22, borderRadius: 6, background: i === 0 ? "rgba(124,58,237,0.28)" : "rgba(124,58,237,0.07)" }} />
        ))}
      </div>
      {/* Home indicator */}
      <div style={{ display: "flex", justifyContent: "center", padding: "5px 0 7px", background: "rgba(255,255,255,0.85)" }}>
        <div style={{ width: 50, height: 4, borderRadius: 2, background: "rgba(99,102,241,0.22)" }} />
      </div>
    </div>
  );
}

export default function Hero({ onOpenContact }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [deviceIndex, setDeviceIndex] = useState(0);
  const direction = useRef(1); // 1 = forward, -1 = backward
  const mockupRef = useRef<HTMLDivElement>(null);

  /* ── 3D tilt ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 160, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 160, damping: 22 });
  const rotateX = useTransform(springY, [-1, 1], [7, -7]);
  const rotateY = useTransform(springX, [-1, 1], [-9, 9]);

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    const rect = mockupRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  /* ── Word cycle ── */
  useEffect(() => {
    const t = setInterval(() => setWordIndex(i => (i + 1) % words.length), 2800);
    return () => clearInterval(t);
  }, []);

  /* ── Device auto-cycle (always forward) ── */
  useEffect(() => {
    const t = setInterval(() => {
      direction.current = 1;
      setDeviceIndex(i => (i + 1) % devices.length);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const goToDevice = (i: number) => {
    direction.current = i > deviceIndex ? 1 : -1;
    setDeviceIndex(i);
  };

  const currentDevice: Device = devices[deviceIndex];
  const deviceLabels = [
    { icon: Monitor, label: "Desktop" },
    { icon: Tablet, label: "Tablet" },
    { icon: Smartphone, label: "Mobile" },
  ];

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #EFF6FF 0%, #F5F3FF 50%, #EDE9FE 100%)",
        padding: "120px 5% 100px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Dot grid */}
      <div className="dot-grid-light absolute inset-0 pointer-events-none" />

      {/* Orbs */}
      <div className="orb-float absolute pointer-events-none" style={{ top: "4%", right: "4%", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%)" }} />
      <div className="orb-float-2 absolute pointer-events-none" style={{ bottom: "-5%", left: "-3%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)" }} />
      <div className="orb-float-3 absolute pointer-events-none" style={{ top: "45%", left: "28%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)" }} />

      <div className="w-full max-w-[1200px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left copy ── */}
          <div>
            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="font-display font-black leading-tight mb-6"
              style={{ fontSize: "clamp(36px, 4.6vw, 60px)", letterSpacing: "-2px", color: "#1E1B4B" }}
            >
              Your Business Deserves a Website{" "}
              <span style={{ display: "inline-block" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    className="grad-shimmer"
                    initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.42, ease: [0.21, 0.47, 0.32, 0.98] }}
                    style={{ display: "inline-block" }}
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mb-8 max-w-xl"
              style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.75 }}
            >
              We build professional, mobile-ready websites that drive results. No hassle, no hidden fees, delivered in under 7 days.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="flex items-center gap-6 mb-10"
            >
              {[
                { value: "7 Days", label: "Delivery" },
                { value: "100%", label: "Mobile First" },
                { value: "50+", label: "Sites Built" },
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#1E1B4B", letterSpacing: "-1px", lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", marginTop: 3 }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="flex items-center flex-wrap gap-4"
            >
              <motion.button
                onClick={onOpenContact}
                className="btn-shine inline-flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #0EA5E9, #7C3AED)",
                  color: "white",
                  padding: "14px 30px",
                  borderRadius: 50,
                  fontSize: 14,
                  fontWeight: 700,
                  boxShadow: "0 4px 28px rgba(124,58,237,0.32)",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
                whileHover={{ y: -3, boxShadow: "0 12px 44px rgba(124,58,237,0.42)" }}
                whileTap={{ scale: 0.97 }}
              >
                <CalendarCheck className="h-4 w-4" />
                Book Free Consultation
              </motion.button>
              <a href="#services" style={{ fontSize: 14, fontWeight: 700, color: "#7C3AED", textDecoration: "none" }}>
                See our work →
              </a>
            </motion.div>
          </div>

          {/* ── Right: cycling device mockup ── */}
          <motion.div
            ref={mockupRef}
            className="relative"
            style={{ perspective: "1100px" }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>

              {/* Slider container — clips the sliding motion */}
              <div style={{ minHeight: 340, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: 36 }}>
                <AnimatePresence mode="wait" custom={direction.current}>
                  <motion.div
                    key={currentDevice}
                    custom={direction.current}
                    variants={{
                      enter: (d: number) => ({ x: d * 80, opacity: 0, scale: 0.96 }),
                      center: { x: 0, opacity: 1, scale: 1 },
                      exit: (d: number) => ({ x: d * -80, opacity: 0, scale: 0.96 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.9 }}
                  >
                    {currentDevice === "desktop" && <DesktopMockup />}
                    {currentDevice === "tablet" && <TabletMockup />}
                    {currentDevice === "mobile" && <MobileMockup />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating "Site is Live!" badge */}
              <div
                className="float-y absolute flex items-center gap-3"
                style={{
                  bottom: 6, right: currentDevice === "mobile" ? "20%" : -22,
                  background: "rgba(255,255,255,0.96)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderRadius: 18,
                  padding: "12px 16px",
                  boxShadow: "0 20px 60px rgba(99,102,241,0.24), 0 0 0 1px rgba(224,231,255,0.9)",
                  transition: "right 0.4s",
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 11, background: "linear-gradient(135deg, #D1FAE5, #6EE7B7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Zap className="h-4 w-4" style={{ color: "#059669", fill: "#059669" }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#1E1B4B", lineHeight: 1.2 }}>Site is Live!</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>Delivered in 6 days</div>
                </div>
              </div>

            </motion.div>

            {/* Device selector strip — below the 3D tilt container so it's always flat */}
            <div className="flex items-center justify-center gap-3 mt-5">
              {deviceLabels.map(({ icon: Icon, label }, i) => (
                <button
                  key={i}
                  onClick={() => goToDevice(i)}
                  className="flex items-center gap-1.5 transition-all duration-300"
                  style={{
                    background: i === deviceIndex ? "rgba(124,58,237,0.1)" : "transparent",
                    border: `1px solid ${i === deviceIndex ? "rgba(124,58,237,0.3)" : "rgba(224,231,255,0.8)"}`,
                    borderRadius: 50,
                    padding: "5px 12px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  <Icon
                    className="h-3 w-3"
                    style={{ color: i === deviceIndex ? "#7C3AED" : "#9CA3AF" }}
                  />
                  <span style={{ fontSize: 11, fontWeight: 700, color: i === deviceIndex ? "#7C3AED" : "#9CA3AF" }}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-bounce absolute pointer-events-none" style={{ bottom: 28, left: "50%" }}>
        <ChevronDown className="h-5 w-5" style={{ color: "rgba(124,58,237,0.35)" }} />
      </div>
    </section>
  );
}
