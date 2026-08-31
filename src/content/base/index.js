import { BRAND } from "./brand.js";
import { PROGRAMMES, NAV_PAGES } from "./nav.js";
import { PILLARS } from "./pillars.js";
import { PROGRAMMES_CONTENT } from "./programmes.js";
import { EVENTS } from "./events.js";
import { TESTIMONIALS } from "./testimonials.js";
import { STATS } from "./stats.js";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  INSTAGRAM_POSTS,
  INSTAGRAM_IS_LIVE,
} from "./instagram.js";
import { HERO_IMAGE, HERO_LOGOS, HERO_SLIDES, PROGRAMME_MARKS } from "./hero.js";
import { FOCUS_AREAS, FOCUS_LINKS } from "./focusAreas.js";
import { ADVISORS } from "./advisors.js";
import { COPY } from "./copy.js";
import { ABOUT } from "./about.js";
import { BLOGS } from "./blogs.js";
import { PODCAST } from "./podcast.js";
import { CONTACT } from "./contact.js";
import { PROMO } from "./promo.js";
import { WAYS } from "./ways.js";

/* The shape every country resolves to. A country folder overrides any subtree
   of this and inherits the rest; the CMS will be asked for the same shape, so
   nothing above this file cares where the values came from. */
export const BASE_CONTENT = {
  brand: BRAND,
  copy: COPY,
  about: ABOUT,
  nav: { programmesGroup: PROGRAMMES, pages: NAV_PAGES },
  pillars: PILLARS,
  ways: WAYS,
  programmes: { content: PROGRAMMES_CONTENT },
  events: EVENTS,
  blogs: BLOGS,
  podcast: PODCAST,
  contact: CONTACT,
  testimonials: TESTIMONIALS,
  stats: STATS,
  instagram: {
    handle: INSTAGRAM_HANDLE,
    url: INSTAGRAM_URL,
    posts: INSTAGRAM_POSTS,
    isLive: INSTAGRAM_IS_LIVE,
  },
  hero: {
    image: HERO_IMAGE,
    logos: HERO_LOGOS,
    slides: HERO_SLIDES,
    programmeMarks: PROGRAMME_MARKS,
  },
  focus: { areas: FOCUS_AREAS, links: FOCUS_LINKS },
  advisors: ADVISORS,
  promo: PROMO,
};

export default BASE_CONTENT;
