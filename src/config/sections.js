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
};

export default SECTIONS;
