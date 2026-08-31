/* Date handling for everything that renders an event — the homepage section,
   the events page and the detail page all read from here rather than each
   keeping their own copy of the parser. */

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const MONTHS = [
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

/* ⚠ Field-by-field, never `new Date("2026-08-21")` — that parses as UTC and
   lands on the previous day for anyone west of Greenwich. */
export const parse = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const key = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

export const midnight = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const longDate = (iso, locale = "en-GB") =>
  parse(iso).toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/* The same date without the weekday — for a "last updated" line, where which
   day of the week it was is noise. */
export const plainDate = (iso, locale = "en-GB") =>
  parse(iso).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const dayNumber = (iso) => parse(iso).getDate();
export const shortMonth = (iso) => MONTHS[parse(iso).getMonth()].slice(0, 3);

export const upcomingFrom = (events, today) =>
  events
    .filter((e) => parse(e.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

export const findEvent = (events, slug) => events.find((e) => e.id === slug) ?? null;

/* The nav entry an event belongs to, or null for one that is not tied to a
   single programme. Reading it back out of nav rather than storing a label on
   the event is what keeps the chip, the filter and the programme page from
   disagreeing — and it is why an event pointing at a programme the active
   country does not run degrades to the community label instead of breaking. */
export const programmeOf = (event, pages = []) =>
  (event.programme && pages.find((p) => p.path === event.programme)) || null;

/* Filter values. Sentinels rather than "" / null so the state always has a
   meaning of its own, and so `copy` owns the labels. */
export const ALL_PROGRAMMES = "__all";
export const NO_PROGRAMME = "__community";

export const matchesProgramme = (event, value, pages = []) => {
  if (value === ALL_PROGRAMMES) return true;
  if (value === NO_PROGRAMME) return !programmeOf(event, pages);
  return event.programme === value;
};

/* The programmes that actually have something coming up, in nav order — an
   empty filter chip is worse than no chip. */
export const programmeFilters = (events, pages = []) => {
  const used = new Set(events.map((e) => e.programme).filter(Boolean));
  return pages.filter((p) => used.has(p.path));
};
