import { cx } from "../../lib/cx.js";

/* The live-monitor strip. On the home route it floats over the hero
   (`overlay`) and retires once the page is scrolled (`hidden`). */
export default function Topbar({ overlay = false, hidden = false }) {
  if (hidden) return null;

  return (
    <div
      className={cx(
        "border-b",
        overlay
          ? "fixed top-0 z-[100] w-full border-transparent bg-transparent"
          : "border-line bg-white"
      )}
      aria-hidden={hidden}
    >
      <div
        className={cx(
          "mx-auto flex h-topbar w-full max-w-container items-center justify-center gap-2 px-6",
          "text-[12px] font-bold uppercase leading-4 tracking-[0.14em]",
          overlay ? "text-white" : "text-ink-2"
        )}
      >
        <span className="h-2 w-2 animate-livedot rounded-full bg-red shadow-livedot" />
        <span className={overlay ? "text-white" : "text-red"}>Emergency Monitor</span>
        <span className="text-[10px] font-semibold leading-[13.3px]">• Live</span>
      </div>
    </div>
  );
}
