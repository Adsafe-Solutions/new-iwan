import community from "../../assests/logos/iwan-community-logo.webp";
/* ⚠ the file really is spelled "iwant" */
import communityDark from "../../assests/logos/iwant-community-dark-logo.webp";
import youth from "../../assests/logos/iwan-youth-logo.webp";
import kids from "../../assests/logos/iwan-kids-logo.webp";
import men from "../../assests/logos/iwan-men-logo.webp";
import women from "../../assests/logos/iwan-women-logo.webp";

/* `scale` normalises the padding baked into each export, so every mark draws
   its arch at the SAME width wherever these are rendered. The four programme
   files are trimmed tight — ink fills 100% of the canvas — so they sit at 1;
   community carries ~20% margin, hence 1.25. Re-export it trimmed and that
   goes back to 1 too. ⚠ Measure the ink box before changing a number here;
   men and women were left at 1.51 and 1.23 after a re-export removed the
   padding those values were correcting, and drew half again too large. */
export const HERO_LOGOS = [
  /* `dark` is the same mark for light grounds — the hero cycles `src`, which
     is drawn for a photograph, so anything on white reaches for this. */
  {
    id: "community",
    src: community,
    dark: communityDark,
    alt: "iwan.community",
    /* both community files measure ~0.80 ink width; the dark one is 0.808,
       which is under a percent of difference and not worth a second field. */
    scale: 1.25,
  },
  { id: "men", src: men, alt: "Iwan Men", scale: 1 },
  { id: "women", src: women, alt: "Iwan Women", scale: 1 },
  { id: "youth", src: youth, alt: "Iwan Youth", scale: 1 },
  { id: "kids", src: kids, alt: "Iwan Kids", scale: 1 },
];

/* the four programme marks, without the community one */
export const PROGRAMME_MARKS = HERO_LOGOS.filter((l) => l.id !== "community").map(
  (l) => ({ ...l, label: l.alt.replace(/^Iwan\s+/, "") })
);

export const HERO_IMAGE = "/hero.webp";

/* v1 hero. ⚠ The three photos are still the inherited stock images and read as
   relief-charity photography. Swap `img` for real Iwan pictures. */
export const HERO_SLIDES = [
  {
    title: "Find Your People, Find Your Purpose",
    img: "https://cdn.prod.website-files.com/67d25bbe842c314895ddb151/67d29bce5aabd85a370d1621_home-hero-image-1.jpg",
  },
  {
    title: "Character Is Built in Good Company",
    img: "https://cdn.prod.website-files.com/67d25bbe842c314895ddb151/67d29bcedc5373f69470adc7_home-hero-image-2.jpg",
  },
  {
    title: "Come Learn Something With Us",
    img: "https://cdn.prod.website-files.com/67d25bbe842c314895ddb151/67d29bcec24af2e52edad21b_home-hero-image-3.jpg",
  },
];

export default HERO_LOGOS;
