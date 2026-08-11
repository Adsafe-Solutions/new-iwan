import Typewriter from "../Typewriter/Typewriter.jsx";
import { FOCUS_AREAS } from "../../focusAreas.js";
import "./Difference.css";

const DIFFERENCE_PHRASES = [
  "make a difference",
  "educate a child",
  "shelter a family",
  "fill an empty plate",
  "empower a widow",
];

/* ---------- YOU CAN MAKE A DIFFERENCE ---------- */
export default function Difference() {
  return (
    <section className="difference" id="difference">
      <div className="container">
        <h2 className="kicker reveal">
          You can{" "}
          <Typewriter phrases={DIFFERENCE_PHRASES} className="mark mark--by typewriter" />
        </h2>
        <div className="dgrid" data-stagger>
          {FOCUS_AREAS.map((a) => (
            <a
              className="dcard reveal"
              key={a.id}
              /* anchor target for the focus-area links in the nav and footer */
              id={a.id}
              href="#donate"
              style={{ "--tag": a.color }}
            >
              <div className="dcard__media">
                <span className="dcard__tag">{a.tag}</span>
                <div className="dcard__img" style={{ "--img": `url(${a.img})` }} />
              </div>
              <div className="dcard__body">
                <h3>{a.card}</h3>
                <div className="dcard__rule" data-line />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
