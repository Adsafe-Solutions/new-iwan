import { useEffect, useRef } from "react";

const SCRIPT_ID = "cloudflare-turnstile-script";
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

/* ⚠ Whether the widget can work at all in this build.

   A caller that gates its submit button on having a token MUST check this
   first. With no site key the widget never renders and never issues a token, so
   `disabled={!token}` would disable the button forever — and a missing
   anti-spam widget silently making a form unsubmittable is a far worse failure
   than the spam it was meant to stop. Especially since the token is not yet
   verified server-side, so it is not load-bearing security. */
export const TURNSTILE_ENABLED = Boolean(SITE_KEY);

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
    if (!SITE_KEY) {
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
          sitekey: SITE_KEY,
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
