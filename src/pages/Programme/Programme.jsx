import { useMemo, useState } from "react";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import Button from "../../components/Button/Button.jsx";
import Icon from "../../components/Icon/Icon.jsx";
import AboutStrip from "../../components/AboutStrip/AboutStrip.jsx";
import AboutSplit from "../../components/AboutSplit/AboutSplit.jsx";
import PageHero from "../../components/PageHero/PageHero.jsx";
import Journey from "../../components/Journey/Journey.jsx";
import SplitFeature from "../../components/SplitFeature/SplitFeature.jsx";
import StepsFeature from "../../components/StepsFeature/StepsFeature.jsx";
import {
  useBrand,
  useCopy,
  usePillars,
  useProgrammes,
} from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { SECTIONS } from "../../config/sections.js";
import { cx } from "../../lib/cx.js";
import { H_BLOCK, KICKER, MARK_YB } from "../../lib/type.js";

/* Each programme's own colour, written out per slug. Tailwind scans this
   file as plain text, so `text-${tone}` would never be generated — the
   whole class has to be here. */
const SKIN = {
  "iwan-youth": {
    solid: "bg-youth",
    text: "text-youth",
    soft: "bg-youth/10",
    tint: "hover:bg-youth/5",
    edge: "border-youth/30",
  },
  "iwan-kids": {
    solid: "bg-kids",
    text: "text-kids",
    soft: "bg-kids/10",
    tint: "hover:bg-kids/5",
    edge: "border-kids/30",
  },
  "iwan-women": {
    solid: "bg-women",
    text: "text-women",
    soft: "bg-women/10",
    tint: "hover:bg-women/5",
    edge: "border-women/30",
  },
  "iwan-men": {
    solid: "bg-men",
    text: "text-men",
    soft: "bg-men/10",
    tint: "hover:bg-men/5",
    edge: "border-men/30",
  },
};

/* Written out in full — a delay assembled by interpolation is never
   generated. Cards past the sixth share the last beat. */
const CARD_DELAYS = [
  "[animation-delay:0s]",
  "[animation-delay:0.06s]",
  "[animation-delay:0.12s]",
  "[animation-delay:0.18s]",
  "[animation-delay:0.24s]",
  "[animation-delay:0.3s]",
];

const CONTAINER = "mx-auto w-full max-w-container px-6";
/* the sentinel the filter compares against; `copy.allStrands` is what
   the chip actually reads */
const ALL = "__all";

/* ---------- ONE PAGE, EVERY PROGRAMME ----------
   `page` is the entry from navPages.js (label, path, tone, tile) and the
   body copy comes from programmes.js. Every section below is conditional,
   so a programme with only an intro renders a short honest page rather
   than a scaffold full of empty slots. */
export default function Programme({ page }) {
  const BRAND = useBrand();
  const copy = useCopy().programme;
  const PILLARS = usePillars();
  const { content: PROGRAMMES_CONTENT, contact: PROGRAMME_CONTACT } = useProgrammes();
  useScrollAnimations();

  const slug = page.path.replace("/", "");
  const c = PROGRAMMES_CONTENT[slug] ?? {};
  const skin = SKIN[slug] ?? SKIN["iwan-youth"];

  const strands = c.strands ?? [];
  const sessions = c.sessions ?? [];
  const [strand, setStrand] = useState(ALL);

  const shown = useMemo(
    () => (strand === ALL ? sessions : sessions.filter((s) => s.strand === strand)),
    [strand, sessions]
  );

  const pillars = PILLARS.filter((p) => (c.pillars ?? []).includes(p.id));

  return (
    <main>
      {/* ===== HERO =====
          The homepage treatment: copy set straight onto the photograph
          rather than in a card. `hero` is the real photograph where one
          exists, otherwise the programme's stock tile. */}
      <PageHero
        variant="overlay"
        img={c.hero ?? page.tile}
        imgAlt={`${page.label} session`}
        title={page.label}
        excerpt={c.lede ?? page.intro}
        eyebrow={
          /* accent rather than the programme colour — the darker programme
             tones lose too much contrast against the scrim */
          <p className="mb-4 flex items-center gap-3 font-satoshi text-[18px] font-medium text-accent">
            <span className={cx("h-2.5 w-2.5 rounded-full", skin.solid)} />
            {BRAND.name} Programme
          </p>
        }
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${BRAND.email}`}
            className={cx(
              "inline-block rounded-lg bg-white px-9 py-4",
              "font-satoshi text-[18px] font-medium leading-none text-primary-800",
              "transition-[background-color,transform] duration-300",
              "hover:-translate-y-0.5 hover:bg-accent"
            )}
          >
            {copy.cta}
          </a>
          {sessions.length > 0 && (
            <a
              href="#sessions"
              className={cx(
                "inline-block rounded-lg border-2 border-white/60 px-9 py-4",
                "font-satoshi text-[18px] font-medium leading-none text-white",
                "transition-[background-color,transform,color] duration-300",
                "hover:-translate-y-0.5 hover:bg-white hover:text-primary-800"
              )}
            >
              {copy.sessionsCta}
            </a>
          )}
        </div>
      </PageHero>

      {/* ===== WHAT IT IS, AND WHAT IT GIVES YOU =====
          Two interchangeable treatments off the same content — flip
          SECTIONS.programmeAbout to switch every programme page at once. */}
      {c.about &&
        (SECTIONS.programmeAbout === "v2" ? (
          <AboutSplit
            eyebrow={fill(copy.aboutEyebrow, { programme: page.label })}
            heading={c.about.heading}
            accent={c.about.accent}
            body={c.about.body}
            stat={c.about.stat}
            items={c.glance ?? []}
            tone={skin.text}
            hoverTint={skin.tint}
          />
        ) : (
          <AboutStrip
            icon="compass"
            eyebrow={fill(copy.aboutEyebrow, { programme: page.label })}
            heading={c.about.heading}
            body={c.about.body}
            items={c.glance ?? []}
            tone={skin.text}
            soft={skin.soft}
          />
        ))}

      {/* ===== HOW IT CARRIES THE MISSION =====
          The reference page stops at describing itself. Naming the pillars a
          programme leans on is what makes it Iwan's rather than anyone's. */}
      {pillars.length > 0 && (
        <section className="py-16">
          <div className={CONTAINER}>
            <h2 className="reveal mb-2 text-[clamp(1.6rem,2.6vw,30px)] font-black uppercase tracking-[-0.01em]">
              {copy.pillarsHeading}
            </h2>
            <p className="reveal mb-8 max-w-[58ch] text-[17px] leading-[28px] text-muted">
              {fill(copy.pillarsBody, { programme: page.label })}
            </p>
            <div className="flex flex-wrap gap-3" data-stagger>
              {pillars.map((p) => (
                <div
                  className={cx(
                    "reveal flex items-center gap-3 rounded-full px-5 py-2.5",
                    p.tone,
                    p.ink
                  )}
                  key={p.id}
                >
                  <span className="text-[15px] font-bold uppercase tracking-[0.06em]">
                    {p.name}
                  </span>
                  <span lang="ar" dir="rtl" className="text-[15px] font-bold opacity-80">
                    {p.ar}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== SESSIONS ===== */}
      {sessions.length > 0 && (
        <section className="py-16" id="sessions">
          <div className={CONTAINER}>
            {/* same treatment as "Believe. Act. Serve. — thrive" on the
                homepage: full kicker scale, last word in the accent marker */}
            <h2 className={cx(KICKER, "reveal")}>
              {copy.sessionsHeading} <span className={MARK_YB}>{copy.sessionsMark}</span>
            </h2>

            {strands.length > 0 && (
              <div className="reveal mb-8 flex flex-wrap gap-2">
                {[ALL, ...strands].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStrand(s)}
                    aria-pressed={strand === s}
                    className={cx(
                      "cursor-pointer rounded-full border px-4 py-2",
                      "text-[13px] font-bold uppercase tracking-[0.06em]",
                      "transition-colors duration-200",
                      strand === s
                        ? cx(skin.solid, "border-transparent text-white")
                        : "border-line bg-white text-muted hover:border-ink/30 hover:text-ink"
                    )}
                  >
                    {s === ALL ? copy.allStrands : s}
                  </button>
                ))}
              </div>
            )}

            {/* keyed on the filter so the cards replay their entrance, and
                animated by keyframe rather than `.reveal` — useGsap scans the
                DOM once at mount, so anything a filter mounts later would sit
                at opacity 0 forever */}
            <div className="grid grid-cols-3 gap-4 max-nav:grid-cols-2 max-phone:grid-cols-1">
              {shown.map((s, i) => (
                <article
                  className={cx(
                    "flex flex-col overflow-hidden rounded-2xl border border-line bg-white",
                    "animate-ecardIn",
                    CARD_DELAYS[Math.min(i, CARD_DELAYS.length - 1)],
                    "transition-[transform,box-shadow] duration-[250ms]",
                    "hover:-translate-y-1 hover:shadow-card"
                  )}
                  key={`${strand}-${s.title}`}
                >
                  {/* No stock photo standing in for a session that has its own
                      real pictures somewhere. A colour block carries the
                      strand until those arrive; add `img` to swap it. */}
                  {s.img ? (
                    <div
                      className="h-40 bg-cover bg-center"
                      style={{ backgroundImage: `url(${s.img})` }}
                    />
                  ) : (
                    <div
                      className={cx("grid h-28 place-items-center", skin.soft, skin.text)}
                    >
                      <Icon name="spark" className="h-10 w-10 opacity-70" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <span
                      className={cx(
                        "mb-2 text-[11px] font-bold uppercase tracking-[0.12em]",
                        skin.text
                      )}
                    >
                      {s.strand}
                    </span>
                    <h3 className="mb-2 text-[19px] font-bold leading-[1.3]">
                      {s.title}
                    </h3>
                    <p className="text-[15px] leading-[24px] text-muted">{s.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== JOURNEY =====
          What taking part actually looks like over time. It replaces the
          step chips that used to sit in the get-involved panel — two
          numbered lists on one page read as a mistake. */}
      {c.journey && (
        <Journey
          heading={c.journey.heading}
          subtitle={c.journey.subtitle}
          steps={c.journey.steps}
          tone={skin.text}
          className="bg-mist py-20 max-phone:py-14"
        />
      )}

      {/* ===== COME AND SEE ===== */}
      {c.banner && (
        <SplitFeature
          heading={c.banner.heading}
          body={c.banner.body}
          img={c.banner.img}
          imgAlt={fill(copy.bannerAlt, { programme: page.label })}
          wipeTone={skin.solid}
          size="lg"
        >
          <Button href={`mailto:${BRAND.email}`} variant="yellow">
            {copy.bannerCta}
          </Button>
        </SplitFeature>
      )}

      {/* ===== TALK TO US =====
          The step chips now carry the contact routes rather than a second
          numbered list — the Journey above already covers the sequence. */}
      <StepsFeature
        heading={copy.contactHeading}
        body={fill(copy.contactBody, { name: BRAND.name })}
        steps={[
          [copy.contactSteps.email, BRAND.email],
          [copy.contactSteps.phone, PROGRAMME_CONTACT.phone],
          [copy.contactSteps.visit, PROGRAMME_CONTACT.address],
        ]}
        stepTone={skin.solid}
        size="sm"
        /* matched to the SplitFeature above it, so the two read as a pair */
        cardClassName="min-h-[470px]"
      >
        <Button href={`mailto:${BRAND.email}`}>{copy.contactCta}</Button>
      </StepsFeature>
    </main>
  );
}
