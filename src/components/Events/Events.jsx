import { useEffect, useMemo, useRef, useState } from "react";
import { EVENTS } from "../../config/events.js";
import EventModal from "../EventModal/EventModal.jsx";
import Button from "../Button/Button.jsx";
import "./Events.css";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* local-time parse — `new Date("2026-08-21")` is UTC and shifts a day west of GMT */
const parse = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const key = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
const midnight = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const longDate = (iso) =>
  parse(iso).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/* Native `behavior: "smooth"` gives no control over speed, so the scroll is
   animated by hand. SCROLL_MS is the knob. */
const SCROLL_MS = 1100;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

function glideTo(el) {
  const header = document.querySelector(".header");
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
  const prev = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";

  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / SCROLL_MS);
    window.scrollTo(0, from + (to - from) * easeInOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
    else root.style.scrollBehavior = prev;
  };
  requestAnimationFrame(step);
}

export default function Events() {
  const today = useMemo(() => midnight(new Date()), []);
  const [cursor, setCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selected, setSelected] = useState(null); // ISO day filter
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

  const upcoming = useMemo(
    () =>
      EVENTS.filter((e) => parse(e.date) >= today).sort((a, b) =>
        a.date.localeCompare(b.date)
      ),
    [today]
  );

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

  return (
    <section className="events" id="events">
      <div className="container">
        <h2 className="kicker reveal">
          Upcoming <span className="mark mark--b">events</span>
        </h2>

        <div className="events__grid">
          {/* keyed on the filter so the cards replay their entrance. They are
              deliberately outside the GSAP `.reveal` system: that hook scans
              the DOM once on mount, so cards mounted by a later filter change
              would never be animated in and would sit at opacity 0. */}
          <div className="events__list" ref={listRef} key={selected || "all"}>
            {shown.length === 0 && (
              <p className="events__empty">
                Nothing scheduled for that day.{" "}
                <button type="button" onClick={() => setSelected(null)}>
                  Show all events
                </button>
              </p>
            )}

            {shown.map((e) => (
              <article className="ecard" key={e.id}>
                <button
                  type="button"
                  className="ecard__open"
                  onClick={() => setOpen(e)}
                  aria-label={`More about ${e.title}`}
                >
                  <span className="ecard__date" aria-hidden="true">
                    <b>{parse(e.date).getDate()}</b>
                    <small>{MONTHS[parse(e.date).getMonth()].slice(0, 3)}</small>
                  </span>
                  <span className="ecard__body">
                    <span className="ecard__tag">{e.tag}</span>
                    <h3>{e.title}</h3>
                    <p className="ecard__meta">
                      {e.start}–{e.end} · {e.venue}
                    </p>
                    <p className="ecard__summary">{e.summary}</p>
                  </span>
                </button>
                <Button
                  variant="outline"
                  className="ecard__cta"
                  onClick={() => setOpen(e)}
                >
                  Register
                </Button>
              </article>
            ))}
          </div>

          <aside className="cal reveal" aria-label="Events calendar">
            <div className="cal__head">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                aria-label="Previous month"
              >
                ‹
              </button>
              <strong>
                {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
              </strong>
              <button type="button" onClick={() => shiftMonth(1)} aria-label="Next month">
                ›
              </button>
            </div>

            <div className="cal__week" aria-hidden="true">
              {WEEKDAYS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>

            <div className="cal__grid">
              {cells.map((d, i) => {
                if (!d) return <span className="cal__pad" key={`pad-${i}`} />;
                const iso = key(d);
                const list = byDay.get(iso);
                const classes = [
                  "cal__day",
                  list ? "has" : "",
                  iso === key(today) ? "today" : "",
                  iso === selected ? "on" : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return list ? (
                  <button
                    type="button"
                    key={iso}
                    className={classes}
                    onClick={() => {
                      wantScroll.current = true;
                      setSelected(iso === selected ? null : iso);
                    }}
                    aria-label={`${list.length} event${list.length > 1 ? "s" : ""} on ${longDate(iso)}`}
                  >
                    {d.getDate()}
                  </button>
                ) : (
                  <span key={iso} className={classes}>
                    {d.getDate()}
                  </span>
                );
              })}
            </div>

            <p className="cal__note">
              {selected ? (
                <button type="button" onClick={() => setSelected(null)}>
                  Clear filter
                </button>
              ) : (
                "Highlighted days have events — select one to filter."
              )}
            </p>
          </aside>
        </div>
      </div>

      {open && <EventModal event={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
