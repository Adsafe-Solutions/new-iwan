import { useCallback, useEffect, useRef, useState } from "react";

/* One slide per focus area, Education first — it leads everywhere on the site. */
const SLIDES = [
  {
    label: "Education — Our Primary Focus",
    pills: [
      ["y", "★ Primary Focus"],
      ["g", "◈ Zakat Eligible"],
    ],
    title: "Keep a Child in School",
    lead: "School stops when the fees run out — and it rarely restarts.",
    body: "Your gift covers fees, books and uniforms so a child's education carries on uninterrupted.",
    img: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1920&auto=format&fit=crop",
  },
  {
    label: "Homelessness",
    pills: [
      ["y", "⚠ Give Now"],
      ["g", "◈ Zakat Eligible"],
    ],
    title: "Nobody Should Sleep Outside",
    lead: "A cold night is a crisis when you have nowhere to go.",
    body: "You fund emergency shelter and warm bedding tonight, and the route back to stable housing after.",
    img: "https://images.pexels.com/photos/37393742/pexels-photo-37393742.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    label: "Food Security",
    pills: [
      ["y", "⚠ Give Now"],
      ["g", "◈ Zakat Eligible"],
    ],
    title: "Fill an Empty Plate",
    lead: "For too many families, hunger is not a one-off — it's every month.",
    body: "Your donation delivers hot meals and grocery support that keep a household fed.",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920&auto=format&fit=crop",
  },
  {
    label: "Orphan & Widow Support",
    pills: [
      ["y", "⚠ Give Now"],
      ["g", "◈ Zakat Eligible"],
    ],
    title: "Support That Becomes Independence",
    lead: "A widow with a livelihood does not need a monthly cheque.",
    body: "Sponsor an orphan through school, or fund the skills and tools behind a woman's own business.",
    img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1920&auto=format&fit=crop",
  },
];

const DURATION = 6500;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const timer = useRef(null);

  const start = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(
      () => setCurrent((c) => (c + 1) % SLIDES.length),
      DURATION
    );
  }, []);

  useEffect(() => {
    start();
    return () => clearInterval(timer.current);
  }, [start]);

  const pick = (i) => {
    setCurrent(i);
    start();
  };

  const s = SLIDES[current];

  return (
    <section
      className="hero"
      id="top"
      onMouseEnter={() => clearInterval(timer.current)}
      onMouseLeave={start}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.label}
          className={`hero__slide-bg${i === current ? " on" : ""}`}
          style={{ "--img": `url(${slide.img})` }}
        />
      ))}

      <div className="container hero__grid">
        <div className="hero__card">
          <div className="hero__pills">
            {s.pills.map(([kind, txt]) => (
              <span key={txt} className={`pill pill--${kind}`}>
                {txt}
              </span>
            ))}
          </div>
          <h1>{s.title}</h1>
          <p>{s.lead}</p>
          <p>
            <strong>{s.body}</strong>
          </p>
          <a href="#donate" className="btn btn--blue">
            Donate Now →
          </a>
        </div>

        <div className="hero__slides-list">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.label}
              className={`hero__item${i === current ? " on" : ""}`}
              onClick={() => pick(i)}
            >
              <b>{String(i + 1).padStart(2, "0")}</b>
              <span>{slide.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
