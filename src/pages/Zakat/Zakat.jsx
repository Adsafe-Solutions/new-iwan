import { useState } from "react";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import Typewriter from "../../components/Typewriter/Typewriter.jsx";
import { useAdvisors, useFocus } from "../../content/ContentProvider.jsx";
import Button from "../../components/Button/Button.jsx";
import PageHero from "../../components/PageHero/PageHero.jsx";
import SplitFeature from "../../components/SplitFeature/SplitFeature.jsx";
import StepsFeature from "../../components/StepsFeature/StepsFeature.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B, MARK_YB } from "../../lib/type.js";

/* ---------- data ---------- */
/* Zakat is distributed through the same four focus areas as everything else. */

/* Fixed colours, so the row keeps its own identity whichever theme is on. */
const AMOUNTS = [
  ["🎓", "bg-chip-education", "$250", "Education"],
  ["🏠", "bg-chip-homeless", "$200", "Homelessness"],
  ["📦", "bg-chip-food", "$150", "Food Security"],
  ["❤️", "bg-chip-orphan", "$75", "Orphan & Widow"],
];

const STEPS = [
  ["Step 1", "Dedicated Zakat Account"],
  ["Step 2", "Zakat-Eligible Projects & Due Diligence"],
  ["Step 3", "Impact Reporting to Donors"],
];

const CATEGORIES = [
  "The Poor al-Fuqarā'",
  "The Needy al-Masākīn",
  "Zakat Administrators al-ʿĀmilīn",
  "Reconciliation of Hearts al-Muʾallafah",
  "Freeing Captives fir-Riqāb",
  "Those in Debt al-Ghārimīn",
  "In the Cause of God fī Sabīlillāh",
  "The Wayfarer Ibn as-Sabīl",
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
    "Total your zakatable assets cash, savings, gold, silver and investments subtract eligible liabilities, and pay 2.5% on the remainder if it exceeds the nisab. Our calculator does this for you.",
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

/* ---------- shared class sets ---------- */
const CONTAINER = "mx-auto w-full max-w-container px-6";

const PILL =
  "inline-flex items-center gap-[0.35rem] rounded-full px-4 py-2 text-[14px] font-semibold uppercase tracking-[0.02em]";
const PILL_Y = cx(PILL, "bg-accent text-ink");
const PILL_G = cx(PILL, "bg-green text-white");

/* the calculator/policy pills sit a notch heavier than the hero ones */
const PILL_Y_BOLD = cx(PILL_Y, "font-bold");

/** accent word inside a reversed heading */
const ZY = "text-accent";

/* Focus-area card, reused from the homepage but with the Zakat page's own
   badge tracking and caption sizing. */
const DCARD =
  "reveal group relative flex flex-col overflow-hidden rounded bg-primary shadow transition-[transform,box-shadow] duration-[350ms] hover:-translate-y-2 hover:shadow-card";

const SCHOLAR_AV =
  "grid h-20 w-20 place-items-center rounded-full border-2 border-white bg-avatar text-2xl font-extrabold text-white shadow max-phone:h-16 max-phone:w-16 max-phone:text-[1.3rem]";

/* ---------- page ---------- */
export default function Zakat() {
  const { areas: FOCUS_AREAS } = useFocus();
  const ADVISORS = useAdvisors();
  const LIVES = FOCUS_AREAS.map((a) => [a.tag, a.tone, a.card, a.img]);

  useScrollAnimations();
  const [open, setOpen] = useState(0);

  return (
    <main className="overflow-x-hidden">
      {/* ===== HERO ===== */}
      <PageHero
        img="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1920&auto=format&fit=crop"
        title="Give Your Zakat"
        eyebrow={
          <div className="mb-[1.2rem] flex flex-wrap gap-2">
            <span className={PILL_Y}>⚠ Give Now</span>
            <span className={PILL_G}>◈ Zakat Eligible</span>
          </div>
        }
        /* the badge block retires on narrow screens rather than
           overlapping the card */
        aside={
          <div className="absolute bottom-[26px] right-6 z-[2] flex flex-col items-start pb-[66px] text-left text-white max-nav:hidden">
            <span className="inline-block bg-primary px-[0.2em] py-[0.05em] text-[112px] font-black leading-none tracking-[-0.02em] text-white">
              ZAKAT
            </span>
            <span className="mt-[0.2rem] inline-block text-[49px] font-black leading-[53.9px] tracking-[-0.98px]">
              AN <span className={MARK_YB}>OBLIGATION</span>
            </span>
            {/* absolutely anchored to the block's right edge so it stays visible
            and the text grows right → left as it types, without shifting
            ZAKAT / OBLIGATION */}
            <p className="absolute bottom-0 right-0 m-0 whitespace-nowrap text-right text-[48px] font-bold leading-[1.1] text-white">
              <Typewriter
                phrases={[
                  "Helps alleviate poverty",
                  "Keeps a child in school",
                  "Shelters the homeless",
                  "Feeds the hungry",
                  "Purifies your wealth",
                ]}
                cursorClass="ml-[3px] inline-block h-[0.95em] w-[3px] animate-blink bg-white align-[-1px]"
              />
            </p>
          </div>
        }
      >
        <p className="mb-[0.8rem] text-[16px] leading-[26px] text-muted">
          Fulfil your spiritual obligation with confidence. Every contribution is
          administered with unwavering integrity.
        </p>
        <p className="mb-[0.8rem] text-[16px] font-semibold leading-[26px] text-ink-2">
          Scholar verified your Zakat is distributed in strict Sharia compliance.
        </p>
        <Button href="#zcalc" className="my-2 w-full p-4 text-[16px]">
          Give Zakat →
        </Button>
        <Button
          href="#zcalc"
          variant="outline"
          /* `!` beats the variant's own border colour, which Tailwind
             emits after this one regardless of attribute order */
          className="w-full !border-line px-4 py-[0.85rem] text-[14px] normal-case hover:!border-primary"
        >
          Calculate My Zakat
        </Button>

        <div className="mt-[1.1rem]">
          <div className="mb-[0.4rem] flex items-baseline justify-between">
            <span className="text-[14px] font-bold leading-5 text-ink-2">
              $913,847 raised
            </span>
            <span className="text-[12px] font-normal text-muted">30%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-primary" style={{ width: "30%" }} />
          </div>
        </div>
      </PageHero>

      {/* ===== INTRO + PATHWAY ===== */}
      <section className="py-[4.5rem]">
        <div
          className={cx(
            CONTAINER,
            "grid grid-cols-[1.2fr_1fr] items-center gap-12 max-nav:grid-cols-1"
          )}
        >
          <h2 className="reveal text-[clamp(2rem,4vw,48px)] font-black leading-[1.25] tracking-[-0.01em] [&>b]:text-primary">
            Today, <b>690 million</b> people face hunger and billions in Zakat go
            uncollected every year. Your <b>2.5%</b> can change everything.
          </h2>

          <div className="reveal rounded-lg bg-primary p-[2.4rem] text-white">
            <h3 className="mb-[1.1rem] inline-block text-[38.4px] font-black uppercase leading-[48px] tracking-[-0.01em]">
              The Iwan Pathway: Giving Your Zakat
              <span
                className="mt-[0.7rem] block h-[3px] origin-[left_center] scale-x-0 bg-accent will-change-transform"
                data-line
              />
            </h3>
            <ul className="mb-[1.4rem] flex flex-col gap-2">
              {[
                "Purify your wealth and soul",
                "Keep a child in school, shelter a family",
                "Feed the hungry and empower widows & orphans",
              ].map((line) => (
                <li
                  key={line}
                  className="text-[21.6px] font-bold leading-[32.4px] text-accent"
                >
                  {line}
                </li>
              ))}
            </ul>
            <blockquote className="text-[23px] font-normal italic leading-[31.6px] text-quote">
              "Take from their wealth a charity by which you purify them."{" "}
              <cite className="mt-2 block text-[20px] font-bold not-italic leading-[30px] text-white">
                Qur'an 9:103
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ===== CHANGING LIVES ===== */}
      <section className="pb-[4.5rem] pt-8">
        <div className={CONTAINER}>
          <h2
            className={cx(KICKER, "reveal text-[clamp(2rem,4.6vw,51.2px)] text-charcoal")}
          >
            How your Zakat is{" "}
            <span className={cx(MARK_B, "px-[14px] pb-1.5 pt-0.5")}>changing lives</span>
          </h2>

          <div
            className="grid grid-cols-4 gap-4 max-nav:grid-cols-2 max-phone:grid-cols-1"
            data-stagger
          >
            {LIVES.map(([tag, tone, text, img]) => (
              <div className={DCARD} key={tag}>
                <div className="relative h-[210px] overflow-hidden after:absolute after:inset-0 after:bg-card-scrim after:content-['']">
                  <span
                    className={cx(
                      "absolute left-0 top-0 z-[2] px-3 py-2",
                      "text-[11.5px] font-black uppercase leading-none tracking-[1.1px] text-white",
                      tone
                    )}
                  >
                    {tag}
                  </span>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[600ms] group-hover:scale-[1.08]"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </div>
                <div className="px-5 pb-4 pt-[18px] text-white">
                  <h3 className="text-[20px] font-black leading-[26px] tracking-normal">
                    {text}
                  </h3>
                  <div
                    className="mt-4 h-1 w-full origin-[left_center] scale-x-0 bg-accent will-change-transform"
                    data-line
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AMOUNT CARDS ===== */}
      <section className="pb-20">
        <div
          className={cx(
            CONTAINER,
            "grid grid-cols-4 gap-x-4 gap-y-20 max-nav:grid-cols-2 max-xs:grid-cols-1"
          )}
          data-stagger
        >
          {AMOUNTS.map(([icon, tone, amt, label]) => (
            <div className="reveal group relative cursor-pointer" key={amt + label}>
              <div
                className={cx(
                  "grid h-[184px] place-items-center rounded transition-transform duration-300",
                  "group-hover:-translate-y-1",
                  tone
                )}
              >
                <span className="text-[2.6rem] drop-shadow-emoji">{icon}</span>
              </div>
              {/* white price box overlapping the bottom */}
              <div className="absolute -bottom-[30px] left-1/2 w-[82%] -translate-x-1/2 rounded-[3px] bg-white p-3 text-center shadow-price">
                <strong className="block text-[22.4px] font-black text-ink">{amt}</strong>
                <small className="mt-0.5 block text-[10.88px] font-bold uppercase tracking-[0.02em] text-ash">
                  {label}
                </small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CALCULATOR ===== */}
      {/* the gutter lives on the section, not the card, or the rounded and
          shadowed box would carry a transparent strip down each side */}
      <section className="bg-calc-wash px-6 py-20 max-xs:px-4 max-xs:py-14" id="zcalc">
        <div className="reveal mx-auto grid w-full max-w-container grid-cols-2 overflow-hidden rounded-[3px] p-0 shadow-calc max-nav:grid-cols-1">
          {/* min-w-0: grid items default to min-width:auto and refuse to shrink
              below their content, which pushed the panels wider than the card */}
          <div className="min-w-0 bg-primary px-[3.2rem] py-12 text-white max-xs:px-6 max-xs:py-[2.2rem]">
            <span className={PILL_Y_BOLD}>✦ Essential Tool</span>
            <h2 className="my-[1.2rem] text-[clamp(2rem,3.6vw,48px)] font-bold leading-[1.12] tracking-[-0.02em]">
              Calculate Your <span className={ZY}>Zakat</span>
            </h2>
            <p className="mb-[1.3rem] text-[18px] font-normal leading-[29.25px] text-quote">
              Knowing your exact Zakat amount is the first step in fulfilling this sacred
              obligation. Our comprehensive calculator considers all forms of wealth —
              savings, gold, silver, investments and business assets.
            </p>
            <p className="mb-[1.3rem] text-[18px] font-normal leading-[29.25px] text-quote">
              Developed in consultation with Islamic scholars, our tool ensures your
              calculation is both accurate and compliant with Islamic jurisprudence.
            </p>
            <Button
              href="#"
              variant="yellow"
              className={cx(
                "mt-[0.6rem] rounded-[3px] px-10 py-6 text-[18px] font-bold",
                /* the 350px-wide CTA doesn't fit a phone at its desktop size */
                "max-xs:w-full max-xs:px-5 max-xs:py-[18px] max-xs:text-[16px]"
              )}
            >
              Open Zakat Calculator →
            </Button>
          </div>

          <div className="flex min-w-0 flex-col items-center justify-center bg-accent p-12 text-center text-primary max-xs:px-6 max-xs:py-[2.6rem]">
            <span className="text-[clamp(4rem,9vw,128px)] font-bold leading-none tracking-[-0.03em]">
              2.5%
            </span>
            <span className="mt-[0.6rem] text-[20px] font-bold">
              of your eligible wealth
            </span>
            <blockquote className="mt-[1.6rem] max-w-[430px] font-serif text-[18px] italic leading-[1.5] text-primary">
              "Take from their wealth a charity to purify them…"
            </blockquote>
            <cite className="mt-2 font-serif text-[16px] font-bold not-italic text-primary">
              Qur'an 9:103
            </cite>
          </div>
        </div>
      </section>

      {/* ===== ACT OF MERCY ===== */}
      <SplitFeature
        heading={
          <>
            Every Zakat is
            <br />
            an act of mercy.
          </>
        }
        body="Your generosity feeds the hungry, heals the sick and brings dignity to families in need wherever borders have put them out of reach."
        img="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=900&auto=format&fit=crop"
      >
        <Button href="#zcalc" variant="yellow">
          Give Zakat Now →
        </Button>
      </SplitFeature>

      {/* ===== ADMINISTER ===== */}
      <StepsFeature
        heading="How we administer your Zakat"
        body="Transparency, accountability and Sharia compliance are at the heart of everything we do. Your Zakat is separately earmarked, rigorously distributed and fully accounted for."
        steps={STEPS}
      >
        <Button href="#">Download Zakat Policy</Button>
      </StepsFeature>

      {/* ===== TRUSTED BY ===== */}
      <section className="py-[3.5rem]">
        <div className={CONTAINER}>
          <p className="reveal text-center text-[14px] font-semibold uppercase tracking-[0.06em] text-ink-2 opacity-70">
            Trusted By
          </p>
          <div
            className="reveal mt-[1.4rem] flex flex-wrap justify-center gap-12 max-xs:gap-[1.6rem]"
            data-stagger
          >
            {ADVISORS.map((a) => (
              <div className="reveal flex flex-col items-center gap-2" key={a.name}>
                <span className={SCHOLAR_AV}>{a.initials}</span>
                <strong className="text-[16px] font-semibold">{a.name}</strong>
                <small className="text-[12px] font-normal leading-4 text-ink-2 opacity-75">
                  {a.role}
                </small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ZAKAT POLICY ===== */}
      <section className="bg-primary py-[4.5rem] text-white">
        <div
          className={cx(
            CONTAINER,
            "reveal grid grid-cols-[1.1fr_0.9fr] items-start gap-[2.6rem] max-nav:grid-cols-1"
          )}
        >
          <div>
            <span className={PILL_Y_BOLD}>✦ Official Document</span>
            <h2 className="my-4 text-[clamp(2rem,3.6vw,48px)] font-bold">
              Our <span className={ZY}>Zakat Policy</span>
            </h2>
            <p className="mb-4 text-[18px] font-normal leading-[29.25px] text-quote">
              Our Zakat policy has been reviewed and approved by qualified scholars. It is
              designed to be as encompassing and accommodating as possible from an Islamic
              legal perspective.
            </p>
            <p className="mb-4 text-[18px] font-normal leading-[29.25px] text-quote">
              Zakat-eligible beneficiaries are classified into eight categories as named
              in the Qur'an. Our approach follows Islamic law within the framework of the
              four schools of jurisprudence.
            </p>
            <Button href="#" variant="yellow" className="mt-[0.6rem]">
              Download Zakat Policy (PDF)
            </Button>
          </div>

          <div className="rounded-[3px] border border-white/[0.16] bg-white/[0.08] p-8">
            <h3 className="mb-[1.2rem] text-[24px] font-bold leading-8 text-accent">
              The Eight Categories of Zakat
            </h3>
            <ol className="flex list-none flex-col gap-[0.7rem] [counter-reset:cat]">
              {CATEGORIES.map((c) => (
                <li
                  key={c}
                  className={cx(
                    "flex items-center gap-[0.7rem] text-[16px] font-normal leading-6 text-listed",
                    "[counter-increment:cat]",
                    "before:grid before:h-[22px] before:w-[22px] before:flex-none before:place-items-center",
                    "before:rounded-full before:bg-accent before:text-[12px] before:font-extrabold",
                    "before:text-primary before:content-[counter(cat)]"
                  )}
                >
                  {c}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ===== BADGES ===== */}
      <section className="border-b border-line py-8">
        <div className={cx(CONTAINER, "flex flex-wrap justify-center gap-x-10 gap-y-6")}>
          {BADGES.map((b) => (
            <span
              className="text-[13px] font-bold uppercase tracking-[0.04em] text-ink-2"
              key={b}
            >
              ✓ {b}
            </span>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-[4.5rem]">
        <div className={CONTAINER}>
          <div className="reveal mx-auto mb-[2.6rem] max-w-[680px] text-center">
            <span className={PILL_Y}>✦ Knowledge Center</span>
            <h2
              className={cx(
                KICKER,
                "mb-[1.1rem] mt-4 text-[clamp(2rem,3.6vw,48px)] font-bold leading-[1.2]"
              )}
            >
              Frequently Asked <span className={MARK_B}>questions</span>
            </h2>
            <p className="text-[20px] font-normal leading-7 text-muted">
              Understanding Zakat is essential to fulfilling this pillar correctly.
            </p>
          </div>

          <div className="reveal mx-auto flex max-w-[832px] flex-col gap-[0.7rem]">
            {FAQ.map(([q, a], i) => (
              <div
                className={cx(
                  "overflow-hidden rounded-[3px] border transition-colors duration-300",
                  open === i ? "border-primary" : "border-hairline"
                )}
                key={q}
              >
                <button
                  className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-white px-6 py-[1.4rem] text-left text-[18px] font-semibold text-ink"
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  {q}
                  <span className="flex-none text-2xl leading-none text-primary">
                    {open === i ? "–" : "+"}
                  </span>
                </button>
                <div
                  className={cx(
                    "overflow-hidden transition-[max-height] duration-[350ms] ease-in-out",
                    open === i ? "max-h-[260px]" : "max-h-0"
                  )}
                >
                  <p className="px-6 pb-[1.3rem] text-[15px] leading-[1.6] text-muted">
                    {a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-softbg py-[4.5rem] text-center">
        <div className={cx(CONTAINER, "reveal max-w-[700px]")}>
          <span className={PILL_G}>◈ Transforming Lives Beyond Borders</span>
          <h2
            className={cx(
              KICKER,
              "mb-[0.8rem] mt-[1.1rem] text-[clamp(2rem,3.6vw,48px)] font-bold leading-[48px]"
            )}
          >
            Fulfil your sacred obligation today
          </h2>
          <p className="mb-[1.8rem] text-[20px] font-normal leading-[32.5px] text-muted">
            Your Zakat has the power to transform lives. Give with confidence, knowing
            every dollar is handled as the sacred trust it truly is.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              href="#zcalc"
              variant="yellow"
              className="text-[18px] font-semibold leading-7"
            >
              Give Your Zakat Now →
            </Button>
            <Button
              href="#"
              variant="outline"
              className="text-[18px] font-semibold leading-7"
            >
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
