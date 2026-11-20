import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView, useReducedMotion } from "motion/react";
import { CalendarCheck, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { trackEvent } from "../lib/analytics";

interface HeroProps {
  onOpenContact: () => void;
}

const words = ["that Works", "that Sells", "that Grows", "that Converts"];
const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/* Google Business Profile — update GOOGLE_RATING / GOOGLE_REVIEWS when new reviews come in. */
const GOOGLE_PROFILE_URL = "https://maps.app.goo.gl/yh6dVC9XGrWq6yzw6";
const GOOGLE_RATING = "5.0";
const GOOGLE_REVIEWS = 3;

/* The hero leads with real client work: three live sites, stacked. */
const showcase = [
  { name: "Vrise Global",       domain: "vriseglobal.co.in", src: "/hero-vrise.webp" },
  { name: "Master Salon",       domain: "master-salon.com",  src: "/hero-master-salon.webp" },
  { name: "FeX Foundry Alloys", domain: "fexalloys.com",     src: "/hero-fex.webp" },
];

function Window({ domain, src, name, eager }: { domain: string; src: string; name: string; eager?: boolean }) {
  return (
    <div
      className="overflow-hidden bg-white"
      style={{ borderRadius: 14, boxShadow: "0 30px 70px -20px rgba(30,27,75,0.35), 0 0 0 1px rgba(30,27,75,0.08)" }}
    >
      <div className="flex items-center gap-2 px-3.5" style={{ height: 32, background: "#F4F5FA", borderBottom: "1px solid rgba(30,27,75,0.07)" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#D4D7E3" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#D4D7E3" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#D4D7E3" }} />
        <span className="ml-2 truncate" style={{ fontSize: 11, fontWeight: 600, color: "#6B7280" }}>{domain}</span>
      </div>
      <img
        src={src}
        alt={`${name} website, built by Webwala Studio`}
        width={1365}
        height={853}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="block w-full"
        style={{ aspectRatio: "16 / 10", objectFit: "cover", objectPosition: "top" }}
      />
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────────────────
 * ShowcaseStack — three live client sites, dealt like cards.
 * Every few seconds the front site slides out to the lower left, slips behind
 * the stack while it's faint, and settles at the back; the other two step
 * forward one after the other. It only runs while the hero is on screen and the
 * tab is visible, pauses under the pointer, and stays still for reduced motion.
 * ──────────────────────────────────────────────────────────────────────────── */
const SLOT_OPACITY = [1, 0.9, 0.6];
const SLOT_SCALE = [1, 0.95, 0.9];
const CYCLE_MS = 4200;
const DEAL_MS = 1250;
const DEAL_LIFT_MS = DEAL_MS * 0.55;

function ShowcaseStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [front, setFront] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [step, setStep] = useState(17); // px offset between cards
  const prevFront = useRef(front);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setStep(mq.matches ? 10 : 17);
    const vis = () => setTabHidden(document.hidden);
    sync(); vis();
    mq.addEventListener("change", sync);
    document.addEventListener("visibilitychange", vis);
    return () => { mq.removeEventListener("change", sync); document.removeEventListener("visibilitychange", vis); };
  }, []);

  const running = !reduceMotion && !paused && !tabHidden && inView;
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => goTo((front + 1) % showcase.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [running, front]);

  // The card that just left the front takes the "dealt away" path. It stays on
  // top of the stack until it has faded (DEAL_LIFT_MS), then drops behind.
  const [leaving, setLeaving] = useState<number | null>(null);
  const [lifted, setLifted] = useState(false);
  const goTo = (next: number) => {
    if (next === prevFront.current) return;
    setLeaving(prevFront.current);
    setLifted(true);
    prevFront.current = next;
    setFront(next);
  };
  useEffect(() => {
    if (!lifted) return;
    const t = setTimeout(() => setLifted(false), DEAL_LIFT_MS);
    return () => clearTimeout(t);
  }, [lifted, front]);

  const n = showcase.length;
  const target = (slot: number) => ({
    x: slot * step,
    y: -slot * step,
    scale: SLOT_SCALE[slot],
    opacity: SLOT_OPACITY[slot],
    rotate: 0,
  });

  return (
    <div ref={ref} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <Link to="/#portfolio" aria-label="See the sites we've built" className="hero-stack" style={{ textDecoration: "none" }}>
        {showcase.map((site, i) => {
          const slot = (i - front + n) % n;
          const dealtAway = i === leaving && slot !== 0;
          const end = target(slot);

          const animate = dealtAway
            ? {
                // out to the lower left, fade, slip behind while faint, settle at the back
                x: [0, -step * 3.2, -step * 2, end.x],
                y: [0, step * 2.2, step * 0.6, end.y],
                rotate: [0, -3.5, -1.5, 0],
                scale: [1, 0.94, 0.9, end.scale],
                opacity: [1, 0.15, 0.1, end.opacity],
              }
            : end;
          const transition = dealtAway
            ? { duration: DEAL_MS / 1000, times: [0, 0.42, 0.62, 1], ease: [0.45, 0, 0.2, 1] as const }
            : { duration: 0.95, ease: EASE, delay: 0.12 + (n - 1 - slot) * 0.09 };

          return (
            <motion.div
              key={site.domain}
              className="hero-stack-card"
              aria-hidden={slot !== 0}
              initial={false}
              animate={animate}
              transition={transition}
              style={{
                pointerEvents: slot === 0 ? "auto" : "none",
                zIndex: dealtAway && lifted ? n + 1 : n - slot,
              }}
            >
              <Window {...site} eager={i === 0} />
            </motion.div>
          );
        })}
      </Link>
      <p className="mt-6 lg:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-1.5 gap-y-1" style={{ fontSize: 13, color: "#6B7280", fontWeight: 600 }}>
        <span>Recent launches:</span>
        {showcase.map((site, i) => (
          <span key={site.domain} className="inline-flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-pressed={i === front}
              className="hero-stack-pick"
              style={{ color: i === front ? "#1E1B4B" : "#6B7280" }}
            >
              {site.name}
            </button>
            {i < showcase.length - 1 && <span aria-hidden>·</span>}
          </span>
        ))}
      </p>
    </div>
  );
}

export default function Hero({ onOpenContact }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIndex(i => (i + 1) % words.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F3F1FF 0%, #F8FAFF 70%)",
        padding: "128px 5% 64px",
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto relative">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-12 items-center">

          {/* ── Copy ── */}
          <div>
            <h1
              className="font-display font-black mb-7"
              style={{ fontSize: "clamp(40px, 6vw, 76px)", lineHeight: 1.02, letterSpacing: "-0.035em", color: "#1E1B4B" }}
            >
              {"Your Business Deserves a Website".split(" ").map((w, i) => (
                <span key={i}>
                  <span className="fx-word-mask">
                    <motion.span
                      className="fx-word"
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, delay: 0.05 + i * 0.06, ease: EASE }}
                    >
                      {w}
                    </motion.span>
                  </span>{" "}
                </span>
              ))}
              {/* The rotating phrase always gets its own line with a fixed height, so
                  swapping a short word ("that Sells") for a long one ("that Converts")
                  never re-wraps the headline or moves the content below it. */}
              <span style={{ display: "block", height: "1.08em", whiteSpace: "nowrap" }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={wordIndex}
                    className="grad"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{ display: "inline-block" }}
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-9 max-w-[34rem]"
              style={{ fontSize: 18, color: "#4B5563", lineHeight: 1.7 }}
            >
              We build professional, mobile-ready websites for businesses across Delhi NCR — and clients in the USA, Canada & UAE. No hassle, no hidden fees, delivered in under 7 days.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="flex items-center flex-wrap gap-x-7 gap-y-4 mb-10"
            >
              <button
                onClick={onOpenContact}
                className="btn-gradient inline-flex items-center gap-2"
                style={{ padding: "16px 30px", borderRadius: 50, fontSize: 15, fontWeight: 700 }}
              >
                <CalendarCheck className="h-4 w-4" />
                Book Free Consultation
              </button>
              <Link
                to="/#portfolio"
                className="fx-underline inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded"
                style={{ fontSize: 15, fontWeight: 700, color: "#1E1B4B", textDecoration: "none" }}
              >
                See our work <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Stats — plain figures, no chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-8"
            >
              {[
                { value: "7 Days", label: "Delivery" },
                { value: "100%", label: "Mobile First" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-8">
                  {i > 0 && <span aria-hidden style={{ width: 1, height: 36, background: "rgba(30,27,75,0.12)" }} />}
                  <div>
                    <div className="font-display font-black" style={{ fontSize: 28, color: "#1E1B4B", letterSpacing: "-0.03em", lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#6B7280", marginTop: 6 }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Google rating — links to the Business Profile so visitors can check it */}
            <motion.a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("google_profile_click", { source: "hero" })}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="google-rating inline-flex items-center gap-2.5 sm:gap-3 mt-8"
              aria-label={`Rated ${GOOGLE_RATING} out of 5 on Google from ${GOOGLE_REVIEWS} reviews — view our Google Business Profile (opens in a new tab)`}
            >
              <svg viewBox="0 0 48 48" className="h-5 w-5 shrink-0" aria-hidden="true">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/>
              </svg>
              <span className="flex items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                ))}
              </span>
              <span style={{ fontSize: 14, color: "#4B5563", fontWeight: 600, whiteSpace: "nowrap" }}>
                <strong style={{ color: "#1E1B4B", fontWeight: 800 }}>{GOOGLE_RATING}</strong> on Google · {GOOGLE_REVIEWS} reviews
              </span>
              <ArrowUpRight className="google-rating-arrow hidden sm:block h-4 w-4" style={{ color: "#6B7280" }} aria-hidden="true" />
            </motion.a>
          </div>

          {/* ── Real work, stacked ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            <ShowcaseStack />
          </motion.div>
        </div>

        {/* Trust strip */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-7"
          style={{ borderTop: "1px solid rgba(30,27,75,0.08)", marginTop: 80, paddingTop: 36 }}
        >
          {[
            { title: "Modern & Responsive Designs", description: "Looks great on all devices." },
            { title: "Fast Loading Websites", description: "Better user experience & higher conversions." },
            { title: "SEO Friendly Structure", description: "Built to rank higher on Google." },
            { title: "Secure & Reliable", description: "Your website and data are always protected." },
            { title: "Clear Communication & On-Time Delivery", description: "We keep you updated at every step." },
            { title: "Affordable Pricing for International Clients", description: "Great quality at fair and transparent rates." },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-display font-extrabold" style={{ fontSize: 14, color: "#1E1B4B", lineHeight: 1.35, marginBottom: 6 }}>
                {item.title}
              </h3>
              <p className="font-sans" style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.55 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
