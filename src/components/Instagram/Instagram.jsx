import { useCopy, useInstagram } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B } from "../../lib/type.js";
import SocialPanel, { BODY_H } from "../SocialPanel/SocialPanel.jsx";
import FacebookFeed from "../FacebookFeed/FacebookFeed.jsx";

/* The "follow along" band: the two accounts, embedded live, side by side.

   Both are the providers' own keyless embeds, so there is no token in the
   bundle and no feed to keep in step — what the accounts post is what shows.
   The cost is that neither can be restyled from here: they are cross-origin
   documents, and only their outer chrome can be cropped. See FacebookFeed.

   Instagram's profile embed draws its own header (avatar, name, follower and
   post counts) and it is left alone — unlike Facebook's, it does not repeat
   what the panel header above it already says.

   ⚠ The account is the ACTIVE COUNTRY'S, both here and in the panel link:
   `username` comes from content, so /ca/ embeds Canada's account without this
   component knowing there is more than one. */

export default function Instagram() {
  const { username, url } = useInstagram();
  const copy = useCopy().instagram;
  const social = useCopy().social;
  if (!username) return null;

  return (
    <section className="bg-mist py-[4.5rem]" id="instagram">
      <div className="mx-auto w-full max-w-container px-6">
        <div className="mb-9">
          <h2 className={cx(KICKER, "reveal !mb-2")}>
            {copy.heading} <span className={MARK_B}>{copy.mark}</span>
          </h2>
          <p className="reveal text-[17px] leading-[1.7] text-muted">{copy.body}</p>
        </div>

        {/* Wraps to a single column below ~1000px, where two 468px panels and
            the gap stop fitting. ⚠ Centred, which also centres the SINGLE
            panel a country renders when it has no Facebook page with posts
            behind it — India today. That is deliberate: the panels are
            centred as a group, not aligned to the heading above them. */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-10">
          <SocialPanel icon="instagram" label={copy.label} href={url} cta={social.cta}>
            <iframe
              title={copy.frameTitle}
              src={`https://www.instagram.com/${username}/embed`}
              height={BODY_H}
              loading="lazy"
              className="block w-full border-0"
              scrolling="no"
              frameBorder="0"
            />
          </SocialPanel>

          <FacebookFeed />
        </div>
      </div>
    </section>
  );
}
