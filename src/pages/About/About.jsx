import { Link } from "react-router-dom";
import { IconArrowUpRight } from "@tabler/icons-react";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import Button from "../../components/Button/Button.jsx";
import WipeBand from "../../components/WipeBand/WipeBand.jsx";
import {
  useAbout,
  useBrand,
  useHero,
  useNav,
  usePillars,
  useProgrammes,
} from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B, MARK_YB } from "../../lib/type.js";

const CONTAINER = "mx-auto w-full max-w-container px-6";
/* the panel that floats over a WipeBand — StepsFeature's shape */
const CARD = "reveal rounded-lg bg-white p-12 shadow max-nav:p-8";
const EYEBROW =
  "reveal mb-4 text-[12px] font-bold uppercase leading-4 tracking-[0.16em] text-primary";
const BODY = "text-[17px] leading-[28px] text-ink-2";

/* One heading shape for the whole page: a plain line, then a marked one. */
function Heading({ text, mark, marker = MARK_B, className }) {
  return (
    <h2 className={cx(KICKER, "reveal !mb-5 !text-[clamp(1.9rem,4vw,44px)]", className)}>
      {text} <span className={marker}>{mark}</span>
    </h2>
  );
}

/* The Arabic sits right of the English on one baseline — the same pairing the
   brand deck sets these lists in, and what Pillars.jsx already does. */
function Named({ name, ar, size = "text-[19px]", className }) {
  return (
    <div className={cx("flex items-baseline justify-between gap-3", className)}>
      <h3 className={cx("font-black uppercase leading-[1.15] tracking-[-0.01em]", size)}>
        {name}
      </h3>
      <span className="text-[19px] font-bold leading-none opacity-80" lang="ar" dir="rtl">
        {ar}
      </span>
    </div>
  );
}

export default function About() {
  const about = useAbout();
  const BRAND = useBrand();
  const PILLARS = usePillars();
  const { programmesGroup, pages } = useNav();
  const { logos } = useHero();
  const { content: PROGRAMME_CONTENT } = useProgrammes();
  useScrollAnimations();

  const programmes = pages.filter((p) => p.group === programmesGroup);
  const markFor = (p) => logos.find((l) => l.id === p.mark);
  /* the programme's own lede where it has one — nav's `intro` is stub copy
     that still carries the inherited charity template's donor voice */
  const blurb = (p) => PROGRAMME_CONTENT[p.path.replace("/", "")]?.lede ?? p.intro;

  return (
    <main>
      {/* ===== WHO WE ARE ===== */}
      <section className="bg-mist pb-12 pt-[clamp(2.25rem,5vw,3.25rem)]">
        <div className={CONTAINER}>
          <p className={EYEBROW}>{about.hero.eyebrow}</p>
          <h1 className={cx(KICKER, "reveal !mb-0 !text-[clamp(2rem,5vw,60px)]")}>
            {about.hero.heading} <span className={MARK_B}>{about.hero.mark}</span>
          </h1>
        </div>
      </section>

      {/* ===== GENESIS ===== */}
      <section className="py-16">
        <div
          className={cx(
            CONTAINER,
            "grid grid-cols-[0.85fr_1.15fr] gap-14 max-nav:grid-cols-1 max-nav:gap-8"
          )}
        >
          <div>
            <p className={EYEBROW}>{about.genesis.eyebrow}</p>
            <Heading text={about.genesis.heading} mark={about.genesis.mark} />
          </div>
          <div className="flex flex-col gap-5">
            {about.genesis.paragraphs.map((t) => (
              <p className={cx("reveal max-w-[64ch]", BODY)} key={t.slice(0, 32)}>
                {t}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE PROGRAMMES =====
          Built from nav, so a country that runs fewer of them shows fewer. */}
      <section className="bg-mist py-16" data-deck>
        <div className={CONTAINER}>
          <p className={EYEBROW}>{about.programmes.eyebrow}</p>
          <Heading
            text={about.programmes.heading}
            mark={about.programmes.mark}
            className="!mb-10"
          />

          {/* The wrapper carries the deck transform and the card keeps its own
              hover lift — GSAP writes an inline transform, which would
              otherwise override `hover:-translate-y-1` outright. Same reason
              Pillars is built this way. */}
          <div className="relative grid grid-cols-4 gap-4 max-nav:grid-cols-2 max-phone:grid-cols-1">
            {programmes.map((p) => {
              const mark = markFor(p);
              return (
                <div className="relative" key={p.path} data-deck-card>
                  <Link
                    to={p.path}
                    className={cx(
                      "group flex h-full flex-col rounded-2xl border p-6",
                      "transition-[border-color,box-shadow,transform] duration-[250ms]",
                      "hover:-translate-y-1 hover:shadow-ecard",
                      p.soft,
                      p.edge
                    )}
                  >
                    {mark && (
                      <span className="mb-5 grid h-[72px] place-items-center">
                        <img
                          src={mark.src}
                          alt=""
                          style={{ "--s": mark.scale ?? 1 }}
                          className="w-[calc(96px*var(--s))] max-w-full"
                        />
                      </span>
                    )}
                    <h3 className="mb-2 text-[19px] font-bold leading-[1.3]">
                      {p.label}
                    </h3>
                    <p className="flex-1 text-[15px] leading-[23px] text-muted">
                      {blurb(p)}
                    </p>
                    <span
                      className={cx(
                        "mt-5 inline-flex items-center gap-1 text-[14px] font-bold",
                        p.text
                      )}
                    >
                      {about.programmes.cta}
                      <IconArrowUpRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        stroke={2}
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== VISION AND MISSION =====
          The same moment the programme pages use for "Come and see" and "Talk
          to us": a WipeBand sweeping the background in on scroll with the copy
          on a card floating above it. The card is what makes it readable —
          copy straight on the band is invisible until the sweep arrives.

          The four vision values come off the pillars, which already carry
          them: the deck maps mission to vision one-to-one, so listing them
          twice in content would be two places to get it wrong. */}
      <WipeBand from="left" tone="bg-accent" className="pb-8 pt-16">
        <div className={CARD}>
          <p className={EYEBROW}>{about.vision.eyebrow}</p>
          <Heading
            text={about.vision.heading}
            mark={about.vision.mark}
            marker={MARK_YB}
          />
          <p className={cx("reveal mb-9 max-w-[64ch]", BODY)}>{about.vision.body}</p>

          <div
            className="grid grid-cols-4 gap-4 max-nav:grid-cols-2 max-phone:grid-cols-1"
            data-stagger
          >
            {PILLARS.map((p) => (
              <div
                className="reveal rounded-xl border border-line bg-white px-5 py-[1.1rem]"
                key={`vision-${p.id}`}
              >
                <Named name={p.serves} ar={p.servesAr} size="text-[15px]" />
              </div>
            ))}
          </div>
        </div>
      </WipeBand>

      {/* sweeping the other way, so the two read as a pair */}
      <WipeBand from="right" tone="bg-primary" className="pb-16 pt-8">
        <div className={CARD}>
          <p className={EYEBROW}>{about.mission.eyebrow}</p>
          <Heading text={about.mission.heading} mark={about.mission.mark} />
          <p className={cx("reveal mb-9 max-w-[64ch]", BODY)}>{about.mission.body}</p>

          <div
            className="grid grid-cols-4 gap-4 max-nav:grid-cols-2 max-phone:grid-cols-1"
            data-stagger
          >
            {PILLARS.map((p) => (
              /* not links: the six core values below already explain each one,
                 and sending someone to the homepage mid-page reads as a
                 mistake rather than a route */
              <div
                className={cx("reveal rounded-xl px-5 py-[1.1rem]", p.tone, p.ink)}
                key={`mission-${p.id}`}
              >
                <Named name={p.name} ar={p.ar} size="text-[17px]" />
              </div>
            ))}
          </div>
        </div>
      </WipeBand>

      {/* ===== CORE VALUES ===== */}
      <section className="py-16" id="values" data-hscroll>
        <div className={CONTAINER}>
          <p className={EYEBROW}>{about.values.eyebrow}</p>
          <Heading text={about.values.heading} mark={about.values.mark} />
          <p className={cx("reveal mb-10 max-w-[64ch]", BODY)}>{about.values.body}</p>
        </div>

        {/* Full-bleed, so the row runs off the right edge; the first card lines
            up with the container. The wrapper is a real scroll container, which
            is what makes this work on a phone and with JavaScript off — see
            [data-hscroll] in useGsap.js. */}
        <div
          data-hscroll-wrap
          className={cx(
            /* py, not pb: the cards lift on hover and overflow-y clips at the
               padding box, so without room above they get cut along the top */
            "mt-8 overflow-x-auto overflow-y-hidden py-4",
            "[-ms-overflow-style:none] [scrollbar-width:none]",
            "[&::-webkit-scrollbar]:hidden"
          )}
        >
          {/* pl only, with a spacer for the trailing gutter: Chrome leaves a
              flex container's padding-right out of its scrollable overflow, so
              padding there would stop the travel short and leave the last card
              cut off at the edge. */}
          <div className="flex gap-5 pl-[max(1.5rem,calc((100vw-var(--container))/2+1.5rem))] max-nav:flex-col max-nav:pl-6 max-nav:pr-6">
            {about.values.items.map((v, i) => (
              <article
                className={cx(
                  "group flex w-[364px] flex-none flex-col rounded-2xl border border-line bg-white p-7",
                  "transition-[border-color,box-shadow,transform] duration-[250ms]",
                  "hover:-translate-y-1 hover:border-primary hover:shadow-ecard",
                  "max-nav:w-full"
                )}
                key={v.id}
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <span className="text-[12px] font-extrabold tracking-[0.18em] text-primary/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-[30px] font-bold leading-none text-primary"
                    lang="ar"
                    dir="rtl"
                  >
                    {v.ar}
                  </span>
                </div>

                <h3 className="mb-3 text-[20px] font-black uppercase leading-[1.2] tracking-[-0.01em]">
                  {v.name}
                </h3>
                <span className="mb-4 block h-1 w-12 rounded-full bg-accent" />
                <p className="text-[15px] leading-[25px] text-muted">{v.body}</p>
              </article>
            ))}
            <span
              className="w-[max(1.5rem,calc((100vw-var(--container))/2+1.5rem))] flex-none max-nav:hidden"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* ===== OUR PEOPLE ===== */}
      <section className="bg-mist py-16">
        <div className={CONTAINER}>
          <div className="grid grid-cols-[0.85fr_1.15fr] gap-14 max-nav:grid-cols-1 max-nav:gap-8">
            <div>
              <p className={EYEBROW}>{about.people.eyebrow}</p>
              <Heading text={about.people.heading} mark={about.people.mark} />
            </div>
            <div className="flex flex-col gap-5">
              {about.people.paragraphs.map((t) => (
                <p className={cx("reveal max-w-[64ch]", BODY)} key={t.slice(0, 32)}>
                  {t}
                </p>
              ))}
            </div>
          </div>

          <div
            className="mt-10 grid grid-cols-2 gap-5 max-phone:grid-cols-1"
            data-stagger
          >
            {about.people.images.map((im) => (
              <img
                src={im.src}
                alt={im.alt}
                loading="lazy"
                key={im.src}
                className="reveal h-[340px] w-full rounded-2xl object-cover max-phone:h-[240px]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== GET IN TOUCH ===== */}
      {/* ===== GET IN TOUCH =====
          A solid band, not a WipeBand: the copy here is white, and a wipe
          leaves it white-on-white until the sweep arrives — SplitFeature gets
          away with it only because its copy sits in its own dark card. */}
      <section className="bg-primary-800 py-16">
        <div className={CONTAINER}>
          <p className="reveal mb-4 text-[12px] font-bold uppercase leading-4 tracking-[0.16em] text-accent">
            {about.contact.eyebrow}
          </p>
          <h2
            className={cx(
              KICKER,
              "reveal !mb-5 !text-[clamp(1.9rem,4vw,44px)] text-white"
            )}
          >
            {about.contact.heading} <span className={MARK_YB}>{about.contact.mark}</span>
          </h2>
          <p className="reveal mb-8 max-w-[52ch] text-[17px] leading-[28px] text-white/80">
            {about.contact.body}
          </p>
          <Button href={`mailto:${BRAND.email}`} variant="yellow" className="reveal">
            {about.contact.cta}
          </Button>
        </div>
      </section>
    </main>
  );
}
