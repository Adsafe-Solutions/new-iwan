import { useCallback, useEffect, useRef, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { useCopy, useHero } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";

const DWELL = 3200;
const OUT_MS = 520; // matches the heroSet duration in tailwind.config.js

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function HeroV2() {
  const { image: HERO_IMAGE, logos: HERO_LOGOS } = useHero();
  const copy = useCopy().heroV2;
  const [index, setIndex] = useState(0);
  const [setting, setSetting] = useState(false);
  const live = useRef(0);
  const timers = useRef([]);
  const still = reduced();

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const next = useCallback(() => {
    clear();
    setSetting(true);
    timers.current.push(
      setTimeout(() => {
        live.current = (live.current + 1) % HERO_LOGOS.length;
        setIndex(live.current);
        setSetting(false);
      }, OUT_MS)
    );
  }, [HERO_LOGOS.length]);

  useEffect(() => {
    if (still) return undefined;
    const t = setInterval(next, DWELL);
    return () => {
      clearInterval(t);
      clear();
    };
  }, [still, next]);

  const logo = HERO_LOGOS[index];

  return (
    <section
      className="relative flex h-screen min-h-[560px] items-center justify-center overflow-hidden bg-shade"
      id="top"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        role="img"
        aria-label={copy.imageAlt}
      />

      <div className="relative z-[2] overflow-hidden px-6 py-2">
        <img
          src={logo.src}
          alt={logo.alt}
          /* scale drives width, not transform — transform is what
             heroRise/heroSet animate */
          style={{ "--s": logo.scale ?? 1 }}
          className={cx(
            "w-[calc(min(280px,34vw)*var(--s))] max-w-[94vw]",
            "max-phone:w-[calc(42vw*var(--s))]",
            !still && (setting ? "animate-heroSet" : "animate-heroRise")
          )}
        />
      </div>

      <span
        className="absolute bottom-10 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2 text-white/60"
        aria-hidden="true"
      >
        <span className="text-[12px] font-bold uppercase tracking-[0.2em]">
          {copy.scroll}
        </span>
        <IconChevronDown className="h-5 w-5 animate-scrollCue" stroke={2} />
      </span>
    </section>
  );
}
