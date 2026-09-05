import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import {
  DEFAULT_COUNTRY,
  basenameFor,
  getCountry,
  stripBasename,
} from "../config/countries.js";
import { resolveContent } from "./index.js";

const ContentContext = createContext(null);

/* Every piece of copy on the site is read through this, so switching country —
   or swapping the static files for the CMS — is a change to this file and
   nothing else. Components never import a content module directly.

   The URL is the only source of truth for which country is active: App reads
   it out of the path and hands it down. There is no stored preference to fall
   out of step with the address bar, and a country link can be shared. */
export function ContentProvider({ country = DEFAULT_COUNTRY, children }) {
  const active = getCountry(country);
  const content = resolveContent(active.code);

  /* A full page load, because the router's basename is fixed at construction —
     which also means the new country arrives with a clean mount rather than
     GSAP re-scanning a half-swapped DOM. The visitor stays on the page they
     were on when the target country has it, and lands on its home page when
     it does not (Canada has no /iwan-women). */
  const setCountry = useCallback(
    (next) => {
      const to = getCountry(next);
      if (to.code === active.code) return;

      const here = stripBasename(window.location.pathname, active.code);
      const carries =
        here === "/" ||
        here === "/zakat" ||
        resolveContent(to.code).nav.pages.some((p) => p.path === here);

      window.location.assign(`${basenameFor(to.code)}${carries ? here : "/"}`);
    },
    [active.code]
  );

  useEffect(() => {
    document.documentElement.lang = active.locale;
  }, [active.locale]);

  const value = useMemo(
    () => ({ country: active, setCountry, content }),
    [active, setCountry, content]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

function useContentContext() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used inside <ContentProvider>");
  return ctx;
}

export const useContent = () => useContentContext().content;

export function useCountry() {
  const { country, setCountry } = useContentContext();
  return [country, setCountry];
}

export const useBrand = () => useContent().brand;
export const useCopy = () => useContent().copy;
export const useAbout = () => useContent().about;
export const useNav = () => useContent().nav;
export const usePillars = () => useContent().pillars;
export const useWays = () => useContent().ways;
export const useProgrammes = () => useContent().programmes;
/* ⚠ The four CMS-owned reads. Nothing in content/base backs them, so with the
   CMS off — or up but with nothing published — these return empty rather than
   stand-in content, and every consumer already renders that state. The frozen
   empties are shared so a re-render never hands a component a new [] and
   retriggers a memo keyed on it. */
const NO_ITEMS = Object.freeze([]);
const NO_SHOW = Object.freeze({ episodes: NO_ITEMS });

export const useEvents = () => useContent().events ?? NO_ITEMS;
export const useBlogs = () => useContent().blogs ?? NO_ITEMS;
export const usePodcast = () => useContent().podcast ?? NO_SHOW;
export const useContact = () => useContent().contact;
export const useTestimonials = () => useContent().testimonials;
export const useStats = () => useContent().stats;
export const useInstagram = () => useContent().instagram;
export const useFacebook = () => useContent().facebook;
export const useHero = () => useContent().hero;
export const useFocus = () => useContent().focus;
export const useAdvisors = () => useContent().advisors;
export const usePromo = () => useContent().promo ?? null;

/* How many of each type EXIST, as opposed to how many are in hand. The
   bootstrap carries only the first page of each list, so a listing page needs
   this to know whether to offer a page two.
   ⚠ Null when the CMS is off, and then there is nothing to page through at
   all — the lists are empty. */
export const useTotals = () => useContent().totals ?? null;

export default ContentProvider;
