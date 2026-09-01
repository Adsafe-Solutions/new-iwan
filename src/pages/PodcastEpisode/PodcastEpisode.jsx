import { Link, useParams } from "react-router-dom";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer.jsx";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer.jsx";
import ContactCta from "../../components/ContactCta/ContactCta.jsx";
import { useCopy, usePodcast } from "../../content/ContentProvider.jsx";
import { useCms } from "../../hooks/useCms.js";
import { CMS_ENABLED } from "../../content/cms.js";
import { fill } from "../../lib/fill.js";
import { cx } from "../../lib/cx.js";
import { KICKER } from "../../lib/type.js";

const CONTAINER = "mx-auto w-full max-w-container px-6";

/* /podcast/:slug — one episode's own page. `episodes` is the same list the
   listing reads, matched by `id`, so the two can never disagree about what
   exists.

   The shape — a tag-style episode marker, a big title, a byline, then
   straight into listening, with the show's own write-up flowing as plain
   text underneath rather than boxed off — is closer to how a real podcast
   site (thinkingmuslim.com's episode pages) reads than the card-in-a-card
   treatment this had before. It stays honest about what Iwan's podcast
   actually has: no per-episode synopsis, guest or transcript exists to
   transcribe, only the show's own description and the audio itself. */
export default function PodcastEpisode() {
  const { slug } = useParams();
  const show = usePodcast();
  const listCopy = useCopy().podcastPage;
  const copy = useCopy().podcastEpisode;

  /* ⚠ Fetched by slug rather than looked up in the bootstrap. The bootstrap
     holds only the first page of episodes, so finding it in that list meant
     every episode past the sixth rendered "not found" for a URL that is real
     and shareable — the worst way to fail, because it reads as the episode
     never having existed. */
  const { data, loading, ready } = useCms(`/api/podcast/${slug}`, {
    enabled: CMS_ENABLED,
  });

  const episodes = show.episodes ?? [];
  const index = episodes.findIndex((ep) => ep.id === slug);

  const episode = data ?? (index === -1 ? null : episodes[index]);

  useScrollAnimations(ready);

  if (!episode && loading) {
    return (
      <main className="grid min-h-[60vh] place-items-center">
        <p className="text-[15px] text-muted">{copy.back}…</p>
      </main>
    );
  }

  /* An episode a country doesn't carry (or a stale link) still has a
     shareable URL, so a miss is a normal state rather than an error — same
     treatment as a missing blog post or event. */
  if (!episode) {
    return (
      <main className="pb-20 pt-24">
        <div className="mx-auto w-full max-w-[760px] px-6">
          <h1 className="mb-[1.2rem] text-[clamp(2.2rem,5vw,56px)] font-extrabold leading-[1.12] tracking-[-0.01em]">
            {copy.notFound}
          </h1>
          <p className="mb-8 text-[20px] leading-8 text-muted">{copy.notFoundBody}</p>
          <Link to="/podcast" className="font-bold text-primary underline">
            {copy.back}
          </Link>
        </div>
      </main>
    );
  }

  /* ⚠ Both of these are read from the bootstrap's first page, which is the only
     list this page has. An episode beyond it still renders correctly — it was
     fetched by slug — but has no neighbour to offer and no position to print,
     so each is simply left out rather than guessed at. */
  const next = index === -1 ? null : episodes[index + 1];

  return (
    <main>
      <section className="pb-10 pt-[clamp(2.25rem,5vw,3.25rem)]">
        <div className={cx(CONTAINER, "mx-auto max-w-[820px]")}>
          <Link
            to="/podcast"
            className="mb-6 inline-flex items-center gap-2 text-[14px] font-bold text-primary transition-opacity duration-200 hover:opacity-70"
          >
            <IconArrowLeft className="h-4 w-4" stroke={2} aria-hidden="true" />
            {copy.back}
          </Link>

          <div className="reveal mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-block rounded-full bg-primary/[0.08] px-3 py-1 text-[12px] font-extrabold uppercase tracking-[0.14em] text-primary">
              {index === -1
                ? listCopy.episodesHeading
                : fill(listCopy.episode, { n: String(index + 1).padStart(2, "0") })}
            </span>
            {episode.author && (
              <span className="text-[13px] font-semibold text-muted">
                {fill(listCopy.by, { author: episode.author })}
              </span>
            )}
          </div>

          <h1 className={cx(KICKER, "reveal !mb-0 !text-[clamp(2rem,5vw,52px)]")}>
            {episode.title}
          </h1>
        </div>
      </section>

      <section className="pb-12">
        <div className={cx(CONTAINER, "mx-auto max-w-[820px]")}>
          {/* An episode carries a video URL, an audio one, or both — the CMS
              requires at least one. Video wins when both are set, being the
              richer of the two. ⚠ Neither renders a player at all rather than
              an empty one: the payload drops empty fields, so an episode
              published before this existed arrives with no media key. */}
          {episode.video ? (
            <VideoPlayer
              className="reveal"
              src={episode.video}
              title={episode.title}
              author={episode.author}
            />
          ) : episode.audio ? (
            <AudioPlayer
              className="reveal"
              src={episode.audio}
              cover={episode.cover ?? show.cover}
              title={episode.title}
              author={episode.author}
              length={episode.length}
            />
          ) : null}

          {/* the show's own write-up, flowing as plain text — real,
              show-level copy. Nothing episode-specific is invented: the live
              page carries no per-episode synopsis, guest info or transcript
              to transcribe. */}
          {show.description && (
            <div className="reveal mt-10 max-w-[68ch]">
              <h2 className="mb-3 text-[13px] font-extrabold uppercase tracking-[0.14em] text-primary">
                {copy.aboutShow}
              </h2>
              <p className="text-[16px] leading-[27px] text-ink-2">{show.description}</p>
            </div>
          )}

          {next && (
            <Link
              to={`/podcast/${next.id}`}
              className={cx(
                "reveal group mt-10 flex items-center justify-between gap-4 rounded-2xl",
                "border border-line bg-white p-7 transition-[border-color,box-shadow,transform] duration-[250ms]",
                "hover:-translate-y-1 hover:border-primary hover:shadow-ecard"
              )}
            >
              <div className="min-w-0">
                <p className="mb-1.5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-primary">
                  {copy.nextHeading}
                </p>
                <p className="truncate text-[18px] font-bold leading-[1.3]">
                  {next.title}
                </p>
              </div>
              <IconArrowRight
                className="h-5 w-5 flex-none text-primary transition-transform duration-200 group-hover:translate-x-1"
                stroke={2}
                aria-hidden="true"
              />
            </Link>
          )}
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
