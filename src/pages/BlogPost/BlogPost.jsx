import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { IconArrowLeft, IconArrowUpRight } from "@tabler/icons-react";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import ContactCta from "../../components/ContactCta/ContactCta.jsx";
import ReadingProgress from "../../components/ReadingProgress/ReadingProgress.jsx";
import {
  useBlogs,
  useCopy,
  useCountry,
  useHero,
  useNav,
} from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { longDate, programmeOf } from "../../lib/events.js";
import { cx } from "../../lib/cx.js";
import { useCms } from "../../hooks/useCms.js";
import { CMS_ENABLED } from "../../content/cms.js";

const PROSE = "text-[17px] leading-[29px] text-ink-2";

export default function BlogPost() {
  const { slug } = useParams();
  const BLOGS = useBlogs();
  const copy = useCopy().blogPost;
  const blogs = useCopy().blogsPage;
  const [country] = useCountry();
  const { pages } = useNav();
  const { logos } = useHero();
  const article = useRef(null);

  /* ⚠ The post's `html` is NOT in the bootstrap — listings carry card fields
     only, which is what keeps the first payload bounded however many posts
     exist. The full record is fetched here, by the one route that renders it.

     With the CMS switched off there is nothing to fetch: the static files in
     content/base hold the whole post, blocks and all. */
  const { data, loading, ready } = useCms(`/api/blogs/${slug}`, {
    enabled: CMS_ENABLED,
  });

  const card = BLOGS.find((p) => p.id === slug) ?? null;

  /* The card first, then the full record on top of it. A post that was on the
     bootstrap's first page therefore paints its title, date and programme
     immediately and fills in the body when it arrives, instead of showing a
     blank page for a round trip. */
  const post = data ?? card;

  /* ⚠ Hands GSAP a reason to rescan once the body lands. Without it the
     article renders and stays at `opacity: 0` forever — this pass would have
     already run against a page that had no article in it. */
  useScrollAnimations(ready);

  if (!post && loading) {
    return (
      <main className="grid min-h-[60vh] place-items-center">
        <p className="text-[15px] text-muted">{copy.back}…</p>
      </main>
    );
  }

  /* A post that a country does not carry still has a shareable URL, so a
     missing one is a normal state rather than an error. */
  if (!post) {
    return (
      <main className="pb-20 pt-24">
        <div className="mx-auto w-full max-w-[760px] px-6">
          <h1 className="mb-[1.2rem] text-[clamp(2.2rem,5vw,56px)] font-extrabold leading-[1.12] tracking-[-0.01em]">
            {copy.notFound}
          </h1>
          <p className="mb-8 text-[20px] leading-8 text-muted">{copy.notFoundBody}</p>
          <Link to="/blogs" className="font-bold text-primary underline">
            {copy.back}
          </Link>
        </div>
      </main>
    );
  }

  const programme = programmeOf(post, pages);
  const mark = logos.find((l) => l.id === (programme?.mark ?? "community"));

  return (
    <main>
      <ReadingProgress target={article} />

      <section
        className={cx("relative overflow-hidden", programme?.tone ?? "bg-primary-800")}
      >
        <div className="mx-auto grid w-full max-w-container grid-cols-[1fr_auto] items-center gap-10 px-6 pb-9 pt-[clamp(1.75rem,4vw,2.5rem)] max-nav:grid-cols-1 max-nav:gap-6">
          <div>
            <Link
              to="/blogs"
              className="mb-5 inline-flex items-center gap-2 text-[14px] font-bold text-white/70 transition-colors duration-200 hover:text-white"
            >
              <IconArrowLeft className="h-4 w-4" stroke={2} aria-hidden="true" />
              {copy.back}
            </Link>

            <div className="mb-[0.7rem] flex flex-wrap items-center gap-3">
              {post.date && (
                <span className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-white">
                  {longDate(post.date, country.locale)}
                </span>
              )}
              <span className="rounded-full bg-white/[0.18] px-[0.6rem] py-[3px] text-[11px] font-extrabold uppercase tracking-[0.12em] text-white">
                {programme ? programme.label : blogs.community}
              </span>
            </div>

            <h1 className="max-w-[24ch] text-[clamp(1.8rem,4vw,42px)] font-extrabold leading-[1.12] tracking-[-0.02em] text-white">
              {post.title}
            </h1>
          </div>

          {mark && (
            <span className="grid h-[112px] w-[156px] flex-none place-items-center rounded-2xl bg-white px-5 shadow-card max-nav:h-[92px] max-nav:w-[130px] max-nav:px-4">
              <img
                /* the dark cut where there is one — these panels are white, and the
                   community mark's default is drawn for a photograph */
                src={mark.dark ?? mark.src}
                alt=""
                style={{ "--s": mark.scale ?? 1 }}
                className="w-[calc(88px*var(--s))] max-w-full max-nav:w-[calc(74px*var(--s))]"
              />
            </span>
          )}
        </div>
      </section>

      <article className="py-14" ref={article}>
        <div className="mx-auto w-full max-w-[760px] px-6">
          {post.img && (
            <img
              src={post.img}
              alt=""
              className="reveal mb-10 max-h-[460px] w-full rounded-2xl object-cover"
            />
          )}

          {post.html ? (
            <div
              className="reveal prose-post"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          ) : loading ? (
            /* The body is still on its way. Grey bars rather than a spinner:
               the page already shows the real title and photo, so what is
               missing is text, and text-shaped placeholders keep the layout
               from jumping when it lands.
               ⚠ Not `.reveal` — that is animated by a GSAP pass that has
               already run, so it would sit invisible. */
            <div aria-hidden="true" className="flex flex-col gap-3">
              {[92, 100, 84, 96, 70].map((w) => (
                <span
                  key={w}
                  style={{ width: `${w}%` }}
                  className="h-4 animate-pulse rounded bg-mist"
                />
              ))}
            </div>
          ) : (
            /* ⚠ The pre-CMS format: `[kind, text]` pairs, which is all the
               static files in content/base carry. This branch is what the site
               renders when the CMS is switched off (no VITE_CMS_API_URL), so it
               is not dead code yet — it goes when the static blog content does. */
            post.body?.map(([kind, text], i) =>
              kind === "h" ? (
                <h2
                  className="reveal mb-3 mt-9 text-[22px] font-black uppercase leading-[1.25] tracking-[-0.01em] first:mt-0"
                  key={i}
                >
                  {text}
                </h2>
              ) : kind === "li" ? (
                <p className={cx("reveal mb-2 flex gap-3 pl-1", PROSE)} key={i}>
                  <span className="mt-[11px] h-[6px] w-[6px] flex-none rounded-full bg-primary" />
                  <span>{text}</span>
                </p>
              ) : (
                <p className={cx("reveal mb-5", PROSE)} key={i}>
                  {text}
                </p>
              )
            )
          )}

          {programme && (
            <Link
              to={programme.path}
              className="reveal mt-10 inline-flex items-center gap-1 border-t border-line pt-6 text-[15px] font-bold text-primary underline underline-offset-4"
            >
              {fill(copy.programmeLink, { programme: programme.label })}
              <IconArrowUpRight className="h-4 w-4" stroke={2} aria-hidden="true" />
            </Link>
          )}
        </div>
      </article>

      <ContactCta />
    </main>
  );
}
