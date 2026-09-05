import { Link } from "react-router-dom";
import { IconArrowUpRight } from "@tabler/icons-react";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import ContactCta from "../../components/ContactCta/ContactCta.jsx";
import Journey from "../../components/Journey/Journey.jsx";
import {
  useCopy,
  useHero,
  useNav,
  useProgrammes,
} from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B } from "../../lib/type.js";

const CONTAINER = "mx-auto w-full max-w-container px-6";
const EYEBROW =
  "reveal mb-4 text-[12px] font-bold uppercase leading-4 tracking-[0.16em] text-primary";
const BODY = "text-[17px] leading-[28px] text-ink-2";

/* /careers-and-volunteering. There's no jobs board and no application
   system — the page is built around the one thing that's actually true:
   Iwan runs on volunteers, and the programmes grid (straight off nav.js,
   same cards About's programme grid uses) is where to go looking. */
export default function Careers() {
  const copy = useCopy().careers;
  const { programmesGroup, pages } = useNav();
  const { logos } = useHero();
  const { content: PROGRAMMES_CONTENT } = useProgrammes();
  useScrollAnimations();

  const programmes = pages.filter((p) => p.group === programmesGroup);
  const markFor = (p) => logos.find((l) => l.id === p.mark);
  /* the programme's own lede where it has one — nav's `intro` is stub copy,
     and a programme this country hasn't launched (see content/ca) has
     neither, which is fine: p.intro still describes it honestly */
  const blurb = (p) => PROGRAMMES_CONTENT[p.path.replace("/", "")]?.lede ?? p.intro;

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-mist pb-12 pt-[clamp(2.25rem,5vw,3.25rem)]">
        <div className={CONTAINER}>
          <p className={EYEBROW}>{copy.eyebrow}</p>
          <h1 className={cx(KICKER, "reveal !mb-5 !text-[clamp(2rem,5vw,56px)]")}>
            {copy.heading}
            <br />
            <span className={MARK_B}>{copy.mark}</span>
          </h1>
          <p className={cx("reveal max-w-[62ch]", BODY)}>{copy.body}</p>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <Journey
        heading={copy.stepsHeading}
        subtitle={copy.stepsSubtitle}
        steps={copy.steps}
      />

      {/* ===== WHERE YOU CAN HELP =====
          The same cards About's programme grid renders, straight off nav —
          a country that runs fewer programmes, or has one still "coming
          soon", shows exactly that here too. */}
      <section className="bg-mist py-16">
        <div className={CONTAINER}>
          <p className={EYEBROW}>{copy.waysEyebrow}</p>
          <p className={cx("reveal mb-10 max-w-[62ch]", BODY)}>{copy.waysBody}</p>

          <div
            className="grid grid-cols-4 gap-4 max-nav:grid-cols-2 max-phone:grid-cols-1"
            data-stagger
          >
            {programmes.map((p) => {
              const mark = markFor(p);
              return (
                <Link
                  to={p.path}
                  key={p.path}
                  className={cx(
                    "reveal group flex h-full flex-col rounded-2xl border p-6",
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
                  <h3 className="mb-2 text-[19px] font-bold leading-[1.3]">{p.label}</h3>
                  <p className="flex-1 text-[15px] leading-[23px] text-muted">
                    {blurb(p)}
                  </p>
                  <span
                    className={cx(
                      "mt-5 inline-flex items-center gap-1 text-[14px] font-bold",
                      p.text
                    )}
                  >
                    {copy.waysCta}
                    <IconArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      stroke={2}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== OPEN ROLES =====
          Still no jobs board — but there is somewhere to put your name now,
          which is what the two cards below are. */}
      <section className="py-16">
        <div className={cx(CONTAINER, "mx-auto max-w-[820px] text-center")}>
          <h2 className="reveal mb-3 text-[22px] font-black uppercase tracking-[-0.01em]">
            {copy.openRolesHeading}
          </h2>
          <p className={cx("reveal mx-auto mb-9 max-w-[62ch]", BODY)}>
            {copy.openRolesBody}
          </p>

          <div className="grid grid-cols-2 gap-5 text-left max-phone:grid-cols-1">
            {[
              {
                to: "/volunteer",
                title: copy.applyVolunteer,
                body: copy.applyVolunteerBody,
              },
              { to: "/careers", title: copy.applyCareer, body: copy.applyCareerBody },
            ].map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className={cx(
                  "reveal group flex flex-col rounded-2xl border border-line bg-white p-7",
                  "transition-[border-color,box-shadow,transform] duration-[250ms]",
                  "hover:-translate-y-1 hover:border-primary hover:shadow-ecard"
                )}
              >
                <span className="mb-2 flex items-center gap-2 text-[18px] font-extrabold">
                  {card.title}
                  <IconArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-[15px] leading-[24px] text-muted">{card.body}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
