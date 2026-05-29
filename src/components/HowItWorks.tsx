/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Search, Compass, Rocket, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const desktopTab = activeTab < 0 ? 0 : activeTab;

  const steps = [
    {
      step: "01",
      title: "Discovery",
      subtitle: "Day 1-2 • Research & Materials",
      description: "We understand your business goals, target audience, and collect your branding materials.",
      icon: Search,
      deliverables: ["Market & industry competitive research document.", "Sitemap mapping & UX outline wireframes.", "Branding content assets collection."],
    },
    {
      step: "02",
      title: "Design & Build",
      subtitle: "Day 3-5 • UI layout & backend code",
      description: "Our team designs a modern, mobile-responsive layout and integrates necessary features.",
      icon: Compass,
      deliverables: ["High-converting, bespoke homepage mock layout.", "Fully-coded backend integrations & custom fields setup.", "100% responsive smartphone & tablet screen layout check."],
    },
    {
      step: "03",
      title: "Go Live",
      subtitle: "Day 6-7 • Testing & Launch",
      description: "After your review, we launch the site and ensure it's optimized for search engines.",
      icon: Rocket,
      deliverables: ["Cross-browser & device testing on mobile, tablet & desktop.", "Final client review walkthrough & revision sign-off.", "Handover with admin access, credentials & maintenance guide."],
    },
  ];

  return (
    <section className="py-24 bg-brand-navy text-bg-cream relative overflow-hidden border-t border-brand-navy">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Title Block */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Simple. Fast. Effective.</h2>
          <p className="font-sans text-lg text-bg-cream/70">
            Our streamlined process ensures you get a professional website live in under 7 days without the typical agency headaches.
          </p>
        </div>

        {/* ── MOBILE: vertical accordion ── */}
        <div className="md:hidden max-w-xl mx-auto mb-0 flex flex-col gap-3">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === index;
            return (
              <div key={index}>
                <div
                  onClick={() => setActiveTab(isActive ? -1 : index)}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 border-primary/40"
                      : "bg-white/5 border-white/10 active:scale-[0.98]"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-white shadow-[0_0_20px_rgba(232,96,44,0.4)]"
                      : "bg-brand-navy border-2 border-primary/30 text-primary"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-sans text-xs font-bold text-primary uppercase tracking-wider">{item.step}. {item.subtitle}</p>
                    <h3 className="font-display text-base font-bold text-white">{item.title}</h3>
                  </div>
                  <ArrowRight className={`h-4 w-4 text-primary shrink-0 transition-transform duration-200 ${isActive ? "rotate-90" : ""}`} />
                </div>

                {isActive && (
                  <div className="mt-2 bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="font-sans text-xs text-bg-cream/70 mb-3 font-semibold">
                      Phase deliverables:
                    </p>
                    <div className="flex flex-col gap-3">
                      {item.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="bg-brand-navy border border-white/5 p-3 rounded-lg flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-primary/25 text-primary text-xs font-bold inline-flex items-center justify-center shrink-0 mt-0.5">✓</span>
                          <p className="font-sans text-xs text-bg-cream/90 leading-relaxed font-bold">{del}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── DESKTOP: 3-column grid + deliverables card ── */}
        <div className="hidden md:block">
          <div className="relative max-w-4xl mx-auto mb-16">
            <div className="absolute top-[36px] left-16 right-16 h-0.5 bg-bg-cream/15">
              <div
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
                style={{ width: `${(desktopTab / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-12 text-center">
              {steps.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeTab === index;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className="relative group cursor-pointer z-10 flex flex-col items-center"
                  >
                    <div className={`w-18 h-18 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                      desktopTab === index
                        ? "bg-primary text-white scale-110 shadow-[0_0_30px_rgba(232,96,44,0.4)]"
                        : "bg-brand-navy border-2 border-primary/20 text-primary hover:border-primary/50"
                    }`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2 flex items-center gap-2">
                      <span className="text-primary text-sm font-sans block">{item.step}.</span>
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs font-semibold text-primary mb-3 uppercase tracking-wider">{item.subtitle}</p>
                    <p className="font-sans text-sm text-bg-cream/75 max-w-xs">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-white/5 border border-white/15 p-8 rounded-2xl hover:border-primary/20 transition-all">
            <div className="flex flex-row justify-between items-center gap-4 mb-6 border-b border-white/10 pb-4">
              <div>
                <span className="font-sans text-xs font-bold text-primary tracking-wider uppercase">Active Phase Deliverable</span>
                <h4 className="font-display text-xl font-bold text-white flex items-center gap-2">
                  <span>Phase {steps[desktopTab].step}</span> • {steps[desktopTab].title}
                </h4>
              </div>
              <span className="font-sans text-xs bg-primary/20 text-primary border border-primary/35 px-3 py-1 rounded-full font-bold">
                {steps[desktopTab].subtitle}
              </span>
            </div>
            <p className="font-sans text-sm text-bg-cream/80 mb-6 font-semibold">
              By completing this phase, you receive the following final outcomes:
            </p>
            <div className="grid grid-cols-3 gap-4">
              {steps[desktopTab].deliverables.map((del, dIdx) => (
                <div key={dIdx} className="bg-brand-navy border border-white/5 p-4 rounded-xl flex flex-col gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/25 text-primary text-xs font-bold inline-flex items-center justify-center shrink-0">✓</span>
                  <p className="font-sans text-xs text-bg-cream/90 leading-relaxed font-bold">{del}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
