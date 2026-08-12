import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B } from "../../lib/type.js";

/* Featured card is a video slot — drop your own mp4 into `video`. */
const FEATURE = {
  video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  poster:
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1000&auto=format&fit=crop",
  title: "Iwan makes Education its primary focus area",
  date: "08.07.2026",
};
const MID_NEWS = [
  [
    "Iwan Global hosts retreat bringing together offices worldwide",
    "15.01.2026",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
  ],
  [
    "Iwan launches Rising Together – a 5 year Strategic Plan",
    "10.01.2026",
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop",
  ],
];
const SIDE_NEWS = {
  title: "Read more news and updates from our humanitarian work",
  img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=900&auto=format&fit=crop",
};

const CARD = "reveal group block";
const MEDIA = "relative overflow-hidden rounded-t-[3px] bg-ink";
/* the two full-height cards; everything else is a short strip */
const MEDIA_TALL = "h-[398px] max-nav:h-[300px]";

/* text tile — flush under the image, fills brand blue on hover */
const TILE = cx(
  "rounded-b-[3px] border-2 border-transparent p-4",
  "transition-[background-color,border-color] duration-300",
  "group-hover:border-primary group-hover:bg-primary"
);
const TITLE = cx(
  "text-[16px] font-bold leading-5 tracking-[-0.32px] text-ink",
  "transition-colors duration-300 group-hover:text-white"
);
const TITLE_LG = "text-[18px] leading-[22.5px] tracking-[-0.36px]";
const DATE = cx(
  "mt-[0.7rem] block text-[14px] font-normal leading-5 text-muted",
  "transition-colors duration-300 group-hover:text-white/70"
);
const ARROW = cx(
  "absolute top-[38%] z-[3] grid h-11 w-11 place-items-center rounded-full",
  "cursor-pointer border-2 border-line bg-white text-2xl text-muted",
  "transition-all duration-[250ms] hover:border-primary hover:bg-primary hover:text-white",
  "max-nav:hidden"
);

/* ---------- LATEST NEWS ---------- */
export default function News() {
  return (
    <section className="py-[4.5rem]" id="news">
      <div className="mx-auto w-full max-w-container px-6">
        <h2 className={cx(KICKER, "reveal")}>
          Latest{" "}
          <span
            className={cx(
              MARK_B,
              "relative !inline-block",
              "after:absolute after:inset-x-0 after:-bottom-1 after:h-1 after:bg-accent after:content-['']"
            )}
          >
            news
          </span>
        </h2>

        <div className="relative">
          <button className={cx(ARROW, "-left-[26px]")} aria-label="Previous">
            ‹
          </button>

          <div
            className="grid grid-cols-[1.15fr_1fr_1fr] items-start gap-[1.6rem] max-nav:grid-cols-1"
            data-stagger
          >
            {/* col 1 — featured video */}
            <a className={CARD} href="#">
              <div className={cx(MEDIA, MEDIA_TALL)}>
                <video
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  poster={FEATURE.poster}
                  src={FEATURE.video}
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              </div>
              <div className={TILE}>
                <h3 className={cx(TITLE, TITLE_LG)}>{FEATURE.title}</h3>
                <time className={DATE}>{FEATURE.date}</time>
              </div>
            </a>

            {/* col 2 — two stacked cards */}
            <div className="flex flex-col gap-[1.6rem]">
              {MID_NEWS.map(([title, date, img]) => (
                <a className={CARD} key={title} href="#">
                  <div className={cx(MEDIA, "h-[158px]")}>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </div>
                  <div className={TILE}>
                    <h3 className={TITLE}>{title}</h3>
                    <time className={DATE}>{date}</time>
                  </div>
                </a>
              ))}
            </div>

            {/* col 3 — tall "read more" card */}
            <a className={CARD} href="#">
              <div className={cx(MEDIA, MEDIA_TALL)}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${SIDE_NEWS.img})` }}
                />
              </div>
              <div className={TILE}>
                <h3 className={cx(TITLE, TITLE_LG)}>{SIDE_NEWS.title}</h3>
              </div>
            </a>
          </div>

          <button className={cx(ARROW, "-right-[26px]")} aria-label="Next">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
