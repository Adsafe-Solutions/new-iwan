import { useId } from "react";
import { cx } from "../../lib/cx.js";

/* The v2 "about" treatment: an editorial two-column spread. Left is the
   argument — a ruled eyebrow, an oversized heading with one word set in
   italic accent, the lede, a headline stat and a photograph. Right is the
   detail, as numbered rows separated by hairlines.

   The left column is sticky: it pins while the rows scroll past it, and
   only releases once the last row has cleared — so the section reads as
   one held thought rather than two columns racing each other. Nothing is
   clipped and nothing scrolls inside itself, so the page keeps its own
   scrollbar and the rows keep their normal `.reveal` entrance.

   Same content as AboutStrip, so the two are interchangeable — which one
   renders is `SECTIONS.programmeAbout`.

   Entrance is the site's own GSAP: `.reveal` fades and rises, `data-line`
   draws the eyebrow rule out from the left, `data-stagger` cascades the
   rows. No second observer, and the global reduced-motion rule already
   switches all of it off. */

/* Splits the heading around `accent` so that one word can carry the
   italic. Falls back to the plain heading when the word isn't found. */
function Heading({ text, accent, tone }) {
  const at = accent ? text.indexOf(accent) : -1;
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <em className={cx("italic", tone)}>{accent}</em>
      {text.slice(at + accent.length)}
    </>
  );
}

export default function AboutSplit({
  /* [EYEBROW] */
  eyebrow,
  /* [TITLE] + the single word inside it to set in accent italic */
  heading,
  accent,
  /* [BODY] — a string, or an array of paragraphs */
  body,
  /* [STAT] — optional { value, label }, e.g. "Dozens" / "of leaders trained" */
  stat,
  /* [ITEMS] — { title, body } each, numbered in order */
  items = [],
  tone = "text-primary",
  /* whole class, never built by interpolation — Tailwind scans this file
     as plain text and would generate nothing from `"hover:" + tint` */
  hoverTint = "hover:bg-primary/5",
  className = "bg-sand py-28 max-phone:py-16",
}) {
  const headingId = useId();
  const paras = Array.isArray(body) ? body : [body].filter(Boolean);

  return (
    <section className={className} aria-labelledby={headingId}>
      <div
        className={cx(
          "mx-auto grid w-full max-w-[1240px] items-start gap-24 px-6",
          "grid-cols-[1.05fr_1fr]",
          "max-nav:grid-cols-1 max-nav:gap-12"
        )}
      >
        {/* ---- the argument, pinned ---- */}
        <div
          className={cx(
            "flex flex-col gap-[30px]",
            /* clears the sticky header; released again once stacked */
            "sticky top-[calc(theme(spacing.header)+2.5rem)] self-start",
            "max-nav:static"
          )}
        >
          {eyebrow && (
            <div className={cx("reveal flex items-center gap-3.5", tone)}>
              <span
                className="block h-px w-[46px] origin-[left_center] scale-x-0 bg-current will-change-transform"
                data-line
                aria-hidden="true"
              />
              {/* the site's own eyebrow treatment — bold tracked caps —
                  rather than the reference's thin mono */}
              <span className="text-[13px] font-bold uppercase tracking-[0.16em]">
                {eyebrow}
              </span>
            </div>
          )}

          <h2
            id={headingId}
            className="reveal max-w-[12ch] text-[clamp(2.3rem,4.8vw,68px)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink"
          >
            <Heading text={heading} accent={accent} tone={tone} />
          </h2>

          {paras.map((para) => (
            <p
              className="reveal max-w-[46ch] text-[19px] leading-[1.62] text-muted"
              key={para.slice(0, 24)}
            >
              {para}
            </p>
          ))}

          {stat && (
            <div className="reveal flex items-baseline gap-[18px] border-t border-ink/10 pt-7">
              <span className="text-[clamp(2.4rem,4vw,52px)] font-semibold leading-[0.95] tracking-[-0.03em] text-ink">
                {stat.value}
              </span>
              <span className="max-w-[22ch] text-[15px] leading-[1.5] text-muted">
                {stat.label}
              </span>
            </div>
          )}
        </div>

        {/* ---- the detail ---- */}
        <div className="flex flex-col" data-stagger>
          {items.map((it, i) => (
            <div
              className={cx(
                "reveal group grid grid-cols-[62px_minmax(0,1fr)] items-start gap-x-7",
                "border-t border-ink/15 py-14 pr-1 last:border-b max-phone:py-10",
                "transition-colors duration-300",
                hoverTint
              )}
              key={it.title}
            >
              <span
                className={cx(
                  "pt-[7px] font-mono text-[12px] tracking-[0.16em]",
                  "transition-transform duration-300 group-hover:translate-x-1.5",
                  tone
                )}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-[9px] transition-transform duration-300 group-hover:translate-x-1.5">
                <h3 className="text-[22px] font-semibold tracking-[-0.01em] text-ink">
                  {it.title}
                </h3>
                <p className="max-w-[44ch] text-[16.5px] leading-[1.6] text-muted">
                  {it.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
