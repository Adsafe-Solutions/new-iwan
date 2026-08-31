import { DEFAULT_COUNTRY } from "../config/countries.js";
import { BASE_CONTENT } from "./base/index.js";
import { merge } from "./merge.js";
import { applyCms, fetchContent, CMS_ENABLED } from "./cms.js";

/* Country folders are discovered rather than imported by name, so adding
   src/content/<code>/index.js is all it takes — there is no list here to keep
   in step with config/countries.js. */
const modules = import.meta.glob("./*/index.js", { eager: true, import: "default" });

const OVERRIDES = Object.fromEntries(
  Object.entries(modules)
    .map(([path, value]) => [path.split("/")[1], value])
    .filter(([code]) => code !== "base")
);

const COUNTRY_CODES = Object.keys(OVERRIDES);

const cache = new Map();

/* base → country override → (optionally) the CMS, in that order.

   Order matters. The country folder is a deliberate editorial decision made in
   code — Canada runs three programmes, not four — and the CMS is the live
   content on top of it. Reversing the two would let a CMS row reintroduce
   something a country has explicitly dropped. */
const build = (code, cms) => applyCms(merge(BASE_CONTENT, OVERRIDES[code]), cms);

/* ⚠ Synchronous, and it has to stay that way. Every hook in ContentProvider
   and `setCountry`'s "does the target country have this page?" check read it
   during render. `primeContent` below is what makes the CMS data available to
   it — by having already resolved before the app renders at all. */
export function resolveContent(code = DEFAULT_COUNTRY) {
  if (!cache.has(code)) cache.set(code, build(code, null));
  return cache.get(code);
}

/* Fetches the CMS once and folds it into the cache, so the synchronous
   `resolveContent` above returns CMS-backed content from the first render.

   Called by main.jsx and AWAITED before the app mounts. See cms.js for why it
   is a blocking fetch rather than a swap-it-in-later one — the short version is
   that GSAP scans the DOM once per mount, and content that arrives afterwards
   never becomes visible.

   ⚠ A no-op when VITE_CMS_API_URL is unset — and since nothing in content/base
   backs events, blogs, podcast or promo, that leaves all four empty. There is
   no static content to fall back to any more; the API is the only source. */
export async function primeContent(code = DEFAULT_COUNTRY) {
  if (!CMS_ENABLED) return false;

  const payload = await fetchContent(code);
  /* Null means the request failed or timed out. cms.js has already logged it;
     leaving the cache alone means the CMS-owned sections render empty. */
  if (!payload) return false;

  cache.set(code, build(code, payload));
  return true;
}

export default resolveContent;
