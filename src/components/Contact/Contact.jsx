import { useBrand } from "../../content/ContentProvider.jsx";
import Button from "../Button/Button.jsx";
import { cx } from "../../lib/cx.js";

/* Monochrome social glyphs — they inherit `currentColor` from the link. */
const GLYPH = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
    </>
  ),
  x: (
    <>
      <path d="M4 4 20 20" />
      <path d="M20 4 4 20" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.4 9.6 15 12l-4.6 2.4V9.6Z" strokeLinejoin="round" />
    </>
  ),
  facebook: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.6 8.2h-1.3c-.9 0-1.4.5-1.4 1.4V11h2.6l-.4 2.6h-2.2V21" />
    </>
  ),
};

/* ---------- GET IN TOUCH ----------
   `id="contact"` is the target the header CTA and the hero CTA have both
   been pointing at — until this section existed, every one of those clicks
   went nowhere. The dark band is deliberate: it closes the page the way the
   live site does, and it is the one block that does not follow the theme. */
export default function Contact() {
  const BRAND = useBrand();
  return (
    <section className="bg-ink py-[5rem] text-center text-white" id="contact">
      <div className="mx-auto w-full max-w-[720px] px-6">
        <p className="reveal mb-[1.1rem] text-[12px] font-bold uppercase tracking-[0.16em] text-accent">
          Get in touch
        </p>

        <h2 className="reveal mb-[1.1rem] text-[clamp(2rem,3.6vw,48px)] font-black uppercase leading-[1.1] tracking-[-0.02em]">
          There's a place for you here
        </h2>

        <p className="reveal mb-[2rem] text-[18px] leading-[29px] text-white/70">
          Questions, ideas, a session you want to run, or you just fancy coming along to
          something — say hello. We answer every message.
        </p>

        <div className="reveal mb-[2.6rem] flex flex-wrap justify-center gap-4">
          <Button href={`mailto:${BRAND.email}`} variant="yellow">
            Email us
          </Button>
          <Button href="#events" variant="ghost">
            See what's on
          </Button>
        </div>

        <div className="reveal flex justify-center gap-5 border-t border-white/15 pt-[2rem]">
          {BRAND.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={s.label}
              className={cx(
                "grid h-11 w-11 place-items-center rounded-full text-white/70",
                "transition-[color,background-color,transform] duration-200",
                "hover:-translate-y-0.5 hover:bg-white/10 hover:text-accent"
              )}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="h-[22px] w-[22px]"
                aria-hidden="true"
              >
                {GLYPH[s.icon]}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
