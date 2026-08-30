import readLogo from "../../assests/logos/iwan-read-logo.webp";
import createLogo from "../../assests/logos/iwan-create-logo.webp";
import cafeLogo from "../../assests/logos/iwan-cafe-logo.webp";

/* ---------- WAYS TO CONNECT ----------
   The eight tracks a member can join — not programmes (those are in nav.js
   and programmes.js, and have pages of their own), but the kinds of thing
   Iwan runs. Each names a real activity, so it lives here rather than in
   copy.js.

   ⚠ Only THREE marks exist so far — read, create and cafe. The designer is
   drawing the other five, so the five without one borrow a delivered mark
   for its colour and carry `borrowed: true`. That flag is why the card
   shows only the ARCH of the logo and never the wordmark underneath it: a
   card headed "play @ iwan" must not display artwork that reads
   "read @iwan". `GLYPH_RATIO` in WaysToConnect.jsx is the crop that does
   it — 600×161 of these 600-wide exports is the arch alone, and it is the
   same box in all three, so the marks line up.

   When a real mark lands: drop the file in assests/logos, point `logo` at
   it and clear `borrowed`. Nothing else changes. */
export const WAYS = [
  {
    id: "read",
    name: "read",
    logo: readLogo,
    tone: "bg-way-read",
    activity: "Knowledge, reading habits & book discussions",
    examples: ["Book club", "Curated tracks", "Article summaries"],
  },
  {
    id: "create",
    name: "create",
    logo: createLogo,
    tone: "bg-way-create",
    activity: "Media, art, writing & design projects",
    examples: ["Design challenges", "Media lab", "Youth blog"],
  },
  {
    id: "cafe",
    name: "cafe",
    logo: cafeLogo,
    tone: "bg-way-cafe",
    activity: "Social connection & casual networking",
    examples: ["Informal meetups", "Virtual coffee chats", "Interest channels"],
  },
  {
    id: "play",
    name: "play",
    logo: readLogo,
    borrowed: true,
    tone: "bg-way-read",
    activity: "Sports, fitness & healthy competition",
    examples: ["Sports leagues", "Outdoor activities", "Wellness routines"],
  },
  {
    id: "lead",
    name: "lead",
    logo: createLogo,
    borrowed: true,
    tone: "bg-way-create",
    activity: "Guidance, mentorship & personal development",
    examples: ["Career mentorship", "Leadership cohorts"],
  },
  {
    id: "serve",
    name: "serve",
    logo: cafeLogo,
    borrowed: true,
    tone: "bg-way-cafe",
    activity: "Civic duty, volunteering & social impact",
    examples: ["Volunteer campaigns", "Relief drives", "Charity initiatives"],
  },
  {
    id: "learn",
    name: "learn",
    logo: readLogo,
    borrowed: true,
    tone: "bg-way-read",
    activity: "Practical skills, technical & professional tools",
    examples: ["Bootcamps", "Practical workshops", "Skill swaps"],
  },
  {
    id: "reflect",
    name: "reflect",
    logo: createLogo,
    borrowed: true,
    tone: "bg-way-create",
    activity: "Faith, self-awareness & character building",
    examples: ["Discussion circles", "Spiritual lectures", "Firesides"],
  },
];

export default WAYS;
