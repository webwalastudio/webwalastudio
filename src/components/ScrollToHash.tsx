import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      return;
    }

    const id = hash.replace("#", "");

    // Retry until the lazy-loaded section is in the DOM
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (attempts < 20) {
        attempts++;
        setTimeout(tryScroll, 100);
      }
    };

    // Initial delay to let Suspense/lazy load kick in
    setTimeout(tryScroll, 300);
  }, [pathname, hash]);

  return null;
}
