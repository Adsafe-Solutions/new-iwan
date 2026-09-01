import { Link, useParams } from "react-router-dom";
import { IconArrowLeft, IconArrowUpRight } from "@tabler/icons-react";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import { usePageTitle } from "../../hooks/usePageTitle.js";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import MediaBrand from "../../components/MediaBrand/MediaBrand.jsx";
import {
  useBrand,
  useCopy,
  useCountry,
  useEvents,
  useHero,
  useNav,
} from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { findEvent, longDate, programmeOf } from "../../lib/events.js";
import VenueMap from "../../components/VenueMap/VenueMap.jsx";
import { cx } from "../../lib/cx.js";
import { useCms } from "../../hooks/useCms.js";
import { CMS_ENABLED } from "../../content/cms.js";

const LABEL =
  "mb-[0.9rem] block text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted";

const GLANCE = "rounded-2xl border border-line bg-white px-5 py-4";
const GLANCE_LABEL =
  "mb-1 block text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted";
const GLANCE_VALUE = "text-[16px] font-bold leading-[1.35]";

export default function EventDetail() {
  const { slug } = useParams();
  const EVENTS = useEvents();
  const copy = useCopy().eventDetail;
  const eventsCopy = useCopy().events;
  /* hoisted: the early return below would make a hook call in the JSX conditional */
  const modalCopy = useCopy().eventModal;
  const BRAND = useBrand();
  const [country] = useCountry();
  const { pages } = useNav();
  const { logos } = useHero();

  /* ⚠ `details` and `agenda` are NOT in the bootstrap — listings carry card
     fields only, which is what keeps that first payload bounded however many
     events exist. The full record is fetched here, by the one route that
     renders it. With the CMS off there is nothing to fetch: the static files
     hold the whole event. */
  const { data, loading, ready } = useCms(`/api/events/${slug}`, {
    enabled: CMS_ENABLED,
  });

  /* The card first, then the full record on top of it — an event on the
     bootstrap's first page paints its title, date and venue immediately rather
     than showing a blank page for a round trip. */
  const event = data ?? findEvent(EVENTS, slug);

  /* Hands GSAP a reason to rescan once the detail lands; without it everything
     the response rendered stays at `opacity: 0`. */
  useScrollAnimations(ready);
  usePageTitle(event?.title);

  if (!event && loading) {
    return (
      <main className="grid min-h-[60vh] place-items-center">
        <p className="text-[15px] text-muted">{copy.back}…</p>
      </main>
    );
  }

  /* A country that does not run a programme still has its /events/<slug> URLs
     shared around, so a missing event is a normal state, not an error. */
  if (!event) {
    return (
      <main className="pb-20 pt-24">
        <div className="mx-auto w-full max-w-[760px] px-6">
          <h1 className="mb-[1.2rem] text-[clamp(2.2rem,5vw,56px)] font-extrabold leading-[1.12] tracking-[-0.01em]">
            {copy.notFound}
          </h1>
          <p className="mb-8 text-[20px] leading-8 text-muted">{copy.notFoundBody}</p>
          <Link to="/events" className="font-bold text-primary underline">
            {copy.back}
          </Link>
        </div>
      </main>
    );
  }

  const programme = programmeOf(event, pages);
  /* the programme's own mark, or the community one for an event that is not
     tied to a single programme */
  const mark = logos.find((l) => l.id === (programme?.mark ?? "community")) ?? logos[0];

  return (
    <main>
      {/* the programme's colour and its mark, rather than a stock photograph —
          the mark goes on white because Youth and Men are orange and would be
          unreadable straight on the band, the same reason TrustedBy tiles them */}
      <section
        className={cx("relative overflow-hidden", programme?.tone ?? "bg-primary-800")}
      >
        <div className="mx-auto grid w-full max-w-container grid-cols-[1fr_auto] items-center gap-10 px-6 pb-9 pt-[clamp(1.75rem,4vw,2.5rem)] max-nav:grid-cols-1 max-nav:gap-6">
          <div>
            <Link
              to="/events"
              className="mb-5 inline-flex items-center gap-2 text-[14px] font-bold text-white/70 transition-colors duration-200 hover:text-white"
            >
              <IconArrowLeft className="h-4 w-4" stroke={2} aria-hidden="true" />
              {copy.back}
            </Link>

            <div className="mb-[0.7rem] flex flex-wrap items-center gap-3">
              <span className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-white">
                {longDate(event.date, country.locale)}
              </span>
              <span className="rounded-full bg-white/[0.18] px-[0.6rem] py-[3px] text-[11px] font-extrabold uppercase tracking-[0.12em] text-white">
                {programme ? programme.label : eventsCopy.community}
              </span>
            </div>

            <h1 className="mb-2.5 max-w-[20ch] text-[clamp(1.8rem,4vw,42px)] font-extrabold leading-[1.12] tracking-[-0.02em] text-white">
              {event.title}
            </h1>
            <p className="max-w-[52ch] text-[17px] leading-[26px] text-white/80">
              {event.summary}
            </p>
          </div>

          <span className="grid h-[112px] w-[156px] flex-none place-items-center rounded-2xl bg-white px-3 shadow-card max-nav:h-[92px] max-nav:w-[130px] max-nav:px-2.5">
            <img
              /* the dark cut where there is one — these panels are white, and the
                   community mark's default is drawn for a photograph */
              src={mark.dark ?? mark.src}
              alt=""
              style={{ "--s": mark.scale ?? 1 }}
              className="w-[calc(126px*var(--s))] max-w-full max-nav:w-[calc(102px*var(--s))]"
            />
          </span>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid w-full max-w-container grid-cols-[1fr_360px] items-start gap-12 px-6 max-nav:grid-cols-1 max-nav:gap-10">
          <div className="flex flex-col gap-10">
            {/* The event's own photo, branded like every other card image.
                Only when one was set — the band above already carries the
                identity, so no stock stand-in. */}
            {event.img && (
              <span className="reveal relative block overflow-hidden rounded-2xl">
                <img
                  src={event.img}
                  alt=""
                  className="max-h-[420px] w-full object-cover"
                />
                <MediaBrand />
              </span>
            )}

            <div className="reveal">
              <span className={LABEL}>{copy.aboutHeading}</span>
              <p className="max-w-[62ch] text-[17px] leading-[28px] text-ink-2">
                {event.details}
              </p>
              {programme && (
                <Link
                  to={programme.path}
                  className="mt-5 inline-flex items-center gap-1 text-[15px] font-bold text-primary underline underline-offset-4"
                >
                  {fill(copy.programmeLink, { programme: programme.label })}
                  <IconArrowUpRight className="h-4 w-4" stroke={2} aria-hidden="true" />
                </Link>
              )}
            </div>

            {event.agenda?.length > 0 && (
              <div className="reveal">
                <span className={LABEL}>{copy.runsHeading}</span>
                {event.agenda.map(([t, label]) => (
                  <div className="mb-3 flex items-baseline gap-[0.9rem]" key={t}>
                    <span className="w-[58px] flex-none text-[13px] font-extrabold text-primary">
                      {t}
                    </span>
                    <p className="text-[15px] leading-[22px]">{label}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="reveal">
              <span className={LABEL}>{copy.whereHeading}</span>
              <VenueMap
                event={event}
                fallback={BRAND.address}
                copy={{ mapTitle: modalCopy.mapTitle, directions: copy.directions }}
                size="full"
              />
            </div>
          </div>

          <aside className="sticky top-[calc(theme(spacing.header)+1rem)] flex flex-col gap-4 max-nav:static">
            <div className={cx(GLANCE, "grid grid-cols-2 gap-4")}>
              <span>
                <span className={GLANCE_LABEL}>{copy.dateLabel}</span>
                <span className={GLANCE_VALUE}>
                  {longDate(event.date, country.locale)}
                </span>
              </span>
              <span>
                <span className={GLANCE_LABEL}>{copy.timeLabel}</span>
                <span className={GLANCE_VALUE}>
                  {event.start}–{event.end}
                </span>
              </span>
              <span>
                <span className={GLANCE_LABEL}>{copy.kindLabel}</span>
                <span className={GLANCE_VALUE}>{event.kind}</span>
              </span>
              <span>
                <span className={GLANCE_LABEL}>{copy.spotsLabel}</span>
                <span className={GLANCE_VALUE}>
                  {fill(copy.spotsValue, { spots: event.spots })}
                </span>
              </span>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <span className="mb-4 block text-[18px] font-extrabold leading-[1.2]">
                {copy.registerHeading}
              </span>
              {/* The panel above already says "Save your place". */}
              <RegisterForm event={event} locale={country.locale} heading={false} />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
