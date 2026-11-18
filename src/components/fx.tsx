/**
 * Shared interaction primitives used across the marketing pages.
 *
 * Every effect here is decoration layered on top of content that is already
 * fully rendered by SSR: text never depends on JS to exist, pointer effects only
 * switch on for a fine pointer (mouse/trackpad), and all of them stand down
 * under `prefers-reduced-motion`.
 */
import {
  Fragment, useEffect, useRef, useState,
  type CSSProperties, type ElementType, type PointerEvent, type ReactNode,
} from "react";
import {
  motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform, animate,
} from "motion/react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/** True only on devices with a hover-capable fine pointer and motion allowed. */
export function useRichPointer() {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine && !reduce;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * SpotlightCard — a cursor-following glow plus a gentle 3D tilt.
 * The glow is pure CSS (radial-gradient driven by --mx/--my) so moving the
 * pointer never re-renders React; the tilt runs on motion values.
 * ──────────────────────────────────────────────────────────────────────────── */
interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Max tilt in degrees. 0 disables tilt but keeps the glow. */
  tilt?: number;
  /** Glow colour, any CSS colour. */
  glow?: string;
  /** Lift on hover, in px. */
  lift?: number;
  /** Extra props for the outer motion element (entrance animation, etc). */
  motionProps?: Record<string, unknown>;
}

export function SpotlightCard({
  children, className = "", style, tilt = 6, glow = "rgba(124,58,237,0.16)", lift = 6, motionProps,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichPointer();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 180, damping: 20 });
  const sy = useSpring(py, { stiffness: 180, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [tilt, -tilt]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-tilt, tilt]);
  const hover = useSpring(0, { stiffness: 260, damping: 24 });
  const y = useTransform(hover, [0, 1], [0, -lift]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!rich || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const yy = e.clientY - r.top;
    ref.current.style.setProperty("--mx", `${x}px`);
    ref.current.style.setProperty("--my", `${yy}px`);
    px.set(x / r.width - 0.5);
    py.set(yy / r.height - 0.5);
  };
  const onEnter = () => { if (rich) hover.set(1); };
  const onLeave = () => { px.set(0); py.set(0); hover.set(0); };

  return (
    <motion.div
      ref={ref}
      className={`fx-spotlight ${className}`}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      {...motionProps}
      style={{
        ...style,
        ["--glow" as string]: glow,
        ...(rich ? { rotateX, rotateY, y, transformPerspective: 1000 } : {}),
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Magnetic — the wrapped element drifts toward the cursor while hovered.
 * ──────────────────────────────────────────────────────────────────────────── */
export function Magnetic({ children, strength = 0.28, className = "", style }: {
  children: ReactNode; strength?: number; className?: string; style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichPointer();
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.6 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.6 });

  return (
    <motion.div
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ ...style, x, y }}
      onPointerMove={(e) => {
        if (!rich || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * RevealText — splits a heading into words that rise out of a mask on view.
 * The words are real text nodes, so SEO and screen readers see the sentence
 * exactly as before. `accent` renders after `text` with its own class (e.g.
 * the gradient span used in several headings).
 * ──────────────────────────────────────────────────────────────────────────── */
export function RevealText({
  text, accent, accentClassName = "grad", as = "h2", className, style, delay = 0,
}: {
  text: string;
  accent?: string;
  accentClassName?: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  const Tag = as;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  const parts: { word: string; accent: boolean }[] = [
    ...text.split(" ").filter(Boolean).map((w) => ({ word: w, accent: false })),
    ...(accent ? accent.split(" ").filter(Boolean).map((w) => ({ word: w, accent: true })) : []),
  ];

  return (
    <Tag ref={ref} className={className} style={style}>
      {parts.map((p, i) => (
        <Fragment key={i}>
          <span className="fx-word-mask">
            <motion.span
              className={`fx-word ${p.accent ? accentClassName : ""}`}
              initial={reduce ? false : { y: "105%", rotate: 4, opacity: 0 }}
              animate={inView ? { y: "0%", rotate: 0, opacity: 1 } : undefined}
              transition={{ duration: 0.7, delay: delay + i * 0.05, ease: EASE }}
            >
              {p.word}
            </motion.span>
          </span>
          {i < parts.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * CountUp — animates the numeric part of a string ("₹28,000", "7 Days",
 * "100%") once it scrolls into view. SSR and no-JS render the final value.
 * ──────────────────────────────────────────────────────────────────────────── */
export function CountUp({ value, duration = 1.4, className, style }: {
  value: string; duration?: number; className?: string; style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const reduce = useReducedMotion();
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);

  useEffect(() => {
    if (!inView || reduce || !match || !ref.current) return;
    const [, prefix, num, suffix] = match;
    const target = parseInt(num.replace(/,/g, ""), 10);
    const grouped = num.includes(",");
    const el = ref.current;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const n = Math.round(v);
        el.textContent = prefix + (grouped ? n.toLocaleString("en-IN") : String(n)) + suffix;
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value, duration]);

  return <span ref={ref} className={className} style={style}>{value}</span>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * CursorAura — a soft ring that trails the pointer and swells over anything
 * clickable. Desktop only; the native cursor is never hidden.
 * ──────────────────────────────────────────────────────────────────────────── */
export function CursorAura() {
  const rich = useRichPointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!rich) return;
    const move = (e: globalThis.PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      setActive(!!t?.closest?.("a, button, [role='button'], input, select, textarea, label"));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [rich, x, y]);

  if (!rich) return null;
  return (
    <motion.div
      aria-hidden
      className="fx-cursor"
      style={{ x: sx, y: sy }}
      animate={{
        scale: active ? 1.9 : 1,
        opacity: visible ? 1 : 0,
        backgroundColor: active ? "rgba(124,58,237,0.10)" : "rgba(124,58,237,0)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * PointerGlow — a large soft light that follows the pointer inside its parent
 * section (parent must be `position: relative`).
 * ──────────────────────────────────────────────────────────────────────────── */
export function PointerGlow({ color = "rgba(124,58,237,0.14)", size = 640 }: { color?: string; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichPointer();
  const x = useSpring(0, { stiffness: 60, damping: 20 });
  const y = useSpring(0, { stiffness: 60, damping: 20 });
  const opacity = useSpring(0, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!rich || !parent) return;
    const move = (e: globalThis.PointerEvent) => {
      const r = parent.getBoundingClientRect();
      x.set(e.clientX - r.left - size / 2);
      y.set(e.clientY - r.top - size / 2);
      opacity.set(1);
    };
    const leave = () => opacity.set(0);
    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerleave", leave);
    return () => {
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
    };
  }, [rich, size, x, y, opacity]);

  if (!rich) return <div ref={ref} hidden />;
  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="absolute top-0 left-0 pointer-events-none"
      style={{
        x, y, opacity, width: size, height: size, borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
        zIndex: 1,
      }}
    />
  );
}

/* Stagger helpers for lists that reveal on scroll. */
export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
export const staggerChild = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};
