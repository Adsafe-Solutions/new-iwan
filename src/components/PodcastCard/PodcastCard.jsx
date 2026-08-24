import { Link } from "react-router-dom";
import { IconArrowRight, IconPlayerPlayFilled } from "@tabler/icons-react";
import { useCopy } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { duration } from "../../lib/podcast.js";
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
  const to = `/podcast/${episode.id}`;

  return (
    <article className={cx(CARD, className)}>
      {/* contain on a tinted ground, not cover: the artwork is a wide logo,
          and a square crop cuts the wordmark in half — same as the show
          band above this grid and the player itself. */}
      <span className="relative grid aspect-[16/9] place-items-center overflow-hidden bg-mist px-10">
        {cover ? (
          <img
            src={cover}
            alt=""
            loading="lazy"
            className="max-h-[70%] w-full object-contain transition-transform duration-[600ms] group-hover:scale-[1.04]"
          />
        ) : (
          <IconPlayerPlayFilled
            className="h-10 w-10 text-primary/30"
            aria-hidden="true"
          />
        )}
      </span>

      <div className="flex flex-1 flex-col p-[1.25rem]">
        <div className="mb-2.5 flex flex-wrap items-center gap-3">
          <span className="inline-block rounded-full bg-primary/[0.08] px-2 py-[3px] text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary">
            {fill(copy.episode, { n: String(index + 1).padStart(2, "0") })}
          </span>
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
