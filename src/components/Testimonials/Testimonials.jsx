import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCopy, useTestimonials } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B } from "../../lib/type.js";

/* first letters of the first two words — "Mohammed Zaki" → MZ */
const initials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/* The track is one long strip of repeated copies. Starting near the middle
   means you can page a long way either side before `normalize` silently
   shunts the index back to the centre copy — which is what makes the loop
   feel endless without ever re-ordering the DOM. */
const REPEATS = 9;
const AUTOPLAY_MS = 4200;
const SLIDE_MS = 700;

/* Depth by distance from the focused card. Whole class names, because
   Tailwind scans this file as text and would never generate a blur built
   by interpolation. Index 2 covers everything further out. */
const DEPTH = [
  "scale-100 opacity-100 blur-0",
  "scale-90 opacity-50 blur-[3px]",
  "scale-90 opacity-20 blur-[5px]",
];

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Card width has to be known to JS as well as CSS — the track moves by an
   exact pixel pitch, so the two must agree.

   `view` is how many cards are held in focus at once. Two is the intent;
   below 780px a pair would leave each card too narrow to read, so it drops
   to one. The blurred neighbours peek in either side at every size. */
function metrics(w) {
  if (w < 780) return { card: Math.min(Math.round(w * 0.84), 380), gap: 16, view: 1 };
  if (w < 1000) return { card: 320, gap: 20, view: 2 };
  if (w < 1240) return { card: 360, gap: 24, view: 2 };
  return { card: 420, gap: 32, view: 2 };
}

const ARROW = cx(
  "grid h-[46px] w-[46px] place-items-center rounded-full border border-line bg-white",
  "cursor-pointer text-[20px] leading-none text-ink shadow-arrowSoft",
  "transition-[background-color,border-color,color] duration-200",
  "hover:border-primary hover:bg-primary hover:text-white"
);

/* ---------- IN THEIR OWN WORDS ----------
   Real members, named — the section that replaced the placeholder "Trusted
   By" advisor row.

   A centred carousel: the focused card is sharp, white and lifted, and its
   neighbours fall back in blur, scale and opacity by distance. Autoplay
   pauses on hover or focus, and never starts under prefers-reduced-motion.

   Depth and lift are classes rather than inline styles on purpose — an
   inline `transform` outranks every utility, so a hover scale would have
   silently done nothing. */
export default function Testimonials() {
  const TESTIMONIALS = useTestimonials();
  const copy = useCopy().testimonials;
  const n = TESTIMONIALS.length;
  const START = n * Math.floor(REPEATS / 2);

  const [index, setIndex] = useState(START);
  const [paused, setPaused] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [{ card, gap, view }, setSize] = useState(() =>
    metrics(typeof window === "undefined" ? 1400 : window.innerWidth)
  );

  const section = useRef(null);
  const viewport = useRef(null);
  const snap = useRef(null);
  const live = useRef(index);
  live.current = index;

  const still = reduced();
  const loop = useMemo(
    () => Array.from({ length: REPEATS }, () => TESTIMONIALS).flat(),
    [TESTIMONIALS]
  );
  const pitch = card + gap;
  /* width of the focused group, so it can be centred as a block */
  const group = view * card + (view - 1) * gap;
  const lead = ((index % n) + n) % n;

  /* 0 for anything in focus, then 1, 2… stepping outward from whichever
     edge of the group the card sits beyond */
  const depthOf = (i) => {
    if (i < index) return index - i;
    if (i >= index + view) return i - (index + view - 1);
    return 0;
  };

  useEffect(() => {
    const onResize = () => setSize(metrics(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Native listeners rather than JSX props: a hover handler on a div is a
     lint smell, and this keeps the pause purely an enhancement. */
  useEffect(() => {
    const hold = () => setPaused(true);
    const release = () => setPaused(false);
    const vp = viewport.current;
    const sec = section.current;
    vp?.addEventListener("pointerenter", hold);
    vp?.addEventListener("pointerleave", release);
    sec?.addEventListener("focusin", hold);
    sec?.addEventListener("focusout", release);
    return () => {
      vp?.removeEventListener("pointerenter", hold);
      vp?.removeEventListener("pointerleave", release);
      sec?.removeEventListener("focusin", hold);
      sec?.removeEventListener("focusout", release);
    };
  }, []);

  /* Shunt back toward the middle copy once a move has settled. The shift is
     a whole number of sets, so the card on screen is identical — the
     transition is off for that one frame, so nothing is visible. */
  const normalize = useCallback(() => {
    setIndex((i) => {
      if (i >= START - n && i <= START + n) return i;
      setAnimate(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
      return i - Math.round((i - START) / n) * n;
    });
  }, [START, n]);

  const go = useCallback(
    (next) => {
      setAnimate(true);
      setIndex(next);
      clearTimeout(snap.current);
      snap.current = setTimeout(normalize, SLIDE_MS + 60);
    },
    [normalize]
  );

  const step = useCallback((dir) => go(live.current + dir), [go]);

  useEffect(() => {
    if (still || paused) return undefined;
    const t = setInterval(() => step(1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [still, paused, step]);

  useEffect(() => () => clearTimeout(snap.current), []);

  return (
    <section
      ref={section}
      className="overflow-hidden bg-white py-[4.5rem]"
      id="testimonials"
      aria-roledescription="carousel"
      aria-label={copy.carousel}
    >
      <div className="mx-auto w-full max-w-container px-6">
        <h2 className={cx(KICKER, "reveal mb-[1.1rem]")}>
          {copy.heading} <span className={MARK_B}>{copy.mark}</span>
        </h2>
        <div className="flex items-end justify-between gap-10">
          <p className="reveal max-w-[660px] text-[17px] leading-[1.7] text-muted">
            {copy.body}
          </p>
          <div className="reveal flex flex-none gap-3">
            <button
              type="button"
              className={ARROW}
              onClick={() => step(-1)}
              aria-label={copy.prev}
            >
              ‹
            </button>
            <button
              type="button"
              className={ARROW}
              onClick={() => step(1)}
              aria-label={copy.next}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* the vertical padding leaves room for the focused card's lift and
          shadow, which the clipping would otherwise cut off */}
      <div className="reveal relative mt-10 overflow-hidden py-8" ref={viewport}>
        <div
          className="flex items-stretch"
          style={{
            gap: `${gap}px`,
            /* centres the whole focused group, so a pair straddles the
               midline rather than one card sitting on it */
            paddingLeft: `calc(50% - ${group / 2}px)`,
            transform: `translateX(${-index * pitch}px)`,
            transition:
              animate && !still
                ? `transform ${SLIDE_MS}ms cubic-bezier(.4,0,.2,1)`
                : "none",
          }}
        >
          {loop.map((t, i) => {
            const depth = depthOf(i);
            const isActive = depth === 0;

            return (
              <figure
                key={`${t.author}-${i}`}
                aria-hidden={!isActive}
                className={cx(
                  "relative box-border flex shrink-0 flex-col gap-5",
                  "overflow-hidden rounded-2xl border p-7 max-phone:p-6",
                  "transition-[opacity,filter,transform,box-shadow,background-color,border-color]",
                  "duration-[600ms] ease-[cubic-bezier(.4,0,.2,1)]",
                  DEPTH[Math.min(depth, 2)],
                  isActive
                    ? cx(
                        /* no hard edge on the focused card — the shadow does
                           the separating, as in the reference */
                        "border-transparent bg-white shadow-tcard",
                        "hover:-translate-y-1.5 hover:scale-[1.035]",
                        "hover:border-primary/20 hover:shadow-tcardHot"
                      )
                    : "border-line bg-mist shadow-none"
                )}
                style={{ width: `${card}px` }}
              >
                <span
                  className="font-display text-[34px] leading-[0.5] text-accent"
                  aria-hidden="true"
                >
                  “
                </span>

                {/* the closing mark is a watermark the copy reads over, so it
                    is anchored to the bottom of the quote rather than to the
                    card corner — it lands in the same place whatever the
                    length of the quote */}
                <div className="relative flex-1">
                  {/* the glyph's ink sits in the top third of its line box,
                      so it is nudged down to land on the quote's last lines
                      rather than floating above them */}
                  <span
                    className="pointer-events-none absolute bottom-0 right-0 translate-y-[56%] font-display text-[112px] leading-none text-primary/10"
                    aria-hidden="true"
                  >
                    ”
                  </span>
                  <blockquote className="relative text-[16px] leading-[1.6] tracking-[-0.1px] text-ink-2">
                    {t.testimonial}
                  </blockquote>
                </div>

                <figcaption className="relative mt-auto flex items-center gap-3 border-t border-line pt-4">
                  <span
                    className="grid h-12 w-12 flex-none place-items-center rounded-full bg-avatar text-[14px] font-semibold tracking-[0.4px] text-white ring-4 ring-primary/10"
                    aria-hidden="true"
                  >
                    {initials(t.author)}
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <strong className="truncate text-[16px] font-bold text-ink">
                      {t.author}
                    </strong>
                    {t.topic && (
                      <span className="truncate text-[11px] font-semibold uppercase tracking-[1.4px] text-primary">
                        {t.topic}
                      </span>
                    )}
                  </span>
                </figcaption>

                {/* Click a side card to bring it forward. A real button so it
                    is a proper target, but hidden from assistive tech — the
                    arrows and dots already cover this for keyboard users, and
                    the card itself is aria-hidden out here. */}
                {!isActive && (
                  <button
                    type="button"
                    className="absolute inset-0 z-[1] cursor-pointer border-none bg-transparent"
                    /* pull it just inside the group from whichever side it
                       sits on, rather than always jumping it to the front */
                    onClick={() => go(i < index ? i : i - view + 1)}
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                )}
              </figure>
            );
          })}
        </div>
      </div>

      {/* One dot per testimonial. The leading card's dot is the wide one;
          any other card currently in focus gets a half-state, so a pair
          reads as a pair rather than as one selection. */}
      <div className="mt-2 flex justify-center gap-2">
        {TESTIMONIALS.map((t, i) => {
          const leading = lead === i;
          const shown = Array.from({ length: view }, (_, k) => (lead + k) % n).includes(
            i
          );
          return (
            <button
              key={t.author}
              type="button"
              aria-label={fill(copy.goTo, { author: t.author })}
              aria-current={leading}
              onClick={() => {
                /* travel whichever way round is shorter */
                let d = i - lead;
                if (d > n / 2) d -= n;
                if (d < -n / 2) d += n;
                go(index + d);
              }}
              className={cx(
                "h-1.5 cursor-pointer rounded-full border-none p-0 transition-all duration-300",
                leading && "w-[26px] bg-primary",
                !leading && shown && "w-3.5 bg-primary/40",
                !shown && "w-1.5 bg-line hover:bg-muted"
              )}
            />
          );
        })}
      </div>
    </section>
  );
}
