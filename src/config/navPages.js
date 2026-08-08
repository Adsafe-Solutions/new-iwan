/* Pages that exist as nav entries + stubs only. Header builds its links from
   this list and App builds the matching routes, so the two can't drift.
   `group` folds an entry into that dropdown instead of the top-level bar. */
export const PROGRAMMES = "Programmes";

export const NAV_PAGES = [
  {
    label: "Iwan Youth",
    group: PROGRAMMES,
    path: "/iwan-youth",
    intro:
      "Programmes built with and for young people — mentoring, leadership and the chance to lead relief work of their own.",
  },
  {
    label: "Iwan Kids",
    group: PROGRAMMES,
    path: "/iwan-kids",
    intro:
      "Learning, play and support for our youngest community members, and for the children our donors help keep in school.",
  },
  {
    label: "Iwan Women",
    group: PROGRAMMES,
    path: "/iwan-women",
    intro:
      "Skills, livelihoods and support networks that help women build independence — for themselves and their families.",
  },
  {
    label: "Iwan Men",
    group: PROGRAMMES,
    path: "/iwan-men",
    intro:
      "Volunteering, mentorship and community work for the men giving their time and skills to those in need.",
  },
  {
    label: "Blogs",
    path: "/blogs",
    intro: "Field notes, donor stories and updates from the people doing the work.",
  },
  {
    label: "Events",
    path: "/events",
    intro:
      "Fundraisers, community gatherings and volunteer days — everything happening next.",
  },
  {
    label: "Podcast",
    path: "/podcast",
    intro:
      "Conversations with the volunteers, scholars and families behind our programmes.",
  },
];
