import { useScrollAnimations } from "../../hooks/useGsap.js";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer.jsx";
import ContactCta from "../../components/ContactCta/ContactCta.jsx";
import { useCopy, usePodcast } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
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

      <section className="py-12">
        <div className={CONTAINER}>
          {/* the show itself: cover, name, and what it is */}
          <div className="reveal flex items-center gap-8 rounded-2xl border border-line bg-white p-7 max-phone:flex-col max-phone:items-start max-phone:gap-5">
            {/* contain, not cover: the artwork is a wide logo, and a square
                crop cuts the wordmark in half */}
            {show.cover && (
              <span className="grid h-[128px] w-[190px] flex-none place-items-center rounded-xl bg-mist px-5 max-phone:h-[104px] max-phone:w-[156px]">
                <img
                  src={show.cover}
                  alt=""
                  className="max-h-full w-full object-contain"
                />
              </span>
            )}
            <div className="min-w-0">
              <h2 className="mb-2 text-[24px] font-black uppercase leading-[1.15] tracking-[-0.01em]">
                {show.title}
              </h2>
              <p className="max-w-[58ch] text-[16px] leading-[26px] text-muted">
                {show.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16" id="episodes">
        <div className={CONTAINER}>
          <h2 className="reveal mb-6 text-[13px] font-extrabold uppercase tracking-[0.14em] text-primary">
            {copy.episodesHeading}
          </h2>

          {episodes.length === 0 ? (
            <p className="rounded-lg border border-line bg-white p-8 text-[16px] text-muted">
              {copy.empty}
            </p>
          ) : (
            <div className="flex flex-col gap-5" data-stagger>
              {episodes.map((ep, i) => (
                <AudioPlayer
                  key={ep.id}
                  className="reveal"
                  src={ep.audio}
                  cover={ep.cover ?? show.cover}
                  eyebrow={fill(copy.episode, { n: String(i + 1).padStart(2, "0") })}
                  title={ep.title}
                  author={ep.author}
                  length={ep.length}
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
