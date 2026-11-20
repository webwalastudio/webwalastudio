/**
 * Shared interaction primitives used across the marketing pages.
 *
 * Deliberately small: headings that rise into view, a staggered list reveal, and
 * a gentle hover on cards. Text is always fully rendered by SSR, the hover only
 * switches on for a fine pointer, and everything stands down under
 * `prefers-reduced-motion`.
 */
import {
  Fragment, useEffect, useRef, useState,
  type CSSProperties, type ElementType, type PointerEvent, type ReactNode,
} from "react";
import { motion, useInView, useReducedMotion, useSpring, useTransform } from "motion/react";

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
 * SpotlightCard — a soft cursor-following glow and a small lift on hover.
 * The glow is pure CSS (radial-gradient driven by --mx/--my) so moving the
 * pointer never re-renders React.
 * ──────────────────────────────────────────────────────────────────────────── */
interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Glow colour, any CSS colour. */
  glow?: string;
  /** Lift on hover, in px. */
  lift?: number;
  /** Extra props for the outer motion element (entrance animation, etc). */
  motionProps?: Record<string, unknown>;
}

export function SpotlightCard({
  children, className = "", style, glow = "rgba(124,58,237,0.12)", lift = 4, motionProps,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichPointer();
  const hover = useSpring(0, { stiffness: 260, damping: 26 });
  const y = useTransform(hover, [0, 1], [0, -lift]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!rich || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      className={`fx-spotlight ${className}`}
      onPointerMove={onMove}
      onPointerEnter={() => { if (rich) hover.set(1); }}
      onPointerLeave={() => hover.set(0)}
      {...motionProps}
      style={{ ...style, ["--glow" as string]: glow, ...(rich ? { y } : {}) }}
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

/* Stagger helpers for lists that reveal on scroll. */
export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
export const staggerChild = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};
