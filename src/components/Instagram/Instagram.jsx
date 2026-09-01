import { IconArrowUpRight, IconBrandInstagram } from "@tabler/icons-react";
import { useCopy, useInstagram } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B } from "../../lib/type.js";

/* A packed mosaic rather than a tidy row of thumbnails: CSS multi-column
   lays the tiles out as true masonry, and the varied aspect ratios below
   are what stop the columns squaring off into a plain grid.

   Whole class names in a literal list, because Tailwind scans this file as
   plain text — an aspect built by interpolation would never be generated.
   The list cycles, so any number of tiles works. */
const ASPECTS = [
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/3]",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[3/4]",
];

const TILE = "mb-3 block break-inside-avoid overflow-hidden rounded-2xl bg-ink";
const IMG =
  "h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.07]";

export default function Instagram() {
  const {
    handle: INSTAGRAM_HANDLE,
    url: INSTAGRAM_URL,
    posts: INSTAGRAM_POSTS,
    isLive: INSTAGRAM_IS_LIVE,
  } = useInstagram();
  const copy = useCopy().instagram;
  if (INSTAGRAM_POSTS.length === 0) return null;

  return (
    <section className="bg-mist py-[4.5rem]" id="instagram">
      <div className="mx-auto w-full max-w-container px-6">
        <div className="mb-9 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className={cx(KICKER, "reveal !mb-2")}>
              {copy.heading} <span className={MARK_B}>{copy.mark}</span>
            </h2>
            <p className="reveal text-[17px] leading-[1.7] text-muted">{copy.body}</p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer noopener"
            className={cx(
              "reveal group inline-flex flex-none items-center gap-2.5 rounded-full",
              "bg-primary px-6 py-3 text-[15px] font-bold text-white",
              "transition-[background-color,transform] duration-200",
              "hover:-translate-y-0.5 hover:bg-primary-dark"
            )}
          >
            <IconBrandInstagram className="h-5 w-5" stroke={2} aria-hidden="true" />
            {copy.cta}
            <IconArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              stroke={2}
              aria-hidden="true"
            />
          </a>
        </div>

        {/* gap-3 on the columns and mb-3 on the tiles have to match, or the
            horizontal and vertical gutters come out uneven */}
        <div
          className="columns-6 gap-3 max-wide:columns-5 max-nav:columns-4 max-phone:columns-2"
          data-stagger
        >
          {INSTAGRAM_POSTS.map((post, i) => {
            const shape = ASPECTS[i % ASPECTS.length];
            const inner = (
              <img
                src={post.img}
                /* decorative: the tile is either a labelled link, or a
                   placeholder that says nothing about Iwan */
                alt=""
                loading="lazy"
                className={IMG}
              />
            );

            /* Placeholders are not links — twelve identical "View on
               Instagram" links would be worse than none, and the header
               CTA already covers it. Real posts each go somewhere. */
            return INSTAGRAM_IS_LIVE ? (
              <a
                key={post.img}
                href={post.href ?? INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={post.label}
                className={cx(TILE, shape, "reveal group relative")}
              >
                {inner}
                <span
                  className={cx(
                    "absolute inset-0 grid place-items-center bg-ink/55 text-white",
                    "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  )}
                  aria-hidden="true"
                >
                  <IconBrandInstagram className="h-7 w-7" stroke={1.8} />
                </span>
              </a>
            ) : (
              <div
                key={post.img}
                className={cx(TILE, shape, "reveal group relative")}
                aria-hidden="true"
              >
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
