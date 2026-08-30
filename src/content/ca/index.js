/* Canada runs all four programmes in nav, but only Men has real Canadian
   content today — Kids, Women and Youth stay in the nav (so the tile,
   the route and the homepage link all still exist) with their
   `programmes.content` entry nulled. That makes `Programme` render nothing,
   so App.jsx's routing falls through to the `Placeholder` stub instead — the
   same "this page is coming soon" treatment every other unbuilt page gets,
   using each programme's own nav intro rather than India's Bangalore-specific
   copy. See ../ops.js for `null`-deletes-a-key. */
export default {
  programmes: {
    content: { "iwan-kids": null, "iwan-women": null, "iwan-youth": null },
  },
};

/* ⚠ Everything else is still inherited from India — the Bangalore address, the
   +91 WhatsApp number, the "started in Bangalore in 2020" story.

   Events are the exception: they live in one list in base/events.js and carry
   their own `country`, so Canada shows only the ones tagged for it rather than
   inheriting India's.

   Nothing above has been invented; these are the keys that need real Canadian
   values before this country is shown publicly:

     brand.address        · the map fallback in the event modal reads this
     brand.whatsapp       · digits only, country code first
     brand.email          · if it differs
     programmes.contact   · phone + address on Men's programme page
     programmes.content   · Men's copy, if Canada's differs; Kids, Women and
                             Youth stay "coming soon" until there is real content
     testimonials         · ⚠ real quotes from real people — never invent these
*/
