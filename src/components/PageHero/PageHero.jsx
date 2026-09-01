import { cx } from "../../lib/cx.js";

/* Full-bleed photo hero, in one of the two treatments the site already uses.

   variant="card"    — dark scrim, white card sitting on the left of it.
                       The Zakat page's hero; `aside` is the block that
                       floats bottom-right and retires below the nav
                       breakpoint rather than colliding with the card.

   variant="overlay" — the homepage treatment: copy set straight onto the
                       photograph, eyebrow in the accent, a display-serif
                       title, and one soft CTA. No card.

   Both use `bg-hero-scrim` / `bg-zhero-scrim` from tailwind.config.js —
   the gradients are what keep the copy readable over any photograph. */
export default function PageHero({
  img,
  imgAlt = "",
  variant = "card",
  /* overlay only: "left" centres the copy block against the left edge,
     "bottom-left" drops it to the foot of the photograph. Both keep the copy
     on the left, which is the side `hero-scrim` darkens. */
  anchor = "left",
  eyebrow,
  title,
  excerpt,
  className,
  cardClassName = "w-[480px]",
  aside,
  children,
}) {
  const overlay = variant === "overlay";

  return (
    <section
      className={cx(
        "relative flex overflow-hidden",
        overlay && anchor === "bottom-left" ? "items-end" : "items-center",
        overlay ? "bg-primary-800" : "bg-shade",
        className ?? (overlay ? "h-[78vh] min-h-[620px]" : "h-[66vh] min-h-[560px]"),
        overlay && "max-phone:h-auto max-phone:min-h-[70svh] max-phone:py-20"
      )}
    >
      <div
        className={cx(
          "absolute inset-0 bg-cover bg-center after:absolute after:inset-0 after:content-['']",
          overlay ? "after:bg-hero-scrim" : "after:bg-zhero-scrim"
        )}
        style={{ backgroundImage: `url(${img})` }}
        role="img"
        aria-label={imgAlt}
      />

      <div className="relative z-[2] mx-auto w-full max-w-container px-6">
        {overlay ? (
          /* copy straight on the photo — same scale as the homepage hero */
          <div className={cx("max-w-[750px]", anchor === "bottom-left" && "pb-10")}>
            {eyebrow}
            {title && (
              <h1
                className={cx(
                  "mb-6 font-display font-normal text-white",
                  "text-[clamp(2.6rem,6vw,72px)] leading-[1.1]"
                )}
              >
                {title}
              </h1>
            )}
            {excerpt && (
              <p className="mb-9 max-w-[46ch] font-satoshi text-[20px] leading-[30px] text-white max-phone:text-[17px] max-phone:leading-[26px]">
                {excerpt}
              </p>
            )}
            {children}
          </div>
        ) : (
          <div
            className={cx(
              "max-w-full rounded-2xl bg-white px-8 py-10 shadow-card",
              "max-xs:px-[22px] max-xs:py-7",
              cardClassName
            )}
          >
            {eyebrow}
            {title && (
              <h1 className="mb-[0.7rem] mt-[0.4rem] text-[30px] font-bold leading-[37.5px] tracking-[-0.6px] text-slate">
                {title}
              </h1>
            )}
            {children}
          </div>
        )}
      </div>

      {aside}
    </section>
  );
}
