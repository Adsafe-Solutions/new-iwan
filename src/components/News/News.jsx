import "./News.css";

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

/* ---------- LATEST NEWS ---------- */
export default function News() {
  return (
    <section className="news" id="news">
      <div className="container">
        <h2 className="kicker reveal">
          Latest <span className="mark mark--b news-mark">news</span>
        </h2>

        <div className="news__wrap">
          <button className="news__arrow l" aria-label="Previous">
            ‹
          </button>

          <div className="news__grid" data-stagger>
            {/* col 1 — featured video */}
            <a className="ncard ncard--feature reveal" href="#">
              <div className="ncard__media">
                <video
                  className="ncard__video"
                  poster={FEATURE.poster}
                  src={FEATURE.video}
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              </div>
              <div className="ncard__tile">
                <h3>{FEATURE.title}</h3>
                <time>{FEATURE.date}</time>
              </div>
            </a>

            {/* col 2 — two stacked cards */}
            <div className="ncard-col">
              {MID_NEWS.map(([title, date, img]) => (
                <a className="ncard reveal" key={title} href="#">
                  <div className="ncard__media">
                    <div className="ncard__img" style={{ "--img": `url(${img})` }} />
                  </div>
                  <div className="ncard__tile">
                    <h3>{title}</h3>
                    <time>{date}</time>
                  </div>
                </a>
              ))}
            </div>

            {/* col 3 — tall "read more" card */}
            <a className="ncard ncard--side reveal" href="#">
              <div className="ncard__media">
                <div
                  className="ncard__img"
                  style={{ "--img": `url(${SIDE_NEWS.img})` }}
                />
              </div>
              <div className="ncard__tile">
                <h3>{SIDE_NEWS.title}</h3>
              </div>
            </a>
          </div>

          <button className="news__arrow r" aria-label="Next">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
