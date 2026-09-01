import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { countryFromPath } from "./config/countries.js";
import { primeContent } from "./content/index.js";

/* ⚠ The CMS is fetched BEFORE the first render, not after it.

   `resolveContent` is synchronous — every content hook reads it during render —
   so the CMS data has to be in its cache by the time anything mounts. Doing it
   the other way round (render, then fetch, then swap) would also walk straight
   into the `.reveal` trap documented in CLAUDE.md: `useGsap` scans the DOM once
   per mount, so every section the newly-arrived content touched would sit at
   `opacity: 0` forever.

   `primeContent` leaves the static content in place when the CMS is switched
   off (no VITE_CMS_API_URL), unreachable, or slow — it carries its own 3s
   timeout and never rejects, so this can neither hang the page nor fail it.

   ⚠ `.then()` rather than a top-level `await`: Vite's default build target is
   es2020, which has no top-level await, and the build fails outright rather
   than degrading. Raising the target to support one line is not worth cutting
   off the browsers that come with it. */
const country = countryFromPath(window.location.pathname);

const start = () =>
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

primeContent(country).then(start, start);
