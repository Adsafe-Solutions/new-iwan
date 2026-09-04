/* =========================================================
   Tailwind config — the single source of truth for colour.

   NOTHING in src/ may contain a hex code. Every colour the site
   uses is declared here, in `palette` or `themes`, and reaches the
   app one of two ways:

     1. Tailwind utilities  → `theme.extend.colors` below.
     2. CSS custom properties → the `themeVariables` plugin at the
        bottom emits :root and :root[data-theme="…"] blocks, so the
        ThemeSwitcher keeps working exactly as before.

   JS that needs a literal colour (GSAP tweens, swatch previews)
   imports `palette` / `themes` from this file — see src/themes.js
   and src/hooks/useGsap.js.
========================================================= */
import plugin from "tailwindcss/plugin";

/* ---------------- raw colour values ---------------- */

/** Fixed colours — these do not change with the theme. */
export const palette = {
  /* Iwan programme colours */
  women: "#ee5f9e",
  kids: "#3694db",
  men: "#234967",
  youth: "#3994b3",

  /* Each programme's colour at 10% over white, written out rather than left
     as `bg-youth/10` so it is a colour with a name — the About cards take
     their ground from the nav entry, which points at these. */
  womenSoft: "#fdeff5",
  kidsSoft: "#eaf4fb",
  menSoft: "#e9edf0",
  youthSoft: "#ebf4f7",

  /* neutrals */
  ink: "#0a1020",
  ink2: "#1a2233",
  muted: "#5b6b80",
  line: "#e4e8f0",
  bg: "#ffffff",
  white: "#ffffff",
  black: "#000000",
  /* the two near-blacks the photo scrims are mixed from */
  shade: "#04101f",
  shade2: "#06101f",

  /* warm off-whites — the ground under the two About treatments */
  cream: "#faf8f5",
  sand: "#f7f5f0",

  /* cool off-whites: section ground and the modal's close button */
  mist: "#f7f9fc",
  cloud: "#f1f4f9",
  /* ruled lines of the stylised map in the event modal */
  grid: "#e2e7f0",
  /* selected / hovered row in the theme tray */
  softbg: "#f0f4ff",

  /* ---- Zakat page ---- */
  slate: "#2d3748", // hero card heading
  night: "#0a1224", // "act of mercy" card ground
  frost: "#f4f7fc", // administer section ground
  quote: "#cfe0ef", // reversed body copy on primary panels
  mercy: "#c3d2ef", // reversed body copy on the mercy card
  listed: "#eaf1fb", // the eight-categories list
  hairline: "#dce0e5", // FAQ item border
  charcoal: "#1a1a1a", // "changing lives" heading
  ash: "#555555", // amount-card label

  /* the four Zakat amount tiles — fixed, so the row keeps its own
     colour identity whichever theme is applied */
  chipEducation: "#22c55e",
  chipHomeless: "#0e41b0",
  chipFood: "#fbbf24",
  chipOrphan: "#ec4899",

  /* calculator ground, warm at the far end */
  calc1: "#eceff6",
  calc2: "#f5f6f9",
  calc3: "#f4f1e8",

  /* WhatsApp's own green — the floating button is only recognisable in it,
     so it stays fixed rather than following the theme */
  whatsapp: "#25d366",
  whatsappDark: "#1da851",
  /* the share tray's network buttons — each network's own brand colour */
  facebook: "#1877f2",
  xbrand: "#0f1419",
  linkedin: "#0a66c2",
  telegram: "#26a5e4",

  /* the "ways to connect" marks, each sampled from its own logo export so
     a card's rule, plate and mark agree — see content/base/ways.js.
     ⚠ Re-sample these if a logo is replaced: the rule is the only thing
     on the card that is not the export itself. */
  wayRead: "#3b97b8",
  wayCreate: "#ff4d6d",
  wayCafe: "#ff0000",
  wayPlay: "#ff8a3d",
  wayLead: "#0ae448",
  wayReflect: "#662d91",
  wayLearn: "#3939c6",
  /* the plate each mark sits on — a ~10% tint of the mark's colour over
     white, the same way the programme softs above are built */
  wayReadSoft: "#e9f4f8",
  wayCreateSoft: "#ffedf0",
  wayCafeSoft: "#ffe8e8",
  wayPlaySoft: "#fff3ec",
  wayLeadSoft: "#e7fced",
  wayReflectSoft: "#f0eaf4",
  wayLearnSoft: "#ebebf9",

  /* fixed accents (focus areas, donate button) */
  red: "#e11d2a",
  redDark: "#c2161f",
  pink: "#e0218a",
  green: "#4c9f38",
  amber: "#dda63a",
};

/**
 * Themeable colours. Each entry overrides the primary (`blue*`) and
 * accent (`yellow*`) tokens; every component reads those through CSS
 * variables, so switching the theme recolours the whole site.
 * `ocean` doubles as the :root default.
 */
export const themes = {
  ocean: {
    blue: "#244967",
    blueDark: "#1d3b54",
    blue800: "#1b374e",
    yellow: "#FBBD31",
    yellow2: "#e8e347",
    teal: "#3993b5",
  },
  emerald: {
    blue: "#0b7a4b",
    blueDark: "#085f3a",
    blue800: "#074f30",
    yellow: "#FFC107",
    yellow2: "#f3bf22",
    teal: "#34d399",
  },
  violet: {
    blue: "#5a2ca0",
    blueDark: "#47237e",
    blue800: "#3d1f6e",
    yellow: "#FFC107",
    yellow2: "#f0b41f",
    teal: "#a78bfa",
  },
  crimson: {
    blue: "#d01e2b",
    blueDark: "#a91724",
    blue800: "#8f131f",
    yellow: "#FFC107",
    yellow2: "#f5c518",
    teal: "#f2707a",
  },
};

export const DEFAULT_THEME = "ocean";

/* ---------------- helpers ---------------- */

/** "#0a1020" → "10 16 32" (space-separated channels, for rgb(… / α)). */
export function channels(hex) {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = Number.parseInt(full, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

/** Fixed colour at a given alpha, as a CSS colour string. */
export function alpha(hex, a) {
  return `rgb(${channels(hex)} / ${a})`;
}

/**
 * A themed colour, wired to its CSS variable. The `<alpha-value>`
 * placeholder is what lets `bg-primary/60` keep working.
 */
const themed = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/* ---------------- the config ---------------- */

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* themeable — resolved at paint time from [data-theme] */
        primary: {
          DEFAULT: themed("c-blue"),
          dark: themed("c-blue-dark"),
          800: themed("c-blue-800"),
          /* a step below the solid primary — secondary actions fill with
             this on hover so they never outweigh the real CTA */
          soft: `color-mix(in srgb, rgb(var(--c-blue)) 84%, ${palette.white})`,
        },
        accent: {
          DEFAULT: themed("c-yellow"),
          2: themed("c-yellow-2"),
        },
        teal: themed("c-teal"),

        /* fixed */
        women: { DEFAULT: palette.women, soft: palette.womenSoft },
        kids: { DEFAULT: palette.kids, soft: palette.kidsSoft },
        men: { DEFAULT: palette.men, soft: palette.menSoft },
        youth: { DEFAULT: palette.youth, soft: palette.youthSoft },
        ink: { DEFAULT: palette.ink, 2: palette.ink2 },
        muted: palette.muted,
        line: palette.line,
        shade: palette.shade,
        shade2: palette.shade2,
        cream: palette.cream,
        sand: palette.sand,
        mist: palette.mist,
        cloud: palette.cloud,
        grid: palette.grid,
        softbg: palette.softbg,
        slate: palette.slate,
        night: palette.night,
        frost: palette.frost,
        quote: palette.quote,
        mercy: palette.mercy,
        listed: palette.listed,
        hairline: palette.hairline,
        charcoal: palette.charcoal,
        ash: palette.ash,
        chip: {
          education: palette.chipEducation,
          homeless: palette.chipHomeless,
          food: palette.chipFood,
          orphan: palette.chipOrphan,
        },

        /* Literal per-theme colours, so the switcher can preview a theme it
           is not currently in. These are the ONLY place a theme colour is
           painted without going through the CSS variables. */
        theme: Object.fromEntries(
          Object.entries(themes).map(([id, t]) => [
            id,
            { primary: t.blue, accent: t.yellow },
          ])
        ),
        whatsapp: { DEFAULT: palette.whatsapp, dark: palette.whatsappDark },
        facebook: palette.facebook,
        xbrand: palette.xbrand,
        linkedin: palette.linkedin,
        telegram: palette.telegram,
        red: { DEFAULT: palette.red, dark: palette.redDark },
        way: {
          read: { DEFAULT: palette.wayRead, soft: palette.wayReadSoft },
          create: { DEFAULT: palette.wayCreate, soft: palette.wayCreateSoft },
          cafe: { DEFAULT: palette.wayCafe, soft: palette.wayCafeSoft },
          play: { DEFAULT: palette.wayPlay, soft: palette.wayPlaySoft },
          lead: { DEFAULT: palette.wayLead, soft: palette.wayLeadSoft },
          reflect: { DEFAULT: palette.wayReflect, soft: palette.wayReflectSoft },
          learn: { DEFAULT: palette.wayLearn, soft: palette.wayLearnSoft },
        },
        pink: palette.pink,
        green: palette.green,
        amber: palette.amber,
      },

      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "-apple-system", "sans-serif"],
        serif: ['"Amiri"', "Georgia", "serif"],
        inter: ['"Inter"', "system-ui", "sans-serif"],
        satoshi: ['"Satoshi"', "Tahoma", "sans-serif"],
        display: ['"DM Serif Text"', "Georgia", "serif"],
      },

      /* chrome heights live as variables because App.jsx collapses
         --topbar-h to 0 when the topbar flag is off */
      spacing: {
        header: "var(--header-h)",
        topbar: "var(--topbar-h)",
        chrome: "calc(var(--header-h) + var(--topbar-h))",
      },
      height: { header: "var(--header-h)", topbar: "var(--topbar-h)" },
      maxWidth: { container: "var(--container)" },

      borderRadius: { DEFAULT: "4px", lg: "6px" },

      boxShadow: {
        DEFAULT: `0 24px 50px -22px ${alpha(palette.ink, 0.4)}`,
        card: `0 30px 60px -30px ${alpha(palette.ink, 0.55)}`,
        soft: `0 18px 40px -24px ${alpha(palette.ink, 0.45)}`,
        pop: `0 20px 44px -20px ${alpha(palette.ink, 0.5)}`,
        header: `0 10px 34px -22px ${alpha(palette.ink, 0.5)}`,
        mega: `0 26px 44px -26px ${alpha(palette.ink, 0.4)}`,
        img: `0 12px 30px -18px ${alpha(palette.ink, 0.4)}`,
        ecard: `0 18px 34px -26px ${alpha(palette.ink, 0.5)}`,
        /* testimonial carousel: the centred card, the same card while
           hovered (tinted with the theme primary), and the nav arrows */
        tcard: `0 24px 60px -18px ${alpha(palette.ink, 0.28)}`,
        tcardHot: "0 34px 74px -16px rgb(var(--c-blue) / 0.32)",
        arrowSoft: `0 2px 10px ${alpha(palette.ink, 0.06)}`,
        fab: `0 14px 30px -10px ${alpha(palette.ink, 0.55)}`,
        tray: `0 26px 54px -20px ${alpha(palette.ink, 0.4)}`,
        swatch: `0 2px 6px -2px ${alpha(palette.ink, 0.3)}`,
        calc: `0 42px 90px -38px ${alpha(palette.ink, 0.45)}`,
        price: `0 4px 16px ${alpha(palette.black, 0.13)}`,
        /* resting state of the pulsing live dot */
        livedot: `0 0 0 0 ${alpha(palette.red, 0.7)}`,
      },

      dropShadow: {
        emoji: `0 2px 4px ${alpha(palette.black, 0.25)}`,
      },

      screens: {
        /* the nav runs out of room just under 1000px — this is the
           drawer breakpoint, and it is NOT 780 */
        nav: "1000px",
        wide: "1240px",
        phone: "780px",
        xs: "560px",
      },

      backgroundImage: {
        /* Hero scrim: a fade into the section base colour at the top, then a
           left-side darkening pass so the copy stays legible over any photo. */
        "hero-scrim": [
          "linear-gradient(rgb(var(--c-blue-800)), transparent 25%)",
          `linear-gradient(265deg, transparent 40%, ${palette.black})`,
        ].join(", "),
        /* tint over a focus-area card photo, so white type stays readable */
        "card-scrim": `linear-gradient(${alpha(palette.shade, 0.1)}, rgb(var(--c-blue) / 0.35))`,
        /* bottom-weighted scrim behind a take-action tile label */
        "tile-scrim": `linear-gradient(transparent 45%, ${alpha(palette.shade2, 0.7)})`,
        /* scrim behind the brand mark on card/detail photos — dark at both
           edges, clear through the middle, so the logo reads on any photo
           without dimming the subject */
        "brand-scrim": [
          `linear-gradient(${alpha(palette.shade2, 0.6)}, ${alpha(palette.shade2, 0.22)} 24%, transparent 42%)`,
          `linear-gradient(transparent 58%, ${alpha(palette.shade2, 0.22)} 76%, ${alpha(palette.shade2, 0.6)})`,
        ].join(", "),
        /* advisor initials circle */
        avatar: "linear-gradient(135deg, rgb(var(--c-blue)), rgb(var(--c-teal)))",
        /* footer wash: the primary tinted into white, deepening downwards */
        footer: [
          "linear-gradient(180deg,",
          `color-mix(in srgb, rgb(var(--c-blue)) 24%, ${palette.white}) 0%,`,
          `color-mix(in srgb, rgb(var(--c-blue)) 46%, ${palette.white}) 100%)`,
        ].join(" "),
        /* Zakat hero: darkens hard on the left so the white card reads */
        "zhero-scrim": [
          "linear-gradient(90deg,",
          `${alpha(palette.shade, 0.9)},`,
          `${alpha(palette.shade, 0.35)} 55%,`,
          `${alpha(palette.shade, 0.2)})`,
        ].join(" "),
        /* calculator ground */
        "calc-wash": `linear-gradient(120deg, ${palette.calc1} 0%, ${palette.calc2} 55%, ${palette.calc3} 100%)`,
        /* a suggestion of a street map, not a real one — no tile provider */
        "map-grid": [
          `linear-gradient(${palette.grid} 1px, transparent 1px)`,
          `linear-gradient(90deg, ${palette.grid} 1px, transparent 1px)`,
        ].join(", "),
      },

      keyframes: {
        megaIn: {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "none" },
        },
        modalFade: { from: { opacity: "0" }, to: { opacity: "1" } },
        modalPanel: {
          from: { opacity: "0", transform: "translateY(18px) scale(0.965)" },
          to: { opacity: "1", transform: "none" },
        },
        /* dynamic content can't use .reveal — GSAP only scans once at
           mount — so cards animate themselves in with this */
        ecardIn: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "none" },
        },
        heroWipe: {
          from: { clipPath: "inset(0 100% 0 0)" },
          to: { clipPath: "inset(0 0 0 0)" },
        },
        heroRise: {
          from: { opacity: "0", transform: "translate3d(0, 80px, 0)" },
          to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        heroSet: {
          from: { opacity: "1", transform: "translate3d(0, 0, 0)" },
          to: { opacity: "0", transform: "translate3d(0, 80px, 0)" },
        },
        blink: { "50%": { opacity: "0" } },
        scrollCue: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(9px)" },
        },
        livedot: {
          "70%": { boxShadow: `0 0 0 9px ${alpha(palette.red, 0)}` },
          "100%": { boxShadow: `0 0 0 0 ${alpha(palette.red, 0)}` },
        },
      },
      animation: {
        megaIn: "megaIn 0.22s ease",
        modalFade: "modalFade 0.2s ease",
        modalPanel: "modalPanel 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
        ecardIn: "ecardIn 0.45s ease-out both",
        heroWipe: "heroWipe 2.1s cubic-bezier(0.65, 0, 0.35, 1) both",
        heroRise: "heroRise 0.7s ease-out both",
        heroSet: "heroSet 0.5s ease-in both",
        blink: "blink 1s step-end infinite",
        scrollCue: "scrollCue 2.4s ease-in-out infinite",
        livedot: "livedot 1.6s infinite",
      },
    },
  },
  plugins: [
    /* Emits the theme variables. Keeping this here (rather than in
       index.css) is what keeps every hex inside this file. */
    plugin(({ addBase }) => {
      const vars = (t) => ({
        "--c-blue": channels(t.blue),
        "--c-blue-dark": channels(t.blueDark),
        "--c-blue-800": channels(t.blue800),
        "--c-yellow": channels(t.yellow),
        "--c-yellow-2": channels(t.yellow2),
        "--c-teal": channels(t.teal),
      });

      addBase({
        ":root": {
          ...vars(themes[DEFAULT_THEME]),
          /* not themeable, but GSAP tweens colour in JS and must not carry a
             literal hex — it reads this instead */
          "--c-white": channels(palette.white),
          "--container": "1180px",
          "--header-h": "78px",
          "--topbar-h": "34px",
        },
        ...Object.fromEntries(
          Object.entries(themes).map(([id, t]) => [`:root[data-theme="${id}"]`, vars(t)])
        ),
      });
    }),
  ],
};
