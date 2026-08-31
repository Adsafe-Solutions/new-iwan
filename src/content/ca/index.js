/* Canada runs all four programmes in nav, but only Men has real Canadian
   content today — Kids, Women and Youth stay in the nav (so the tile,
   the route and the homepage link all still exist) with their
   `programmes.content` entry nulled. That makes `Programme` render nothing,
   so App.jsx's routing falls through to the `Placeholder` stub instead — the
   same "this page is coming soon" treatment every other unbuilt page gets,
   using each programme's own nav intro rather than India's Bangalore-specific
   copy. See ../ops.js for `null`-deletes-a-key. */
export default {
  /* Canada's own number and address. All three are overridden together: the
     digits feed wa.me and tel:, `phone` is what is printed, and every surface
     that shows either — the contact page, the programme "talk to us" panel,
     the WhatsApp button, the event modal's map fallback — reads them off
     brand, so this block is the whole change. */
  brand: {
    whatsapp: "12896254455",
    phone: "+1 (289) 625-4455",
    address: "1418-1423 Mississauga Vly Blvd, Mississauga, ON L5A 4A5",
  },

  programmes: {
    content: { "iwan-kids": null, "iwan-women": null, "iwan-youth": null },
  },
};

/* ⚠ Everything else is still inherited from India — the "started in Bangalore
   in 2020" story included.

   Events, blogs, podcast and promo are the exception: nothing in content/base
   carries them, so Canada gets whatever the CMS publishes for `ca` and nothing
   else — there is no India content to inherit or override.

   Nothing above has been invented; these are the keys that need real Canadian
   values before this country is shown publicly:

     brand.email          · if it differs
     programmes.content   · Men's copy, if Canada's differs; Kids, Women and
                             Youth stay "coming soon" until there is real content
     testimonials         · ⚠ real quotes from real people — never invent these
*/
