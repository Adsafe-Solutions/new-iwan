import { cx } from "../../lib/cx.js";

/* A band whose background colour sweeps in from one side as you scroll,
   with the content floating above it. The sweep is the [data-wipe] /
   [data-wipe-scene] pair that useGsap scrubs to scroll progress.

   `from` is the edge the colour ANCHORS to, so "right" sweeps leftwards
   across the page. Two of these can sit back to back facing opposite
   ways, which is what the Zakat page does. */
export default function WipeBand({
  from = "left",
  tone = "bg-primary",
  className = "",
  children,
}) {
  return (
    <section className={cx("relative overflow-hidden", className)} data-wipe-scene>
      <div
        className={cx(
          "absolute inset-0 z-0 scale-x-0 will-change-transform",
          from === "right" ? "origin-[right_center]" : "origin-[left_center]",
          tone
        )}
        data-wipe
      />
      <div className="relative z-[1] mx-auto w-full max-w-container px-6">{children}</div>
    </section>
  );
}
