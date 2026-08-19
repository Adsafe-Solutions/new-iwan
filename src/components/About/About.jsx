import { useStats } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";
import { H_BLOCK, MARK_B } from "../../lib/type.js";

/* ---------- WHAT IWAN IS + BY THE NUMBERS ----------
   Replaces the inherited "leading Canadian-Muslim charity" block: Iwan is
   a Bangalore community organisation, not a relief charity, and the row of
   named advisors that sat here was placeholder copy reading as real
   endorsement. The counters use the [data-count] handler in useGsap.js,
   which until now had nothing on the site wired to it. */
export default function About() {
  const STATS = useStats();
  return (
    <section className="relative overflow-hidden py-[4.5rem]" id="about" data-wipe-scene>
      {/* full-section block that wipes in from the left on scroll */}
      <div
        className="absolute inset-0 z-0 h-full w-full origin-[left_center] scale-x-0 bg-accent will-change-transform"
        data-wipe
      />

      <div className="relative z-[1] mx-auto w-full max-w-container px-6">
        <div className="grid grid-cols-[1.05fr_0.95fr] items-start gap-12 max-nav:grid-cols-1 max-nav:gap-8">
          <h2
            className={cx(
              H_BLOCK,
              "reveal text-[clamp(2.4rem,5vw,64px)] leading-[1.12] tracking-[-0.64px]"
            )}
          >
            A community
            <br />
            you{" "}
            <span className={cx(MARK_B, "my-[0.15em] !inline-block whitespace-nowrap")}>
              grow into
            </span>
          </h2>

          <div className="reveal">
            <p className="mb-[1.1rem] text-[18px] leading-[29px] text-ink-2">
              Iwan began in 2020, when a group of young people in Bangalore doing pandemic
              relief work carried on meeting after the work was done. Those weekly
              conversations turned into something steadier — a place to build character,
              learn something new and look out for one another.
            </p>
            <p className="text-[18px] leading-[29px] text-ink-2">
              In practice that means Taekwondo one evening and a Web 3.0 session the next;
              a plantation drive one weekend, first-aid training the following. Different
              rooms, same intent.
            </p>
          </div>
        </div>

        {/* ---- by the numbers ---- */}
        <div className="mt-[3.5rem] border-t border-ink/15 pt-[2.4rem]">
          <p className="reveal mb-[1.6rem] text-[12px] font-bold uppercase tracking-[0.14em] text-ink-2 opacity-70">
            Iwan by the numbers
          </p>
          <div
            className="grid grid-cols-4 gap-8 max-phone:grid-cols-2 max-phone:gap-y-10"
            data-stagger
          >
            {STATS.map((s) => (
              <div className="reveal" key={s.label}>
                {/* left empty on purpose — the counter writes into it, and
                    seeding it with the final number makes it visibly snap
                    back to zero when the animation triggers */}
                <strong
                  className="block text-[clamp(2.4rem,4vw,56px)] font-black leading-none tracking-[-0.02em] text-primary"
                  data-count={s.count}
                />
                <span className="mt-2 block text-[14px] font-semibold lowercase text-ink-2">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
