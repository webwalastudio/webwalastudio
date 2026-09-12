import { motion } from "motion/react";
import { Check } from "lucide-react";

interface PricingProps {
  onOpenContact: (prefilledPlan?: string) => void;
}

export default function Pricing({ onOpenContact }: PricingProps) {
  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for new small businesses",
      price: "₹12,000",
      priceUSD: "$149",
      features: [
        { name: "Up to 5 Pages", active: true },
        { name: "Mobile Responsive", active: true },
        { name: "Contact Form", active: true },
        { name: "1 Month Free Maintenance", active: true },
        { name: "Custom Features", active: false },
      ],
      featured: false,
      ctaText: "Get Started",
    },
    {
      id: "professional",
      name: "Professional",
      description: "For growing clinics, schools, etc.",
      price: "₹28,000",
      priceUSD: "$349",
      features: [
        { name: "Up to 15 Pages", active: true },
        { name: "Mobile Responsive", active: true },
        { name: "Advanced Forms & Bookings", active: true },
        { name: "News, Blog & Notice Board", active: true },
        { name: "2 Months Free Maintenance", active: true },
      ],
      featured: true,
      ctaText: "Get Started",
    },
    {
      id: "business-pro",
      name: "Business Pro",
      description: "Full custom build & E-commerce",
      price: "₹55,000",
      priceUSD: "$699",
      features: [
        { name: "Unlimited Pages", active: true },
        { name: "E-Commerce Setup", active: true },
        { name: "Payment Gateway", active: true },
        { name: "Custom Integrations", active: true },
        { name: "3 Months Free Maintenance", active: true },
      ],
      featured: false,
      ctaText: "Get Quote",
    },
  ];

  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-24 scroll-mt-10"
      style={{
        /* Deliberately a deeper, cooler navy than the How-It-Works section so the
           page's two dark moments don't read as the same slab repeated. */
        background: "linear-gradient(170deg, #16133A 0%, #1E1B4B 45%, #241F5C 100%)",
      }}
    >
      {/* Dot grid overlay */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* Glass sphere orbs */}
      <div className="glass-sphere orb-float absolute pointer-events-none" style={{ top: "-12%", left: "-6%", width: 460, height: 460 }} />
      <div className="glass-sphere-blue orb-float-2 absolute pointer-events-none" style={{ bottom: "-12%", right: "-6%", width: 400, height: 400 }} />

      <div className="max-w-[1200px] mx-auto px-[5%] relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 32, rotateX: 6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ transformPerspective: 800 }}
        >
          <span className="section-label-dark">PRICING</span>
          <h2
            className="font-display font-black mb-4 text-white"
            style={{ fontSize: "clamp(26px, 3.2vw, 42px)", letterSpacing: "-0.6px" }}
          >
            Transparent Pricing, No Surprises
          </h2>
          <p className="font-sans" style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
            One-time payment for the build. Affordable annual maintenance. Pick the plan that fits your current needs.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`relative flex flex-col ${plan.featured ? "md:scale-[1.04]" : ""}`}
              whileHover={!plan.featured
                ? { y: -5, boxShadow: "0 20px 56px rgba(0,0,0,0.28)" }
                : { y: -4 }
              }
            >
              {/* Most Popular badge — outside border wrapper so it doesn't get clipped */}
              {plan.featured && (
                <div
                  className="absolute z-20"
                  style={{
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #0EA5E9, #7C3AED)",
                    color: "white",
                    fontSize: 11,
                    fontWeight: 800,
                    padding: "5px 18px",
                    borderRadius: 50,
                    whiteSpace: "nowrap",
                    boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
                  }}
                >
                  Most Popular
                </div>
              )}

              {plan.featured ? (
                /* On the dark section the featured plan inverts to a bright card —
                   it's the single lightest surface here, so the eye lands on it first. */
                <div className="animated-border-wrap">
                  <div
                    className="animated-border-inner"
                    style={{
                      background: "rgba(255,255,255,0.97)",
                      padding: 36,
                      boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.9), 0 24px 64px rgba(0,0,0,0.32)",
                    }}
                  >
                    <CardContent plan={plan} onOpenContact={onOpenContact} />
                  </div>
                </div>
              ) : (
                <div
                  className="flex flex-col flex-1"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(20px) saturate(160%)",
                    WebkitBackdropFilter: "blur(20px) saturate(160%)",
                    borderRadius: "var(--radius-lg)",
                    padding: 36,
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                    transition: "all 0.25s",
                  }}
                >
                  <CardContent plan={plan} onOpenContact={onOpenContact} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardContent({
  plan,
  onOpenContact,
}: {
  plan: {
    id: string;
    name: string;
    description: string;
    price: string;
    priceUSD: string;
    features: { name: string; active: boolean }[];
    featured: boolean;
    ctaText: string;
  };
  onOpenContact: (plan?: string) => void;
}) {
  /* The section runs dark, so the FEATURED plan is the light card and every other
     plan sits on dark glass — the inverse of the old light-section arrangement.
     All values below hold 5:1+ against their own surface. */
  const onLight = plan.featured;

  const c = onLight
    ? {
        tier: "var(--violet-mid)",
        muted: "#4B5563",
        subtle: "#6B7280",
        price: "var(--text-dark)",
        checkBg: "rgba(124,58,237,0.14)",
        checkFg: "#7C3AED",
        offBg: "rgba(156,163,175,0.12)",
        offFg: "#9CA3AF",
        featureOn: "var(--text-dark)",
        featureOff: "#6B7280",
      }
    : {
        tier: "#A78BFA",
        muted: "rgba(255,255,255,0.55)",
        subtle: "rgba(255,255,255,0.55)",
        price: "white",
        checkBg: "rgba(56,189,248,0.2)",
        checkFg: "#38BDF8",
        offBg: "rgba(255,255,255,0.08)",
        offFg: "rgba(255,255,255,0.45)",
        featureOn: "rgba(255,255,255,0.92)",
        featureOff: "rgba(255,255,255,0.5)",
      };

  return (
    <>
      <div className="flex-1">
        {/* Tier name */}
        <p
          className="font-sans font-black uppercase mb-1"
          style={{ fontSize: 11, letterSpacing: "1.5px", color: c.tier }}
        >
          {plan.name}
        </p>
        <p className="font-sans mb-6" style={{ fontSize: 13, color: c.muted }}>
          {plan.description}
        </p>

        {/* Price */}
        <div className="mb-8">
          {plan.id === "business-pro" && (
            <span className="font-sans block mb-1" style={{ fontSize: 12, color: c.subtle }}>
              Starting from
            </span>
          )}
          <span
            className="font-display font-black"
            style={{ fontSize: 48, letterSpacing: "-1.2px", lineHeight: 1, color: c.price }}
          >
            {plan.price}
          </span>
          <span
            className="font-sans font-semibold block mt-1"
            style={{ fontSize: 13, color: c.subtle }}
          >
            ≈ {plan.priceUSD} USD
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, fIdx) => (
            <li key={fIdx} className="flex items-center gap-3">
              {feature.active ? (
                <span
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 18, height: 18, borderRadius: "50%",
                    background: c.checkBg,
                    color: c.checkFg,
                  }}
                >
                  <Check style={{ width: 10, height: 10, strokeWidth: 3 }} />
                </span>
              ) : (
                <span
                  className="flex items-center justify-center shrink-0 font-bold"
                  style={{
                    width: 18, height: 18, borderRadius: "50%",
                    background: c.offBg,
                    color: c.offFg,
                    fontSize: 12,
                  }}
                >
                  —
                </span>
              )}
              <span
                className="font-sans"
                style={{
                  fontSize: 14,
                  fontWeight: feature.active ? 600 : 400,
                  color: feature.active ? c.featureOn : c.featureOff,
                  textDecoration: feature.active ? "none" : "line-through",
                }}
              >
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA button */}
      <button
        onClick={() => onOpenContact(`${plan.name} (${plan.price} / ${plan.priceUSD})`)}
        className="btn-shine w-full font-sans font-bold cursor-pointer transition-all duration-[250ms]"
        style={
          onLight
            ? {
                background: "linear-gradient(135deg, #0EA5E9, #7C3AED)",
                color: "white",
                border: "none",
                padding: "14px 24px",
                fontSize: 15,
                borderRadius: "var(--radius)",
                boxShadow: "0 6px 24px rgba(124,58,237,0.38)",
                fontFamily: "inherit",
              }
            : {
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.22)",
                padding: "14px 24px",
                fontSize: 15,
                borderRadius: "var(--radius)",
                fontFamily: "inherit",
              }
        }
      >
        {plan.ctaText}
      </button>
    </>
  );
}
