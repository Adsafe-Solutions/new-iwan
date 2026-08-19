/* The contact page, transcribed from the live iwan.community/contact-us page.

   The details themselves are NOT repeated here — `brand.js` already holds the
   email, phone and address, and two copies would be two things to keep right.

   ⚠ The live form is Contact Form 7. Its REST endpoint cannot be called from
   this site: `access-control-allow-origin` is set to another domain entirely,
   and it also wants a page-specific `_wpcf7_unit_tag`, a session `_wpnonce`
   and an hCaptcha token. `lib/contact.js` is the seam to swap when there is an
   endpoint that will take our request. */
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
    /* ⚠ says what actually happens — the button opens a pre-filled email
       rather than posting anywhere, and should stop saying so once it does */
    note: "This opens a pre-filled email in your own mail app.",
    doneHeading: "Over to you{name}",
    doneBody: "We've opened a pre-filled email — send it and we'll come back to you.",
  },

  panelHeading: "Talk to us",
  panelBody:
    "However you get in touch, someone reads it. If it is easier to just turn up, the address is below.",
  followLabel: "Follow along",
};

export default CONTACT;
