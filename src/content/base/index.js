import { BRAND } from "./brand.js";
import { PROGRAMMES, NAV_PAGES } from "./nav.js";
import { PILLARS } from "./pillars.js";
import { PROGRAMMES_CONTENT } from "./programmes.js";
import { TESTIMONIALS } from "./testimonials.js";
import { STATS } from "./stats.js";
import {
  INSTAGRAM_USERNAME,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  INSTAGRAM_POSTS,
  INSTAGRAM_IS_LIVE,
} from "./instagram.js";
import { FACEBOOK_PAGE } from "./facebook.js";
import { HERO_IMAGE, HERO_LOGOS, HERO_SLIDES, PROGRAMME_MARKS } from "./hero.js";
import { FOCUS_AREAS, FOCUS_LINKS } from "./focusAreas.js";
import { ADVISORS } from "./advisors.js";
import { COPY } from "./copy.js";
import { ABOUT } from "./about.js";
import { CONTACT } from "./contact.js";
import { WAYS } from "./ways.js";

/* The shape every country resolves to. A country folder overrides any subtree
   of this and inherits the rest.

   ⚠ events, blogs, podcast and promo are NOT here. The CMS owns those four
   outright — there is no static copy of them to fall back to, so with no
   VITE_CMS_API_URL those sections render their empty states rather than
   stand-in content. See content/cms.js. */
export const BASE_CONTENT = {
  brand: BRAND,
  copy: COPY,
  about: ABOUT,
  nav: { programmesGroup: PROGRAMMES, pages: NAV_PAGES },
  pillars: PILLARS,
  ways: WAYS,
  programmes: { content: PROGRAMMES_CONTENT },
  contact: CONTACT,
  testimonials: TESTIMONIALS,
  stats: STATS,
  facebook: { page: FACEBOOK_PAGE },
  instagram: {
    username: INSTAGRAM_USERNAME,
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
};

export default BASE_CONTENT;
