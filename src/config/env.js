/* Build-time configuration, read in one place.

   ⚠ Vite INLINES `import.meta.env.VITE_*` into the bundle when it builds, so
   these are baked per build, not read at runtime. That is the one thing this
   differs from a Worker's `[vars]`: putting a value in wrangler.toml would
   never reach the browser here. It also means nothing in this file may ever
   be a secret — the whole bundle is public.

   Every value falls back to a default, so a missing .env file gives a working
   build rather than an undefined one. */
const env = import.meta.env;

/* "" and undefined both mean "not set", so an env file can list a key it does
   not want to override without blanking the default. */
const pick = (value, fallback) =>
  value === undefined || value === "" ? fallback : value;

const bool = (value, fallback) =>
  value === undefined || value === "" ? fallback : value === "true";

export const ENV = {
  name: pick(env.VITE_ENVIRONMENT, "dev"),
  siteUrl: pick(env.VITE_SITE_URL, "http://localhost:5173"),
  defaultCountry: pick(env.VITE_DEFAULT_COUNTRY, "in"),

  /* feature switches — see config/sections.js for what each one picks */
  homeHero: pick(env.VITE_HOME_HERO, undefined),
  programmeAbout: pick(env.VITE_PROGRAMME_ABOUT, undefined),
  topbar:
    env.VITE_TOPBAR === undefined || env.VITE_TOPBAR === ""
      ? undefined
      : bool(env.VITE_TOPBAR),
  promoPopup:
    env.VITE_PROMO_POPUP === undefined || env.VITE_PROMO_POPUP === ""
      ? undefined
      : bool(env.VITE_PROMO_POPUP),
};

export const IS_PROD = ENV.name === "prod";

export default ENV;
