import { cx } from "../../lib/cx.js";
import { H_BLOCK, MARK_B } from "../../lib/type.js";

/* headingLines: a string renders as a plain line, { mark } renders as a
   highlighted one, so the caller controls where the block breaks. */
export default function TrustedBy({
  id = "trusted-by",
  eyebrow,
  headingLines = [],
  items = [],
  wipeTone = "bg-accent",
  className = "py-[4.5rem]",
}) {
  if (items.length === 0 && headingLines.length === 0) return null;

  return (
    <section
      className={cx("relative overflow-hidden", className)}
      id={id}
      data-wipe-scene
    >
      <div
        className={cx(
          "absolute inset-0 z-0 h-full w-full origin-[left_center] scale-x-0 will-change-transform",
          wipeTone
        )}
        data-wipe
      />

      <div className="relative z-[1] mx-auto grid w-full max-w-container grid-cols-[1.1fr_0.9fr] items-center gap-10 px-6 max-nav:grid-cols-1 max-nav:gap-12">
        {headingLines.length > 0 && (
          <h2
            className={cx(
              H_BLOCK,
              "reveal text-[clamp(2.4rem,5vw,64px)] leading-[1.12] tracking-[-0.64px]"
            )}
          >
            {headingLines.map((line, i) => (
              <span key={typeof line === "string" ? line : line.mark}>
                {i > 0 && <br />}
                {typeof line === "string" ? (
                  line
                ) : (
                  <span
                    className={cx(MARK_B, "my-[0.15em] !inline-block whitespace-nowrap")}
                  >
                    {line.mark}
                  </span>
                )}
              </span>
            ))}
          </h2>
        )}

        {items.length > 0 && (
          <div className="reveal text-center">
            {eyebrow && (
              <p className="mb-[1.4rem] text-[12px] font-bold uppercase leading-4 tracking-[1.2px] text-ink-2 opacity-70">
                {eyebrow}
              </p>
            )}
            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-4" data-stagger>
              {items.map((it) => (
                <div
                  className="reveal flex flex-col items-center gap-2.5"
                  key={it.label ?? it.alt}
                >
                  <span className="grid h-[104px] w-full place-items-center rounded-xl bg-white px-5 shadow max-phone:h-[88px]">
                    <img
                      src={it.src}
                      alt={it.alt ?? ""}
                      style={{ "--s": it.scale ?? 1 }}
                      className="w-[calc(130px*var(--s))] max-w-full"
                    />
                  </span>
                  {it.label && (
                    <strong className="text-[14px] font-bold leading-[17.5px]">
                      {it.label}
                    </strong>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
