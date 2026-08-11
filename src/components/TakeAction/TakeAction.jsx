import { BRAND } from "../../config/brand.js";
import "./TakeAction.css";

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

/* ---------- YOUR TURN — TAKE ACTION ---------- */
export default function TakeAction() {
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
