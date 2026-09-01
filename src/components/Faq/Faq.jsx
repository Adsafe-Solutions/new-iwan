import { useState } from "react";
import { useCopy } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B } from "../../lib/type.js";

/* The accordion the Zakat page introduced, lifted out so the homepage can
   close on the questions people actually arrive with. Every panel is in the
   DOM from the first render and only its max-height animates — a list that
   mounted on open would land inside .reveal's one-shot scan and stay at
   opacity: 0 (see the note in useGsap). */

const CONTAINER = "mx-auto w-full max-w-container px-6";

const PILL =
  "inline-flex items-center gap-[0.35rem] rounded-full bg-accent px-4 py-2 text-[14px] font-semibold uppercase tracking-[0.02em] text-ink";

export default function Faq() {
  const copy = useCopy().faq;
  const [open, setOpen] = useState(0);

  return (
    <section className="py-[4.5rem]" id="faq">
      <div className={CONTAINER}>
        <div className="reveal mx-auto mb-[2.6rem] max-w-[680px] text-center">
          <span className={PILL}>{copy.eyebrow}</span>
          <h2
            className={cx(
              KICKER,
              "mb-[1.1rem] mt-4 text-[clamp(2rem,3.6vw,48px)] font-bold leading-[1.2]"
            )}
          >
            {copy.heading} <span className={MARK_B}>{copy.mark}</span>
          </h2>
          <p className="text-[20px] font-normal leading-7 text-muted">{copy.body}</p>
        </div>

        <div className="reveal mx-auto flex max-w-[832px] flex-col gap-[0.7rem]">
          {copy.items.map(([q, a], i) => (
            <div
              className={cx(
                "overflow-hidden rounded-2xl border transition-colors duration-300",
                open === i ? "border-primary" : "border-hairline"
              )}
              key={q}
            >
              <button
                aria-expanded={open === i}
                className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-white px-6 py-[1.4rem] text-left text-[18px] font-semibold text-ink"
                onClick={() => setOpen(open === i ? -1 : i)}
                type="button"
              >
                {q}
                <span
                  aria-hidden="true"
                  className="flex-none text-2xl leading-none text-primary"
                >
                  {open === i ? "–" : "+"}
                </span>
              </button>
              <div
                className={cx(
                  "overflow-hidden transition-[max-height] duration-[350ms] ease-in-out",
                  open === i ? "max-h-[260px]" : "max-h-0"
                )}
              >
                <p className="px-6 pb-[1.3rem] text-[15px] leading-[1.6] text-muted">
                  {a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
