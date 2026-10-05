import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes.tsx";

/**
 * Build-time renderer used by scripts/prerender.ts (bundled via `vite build --ssr`).
 * prerenderToNodeStream waits for every lazy() route/section to resolve, so the
 * returned HTML contains the page's full content, not Suspense fallbacks.
 */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>
  );

  let html = "";
  for await (const chunk of prelude) html += chunk;
  return html;
}
