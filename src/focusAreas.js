/* =========================================================
   RBB focus areas — single source of truth.

   Nav, homepage sections, footer and the Zakat page all read
   from this list, so adding or reordering an area updates the
   whole site in one place. Order matters: Education leads.
========================================================= */

export const FOCUS_AREAS = [
  {
    id: "education",
    tag: "EDUCATION",
    label: "Education",
    /* Flagship — badged across the site as our primary focus. */
    flagship: true,
    color: "var(--green)",
    /* short line used on donation cards */
    card: "Put a child back in the classroom. Your gift covers school fees, books and a safe place to learn.",
    /* longer line used in the focus-areas pillars */
    blurb:
      "Education is the way out that lasts. We cover school fees, books, uniforms and safe learning spaces so a child's schooling never stops for want of money — and we are building this into RBB's primary programme.",
    img: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "homelessness",
    tag: "HOMELESSNESS",
    label: "Homelessness",
    color: "var(--blue)",
    card: "Get someone off the street tonight. Emergency shelter, warm bedding and a route back to stable housing.",
    blurb:
      "Nobody should sleep outside. We fund emergency shelter, winter kits and hot drinks on cold nights, then work with people on the longer path back into secure, permanent housing.",
    img: "https://images.pexels.com/photos/37393742/pexels-photo-37393742.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "food-security",
    tag: "FOOD SECURITY",
    label: "Food Security",
    color: "var(--amber)",
    card: "Fill an empty plate. Grocery support and hot meals for families who are going without.",
    blurb:
      "Hunger is rarely a one-off. Alongside food parcels and hot meals we back the things that keep a household fed month after month — community kitchens, grocery support and local food supply.",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "orphan-widow",
    tag: "ORPHAN & WIDOW SUPPORT",
    label: "Orphan & Widow Support",
    /* shown under the label wherever there's room for it */
    sub: "Economic & women's empowerment",
    color: "var(--pink)",
    card: "Sponsor an orphan or back a widow's livelihood, from just $75 a month.",
    blurb:
      "Care that does not stop at a monthly cheque. We sponsor orphans through school and invest in widows themselves — skills training, tools and small-business grants that turn support into an income a family controls.",
    img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop",
  },
];

/* Convenience: nav menus and footer link lists. */
export const FOCUS_LINKS = FOCUS_AREAS.map((a) => [a.label, `/#${a.id}`]);
