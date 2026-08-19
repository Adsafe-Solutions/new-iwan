import { Link } from "react-router-dom";
import { useCopy, useNav, useProgrammes } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";
import { MARK_YB } from "../../lib/type.js";

/* One tile per programme, read from the same list the nav is built from, so
   a programme can never appear in one and not the other. The photo is the
   programme's own hero, so the tile and the page it opens are the same
   picture; `tile` in nav.js is the stock fallback for one without a hero. */
const TILE = cx(
  "reveal group relative flex aspect-[632/474] items-end overflow-hidden rounded-none p-[1.4rem]",
  "before:absolute before:inset-0 before:z-[1] before:bg-tile-scrim before:content-['']"
);
const TILE_IMG =
  "absolute inset-0 bg-cover bg-center transition-transform duration-[600ms] group-hover:scale-[1.08]";
const TILE_LABEL = cx(
  "relative z-[2] rounded-sm px-3 py-1.5",
  "text-[28.8px] font-black uppercase leading-[43.2px] tracking-[0.02em]",
  /* every programme colour is dark enough to carry white type */
  "text-white",
  "max-phone:text-[22px] max-phone:leading-[33px]"
);

/* ---------- THE PROGRAMMES WE RUN ---------- */
export default function TakeAction() {
  const { programmesGroup, pages } = useNav();
  const copy = useCopy().takeAction;
  const { content: PROGRAMME_CONTENT } = useProgrammes();
  const TILES = pages.filter((p) => p.group === programmesGroup);
  const photo = (p) => PROGRAMME_CONTENT[p.path.replace("/", "")]?.hero ?? p.tile;

  return (
    <section
      className="relative overflow-hidden py-[5.5rem]"
      id="programmes"
      data-take-scene
    >
      {/* blue background that sweeps in from the right on scroll */}
      <div
        className="absolute inset-0 z-0 origin-[right_center] scale-x-0 bg-primary will-change-transform"
        data-take-blue
      />
      <div className="relative z-[1] mx-auto w-full max-w-container px-6">
        <h2 className="reveal mb-12 text-[clamp(2.6rem,6vw,72px)] font-black uppercase leading-[1.08] tracking-[-0.72px]">
          {/* flips to white as the blue sweep arrives underneath it */}
          <span className="block text-primary" data-take-turn>
            {copy.heading}
          </span>
          <span className={cx(MARK_YB, "mt-[0.28em] !inline-block")}>{copy.mark}</span>
        </h2>

        <div className="grid grid-cols-2 gap-4 max-phone:grid-cols-1" data-stagger>
          {TILES.map((p) => (
            <Link className={TILE} key={p.label} to={p.path}>
              <div className={TILE_IMG} style={{ backgroundImage: `url(${photo(p)})` }} />
              <span className={cx(TILE_LABEL, p.tone)}>{p.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
