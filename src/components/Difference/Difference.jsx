import Typewriter from "../Typewriter/Typewriter.jsx";
import { useFocus } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_BY } from "../../lib/type.js";

const DIFFERENCE_PHRASES = [
  "make a difference",
  "educate a child",
  "shelter a family",
  "fill an empty plate",
  "empower a widow",
];

/* ---------- YOU CAN MAKE A DIFFERENCE ---------- */
export default function Difference() {
  const { areas: FOCUS_AREAS } = useFocus();
  return (
    <section className="py-[4.5rem]" id="difference">
      <div className="mx-auto w-full max-w-container px-6">
        {/* rotating display heading — set tighter than the standard kicker */}
        <h2 className={cx(KICKER, "reveal tracking-[-1.28px]")}>
          You can{" "}
          <Typewriter
            phrases={DIFFERENCE_PHRASES}
            className={cx(MARK_BY, "whitespace-nowrap")}
          />
        </h2>

        {/* four focus areas, one row */}
        <div
          className="grid grid-cols-4 gap-6 max-nav:grid-cols-2 max-phone:grid-cols-1"
          data-stagger
        >
          {FOCUS_AREAS.map((a) => (
            <a
              className={cx(
                "reveal group relative flex flex-col overflow-hidden rounded-2xl bg-primary shadow",
                "transition-[transform,box-shadow] duration-[350ms]",
                "hover:-translate-y-2 hover:shadow-card",
                /* the cards are the anchor targets for the focus-area links —
                   clear the sticky header */
                "scroll-mt-[120px]"
              )}
              key={a.id}
              id={a.id}
              href="#programmes"
            >
              <div className="relative h-[210px] overflow-hidden after:absolute after:inset-0 after:bg-card-scrim after:content-['']">
                {/* category badge */}
                <span
                  className={cx(
                    "absolute left-0 top-0 z-[2] px-3 py-2",
                    "text-[11.5px] font-black uppercase leading-none tracking-[0.04em] text-white",
                    a.tone
                  )}
                >
                  {a.tag}
                </span>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[600ms] group-hover:scale-[1.08]"
                  style={{ backgroundImage: `url(${a.img})` }}
                />
              </div>

              <div className="px-5 pb-4 pt-[18px] text-white">
                <h3 className="text-[20px] font-black uppercase leading-[26px] tracking-[0.4px]">
                  {a.card}
                </h3>
                <div
                  className="mt-4 h-1 w-full origin-[left_center] scale-x-0 bg-accent will-change-transform"
                  data-line
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
