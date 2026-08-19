import { DEFAULT_COUNTRY } from "../config/countries.js";
import { BASE_CONTENT } from "./base/index.js";
import { merge } from "./merge.js";
import { eventsForCountry } from "../lib/events.js";

/* Country folders are discovered rather than imported by name, so adding
   src/content/<code>/index.js is all it takes — there is no list here to keep
   in step with config/countries.js. */
const modules = import.meta.glob("./*/index.js", { eager: true, import: "default" });

const OVERRIDES = Object.fromEntries(
  Object.entries(modules)
    .map(([path, value]) => [path.split("/")[1], value])
    .filter(([code]) => code !== "base")
);

export const COUNTRY_CODES = Object.keys(OVERRIDES);

const cache = new Map();

/* Synchronous today because the content is static. When it moves to the CMS
   this becomes the fallback the API response is merged onto, which is also
   what renders before the request lands. */
export function resolveContent(code = DEFAULT_COUNTRY) {
  if (!cache.has(code)) {
    const snapshot = merge(BASE_CONTENT, OVERRIDES[code]);
    /* Events are the one list kept whole across countries and split here by
       their own `country` field — see content/base/events.js. Filtering after
       the merge means a country override of `events` is filtered too. */
    cache.set(code, {
      ...snapshot,
      events: eventsForCountry(snapshot.events, code),
    });
  }
  return cache.get(code);
}

export default resolveContent;
