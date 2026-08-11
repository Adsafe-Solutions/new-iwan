import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* Reset scroll position whenever the route path changes — unless the URL
   carries a hash, in which case scroll to that section instead. The focus-area
   links in the nav, topbar and footer all point at /#<area>. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    /* wait a frame so the target exists after a cross-route jump */
    const frame = requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
