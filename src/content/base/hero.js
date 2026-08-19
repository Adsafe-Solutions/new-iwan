import community from "../../assests/logos/iwan-community-logo.webp";
import youth from "../../assests/logos/iwan-youth-logo.webp";
import kids from "../../assests/logos/iwan-kids-logo.webp";
import men from "../../assests/logos/iwan-men-logo.webp";
import women from "../../assests/logos/iwan-women-logo.webp";

/* `scale` corrects uneven padding inside the exports: the mark fills 80% of
   the canvas on community/youth/kids, 65% on women, 53% on men. Re-export
   those two with matching margins and every scale goes back to 1. */
export const HERO_LOGOS = [
  { id: "community", src: community, alt: "iwan.community", scale: 1 },
  { id: "youth", src: youth, alt: "Iwan Youth", scale: 1 },
  { id: "kids", src: kids, alt: "Iwan Kids", scale: 1 },
  { id: "men", src: men, alt: "Iwan Men", scale: 1.51 },
  { id: "women", src: women, alt: "Iwan Women", scale: 1.23 },
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
