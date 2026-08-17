import { useId } from "react";
import Icon from "../Icon/Icon.jsx";
import { cx } from "../../lib/cx.js";

/* An "about" lede — one badged icon, a heading and a paragraph — with a row
   of ringed icons beneath it naming what the thing actually gives you.

   It replaces what used to be two separate sections on the programme pages
   (a prose block, then a grid of tiles saying much the same). Folding them
   together is the point: one statement, then its consequences.

   Spacing follows an 8px rhythm throughout. Entrance animation is the
   site-wide GSAP one — `.reveal` fades and rises, `data-stagger` cascades
   the children — so there is no second observer here, and the global
   prefers-reduced-motion rule already switches it off.

   `tone` / `soft` are Tailwind classes, so the caller passes the colour of
   whichever programme is on screen. */
export default function AboutStrip({
  /* [EYEBROW] — optional small uppercase label above the title */
  eyebrow,
  /* the badged glyph beside the heading; names come from Icon.jsx */
  icon = "globe",
  /* [TITLE] */
  heading,
  /* [SUBTITLE] — optional single line under the title, set larger than body */
  subtitle,
  /* [BODY] — a string, or an array of paragraphs */
  body,
  /* [ITEMS] — { icon, title, body } each; renders 3 or 4 across */
  items = [],
  tone = "text-primary",
  soft = "bg-primary/10",
  className = "bg-cream py-16 max-phone:py-12",
}) {
  const headingId = useId();
  const paras = Array.isArray(body) ? body : [body].filter(Boolean);

  return (
    <section className={className} aria-labelledby={headingId}>
      <div className="mx-auto w-full max-w-container px-6">
        {/* ---- lede: badge + copy ---- */}
        <div className="reveal flex gap-6 max-phone:flex-col max-phone:gap-4">
          <span
            className={cx(
              "grid h-16 w-16 flex-none place-items-center rounded-full",
              soft,
              tone
            )}
          >
            <Icon name={icon} className="h-7 w-7" />
          </span>

          <div className="max-w-[68ch]">
            {eyebrow && (
              <p
                className={cx(
                  "mb-3 text-[13px] font-semibold uppercase tracking-[0.12em]",
                  tone
                )}
              >
                {eyebrow}
              </p>
            )}

            <h2
              id={headingId}
              /* sized to the reference, where the heading sits only a little
                 above the body and reads as the icon badge's equal — not the
                 display-scale clamp(2rem,4vw,3.25rem) a generic about section
                 would use */
              className="text-[clamp(1.75rem,2.6vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.02em] text-ink"
            >
              {heading}
            </h2>

            {subtitle && (
              <p className="mt-3 text-[19px] leading-[1.6] text-ink-2">{subtitle}</p>
            )}

            {paras.map((para) => (
              <p
                className="mt-3 text-[17px] leading-[1.7] text-muted"
                key={para.slice(0, 24)}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* ---- consequences ---- */}
        {items.length > 0 && (
          <div
            className={cx(
              "mt-12 grid gap-x-8 gap-y-10 max-phone:mt-10",
              items.length === 4 ? "grid-cols-4" : "grid-cols-3",
              "max-nav:grid-cols-2 max-phone:grid-cols-1"
            )}
            data-stagger
          >
            {items.map((it) => (
              <div className="reveal text-center" key={it.title}>
                <span
                  className={cx(
                    "mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full",
                    "border-2 border-current transition-transform duration-200",
                    tone
                  )}
                >
                  <Icon name={it.icon} className="h-6 w-6" />
                </span>
                <h3 className="mb-2 text-[18px] font-bold text-ink">{it.title}</h3>
                <p className="mx-auto max-w-[34ch] text-[15px] leading-[1.6] text-muted">
                  {it.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
