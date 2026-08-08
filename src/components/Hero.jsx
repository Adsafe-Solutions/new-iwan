import { useCallback, useEffect, useRef, useState } from "react";

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
   components.css, or the copy and photo fall out of step. */
const OUT_MS = 680;
const WIPE_MS = 2100;
const HOLD_MS = WIPE_MS;

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

  return (
    <section
      className="hero"
      id="top"
      onMouseEnter={() => clearInterval(timer.current)}
      onMouseLeave={start}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.img}
          className={`hero__slide${i === current ? " on" : ""}${
            i === prev ? " was" : ""
          }`}
          style={{ "--img": `url(${slide.img})` }}
          aria-hidden="true"
        />
      ))}

      <div className={`container hero__inner ${setting ? "is-out" : "is-in"}`}>
        <div className="hero__rise hero__rise--eyebrow">
          <p className="hero__eyebrow">
            <span className="hero__ico" aria-hidden="true">
              <svg
                viewBox="0 0 28 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
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

        <div className="hero__rise hero__rise--title">
          <h1 className="hero__title">{SLIDES[current].title}</h1>
        </div>

        <div className="hero__rise hero__rise--excerpt">
          <p className="hero__excerpt">
            Your kindness has the power to change lives. Join us in bringing hope,
            support, and brighter futures to those in need. Every donation makes a
            difference big or small.
          </p>
        </div>

        <div className="hero__rise">
          <a href="#contact" className="hero__cta">
            Contact Us
          </a>
        </div>
      </div>

      <div className="hero__arrows">
        <button
          type="button"
          className="hero__arrow"
          onClick={() => step(-1)}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path
              d="M20 12H4m0 0 6-6m-6 6 6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="hero__arrow"
          onClick={() => step(1)}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path
              d="M4 12h16m0 0-6-6m6 6-6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
