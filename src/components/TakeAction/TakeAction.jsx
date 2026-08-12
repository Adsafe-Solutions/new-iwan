import { BRAND } from "../../config/brand.js";
import { cx } from "../../lib/cx.js";
import { MARK_YB } from "../../lib/type.js";

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

const TILE_LABEL = cx(
  "relative z-[2] rounded-sm bg-accent px-3 py-1.5 text-primary",
  "text-[28.8px] font-black uppercase leading-[43.2px] tracking-[0.02em]"
);

/* ---------- YOUR TURN — TAKE ACTION ---------- */
export default function TakeAction() {
  return (
    <section className="relative overflow-hidden py-[5.5rem]" id="donate" data-take-scene>
      {/* blue background that sweeps in from the right on scroll */}
      <div
        className="absolute inset-0 z-0 origin-[right_center] scale-x-0 bg-primary will-change-transform"
        data-take-blue
      />
      <div className="relative z-[1] mx-auto w-full max-w-container px-6">
        <h2 className="reveal mb-12 text-[clamp(2.6rem,6vw,72px)] font-black uppercase leading-[1.08] tracking-[-0.72px]">
          {/* flips to white as the blue sweep arrives underneath it */}
          <span className="block text-primary" data-take-turn>
            Your turn —
          </span>
          <span className={cx(MARK_YB, "mt-[0.28em] !inline-block")}>take action</span>
        </h2>

        <div className="grid grid-cols-2 gap-4 max-phone:grid-cols-1" data-stagger>
          {TILES.map(([label, img]) => (
            <a
              className={cx(
                "reveal group relative flex aspect-[632/474] items-end overflow-hidden rounded-none p-[1.4rem]",
                "before:absolute before:inset-0 before:z-[1] before:bg-tile-scrim before:content-['']"
              )}
              key={label}
              href="#"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[600ms] group-hover:scale-[1.08]"
                style={{ backgroundImage: `url(${img})` }}
              />
              <span className={TILE_LABEL}>{label}</span>
            </a>
          ))}

          <a
            className="reveal group relative grid aspect-[632/474] place-items-center overflow-hidden rounded-none bg-primary-dark p-[1.4rem]"
            href="#"
          >
            {/* the mark ships as near-black artwork — this filter chain
                recolours it to the accent on the dark tile */}
            <img
              className="h-auto w-[190px] transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-[1.08] [filter:brightness(0)_saturate(100%)_invert(93%)_sepia(72%)_saturate(2500%)_hue-rotate(1deg)_brightness(105%)_contrast(96%)]"
              src={BRAND.logo}
              alt=""
            />
            <span className={cx(TILE_LABEL, "absolute bottom-[1.4rem] left-[1.4rem]")}>
              Iwan Relief Fund
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
