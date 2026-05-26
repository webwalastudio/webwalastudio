/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CalendarCheck } from "lucide-react";

interface HeroProps {
  onOpenContact: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  return (
    <section id="home" className="relative bg-brand-navy pt-28 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Mesh Background Grid Layer */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 to-brand-navy pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Pitch Panel */}
          <div className="max-w-2xl text-left">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-bg-cream leading-tight tracking-tight mb-6">
              Your Business Deserves a Website That Works
            </h1>
            <p className="font-sans text-lg md:text-xl text-bg-cream/80 leading-relaxed mb-10 max-w-xl">
              We build professional, mobile-ready websites that drive results. No hassle, no hidden fees, delivered in under 7 days.
            </p>

            {/* Direct Options */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-sans font-bold text-base px-8 py-4 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg"
              >
                <CalendarCheck className="h-5 w-5" />
                Book a Free Consultation
              </button>
            </div>
          </div>

          {/* Interactive Laptop Showcase Image Frame */}
          <div className="relative group lg:justify-self-end w-full max-w-lg lg:max-w-none">
            <div className="absolute -inset-4 bg-primary/25 blur-3xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative bg-white/5 p-2 rounded-2xl shadow-2xl border border-white/20 transform group-hover:-translate-y-2 transition-transform duration-500">
              {/* Product Mockup Container */}
              <div className="w-full aspect-video bg-bg-cream rounded-xl overflow-hidden relative border border-brand-navy/10 shadow-inner">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDInVoLwcA-aYmgAOBFkCvwK97KJAxDw3DZnkS5oondIhAkzzofvI4aYIuR0FIvGZNvKQ40A3TVhvfbANFuPUEiHn0au2cVRYhWTeyOgRFM6YeBU35Ge8u63F9FQTyzCZpYSreesTrcJfMTu1E1oBTVHTFnaojwNYKtldfyoxV5Ii5_NtGyoASu7VQg_gXbH8EEuTzqcWfXin6CuhRNcYwVwfgUIhwtRZ_9znunAde3d599lRliw_S-DgbXoB58x6adLSX20QghgvE"
                  alt="Webwala Studio Professional Web Design Preview on Laptop"
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
