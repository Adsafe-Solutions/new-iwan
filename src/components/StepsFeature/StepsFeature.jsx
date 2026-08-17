import WipeBand from "../WipeBand/WipeBand.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER } from "../../lib/type.js";

/* A white card on a sweeping band: heading, blurb and a call to action on
   one side, a stack of labelled steps on the other. Originally the Zakat
   page's "how we administer your Zakat" block.

   `steps` is a list of [label, text] pairs — the label is the chip.
   Anything extra (contact details, a note) goes in `footer`.

   `size` is "md" by default, which is the exact geometry the Zakat page
   shipped with — do not change those numbers without re-checking that
   page. "sm" is the tighter one the programme pages use, sized to match
   the SplitFeature card sitting above it. */
const SIZES = {
  md: {
    card: "gap-12 p-16 max-nav:p-[2.4rem]",
    head: "mb-4 text-[clamp(2rem,4vw,44.8px)] leading-[1.5]",
    body: "mb-[1.4rem] text-[17.6px] leading-[28.6px]",
    step: "gap-4 px-[1.3rem] py-[1.1rem] text-[17.6px] leading-[26.4px]",
    stack: "gap-[0.9rem]",
  },
  sm: {
    card: "gap-10 p-9 max-nav:p-7",
    head: "mb-2 text-[clamp(1.8rem,3.2vw,36px)] leading-[1.15]",
    body: "mb-4 text-[16px] leading-[26px]",
    step: "gap-3 px-5 py-[0.85rem] text-[16px] leading-[24px]",
    stack: "gap-3",
  },
};

export default function StepsFeature({
  heading,
  body,
  steps = [],
  from = "left",
  wipeTone = "bg-accent",
  stepTone = "bg-primary",
  className = "bg-frost py-[4.5rem]",
  /* appended to the card itself — how a caller matches this panel's height
     to a SplitFeature sitting next to it */
  cardClassName = "",
  footer,
  size = "md",
  children,
}) {
  const z = SIZES[size] ?? SIZES.md;

  return (
    <WipeBand from={from} tone={wipeTone} className={className}>
      <div
        className={cx(
          "reveal grid grid-cols-2 items-center rounded-[3px] bg-white shadow max-nav:grid-cols-1",
          z.card,
          cardClassName
        )}
      >
        <div>
          <h2 className={cx(KICKER, "font-black", z.head)}>{heading}</h2>
          {body && <p className={cx("font-normal text-muted", z.body)}>{body}</p>}
          {children}
          {footer}
        </div>

        <div className={cx("flex flex-col", z.stack)}>
          {steps.map(([label, text]) => (
            <div
              className={cx(
                "flex items-center rounded-[5px] font-semibold text-white",
                "transition-transform duration-300 hover:translate-x-1.5",
                z.step,
                stepTone
              )}
              key={label}
            >
              <span className="whitespace-nowrap rounded bg-white/[0.16] px-[0.6rem] py-[0.35rem] text-[14px] font-black uppercase">
                {label}
              </span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </WipeBand>
  );
}
