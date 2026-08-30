import { useCopy, useWays } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_YB } from "../../lib/type.js";

/* ---------- WAYS TO CONNECT ----------
   The eight tracks from content/base/ways.js. Not programmes — those have
   pages of their own and are dealt out by ProgrammeDeck one section up —
   these are the kinds of thing that happen inside them, so nothing here
   links anywhere yet. A card that went somewhere it has no page for would
   be a dangling link, which is the mistake /iwan-women already taught us.

   ⚠ The arch is cropped out of the logo rather than the whole mark being
   shown: five of the eight tracks borrow a delivered logo until their own
   is drawn (see ways.js), and the wordmark baked into those exports would
   have a card headed "play @ iwan" displaying artwork reading "read @iwan".
   The arch alone is the top 161px of every 600-wide export, identical in
   all three, so the marks line up across the grid. Showing the whole logo
   again is a change to GLYPH and nothing else. */

/* the arch, without the wordmark underneath it */
const GLYPH = "aspect-[600/161]";

const CARD = cx(
  "reveal group relative flex h-full flex-col overflow-hidden rounded border border-line bg-white p-6 pt-7",
  "transition-transform duration-[350ms] hover:-translate-y-2 hover:shadow-card"
);
const CHIP =
  "inline-flex items-center rounded-full border border-line px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-muted";

export default function WaysToConnect() {
  const copy = useCopy().waysToConnect;
  const WAYS = useWays();

  return (
    <section className="bg-cream py-[4.5rem]" id="ways">
      <div className="mx-auto w-full max-w-container px-6">
        <h2 className={cx(KICKER, "reveal mb-[1.1rem]")}>
          {copy.heading} <span className={MARK_YB}>{copy.mark}</span>
        </h2>

        <p className="reveal mb-[2.6rem] max-w-[62ch] text-[18px] leading-[29px] text-muted">
          {copy.body}
        </p>

        <div
          className="grid grid-cols-4 gap-4 max-nav:grid-cols-2 max-phone:grid-cols-1"
          data-stagger
        >
          {WAYS.map((w) => (
            <article className={CARD} key={w.id}>
              {/* the track's colour, full width, so the grid reads as a set
                  of eight rather than eight unrelated boxes */}
              <span
                aria-hidden="true"
                className={cx("absolute inset-x-0 top-0 h-[4px]", w.tone)}
              />

              <span
                aria-hidden="true"
                className={cx(
                  GLYPH,
                  "mb-5 block w-[104px] flex-none overflow-hidden",
                  "transition-transform duration-[350ms] group-hover:scale-[1.06] origin-left"
                )}
              >
                <img alt="" className="w-full" src={w.logo} />
              </span>

              <h3 className="text-[26px] font-black lowercase leading-none tracking-[-0.01em] text-ink">
                {w.name} <span className="text-[17px] font-bold text-muted">@ iwan</span>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
