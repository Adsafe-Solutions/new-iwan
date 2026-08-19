/* The About Us page.

   Every word is taken from the live iwan.community/about-us page — the
   genesis story, the vision and mission statements and the six core values
   are the organisation's own account of itself, so they are transcribed
   rather than rewritten. Only the section furniture around them is ours.

   The vision and mission lists are NOT repeated here: pillars.js already
   holds both (each pillar carries the vision value it serves), and the page
   renders them from there so the two cannot drift.

   ⚠ `img` values are hotlinked from Iwan's own CDN, like the session photos
   in programmes.js — a rename there breaks them here.

   The live page's vision/mission artwork is deliberately not used: both
   iwan_vision.webp and iwan_mission.webp are the SAME "MISSION" word-art, so
   the vision one is mislabelled, and either way it only repeats the four
   names the cards below already carry. */
const img = (name) => `https://cdn.iwan.community/${name}`;

export const ABOUT = {
  hero: {
    eyebrow: "About us",
    heading: "Transforming minds,",
    mark: "shaping the future",
  },

  genesis: {
    eyebrow: "Genesis",
    heading: "It started with relief work,",
    mark: "in a pandemic",
    paragraphs: [
      "Iwan was born in 2020, during the COVID-19 pandemic, when a group of young people in Bangalore came together for community relief work under Mercy Mission. This collective act of service brought us closer, igniting a deeper realization of life's transient nature and the responsibility we carry.",
      "The experience became the genesis of Iwan — a community where we could nurture our character, grow in god-consciousness, and strive to leave a meaningful legacy. Our weekly meetings became a space for reflection and growth, evolving over time into a vibrant collective with diverse activities that inspire and uplift.",
      "Yet at its core, Iwan remains committed to living with purpose, serving others, and fostering a legacy of compassion and growth.",
    ],
  },

  programmes: {
    eyebrow: "What we run",
    heading: "One community,",
    mark: "several rooms",
    cta: "Explore",
  },

  vision: {
    eyebrow: "Our vision",
    heading: "A society rooted in",
    mark: "four values",
    body: "At iwan.community, our vision is to cultivate a society deeply rooted in God-Consciousness, Good Manners, Generosity, and Prosperity. We aspire to create a community where these core values form the foundation for a purposeful and harmonious way of life.",
  },

  mission: {
    eyebrow: "Our mission",
    heading: "A framework for",
    mark: "meaningful action",
    body: "At iwan.community, our mission is a collective commitment to empower individuals in their pursuit of a purposeful and harmonious way of life. Guided by the principles of God-Consciousness, Good Manners, Generosity, and Prosperity, our mission is to provide a framework for meaningful action and community engagement.",
  },

  values: {
    eyebrow: "Core values",
    heading: "What governs",
    mark: "the work",
    body: "At iwan, we strive to uphold a set of values that govern our work and nurture our communities. Our values are rooted in the basic principles of Qurān and Sunnah and are the key drivers behind everything we do.",
    items: [
      {
        id: "taqwa",
        name: "God-Conscious",
        ar: "تقوى",
        body: "We strive to cultivate a community rooted in Taqwa (تقوى) — God-consciousness — where every action and interaction is guided by mindfulness of Allah. By fostering sincerity, accountability, and spiritual growth, we aim to uphold the values of piety and righteousness that bring us closer to our Creator and strengthen our bonds with one another.",
      },
      {
        id: "adab",
        name: "Manners",
        ar: "آداب",
        body: "We emphasize the importance of Adab (آداب) — Islamic manners — as a cornerstone of our community. By practicing respect, humility, and kindness in all interactions, we seek to embody the noble character taught by our Prophet ﷺ and create an environment of mutual dignity and harmony.",
      },
      {
        id: "sadaqah",
        name: "Generosity & Charity",
        ar: "صدقة",
        body: "We are dedicated to fostering a spirit of Generosity and Charity (صدقة) within our community. By giving selflessly and supporting those in need, we follow the prophetic example of compassion and create a culture of care, ensuring that no one is left behind.",
      },
      {
        id: "iqtisad",
        name: "Prosperity & Economy",
        ar: "إقتصاد",
        body: "We are committed to promoting Prosperity and Economy (إقتصاد) through ethical practices and mutual support. By fostering financial responsibility, sustainable growth, and fairness, we aim to build a community where everyone can thrive while upholding the principles of justice and balance in all economic dealings.",
      },
      {
        id: "iman",
        name: "Believe",
        ar: "إيمان",
        body: "Our foundation is built on Iman (إيمان) — faith and belief in Allah. It is the guiding light that strengthens our hearts, unites our community, and inspires us to live with purpose, trust, and unwavering devotion to our Creator.",
      },
      {
        id: "dawah",
        name: "Advocating",
        ar: "الدعوة",
        body: "We regard advocacy for the correct narrative in reference to contemporary issues as a necessary component of Islāmic teachings. Dispelling misconceptions and stereotypes, countering negative narratives, promoting respect, and empowering Muslims are some of the things we strive for.",
      },
    ],
  },

  people: {
    eyebrow: "Our people",
    heading: "Different backgrounds,",
    mark: "one mission",
    paragraphs: [
      "Iwan is a unified effort by individuals from diverse backgrounds, bringing unique skills and perspectives to a shared mission. Guided by the values of compassion, and service, we work together to drive meaningful initiatives and foster growth within the community.",
      "Our strength lies in our unity and commitment, with each member contributing time and energy to turn our vision into action.",
    ],
    images: [
      { src: img("iwan-people-1.webp"), alt: "Iwan members at a community session" },
      { src: img("people.webp"), alt: "Iwan volunteers together" },
    ],
  },

  contact: {
    eyebrow: "Get in touch",
    heading: "We'd love to hear",
    mark: "from you",
    body: "We're here to assist you with any questions, support, or partnership inquiries — reach out to us today.",
    cta: "Contact us",
  },
};

export default ABOUT;
