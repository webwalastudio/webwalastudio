import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { RevealText } from "./fx";

const projects = [
  {
    name: "Vrise Global",
    category: "EdTech / VR Learning",
    description: "360° VR immersive learning platform connecting schools with virtual reality experiences across India.",
    url: "https://vriseglobal.co.in",
    domain: "vriseglobal.co.in",
    screenshot: "/screenshot-vrise.webp",
    accent: "#0369A1",
    tag: "EdTech",
  },
  {
    name: "FeX Foundry Alloys",
    category: "Industrial / Manufacturing",
    description: "Global foundry alloys manufacturer serving 40+ countries with ISO 9001:2015 certified quality and 25,000 MT annual capacity.",
    url: "https://www.fexalloys.com",
    domain: "fexalloys.com",
    screenshot: "/screenshot-fex.webp",
    accent: "#B45309",
    tag: "Manufacturing",
  },
  {
    name: "Master Salon",
    category: "Salon & Wellness",
    description: "Premium hair artistry and aesthetic wellness studio in Bengaluru — service menus, colour transformations, and WhatsApp booking.",
    url: "https://www.master-salon.com",
    domain: "master-salon.com",
    screenshot: "/screenshot-master-salon.webp",
    accent: "#BE185D",
    tag: "Salon",
  },
];

function BrowserFrame({ screenshot, domain, name }: { screenshot: string; domain: string; name: string }) {
  return (
    <div
      className="overflow-hidden bg-white transition-transform duration-500 group-hover:-translate-y-1.5"
      style={{ borderRadius: 16, boxShadow: "0 40px 80px -30px rgba(30,27,75,0.35), 0 0 0 1px rgba(30,27,75,0.08)" }}
    >
      <div className="flex items-center gap-2 px-4" style={{ height: 36, background: "#F4F5FA", borderBottom: "1px solid rgba(30,27,75,0.07)" }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#D4D7E3" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#D4D7E3" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#D4D7E3" }} />
        <span className="ml-2 truncate" style={{ fontSize: 12, fontWeight: 600, color: "#6B7280" }}>{domain}</span>
      </div>
      {/* The full-page capture scrolls slowly so visitors see the whole site */}
      <div style={{ aspectRatio: "16 / 10", overflow: "hidden", background: "#f4f4f6" }}>
        <img
          src={screenshot}
          alt={`${name} website screenshot (${domain})`}
          loading="lazy"
          decoding="async"
          className="scroll-portfolio block w-full"
        />
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 md:py-32 scroll-mt-10" style={{ background: "#F8FAFF" }}>
      <div className="max-w-[1200px] mx-auto px-[5%]">
        {/* Heading */}
        <motion.div
          className="mb-16 md:mb-24 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="section-label">OUR WORK</span>
          <RevealText
            text="Sites We've"
            accent="Built"
            className="font-display font-black mb-5"
            style={{ fontSize: "clamp(34px, 5vw, 60px)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#1E1B4B" }}
          />
          <p className="font-sans" style={{ fontSize: 18, color: "#4B5563", lineHeight: 1.7 }}>
            Real businesses, live on the web. From VR edtech to global manufacturing — each site
            built and launched in under 7 days.
          </p>
        </motion.div>

        {/* Case studies — one large row each, alternating sides */}
        <div className="flex flex-col gap-24 md:gap-32">
          {projects.map((project, idx) => {
            const flip = idx % 2 === 1;
            return (
              <motion.article
                key={project.name}
                className="group grid lg:grid-cols-12 gap-10 lg:gap-14 items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.name} (opens in a new tab)`}
                  className={`block lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
                >
                  <BrowserFrame screenshot={project.screenshot} domain={project.domain} name={project.name} />
                </a>

                <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3 mb-5" style={{ fontSize: 13, fontWeight: 700 }}>
                    <span style={{ color: project.accent, letterSpacing: "1.4px", textTransform: "uppercase", fontSize: 12 }}>{project.tag}</span>
                    <span aria-hidden style={{ width: 4, height: 4, borderRadius: "50%", background: "#CBD0DE" }} />
                    <span style={{ color: "#6B7280" }}>{String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-display font-black mb-4" style={{ fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#1E1B4B" }}>
                    {project.name}
                  </h3>
                  <p className="font-sans mb-8" style={{ fontSize: 17, color: "#4B5563", lineHeight: 1.7 }}>
                    {project.description}
                  </p>

                  <dl className="grid grid-cols-2 gap-6 mb-9" style={{ borderTop: "1px solid rgba(30,27,75,0.08)", paddingTop: 22 }}>
                    <div>
                      <dt style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Industry</dt>
                      <dd style={{ fontSize: 15, fontWeight: 600, color: "#1E1B4B" }}>{project.category}</dd>
                    </div>
                    <div>
                      <dt style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Live at</dt>
                      <dd style={{ fontSize: 15, fontWeight: 600, color: "#1E1B4B" }}>{project.domain}</dd>
                    </div>
                  </dl>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fx-underline inline-flex items-center gap-1.5 font-sans font-bold"
                    style={{ fontSize: 15, color: "#1E1B4B", textDecoration: "none" }}
                  >
                    Visit Site <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
