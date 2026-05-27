/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import ContactModal from "./components/ContactModal";
import Footer from "./components/Footer";
import { CalendarCheck } from "lucide-react";

const WA_NUMBER = "919818726094";

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [prefilledPlan, setPrefilledPlan] = useState<string | null>(null);

  const handleOpenContact = (planFocus: string | null = null) => {
    setPrefilledPlan(planFocus);
    setIsContactOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-bg-cream selection:bg-primary/20 selection:text-brand-navy flex flex-col justify-between">
      {/* HEADER NAVBAR */}
      <Navbar
        onOpenContact={() => handleOpenContact(null)}
      />

      {/* CORE BODY SECTIONS */}
      <main className="flex-1 w-full flex flex-col items-stretch">
        
        {/* HERO HEADER */}
        <Hero
          onOpenContact={() => handleOpenContact(null)}
        />

        {/* SERVICES FOCUS */}
        <Services />

        {/* TIMELINE PROCESS */}
        <HowItWorks />

        {/* PRICING PLANS CHART */}
        <Pricing onOpenContact={handleOpenContact} />

        {/* HIGH IMPACT FINAL CTA BANNER */}
        <section className="py-24 bg-primary relative overflow-hidden text-center text-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
            <h2 className="font-display text-4xl font-bold mb-6 tracking-tight max-w-2xl">
              Ready to Get Your Website Live?
            </h2>
            <p className="font-sans text-lg text-white/90 mb-10 max-w-2xl leading-relaxed font-semibold">
              Join hundreds of businesses across NCR who have upgraded their digital presence with Webwala Studio and start witnessing real sales results in under 7 days.
            </p>
            <button
              onClick={() => handleOpenContact("Final CTA - Ready to Go Live")}
              className="inline-flex items-center justify-center gap-2 bg-brand-navy text-white font-sans font-bold text-base px-10 py-5 rounded-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-none transition-all"
            >
              <CalendarCheck className="h-5 w-5 text-primary" />
              Book a Consultation
            </button>
          </div>
        </section>

      </main>

      {/* FOOTER BAR */}
      <Footer onOpenContact={handleOpenContact} />

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={`https://wa.me/${WA_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-transform duration-200"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* OVERLAYS AND MODALS */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        prefilledPlan={prefilledPlan}
      />
    </div>
  );
}
