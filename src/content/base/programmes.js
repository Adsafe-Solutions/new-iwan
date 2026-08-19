/* =========================================================
   Programme page content — one entry per programme, keyed by the
   slug in navPages.js. `Programme.jsx` renders whatever is here and
   skips any section that has no content, so a thin entry degrades
   to a shorter page rather than a broken one.

   ⚠ WHAT IS REAL AND WHAT IS NOT
   `sessions` on Iwan Youth and Iwan Kids are real, taken from the live
   iwan.community programme pages. Women and Men have none listed,
   because none were available — the section simply does not render for
   them. Do not invent sessions to fill it: a listing of things that
   never happened is the same mistake as the press releases that got
   News pulled off the homepage.

   `impact` is a factual claim about what a programme has already
   done, so it only appears where there is a source.

   `img` on a session is the photograph the live page shows for it. Youth and
   Kids have one for every session; without one a session card falls back to a
   colour block in the programme's own tone.

   `heroPhrases` is what the hero types out under the programme name — short
   lines that restate what the programme already claims elsewhere, never a new
   fact. The same mechanic as the Zakat hero.

   `hero` is the full-bleed hero photograph. Only Youth has a real one
   (src/assests/iwan-youth-hero.png); the rest fall back to the stock
   `tile` from navPages.js.

   `journey` is the numbered path through a programme — the shape of
   taking part, not a list of past events, so it is ours to author. It
   replaced an `involve` list that said much the same thing.

   `about.accent` and `about.stat` are used only by the v2 treatment
   (AboutSplit) — the accent word is set in italic inside the heading, and
   the stat is the headline number. v1 ignores both, so either treatment
   renders correctly from the same entry.

   `banner.img` is a stock photo standing in for Iwan's own — swap it.

   `contact` is transcribed from the live Youth page — VERIFY IT.
   The email there is on a different domain (smilecareforall.org),
   which is either the registered entity or a leftover; it is left
   out here in favour of BRAND.email until someone confirms.
========================================================= */

/* Vite resolves this to a hashed URL at build time. The other three
   programmes fall back to their `tile` in navPages.js until real hero
   photography exists for them. */
/* The session photographs on the live site, served from Iwan's own CDN. They
   are real pictures of these sessions — the only real photography on the
   programme pages — so they are linked rather than replaced with stock.
   ⚠ Hotlinked: they load from cdn.iwan.community, not from this build, so a
   rename there breaks them here. Copy them into public/ to cut that tie. */
const img = (name) => `https://cdn.iwan.community/${name}.webp`;

import youthHero from "../../assests/iwan-youth-hero.png";
import { BRAND } from "./brand.js";
import womenHero from "../../assests/iwan-women-hero.png";
import kidsHero from "../../assests/iwan-men-hero.png";
import menHero from "../../assests/iwan-kids-hero.png";

export const PROGRAMMES_CONTENT = {
  "iwan-youth": {
    hero: youthHero,
    heroPhrases: [
      "Builds real skills",
      "Trains young leaders",
      "Runs on mentorship",
      "Starts by turning up",
    ],
    lede: "A programme for young people who want more than somewhere to pass the time — mentoring, real skills, and the room to lead something of their own.",
    about: {
      heading: "Growing up with purpose, together",
      body: "Iwan Youth is built on a simple belief: young people rise to what is asked of them. So we ask — sessions run from Web 3.0 and entrepreneurship to fitness, Islamic history and community service, often led by people only a couple of years older than the room.",
      accent: "purpose",
      stat: { value: "Dozens", label: "of young leaders trained this year" },
    },
    glance: [
      {
        icon: "people",
        title: "Who it's for",
        body: "Young people finding their footing — students, school-leavers and early-career.",
      },
      {
        icon: "calendar",
        title: "What happens",
        body: "Skill-building workshops, leadership training, sports and community service.",
      },
      {
        icon: "hands",
        title: "What you get",
        body: "Mentorship from people who have walked it, and a cohort that keeps showing up.",
      },
      {
        icon: "growth",
        title: "What it's led to",
        body: "Dozens of young leaders trained this year, now running projects of their own.",
      },
    ],
    /* the mission pillars this programme leans hardest on */
    pillars: ["believe", "act", "consult"],
    strands: ["Tech Hub", "Spiritual Growth", "Fitness"],
    sessions: [
      {
        title: "Stepping into the Future: Understanding Web 3.0",
        strand: "Tech Hub",
        body: "What the decentralised web actually is, and what it changes for the rest of us.",
        img: img("iwan-youth-tech-1"),
      },
      {
        title: "Early Islam in India: Lessons from History",
        strand: "Spiritual Growth",
        body: "Key moments from the history of Islam in India, and what still holds up today.",
        img: img("iwan-youth-spiritual-1"),
      },
      {
        title: "Fuel and Strength: Nutrition",
        strand: "Fitness",
        body: "The basics of eating well, for training and for everything else.",
        img: img("iwan-youth-fitness-2"),
      },
      {
        title: "Reflect on Stories: Men Around the Messenger",
        strand: "Spiritual Growth",
        body: "Lessons in faith and leadership from the lives of the men around the Messenger ﷺ.",
        img: img("iwan-youth-spiritual-2"),
      },
      {
        title: "Fitness for a Better You",
        strand: "Fitness",
        body: "Weightlifting technique — building strength safely, without guesswork.",
        img: img("iwan-youth-fitness-1"),
      },
    ],
    banner: {
      heading: "Come and see for yourself.",
      body: "The quickest way to know whether this is for you is to turn up to one session. Bring a friend if that makes it easier.",
      img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1200&auto=format&fit=crop",
    },
    journey: {
      heading: "Your Iwan Youth journey",
      subtitle:
        "Four steps from turning up for the first time to running something of your own.",
      steps: [
        {
          title: "Turn up",
          body: "Come to a session. Nothing to sign, nothing to pay, no need to know anyone.",
        },
        {
          title: "Find your footing",
          body: "Try a few strands until one sticks. Nobody minds how long that takes.",
        },
        {
          title: "Get a mentor",
          body: "Pair up with someone a few years further along the same road.",
        },
        {
          title: "Lead something",
          body: "Run a session yourself. Most of ours are led by people who started here.",
        },
      ],
    },
  },

  "iwan-kids": {
    hero: kidsHero,
    heroPhrases: [
      "Learning that sticks",
      "Curiosity out loud",
      "Taekwondo to gardening",
      "Habits that outlast the session",
    ],
    lede: "Somewhere for the youngest members of the community to be curious out loud — and to pick up the habits that outlast the session.",
    about: {
      heading: "Learning that doesn't feel like school",
      body: "Iwan Kids is where children get to try things — cooking with millets one week, world history the next, first aid the week after. The subjects change; what stays constant is that nobody is talked down to.",
      accent: "school",
    },
    glance: [
      {
        icon: "people",
        title: "Who it's for",
        body: "The community's youngest members, and the parents who come along with them.",
      },
      {
        icon: "calendar",
        title: "What happens",
        body: "Hands-on sessions that teach something real — cooking, history, first aid, martial arts.",
      },
      {
        icon: "hands",
        title: "What you get",
        body: "Life skills and good manners, picked up sideways while having fun.",
      },
      {
        icon: "growth",
        title: "What it's led to",
        body: "Dozens of children this year, through workshops, hands-on activities and community projects.",
      },
    ],
    pillars: ["believe", "act"],
    strands: [
      "Taekwondo",
      "Creativity and Learning",
      "Science and Exploration",
      "Culture and Community",
    ],
    sessions: [
      {
        title: "Building Strength and Discipline: Taekwondo",
        strand: "Taekwondo",
        /* ⚠ The live page repeats the Youth "Early Islam" copy under this
           title, which is plainly a paste error there. Described from the
           title instead of copying the mistake across. */
        body: "Belt by belt — technique, control and the discipline that comes with both.",
        img: img("iwan-kids-1"),
      },
      {
        title: "Magic with Light: Exploring Reflections and Refractions",
        strand: "Science and Exploration",
        body: "The wonders of light with prisms, sparking curiosity about how physics works.",
        img: img("iwan-kids-se-2"),
      },
      {
        title: "Little Gardeners: Growing Vegetables",
        strand: "Science and Exploration",
        body: "The basics of gardening, growing your own vegetables and a connection with nature.",
        img: img("iwan-kids-se-1"),
      },
      {
        title: "Wisdom Through Stories: Prophetic Tales and Lessons",
        strand: "Culture and Community",
        body: "Life lessons drawn out through storytelling sessions on the life of the Prophet ﷺ.",
        img: img("iwan-kids-cc-2"),
      },
      {
        title: "Colors of Creativity: Painting for Kids",
        strand: "Creativity and Learning",
        body: "Imagination and feeling let loose through vibrant painting activities.",
        img: img("iwan-kids-cl-1"),
      },
      {
        title: "Exploring Nature: An Adventure Trip to Lalbagh",
        strand: "Culture and Community",
        body: "A day out at Lalbagh — flora, fauna and how an ecosystem holds together.",
        img: img("iwan-kids-cc-1"),
      },
      {
        title: "Crafting with Threads: Stitching and Embroidery",
        strand: "Creativity and Learning",
        body: "Weaving and stitching into finished crafts, and the patience that takes.",
        img: img("iwan-kids-cl-2"),
      },
    ],
    banner: {
      heading: "Bring them along.",
      body: "Children work out within one session whether something is for them. Come and let yours find out — parents are welcome to stay.",
      img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1200&auto=format&fit=crop",
    },
    journey: {
      heading: "Your Iwan Kids journey",
      subtitle: "Four steps from a first visit to a child who asks when the next one is.",
      steps: [
        {
          title: "Come along",
          body: "Bring your child to a session and see how they take to it.",
        },
        {
          title: "Settle in",
          body: "Pick the sessions they enjoy. Parents are welcome to stay.",
        },
        {
          title: "Build skills",
          body: "Cooking, history, first aid, martial arts — a bit at a time.",
        },
        {
          title: "Grow into Iwan Youth",
          body: "When they are ready, the youth programme is waiting for them.",
        },
      ],
    },
  },

  "iwan-women": {
    hero: womenHero,
    heroPhrases: [
      "Skills you keep",
      "A network that holds",
      "Built with women",
      "Independence, together",
    ],
    lede: "Skills, livelihoods and a network that holds — built with women, not designed for them.",
    about: {
      heading: "Independence, built alongside other people",
      body: "Iwan Women is about capability and company in equal measure: practical skills and routes to income, alongside a group of women who know what you are working on and ask how it is going.",
      accent: "Independence",
    },
    glance: [
      {
        icon: "people",
        title: "Who it's for",
        body: "Women at any stage — building a livelihood, returning to work, or after a room of their own.",
      },
      {
        icon: "calendar",
        title: "What happens",
        body: "Skills sessions, livelihood and enterprise support, and gatherings for their own sake.",
      },
      {
        icon: "hands",
        title: "What you get",
        body: "Practical support toward independence, and a network that holds between sessions.",
      },
    ],
    pillars: ["act", "serve", "consult"],
    strands: [],
    sessions: [],
    banner: {
      heading: "There is a seat for you.",
      body: "Nothing is expected of you on a first visit beyond turning up. Come, see who is there, and decide afterwards.",
      img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1200&auto=format&fit=crop",
    },
    journey: {
      heading: "Your Iwan Women journey",
      subtitle: "Four steps from a first gathering to a skill you can build on.",
      steps: [
        {
          title: "Come to a gathering",
          body: "Nothing is expected of you on a first visit beyond turning up.",
        },
        {
          title: "Say what you need",
          body: "What runs is decided by the women who turn up. Tell us what would help.",
        },
        {
          title: "Build the skill",
          body: "Work at it with the group, and with the support to keep going.",
        },
        {
          title: "Pass it on",
          body: "Teach the next person what you learned. That is how the network holds.",
        },
      ],
    },
  },

  "iwan-men": {
    hero: menHero,
    heroPhrases: [
      "Work worth doing",
      "People worth knowing",
      "Show up, keep showing up",
      "A straightforward way in",
    ],
    lede: "Volunteering, mentorship and the community work that gets done when men turn up for it.",
    about: {
      heading: "Show up, and keep showing up",
      body: "Iwan Men is the least ceremonial of the programmes — time and skills given to the work that needs doing, from service projects to mentoring the younger members and the practical end of everything else Iwan runs.",
      accent: "showing up",
    },
    glance: [
      {
        icon: "people",
        title: "Who it's for",
        body: "Men with time, a trade, or simply the willingness to be useful.",
      },
      {
        icon: "calendar",
        title: "What happens",
        body: "Community service projects, mentoring the youth programme, and event support.",
      },
      {
        icon: "hands",
        title: "What you get",
        body: "Work worth doing, people worth knowing, and a straightforward way in.",
      },
    ],
    pillars: ["act", "serve"],
    strands: [],
    sessions: [],
    banner: {
      heading: "Turn up. That is the whole ask.",
      body: "No application, no committee. Come to the next project, bring whatever you are good at, and get stuck in.",
      img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1200&auto=format&fit=crop",
    },
    journey: {
      heading: "Your Iwan Men journey",
      subtitle:
        "Four steps from one afternoon of work to being part of what keeps it running.",
      steps: [
        {
          title: "Join a project",
          body: "Come to the next service project. Bring whatever you are good at.",
        },
        {
          title: "Find your part",
          body: "Every project needs a different trade. One of them will be yours.",
        },
        {
          title: "Mentor someone",
          body: "A couple of hours a month with the youth programme goes a long way.",
        },
        {
          title: "Keep it running",
          body: "Help hold up the practical end of everything else Iwan does.",
        },
      ],
    },
  },
};

/* ⚠ Transcribed from the live Youth page — verify before launch.
   The address lives on BRAND so the event modal's map and this panel can
   never disagree about where Iwan actually is. */
export const PROGRAMME_CONTACT = {
  phone: "+91 63600 049969",
  address: BRAND.address,
};

export default PROGRAMMES_CONTENT;
