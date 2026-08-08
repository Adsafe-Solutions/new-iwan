import Typewriter from "./Typewriter.jsx";
import { FOCUS_AREAS } from "../focusAreas.js";
import { ADVISORS } from "../advisors.js";
import { BRAND } from "../brand.js";

const DIFFERENCE_PHRASES = [
  "make a difference",
  "educate a child",
  "shelter a family",
  "fill an empty plate",
  "empower a widow",
];

const TILES = [
  [
    "Iwan Field Trips",
    "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=900&auto=format&fit=crop",
  ],
  [
    "Work With Us",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=900&auto=format&fit=crop",
  ],
  [
    "Blogs",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&auto=format&fit=crop",
  ],
];

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

/* ---------- WE'RE A LEADING CHARITY + TRUSTED BY ---------- */
export function Charity() {
  return (
    <section className="charity" id="charity" data-wipe-scene>
      <div className="charity__yellow" data-wipe />
      <div className="container charity__inner">
        <h2 className="charity__head h-block reveal">
          We're a leading
          <br />
          <span className="mark mark--b">Canadian-Muslim</span>
          <br />
          charity.
        </h2>
        <div className="trusted reveal">
          <p className="trusted__label">Trusted By</p>
          <div className="trusted__grid">
            {ADVISORS.map((a) => (
              <div className="scholar" key={a.name}>
                <span className="scholar__av">{a.initials}</span>
                <strong>{a.name}</strong>
                <small>{a.role}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- YOU CAN MAKE A DIFFERENCE ---------- */
export function Difference() {
  return (
    <section className="difference" id="difference">
      <div className="container">
        <h2 className="kicker reveal">
          You can{" "}
          <Typewriter phrases={DIFFERENCE_PHRASES} className="mark mark--by typewriter" />
        </h2>
        <div className="dgrid" data-stagger>
          {FOCUS_AREAS.map((a) => (
            <a
              className="dcard reveal"
              key={a.id}
              /* anchor target for the focus-area links in the nav and footer */
              id={a.id}
              href="#donate"
              style={{ "--tag": a.color }}
            >
              <div className="dcard__media">
                <span className="dcard__tag">{a.tag}</span>
                <div className="dcard__img" style={{ "--img": `url(${a.img})` }} />
              </div>
              <div className="dcard__body">
                <h3>{a.card}</h3>
                <div className="dcard__rule" data-line />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- YOUR TURN — TAKE ACTION ---------- */
export function TakeAction() {
  return (
    <section className="take" id="donate" data-take-scene>
      <div className="take__blue" data-take-blue />
      <div className="container">
        <h2 className="kicker take__head reveal">
          <span className="take__turn" data-take-turn>
            Your turn —
          </span>
          <span className="mark mark--yb">take action</span>
        </h2>
        <div className="tgrid" data-stagger>
          {TILES.map(([label, img]) => (
            <a className="tile reveal" key={label} href="#">
              <div className="tile__img" style={{ "--img": `url(${img})` }} />
              <span className="tile__label">{label}</span>
            </a>
          ))}
          <a className="tile tile--brand reveal" href="#">
            <img className="tile__mark" src={BRAND.logo} alt="" />
            <span className="tile__label">Iwan Relief Fund</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- LATEST NEWS ---------- */
export function News() {
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
