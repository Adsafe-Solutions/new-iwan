/* Feature switches for whole sections of the site. Flip a flag to false and the
   section stops rendering everywhere — no other edits needed.

   Each one can also be set per deployment from a .env file, so dev can try a
   treatment prod is not running yet. The value here is the default: an unset
   env key leaves it alone rather than blanking it (see config/env.js). */
import { ENV } from "./env.js";

export const SECTIONS = {
  topbar: ENV.topbar ?? false,

  /* Which "about" treatment the programme pages use.
       "v1" — AboutStrip:  badged lede, then a centred row of ringed icons.
       "v2" — AboutSplit:  editorial two-column — eyebrow rule, oversized
                           heading with an italic accent word, stat and
                           photo on the left; numbered rows on the right.
     Flip this and every programme page changes together. */
  programmeAbout: ENV.programmeAbout ?? "v2",

  /* Which hero the homepage uses.
       "v1" — Hero:   the photo slider with the rising headline copy.
       "v2" — HeroV2: the full-bleed arch photograph with the brand mark
                      cycling through the programme logos, and the header
                      held back until you scroll.
     App.jsx reads this too, because v2 changes how the header behaves. */
  homeHero: ENV.homeHero ?? "v2",

  /* The on-load promo/seasonal-update pop-up (content/base/promo.js). Off by
     default — there is no live promotion to show yet, and content/base/promo.js
     still holds placeholder copy. Flip this once that file carries a real
     campaign. PromoPopup.jsx also skips it if promo.js is null. */
  promoPopup: ENV.promoPopup ?? true,
};

export default SECTIONS;
