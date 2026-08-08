import iwanYouth from "../assests/iwan-youth.png";
import iwanKids from "../assests/iwan-kids.jpg";
import iwanWomen from "../assests/iwan-women.png";
import iwanMen from "../assests/iwan-men.png";

/* Pages that exist as nav entries + stubs only. Header builds its links from
   this list and App builds the matching routes, so the two can't drift.
   `group` folds an entry into that dropdown instead of the top-level bar.
   `hero` opts a programme into the homepage slider; `order` sets its turn. */
export const PROGRAMMES = "Programmes";

export const NAV_PAGES = [
  {
    label: "Iwan Youth",
    group: PROGRAMMES,
    path: "/iwan-youth",
    intro:
      "Mentoring, socials and leadership programmes that help teens grow into themselves — and into the community around them.",
    hero: { order: 3, title: "Where Young Voices Lead", img: iwanYouth },
  },
  {
    label: "Iwan Kids",
    group: PROGRAMMES,
    path: "/iwan-kids",
    intro:
      "Weekend clubs, storytelling and play that give our youngest a first, joyful taste of community life.",
    hero: { order: 4, title: "Where Every Child Belongs", img: iwanKids },
  },
  {
    label: "Iwan Women",
    group: PROGRAMMES,
    path: "/iwan-women",
    intro:
      "Circles, workshops and friendships that give women room to learn, lead and simply be among their own.",
    hero: { order: 2, title: "A Space to Call Her Own", img: iwanWomen },
  },
  {
    label: "Iwan Men",
    group: PROGRAMMES,
    path: "/iwan-men",
    intro:
      "Halaqas, sport, skills nights and service projects — a circle of men who show up for each other and the neighbourhood.",
    hero: { order: 1, title: "Brotherhood, Built to Last", img: iwanMen },
  },
  {
    label: "Blogs",
    path: "/blogs",
    intro: "Reflections, member stories and updates from across the community.",
  },
  {
    label: "Events",
    path: "/events",
    intro: "Gatherings, socials, talks and volunteer days — everything happening next.",
  },
  {
    label: "Podcast",
    path: "/podcast",
    intro:
      "Conversations with the volunteers, scholars and families behind our programmes.",
  },
];

export const HERO_SLIDES = NAV_PAGES.filter((p) => p.hero).sort(
  (a, b) => a.hero.order - b.hero.order
);
