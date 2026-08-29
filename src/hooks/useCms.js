import { useEffect, useRef, useState } from "react";
import { CMS_ENABLED, CMS_URL, todayKey } from "../content/cms.js";
import { useCountry } from "../content/ContentProvider.jsx";

/* Route-level data.

   The bootstrap (content/cms.js) carries the first page of each list and
   nothing heavy. Everything else — page two of a listing, and every detail
   record, which is where the weight actually is — is fetched by the route that
   renders it, through this.

   Deliberately not a caching library. There are no mutations on this site,
   content is edge-cached for a minute already, and a cache layer would only add
   a window in which a page shows something the API has stopped serving. What
   this does provide is the two things a hand-rolled fetch usually gets wrong:
   aborting the previous request, and a `ready` token for GSAP.

   ⚠ `ready` is not cosmetic. `useGsap` scans the DOM once per pass and animates
   what it finds; anything that appears later is stranded at `opacity: 0`
   forever. Pass `ready` to `useScrollAnimations` on any page that fetches, or
   the fetched content never becomes visible. */
export function useCms(path, { enabled = true, initial = null } = {}) {
  const [country] = useCountry();

  const [data, setData] = useState(initial);
  const [error, setError] = useState(null);
  /* Starts true only when a request is actually going to happen — a page that
     already has its data from the bootstrap must never flash a skeleton. */
  const [loading, setLoading] = useState(enabled && CMS_ENABLED && Boolean(path));

  const abortRef = useRef(null);

  /* The country and today's date belong to every request, so callers pass the
     path alone and cannot forget either. */
  const url =
    path && CMS_ENABLED
      ? `${CMS_URL}${path}${path.includes("?") ? "&" : "?"}country=${country.code}&from=${todayKey()}`
      : null;

  useEffect(() => {
    if (!url || !enabled) {
      setLoading(false);
      return undefined;
    }

    /* Guards the classic out-of-order response: page 3 requested while page 2
       is still in flight would otherwise land second and win. */
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal, headers: { accept: "application/json" } })
      .then((res) => {
        if (!res.ok) throw new Error(`The server said ${res.status}`);
        return res.json();
      })
      .then((result) => {
        if (controller.signal.aborted) return;
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        /* An abort is this hook replacing its own request, not a failure. */
        if (err.name === "AbortError" || controller.signal.aborted) return;
        setError(err);
        setLoading(false);
      });

    return () => controller.abort();
  }, [url, enabled]);

  return {
    data,
    error,
    loading,
    /* ⚠ Hand this to useScrollAnimations. It changes once the content is on the
       page, which is what makes GSAP rescan and reveal it. */
    ready: !loading && !error ? (data ? "loaded" : "empty") : "pending",
  };
}

export default useCms;
