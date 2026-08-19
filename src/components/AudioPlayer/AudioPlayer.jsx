import { useEffect, useRef, useState } from "react";
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import { useCopy } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { cx } from "../../lib/cx.js";

const clock = (s) => {
  if (!Number.isFinite(s)) return "--:--";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

/* The filled part of the track is painted with `currentColor` so the colour
   still comes from a class (text-accent) — only the percentage is inline, and
   no literal colour reaches this file. */
const BAR = cx(
  "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/25 text-accent",
  "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4",
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
  "[&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-card",
  "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4",
  "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0",
  "[&::-moz-range-thumb]:bg-accent"
);

/* Our own chrome over a native <audio>: the element stays the engine, so
   seeking, buffering and the media keys all keep working.

   `preload="none"` is deliberate: Podbean serves the whole file rather than a
   partial, so `metadata` pulls all 5.5MB on page load just to learn the
   running time. `length` carries that number in content instead, and the
   element's own duration takes over once it is playing. */
export default function AudioPlayer({
  src,
  cover,
  eyebrow,
  title,
  author,
  length: known,
  className,
}) {
  const copy = useCopy().podcastPage;
  const el = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [at, setAt] = useState(0);
  const [length, setLength] = useState(Number(known) || NaN);

  useEffect(() => {
    const a = el.current;
    if (!a) return undefined;

    const time = () => setAt(a.currentTime);
    const meta = () => setLength(a.duration);
    const on = () => setPlaying(true);
    const off = () => setPlaying(false);

    a.addEventListener("timeupdate", time);
    a.addEventListener("loadedmetadata", meta);
    a.addEventListener("durationchange", meta);
    a.addEventListener("play", on);
    a.addEventListener("pause", off);
    a.addEventListener("ended", off);
    return () => {
      a.removeEventListener("timeupdate", time);
      a.removeEventListener("loadedmetadata", meta);
      a.removeEventListener("durationchange", meta);
      a.removeEventListener("play", on);
      a.removeEventListener("pause", off);
      a.removeEventListener("ended", off);
    };
  }, []);

  const toggle = () => {
    const a = el.current;
    if (!a) return;
    if (a.paused) a.play();
    else a.pause();
  };

  const seek = (e) => {
    const a = el.current;
    if (a && Number.isFinite(length)) a.currentTime = (+e.target.value / 1000) * length;
  };

  const done = Number.isFinite(length) && length > 0 ? at / length : 0;
  const pct = done * 100;

  return (
    <article
      className={cx(
        "relative overflow-hidden rounded-2xl bg-primary-800 p-8 max-phone:p-6",
        className
      )}
    >
      <audio ref={el} src={src} preload="none" />

      {/* the artwork again, huge and barely there, as the card's ground */}
      {cover && (
        <img
          src={cover}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 w-[420px] max-w-none opacity-[0.06] max-nav:hidden"
        />
      )}

      <div className="relative z-[1]">
        <div className="mb-8 flex items-center gap-6 max-phone:mb-6 max-phone:gap-4">
          {cover && (
            /* contain on a white tile — the artwork is a wide logo, and a
               square crop cuts the wordmark in half */
            <span className="grid h-[104px] w-[148px] flex-none place-items-center rounded-xl bg-white px-4 max-phone:h-[76px] max-phone:w-[112px] max-phone:px-3">
              <img src={cover} alt="" className="max-h-full w-full object-contain" />
            </span>
          )}

          <div className="min-w-0">
            {eyebrow && (
              <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-accent">
                {eyebrow}
              </p>
            )}
            {title && (
              <h3 className="mb-1 text-[24px] font-black uppercase leading-[1.15] tracking-[-0.01em] text-white max-phone:text-[19px]">
                {title}
              </h3>
            )}
            {author && (
              <p className="text-[14px] font-semibold text-white/60">
                {fill(copy.by, { author })}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5 max-phone:gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? copy.pause : copy.play}
            className={cx(
              "grid h-16 w-16 flex-none cursor-pointer place-items-center rounded-full",
              "bg-accent text-ink transition-[transform,background-color] duration-200",
              "hover:-translate-y-0.5 hover:bg-accent-2",
              "max-phone:h-14 max-phone:w-14"
            )}
          >
            {playing ? (
              <IconPlayerPauseFilled className="h-7 w-7" aria-hidden="true" />
            ) : (
              /* nudged right so the triangle reads as centred in the circle */
              <IconPlayerPlayFilled className="ml-[3px] h-7 w-7" aria-hidden="true" />
            )}
          </button>

          <div className="min-w-0 flex-1">
            <input
              type="range"
              min="0"
              max="1000"
              value={done * 1000}
              onChange={seek}
              aria-label={copy.seek}
              className={BAR}
              style={{
                backgroundImage: `linear-gradient(to right, currentColor ${pct}%, transparent ${pct}%)`,
              }}
            />
            <div className="mt-3 flex justify-between text-[13px] font-semibold tabular-nums text-white/70">
              <span>{clock(at)}</span>
              <span>{clock(length)}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
