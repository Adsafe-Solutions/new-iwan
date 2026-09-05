/* =========================================================
   The Facebook panel beside the Instagram one, in the
   "follow along" band on the homepage.

   ⚠ `page` is null here ON PURPOSE, so the base country renders NO Facebook
   panel. The Page exists — facebook.com/the.iwan.community, "Iwan Community
   India" — but it has no posts the Page Plugin can show, and the plugin's
   empty state is a spinner strip over a grey card, which is worse than not
   offering the panel at all. It is the same rule the rest of the site
   follows: a country with no events renders no events section rather than a
   heading over an empty calendar.

   Turning it on once the Page posts is this one line:
       export const FACEBOOK_PAGE = "https://www.facebook.com/the.iwan.community";

   ⚠ It must be the CANONICAL page URL, not a share link. The plugin resolves
   `href` server-side and renders nothing for a facebook.com/share/… redirect —
   see content/ca/index.js, which keeps both because brand.socials is happy
   with the share link.
========================================================= */
export const FACEBOOK_PAGE = null;

export default FACEBOOK_PAGE;
