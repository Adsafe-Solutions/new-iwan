import { Link } from "react-router-dom";
import {
  useCopy,
  useHero,
  useNav,
  useProgrammes,
} from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";
import { fill, truncate } from "../../lib/fill.js";
import { KICKER, MARK_YB } from "../../lib/type.js";

/* ---------- THE PROGRAMMES, DEALT OUT ----------
   The same deck the Pillars section uses — the cards start piled up in the
   centre of the row and scrub into their grid positions while the section is
   pinned (see [data-deck] in useGsap). Everything here is the generic deck
   contract: `data-deck` on the section, `data-deck-card` on each card's
   wrapper, `data-deck-line` on the rule that draws in behind it.

   The cards are the programmes themselves, read off the same nav list the
   header and TakeAction are built from, so a country running three of them
   deals three cards. Colour and lede come from the programme's own entry.

   ⚠ The plate is the programme's LOGO on a soft ground, not a photograph.
   The marks are what the band above and the header already show, so the deck
   names each programme the same way rather than with a stock picture that
   says nothing about it. A programme with no mark of its own falls back to
   the community logo — its `dark` variant, since that is the one drawn for a
   light ground.

   A programme that is in the nav but has no `programmes.content` in this
   country (see content/ca and App.jsx's ComingSoon routing) has no lede to
   show, so its card says so under the mark — the same signal TakeAction and
   the TrustedBy band already give. */

/* The deck transform lives on the wrapper and the hover lift on the card:
   GSAP writes an inline transform, which would override `hover:-translate-y-2`
   outright if they shared an element. */
const CARD = cx(
  "group flex h-full flex-col overflow-hidden rounded shadow-card",
  "transition-transform duration-[350ms] hover:-translate-y-2"
);
const PLATE = "absolute inset-0 flex flex-col items-center justify-center gap-3";
const MARK =
  "w-[calc(110px*var(--s))] max-w-[70%] transition-transform duration-[600ms] group-hover:scale-[1.06]";

export default function ProgrammeDeck() {
  const { programmesGroup, pages } = useNav();
  const { logos, programmeMarks } = useHero();
  const { content: PROGRAMME_CONTENT } = useProgrammes();
  const copy = useCopy().programmeDeck;
  const comingSoon = useCopy().comingSoon;

  const CARDS = pages.filter((p) => p.group === programmesGroup);
  const contentFor = (p) => PROGRAMME_CONTENT[p.path.replace("/", "")];
  const community = logos.find((l) => l.id === "community");
  /* the community mark stands in for a programme with none of its own, and it
     is drawn light — `dark` is the copy meant for a pale ground. */
  const markFor = (p) =>
    programmeMarks.find((l) => l.id === p.mark) ??
    (community && { ...community, src: community.dark ?? community.src });

  return (
    <section className="bg-mist py-[4.5rem]" id="programme-deck" data-deck>
      <div className="mx-auto w-full max-w-container px-6">
        <h2 className={cx(KICKER, "reveal")}>
          {copy.heading} <span className={MARK_YB}>{copy.mark}</span>
        </h2>

        <p className="reveal mb-[2.6rem] max-w-[62ch] text-[18px] leading-[29px] text-muted">
          {copy.body}
        </p>

        <div className="relative grid grid-cols-4 gap-4 max-nav:grid-cols-2 max-phone:grid-cols-1">
          {CARDS.map((p) => {
            const content = contentFor(p);
            const mark = markFor(p);
            /* "Iwan Youth" reads as "Youth" once the card is already in the
               programme's own colour — the short label is the one the hero
               marks carry. */
            const name = mark?.label ?? p.label;

            return (
              <div className="relative" key={p.path} data-deck-card>
                <Link className={cx(CARD, p.tone, "text-white")} to={p.path}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className={cx(PLATE, p.soft)}>
                      {mark && (
                        <img
                          src={mark.src}
                          alt=""
                          style={{ "--s": mark.scale ?? 1 }}
                          className={MARK}
                        />
                      )}
                      {!content && (
                        <span
                          className={cx(
                            "text-[12px] font-extrabold uppercase tracking-[0.14em]",
                            p.text
                          )}
                        >
                          {comingSoon.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-[26px] font-black uppercase leading-none tracking-[-0.01em]">
                      {name}
                    </h3>

                    <p className="mb-5 mt-4 text-[15px] leading-[23px] opacity-90">
                      {truncate(content?.lede ?? p.intro, 150)}
                    </p>

                    <div
                      className="mt-auto h-1 w-full origin-[left_center] scale-x-0 bg-current opacity-40 will-change-transform"
                      data-deck-line
                    />

                    {/* the coming-soon card already says so over its logo, so
                        it gets no call to action underneath it as well */}
                    {content && (
                      <p className="mt-4 text-[12px] font-bold uppercase tracking-[0.1em] opacity-75">
                        {fill(copy.cta, { label: name })}{" "}
                        <span aria-hidden="true">→</span>
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
