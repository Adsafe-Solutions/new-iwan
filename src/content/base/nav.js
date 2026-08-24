/* Pages that exist as nav entries + stubs only. Header builds its links from
   this list and App builds the matching routes, so the two can't drift.
   `group` folds an entry into that dropdown instead of the top-level bar.

   Grouped entries also carry `tone`, `soft`, `text`, `edge`, `mark` and `tile` — the
   programme's own colour, that colour over white, it as type and it as a
   border (all defined in tailwind.config.js), the id of its logo in hero.js, and the photo
   behind it. They are written out in full because Tailwind scans this file as
   text: a class assembled by interpolation is never generated — because the "take action" grid on the homepage and
   an event's own page are built from this same list. */
export const PROGRAMMES = "Programmes";
export const ABOUT = "About Us";

export const NAV_PAGES = [
  {
    label: "Iwan Youth",
    group: PROGRAMMES,
    tone: "bg-youth",
    soft: "bg-youth-soft",
    text: "text-youth",
    edge: "border-youth/25",
    mark: "youth",
    tile: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=900&auto=format&fit=crop",
    path: "/iwan-youth",
    intro:
      "Programmes built with and for young people — mentoring, leadership and the chance to lead relief work of their own.",
  },
  {
    label: "Iwan Kids",
    group: PROGRAMMES,
    tone: "bg-kids",
    soft: "bg-kids-soft",
    text: "text-kids",
    edge: "border-kids/25",
    mark: "kids",
    tile: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=900&auto=format&fit=crop",
    path: "/iwan-kids",
    intro:
      "Learning, play and support for our youngest community members, and for the children our donors help keep in school.",
  },
  {
    label: "Iwan Women",
    group: PROGRAMMES,
    tone: "bg-women",
    soft: "bg-women-soft",
    text: "text-women",
    edge: "border-women/25",
    mark: "women",
    tile: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=900&auto=format&fit=crop",
    path: "/iwan-women",
    intro:
      "Skills, livelihoods and support networks that help women build independence — for themselves and their families.",
  },
  {
    label: "Iwan Men",
    group: PROGRAMMES,
    tone: "bg-men",
    soft: "bg-men-soft",
    text: "text-men",
    edge: "border-men/25",
    mark: "men",
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
  {
    label: "About Us",
    group: ABOUT,
    path: "/about-us",
    intro:
      "How Iwan started in Bangalore in 2020, who runs it, and what it is trying to be.",
  },
  {
    label: "Careers & Volunteering",
    group: ABOUT,
    path: "/careers-and-volunteering",
    intro:
      "Open roles and volunteering opportunities — ways to give your time and skills to Iwan's programmes.",
  },
];
