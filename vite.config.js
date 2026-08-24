import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    plugins: [react()],
    server: { port: 5173, open: false },
    define: {
      /* Public widget identifier only. Never expose TURNSTILE_SECRET_KEY. */
      "import.meta.env.VITE_TURNSTILE_SITE_KEY": JSON.stringify(
        env.TURNSTILE_SITE_KEY || ""
      ),
    },
  };
});
