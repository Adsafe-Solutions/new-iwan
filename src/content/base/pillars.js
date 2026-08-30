/* =========================================================
   Believe · Act · Serve · Consult — Iwan's mission, and the
   vision pillar each one carries.

   The brand deck states these as two separate four-part lists
   (Vision: تقوى · آداب · صدقة · إقتصاد, Mission: إيمان · عمل ·
   خدمة · شورى) and then maps them one-to-one. They are folded
   together here so a card can show both at once instead of the
   site repeating the same four beats twice.

   `tone` / `ink` / `markTone` are Tailwind classes, never hexes —
   the colours themselves live in tailwind.config.js. They follow
   the deck's own card set: navy, yellow, teal, red.
   `mark` picks the geometric glyph drawn in Pillars.jsx.
========================================================= */

export const PILLARS = [
  {
    id: "believe",
    name: "Believe",
    ar: "إيمان",
    /* the vision pillar this one serves */
    serves: "God-Consciousness",
    servesAr: "تقوى",
    body: "Everything starts inward. We make room for prayer, reflection and honest questions, so conviction is something you hold rather than something you inherited.",
    tone: "bg-men",
    ink: "text-white",
    markTone: "text-accent",
    mark: "ring",
  },
  {
    id: "act",
    name: "Act",
    ar: "عمل",
    serves: "Good Manners",
    servesAr: "آداب",
    body: "Belief that stops at the head counts for little. Good manners, open-handedness and the discipline to keep turning up that is the part people actually feel.",
    tone: "bg-accent",
    ink: "text-men",
    markTone: "text-men",
    mark: "triangle",
  },
  {
    id: "serve",
    name: "Serve",
    ar: "خدمة",
    serves: "Generosity & Charity",
    servesAr: "صدقة",
    body: "We look after one another and the city around us not as a project with an end date, but as a habit the community keeps.",
    tone: "bg-youth",
    ink: "text-white",
    markTone: "text-red",
    mark: "bolt",
  },
  {
    id: "consult",
    name: "Consult",
    ar: "شورى",
    serves: "Prosperity & Economy",
    servesAr: "إقتصاد",
    body: "Nobody decides alone. Shura means the room stays open, the quiet voice gets heard, and the best idea wins regardless of who carried it in.",
    tone: "bg-red",
    ink: "text-white",
    markTone: "text-white",
    mark: "burst",
  },
];

export default PILLARS;
