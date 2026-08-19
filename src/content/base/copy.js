/* Every word the components used to hold themselves. One key per section, so
   a country overrides a heading the same way it overrides anything else:

     copy: { takeAction: { headingLine: "The programmes", mark: "we run" } }

   Headings that break across a plain line and a highlighted one keep the two
   parts separate, because that break is a design decision the copy has to be
   able to move. Templated values stay as {name}-style placeholders rather than
   being concatenated in the component — a translator needs the whole sentence.

   ⚠ Anything that names a real thing lives in its own file, not here: the org
   in brand.js, the programmes in nav.js and programmes.js, the quotes in
   testimonials.js. */
export const COPY = {
  header: {
    cta: "Contact Us",
    menu: "Menu",
  },

  modal: {
    close: "Close",
  },

  locationPrompt: {
    eyebrow: "Select a location",
    /* the country name follows, in the accent marker */
    headingLead: "You appear to be in",
    body: "You are viewing {name} {active}. The programmes, events and contact details are different in each.",
    stayNote: "You can change this any time from the switcher in the header.",
    switch: "Switch to {detected}",
    stay: "Stay on {active}",
  },

  hero: {
    kicker: "Believe · Act · Serve — Thrive",
    body: "Iwan is a community hub in Bangalore — classes, workshops, mentoring and volunteering, built around faith, good character and the kind of friendship that outlasts the session. Everyone is welcome.",
    cta: "Get Involved",
    prevSlide: "Previous slide",
    nextSlide: "Next slide",
  },

  heroV2: {
    imageAlt: "Light through a carved arch",
    scroll: "Scroll",
  },

  trustedBy: {
    eyebrow: "One community, four programmes",
    headingLines: ["We're a", { mark: "community-led" }, "Muslim organisation."],
  },

  pillars: {
    heading: "Believe. Act. Serve. —",
    mark: "thrive",
    body: "Four commitments we hold each other to. They are the reason the classes, the workshops and the volunteering all belong to the same organisation.",
  },

  takeAction: {
    heading: "The programmes",
    mark: "we run",
  },

  events: {
    heading: "Upcoming",
    mark: "events",
    empty: "Nothing scheduled for that day.",
    showAll: "Show all events",
    register: "Register",
    more: "More about {title}",
    calendar: "Events calendar",
    prevMonth: "Previous month",
    nextMonth: "Next month",
    dayLabel: "{count} event{s} on {date}",
    hint: "Highlighted days have events — select one to filter.",
    clearFilter: "Clear filter",
    /* the chip on an event that is not tied to one programme */
    community: "Open to all",
    filterLabel: "Filter by programme",
    allProgrammes: "All programmes",
    seeAll: "See all events",
  },

  /* the closing "get in touch" band — About and every blog post carry it */
  contactCta: {
    eyebrow: "Get in touch",
    heading: "We'd love to hear",
    mark: "from you",
    body: "We're here to assist you with any questions, support, or partnership inquiries — reach out to us today.",
    cta: "Contact us",
  },

  /* the /blogs page and each post's own /blogs/<slug> page */
  blogsPage: {
    eyebrow: "Writing",
    heading: "Notes from",
    mark: "the sessions",
    body: "Summaries, reflections and write-ups from the sessions and workshops we run. Pick a programme to narrow the list.",
    count: "{count} post{s}",
    empty: "Nothing published under that programme yet.",
    none: "Nothing published yet. Check back soon.",
    read: "Read",
    /* blogs are filed by category, not by who they are open to — the live site
       calls the uncategorised one "Default" */
    community: "Default",
    more: "Read {title}",
    prev: "Previous",
    next: "Next",
    page: "Page {page} of {total}",
    goToPage: "Go to page {page}",
  },

  blogPost: {
    back: "All posts",
    programmeLink: "More about {programme}",
    notFound: "We can’t find that post",
    notFoundBody: "It may have moved, or the link may be wrong.",
  },

  /* the /events page and each event's own /events/<slug> page */
  eventsPage: {
    eyebrow: "What's on",
    heading: "Every event,",
    mark: "in one place",
    body: "Programmes, gatherings and volunteer days. Pick a programme to narrow the list, or browse everything that is coming up.",
    count: "{count} event{s}",
    empty: "Nothing coming up under that programme yet.",
    details: "Event details",
    past: "Nothing is scheduled at the moment. Check back soon.",
  },

  eventDetail: {
    back: "All events",
    aboutHeading: "About this event",
    runsHeading: "How the day runs",
    whereHeading: "Where",
    directions: "Get directions",
    detailsHeading: "At a glance",
    dateLabel: "Date",
    timeLabel: "Time",
    kindLabel: "Type",
    spotsLabel: "Places",
    spotsValue: "{spots} places",
    registerHeading: "Save your place",
    programmeLink: "More about {programme}",
    notFound: "We can’t find that event",
    notFoundBody: "It may have finished, or the link may be wrong.",
  },

  testimonials: {
    heading: "In their",
    mark: "own words",
    body: "Members on the sessions they have been to — gardening, Taekwondo, first aid, entrepreneurship, and whatever is on next.",
    carousel: "Member testimonials",
    prev: "Previous testimonial",
    next: "Next testimonial",
    goTo: "Show testimonial from {author}",
  },

  instagram: {
    heading: "Follow",
    mark: "along",
    body: "What the sessions actually look like, as they happen.",
    cta: "View us on Instagram",
  },

  eventModal: {
    runsHeading: "How the day runs",
    whereLabel: "Where",
    mapTitle: "Map showing {venue}",
    directions: "Get directions",
    register: "Register",
    free: "Free to attend · everyone welcome",
    formHeading: "Save your place",
    nameLabel: "Your name",
    namePlaceholder: "First and last",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    submit: "Confirm my place",
    cancel: "Cancel",
    doneHeading: "You’re in{name}",
    doneBody: "We’ve noted your place at {title} on {date}.",
  },

  footer: {
    blurb: "Be the first to hear about our impact and new volunteer opportunities.",
    subscribeHeading: "Subscribe to receive updates",
    emailPlaceholder: "Enter your email",
    emailLabel: "Email address",
    subscribe: "Subscribe",
    consent:
      "By subscribing you agree to receive updates from {name} from time to time and to our",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    rights: "All rights reserved.",
  },

  programme: {
    cta: "Get involved",
    sessionsCta: "What's on",
    sessionsHeading: "What's",
    sessionsMark: "on",
    allStrands: "All",
    aboutEyebrow: "About {programme}",
    pillarsHeading: "Where this sits in the mission",
    pillarsBody:
      "Every programme carries the same four commitments. These are the ones {programme} leans on hardest.",
    bannerAlt: "{programme} together",
    bannerCta: "Get in touch →",
    contactHeading: "Talk to us",
    contactBody:
      "There is no application and no waiting list. Say hello however suits you, and {name} will take it from there.",
    contactSteps: { email: "Email", phone: "Phone", visit: "Visit" },
    contactCta: "Email us",
  },

  placeholder: {
    soon: "This page is coming soon. In the meantime, explore",
    work: "our work",
    or: "or",
    zakat: "give your Zakat",
  },

  notFound: {
    heading: "We can’t find that page",
    body: "{path} isn’t part of {name} {country}. It may belong to another country, or it may have moved.",
    backTo: "Head back to",
    home: "the home page",
    switcher: ", or pick a country from the switcher in the header.",
  },
};

export default COPY;
