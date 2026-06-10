/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Zap, MapPin, Phone, Mail, Link as LinkIcon, Share2 } from "lucide-react";

interface FooterProps {
  onOpenContact: (prefilledService?: string) => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Webwala Studio", url: window.location.href });
      } catch { /* user cancelled */ }
    } else {
      handleCopyLink();
    }
  };

  return (
    <footer className="bg-brand-navy pt-16 pb-8 border-t border-bg-cream/10 text-white text-left">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          
          {/* Logo & Intro Column */}
          <div>
            <a href="#" className="font-display text-2xl font-bold text-bg-cream flex items-center gap-2 mb-6">
              Webwala Studio <Zap className="h-5 w-5 text-primary fill-primary" />
            </a>
            <p className="font-sans text-sm text-bg-cream/70 mb-6 max-w-xs leading-relaxed">
              High-end, professional web design and development for businesses that want to stand out.
            </p>
            <div className="flex gap-3">
              <button
                aria-label={copied ? "Link copied!" : "Copy page link"}
                onClick={handleCopyLink}
                className="flex items-center justify-center transition-colors cursor-pointer border-none hover:bg-white/[0.14]"
                style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.07)", color: copied ? "#38BDF8" : "rgba(255,255,255,0.6)" }}
              >
                <LinkIcon className="h-4 w-4" />
              </button>
              <button
                aria-label="Share this page"
                onClick={handleShare}
                className="flex items-center justify-center transition-colors cursor-pointer border-none hover:bg-white/[0.14]"
                style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Services Links */}
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white/50 mb-6">Services</h4>
            <ul className="space-y-4">
              {[
                { name: "School Websites", spec: "Schools & Institutes Website Consult" },
                { name: "Clinic Portals", spec: "Medical & Clinic Portal Consult" },
                { name: "Business Portfolios", spec: "Corporate Brand Portfolio Consult" },
                { name: "E-commerce Stores", spec: "E-Commerce App Store Consult" },
              ].map((serv, index) => (
                <li key={index}>
                  <button
                    onClick={() => onOpenContact(serv.spec)}
                    className="text-bg-cream/75 hover:text-primary transition-colors font-sans text-sm font-semibold border-none bg-transparent cursor-pointer"
                  >
                    {serv.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white/50 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-bg-cream/75 font-sans text-sm">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  Gurgaon, Haryana
                  <br />
                  India
                </span>
              </li>
              <li className="flex items-center gap-3 text-bg-cream/75 font-sans text-sm">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+91 98187 26094</span>
              </li>
              <li className="flex items-center gap-3 text-bg-cream/75 font-sans text-sm">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:support@webwalastudio.com" className="hover:text-primary transition-colors">
                  support@webwalastudio.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom copyright block */}
        <div className="border-t border-bg-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-bg-cream/50">
            © {currentYear} Webwala Studio. All rights reserved.
          </p>
          <div className="flex gap-6 font-sans text-xs text-bg-cream/50">
            <button className="hover:text-bg-cream transition-colors bg-transparent border-none cursor-pointer">
              Privacy Policy
            </button>
            <button className="hover:text-bg-cream transition-colors bg-transparent border-none cursor-pointer">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
