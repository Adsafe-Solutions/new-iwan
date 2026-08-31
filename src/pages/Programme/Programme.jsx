import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import Button from "../../components/Button/Button.jsx";
import Icon from "../../components/Icon/Icon.jsx";
import AboutStrip from "../../components/AboutStrip/AboutStrip.jsx";
import AboutSplit from "../../components/AboutSplit/AboutSplit.jsx";
import PageHero from "../../components/PageHero/PageHero.jsx";
import Journey from "../../components/Journey/Journey.jsx";
import Typewriter from "../../components/Typewriter/Typewriter.jsx";
import SplitFeature from "../../components/SplitFeature/SplitFeature.jsx";
import StepsFeature from "../../components/StepsFeature/StepsFeature.jsx";
import {
  useBrand,
  useCopy,
  useHero,
  usePillars,
  useProgrammes,
} from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { SECTIONS } from "../../config/sections.js";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_YB } from "../../lib/type.js";

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

/* "Iwan Men" → "Men". The CTA already sits on that programme's own page,
   so repeating the org name in the button is noise. */
const shortLabel = (label, brand) =>
  label.startsWith(`${brand} `) ? label.slice(brand.length + 1) : label;

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
  const { logos } = useHero();
  const { content: PROGRAMMES_CONTENT } = useProgrammes();
  useScrollAnimations();

  const slug = page.path.replace("/", "");
  const c = PROGRAMMES_CONTENT[slug] ?? {};
  const skin = SKIN[slug] ?? SKIN["iwan-youth"];
  /* the programme's own mark stands in for its name in the hero — `src` is
     the version drawn for a photograph. A page with no mark keeps the label. */
  const mark = logos.find((l) => l.id === page.mark);

  const strands = c.strands ?? [];
  const sessions = c.sessions ?? [];
  const work = c.work ?? null;
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
        anchor="bottom-left"
        img={c.hero ?? page.tile}
        imgAlt={`${page.label} session`}
        title={
          mark ? (
            <img
              src={mark.src}
              alt={page.label}
              /* scale corrects the uneven padding in the exports — see
                 hero.js. Width, not transform, so nothing fights the h1. */
              style={{ "--s": mark.scale ?? 1 }}
              className={cx(
                "block w-[calc(min(340px,44vw)*var(--s))] max-w-[92vw]",
                "max-phone:w-[calc(62vw*var(--s))]"
              )}
            />
          ) : (
            page.label
          )
        }
      >
        {/* the lede and the CTAs come through as children rather than as
            `excerpt`, so the typed line can sit directly under the name */}
        {(c.heroPhrases ?? []).length > 0 && (
          <p
            className={cx(
              "mb-5 font-satoshi text-[clamp(1.75rem,3.4vw,44px)] font-bold leading-[1.15]",
              "text-accent max-phone:text-[26px]"
            )}
          >
            <Typewriter
              phrases={c.heroPhrases}
              cursorClass="ml-[3px] inline-block h-[0.95em] w-[3px] animate-blink bg-white align-[-1px]"
            />
          </p>
        )}

        <p className="mb-9 max-w-[46ch] font-satoshi text-[18px] leading-[28px] text-white/85 max-phone:text-[16px] max-phone:leading-[25px]">
          {c.lede ?? page.intro}
        </p>

        <div className="flex flex-wrap gap-3">
          {/* straight to /events with this programme's chip already on —
              `programme` is the nav PATH, which is what the filter compares
              against (see matchesProgramme in lib/events.js) */}
          <Link
            to={`/events?programme=${encodeURIComponent(page.path)}`}
            className={cx(
              "inline-block rounded-lg bg-white px-9 py-4",
              "font-satoshi text-[18px] font-medium leading-none text-primary-800",
              "transition-[background-color,transform] duration-300",
              "hover:-translate-y-0.5 hover:bg-accent"
            )}
          >
            {fill(copy.cta, { programme: shortLabel(page.label, BRAND.name) })}
          </Link>
          {/* one second CTA, pointing at whichever of the two sections
              this programme actually has. Sessions win where both exist:
              what a programme has already run beats what it is for. */}
          {(sessions.length > 0 || work) && (
            <a
              href={sessions.length > 0 ? "#sessions" : "#work"}
              className={cx(
                "inline-block rounded-lg border-2 border-white/60 px-9 py-4",
                "font-satoshi text-[18px] font-medium leading-none text-white",
                "transition-[background-color,transform,color] duration-300",
                "hover:-translate-y-0.5 hover:bg-white hover:text-primary-800"
              )}
            >
              {sessions.length > 0 ? copy.sessionsCta : copy.workCta}
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

      {/* ===== WHAT TAKING PART LOOKS LIKE =====
          The KINDS of thing a member turns up for, both attending and
          contributing, rather than dated events — so it claims nothing ran.
          On Men and Women it stands in for the `sessions` they do not have;
          on Youth and Kids it sits alongside a real one, saying what the
          programme is for where sessions says what it has done. See the notes
          on those entries in programmes.js. Nothing here mounts late, so
          `.reveal` is safe; the sessions grid needs a keyframe only because
          its filter mounts cards after useGsap has scanned. */}
      {work && (
        <section className="py-16" id="work">
          <div className={CONTAINER}>
            <h2 className={cx(KICKER, "reveal")}>
              {work.heading} <span className={MARK_YB}>{work.mark}</span>
            </h2>
            {work.body && (
              <p className="reveal mb-8 max-w-[62ch] text-[17px] leading-[28px] text-muted">
                {work.body}
              </p>
            )}

            <div
              className="grid grid-cols-3 gap-4 max-nav:grid-cols-2 max-phone:grid-cols-1"
              data-stagger
            >
              {work.items.map((w) => (
                <article
                  className={cx(
                    "reveal flex flex-col rounded-2xl border border-line bg-white p-7",
                    "transition-[transform,box-shadow] duration-[250ms]",
                    "hover:-translate-y-1 hover:shadow-card"
                  )}
                  key={w.title}
                >
                  <span
                    className={cx(
                      "mb-5 grid h-12 w-12 place-items-center rounded-full",
                      skin.soft,
                      skin.text
                    )}
                  >
                    <Icon name={w.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mb-2 text-[19px] font-bold leading-[1.3]">{w.title}</h3>
                  <p className="text-[15px] leading-[24px] text-muted">{w.body}</p>
                  {/* optional, and pinned to the foot of the card so a row of
                      cards keeps one baseline however long the bodies run */}
                  {w.link && (
                    <Link
                      /* `programme: true` carries this programme's filter
                         through to the destination, so arriving from here
                         lands on its own posts rather than all of them. The
                         nav PATH is what the filter compares against, same as
                         the hero's /events CTA above. */
                      to={
                        w.link.programme
                          ? `${w.link.to}?programme=${encodeURIComponent(page.path)}`
                          : w.link.to
                      }
                      className={cx(
                        "mt-auto inline-flex items-center gap-1 pt-4",
                        "text-[14px] font-bold leading-none",
                        "underline decoration-transparent underline-offset-4",
                        "transition-colors duration-200 hover:decoration-current",
                        skin.text
                      )}
                    >
                      {w.link.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
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

      {/* ===== SESSIONS =====
          Sits AFTER the journey deliberately. `work` argues what taking part
          is like and `journey` walks the path; this is the evidence for both,
          so it reads better as the payoff than as a list you meet first. It
          also keeps the two card grids apart: work (six) immediately followed
          by sessions (five on Youth, seven on Kids) was a wall of cards. */}
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
          [copy.contactSteps.phone, BRAND.phone],
          [copy.contactSteps.visit, BRAND.address],
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
