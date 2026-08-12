import { useEffect, useMemo, useRef, useState } from "react";
import { EVENTS } from "../../config/events.js";
import EventModal from "../EventModal/EventModal.jsx";
import Button from "../Button/Button.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B } from "../../lib/type.js";

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
    <section className="bg-mist pb-[5.5rem] pt-[4.5rem]" id="events">
      <div className="mx-auto w-full max-w-container px-6">
        <h2 className={cx(KICKER, "reveal")}>
          Upcoming <span className={MARK_B}>events</span>
        </h2>

        <div className="grid grid-cols-[1fr_340px] items-start gap-10 max-nav:grid-cols-1">
          {/* keyed on the filter so the cards replay their entrance. They are
              deliberately outside the GSAP `.reveal` system: that hook scans
              the DOM once on mount, so cards mounted by a later filter change
              would never be animated in and would sit at opacity 0. */}
          <div className="flex flex-col gap-4" ref={listRef} key={selected || "all"}>
            {shown.length === 0 && (
              <p className="rounded-lg border border-line bg-white p-8 text-muted">
                Nothing scheduled for that day.{" "}
                <button
                  type="button"
                  className={LINK_BUTTON}
                  onClick={() => setSelected(null)}
                >
                  Show all events
                </button>
              </p>
            )}

            {shown.map((e, i) => (
              <article
                className={cx(
                  "flex items-center gap-4 rounded-lg border border-line bg-white px-[1.3rem] py-[1.1rem]",
                  "animate-ecardIn",
                  CARD_DELAYS[Math.min(i, CARD_DELAYS.length - 1)],
                  "transition-[border-color,box-shadow,transform] duration-[250ms]",
                  "hover:-translate-y-0.5 hover:border-primary hover:shadow-ecard",
                  "max-phone:flex-col max-phone:items-stretch max-phone:gap-[0.9rem]"
                )}
                key={e.id}
              >
                {/* the whole left side is the trigger, so the card is one big
                    hit target */}
                <button
                  type="button"
                  className="flex min-w-0 flex-1 cursor-pointer items-center gap-[1.2rem] border-0 bg-transparent p-0 text-left text-inherit [font:inherit]"
                  onClick={() => setOpen(e)}
                  aria-label={`More about ${e.title}`}
                >
                  <span
                    className="flex h-[62px] w-[62px] flex-none flex-col items-center justify-center rounded bg-primary leading-[1.1] text-white"
                    aria-hidden="true"
                  >
                    <b className="text-[22px] font-extrabold">
                      {parse(e.date).getDate()}
                    </b>
                    <small className="text-[11px] font-bold uppercase tracking-[0.08em] opacity-85">
                      {MONTHS[parse(e.date).getMonth()].slice(0, 3)}
                    </small>
                  </span>
                  <span className="min-w-0">
                    <span className="mb-[0.45rem] inline-block rounded-full bg-primary/[0.08] px-2 py-[3px] text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary">
                      {e.tag}
                    </span>
                    <h3 className="mb-[0.3rem] text-[19px] font-bold leading-[1.3]">
                      {e.title}
                    </h3>
                    <p className="mb-[0.35rem] text-[13px] font-semibold text-muted">
                      {e.start}–{e.end} · {e.venue}
                    </p>
                    <p className="text-[14px] leading-[21px] text-muted">{e.summary}</p>
                  </span>
                </button>

                <Button
                  variant="outline"
                  className="flex-none px-[1.3rem] py-[0.7rem] text-[13px] max-phone:w-full"
                  onClick={() => setOpen(e)}
                >
                  Register
                </Button>
              </article>
            ))}
          </div>

          <aside
            className={cx(
              "reveal sticky top-[calc(theme(spacing.header)+1rem)]",
              "rounded-lg border border-line bg-white p-[1.2rem]",
              "max-nav:static max-nav:max-w-[420px]"
            )}
            aria-label="Events calendar"
          >
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                className={CAL_NAV}
                onClick={() => shiftMonth(-1)}
                aria-label="Previous month"
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
                aria-label="Next month"
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
                    aria-label={`${list.length} event${list.length > 1 ? "s" : ""} on ${longDate(iso)}`}
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
