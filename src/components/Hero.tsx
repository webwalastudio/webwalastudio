/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { CalendarCheck } from "lucide-react";

interface HeroProps {
  onOpenContact: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  return (
    <section id="home" className="relative bg-brand-navy pt-28 pb-32 lg:pt-40 lg:pb-40 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 to-brand-navy pointer-events-none" />

      {/* Floating gradient orbs */}
      <div className="orb-float absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-primary/20 blur-[110px] pointer-events-none" />
      <div className="orb-float-2 absolute -bottom-16 right-[8%] w-[360px] h-[360px] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none" />
      <div className="orb-float-3 absolute top-[35%] -right-12 w-[280px] h-[280px] rounded-full bg-primary/12 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Pitch Panel */}
          <motion.div
            className="max-w-2xl text-left"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-bg-cream leading-tight tracking-tight mb-6">
              Your Business Deserves a Website That Works
            </h1>
            <p className="font-sans text-lg md:text-xl text-bg-cream/80 leading-relaxed mb-10 max-w-xl">
              We build professional, mobile-ready websites that drive results. No hassle, no hidden fees, delivered in under 7 days.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <button
                onClick={onOpenContact}
                className="btn-shine inline-flex items-center justify-center gap-2 bg-primary text-white font-sans font-bold text-base px-8 py-4 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg"
              >
                <CalendarCheck className="h-5 w-5" />
                Book a Free Consultation
              </button>
            </motion.div>
          </motion.div>

          {/* Laptop Showcase */}
          <motion.div
            className="relative group lg:justify-self-end w-full max-w-lg lg:max-w-none"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="absolute -inset-4 bg-primary/25 blur-3xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative bg-white/5 p-2 rounded-2xl shadow-2xl border border-white/20 transform group-hover:-translate-y-2 transition-transform duration-500">
              <div className="w-full aspect-video bg-bg-cream rounded-xl overflow-hidden relative border border-brand-navy/10 shadow-inner">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDInVoLwcA-aYmgAOBFkCvwK97KJAxDw3DZnkS5oondIhAkzzofvI4aYIuR0FIvGZNvKQ40A3TVhvfbANFuPUEiHn0au2cVRYhWTeyOgRFM6YeBU35Ge8u63F9FQTyzCZpYSreesTrcJfMTu1E1oBTVHTFnaojwNYKtldfyoxV5Ii5_NtGyoASu7VQg_gXbH8EEuTzqcWfXin6CuhRNcYwVwfgUIhwtRZ_9znunAde3d599lRliw_S-DgbXoB58x6adLSX20QghgvE"
                  alt="Webwala Studio Professional Web Design Preview on Laptop"
                  className="w-full h-full object-cover select-none"
                  fetchPriority="high"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider → Services (white) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="w-full h-[48px] md:h-[64px]">
          <path d="M0,0 C480,64 960,64 1440,0 L1440,64 L0,64 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
