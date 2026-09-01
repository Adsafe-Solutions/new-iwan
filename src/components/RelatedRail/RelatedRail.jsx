import { cx } from "../../lib/cx.js";

/* "More like this" under a blog post or podcast episode. `items` are the
   API's related cards (same programme first); `render` draws one — BlogPost
   hands in a BlogCard, PodcastEpisode a PodcastCard — so this stays a frame
   and never learns either card's shape.

   ⚠ No `.reveal` — see the note in DetailNav. */
export default function RelatedRail({ heading, items = [], render, className }) {
  if (items.length === 0) return null;

  return (
    <section className={cx("mt-12", className)}>
      <h2 className="mb-5 text-[13px] font-extrabold uppercase tracking-[0.14em] text-primary">
        {heading}
      </h2>
      {/* A plain x-axis carousel — the same treatment the About page's core
          values strip uses: a REAL scroll container, so it swipes on a phone,
          takes the keyboard and needs no JavaScript, with the scrollbar
          hidden and snap points so cards settle cleanly. The negative margin
          lets it bleed to the column's padding edges, so a clipped card at
          the right edge is what says "there is more". */}
      <div
        className={cx(
          "-mx-6 snap-x snap-mandatory overflow-x-auto overflow-y-hidden px-6 pb-2",
          "[-ms-overflow-style:none] [scrollbar-width:none]",
          "[&::-webkit-scrollbar]:hidden"
        )}
      >
        <div className="flex gap-5">
          {items.map((item) => (
            <div key={item.id} className="w-[min(360px,80vw)] flex-none snap-start">
              {render(item)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
