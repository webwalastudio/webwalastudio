/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import {
  School, HeartPulse, Briefcase, Scissors,
  Coffee, ShoppingBag, ArrowRight, Database
} from "lucide-react";

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const services = [
    {
      id: "education",
      title: "Schools & Institutes",
      description: "Notice boards, admission forms, gallery, and parent portals structured for educational clarity.",
      icon: School,
      industry: "Education / Schools",
      features: ["Parent Portal Registration", "Virtual Notice Board", "Online Fee Collections", "Academic Gallery Page"],
    },
    {
      id: "medical",
      title: "Medical & Clinics",
      description: "Appointment booking, doctor profiles, services list, and patient testimonials designed to build trust.",
      icon: HeartPulse,
      industry: "Healthcare / Medical Clinics",
      features: ["Doctor Scheduling Form", "Patient Feedback Logs", "Clinical Services Index", "Emergency Telehealth Portal"],
    },
    {
      id: "corporate",
      title: "Corporate Business",
      description: "Professional portfolios, team directories, service catalogs, and lead generation forms.",
      icon: Briefcase,
      industry: "Corporate / Consulting Office",
      features: ["Lead Capture CRM Form", "Interactive Service Catalog", "Office Team Bios", "Annual Report Resource"],
    },
    {
      id: "beauty",
      title: "Salons & Spas",
      description: "Visual-heavy galleries, service menus with pricing, and easy online booking integrations.",
      icon: Scissors,
      industry: "Beauty / Spa / Salons",
      features: ["Service Pricing Sheet", "Stylist Slot Booking", "Before & After Visuals Gallery", "Google Maps Location integration"],
    },
    {
      id: "restaurant",
      title: "Restaurants & Cafes",
      description: "Digital menus, location maps, reservation forms, and vibrant photo galleries to showcase your food.",
      icon: Coffee,
      industry: "Food / Restaurant / Cafe",
      features: ["Interactive Contactless Menu", "Reservation Slot Checker", "Special Offer Promos Frame", "Visual Chef Gallery"],
    },
    {
      id: "ecommerce",
      title: "E-Commerce Stores",
      description: "Full product catalogs, shopping carts, secure payment gateways, and inventory management setups.",
      icon: ShoppingBag,
      industry: "Retail / E-Commerce Products",
      features: ["Stripe / PayPal Gateway Setup", "Product Catalog Grid", "Shopping Cart Overlay", "Dynamic Stock Tracker UI"],
    },
  ];

  return (
    <section id="services" className="py-24 bg-white border-b border-brand-navy/10 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Title */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            Tailored Solutions for Every Industry
          </h2>
          <p className="font-sans text-lg text-brand-navy/70 leading-relaxed">
            We understand that a clinic needs different features than a restaurant. Our solutions are custom-built for your specific business needs. Select an industry card to view planned custom features!
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Service Cards */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isSelected = selectedCategory === service.id;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
                  whileHover={!isSelected ? { y: -8, scale: 1.02 } : {}}
                  onClick={() => setSelectedCategory(isSelected ? null : service.id)}
                  className={`p-6 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "bg-brand-navy text-white border-brand-navy shadow-lg"
                      : "bg-bg-cream/40 text-brand-navy border-brand-navy/5 shadow-md hover:shadow-[0_8px_30px_rgba(232,96,44,0.15)] hover:border-primary/30"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-6 transition-colors ${
                    isSelected ? "border-primary bg-bg-cream/10" : "border-primary bg-white"
                  }`}>
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3">{service.title}</h3>
                  <p className={`font-sans text-sm leading-relaxed mb-6 ${isSelected ? "text-white/80" : "text-brand-navy/70"}`}>
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`font-sans text-xs font-bold ${isSelected ? "text-neutral-300" : "text-brand-navy/60"}`}>
                      {isSelected ? "Click to close blueprint" : "Click to view structure"}
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Blueprint Drawer */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-bg-cream border border-brand-navy/10 rounded-xl p-6 shadow-md h-full min-h-[400px] flex flex-col justify-between">
              {selectedCategory ? (
                (() => {
                  const currentService = services.find((s) => s.id === selectedCategory)!;
                  const Icon = currentService.icon;
                  return (
                    <div className="text-left animate-in fade-in duration-300">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-brand-navy/10 shadow-sm">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <span className="font-sans text-xs font-bold text-primary tracking-wider uppercase">Custom Spec</span>
                          <h4 className="font-display text-lg font-bold text-brand-navy">{currentService.title}</h4>
                        </div>
                      </div>
                      <p className="font-sans text-sm text-brand-navy/80 mb-6 leading-relaxed">
                        Every Webwala Studio build includes strategic sitemap layout and high-performance custom features built from the ground up:
                      </p>
                      <div className="space-y-4">
                        {currentService.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-brand-navy/5 shadow-sm">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="font-sans text-sm text-brand-navy font-bold leading-tight">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-70">
                  <div className="w-16 h-16 rounded-full border border-dashed border-brand-navy/20 flex items-center justify-center mb-6">
                    <Database className="h-6 w-6 text-brand-navy/40" />
                  </div>
                  <h4 className="font-display text-lg font-semibold text-brand-navy mb-2">Interactive Blueprint Spec</h4>
                  <p className="font-sans text-sm text-brand-navy/60 max-w-xs leading-relaxed">
                    Select any of the industry-tailored cards on the left to inspect our planned features, database integration layers, and custom client sitemaps.
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
