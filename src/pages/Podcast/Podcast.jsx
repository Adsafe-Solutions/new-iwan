import { useScrollAnimations } from "../../hooks/useGsap.js";
import PodcastCard from "../../components/PodcastCard/PodcastCard.jsx";
import ContactCta from "../../components/ContactCta/ContactCta.jsx";
import { useCopy, usePodcast, useTotals } from "../../content/ContentProvider.jsx";
import { useCms } from "../../hooks/useCms.js";
import { CMS_ENABLED } from "../../content/cms.js";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination.jsx";

const PER_PAGE = 12;
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B } from "../../lib/type.js";

const CONTAINER = "mx-auto w-full max-w-container px-6";

export default function PodcastPage() {
  const show = usePodcast();
  const totals = useTotals();

  /* ⚠ The bootstrap carries only the first page of episodes. Reading it alone
     silently truncated this list the moment a seventh episode existed. */
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number(params.get("page")) || 1);

  const local =
    page === 1
      ? {
          items: show.episodes ?? [],
          total: totals?.episodes ?? (show.episodes ?? []).length,
        }
      : null;

  const { data, loading, ready } = useCms(`/api/podcast?page=${page}&limit=${PER_PAGE}`, {
    enabled: CMS_ENABLED,
    initial: local,
  });

  const result = data ?? local;
  const count = result?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(count / PER_PAGE));
  const copy = useCopy().podcastPage;
  useScrollAnimations(ready);

  const episodes = result?.items ?? result?.episodes ?? [];

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

          {loading && episodes.length === 0 ? null : episodes.length === 0 ? (
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
                  /* ⚠ The EPISODE's own cover only. Falling back to the show's
                     here painted the same Podbean artwork on every card, and
                     the card's own fallback — the programme mark — was never
                     reached. The show art already has its band above. */
                  cover={ep.cover}
                  index={i}
                />
              ))}
            </div>
          )}

          <Pagination
            page={Math.min(page, totalPages)}
            total={totalPages}
            onChange={(n) => {
              const q = new URLSearchParams(params);
              if (n <= 1) q.delete("page");
              else q.set("page", String(n));
              setParams(q);
            }}
            className="mt-10 justify-center"
          />
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
