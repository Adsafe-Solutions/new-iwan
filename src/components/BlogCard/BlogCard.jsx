import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import { useCopy, useCountry, useHero, useNav } from "../../content/ContentProvider.jsx";
import { fill, truncate } from "../../lib/fill.js";
import { longDate, programmeOf } from "../../lib/events.js";
import { cx } from "../../lib/cx.js";

/* `relative` anchors the stretched title link that makes the whole card
   clickable — see the after:inset-0 below. */
const CARD = cx(
  "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white",
  "transition-[border-color,box-shadow,transform] duration-[250ms]",
  "hover:-translate-y-1 hover:border-primary hover:shadow-ecard"
);

const CHIP = cx(
  "inline-block rounded-full px-2 py-[3px]",
  "text-[11px] font-extrabold uppercase tracking-[0.12em]"
);

/* for a post that belongs to no single programme */
const CHIP_NEUTRAL = "bg-primary/[0.08] text-primary";

/* No photo on every post, so the card has to read without one: the tile falls
   back to a tinted block rather than leaving a hole where the image was. */
export default function BlogCard({ post, className }) {
  const copy = useCopy().blogsPage;
  const [country] = useCountry();
  const { pages } = useNav();
  const { logos } = useHero();

  const programme = programmeOf(post, pages);
  const chip = programme ? programme.label : copy.community;
  /* No photo on every post, so the tile falls back to the programme's mark —
     the community one where a post belongs to no single programme, in its dark
     cut. That file has NO transparency (the programme marks are ~87%
     transparent), so its white rectangle would show as a box on any tint —
     hence a white ground for it, and the soft tint only where the mark
     actually has an alpha channel. Re-export it transparent and this can use
     `soft` like the rest. */
  const mark = logos.find((l) => l.id === (programme?.mark ?? "community"));
  const tile = programme ? programme.soft : "bg-white";
  const chipTone = programme ? cx(programme.tone, "text-white") : CHIP_NEUTRAL;
  const to = `/blogs/${post.id}`;

  return (
    <article className={cx(CARD, className)}>
      <span className={cx("relative block aspect-[16/9] overflow-hidden", tile)}>
        {post.img ? (
          <img
            src={post.img}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
          />
        ) : (
          mark && (
            <span className="grid h-full w-full place-items-center px-8">
              <img
                src={mark.dark ?? mark.src}
                alt=""
                style={{ "--s": mark.scale ?? 1 }}
                className="w-[calc(132px*var(--s))] max-w-full opacity-90"
              />
            </span>
          )
        )}
      </span>

      <div className="flex flex-1 flex-col p-[1.25rem]">
        <div className="mb-2.5 flex flex-wrap items-center gap-3">
          <span className={cx(CHIP, chipTone)}>{chip}</span>
          {post.date && (
            <span className="text-[12px] font-semibold text-muted">
              {longDate(post.date, country.locale)}
            </span>
          )}
        </div>

        <h3 className="mb-2 text-[20px] font-bold leading-[1.28] tracking-[-0.01em]">
          <Link
            to={to}
            aria-label={fill(copy.more, { title: post.title })}
            /* the whole card reads as one target: the link stretches over it,
               and the footer out-stacks it so it still takes its own click */
            className="after:absolute after:inset-0 after:content-[''] hover:text-primary"
          >
            {post.title}
          </Link>
        </h3>

        {/* the source excerpts run from one line to a full paragraph, so the
            card cuts them rather than letting one tile set the row height */}
        <p className="mb-5 flex-1 text-[14px] leading-[22px] text-muted">
          {truncate(post.excerpt, 150)}
        </p>

        <span className="relative z-[1] inline-flex items-center gap-1 border-t border-line pt-4 text-[14px] font-bold text-primary">
          {copy.read}
          <IconArrowRight className="h-4 w-4" stroke={2} aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
