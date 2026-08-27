/* The contact page, transcribed from the live iwan.community/contact-us page.

   The details themselves are NOT repeated here — `brand.js` already holds the
   email, phone and address, and two copies would be two things to keep right.

   The new site submits this form to the Worker, which verifies Turnstile and
   delivers it through Resend. */
export const CONTACT = {
  eyebrow: "Contact",
  heading: "Get in",
  mark: "touch",
  body: "You may contact us using the details below, or feel free to drop us your query.",

  emailLabel: "Email",
  phoneLabel: "Phone",
  addressLabel: "Visit",

  form: {
    heading: "Drop us a query",
    nameLabel: "Your name",
    namePlaceholder: "First and last",
    emailLabel: "Your email",
    emailPlaceholder: "you@email.com",
    subjectLabel: "Subject",
    subjectPlaceholder: "What is this about?",
    messageLabel: "Your message",
    messageOptional: "optional",
    messagePlaceholder: "Tell us a little more",
    submit: "Send message",
    submitting: "Sending…",
    submitError: "We could not send your message right now. Please try again.",
    note: "Your message is sent securely to the Iwan team.",
    doneHeading: "Thank you{name}",
    doneBody: "Your message has been sent. We'll come back to you soon.",
  },

  panelHeading: "Talk to us",
  panelBody:
    "However you get in touch, someone reads it. If it is easier to just turn up, the address is below.",
  followLabel: "Follow along",
};

export default CONTACT;
