import { useState } from "react";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import Typewriter from "../../components/Typewriter/Typewriter.jsx";
import { FOCUS_AREAS } from "../../focusAreas.js";
import Button from "../../components/Button/Button.jsx";
import { ADVISORS } from "../../advisors.js";
import "./Zakat.css";

/* ---------- data ---------- */
/* Zakat is distributed through the same four focus areas as everything else. */
const LIVES = FOCUS_AREAS.map((a) => [a.tag, a.color, a.card, a.img]);

const AMOUNTS = [
  ["🎓", "#22C55E", "$250", "Education"],
  ["🏠", "#0e41b0", "$200", "Homelessness"],
  ["📦", "#FBBF24", "$150", "Food Security"],
  ["❤️", "#EC4899", "$75", "Orphan & Widow"],
];

const STEPS = [
  ["Step 1", "Dedicated Zakat Account"],
  ["Step 2", "Zakat-Eligible Projects & Due Diligence"],
  ["Step 3", "Impact Reporting to Donors"],
];

const CATEGORIES = [
  "The Poor — al-Fuqarā'",
  "The Needy — al-Masākīn",
  "Zakat Administrators — al-ʿĀmilīn",
  "Reconciliation of Hearts — al-Muʾallafah",
  "Freeing Captives — fir-Riqāb",
  "Those in Debt — al-Ghārimīn",
  "In the Cause of God — fī Sabīlillāh",
  "The Wayfarer — Ibn as-Sabīl",
];

const BADGES = [
  "Scholar-Verified Zakat",
  "Tax Deductible",
  "Sharia Compliant",
  "100% Zakat",
];

const FAQ = [
  [
    "What is Zakat and who is required to pay it?",
    "Zakat is an obligatory annual charity of 2.5% on qualifying wealth held above the nisab threshold for a full lunar year. It is due from every eligible adult Muslim.",
  ],
  [
    "How do I calculate my Zakat?",
    "Total your zakatable assets — cash, savings, gold, silver and investments — subtract eligible liabilities, and pay 2.5% on the remainder if it exceeds the nisab. Our calculator does this for you.",
  ],
  [
    "Who can receive Zakat according to Islamic law?",
    "Zakat may only be given to the eight categories of recipients named in the Qur'an, from the poor and needy to those in debt and the wayfarer.",
  ],
  [
    "Is your Zakat distribution Sharia-compliant?",
    "Yes. Our policy has been reviewed and approved by qualified scholars, and funds are kept in a dedicated Zakat account distributed strictly to eligible recipients.",
  ],
  [
    "Can I give my Zakat to a specific cause or project?",
    "You can direct your Zakat to any of our Zakat-eligible appeals, and 100% of it reaches those who qualify.",
  ],
  [
    "When should I pay my Zakat?",
    "Zakat is due once a full lunar year passes on wealth above the nisab. Many donors choose to pay during Ramadan for added reward.",
  ],
  [
    "What's the difference between Zakat and Sadaqah?",
    "Zakat is obligatory and fixed at 2.5% with defined recipients; Sadaqah is voluntary charity that can be given any time, in any amount, to any good cause.",
  ],
];

/* ---------- page ---------- */
export default function Zakat() {
  useScrollAnimations();
  const [open, setOpen] = useState(0);

  return (
    <main className="zakat">
      {/* ===== HERO ===== */}
      <section className="zhero">
        <div
          className="zhero__bg"
          style={{
            "--img":
              "url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1920&auto=format&fit=crop')",
          }}
        />
        <div className="container zhero__inner">
          <div className="zhero__card">
            <div className="hero__pills">
              <span className="pill pill--y">⚠ Give Now</span>
              <span className="pill pill--g">◈ Zakat Eligible</span>
            </div>
            <h1>Give Your Zakat</h1>
            <p>
              Fulfil your spiritual obligation with confidence. Every contribution is
              administered with unwavering integrity.
            </p>
            <p className="zhero__note">
              Scholar verified — your Zakat is distributed in strict Sharia compliance.
            </p>
            <Button href="#zcalc" className="zhero__give">
              Give Zakat →
            </Button>
            <Button href="#zcalc" variant="outline" className="zhero__calc">
              Calculate My Zakat
            </Button>
            <div className="zhero__bar">
              <div className="zhero__bar-top">
                <span className="zhero__stat">$913,847 raised</span>
                <span className="zhero__pct">30%</span>
              </div>
              <div className="zhero__track">
                <div className="zhero__fill" style={{ width: "30%" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="zhero__obl">
          <span className="zhero__obl-big">ZAKAT</span>
          <span className="zhero__obl-sub">
            AN <span className="mark mark--yb">OBLIGATION</span>
          </span>
          <p className="zhero__obl-type">
            <Typewriter
              phrases={[
                "Helps alleviate poverty",
                "Keeps a child in school",
                "Shelters the homeless",
                "Feeds the hungry",
                "Purifies your wealth",
              ]}
              cursorClass="tw-cursor tw-cursor--light"
            />
          </p>
        </div>
      </section>

      {/* ===== INTRO + PATHWAY ===== */}
      <section className="zintro">
        <div className="container zintro__grid">
          <h2 className="zintro__text reveal">
            Today, <b>690 million</b> people face hunger — and billions in Zakat go
            uncollected every year. Your <b>2.5%</b> can change everything.
          </h2>
          <div className="zpathway reveal">
            <h3>
              The Iwan Pathway: Giving Your Zakat
              <span className="zpathway__rule" data-line />
            </h3>
            <ul>
              <li>Purify your wealth and soul</li>
              <li>Keep a child in school, shelter a family</li>
              <li>Feed the hungry and empower widows &amp; orphans</li>
            </ul>
            <blockquote>
              "Take from their wealth a charity by which you purify them."{" "}
              <cite>— Qur'an 9:103</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ===== CHANGING LIVES ===== */}
      <section className="zlives">
        <div className="container">
          <h2 className="kicker reveal">
            How your Zakat is <span className="mark mark--b">changing lives</span>
          </h2>
          <div className="dgrid" data-stagger>
            {LIVES.map(([tag, color, text, img]) => (
              <div className="dcard reveal" key={tag} style={{ "--tag": color }}>
                <div className="dcard__media">
                  <span className="dcard__tag">{tag}</span>
                  <div className="dcard__img" style={{ "--img": `url(${img})` }} />
                </div>
                <div className="dcard__body">
                  <h3>{text}</h3>
                  <div className="dcard__rule" data-line />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AMOUNT CARDS ===== */}
      <section className="zamounts">
        <div className="container zamounts__grid" data-stagger>
          {AMOUNTS.map(([icon, color, amt, label]) => (
            <div className="zamount reveal" key={amt + label}>
              <div className="zamount__top" style={{ background: color }}>
                <span>{icon}</span>
              </div>
              <div className="zamount__body">
                <strong>{amt}</strong>
                <small>{label}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CALCULATOR ===== */}
      <section className="zcalc" id="zcalc">
        <div className="container zcalc__grid reveal">
          <div className="zcalc__blue">
            <span className="pill pill--y">✦ Essential Tool</span>
            <h2>
              Calculate Your <span className="zy">Zakat</span>
            </h2>
            <p>
              Knowing your exact Zakat amount is the first step in fulfilling this sacred
              obligation. Our comprehensive calculator considers all forms of wealth —
              savings, gold, silver, investments and business assets.
            </p>
            <p>
              Developed in consultation with Islamic scholars, our tool ensures your
              calculation is both accurate and compliant with Islamic jurisprudence.
            </p>
            <Button href="#" variant="yellow">
              Open Zakat Calculator →
            </Button>
          </div>
          <div className="zcalc__yellow">
            <span className="zcalc__pct">2.5%</span>
            <span className="zcalc__pct-sub">of your eligible wealth</span>
            <blockquote className="zcalc__quote">
              "Take from their wealth a charity to purify them…"
            </blockquote>
            <cite>— Qur'an 9:103</cite>
          </div>
        </div>
      </section>

      {/* ===== ACT OF MERCY ===== */}
      <section className="zmercy" data-wipe-scene>
        <div className="zmercy__wipe" data-wipe />
        <div className="container zmercy__card reveal">
          <div className="zmercy__text">
            <h2>
              Every Zakat is
              <br />
              an act of mercy.
            </h2>
            <p>
              Your generosity feeds the hungry, heals the sick and brings dignity to
              families in need — wherever borders have put them out of reach.
            </p>
            <Button href="#zcalc" variant="yellow">
              Give Zakat Now →
            </Button>
          </div>
          <div
            className="zmercy__img"
            style={{
              "--img":
                "url('https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=900&auto=format&fit=crop')",
            }}
          />
        </div>
      </section>

      {/* ===== ADMINISTER ===== */}
      <section className="zadmin" data-wipe-scene>
        <div className="zadmin__wipe" data-wipe />
        <div className="container zadmin__card reveal">
          <div className="zadmin__text">
            <h2 className="kicker">How we administer your Zakat</h2>
            <p>
              Transparency, accountability and Sharia compliance are at the heart of
              everything we do. Your Zakat is separately earmarked, rigorously distributed
              and fully accounted for.
            </p>
            <Button href="#">Download Zakat Policy</Button>
          </div>
          <div className="zadmin__steps">
            {STEPS.map(([step, label]) => (
              <div className="zadmin__step" key={step}>
                <span className="zadmin__num">{step}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUSTED BY ===== */}
      <section className="ztrusted">
        <div className="container">
          <p className="trusted__label reveal" style={{ textAlign: "center" }}>
            Trusted By
          </p>
          <div className="ztrusted__row reveal" data-stagger>
            {ADVISORS.map((a) => (
              <div className="scholar reveal" key={a.name}>
                <span className="scholar__av">{a.initials}</span>
                <strong>{a.name}</strong>
                <small>{a.role}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ZAKAT POLICY ===== */}
      <section className="zpolicy">
        <div className="container zpolicy__grid reveal">
          <div className="zpolicy__text">
            <span className="pill pill--y">✦ Official Document</span>
            <h2>
              Our <span className="zy">Zakat Policy</span>
            </h2>
            <p>
              Our Zakat policy has been reviewed and approved by qualified scholars. It is
              designed to be as encompassing and accommodating as possible from an Islamic
              legal perspective.
            </p>
            <p>
              Zakat-eligible beneficiaries are classified into eight categories as named
              in the Qur'an. Our approach follows Islamic law within the framework of the
              four schools of jurisprudence.
            </p>
            <Button href="#" variant="yellow">
              Download Zakat Policy (PDF)
            </Button>
          </div>
          <div className="zpolicy__cats">
            <h3>The Eight Categories of Zakat</h3>
            <ol>
              {CATEGORIES.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ===== BADGES ===== */}
      <section className="zbadges">
        <div className="container zbadges__row">
          {BADGES.map((b) => (
            <span className="zbadge" key={b}>
              ✓ {b}
            </span>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="zfaq">
        <div className="container">
          <div className="zfaq__head reveal">
            <span className="pill pill--y">✦ Knowledge Center</span>
            <h2 className="kicker">
              Frequently Asked <span className="mark mark--b">questions</span>
            </h2>
            <p>Understanding Zakat is essential to fulfilling this pillar correctly.</p>
          </div>
          <div className="zfaq__list reveal">
            {FAQ.map(([q, a], i) => (
              <div className={`zfaq__item${open === i ? " open" : ""}`} key={q}>
                <button className="zfaq__q" onClick={() => setOpen(open === i ? -1 : i)}>
                  {q}
                  <span className="zfaq__ico">{open === i ? "–" : "+"}</span>
                </button>
                <div className="zfaq__a">
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="zcta">
        <div className="container zcta__inner reveal">
          <span className="pill pill--g">◈ Transforming Lives Beyond Borders</span>
          <h2 className="kicker">Fulfil your sacred obligation today</h2>
          <p>
            Your Zakat has the power to transform lives. Give with confidence, knowing
            every dollar is handled as the sacred trust it truly is.
          </p>
          <div className="zcta__btns">
            <Button href="#zcalc" variant="yellow">
              Give Your Zakat Now →
            </Button>
            <Button href="#" variant="outline">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
