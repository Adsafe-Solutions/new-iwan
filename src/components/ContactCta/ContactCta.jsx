import Button from "../Button/Button.jsx";
import { useCopy } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_YB } from "../../lib/type.js";

/* The closing band on About and on every blog post. A solid colour, not a
   WipeBand: the copy is white, and a wipe leaves it white-on-white until the
   sweep arrives — SplitFeature only gets away with that because its copy sits
   in its own dark card. */
export default function ContactCta({ className = "py-16" }) {
  const copy = useCopy().contactCta;

  return (
    <section className={cx("bg-primary-800", className)}>
      <div className="mx-auto w-full max-w-container px-6">
        <p className="reveal mb-4 text-[12px] font-bold uppercase leading-4 tracking-[0.16em] text-accent">
          {copy.eyebrow}
        </p>
        <h2
          className={cx(KICKER, "reveal !mb-5 !text-[clamp(1.9rem,4vw,44px)] text-white")}
        >
          {copy.heading} <span className={MARK_YB}>{copy.mark}</span>
        </h2>
        <p className="reveal mb-8 max-w-[52ch] text-[17px] leading-[28px] text-white/80">
          {copy.body}
        </p>
        <Button to="/contact-us" variant="yellow" className="reveal">
          {copy.cta}
        </Button>
      </div>
    </section>
  );
}
