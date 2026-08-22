/* The countries the site can be served for. `code` is the folder name under
   src/content/ that holds that country's overrides, and the value a CMS or an
   API will be asked for, so it must stay a lowercase ISO 3166-1 alpha-2 code.

   Adding a country is two steps: an entry here, and a src/content/<code>/
   folder holding only the keys that differ from base. Neither needs any
   component to change. */
/* `flag` is the regional-indicator emoji pair. Apple and Android draw the real
   flag; Windows has no flag glyphs in Segoe UI Emoji and falls back to the two
   letters ("IN", "CA"), which is legible but not a flag. Swapping in artwork
   later is a `flagSrc` on these entries and an <img> in CountrySwitcher. */
export const COUNTRIES = [
  {
    code: "in",
    label: "India",
    flag: "🇮🇳",
    locale: "en-IN",
    currency: "INR",
    timeZone: "Asia/Kolkata",
    zones: ["Asia/Kolkata", "Asia/Calcutta"],
  },
  {
    code: "ca",
    label: "Canada",
    flag: "🇨🇦",
    locale: "en-CA",
    currency: "CAD",
    timeZone: "America/Toronto",
    zones: [
      "America/St_Johns",
      "America/Halifax",
      "America/Glace_Bay",
      "America/Moncton",
      "America/Goose_Bay",
      "America/Blanc-Sablon",
      "America/Toronto",
      "America/Montreal",
      "America/Nipigon",
      "America/Thunder_Bay",
      "America/Atikokan",
      "America/Iqaluit",
      "America/Pangnirtung",
      "America/Winnipeg",
      "America/Rainy_River",
      "America/Resolute",
      "America/Rankin_Inlet",
      "America/Regina",
      "America/Swift_Current",
      "America/Edmonton",
      "America/Cambridge_Bay",
      "America/Yellowknife",
      "America/Inuvik",
      "America/Creston",
      "America/Dawson_Creek",
      "America/Fort_Nelson",
      "America/Vancouver",
      "America/Whitehorse",
      "America/Dawson",
    ],
  },
];

/* Which country is served at the unprefixed root. Overridable per deployment
   so a dev build can lead with another country without a code change. */
export const DEFAULT_COUNTRY = ENV.defaultCountry;

export const getCountry = (code) =>
  COUNTRIES.find((c) => c.code === code) ||
  COUNTRIES.find((c) => c.code === DEFAULT_COUNTRY);

import { ENV } from "./env.js";

/* `zones` is every IANA time zone that means "in this country", which is what
   lib/geo.js matches the visitor's own zone against. Legacy aliases are listed
   alongside the canonical names because older browsers still report them. */

/* The URL carries the country, and the default country carries no prefix —
   India is `/iwan-youth`, Canada is `/ca/iwan-youth`. This is the router's
   `basename`, so every <Link to="/…"> and <Route path="/…"> in the app stays
   written without a prefix and gets one for free. */
export const basenameFor = (code) =>
  code === DEFAULT_COUNTRY ? "" : `/${getCountry(code).code}`;

export const countryFromPath = (pathname = "/") => {
  const first = pathname.split("/")[1];
  const hit = COUNTRIES.find((c) => c.code === first && c.code !== DEFAULT_COUNTRY);
  return hit ? hit.code : DEFAULT_COUNTRY;
};

/* The path with the country prefix taken back off, always starting with "/". */
export const stripBasename = (pathname = "/", code = DEFAULT_COUNTRY) => {
  const base = basenameFor(code);
  if (!base || !pathname.startsWith(base)) return pathname || "/";
  return pathname.slice(base.length) || "/";
};

export default COUNTRIES;
