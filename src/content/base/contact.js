/* The contact page, transcribed from the live iwan.community/contact-us page.

   The details themselves are NOT repeated here — `brand.js` already holds the
   email, phone and address, and two copies would be two things to keep right.

   The form posts to the CMS API's /api/contact — see lib/forms.js. It used to
   open a pre-filled email instead, because the live site's Contact Form 7
   endpoint cannot be called from another origin. */
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
    mobileLabel: "Mobile",
    mobileOptional: "optional",
    /* ⚠ No country code — that is the select beside this box now, and
       repeating it here reads as somewhere to type it a second time. */
    mobilePlaceholder: "90000 00000",
    subjectLabel: "Subject",
    subjectPlaceholder: "What is this about?",
    messageLabel: "Your message",
    messageOptional: "optional",
    messagePlaceholder: "Tell us a little more",
    subscribeLabel: "Subscribe to newsletter",
    submit: "Send message",
    note: "We usually reply within a couple of days.",
    sending: "Sending…",
    failed: "That did not go through. Please check the form and try again.",
    doneHeading: "Thank you{name}",
    doneBody: "We have your message and someone will come back to you.",
  },

  panelHeading: "Talk to us",
  panelBody:
    "However you get in touch, someone reads it. If it is easier to just turn up, the address is below.",
  followLabel: "Follow along",
};

export default CONTACT;
