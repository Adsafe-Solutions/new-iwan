import { cx } from "../../lib/cx.js";

/* A numbered journey laid out left to right, with a rule running between
   the markers. Each step is its own grid column and the connector is drawn
   from the centre of one marker to the centre of the next — which is why
   the grid has no gap and the breathing room lives in the columns' own
   padding. Give the grid a gap and the rule stops short of the next dot.

   The fill-then-draw sequence is scrubbed to scroll by the [data-journey]
   handler in useGsap.js: marker 1 fills and its copy sharpens out of blur,
   its rule draws across to marker 2, marker 2 fills, and so on. The section pins while that plays and releases
   once it is done. Everything starts in its "empty" state as a class, so
   there is no flash before GSAP takes over, and the reduced-motion branch
   simply sets the finished state.

   Below the drawer breakpoint the row becomes a stack, the connectors are
   dropped rather than left dangling sideways, and nothing pins. */
export default function Journey({
  heading,
  subtitle,
  steps = [],
  /* a text-* class — the markers and rules paint with currentColor */
  tone = "text-primary",
  className = "py-20 max-phone:py-14",
}) {
  if (steps.length === 0) return null;

  return (
    <section className={className} data-journey>
      <div className="mx-auto w-full max-w-container px-6">
        <h2 className="reveal mx-auto max-w-[24ch] text-center text-[clamp(1.7rem,3vw,34px)] font-bold leading-[1.15] tracking-[-0.01em] text-ink">
          {heading}
        </h2>
        {subtitle && (
          <p className="reveal mx-auto mt-3 max-w-[52ch] text-center text-[17px] leading-[1.7] text-muted">
            {subtitle}
          </p>
        )}

        <ol
          className={cx(
            "mt-14 grid gap-0 max-phone:mt-10 max-phone:gap-10",
            steps.length === 3 ? "grid-cols-3" : "grid-cols-4",
            "max-nav:grid-cols-2 max-phone:grid-cols-1",
            tone
          )}
        >
          {steps.map((s, i) => (
            <li
              className="relative flex flex-col items-center px-4 text-center"
              key={s.title}
            >
              {i < steps.length - 1 && (
                <>
                  {/* the unfilled track, then the progress rule drawn over it */}
                  <span
                    className="absolute left-1/2 top-6 h-px w-full bg-line max-nav:hidden"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute left-1/2 top-[23px] h-[2px] w-full origin-left scale-x-0 bg-current will-change-transform max-nav:hidden"
                    data-journey-line
                    aria-hidden="true"
                  />
                </>
              )}

              <span
                className={cx(
                  "relative z-[1] grid h-12 w-12 place-items-center rounded-full",
                  "border-2 border-current bg-white"
                )}
                aria-hidden="true"
              >
                <span
                  className="absolute inset-[-2px] scale-0 rounded-full bg-current will-change-transform"
                  data-journey-fill
                />
                <span className="relative z-[1] text-[17px] font-bold" data-journey-num>
                  {i + 1}
                </span>
              </span>

              {/* Blurred until this step's marker fills, then sharpened by
                  the same scrubbed timeline. `[filter:blur(6px)]` rather than
                  Tailwind's `blur-*`, which composes through --tw-blur and
                  gives GSAP a filter string it cannot cleanly interpolate. */}
              <div className="mt-5 opacity-40 [filter:blur(6px)]" data-journey-copy>
                <h3 className="mb-2 text-[18px] font-bold text-ink">{s.title}</h3>
                <p className="mx-auto max-w-[32ch] text-[15px] leading-[1.6] text-muted">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
