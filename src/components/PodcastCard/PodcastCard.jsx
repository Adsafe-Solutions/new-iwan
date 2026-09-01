import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import { useCopy, useHero, useNav } from "../../content/ContentProvider.jsx";
import { programmeOf } from "../../lib/events.js";
import { fill } from "../../lib/fill.js";
import { duration } from "../../lib/podcast.js";
import MediaBrand from "../MediaBrand/MediaBrand.jsx";
import { cx } from "../../lib/cx.js";

/* `relative` anchors the stretched title link that makes the whole card
   clickable — same pattern as BlogCard. */
const CARD = cx(
  "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white",
  "transition-[border-color,box-shadow,transform] duration-[250ms]",
  "hover:-translate-y-1 hover:border-primary hover:shadow-ecard"
);

/* One card per episode on /podcast, linking through to /podcast/:id rather
   than embedding a player — AudioPlayer only ever appears once an episode
   has been picked, on its own page. */
export default function PodcastCard({ episode, cover, index, className }) {
  const copy = useCopy().podcastPage;
  const { logos } = useHero();
  const { pages } = useNav();
  const to = `/podcast/${episode.id}`;

  /* Same fallback BlogCard uses for a post with no photo: the episode's own
     programme mark, or the community one where it belongs to none, in its dark
     cut for a light ground. ⚠ That file has NO transparency, so it needs a
     white ground rather than the tint a real cover sits on — see BlogCard. */
  const programme = programmeOf(episode, pages);
  const mark = logos.find((l) => l.id === (programme?.mark ?? "community"));

  return (
    <article className={cx(CARD, className)}>
      <span
        className={cx(
          "relative block aspect-[16/9] overflow-hidden",
          programme ? programme.soft : "bg-white"
        )}
      >
        {cover ? (
          /* Fills the tile, like BlogCard. A real photograph contained inside
             a tinted box reads as a thumbnail floating in padding — which is
             what this looked like before. Only the LOGO fallback below is
             contained, because a wordmark cropped to 16/9 loses half itself. */
          <>
            <img
              src={cover}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
            />
            {/* photo branch only — a logo stamped over the mark below is noise */}
            <MediaBrand size={52} />
          </>
        ) : (
          mark && (
            <span className="grid h-full w-full place-items-center px-8">
              <img
                src={mark.dark ?? mark.src}
                alt=""
                loading="lazy"
                style={{ "--s": mark.scale ?? 1 }}
                className="w-[calc(132px*var(--s))] max-w-full opacity-90"
              />
            </span>
          )
        )}
      </span>

      <div className="flex flex-1 flex-col p-[1.25rem]">
        <div className="mb-2.5 flex flex-wrap items-center gap-3">
          {/* The related rail passes no index — a wrong number is worse than
              none, so the chip simply stays off there. */}
          {Number.isFinite(index) && (
            <span className="inline-block rounded-full bg-primary/[0.08] px-2 py-[3px] text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary">
              {fill(copy.episode, { n: String(index + 1).padStart(2, "0") })}
            </span>
          )}
          {Number.isFinite(episode.length) && (
            <span className="text-[12px] font-semibold text-muted">
              {duration(episode.length)}
            </span>
          )}
        </div>

        <h3 className="mb-2 text-[20px] font-bold leading-[1.28] tracking-[-0.01em]">
          <Link
            to={to}
            aria-label={fill(copy.more, { title: episode.title })}
            className="after:absolute after:inset-0 after:content-[''] hover:text-primary"
          >
            {episode.title}
          </Link>
        </h3>

        {episode.author && (
          <p className="mb-5 flex-1 text-[14px] leading-[22px] text-muted">
            {fill(copy.by, { author: episode.author })}
          </p>
        )}

        <span className="relative z-[1] inline-flex items-center gap-1 border-t border-line pt-4 text-[14px] font-bold text-primary">
          {copy.listen}
          <IconArrowRight className="h-4 w-4" stroke={2} aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
