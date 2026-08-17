import community from "../assests/logos/iwan-community-logo.webp";
import youth from "../assests/logos/iwan-youth-logo.webp";
import kids from "../assests/logos/iwan-kids-logo.webp";
import men from "../assests/logos/iwan-men-logo.webp";
import women from "../assests/logos/iwan-women-logo.webp";

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

export const HERO_IMAGE = "/hero.webp";

export default HERO_LOGOS;
