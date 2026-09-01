const shared = {
  /* The number without its country code — that is the select beside it. */
  subscribeLabel: "Keep me posted about Iwan events and news",
  sending: "Sending…",
  /* Shown when an editor has no form live for this country. */
  closedHeading: "Not right now",
  closedBody:
    "We are not taking applications through this page at the moment. Do get in touch and we will let you know when that changes.",
};

export const APPLY = {
  volunteer: {
    ...shared,
    eyebrow: "Volunteer",
    heading: "Give some time to",
    mark: "Iwan",
    intro:
      "Our programmes run on people who turn up. Tell us a little about yourself and what you would enjoy helping with, and we will be in touch about what is coming up.",
    formHeading: "Tell us about you",
    submit: "Send my details",
    doneHeading: "Thank you",
    doneBody:
      "We have your details. Someone will be in touch when something suits what you are up for.",
  },

  career: {
    ...shared,
    eyebrow: "Work with us",
    heading: "Build something with",
    mark: "Iwan",
    intro:
      "We are a small team and we are always glad to hear from people who want to work with us. Tell us what you do and what you are looking for.",
    formHeading: "Tell us about you",
    /* ⚠ No CV upload — there is no file store behind the CMS, and the form
       asks for a link instead. */
    submit: "Send my details",
    doneHeading: "Thank you",
    doneBody: "We have your details and will come back to you if there is a fit.",
  },
};

const sharedFields = [
  { key: "name", type: "name", label: "Your name", required: true },
  { key: "email", type: "email", label: "Your email", required: true },
  {
    key: "mobile",
    type: "phone",
    label: "Mobile",
    required: true,
    placeholder: "90000 00000",
  },
];

export const APPLY_FALLBACK_FIELDS = {
  volunteer: [
    ...sharedFields,
    {
      key: "role",
      type: "text",
      label: "What would you like to help with",
      placeholder: "Mentoring, food drives, events…",
    },
    {
      key: "availability",
      type: "text",
      label: "When you are free",
      placeholder: "Weekends, weekday evenings…",
    },
    {
      key: "about",
      type: "textarea",
      label: "A little about you",
      required: true,
      placeholder: "What you enjoy, anything you have done before.",
    },
  ],

  career: [
    ...sharedFields,
    {
      key: "role",
      type: "text",
      label: "Role you are interested in",
      required: true,
      placeholder: "Programme coordinator, designer…",
    },
    {
      key: "experience",
      type: "text",
      label: "Years of experience",
      placeholder: "3 years",
    },
    {
      key: "portfolio",
      type: "text",
      label: "Portfolio or profile",
      placeholder: "https://",
    },
    {
      key: "about",
      type: "textarea",
      label: "About your experience",
      required: true,
      placeholder: "What you have worked on, and what you are looking for next.",
    },
  ],
};

export default APPLY;
