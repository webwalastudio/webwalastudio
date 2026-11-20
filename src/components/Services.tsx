import { motion } from "motion/react";
import { RevealText, SpotlightCard, staggerParent, staggerChild } from "./fx";
import type { LucideIcon } from "lucide-react";
import {
  School, HeartPulse, Briefcase, Scissors,
  Coffee, ShoppingBag, Building2, Scale, Calculator,
} from "lucide-react";

/**
 * `size` drives real grid spans via the .bento-* classes in index.css:
 * sm = 2 cols, lg = 4 cols, wide = full 6-col row.
 */
type ServiceSize = "wide" | "lg" | "sm";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  size: ServiceSize;
}

const services: ServiceItem[] = [
  {
    id: "education",
    title: "Schools & Institutes",
    description: "Notice boards, admission forms, gallery, and parent portals structured for educational clarity.",
    icon: School,
    features: ["Parent Portal Registration", "Virtual Notice Board", "Online Fee Collections", "Academic Gallery Page"],
    size: "lg",
  },
  {
    id: "medical",
    title: "Medical & Clinics",
    description: "Appointment booking, doctor profiles, and testimonials designed to build trust.",
    icon: HeartPulse,
    features: ["Doctor Scheduling Form", "Patient Feedback Logs", "Clinical Services Index", "Emergency Telehealth Portal"],
    size: "sm",
  },
  {
    id: "corporate",
    title: "Corporate Business",
    description: "Professional portfolios, team directories, and lead generation forms.",
    icon: Briefcase,
    features: ["Lead Capture CRM Form", "Interactive Service Catalog", "Office Team Bios", "Annual Report Resource"],
    size: "sm",
  },
  {
    id: "beauty",
    title: "Salons & Spas",
    description: "Visual-heavy galleries, service menus, and easy online booking.",
    icon: Scissors,
    features: ["Service Pricing Sheet", "Stylist Slot Booking", "Before & After Gallery", "Google Maps Integration"],
    size: "sm",
  },
  {
    id: "restaurant",
    title: "Restaurants & Cafes",
    description: "Digital menus, reservation forms, and vibrant photo galleries.",
    icon: Coffee,
    features: ["Interactive Contactless Menu", "Reservation Slot Checker", "Special Offer Promos", "Visual Chef Gallery"],
    size: "sm",
  },
  {
    id: "realestate",
    title: "Real Estate & Builders",
    description: "Property listings, EMI calculators, and virtual tours built for serious buyers.",
    icon: Building2,
    features: ["Property Listing Grid", "EMI / Loan Calculator", "Virtual Tour Embed", "Site Visit Booking Form"],
    size: "sm",
  },
  {
    id: "legal",
    title: "Law Firms",
    description: "Practice area pages, attorney profiles, and confidential case inquiry forms that build credibility.",
    icon: Scale,
    features: ["Practice Area Pages", "Attorney Profile Directory", "Confidential Case Inquiry Form", "Legal Resource Blog"],
    size: "sm",
  },
  {
    id: "accounting",
    title: "CA & Accounting Firms",
    description: "Service breakdowns, secure document uploads, and appointment booking for tax season traffic.",
    icon: Calculator,
    features: ["Secure Document Upload Portal", "Tax Filing Appointment Booking", "Services & Practice Areas Overview", "GST / Compliance Resource Hub"],
    size: "sm",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Stores",
    description: "Full product catalogs, shopping carts, secure payment gateways, and inventory management setups.",
    icon: ShoppingBag,
    features: ["Stripe / PayPal Gateway Setup", "Product Catalog Grid", "Shopping Cart Overlay", "Dynamic Stock Tracker UI"],
    size: "wide",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-24 bg-white scroll-mt-10" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-[1200px] mx-auto px-[5%] relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-14 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 32, rotateX: 6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ transformPerspective: 800 }}
        >
          <span className="section-label">OUR SERVICES</span>
          <RevealText
            text="Tailored Solutions for"
            accent="Every Industry"
            className="font-display font-black mb-4"
            style={{ fontSize: "clamp(32px, 4.6vw, 56px)", lineHeight: 1.06, letterSpacing: "-0.03em", color: "var(--text-dark)" }}
          />
          <p className="font-sans" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
            We understand that a clinic needs different features than a restaurant. Here's exactly
            what's built into your website, by industry.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="services-bento">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isAnchor = service.size !== "sm";

            return (
              <SpotlightCard
                key={service.id}
                className={`bento-${service.size} group transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(99,102,241,0.16)]`}
                motionProps={{
                  initial: { opacity: 0, y: 28, scale: 0.97 },
                  whileInView: { opacity: 1, y: 0, scale: 1 },
                  viewport: { once: true, margin: "-40px" },
                  transition: { duration: 0.6, delay: (index % 3) * 0.08, ease: [0.21, 0.47, 0.32, 0.98] },
                }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  background: "white",
                  border: "1.5px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: isAnchor ? 32 : 24,
                  display: "flex",
                  gap: isAnchor ? 20 : 14,
                }}
              >
                {/* Gradient rule marks the two anchor industries only — on every
                    card it was wallpaper and signalled no hierarchy at all. */}
                {isAnchor && (
                  <span
                    aria-hidden="true"
                    style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #0EA5E9, #7C3AED)" }}
                  />
                )}

                <div className="bento-copy">
                  {/* Icon + title */}
                  <div className="flex items-center gap-3">
                    <div
                      className="bento-icon fx-icon flex items-center justify-center shrink-0"
                      style={{ width: isAnchor ? 52 : 44, height: isAnchor ? 52 : 44, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)" }}
                    >
                      <Icon className={isAnchor ? "h-6 w-6" : "h-5 w-5"} style={{ color: "var(--violet-mid)" }} />
                    </div>
                    <h3
                      className="font-display font-extrabold"
                      style={{ fontSize: isAnchor ? 22 : 16, color: "var(--text-dark)", lineHeight: 1.25, letterSpacing: "-0.3px" }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <p
                    className="font-sans"
                    style={{ fontSize: isAnchor ? 15 : 13.5, color: "#4B5563", lineHeight: 1.65, marginTop: 14 }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Every spec is always visible on every card — no truncation. */}
                <motion.div
                  className="bento-specs flex flex-wrap gap-2"
                  variants={staggerParent}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                >
                  {service.features.map((feature) => (
                    <motion.span
                      variants={staggerChild}
                      key={feature}
                      className="font-sans font-semibold transition-colors duration-200 hover:bg-white! hover:border-[rgba(124,58,237,0.35)]! hover:text-[#6D28D9]!"
                      style={{ fontSize: 12, color: "var(--text-dark)", background: "var(--surface)", border: "1px solid var(--border)", padding: "6px 12px", borderRadius: 50 }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </motion.div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
