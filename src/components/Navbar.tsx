/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Zap, CalendarCheck, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = ["home", "services", "pricing"];
    let observers: (IntersectionObserver | null)[] = [];

    const setupObservers = () => {
      observers.forEach((o) => o?.disconnect());
      observers = sections.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const observer = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
          { rootMargin: "-40% 0px -55% 0px" }
        );
        observer.observe(el);
        return observer;
      });
    };

    setupObservers();
    // Retry after lazy-loaded sections have mounted
    const timer = setTimeout(setupObservers, 800);

    return () => {
      clearTimeout(timer);
      observers.forEach((o) => o?.disconnect());
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 h-20 flex justify-between items-center bg-bg-cream/95 backdrop-blur-md border-b border-brand-navy/10 shadow-sm transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* LOGO */}
          <a href="#" className="flex items-center">
            <img src="/logo.png" alt="Webwala Studio" className="h-10 w-auto" />
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {[["home", "Home"], ["services", "Services"], ["pricing", "Pricing"]].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative font-sans font-bold text-sm tracking-wide pb-1 transition-colors ${
                  activeSection === id ? "text-primary" : "text-brand-navy/70 hover:text-primary"
                }`}
              >
                {label}
                {activeSection === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* CTA BUTTON */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onOpenContact}
              className="btn-shine inline-flex items-center justify-center gap-2 bg-primary text-white font-sans font-bold text-sm px-6 py-3 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-md"
            >
              <CalendarCheck className="h-4 w-4" />
              Book a Consultation
            </button>
          </div>

          {/* MOBILE TRIGGER */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden text-brand-navy p-2 hover:bg-brand-navy/5 rounded-lg active:scale-95 transition-all"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* BACKDROP — outside header to avoid stacking context issues */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[998] lg:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* MOBILE DRAWER — outside header */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-y-0 right-0 z-[999] w-72 flex flex-col px-6 py-6 lg:hidden"
          style={{ backgroundColor: "#1A2B4A", animation: "slideIn 0.15s ease-out" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <span className="font-display text-lg font-bold text-white flex items-center gap-2">
              Webwala Studio <Zap className="h-4 w-4 text-primary fill-primary" />
            </span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white p-1 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1">
            {[["home", "Home"], ["services", "Services"], ["pricing", "Pricing"]].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-sans font-bold text-base py-3 px-4 rounded-lg transition-colors ${
                  activeSection === id
                    ? "text-primary bg-white/10"
                    : "text-white hover:text-primary hover:bg-white/5"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="mt-auto">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
              className="btn-shine w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-sans font-bold py-4 rounded-lg shadow-md active:scale-95 transition-all"
            >
              <CalendarCheck className="h-5 w-5" />
              Book a Consultation
            </button>
          </div>
        </div>
      )}
    </>
  );
}
