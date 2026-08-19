/* List edits for a country override. Each returns a function, which merge
   hands the base list — so a country says what CHANGES about a list instead
   of restating it:

     events: add({ title: "Toronto meetup", date: "2026-09-12" })
     nav: { pages: remove("path", "/iwan-women") }
     testimonials: update("name", "Aisha", { role: "Volunteer lead" })

   `key` is whichever field identifies an item in that list — `path` for nav
   pages, `id` for hero logos, `date` for events. Anything these three do not
   cover is a plain arrow: `events: (list) => list.slice(0, 3)`. */

export const add =
  (...items) =>
  (list = []) => [...list, ...items];

export const addFirst =
  (...items) =>
  (list = []) => [...items, ...list];

export const remove =
  (key, ...values) =>
  (list = []) =>
    list.filter((item) => !values.includes(item?.[key]));

export const update =
  (key, value, changes) =>
  (list = []) =>
    list.map((item) => (item?.[key] === value ? { ...item, ...changes } : item));
