import { School, Heart, ShieldCheck, Briefcase, Coffee, Scissors } from "lucide-react";

const trusts = [
  { name: "Sunrise Public School", icon: School },
  { name: "City Dental Clinic", icon: Heart },
  { name: "Prime Retailers", icon: ShieldCheck },
  { name: "NCR Hospitality Group", icon: Coffee },
  { name: "Elite Business Academy", icon: Briefcase },
  { name: "Prestige Beauty Salon", icon: Scissors },
];

const allTrusts = [...trusts, ...trusts];

export default function TrustBar() {
  return (
    <div className="bg-bg-cream border-b border-brand-navy/10 overflow-hidden" style={{ paddingTop: 36, paddingBottom: 36 }}>
      <p className="text-center font-sans font-bold text-xs tracking-widest text-brand-navy/50 uppercase mb-7">
        Trusted by businesses &amp; institutions across NCR
      </p>

      <div style={{ overflow: "hidden", position: "relative" }}>
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 pointer-events-none z-10"
          style={{ width: 80, background: "linear-gradient(to right, #F8FAFF, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 pointer-events-none z-10"
          style={{ width: 80, background: "linear-gradient(to left, #F8FAFF, transparent)" }}
        />

        <div className="marquee-track">
          {allTrusts.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 flex-shrink-0"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(99,102,241,0.1)",
                  borderRadius: 12,
                  padding: "10px 20px",
                  marginRight: 16,
                  backdropFilter: "blur(8px)",
                }}
              >
                <Icon className="h-5 w-5 shrink-0" style={{ color: "#7C3AED", strokeWidth: 2 }} />
                <span
                  className="font-display font-bold whitespace-nowrap"
                  style={{ fontSize: 14, color: "#1E1B4B" }}
                >
                  {t.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
