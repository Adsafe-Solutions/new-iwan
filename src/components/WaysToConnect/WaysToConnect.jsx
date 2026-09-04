import { useCopy, useWays } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_YB } from "../../lib/type.js";

/* ---------- WAYS TO CONNECT ----------
   The seven tracks from content/base/ways.js. Not programmes — those have
   pages of their own and are dealt out by ProgrammeDeck one section up —
   these are the kinds of thing that happen inside them, so nothing here
   links anywhere yet. A card that went somewhere it has no page for would
   be a dangling link, which is the mistake /iwan-women already taught us.

   The row is the same pinned horizontal strip as the core values on
   /about-us: [data-hscroll] on the section, [data-hscroll-wrap] on the
   scroll container. See useGsap.js — it drives the wrapper's own scrollLeft
   rather than translating a track, so with JavaScript off, on a phone, or
   under prefers-reduced-motion this is still a plainly swipeable strip.

   Each card is a mark on a plate over a white body, the same treatment
   ProgrammeDeck gives a programme: the logo is what names a track, so it
   gets the room a stock picture used to take. The plate is tinted from the
   track's own colour, a light tint of the same hue the rule above it uses,
   so the mark, plate and rule read as one palette.

   Every track has its own mark now, but the `borrowed` path stays for the
   next track added ahead of its logo: a borrowed card shows the ARCH ONLY,
   because the wordmark baked into the export would have a card headed
   "play @ iwan" displaying artwork reading "read @iwan". The arch is the
   top 161px of every 600-wide export and is the same box in all of them,
   so the marks line up across the grid, and the plate is a fixed height
   either way, so a borrowed card and a real one are the same size. */

/* the arch, without the wordmark underneath it */
const ARCH = "block w-[128px] overflow-hidden aspect-[600/161]";
/* a real mark, wordmark and all — capped so the tallest export (600×291)
   still sits inside the plate with air around it */
const FULL = "block w-[128px]";

/* ⚠ No `reveal` here. These cards travel in from off the right edge as the
   section is pinned, and GSAP's reveal pass would leave the ones that start
   outside the viewport stranded at opacity 0. */
const CARD = cx(
  "group flex w-[364px] flex-none flex-col overflow-hidden rounded-2xl border border-line bg-white",
  "transition-transform duration-[350ms] hover:-translate-y-2 hover:shadow-card",
  "max-nav:w-full"
);
const PLATE = cx(
  "flex h-[124px] flex-none items-center justify-center overflow-hidden",
  "transition-transform duration-[350ms] group-hover:scale-[1.06]"
);
const CHIP =
  "inline-flex items-center rounded-full border border-line px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-muted";

export default function WaysToConnect() {
  const copy = useCopy().waysToConnect;
  const WAYS = useWays();

  return (
    <section className="bg-cream py-[4.5rem]" id="ways" data-hscroll>
      <div className="mx-auto w-full max-w-container px-6">
        <h2 className={cx(KICKER, "reveal mb-[1.1rem]")}>
          {copy.heading} <span className={MARK_YB}>{copy.mark}</span>
        </h2>

        <p className="reveal max-w-[62ch] text-[18px] leading-[29px] text-muted">
          {copy.body}
        </p>
      </div>

      {/* Full-bleed, and a real scroll container — see [data-hscroll] above. */}
      <div
        data-hscroll-wrap
        className={cx(
          /* py, not pb: the cards lift on hover and overflow-y clips at the
             padding box, so without room above they get cut along the top */
          "mt-[2.6rem] overflow-x-auto overflow-y-hidden py-4",
          "[-ms-overflow-style:none] [scrollbar-width:none]",
          "[&::-webkit-scrollbar]:hidden"
        )}
      >
        {/* pl only, with a spacer for the trailing gutter: Chrome leaves a
            flex container's padding-right out of its scrollable overflow, so
            padding there would stop the travel short and leave the last card
            cut off at the edge. */}
        <div className="flex gap-4 pl-[max(1.5rem,calc((100vw-var(--container))/2+1.5rem))] max-nav:flex-col max-nav:pl-6 max-nav:pr-6">
          {WAYS.map((w) => (
            <article className={CARD} key={w.id}>
              {/* the track's colour, full width, so the row reads as a set
                  of seven rather than seven unrelated boxes */}
              <span aria-hidden="true" className={cx("h-[4px] flex-none", w.tone)} />

              <span aria-hidden="true" className={cx(PLATE, w.soft)}>
                <span className={w.borrowed ? ARCH : FULL}>
                  <img alt="" className="w-full" src={w.logo} />
                </span>
              </span>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[26px] font-black lowercase leading-none tracking-[-0.01em] text-ink">
                  {w.name}{" "}
                  <span className="text-[17px] font-bold text-muted">@ iwan</span>
                </h3>

                <p className="mb-5 mt-3 text-[15px] leading-[23px] text-muted">
                  {w.activity}
                </p>

                <ul className="mt-auto flex flex-wrap gap-2">
                  {w.examples.map((e) => (
                    <li className={CHIP} key={e}>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
          <span
            aria-hidden="true"
            className="w-[max(1.5rem,calc((100vw-var(--container))/2+1.5rem))] flex-none max-nav:hidden"
          />
        </div>
      </div>
    </section>
  );
}
