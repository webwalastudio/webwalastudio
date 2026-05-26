/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, X, ShieldAlert } from "lucide-react";

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
        { name: "Basic SEO Setup", active: true },
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
        { name: "CMS for Blog/Notices", active: true },
        { name: "1 Year Free Hosting", active: true },
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
        { name: "Premium Support", active: true },
      ],
      featured: false,
      ctaText: "Get Quote",
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-bg-cream scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Title segment */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            Transparent Pricing, No Surprises
          </h2>
          <p className="font-sans text-lg text-brand-navy/70 leading-relaxed">
            One-time payment for the build. Affordable annual maintenance. Pick the plan that fits your current needs.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto mb-20">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white p-8 rounded-xl border flex flex-col justify-between transition-all duration-300 relative ${
                plan.featured
                  ? "border-2 border-primary shadow-xl transform md:-translate-y-4 z-10"
                  : "border-brand-navy/10 shadow-md hover:shadow-lg"
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
                      <span
                        className={`font-sans text-sm ${
                          feature.active ? "text-brand-navy font-semibold" : "text-brand-navy/40 line-through"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onOpenContact(`${plan.name} (${plan.price})`)}
                className={`w-full py-3.5 text-center font-sans font-bold text-sm rounded-lg cursor-pointer transition-all ${
                  plan.featured
                    ? "bg-primary text-white hover:bg-primary-container shadow-md"
                    : "border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                }`}
              >
                {plan.ctaText}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
