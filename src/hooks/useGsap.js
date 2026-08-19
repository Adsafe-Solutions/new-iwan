import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
 *
 * Keyed on the pathname, not just on mount. Two routes that render the SAME
 * component — the four programme pages all render `Programme` — are
 * reconciled by React rather than remounted, so a mount-only effect never
 * re-runs and every element the new route added is left stranded at
 * `opacity: 0`. Re-running on pathname reverts the old context and rescans.
 */
export function useScrollAnimations() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (reduced) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      document
        .querySelectorAll("[data-wipe],[data-line],[data-deck-line],[data-take-blue]")
        .forEach((el) => {
          el.style.transform = "none";
        });
      document.querySelectorAll("[data-take-turn]").forEach((el) => {
        el.style.color = cssColor("--c-white");
      });
      document.querySelectorAll("[data-count]").forEach((el) => {
        el.textContent = fmt(+el.dataset.count) + (el.dataset.suffix || "");
      });
      document.querySelectorAll("[data-journey-fill]").forEach((el) => {
        el.style.transform = "scale(1)";
      });
      document.querySelectorAll("[data-journey-line]").forEach((el) => {
        el.style.transform = "scaleX(1)";
      });
      document.querySelectorAll("[data-journey-num]").forEach((el) => {
        el.style.color = cssColor("--c-white");
      });
      document.querySelectorAll("[data-journey-copy]").forEach((el) => {
        el.style.filter = "none";
        el.style.opacity = "1";
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

      /* Decks — the cards in a [data-deck] section start piled up and deal out
         into their grid positions, scrubbed to scroll, with the section pinned
         so the whole hand lands before the page moves on. The homepage pillars
         and the About page's programme cards both use it.

         Only above the drawer breakpoint: the narrow layout stacks the cards
         vertically, so there is no row for them to deal into and holding the
         viewport would just feel stuck. Below it they take the ordinary
         staggered reveal instead.

         Positions are read from `offsetLeft`, which is the layout position and
         so is not affected by the transform GSAP is writing — reading
         getBoundingClientRect here would compound each refresh. Function-based
         values plus invalidateOnRefresh recompute them when the grid resizes. */
      const wideDeck = window.matchMedia("(min-width: 1000px)").matches;

      gsap.utils.toArray("[data-deck]").forEach((deck) => {
        const cards = gsap.utils.toArray("[data-deck-card]", deck);
        if (!cards.length) return;

        if (wideDeck) {
          const mid = (cards.length - 1) / 2;
          const last = cards[cards.length - 1];
          /* distance from a card's own centre to the centre of the whole row */
          const toCentre = (card) =>
            (cards[0].offsetLeft + last.offsetLeft + last.offsetWidth) / 2 -
            (card.offsetLeft + card.offsetWidth / 2);

          /* the pile reads top-down, so the last card sits on top */
          gsap.set(cards, { zIndex: (i) => i });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: deck,
              start: "center center",
              end: `+=${cards.length * 210}`,
              pin: true,
              scrub: 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              /* same reason as the Journey pin below: the spacer this inserts
                 moves everything under it, and a lower-priority trigger would
                 have measured the pre-pin layout */
              refreshPriority: 1,
            },
          });

          cards.forEach((card, i) => {
            const at = i * 0.55;
            tl.fromTo(
              card,
              {
                x: () => toCentre(card) + (i - mid) * 18,
                y: i * 15,
                rotation: (i - mid) * 3.2,
                scale: 0.9,
              },
              { x: 0, y: 0, rotation: 0, scale: 1, ease: "power2.out", duration: 0.85 },
              at
            );
            const rule = card.querySelector("[data-deck-line]");
            if (rule)
              tl.fromTo(
                rule,
                { scaleX: 0 },
                { scaleX: 1, ease: "none", duration: 0.5 },
                at + 0.5
              );
          });
        } else {
          gsap.fromTo(
            cards,
            { y: 42, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: { trigger: deck, start: "top 82%" },
            }
          );
          const rules = deck.querySelectorAll("[data-deck-line]");
          if (rules.length)
            gsap.fromTo(
              rules,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                stagger: 0.12,
                scrollTrigger: {
                  trigger: deck,
                  start: "top 70%",
                  end: "bottom 60%",
                  scrub: 1.2,
                },
              }
            );
        }
      });

      /* Horizontal strips — a [data-hscroll] section pins and the row inside it
         scrolls sideways as you scroll down, releasing once the last card has
         come past.

         It drives the wrapper's own `scrollLeft` rather than translating a
         track, so the base state is a plainly scrollable strip: it swipes on a
         phone, takes the keyboard, and needs no JavaScript at all. GSAP only
         takes the wheel when the section is pinned. */
      gsap.utils.toArray("[data-hscroll]").forEach((scene) => {
        const wrap = scene.querySelector("[data-hscroll-wrap]");
        if (!wrap || !window.matchMedia("(min-width: 1000px)").matches) return;

        const overflow = () => Math.max(0, wrap.scrollWidth - wrap.clientWidth);
        if (overflow() === 0) return;

        const at = { v: 0 };
        gsap.fromTo(
          at,
          { v: 0 },
          {
            v: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              start: "center center",
              /* the tail keeps the last card on screen for a beat before the
                 page moves on, rather than releasing the pin the instant it
                 finishes travelling */
              end: () => `+=${overflow() + window.innerHeight * 0.35}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              /* the pin's spacer moves everything below it — same reason the
                 deck above carries this */
              refreshPriority: 1,
            },
            onUpdate: () => {
              wrap.scrollLeft = at.v * overflow();
            },
          }
        );
      });

      /* Journey — marker fills, then its rule draws across to the next
         marker, and so on. Scrubbed to scroll, and the section pins for the
         length of the sequence so it completes before the page moves on.

         Pinning only above the drawer breakpoint: below it the row is a
         stack with no connectors, and holding the viewport there would just
         feel stuck. Crossing that breakpoint on resize needs a refresh,
         which the ScrollTrigger.refresh() below covers on load. */
      const journey = document.querySelector("[data-journey]");
      if (journey) {
        const fills = journey.querySelectorAll("[data-journey-fill]");
        const lines = journey.querySelectorAll("[data-journey-line]");
        const nums = journey.querySelectorAll("[data-journey-num]");
        const copy = journey.querySelectorAll("[data-journey-copy]");
        const wide = window.matchMedia("(min-width: 1000px)").matches;
        const white = cssColor("--c-white");

        if (fills.length) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: journey,
              start: wide ? "center center" : "top 70%",
              end: wide ? `+=${fills.length * 240}` : "bottom 55%",
              pin: wide,
              scrub: 0.7,
              anticipatePin: 1,
              /* Pinning inserts a spacer, which pushes every section below
                 it further down the page. ScrollTriggers refresh in creation
                 order, so the wipes further down — created earlier in this
                 file — would measure their start/end against a layout with
                 no spacer in it and fire hundreds of pixels early. A higher
                 refreshPriority makes this one recalculate first, so the
                 rest measure the real, post-pin positions. */
              refreshPriority: 1,
            },
          });

          fills.forEach((fill, i) => {
            tl.to(fill, { scale: 1, ease: "power2.out", duration: 0.45 });
            tl.to(nums[i], { color: white, ease: "none", duration: 0.2 }, "<0.15");
            tl.to(
              copy[i],
              { filter: "blur(0px)", opacity: 1, ease: "power1.out", duration: 0.5 },
              "<"
            );
            if (lines[i]) tl.to(lines[i], { scaleX: 1, ease: "none", duration: 0.9 });
          });
        }
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
  }, [pathname]);
}

function fmt(n) {
  return n >= 1000 ? n.toLocaleString("en-US") : String(n);
}
