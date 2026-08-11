import { ADVISORS } from "../../advisors.js";
import "./Charity.css";

/* ---------- WE'RE A LEADING CHARITY + TRUSTED BY ---------- */
export default function Charity() {
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
