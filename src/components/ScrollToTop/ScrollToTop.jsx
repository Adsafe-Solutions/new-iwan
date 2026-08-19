import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* Reset scroll position whenever the route path changes — unless the URL
   carries a hash, in which case scroll to that section instead. The focus-area
   links in the nav, topbar and footer all point at /#<area>.

   The reset has to be INSTANT. `html { scroll-behavior: smooth }` is global,
   so a plain scrollTo(0, 0) animates over about a second, and a route change
   is the worst possible moment for that: the outgoing page's GSAP context has
   just reverted (removing the Pillars pin spacer), the incoming page is
   mounting and refreshing its own triggers, and the header goes from `fixed`
   to `sticky`. The document height changes underneath a scroll that is still
   running, which reads as the page shuddering — and it lands short of the top,
   because the browser clamps the animation against the new, shorter page. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const root = document.documentElement;

    if (!hash) {
      const jump = () => {
        root.classList.add("no-smooth");
        /* Reading a layout property forces the pending style change to flush.
           Without it scrollTo still sees `scroll-behavior: smooth` and animates
           anyway — the class is set but has not been recalculated yet. */
        void root.offsetHeight;
        window.scrollTo(0, 0);
      };

      jump();

      /* The outgoing page's GSAP context reverts in the same commit, which
         removes its pin spacer and can shrink the document under us — the
         scroll is then clamped to the old page's maximum. Land it again once
         layout has settled. */
      const frame = requestAnimationFrame(() => {
        if (window.scrollY !== 0) jump();
        root.classList.remove("no-smooth");
      });

      return () => {
        cancelAnimationFrame(frame);
        root.classList.remove("no-smooth");
      };
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
