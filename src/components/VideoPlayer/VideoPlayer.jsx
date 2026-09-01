import { useCopy } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { cx } from "../../lib/cx.js";
import { youtubeId } from "../../lib/podcast.js";

/* The video half of an episode, in the same card as AudioPlayer so the two read
   as one family. Episodes carry a YouTube link — the CMS refuses anything else
   — so this embeds rather than serving a file.

   ⚠ `youtube-nocookie.com`, which does not write a tracking cookie until the
   visitor actually presses play. `loading="lazy"` keeps the iframe off the
   critical path, the same instinct behind the audio player's `preload="none"`. */
export default function VideoPlayer({ src, title, author, className }) {
  const copy = useCopy().podcastPage;
  const id = youtubeId(src);

  /* Nothing to embed. The CMS cannot store such a URL, but a stale payload or
     the static content can still hand one over, and an empty frame is worse
     than no frame. */
  if (!id) return null;

  return (
    <article
      className={cx(
        "relative overflow-hidden rounded-2xl border border-white/[0.06]",
        "bg-gradient-to-br from-primary-800 to-ink shadow-pop",
        "p-8 max-phone:p-6",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-[300px] w-[300px] rounded-full bg-teal/25 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-16 h-[260px] w-[260px] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative z-[1]">
        <div className="overflow-hidden rounded-xl bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
            title={title || copy.episodesHeading}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="aspect-video w-full border-0"
          />
        </div>

        {(title || author) && (
          <div className="mt-6 min-w-0">
            {title && (
              <h3 className="mb-1 text-[24px] font-black uppercase leading-[1.15] tracking-[-0.01em] text-white max-phone:text-[19px]">
                {title}
              </h3>
            )}
            {author && (
              <p className="text-[14px] font-semibold text-white/60">
                {fill(copy.by, { author })}
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
