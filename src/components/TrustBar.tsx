/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { School, Heart, ShieldCheck } from "lucide-react";

export default function TrustBar() {
  const trusts = [
    { name: "Sunrise Public School", icon: School },
    { name: "City Dental Clinic", icon: Heart },
    { name: "Prime Retailers", icon: ShieldCheck },
  ];

  return (
    <div className="bg-bg-cream py-10 border-b border-brand-navy/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <p className="text-center font-sans font-bold text-xs tracking-widest text-brand-navy/60 uppercase mb-8">
          Trusted by businesses and institutions across NCR
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-75 hover:opacity-100 transition-all duration-300">
          {trusts.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={idx}
                className="font-display text-lg md:text-xl text-brand-navy font-bold flex items-center gap-3 bg-white/50 px-5 py-2.5 rounded-lg border border-brand-navy/5 shadow-sm"
              >
                <Icon className="h-6 w-6 text-primary stroke-[2px]" />
                <span>{t.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
