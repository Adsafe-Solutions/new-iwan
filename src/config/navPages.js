/* Pages that exist as nav entries + stubs only. Header builds its links from
   this list and App builds the matching routes, so the two can't drift.
   `group` folds an entry into that dropdown instead of the top-level bar.

   Grouped entries also carry `tone` and `tile` — the programme's own colour
   (defined in tailwind.config.js) and the photo behind it — because the
   "take action" grid on the homepage is built from this same list. */
export const PROGRAMMES = "Programmes";

export const NAV_PAGES = [
  {
    label: "Iwan Youth",
    group: PROGRAMMES,
    tone: "bg-youth",
    tile: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=900&auto=format&fit=crop",
    path: "/iwan-youth",
    intro:
      "Programmes built with and for young people — mentoring, leadership and the chance to lead relief work of their own.",
  },
  {
    label: "Iwan Kids",
    group: PROGRAMMES,
    tone: "bg-kids",
    tile: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=900&auto=format&fit=crop",
    path: "/iwan-kids",
    intro:
      "Learning, play and support for our youngest community members, and for the children our donors help keep in school.",
  },
  {
    label: "Iwan Women",
    group: PROGRAMMES,
    tone: "bg-women",
    tile: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=900&auto=format&fit=crop",
    path: "/iwan-women",
    intro:
      "Skills, livelihoods and support networks that help women build independence — for themselves and their families.",
  },
  {
    label: "Iwan Men",
    group: PROGRAMMES,
    tone: "bg-men",
    tile: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&auto=format&fit=crop",
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
