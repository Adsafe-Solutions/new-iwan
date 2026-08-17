import WipeBand from "../WipeBand/WipeBand.jsx";
import { cx } from "../../lib/cx.js";

/* A dark half-and-half card on a sweeping band: copy and a call to action
   on one side, a photograph on the other. Originally the Zakat page's "an
   act of mercy" block; lifted out so the programme pages can use the same
   moment without a second copy of the markup.

   `size` is "md" by default, which is the exact geometry the Zakat page
   shipped with — do not change those numbers without re-checking that page.
   "lg" is the roomier one the programme pages use, sized to sit alongside
   the StepsFeature panel beneath it rather than looking clipped next to it.

   Pass the CTA as children so the caller picks the Button variant. */
const SIZES = {
  md: {
    card: "min-h-[340px]",
    pad: "px-[3.75rem] py-14 max-phone:px-8",
    head: "text-[clamp(2rem,4vw,42.95px)]",
    body: "max-w-[420px] text-[16.8px] leading-[27.3px]",
    img: "max-nav:min-h-[240px]",
  },
  lg: {
    card: "min-h-[470px]",
    pad: "px-16 py-20 max-phone:px-8 max-phone:py-12",
    head: "text-[clamp(2.2rem,4.4vw,50px)]",
    body: "max-w-[460px] text-[18px] leading-[30px]",
    img: "max-nav:min-h-[300px]",
  },
};

export default function SplitFeature({
  heading,
  body,
  img,
  imgAlt = "",
  from = "right",
  wipeTone = "bg-primary",
  cardTone = "bg-night",
  bodyTone = "text-mercy",
  className = "pb-[4.5rem] pt-12",
  size = "md",
  children,
}) {
  const s = SIZES[size] ?? SIZES.md;

  return (
    <WipeBand from={from} tone={wipeTone} className={className}>
      <div
        className={cx(
          "reveal relative grid grid-cols-2 overflow-hidden rounded-lg max-nav:grid-cols-1",
          s.card,
          cardTone
        )}
      >
        <div
          className={cx("relative z-[1] flex flex-col justify-center text-white", s.pad)}
        >
          <h2
            className={cx(
              "mb-4 font-black uppercase leading-[1.08] tracking-[-0.01em]",
              s.head
            )}
          >
            {heading}
          </h2>
          <p className={cx("mb-[1.4rem] font-normal", s.body, bodyTone)}>{body}</p>
          {children && <div>{children}</div>}
        </div>

        <div
          className={cx("relative z-[1] bg-cover bg-center", s.img)}
          style={{ backgroundImage: `url(${img})` }}
          role="img"
          aria-label={imgAlt}
        />
      </div>
    </WipeBand>
  );
}
