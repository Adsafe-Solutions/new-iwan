/* Feature switches for whole sections of the site. Flip a flag to false and the
   section stops rendering everywhere — no other edits needed. */
export const SECTIONS = {
  topbar: false,

  /* Which "about" treatment the programme pages use.
       "v1" — AboutStrip:  badged lede, then a centred row of ringed icons.
       "v2" — AboutSplit:  editorial two-column — eyebrow rule, oversized
                           heading with an italic accent word, stat and
                           photo on the left; numbered rows on the right.
     Flip this and every programme page changes together. */
  programmeAbout: "v2",

  /* Which hero the homepage uses.
       "v1" — Hero:   the photo slider with the rising headline copy.
       "v2" — HeroV2: the full-bleed arch photograph with the brand mark
                      cycling through the programme logos, and the header
                      held back until you scroll.
     App.jsx reads this too, because v2 changes how the header behaves. */
  homeHero: "v2",
};

export default SECTIONS;
