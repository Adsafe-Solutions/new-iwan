import { useEffect, useRef } from "react";

const SCRIPT_ID = "cloudflare-turnstile-script";
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const DEPLOYED_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const LOCAL_TEST_SITE_KEY = "1x00000000000000000000AA";

const getSiteKey = () =>
  ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname) ||
  window.location.hostname.endsWith(".localhost")
    ? LOCAL_TEST_SITE_KEY
    : DEPLOYED_SITE_KEY;

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);

  return new Promise((resolve, reject) => {
    let script = document.getElementById(SCRIPT_ID);
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    script.addEventListener("load", () => resolve(window.turnstile), { once: true });
    script.addEventListener("error", () => reject(new Error("Turnstile load failed")), {
      once: true,
    });
    if (window.turnstile) resolve(window.turnstile);
  });
}

export default function Turnstile({ action, onChange }) {
  const container = useRef(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const sitekey = getSiteKey();
    if (!sitekey) {
      console.error("TURNSTILE_SITE_KEY is missing for this deployment.");
      onChangeRef.current("");
      return undefined;
    }

    let active = true;
    let widgetId;

    loadTurnstile()
      .then((turnstile) => {
        if (!active || !container.current) return;
        widgetId = turnstile.render(container.current, {
          sitekey,
          action,
          appearance: "always",
          theme: "auto",
          size: "flexible",
          callback: (token) => onChangeRef.current(token),
          "expired-callback": () => onChangeRef.current(""),
          "error-callback": () => onChangeRef.current(""),
        });
      })
      .catch(() => {
        if (active) onChangeRef.current("");
      });

    return () => {
      active = false;
      onChangeRef.current("");
      if (widgetId !== undefined && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [action]);

  return <div ref={container} className="min-h-[65px] w-full" />;
}
