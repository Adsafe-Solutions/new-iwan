import { useEffect } from "react";
import { useBrand } from "../content/ContentProvider.jsx";

/* Names the browser tab — and therefore everything that reads the page's
   title: the share tray, history, bookmarks. The SPA otherwise keeps
   index.html's site-wide title on every route, so a shared blog post said
   "Bringing Hope, Support and Brighter Futures" instead of its own name.

   Restores the previous title on unmount, so leaving a detail page hands the
   site title back rather than carrying a stale post name to the next route.
   Call with nothing (a record still loading) and it leaves the title alone. */
export function usePageTitle(title) {
  const BRAND = useBrand();

  useEffect(() => {
    if (!title) return undefined;
    const previous = document.title;
    document.title = `${title} · ${BRAND.fullName}`;
    return () => {
      document.title = previous;
    };
  }, [title, BRAND.fullName]);
}

export default usePageTitle;
