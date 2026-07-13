import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Web fonts shift layout after mount; recalculate trigger positions once they settle.
if (typeof document !== "undefined" && document.fonts?.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger, useGSAP };
