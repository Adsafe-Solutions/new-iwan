import { ADVISORS } from "../../advisors.js";
import { cx } from "../../lib/cx.js";
import { H_BLOCK, MARK_B } from "../../lib/type.js";

/* ---------- WE'RE A LEADING CHARITY + TRUSTED BY ---------- */
export default function Charity() {
  return (
    <section
      className="relative overflow-hidden py-[4.5rem]"
      id="charity"
      data-wipe-scene
    >
      {/* full-section block that wipes in from the left on scroll */}
      <div
        className="absolute inset-0 z-0 h-full w-full origin-[left_center] scale-x-0 bg-accent will-change-transform"
        data-wipe
      />
      <div className="relative z-[1] mx-auto grid w-full max-w-container grid-cols-[1.1fr_0.9fr] items-center gap-8 px-6 max-nav:grid-cols-1">
        <h2
          className={cx(
            H_BLOCK,
            "reveal text-[clamp(2.4rem,5vw,64px)] leading-[1.12] tracking-[-0.64px]"
          )}
        >
          We're a leading
          <br />
          <span className={cx(MARK_B, "my-[0.15em] !inline-block whitespace-nowrap")}>
            Canadian-Muslim
          </span>
          <br />
          charity.
        </h2>

        <div className="reveal text-center">
          <p className="mb-[1.4rem] text-[12px] font-bold uppercase leading-4 tracking-[1.2px] text-ink-2 opacity-70">
            Trusted By
          </p>
          <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-x-4 gap-y-[1.6rem]">
            {ADVISORS.map((a) => (
              <div className="flex flex-col items-center gap-2" key={a.name}>
                <span className="grid h-20 w-20 place-items-center rounded-full border-2 border-white bg-avatar text-2xl font-extrabold text-white shadow max-phone:h-16 max-phone:w-16 max-phone:text-[1.3rem]">
                  {a.initials}
                </span>
                <strong className="text-[14px] font-bold leading-[17.5px]">
                  {a.name}
                </strong>
                <small className="text-[12px] font-normal leading-4 text-ink-2 opacity-75">
                  {a.role}
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
