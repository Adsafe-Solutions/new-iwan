import { Link } from "react-router-dom";
import { BRAND } from "../config/brand.js";

export default function Placeholder({ title, intro }) {
  return (
    <main className="stub">
      <div className="container stub__in">
        <p className="stub__eyebrow">{BRAND.name}</p>
        <h1>{title}</h1>
        <p className="stub__intro">{intro}</p>
        <p className="stub__note">
          This page is coming soon. In the meantime, explore <Link to="/">our work</Link>{" "}
          or <Link to="/zakat">give your Zakat</Link>.
        </p>
      </div>
    </main>
  );
}
