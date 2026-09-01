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

  /* The CMS API this build reads its content from — see content/cms.js.
     ⚠ UNSET IS THE SWITCHED-OFF STATE, and it is the default on purpose: the
     site then renders the static files in content/base exactly as it did before
     the CMS existed. Setting it is the cutover, unsetting it is the rollback,
     and neither is a code change. */
  cmsApiUrl: pick(env.VITE_CMS_API_URL, ""),

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

export default ENV;
