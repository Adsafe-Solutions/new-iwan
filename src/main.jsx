import React from "react";
import ReactDOM from "react-dom/client";
/* Tokens and base styles first: App pulls in components.css, and component
   rules have to land AFTER .container or its `padding: 0 24px` silently wins
   over same-specificity component padding (e.g. .mega__inner, .zcalc__grid). */
import "./index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
