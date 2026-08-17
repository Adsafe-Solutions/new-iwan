import { useState } from "react";
import Modal from "../Modal/Modal.jsx";
import Button from "../Button/Button.jsx";
import { IconArrowUpRight } from "@tabler/icons-react";
import { cx } from "../../lib/cx.js";
import { mapEmbed, mapLink } from "../../lib/map.js";

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

const LABEL =
  "mb-[0.9rem] block text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted";
const CTA_ROW = "flex flex-wrap items-center gap-[1.1rem]";
const FIELD = cx(
  "rounded border border-line px-[0.9rem] py-3 text-[15px] text-ink [font-family:inherit]",
  "focus:border-primary focus:outline-none"
);
const FIELD_LABEL =
  "flex flex-[1_1_200px] flex-col gap-[0.35rem] text-[13px] font-bold text-muted";

export default function EventModal({ event, onClose }) {
  const [stage, setStage] = useState("cta"); // cta → form → done
  const embed = mapEmbed(event);
  const link = mapLink(event);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Modal
      onClose={onClose}
      labelledBy="emodal-title"
      /* the generic close button sits on this modal's dark header */
      closeClassName="bg-white/[0.14] text-white hover:bg-primary"
    >
      <div className="bg-primary-800 p-[clamp(1.4rem,4vw,2.2rem)] py-[1.8rem] pr-[4.5rem]">
        <span className="mb-[0.6rem] block text-[13px] font-extrabold uppercase tracking-[0.12em] text-accent">
          {longDate(event.date)}
        </span>
        <h3
          id="emodal-title"
          className="mb-2 text-[clamp(24px,4vw,32px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white"
        >
          {event.title}
        </h3>
        <p className="text-[15px] font-medium text-white/70">
          {event.start}–{event.end} · {event.kind} · {event.spots} places
        </p>
      </div>

      <div className="flex flex-col gap-[1.9rem] p-[clamp(1.4rem,4vw,2.2rem)]">
        <p className="text-[17px] leading-[27px] text-muted">{event.details}</p>

        <div className="flex flex-wrap gap-[1.9rem] max-phone:gap-[1.4rem]">
          <div className="flex-[1_1_280px]">
            <span className={LABEL}>How the day runs</span>
            {event.agenda.map(([t, label]) => (
              <div className="mb-3 flex items-baseline gap-[0.9rem]" key={t}>
                <span className="w-[58px] flex-none text-[13px] font-extrabold text-primary">
                  {t}
                </span>
                <p className="text-[15px] leading-[22px]">{label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-[1_1_240px] flex-col">
            <span className={LABEL}>Where</span>

            {embed ? (
              /* lazy so the modal opens instantly and the tiles only load
                 once someone actually looks at the map */
              <iframe
                src={embed}
                title={`Map showing ${event.venue}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mb-[0.8rem] h-[180px] w-full rounded border border-line"
              />
            ) : (
              /* no coordinates and no address — a suggestion of a street map
                 rather than a real one */
              <div
                className="relative mb-[0.8rem] h-[132px] overflow-hidden rounded border border-line bg-cloud bg-map-grid [background-size:34px_34px]"
                aria-hidden="true"
              >
                <i className="absolute inset-x-0 top-[46%] h-[10px] bg-grid" />
                <i className="absolute bottom-0 left-[62%] top-0 w-2 bg-grid" />
                <i className="absolute left-1/2 top-[44%] h-[18px] w-[18px] -translate-x-1/2 -translate-y-full -rotate-45 rounded-[999px_999px_999px_2px] bg-primary" />
              </div>
            )}

            <strong className="text-[15px] font-bold">{event.venue}</strong>
            <span className="text-[14px] leading-[21px] text-muted">{event.address}</span>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-flex w-fit items-center gap-1 text-[14px] font-bold text-primary underline"
              >
                Get directions
                <IconArrowUpRight className="h-4 w-4" stroke={2} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <div className="border-t border-line pt-[1.6rem]">
          {stage === "cta" && (
            <div className={CTA_ROW}>
              <Button onClick={() => setStage("form")}>Register</Button>
              <span className="text-[14px] text-muted">
                Free to attend · everyone welcome
              </span>
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
              <span className="mb-4 block text-[16px] font-bold">Save your place</span>
              <div className="mb-[1.1rem] flex flex-wrap gap-[0.9rem]">
                <label className={FIELD_LABEL}>
                  Your name
                  <input
                    className={FIELD}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First and last"
                    required
                  />
                </label>
                <label className={FIELD_LABEL}>
                  Email
                  <input
                    className={FIELD}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                  />
                </label>
              </div>
              <div className={CTA_ROW}>
                <Button type="submit">Confirm my place</Button>
                <button
                  type="button"
                  className="cursor-pointer border-0 bg-transparent text-[14px] font-semibold text-muted [font-family:inherit]"
                  onClick={() => setStage("cta")}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {stage === "done" && (
            <div
              className={cx(
                "flex items-start gap-4 rounded bg-green/[0.12] px-[1.3rem] py-[1.2rem]",
                "animate-modalPanel"
              )}
            >
              <span
                className="grid h-[30px] w-[30px] flex-none place-items-center rounded-full bg-green text-[15px] font-bold text-white"
                aria-hidden="true"
              >
                ✓
              </span>
              <div>
                <strong className="mb-1 block text-[16px] font-bold">
                  You’re in{name ? `, ${name.split(" ")[0]}` : ""}
                </strong>
                <p className="text-[15px] leading-[23px] text-ink-2">
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
