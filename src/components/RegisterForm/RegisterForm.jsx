import { useState } from "react";
import Button from "../Button/Button.jsx";
import { useCopy } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { longDate } from "../../lib/events.js";
import { cx } from "../../lib/cx.js";

const FIELD = cx(
  "rounded border border-line px-[0.9rem] py-3 text-[15px] text-ink [font-family:inherit]",
  "focus:border-primary focus:outline-none"
);

const FIELD_LABEL =
  "flex flex-[1_1_200px] flex-col gap-[0.35rem] text-[13px] font-bold text-muted";

const CTA_ROW = "flex flex-wrap items-center gap-[0.9rem]";

/* cta → form → done, shared by the homepage modal and an event's own page so
   the two cannot drift. ⚠ Nothing is submitted anywhere: this is the visual
   flow only, the same as the newsletter box in the footer. */
export default function RegisterForm({ event, locale = "en-GB" }) {
  const copy = useCopy().eventModal;
  const [stage, setStage] = useState("cta");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (stage === "cta") {
    return (
      <div className={CTA_ROW}>
        <Button onClick={() => setStage("form")}>{copy.register}</Button>
        <span className="text-[14px] text-muted">{copy.free}</span>
      </div>
    );
  }

  if (stage === "form") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setStage("done");
        }}
      >
        <span className="mb-4 block text-[16px] font-bold">{copy.formHeading}</span>
        <div className="mb-[1.1rem] flex flex-wrap gap-[0.9rem]">
          <label className={FIELD_LABEL}>
            {copy.nameLabel}
            <input
              className={FIELD}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={copy.namePlaceholder}
              required
            />
          </label>
          <label className={FIELD_LABEL}>
            {copy.emailLabel}
            <input
              className={FIELD}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.emailPlaceholder}
              required
            />
          </label>
        </div>
        <div className={CTA_ROW}>
          <Button type="submit">{copy.submit}</Button>
          <button
            type="button"
            className="cursor-pointer border-0 bg-transparent text-[14px] font-semibold text-muted [font-family:inherit]"
            onClick={() => setStage("cta")}
          >
            {copy.cancel}
          </button>
        </div>
      </form>
    );
  }

  return (
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
          {fill(copy.doneHeading, { name: name ? `, ${name.split(" ")[0]}` : "" })}
        </strong>
        <p className="text-[15px] leading-[23px] text-ink-2">
          {fill(copy.doneBody, {
            title: event.title,
            date: longDate(event.date, locale),
          })}
        </p>
      </div>
    </div>
  );
}
