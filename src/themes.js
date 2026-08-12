/* Theme list for the switcher tray.

   The colours themselves live in `themes` in tailwind.config.js, which emits
   both the [data-theme] CSS variables and a `theme-<id>-primary/accent`
   utility for each entry. The swatch classes below are those utilities — a
   theme can only be previewed with literal colour, since the variables always
   describe whichever theme is currently applied.

   Adding a theme means adding it in tailwind.config.js and here. */
export const THEMES = [
  {
    id: "ocean",
    name: "Ocean",
    primary: "bg-theme-ocean-primary",
    accent: "bg-theme-ocean-accent",
  },
  {
    id: "emerald",
    name: "Emerald",
    primary: "bg-theme-emerald-primary",
    accent: "bg-theme-emerald-accent",
  },
  {
    id: "violet",
    name: "Violet",
    primary: "bg-theme-violet-primary",
    accent: "bg-theme-violet-accent",
  },
  {
    id: "crimson",
    name: "Crimson",
    primary: "bg-theme-crimson-primary",
    accent: "bg-theme-crimson-accent",
  },
];

export const DEFAULT_THEME = "ocean";
