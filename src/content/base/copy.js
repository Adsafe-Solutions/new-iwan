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
    kicker: "Believe · Act · Serve Thrive",
    body: "Iwan is a community hub in Bangalore classes, workshops, mentoring and volunteering, built around faith, good character and the kind of friendship that outlasts the session. Everyone is welcome.",
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
    headingLines: ["Reviving Muslim Identity,", { mark: "one step at a time" }],
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

  /* the eight tracks themselves are in ways.js — they name real activities */
  waysToConnect: {
    heading: "Ways to",
    mark: "connect",
    body: "Whatever is on this week belongs to one of these. Some are a room you sit in, some are a project you take on pick the one that sounds like you.",
  },

  programmeDeck: {
    heading: "There’s a room here",
    mark: "for you",
    body: "Every programme is its own community the same values, a different room. Start with the one that sounds like you.",
    cta: "Explore {label}",
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
    hint: "Highlighted days have events select one to filter.",
    clearFilter: "Clear filter",
    /* the chip on an event that is not tied to one programme */
    community: "Open to all",
    /* The pill on an event whose date has passed — see EventCard. */
    ended: "Ended",
    filterLabel: "Filter by programme",
    allProgrammes: "All programmes",
    seeAll: "See all events",
  },

  /* /podcast — the listing. Each card links through to /podcast/:id, where
     podcastEpisode below takes over; the list itself no longer embeds a
     player, so the page loads without pulling any episode's audio. */
  podcastPage: {
    eyebrow: "Listen",
    heading: "Conversations from",
    mark: "the community",
    body: "Shared stories, insights and discussions from the people who turn up. New episodes land here as they are recorded.",
    episodesHeading: "Episodes",
    episode: "Episode {n}",
    by: "by {author}",
    play: "Play episode",
    pause: "Pause episode",
    seek: "Seek within the episode",
    empty: "Nothing published yet. Check back soon.",
    listen: "Listen to this episode",
    more: "Listen to {title}",
  },

  /* /podcast/:id — one episode's own page. */
  podcastEpisode: {
    back: "All episodes",
    related: "More like this",
    aboutShow: "About the show",
    notFound: "We can’t find that episode",
    notFoundBody: "It may have moved, or the link may be wrong.",
  },

  /* the closing "get in touch" band — About and every blog post carry it */
  contactCta: {
    eyebrow: "Get in touch",
    heading: "We'd love to hear",
    mark: "from you",
    body: "A question, an idea, or you just want to know when the next session is write to us and someone will answer.",
    cta: "Contact us",
  },

  /* /careers-and-volunteering. There is still no jobs board; what there is now
     is a way to put your name forward, which is what `applyHeading` below
     points at. */
  careers: {
    eyebrow: "Careers & volunteering",
    heading: "Iwan runs on the people who",
    mark: "show up for it.",
    body: "Every class, workshop and gathering happens because someone gave their time and skills to it. If you want to be one of them, this is where to start.",
    stepsHeading: "How it works",
    stepsSubtitle: "There's no waiting list send us your details and we'll talk.",
    steps: [
      {
        title: "Reach out",
        body: "Tell us a little about yourself and what you'd like to help with.",
      },
      {
        title: "Have a conversation",
        body: "We'll talk through where your time and skills could fit best.",
      },
      {
        title: "Get matched",
        body: "We'll connect you with the programme that suits you.",
      },
      {
        title: "Start volunteering",
        body: "Join the next class, workshop or event and get stuck in.",
      },
    ],
    waysEyebrow: "Where you can help",
    waysBody:
      "Every programme runs on volunteers pick the one that fits your time and skills, or talk to us if you're not sure.",
    waysCta: "See the programme",
    openRolesHeading: "Open roles",
    openRolesBody:
      "There's nothing listed here right now. Send us your details anyway and we'll be in touch when something opens up.",
    applyVolunteer: "Volunteer with us",
    applyVolunteerBody: "Tell us what you'd enjoy helping with and when you're free.",
    applyCareer: "Work with us",
    applyCareerBody: "Tell us what you do and what you're looking for next.",
  },

  /* /volunteer and /careers. ⚠ ONLY the furniture — every word a visitor
     reads on those pages (heading, intro, button label, thank-you) comes from
     whichever form an editor has made live in the CMS. These are the things
     the CMS has no field for: what the page says when no form is live, and
     the two labels the button needs while it is working. */
  apply: {
    closedHeading: "Not right now",
    closedBody:
      "We are not taking applications through this page at the moment. Do get in touch and we will let you know when that changes.",
    sending: "Sending…",
    /* Only used when an editor left the CMS's own submit label empty — a
       button with no words on it is broken, not honest. */
    submit: "Send my details",
  },

  /* The prev/next cards at the foot of a blog post or podcast episode. */
  detailNav: {
    prev: "Previous",
    next: "Up next",
  },

  /* The corner share button on detail pages — it replaces the WhatsApp chat
     button there, so the tray needs its own words. */
  share: {
    open: "Share this page",
    whatsapp: "Share on WhatsApp",
    facebook: "Share on Facebook",
    x: "Share on X",
    linkedin: "Share on LinkedIn",
    telegram: "Share on Telegram",
    copy: "Copy link",
    copied: "Link copied",
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
    related: "More like this",
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
    registerHeading: "Save your spot",
    programmeLink: "More about {programme}",
    notFound: "We can’t find that event",
    notFoundBody: "It may have finished, or the link may be wrong.",
  },

  testimonials: {
    heading: "In their",
    mark: "own words",
    body: "Members on the sessions they have been to gardening, Taekwondo, first aid, entrepreneurship, and whatever is on next.",
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

  /* The homepage accordion, closing the page on the questions people
     arrive with. Nothing here states a fee, a schedule or a headcount —
     only what the rest of the site already says. */
  faq: {
    eyebrow: "✦ Before you come",
    heading: "Frequently asked",
    mark: "questions",
    body: "The things people ask before their first session. Anything else, just write to us.",
    items: [
      [
        "Who is Iwan for?",
        "Anyone who wants to be part of it. Iwan runs four programmes Men, Women, Youth and Kids and between them they cover most ages and stages. You do not need to be invited, introduced or already know somebody there.",
      ],
      [
        "Do I have to be a member to come to something?",
        "No. Sessions and events are open, and most people start by turning up to one thing that caught their eye rather than by signing up to anything.",
      ],
      [
        "How do I join a session or an event?",
        "Everything coming up is on the events page, and each one has its own registration form with whatever that particular session needs to know. Register there and you are on the list.",
      ],
      [
        "What actually happens at a session?",
        "It depends on the programme classes, workshops, mentoring and volunteering, from Taekwondo and gardening to first aid, Web 3.0 and entrepreneurship. The blogs and the Instagram wall are the honest picture of what a session looks like.",
      ],
      [
        "Can I volunteer or help run things?",
        "Yes, and that is how a lot of Iwan gets done. The careers and volunteering page lists what is open; if nothing fits, tell us what you would like to do.",
      ],
      [
        "How do I get in touch?",
        "Use the contact page and the message reaches us directly. WhatsApp works too, and we are on Instagram, X, YouTube and Facebook.",
      ],
    ],
  },

  eventModal: {
    runsHeading: "How the day runs",
    whereLabel: "Where",
    mapTitle: "Map showing {venue}",
    directions: "Get directions",
    register: "Register",
    /* Which one shows follows the event's own `admission` field. */
    free: "Free to attend · everyone welcome",
    ticket: "Ticket to attend · everyone welcome",
    formHeading: "Save your spot",
    subscribeLabel: "Subscribe to newsletter",
    /* Default TICKED — the register button sends it beside the answers. */
    photoConsentLabel: "I'm happy to appear in photos and video from this event",
    /* Shown INSTEAD of the Register button when the event carries no questions
       or the CMS is switched off — see RegisterForm. */
    closed: "Registration is not open for this event.",
    /* Shown instead of the whole register flow once the date has passed. */
    ended: "This event has ended.",
    submit: "Confirm my spot",
    cancel: "Cancel",
    doneHeading: "You’re in{name}",
    doneBody: "Your spot at {title} on {date} is confirmed.",

    /* The registration form is built per event in the CMS, so the QUESTIONS
       are content and live there. What stays here is the furniture around
       them — the words the form itself says, whatever it asks. */
    required: "required",
    firstName: "First Name",
    lastName: "Last Name",
    choosePlaceholder: "Choose one",
    /* Fallback placeholders per question type, for when the editor left the
       CMS's own placeholder box empty — an empty input reads as broken. A
       placeholder set in the builder still wins. */
    emailPlaceholder: "you@email.com",
    phonePlaceholder: "98765 43210",
    numberPlaceholder: "Enter a number",
    datePlaceholder: "YYYY-MM-DD",
    answerPlaceholder: "Type your answer",
    sending: "Sending…",
    /* ⚠ Deliberately vague about the cause. The person filling this in cannot
       act on "the database refused it", and the specifics are in the field
       errors underneath when there are any. */
    failed: "That did not go through. Please check the form and try again.",
    offline: "We could not reach the server. Please try again in a moment.",
    full: "This event is full.",
    fixBelow: "Please check the highlighted answers.",
  },

  footer: {
    subscribeDone: "Thank you you are on the list.",
    blurb: "What's on, what we've been up to, and where you can lend a hand.",
    programmesHeading: "Programmes",
    follow: "Follow along",
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
    /* the hero CTA opens /events already filtered to this programme */
    cta: "Explore {programme} Events",
    sessionsCta: "See the sessions",
    /* the hero's second CTA on a programme with `work` but no `sessions` */
    workCta: "What you'd be doing",
    /* "What's on" read like an events listing, which this is not: these are
       the sessions a programme has actually run, not a calendar of what is
       coming. `work` next to it carries the shape of taking part. */
    sessionsHeading: "Sessions",
    sessionsMark: "so far",
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

  /* shown in place of the full Programme template for a programme this
     country doesn't run yet — see App.jsx's routing and content/ca/index.js */
  comingSoon: {
    badge: "Coming soon",
    heading: "is coming soon.",
    body: "{label} hasn't launched in this country yet {intro}",
    home: "See our other programmes",
    contact: "Get in touch",
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
