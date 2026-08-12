import { useCallback, useEffect, useRef, useState } from "react";
import { cx } from "../../lib/cx.js";

const SLIDES = [
  {
    title: "Be the Light for Someone in Need",
    img: "https://cdn.prod.website-files.com/67d25bbe842c314895ddb151/67d29bce5aabd85a370d1621_home-hero-image-1.jpg",
  },
  {
    title: "A World Without Poverty Starts Here",
    img: "https://cdn.prod.website-files.com/67d25bbe842c314895ddb151/67d29bcedc5373f69470adc7_home-hero-image-2.jpg",
  },
  {
    title: "Support Education, Change the World",
    img: "https://cdn.prod.website-files.com/67d25bbe842c314895ddb151/67d29bcec24af2e52edad21b_home-hero-image-3.jpg",
  },
];

const DURATION = 8000;

/* Beat lengths must match the heroSet / heroWipe / heroRise timings in
   tailwind.config.js, or the copy and photo fall out of step. */
const OUT_MS = 680;
const WIPE_MS = 2100;
const HOLD_MS = WIPE_MS;

/* Spacing lives on the band, not the text inside it — otherwise the rising
   text leaks into the margin instead of being clipped flush. */
const RISE_BAND = "overflow-hidden";

/* The cascade runs top-down on the way in and drains bottom-up on the way out,
   so each line carries both delays and picks one by state.
   Written out as whole class names on purpose: Tailwind scans this file as
   plain text, so a delay built by interpolation would never be generated. */
const COPY = {
  eyebrow: { in: "[animation-delay:0.1s]", out: "[animation-delay:0.18s]" },
  title: { in: "[animation-delay:0.28s]", out: "[animation-delay:0.12s]" },
  excerpt: { in: "[animation-delay:0.46s]", out: "[animation-delay:0.06s]" },
  cta: { in: "[animation-delay:0.64s]", out: "[animation-delay:0s]" },
};

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [setting, setSetting] = useState(false);
  const index = useRef(0);
  const timer = useRef(null);
  const beats = useRef([]);

  const clearBeats = () => {
    beats.current.forEach(clearTimeout);
    beats.current = [];
  };

  const go = useCallback((n) => {
    clearBeats();
    setSetting(true);
    beats.current.push(
      setTimeout(() => {
        /* the outgoing photo keeps rendering underneath, or the wipe would
           reveal the bare section background instead of the old slide */
        setPrev(index.current);
        index.current = (index.current + n + SLIDES.length) % SLIDES.length;
        setCurrent(index.current);
      }, OUT_MS),
      setTimeout(() => setSetting(false), OUT_MS + HOLD_MS)
    );
  }, []);

  const start = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => go(1), DURATION);
  }, [go]);

  useEffect(() => {
    start();
    return () => {
      clearInterval(timer.current);
      clearBeats();
    };
  }, [start]);

  const step = (n) => {
    if (setting) return; // a click mid-sunset would strand the copy offscreen
    go(n);
    start();
  };

  /* `both` on each animation holds the end state, so the copy stays put
     between transitions rather than snapping back. */
  const copyAnim = (key) =>
    cx(
      setting ? "animate-heroSet" : "animate-heroRise",
      setting ? COPY[key].out : COPY[key].in
    );

  return (
    <section
      className={cx(
        "relative flex min-h-[904px] items-center overflow-hidden bg-primary-800",
        "h-screen pt-chrome",
        /* svh, not vh — the iOS URL bar otherwise makes the hero jump */
        "max-phone:h-auto max-phone:min-h-[100svh] max-phone:px-0 max-phone:pb-16 max-phone:pt-28"
      )}
      id="top"
      onMouseEnter={() => clearInterval(timer.current)}
      onMouseLeave={start}
    >
      {/* The incoming photo sits on top and is uncovered from the left, over-
          lapping the outgoing slide. Clipping rather than fading keeps the
          gradient overlays travelling with the photo. */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.img}
          className={cx(
            "absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-0",
            "after:absolute after:inset-0 after:bg-hero-scrim after:content-['']",
            i === prev && "z-[1] opacity-100",
            i === current && "z-[2] animate-heroWipe opacity-100"
          )}
          style={{ backgroundImage: `url(${slide.img})` }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-[2] mx-auto w-full max-w-container px-6 [&>*]:max-w-[750px]">
        <div className={cx(RISE_BAND, "mb-[1.1rem]")}>
          <p
            className={cx(
              "flex items-center gap-[0.6rem] font-satoshi text-[20px] font-medium leading-[30px] text-accent",
              "max-phone:text-[17px] max-phone:leading-[26px]",
              copyAnim("eyebrow")
            )}
          >
            <span className="block h-7 w-7 flex-[0_0_28px]" aria-hidden="true">
              <svg
                viewBox="0 0 28 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="block h-full w-full"
              >
                <path
                  d="M13.6 8.2c1.5-2.1 4.6-2 5.8.3.8 1.6.4 3.4-.9 4.6l-4.9 4.5-4.9-4.5c-1.3-1.2-1.7-3-.9-4.6 1.2-2.3 4.3-2.4 5.8-.3Z"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 17.5c1.6-1.1 3.4-.9 4.8.2l2.4 1.9h4.1c1 0 1.8.8 1.8 1.8s-.8 1.7-1.8 1.7H9.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m13.9 21.4 6.9-2.3c1.3-.4 2.6.3 3 1.5L13.9 25l-4.2-2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Together, We Create Impact</span>
          </p>
        </div>

        <div className={cx(RISE_BAND, "mb-[1.6rem]")}>
          <h1
            className={cx(
              "font-display text-[80px] font-normal leading-[104px] text-white",
              "max-nav:text-[clamp(2.6rem,8vw,80px)] max-nav:leading-[1.2]",
              copyAnim("title")
            )}
          >
            {SLIDES[current].title}
          </h1>
        </div>

        <div className={cx(RISE_BAND, "mb-[2.4rem]")}>
          <p
            className={cx(
              "font-satoshi text-[20px] font-normal leading-[30px] text-white",
              "max-phone:text-[17px] max-phone:leading-[26px]",
              copyAnim("excerpt")
            )}
          >
            Your kindness has the power to change lives. Join us in bringing hope,
            support, and brighter futures to those in need. Every donation makes a
            difference big or small.
          </p>
        </div>

        <div className={RISE_BAND}>
          {/* deliberately not <Button> — that base style forces uppercase /
              0.9rem / 700, and the hero CTA is the one soft, large one */}
          <a
            href="#contact"
            className={cx(
              "inline-block rounded-lg bg-white px-10 py-[18px]",
              "font-satoshi text-[20px] font-medium leading-none text-primary-800",
              "transition-[background-color,transform] duration-300",
              "hover:-translate-y-0.5 hover:bg-accent",
              "max-phone:px-8 max-phone:py-[15px] max-phone:text-[17px]",
              copyAnim("cta")
            )}
          >
            Contact Us
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-[3] flex">
        {[
          { n: -1, label: "Previous slide", d: "M20 12H4m0 0 6-6m-6 6 6 6" },
          { n: 1, label: "Next slide", d: "M4 12h16m0 0-6-6m6 6-6 6" },
        ].map(({ n, label, d }) => (
          <button
            key={label}
            type="button"
            className={cx(
              "grid h-20 w-20 cursor-pointer place-items-center rounded-none border-0",
              "bg-accent text-primary-800 transition-colors duration-500",
              "hover:bg-primary-800 hover:text-accent",
              "max-nav:h-[60px] max-nav:w-[60px] max-phone:h-14 max-phone:w-14"
            )}
            onClick={() => step(n)}
            aria-label={label}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7 max-nav:h-[22px] max-nav:w-[22px]"
            >
              <path d={d} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>
    </section>
  );
}
