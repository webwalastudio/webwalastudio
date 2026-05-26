/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Zap, CalendarCheck, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-bg-cream/95 backdrop-blur-md border-b border-brand-navy/10 h-20 flex justify-between items-center">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* LOGO */}
        <a href="#" className="font-display text-2xl font-bold text-brand-navy flex items-center gap-2 group">
          Webwala Studio{" "}
          <Zap className="h-5 w-5 text-primary fill-primary group-hover:rotate-12 transition-transform duration-300" />
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="#home"
            className="font-sans font-bold text-sm tracking-wide text-primary border-b-2 border-primary pb-1 transition-colors"
          >
            Home
          </a>
          <a
            href="#services"
            className="font-sans font-bold text-sm tracking-wide text-brand-navy/70 hover:text-primary transition-colors"
          >
            Services
          </a>
          <a
            href="#pricing"
            className="font-sans font-bold text-sm tracking-wide text-brand-navy/70 hover:text-primary transition-colors"
          >
            Pricing
          </a>
        </nav>

        {/* CTA BUTTON */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenContact}
            className="inline-flex items-center justify-center gap-2 bg-primary text-white font-sans font-bold text-sm px-6 py-3 rounded-lg hover:scale-[1.02] hover:bg-primary-container active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-md"
          >
            <CalendarCheck className="h-4 w-4" />
            Book a Consultation
          </button>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          className="lg:hidden text-brand-navy p-2 hover:bg-brand-navy/5 rounded-lg active:scale-95 transition-all"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-bg-cream shadow-xl border-l border-brand-navy/10 px-6 py-6 flex flex-col gap-6 lg:hidden animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-bold text-brand-navy flex items-center gap-2">
              Webwala Studio <Zap className="h-5 w-5 text-primary fill-primary" />
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-brand-navy p-2 hover:bg-brand-navy/5 rounded-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 mt-8">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans font-bold text-lg text-brand-navy/70 hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans font-bold text-lg text-brand-navy/70 hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans font-bold text-lg text-brand-navy/70 hover:text-primary transition-colors"
            >
              Pricing
            </a>
          </nav>

          <div className="mt-auto">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-sans font-bold py-4 rounded-lg shadow-md active:scale-95 transition-all"
            >
              <CalendarCheck className="h-5 w-5" />
              Book a Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
