/* =========================================================
   Shared type + highlight class sets.

   These used to be .kicker / .h-block / .mark in index.css. They are
   plain strings now so components compose them with cx() alongside
   their own utilities, and Tailwind still sees every class as literal
   text when it scans this file.
========================================================= */

/** Section display heading — 64px / 900 / uppercase. */
export const KICKER =
  "mb-[2.4rem] text-[clamp(2rem,5vw,64px)] font-black uppercase leading-[1.12] tracking-[-0.64px]";

/** Tighter blocked heading, used where the copy is set solid. */
export const H_BLOCK = "font-extrabold uppercase leading-[1.06] tracking-[-0.01em]";

/* ---------------- highlight markers ----------------
   box-decoration-clone is what keeps the background painted on every
   line when a marked phrase wraps. */
const MARK = "inline box-decoration-clone px-[0.18em] py-[0.02em]";

/** accent block, dark type */
export const MARK_Y = `${MARK} bg-accent`;
/** primary block, white type */
export const MARK_B = `${MARK} bg-primary text-white`;
/** primary block, accent type */
export const MARK_BY = `${MARK} bg-primary text-accent`;
/** accent block, primary type */
export const MARK_YB = `${MARK} bg-accent text-primary`;
