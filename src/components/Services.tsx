import { useState, useRef } from "react";
import type { ReactNode, CSSProperties } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  School, HeartPulse, Briefcase, Scissors,
  Coffee, ShoppingBag, ArrowRight, LayoutGrid,
} from "lucide-react";

const services = [
  {
    id: "education",
    title: "Schools & Institutes",
    description: "Notice boards, admission forms, gallery, and parent portals structured for educational clarity.",
    icon: School,
    features: ["Parent Portal Registration", "Virtual Notice Board", "Online Fee Collections", "Academic Gallery Page"],
  },
  {
    id: "medical",
    title: "Medical & Clinics",
    description: "Appointment booking, doctor profiles, services list, and patient testimonials designed to build trust.",
    icon: HeartPulse,
    features: ["Doctor Scheduling Form", "Patient Feedback Logs", "Clinical Services Index", "Emergency Telehealth Portal"],
  },
  {
    id: "corporate",
    title: "Corporate Business",
    description: "Professional portfolios, team directories, service catalogs, and lead generation forms.",
    icon: Briefcase,
    features: ["Lead Capture CRM Form", "Interactive Service Catalog", "Office Team Bios", "Annual Report Resource"],
  },
  {
    id: "beauty",
    title: "Salons & Spas",
    description: "Visual-heavy galleries, service menus with pricing, and easy online booking integrations.",
    icon: Scissors,
    features: ["Service Pricing Sheet", "Stylist Slot Booking", "Before & After Visuals Gallery", "Google Maps Location integration"],
  },
  {
    id: "restaurant",
    title: "Restaurants & Cafes",
    description: "Digital menus, location maps, reservation forms, and vibrant photo galleries to showcase your food.",
    icon: Coffee,
    features: ["Interactive Contactless Menu", "Reservation Slot Checker", "Special Offer Promos Frame", "Visual Chef Gallery"],
  },
  {
    id: "ecommerce",
    title: "E-Commerce Stores",
    description: "Full product catalogs, shopping carts, secure payment gateways, and inventory management setups.",
    icon: ShoppingBag,
    features: ["Stripe / PayPal Gateway Setup", "Product Catalog Grid", "Shopping Cart Overlay", "Dynamic Stock Tracker UI"],
  },
];

/* ── Per-card 3D tilt wrapper ── */
function TiltCard({
  children,
  onClick,
  isSelected,
  className,
  style,
}: {
  children: ReactNode;
  onClick: () => void;
  isSelected: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 24 });
  const sy = useSpring(my, { stiffness: 220, damping: 24 });
  const rotateX = useTransform(sy, [-1, 1], [6, -6]);
  const rotateY = useTransform(sx, [-1, 1], [-7, 7]);

  const onMove = (e: { clientX: number; clientY: number }) => {
    if (isSelected) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`cursor-pointer ${className ?? ""}`}
      style={{ perspective: "900px", ...style }}
      whileHover={!isSelected ? { y: -4 } : {}}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        style={{
          rotateX: isSelected ? 0 : rotateX,
          rotateY: isSelected ? 0 : rotateY,
          transformStyle: "preserve-3d",
          height: "100%",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function BlueprintPanel({ service }: { service: typeof services[0] }) {
  const Icon = service.icon;
  return (
    <div className="text-left animate-in fade-in duration-200">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex items-center justify-center"
          style={{ width: 40, height: 40, borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <Icon className="h-5 w-5" style={{ color: "var(--violet-mid)" }} />
        </div>
        <div>
          <span style={{ fontSize: 10, fontWeight: 700, color: "var(--violet-mid)", letterSpacing: "1.5px", textTransform: "uppercase" as const }}>
            Custom Spec
          </span>
          <h4 className="font-display font-extrabold" style={{ fontSize: 15, color: "var(--text-dark)" }}>
            {service.title}
          </h4>
        </div>
      </div>
      <p className="font-sans mb-4 leading-relaxed" style={{ fontSize: 14, color: "#4B5563" }}>
        Every Webwala Studio build includes strategic sitemap layout and high-performance custom features built from the ground up:
      </p>
      <div className="space-y-3">
        {service.features.map((feature, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3"
            style={{ background: "white", borderRadius: 10, border: "1px solid var(--border)" }}
          >
            <span
              className="w-5 h-5 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5"
              style={{ borderRadius: "50%", background: "rgba(14,165,233,0.12)", color: "#0EA5E9" }}
            >
              {i + 1}
            </span>
            <span className="font-sans font-bold leading-tight" style={{ fontSize: 13, color: "var(--text-dark)" }}>
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const currentService = services.find((s) => s.id === selectedCategory);

  return (
    <section id="services" className="py-24 bg-white scroll-mt-10" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-[1200px] mx-auto px-[5%]">
        {/* Title */}
        <motion.div
          className="text-center mb-14 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="section-label">OUR SERVICES</span>
          <h2
            className="font-display font-black mb-4"
            style={{ fontSize: "clamp(26px, 3.2vw, 42px)", letterSpacing: "-1.2px", color: "var(--text-dark)" }}
          >
            Tailored Solutions for Every Industry
          </h2>
          <p className="font-sans" style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7 }}>
            We understand that a clinic needs different features than a restaurant. Our solutions are
            custom-built for your specific business needs. Select an industry card to view planned custom features!
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Cards */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-[18px]">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isSelected = selectedCategory === service.id;
              return (
                <div key={service.id} className="contents">
                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: index * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
                  >
                    <TiltCard
                      onClick={() => setSelectedCategory(isSelected ? null : service.id)}
                      isSelected={isSelected}
                      className="p-7 h-full"
                      style={{
                        border: `1.5px solid ${isSelected ? "#7C3AED" : "#E0E7FF"}`,
                        borderRadius: "var(--radius)",
                        background: isSelected
                          ? "linear-gradient(135deg, #F5F3FF, #EDE9FE)"
                          : "white",
                        boxShadow: isSelected
                          ? "0 8px 40px rgba(124,58,237,0.14)"
                          : "0 2px 12px rgba(99,102,241,0.04)",
                        transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
                      }}
                    >
                      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        {/* Icon block */}
                        <div
                          className="flex items-center justify-center mb-4"
                          style={{
                            width: 48, height: 48, borderRadius: 12,
                            background: isSelected
                              ? "linear-gradient(135deg, #EDE9FE, #DDD6FE)"
                              : "var(--surface)",
                            border: `1px solid ${isSelected ? "#DDD6FE" : "var(--border)"}`,
                            boxShadow: isSelected ? "0 4px 16px rgba(124,58,237,0.16)" : "none",
                            transition: "all 0.25s",
                          }}
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{ color: isSelected ? "#7C3AED" : "#0EA5E9" }}
                          />
                        </div>

                        <h3
                          className="font-display font-extrabold mb-2"
                          style={{ fontSize: 15, color: "var(--text-dark)" }}
                        >
                          {service.title}
                        </h3>
                        <p
                          className="font-sans leading-relaxed mb-5 flex-1"
                          style={{ fontSize: 14, color: "#4B5563" }}
                        >
                          {service.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span
                            className="font-sans font-bold"
                            style={{ fontSize: 13, color: isSelected ? "#7C3AED" : "#9CA3AF" }}
                          >
                            {isSelected ? "Click to close" : "Click to view structure"}
                          </span>
                          <ArrowRight
                            className="h-4 w-4"
                            style={{
                              color: isSelected ? "#7C3AED" : "#0EA5E9",
                              transform: isSelected ? "rotate(90deg)" : "none",
                              transition: "transform 0.25s",
                            }}
                          />
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>

                  {/* Inline blueprint — mobile only */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="lg:hidden md:col-span-2 p-6"
                      style={{
                        background: "linear-gradient(135deg, #F0F9FF, #F5F3FF)",
                        border: "1.5px solid var(--border)",
                        borderRadius: "var(--radius)",
                      }}
                    >
                      <BlueprintPanel service={service} />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Blueprint panel — desktop */}
          <div className="hidden lg:block">
            <div
              className="sticky top-28 min-h-[400px] flex flex-col justify-between p-6"
              style={{
                background: currentService
                  ? "white"
                  : "linear-gradient(135deg, #F0F9FF, #F5F3FF)",
                border: `1.5px ${currentService ? "solid" : "dashed"} var(--border)`,
                borderRadius: "var(--radius)",
                boxShadow: currentService ? "0 8px 40px rgba(99,102,241,0.08)" : "none",
                transition: "all 0.3s",
              }}
            >
              {currentService ? (
                <motion.div
                  key={currentService.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <BlueprintPanel service={currentService} />
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                  <div
                    className="flex items-center justify-center w-16 h-16 mb-6"
                    style={{ borderRadius: "50%", border: "1.5px dashed var(--border)" }}
                  >
                    <LayoutGrid className="h-6 w-6" style={{ color: "#9CA3AF" }} />
                  </div>
                  <h4
                    className="font-display font-extrabold mb-2"
                    style={{ fontSize: 15, color: "var(--text-dark)" }}
                  >
                    Interactive Blueprint Spec
                  </h4>
                  <p
                    className="font-sans leading-relaxed max-w-xs"
                    style={{ fontSize: 14, color: "#4B5563" }}
                  >
                    Select any industry card to inspect our planned features and custom client sitemaps.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
