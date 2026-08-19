import { remove } from "../ops.js";

/* Canada runs three programmes — Youth, Kids and Men. Women comes out of the
   nav (which is also where the routes and the homepage tiles come from), out
   of the hero rotation, and out of the programme content.

   `remove(key, value)` edits base's list in place of restating it, so a tile
   or an intro changed upstream still reaches Canada. `null` deletes a key from
   an object (see ../merge.js) — the route is already gone with the nav entry,
   but leaving unreachable content behind would make `programmes.content` a
   liar about what Canada runs. */
export default {
  nav: { pages: remove("path", "/iwan-women") },
  programmes: { content: { "iwan-women": null } },
  hero: {
    logos: remove("id", "women"),
    programmeMarks: remove("id", "women"),
  },
  copy: { trustedBy: { eyebrow: "One community, three programmes" } },
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
     programmes.contact   · phone + address on the programme pages
     programmes.content   · the three entries' copy, if Canada's differs
     testimonials         · ⚠ real quotes from real people — never invent these
*/
