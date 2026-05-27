/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Check, X } from "lucide-react";

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
    <section id="pricing" className="py-24 bg-bg-cream scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Title */}
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            Transparent Pricing, No Surprises
          </h2>
          <p className="font-sans text-lg text-brand-navy/70 leading-relaxed">
            One-time payment for the build. Affordable annual maintenance. Pick the plan that fits your current needs.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={!plan.featured ? { y: -6, scale: 1.01 } : {}}
              className={`bg-white p-8 rounded-xl border flex flex-col justify-between relative ${
                plan.featured
                  ? "border-2 border-primary shadow-xl glow-ring md:-translate-y-4 z-10"
                  : "border-brand-navy/10 shadow-md hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-sans font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">{plan.name}</h3>
                <p className="font-sans text-sm text-brand-navy/60 mb-6 font-semibold">{plan.description}</p>
                <div className="mb-8">
                  <span className="font-display text-4xl block font-bold text-brand-navy tracking-tight">{plan.price}</span>
                  {plan.id === "business-pro" && (
                    <span className="font-sans text-xs text-brand-navy/50 block mt-1">Starting from</span>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3">
                      {feature.active ? (
                        <Check className="h-5 w-5 text-primary shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-brand-navy/20 shrink-0" />
                      )}
                      <span className={`font-sans text-sm ${feature.active ? "text-brand-navy font-semibold" : "text-brand-navy/40 line-through"}`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onOpenContact(`${plan.name} (${plan.price})`)}
                className={`btn-shine w-full py-3.5 text-center font-sans font-bold text-sm rounded-lg cursor-pointer transition-all ${
                  plan.featured
                    ? "bg-primary text-white hover:bg-primary/90 shadow-md"
                    : "border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                }`}
              >
                {plan.ctaText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
