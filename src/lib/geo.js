import { COUNTRIES } from "../config/countries.js";

/* Where the visitor appears to be, or null if it is not somewhere we serve.

   The visitor's own time zone, read straight out of Intl — no network call, no
   third-party geo-IP service, nothing to rate-limit or leak an address to, and
   it works offline. It is a guess, which is why nothing acts on it: it only
   decides whether to ASK (see LocationPrompt).

   A CDN country header (`CF-IPCountry`, `x-vercel-ip-country`) is the accurate
   version and would replace the body of this function without touching
   anything that calls it. */
const zoneCountry = () => {
  const map = {};
  for (const c of COUNTRIES) for (const z of c.zones ?? []) map[z] = c.code;
  return map;
};

export function detectCountry() {
  if (typeof window === "undefined") return null;

  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const hit = zoneCountry()[zone];
    if (hit) return hit;
  } catch {
    /* no Intl, or no zone — fall through to the language check */
  }

  /* A weaker signal, so it only decides when the time zone said nothing: plenty
     of people run en-US from anywhere. Deliberately not maximised — `en` alone
     would resolve to the United States. */
  try {
    const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const tag of tags) {
      const region = new Intl.Locale(tag).region?.toLowerCase();
      const hit = COUNTRIES.find((c) => c.code === region);
      if (hit) return hit.code;
    }
  } catch {
    /* malformed language tag */
  }

  return null;
}

export default detectCountry;
