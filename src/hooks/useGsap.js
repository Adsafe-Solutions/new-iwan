import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Colour for GSAP has to be a concrete string, so it is read back out of the
   theme variables rather than written as a hex here. Reading at call time also
   means a tween picks up whichever theme is currently applied. */
const cssColor = (name) =>
  `rgb(${getComputedStyle(document.documentElement).getPropertyValue(name).trim()})`;

const reduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Wires up all scroll-driven animation once the DOM is mounted:
 *  - .reveal        → fade + slide up on enter
 *  - [data-stagger] → cascade its .reveal children
 *  - [data-parallax]→ vertical parallax scrub
 *  - [data-count]   → number count-up
 */
export function useScrollAnimations() {
  useEffect(() => {
    if (reduced) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      document
        .querySelectorAll("[data-wipe],[data-line],[data-take-blue]")
        .forEach((el) => {
          el.style.transform = "none";
        });
      document.querySelectorAll("[data-take-turn]").forEach((el) => {
        el.style.color = cssColor("--c-white");
      });
      document.querySelectorAll("[data-count]").forEach((el) => {
        el.textContent = fmt(+el.dataset.count) + (el.dataset.suffix || "");
      });
      return;
    }

    const ctx = gsap.context(() => {
      // simple reveals (not inside a stagger group)
      gsap.utils.toArray(".reveal:not([data-stagger] .reveal)").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 38, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
            onStart: () => el.classList.add("in"),
          }
        );
      });

      // staggered groups
      gsap.utils.toArray("[data-stagger]").forEach((group) => {
        const kids = group.querySelectorAll(".reveal");
        gsap.fromTo(
          kids,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: "top 82%" },
            onStart: () => kids.forEach((k) => k.classList.add("in")),
          }
        );
      });

      // left→right background wipe, scrubbed to scroll progress
      gsap.utils.toArray("[data-wipe]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("[data-wipe-scene]") || el,
              start: "top 95%",
              end: "bottom 25%",
              scrub: 1.2,
            },
          }
        );
      });

      // underlines / rules — scrubbed to scroll: draw in from the left on the
      // way down, retract on the way up (same feel as the yellow wipe)
      gsap.utils.toArray("[data-line]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 55%",
              scrub: 1.2,
            },
          }
        );
      });

      // "Take action" — blue background sweeps in from the RIGHT; the
      // "Your turn —" line flips to white as the blue arrives beneath it.
      const takeScene = document.querySelector("[data-take-scene]");
      if (takeScene) {
        const blue = takeScene.querySelector("[data-take-blue]");
        const turn = takeScene.querySelector("[data-take-turn]");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: takeScene,
            start: "top 78%",
            end: "center 60%",
            scrub: 0.8,
          },
        });
        if (blue)
          tl.fromTo(blue, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, 0);
        if (turn)
          tl.fromTo(
            turn,
            { color: cssColor("--c-blue") },
            { color: cssColor("--c-white"), ease: "none", duration: 0.32 },
            0.62
          );
      }

      // parallax
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: 24,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("[data-parallax-scene]") || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // counters
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
          onUpdate: () => (el.textContent = fmt(Math.floor(obj.v)) + suffix),
        });
      });
    });

    // recalc after fonts/images settle
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);
}

function fmt(n) {
  return n >= 1000 ? n.toLocaleString("en-US") : String(n);
}
