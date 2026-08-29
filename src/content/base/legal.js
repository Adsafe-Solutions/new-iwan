export const LEGAL_DETAILS = {
  contactEmail: "[privacy@iwan.community]",
  postalAddress: "[Iwan's registered postal address]",
  governingLaw: "[India]",
};

export const LEGAL = {
  privacy: {
    title: "Privacy policy",
    updated: "2026-08-29",
    intro:
      "This explains what we collect when you use this site, why we hold it, and how to get it removed. It covers iwan.community and the forms on it.",
    sections: [
      {
        heading: "What we collect, and when",
        body: "We only hold what you type into a form. Nothing is gathered in the background — there is no advertising network, no analytics profile and no third-party tracker on this site.",
        list: [
          "Newsletter — your email address.",
          "Contact form — your name, email address, subject, message and, if you give it, your mobile number.",
          "Event registration — the answers to that event's own questions, which typically include your name and email, plus anything the organiser asks such as dietary requirements.",
          "Volunteer and career forms — the answers to the questions shown on those pages, which include your name, email and mobile number.",
          "Whether you ticked the box asking to hear from us, and which country's version of the site you used.",
        ],
      },
      {
        heading: "One record per person",
        body: "If you get in touch more than once we add to the same record rather than creating a new one, so we are not holding several half-copies of you. A later form can fill in a detail we do not have, but it never overwrites one you gave us before.",
      },
      {
        heading: "Why we hold it",
        body: "To reply to you, to organise the sessions you signed up for, and — only if you asked — to tell you about what is coming up. We do not sell it, rent it, or share it for anyone else's marketing.",
      },
      {
        heading: "Who else sees it",
        body: "As few people and services as possible:",
        list: [
          "Iwan team members with a CMS account, which is how we read what you sent.",
          "MongoDB Atlas, where the records are stored.",
          "Resend, which delivers the confirmation email after you register for an event. It sees your email address and the contents of that message.",
          "Cloudflare, which serves this site and runs the anti-spam check on the forms.",
        ],
      },
      {
        heading: "How long we keep it",
        body: "For as long as you are in touch with Iwan, and after that until you ask us to remove it. We have not set a fixed expiry, so if you want your details gone, tell us and we will delete them rather than wait for one.",
      },
      {
        heading: "Your choices",
        body: "You can ask us to show you what we hold, correct it, stop emailing you, or delete it entirely. There is no form for this — email us and a person will do it.",
      },
      {
        heading: "Children",
        body: "Some of our programmes are for children, and a parent or guardian should be the one filling in a form on their behalf. If you believe a child has given us their details without that, tell us and we will remove them.",
      },
      {
        heading: "Changes",
        body: "If we start collecting something new, we will say so here before we do.",
      },
    ],
  },

  terms: {
    title: "Terms of service",
    updated: "2026-08-29",
    intro:
      "The terms you accept by using this site and by signing up to what we run. They are short on purpose — we are a community organisation, not a shop.",
    sections: [
      {
        heading: "Who we are",
        body: "Iwan is a Muslim community organisation founded in Bangalore in 2020. We run classes, workshops, mentoring and volunteering. This site describes that work and lets you take part in it.",
      },
      {
        heading: "Using this site",
        body: "You are welcome to read, share and link to anything here. Please do not use the forms to send anything unlawful, abusive or deliberately false, and please do not try to disrupt the site or the people using it.",
      },
      {
        heading: "Signing up for a programme",
        body: "Registering tells us to expect you. It is not a contract, and there is nothing to pay unless a particular event says otherwise.",
        list: [
          "Places are limited on some events, and an event can fill up between you opening the page and submitting the form.",
          "We may have to change or cancel a session. We will tell whoever registered.",
          "If you cannot make it, reply to your confirmation email so we can offer your place to someone else.",
          "Programmes for children are the responsibility of a parent or guardian, who should be the one registering.",
        ],
      },
      {
        heading: "Volunteering and applying to work with us",
        body: "Sending your details is an expression of interest, not an offer or an application to a specific vacancy. We keep what you send so we can come back to you, and we will not always be able to.",
      },
      {
        heading: "Accuracy",
        body: "We keep the times, dates and descriptions here as accurate as we can, but details do change. Where something on this site disagrees with what an organiser tells you directly, the organiser is right.",
      },
      {
        heading: "Other people's material",
        body: "Photographs and words on this site belong to Iwan or to the people who made them, and are here to describe our work. Please ask before reusing them elsewhere.",
      },
      {
        heading: "Getting in touch",
        body: "If something here is unclear, or you think we have made a mistake, tell us. We would rather fix it than argue about it.",
      },
    ],
  },
};

export default LEGAL;
