import { useState } from "react";
import Modal from "../Modal/Modal.jsx";
import "./EventModal.css";

const FULLDOW = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const FULLMON = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const parse = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const longDate = (iso) => {
  const d = parse(iso);
  return `${FULLDOW[d.getDay()]}, ${d.getDate()} ${FULLMON[d.getMonth()]}`;
};

export default function EventModal({ event, onClose }) {
  const [stage, setStage] = useState("cta"); // cta → form → done
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Modal onClose={onClose} labelledBy="emodal-title" className="emodal">
      <div className="emodal__head">
        <span className="emodal__date">{longDate(event.date)}</span>
        <h3 id="emodal-title">{event.title}</h3>
        <p>
          {event.start}–{event.end} · {event.kind} · {event.spots} places
        </p>
      </div>

      <div className="emodal__body">
        <p className="emodal__blurb">{event.details}</p>

        <div className="emodal__cols">
          <div className="emodal__agenda">
            <span className="emodal__label">How the day runs</span>
            {event.agenda.map(([t, label]) => (
              <div className="emodal__agenda-row" key={t}>
                <span>{t}</span>
                <p>{label}</p>
              </div>
            ))}
          </div>

          <div className="emodal__where">
            <span className="emodal__label">Where</span>
            <div className="emodal__map" aria-hidden="true">
              <i className="emodal__map-h" />
              <i className="emodal__map-v" />
              <i className="emodal__pin" />
            </div>
            <strong>{event.venue}</strong>
            <span className="emodal__address">{event.address}</span>
          </div>
        </div>

        <div className="emodal__reg">
          {stage === "cta" && (
            <div className="emodal__reg-cta">
              <button
                type="button"
                className="btn btn--blue"
                onClick={() => setStage("form")}
              >
                Register
              </button>
              <span>Free to attend · everyone welcome</span>
            </div>
          )}

          {stage === "form" && (
            /* nothing is submitted anywhere — this is the visual flow only */
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStage("done");
              }}
            >
              <span className="emodal__reg-head">Save your place</span>
              <div className="emodal__fields">
                <label>
                  Your name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First and last"
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                  />
                </label>
              </div>
              <div className="emodal__reg-cta">
                <button type="submit" className="btn btn--blue">
                  Confirm my place
                </button>
                <button
                  type="button"
                  className="emodal__cancel"
                  onClick={() => setStage("cta")}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {stage === "done" && (
            <div className="emodal__done">
              <span className="emodal__tick" aria-hidden="true">
                ✓
              </span>
              <div>
                <strong>You’re in{name ? `, ${name.split(" ")[0]}` : ""}</strong>
                <p>
                  We’ve noted your place at {event.title} on {longDate(event.date)}.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
