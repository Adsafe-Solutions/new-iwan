import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

/* Cloudflare's official "always passes" test sitekey. It is public by design —
   documented at developers.cloudflare.com/turnstile/troubleshooting/testing —
   and works on ANY hostname, localhost included.

   ⚠ Why this exists: a real sitekey is bound to its allowed domains, so on
   localhost the widget either refuses to render or errors, and issues no token.
   Both RegisterForm and Footer disable their submit button until a token
   arrives, so the form becomes permanently unsubmittable — the captcha blocks
   the developer rather than a bot. The test key keeps the real code path intact
   (widget renders, callback fires, button enables) instead of branching around
   Turnstile in development and shipping an untested path. */
const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, ".", "");

  /* ⚠ `command === "serve"` is the LOCAL DEV SERVER only — never a build.
     Deliberately not `mode === "development"`: `npm run build:dev` also runs in
     development mode but produces a bundle that gets DEPLOYED (deploy:dev), and
     a deployed site whose captcha passes everyone is no captcha at all. */
  const isDevServer = command === "serve";
  const useTestKey = isDevServer && env.TURNSTILE_USE_REAL_KEY !== "1";

  return {
    plugins: [react()],
    server: { port: 5173, open: false },
    define: {
      /* Public widget identifier only. Never expose TURNSTILE_SECRET_KEY. */
      "import.meta.env.VITE_TURNSTILE_SITE_KEY": JSON.stringify(
        useTestKey ? TURNSTILE_TEST_SITE_KEY : env.TURNSTILE_SITE_KEY || ""
      ),
    },
  };
});
