import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  useCopy,
  useCountry,
  useEvents,
  useNav,
} from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import EventModal from "../EventModal/EventModal.jsx";
import EventCard from "../EventCard/EventCard.jsx";
import EventFilters from "../EventFilters/EventFilters.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B } from "../../lib/type.js";
import {
  ALL_PROGRAMMES,
  MONTHS,
  WEEKDAYS,
  key,
  longDate,
  matchesProgramme,
  parse,
  midnight,
  upcomingFrom,
} from "../../lib/events.js";

/* Native `behavior: "smooth"` gives no control over speed, so the scroll is
   animated by hand. SCROLL_MS is the knob. */
const SCROLL_MS = 1100;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

function glideTo(el) {
  const header = document.querySelector("header");
  const offset = (header?.offsetHeight ?? 0) + 20;
  const to = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
  const from = window.scrollY;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, to);
    return;
  }

  /* html has `scroll-behavior: smooth`, which would fight these per-frame
     jumps — turn it off for the duration */
  const root = document.documentElement;
  root.classList.add("no-smooth");

  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / SCROLL_MS);
    window.scrollTo(0, from + (to - from) * easeInOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
    else root.classList.remove("no-smooth");
  };
  requestAnimationFrame(step);
}

/* Written out in full because Tailwind scans this file as text — a delay
   assembled by interpolation would never be generated. Cards past the fifth
   all share the last beat. */
const CARD_DELAYS = [
  "[animation-delay:0s]",
  "[animation-delay:0.06s]",
  "[animation-delay:0.12s]",
  "[animation-delay:0.18s]",
  "[animation-delay:0.24s]",
  "[animation-delay:0.3s]",
];

const LINK_BUTTON =
  "cursor-pointer border-0 bg-transparent p-0 font-bold text-primary underline [font:inherit]";

const CAL_DAY = cx(
  "flex aspect-square items-center justify-center rounded",
  "text-[13px] font-semibold text-ink-2"
);
const CAL_NAV = cx(
  "h-[30px] w-[30px] cursor-pointer rounded border border-line bg-white",
  "text-[18px] leading-none text-ink transition-colors duration-200",
  "hover:border-primary hover:bg-primary hover:text-white"
);

export default function Events() {
  const EVENTS = useEvents();
  const copy = useCopy().events;
  const [country] = useCountry();
  const { pages } = useNav();
  const today = useMemo(() => midnight(new Date()), []);

  /* The month the calendar opens on. Today's month only if something is
     actually happening in it — a country whose next event is two months out
     would otherwise land on a page with nothing highlighted on it. */
  const monthOf = (list, from) => {
    const first = list.find((e) => parse(e.date) >= from);
    const d = first ? parse(first.date) : from;
    return new Date(d.getFullYear(), d.getMonth(), 1);
  };

  const [cursor, setCursor] = useState(() => monthOf(upcomingFrom(EVENTS, today), today));
  const [selected, setSelected] = useState(null); // ISO day filter
  const [programme, setProgramme] = useState(ALL_PROGRAMMES);
  const [open, setOpen] = useState(null); // event in the modal
  const listRef = useRef(null);
  const wantScroll = useRef(false);

  /* Picking a date can leave you staring at empty space if you were scrolled
     down the old, longer list, so bring the top of the list back into view.
     It runs after render rather than in the click, because the list is keyed
     on `selected` and listRef still points at the outgoing node mid-click.
     The flag — rather than a "skip first render" guard — is what keeps it from
     firing on mount: StrictMode double-invokes effects and refs survive that
     remount, so a mounted-guard would scroll the page on load. */
  useEffect(() => {
    if (!wantScroll.current) return;
    wantScroll.current = false;
    if (listRef.current) glideTo(listRef.current);
  }, [selected]);

  /* The programme filter narrows the calendar too — highlighting a day that
     the list has already filtered out would give an empty result on click. */
  const upcoming = useMemo(
    () =>
      upcomingFrom(EVENTS, today).filter((e) => matchesProgramme(e, programme, pages)),
    [EVENTS, today, programme, pages]
  );

  /* chips come from the unfiltered list, or picking one would remove the rest */
  const upcomingAll = useMemo(() => upcomingFrom(EVENTS, today), [EVENTS, today]);

  const byDay = useMemo(() => {
    const map = new Map();
    upcoming.forEach((e) => map.set(e.date, [...(map.get(e.date) || []), e]));
    return map;
  }, [upcoming]);

  const shown = selected ? byDay.get(selected) || [] : upcoming;

  /* Monday-first grid, padded so the 1st lands under its weekday */
  const cells = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const lead = (first.getDay() + 6) % 7;
    const days = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    return [
      ...Array.from({ length: lead }, () => null),
      ...Array.from(
        { length: days },
        (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), i + 1)
      ),
    ];
  }, [cursor]);

  const shiftMonth = (n) => {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + n, 1));
    setSelected(null);
  };

  /* a country with nothing coming up gets no section at all, rather than a
     heading over an empty calendar */
  if (upcomingAll.length === 0) return null;

  return (
    <section className="bg-mist pb-[5.5rem] pt-[4.5rem]" id="events">
      <div className="mx-auto w-full max-w-container px-6">
        <h2 className={cx(KICKER, "reveal !mb-6")}>
          {copy.heading} <span className={MARK_B}>{copy.mark}</span>
        </h2>

        <div className="reveal mb-[2.2rem] flex flex-wrap items-center justify-between gap-4">
          <EventFilters
            events={upcomingAll}
            value={programme}
            /* the jump lives in the handler rather than an effect on
               `programme`: StrictMode double-invokes effects, and a
               skip-first-render ref survives that, so an effect would move
               the calendar on mount too */
            onChange={(v) => {
              setProgramme(v);
              setSelected(null);
              setCursor(
                monthOf(
                  upcomingAll.filter((e) => matchesProgramme(e, v, pages)),
                  today
                )
              );
            }}
          />
          <Link
            to="/events"
            className="text-[14px] font-bold text-primary underline underline-offset-4"
          >
            {copy.seeAll}
          </Link>
        </div>

        <div className="grid grid-cols-[1fr_340px] items-start gap-10 max-nav:grid-cols-1">
          {/* keyed on the filter so the cards replay their entrance. They are
              deliberately outside the GSAP `.reveal` system: that hook scans
              the DOM once on mount, so cards mounted by a later filter change
              would never be animated in and would sit at opacity 0. */}
          <div className="flex flex-col gap-4" ref={listRef} key={selected || "all"}>
            {shown.length === 0 && (
              <p className="rounded-lg border border-line bg-white p-8 text-muted">
                {copy.empty}{" "}
                <button
                  type="button"
                  className={LINK_BUTTON}
                  onClick={() => setSelected(null)}
                >
                  {copy.showAll}
                </button>
              </p>
            )}

            {shown.map((e, i) => (
              <EventCard
                key={e.id}
                event={e}
                onOpen={() => setOpen(e)}
                className={cx(
                  "animate-ecardIn",
                  CARD_DELAYS[Math.min(i, CARD_DELAYS.length - 1)]
                )}
              />
            ))}
          </div>

          <aside
            className={cx(
              "reveal sticky top-[calc(theme(spacing.header)+1rem)]",
              "rounded-lg border border-line bg-white p-[1.2rem]",
              "max-nav:static max-nav:max-w-[420px]"
            )}
            aria-label={copy.calendar}
          >
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                className={CAL_NAV}
                onClick={() => shiftMonth(-1)}
                aria-label={copy.prevMonth}
              >
                ‹
              </button>
              <strong className="text-[16px] font-extrabold">
                {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
              </strong>
              <button
                type="button"
                className={CAL_NAV}
                onClick={() => shiftMonth(1)}
                aria-label={copy.nextMonth}
              >
                ›
              </button>
            </div>

            <div className="mb-1.5 grid grid-cols-7 gap-1" aria-hidden="true">
              {WEEKDAYS.map((d) => (
                <span
                  key={d}
                  className="text-center text-[11px] font-bold uppercase tracking-[0.06em] text-muted"
                >
                  {d}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {cells.map((d, i) => {
                if (!d) return <span className="aspect-square" key={`pad-${i}`} />;
                const iso = key(d);
                const list = byDay.get(iso);
                const isToday = iso === key(today);

                /* days carrying events are buttons; the rest are inert spans */
                return list ? (
                  <button
                    type="button"
                    key={iso}
                    className={cx(
                      CAL_DAY,
                      "cursor-pointer border-0 font-extrabold [font-family:inherit]",
                      iso === selected
                        ? "bg-primary text-white"
                        : "bg-accent text-ink hover:bg-primary hover:text-white",
                      isToday && "outline outline-1 outline-primary"
                    )}
                    onClick={() => {
                      wantScroll.current = true;
                      setSelected(iso === selected ? null : iso);
                    }}
                    aria-label={fill(copy.dayLabel, {
                      count: list.length,
                      s: list.length > 1 ? "s" : "",
                      date: longDate(iso, country.locale),
                    })}
                  >
                    {d.getDate()}
                  </button>
                ) : (
                  <span
                    key={iso}
                    className={cx(
                      CAL_DAY,
                      isToday && "outline outline-1 outline-primary"
                    )}
                  >
                    {d.getDate()}
                  </span>
                );
              })}
            </div>

            <p className="mt-[0.9rem] text-[12px] leading-[18px] text-muted">
              {selected ? (
                <button
                  type="button"
                  className={LINK_BUTTON}
                  onClick={() => setSelected(null)}
                >
                  {copy.clearFilter}
                </button>
              ) : (
                copy.hint
              )}
            </p>
          </aside>
        </div>
      </div>

      {open && <EventModal event={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
