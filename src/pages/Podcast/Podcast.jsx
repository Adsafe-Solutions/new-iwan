import { useScrollAnimations } from "../../hooks/useGsap.js";
import PodcastCard from "../../components/PodcastCard/PodcastCard.jsx";
import ContactCta from "../../components/ContactCta/ContactCta.jsx";
import { useCopy, usePodcast } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B } from "../../lib/type.js";

const CONTAINER = "mx-auto w-full max-w-container px-6";

export default function PodcastPage() {
  const show = usePodcast();
  const copy = useCopy().podcastPage;
  useScrollAnimations();

  const episodes = show.episodes ?? [];

  return (
    <main>
      <section className="bg-mist pb-10 pt-[clamp(2.25rem,5vw,3.25rem)]">
        <div className={CONTAINER}>
          <p className="reveal mb-3 text-[12px] font-bold uppercase leading-4 tracking-[0.16em] text-primary">
            {copy.eyebrow}
          </p>
          <h1 className={cx(KICKER, "reveal !mb-4 !text-[clamp(1.9rem,4vw,44px)]")}>
            {copy.heading} <span className={MARK_B}>{copy.mark}</span>
          </h1>
          <p className="reveal max-w-[62ch] text-[17px] leading-[27px] text-muted">
            {copy.body}
          </p>
        </div>
      </section>

      <section className="py-12" id="episodes">
        <div className={CONTAINER}>
          <h2 className="reveal mb-6 text-[13px] font-extrabold uppercase tracking-[0.14em] text-primary">
            {copy.episodesHeading}
          </h2>

          {episodes.length === 0 ? (
            <p className="rounded-lg border border-line bg-white p-8 text-[16px] text-muted">
              {copy.empty}
            </p>
          ) : (
            <div
              className="grid grid-cols-3 gap-5 max-nav:grid-cols-2 max-phone:grid-cols-1"
              data-stagger
            >
              {episodes.map((ep, i) => (
                <PodcastCard
                  key={ep.id}
                  className="reveal"
                  episode={ep}
                  cover={ep.cover ?? show.cover}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
