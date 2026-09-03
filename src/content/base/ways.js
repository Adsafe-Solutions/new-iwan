import readLogo from "../../assests/logos/iwan-read-logo.webp";
import createLogo from "../../assests/logos/iwan-create-logo.webp";
import cafeLogo from "../../assests/logos/iwan-cafe-logo.webp";
import playLogo from "../../assests/logos/iwan-play-logo.webp";
import leadLogo from "../../assests/logos/iwan-lead-logo.webp";
import reflectLogo from "../../assests/logos/iwan-reflect-logo.webp";
import learnLogo from "../../assests/logos/iwan-learn-logo.webp";

/* ---------- WAYS TO CONNECT ----------
   The seven tracks a member can join — not programmes (those are in nav.js
   and programmes.js, and have pages of their own), but the kinds of thing
   Iwan runs. Each names a real activity, so it lives here rather than in
   copy.js.

   Each track carries its own colour pair from tailwind.config.js
   (`bg-way-<id>` for the rule, `bg-way-<id>-soft` for the plate), sampled
   from that track's logo export so the card and the mark agree. ⚠ Replace
   a logo and the palette entry has to be re-sampled with it — the rule is
   the one thing on the card that is not the export itself.

   All seven marks exist — 600×262 exports with the wordmark under the
   arch — so every card shows the whole logo. A track added before its
   mark is delivered can borrow another track's `logo` for its colour and
   carry `borrowed: true`: WaysToConnect.jsx then shows only the ARCH of
   the borrowed logo, never the wordmark, because a card headed
   "play @ iwan" must not display artwork reading "read @iwan". 600×161 of
   these exports is the arch alone, the same box in every one, so the marks
   line up either way, and the plate is a fixed box so the grid stays even.
   When the real mark lands: drop the file in assests/logos, point `logo`
   at it, add its colour pair to the palette and clear `borrowed`. */
export const WAYS = [
  {
    id: "read",
    name: "read",
    logo: readLogo,
    tone: "bg-way-read",
    soft: "bg-way-read-soft",
    activity: "Knowledge, reading habits & book discussions",
    examples: ["Book club", "Curated tracks", "Article summaries"],
  },
  {
    id: "create",
    name: "create",
    logo: createLogo,
    tone: "bg-way-create",
    soft: "bg-way-create-soft",
    activity: "Media, art, writing & design projects",
    examples: ["Design challenges", "Media lab", "Youth blog"],
  },
  {
    id: "cafe",
    name: "cafe",
    logo: cafeLogo,
    tone: "bg-way-cafe",
    soft: "bg-way-cafe-soft",
    activity: "Social connection & casual networking",
    examples: ["Informal meetups", "Virtual coffee chats", "Interest channels"],
  },
  {
    id: "play",
    name: "play",
    logo: playLogo,
    tone: "bg-way-play",
    soft: "bg-way-play-soft",
    activity: "Sports, fitness & healthy competition",
    examples: ["Sports leagues", "Outdoor activities", "Wellness routines"],
  },
  {
    id: "lead",
    name: "lead",
    logo: leadLogo,
    tone: "bg-way-lead",
    soft: "bg-way-lead-soft",
    activity: "Guidance, mentorship & personal development",
    examples: ["Career mentorship", "Leadership cohorts"],
  },
  {
    id: "learn",
    name: "learn",
    logo: learnLogo,
    tone: "bg-way-learn",
    soft: "bg-way-learn-soft",
    activity: "Practical skills, technical & professional tools",
    examples: ["Bootcamps", "Practical workshops", "Skill swaps"],
  },
  {
    id: "reflect",
    name: "reflect",
    logo: reflectLogo,
    tone: "bg-way-reflect",
    soft: "bg-way-reflect-soft",
    activity: "Faith, self-awareness & character building",
    examples: ["Discussion circles", "Spiritual lectures", "Firesides"],
  },
];

export default WAYS;
