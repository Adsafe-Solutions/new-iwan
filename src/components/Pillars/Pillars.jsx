import { useCopy, usePillars } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_YB } from "../../lib/type.js";

/* The four glyphs from the brand deck's card set, redrawn as inline SVG so
   they take `currentColor` and recolour with the card. */
function Mark({ shape }) {
  const common = {
    viewBox: "0 0 100 100",
    fill: "none",
    stroke: "currentColor",
    className: "h-14 w-14 max-phone:h-11 max-phone:w-11",
    "aria-hidden": "true",
  };

  if (shape === "ring") {
    return (
      <svg {...common}>
        <circle cx="50" cy="50" r="31" strokeWidth="15" />
      </svg>
    );
  }
  if (shape === "triangle") {
    return (
      <svg {...common}>
        <path
          d="M20 40 82 26 58 84Z"
          strokeWidth="11"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (shape === "bolt") {
    return (
      <svg {...common} strokeWidth="15" strokeLinecap="round">
        <path d="M62 18 34 48" />
        <path d="M70 50 42 80" />
      </svg>
    );
  }
  /* burst — twelve spokes long enough to meet in the middle, so the centre
     reads solid rather than as a cog with a hub */
  return (
    <svg {...common} strokeWidth="12" strokeLinecap="butt">
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d="M50 9 50 50" transform={`rotate(${i * 30} 50 50)`} />
      ))}
    </svg>
  );
}

/* ---------- BELIEVE · ACT · SERVE — THRIVE ----------
   The brand deck carries two four-part lists — a Vision (تقوى · آداب ·
   صدقة · إقتصاد) and a Mission (إيمان · عمل · خدمة · شورى) — and then maps
   them one-to-one. Rather than run the same four beats twice down the page,
   each card leads with the mission verb and names the vision pillar it
   serves. "Thrive" is the outcome the four produce, so it lands in the
   heading rather than as a fifth card. */
export default function Pillars() {
  const PILLARS = usePillars();
  const copy = useCopy().pillars;
  return (
    <section className="bg-mist py-[4.5rem]" id="pillars" data-pillars>
      <div className="mx-auto w-full max-w-container px-6">
        <h2 className={cx(KICKER, "reveal")}>
          {copy.heading} <span className={MARK_YB}>{copy.mark}</span>
        </h2>

        <p className="reveal mb-[2.6rem] max-w-[62ch] text-[18px] leading-[29px] text-muted">
          {copy.body}
        </p>

        {/* The wrapper carries the deck transform and the card keeps its own
            hover lift: GSAP writes an inline transform, which would otherwise
            override `hover:-translate-y-2` outright. `relative` is what makes
            the stacking order stick while they are piled up. */}
        <div
          className="relative grid grid-cols-4 gap-4 max-nav:grid-cols-2 max-phone:grid-cols-1"
          data-pillars-grid
        >
          {PILLARS.map((p) => (
            <div className="relative" key={p.id} data-pillar>
              <article
                className={cx(
                  "flex h-full flex-col rounded p-6 shadow-card",
                  "transition-transform duration-[350ms] hover:-translate-y-2",
                  p.tone,
                  p.ink
                )}
                id={p.id}
              >
                <span className={cx("mb-6 block", p.markTone)}>
                  <Mark shape={p.mark} />
                </span>

                {/* English left, Arabic right — the same two-column pairing the
                    brand deck sets these lists in */}
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[26px] font-black uppercase leading-none tracking-[-0.01em]">
                    {p.name}
                  </h3>
                  <span
                    className="text-[22px] font-bold leading-none opacity-90"
                    lang="ar"
                    dir="rtl"
                  >
                    {p.ar}
                  </span>
                </div>

                <p className="mt-4 text-[15px] leading-[23px] opacity-90">{p.body}</p>

                <div
                  className="mt-5 h-1 w-full origin-[left_center] scale-x-0 bg-current opacity-40 will-change-transform"
                  data-pillar-line
                />

                {/* the vision pillar this commitment carries */}
                <p className="mt-4 text-[12px] font-bold uppercase tracking-[0.1em] opacity-75">
                  {p.serves}{" "}
                  <span lang="ar" dir="rtl" className="tracking-normal">
                    {p.servesAr}
                  </span>
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
