import { useState } from "react";
import Button from "../Button/Button.jsx";
import { useCopy, useCountry } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { longDate } from "../../lib/events.js";
import { cx } from "../../lib/cx.js";
import Turnstile from "../Turnstile/Turnstile.jsx";

const FIELD = cx(
  "rounded border border-line px-[0.9rem] py-3 text-[15px] text-ink [font-family:inherit]",
  "focus:border-primary focus:outline-none"
);

const FIELD_LABEL =
  "flex flex-[1_1_200px] flex-col gap-[0.35rem] text-[13px] font-bold text-muted";

const CTA_ROW = "flex flex-wrap items-center gap-[0.9rem]";

/* cta → form → done, shared by the homepage modal and an event's own page so
   the two cannot drift. */
export default function RegisterForm({ event, locale = "en-GB" }) {
  const copy = useCopy().eventModal;
  const [country] = useCountry();
  const [stage, setStage] = useState("cta");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [error, setError] = useState("");

  const submit = async (submitEvent) => {
    submitEvent.preventDefault();
    setStage("submitting");
    setError("");
    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          region: country.code.toUpperCase(),
          eventId: event.id,
          eventTitle: event.title,
          eventDate: event.date,
          turnstileToken,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || copy.submitError);
      setStage("done");
    } catch (submissionError) {
      setError(submissionError.message || copy.submitError);
      setStage("form");
    } finally {
      setTurnstileToken("");
      setTurnstileKey((key) => key + 1);
    }
  };

  if (stage === "cta") {
    return (
      <div className={CTA_ROW}>
        <Button onClick={() => setStage("form")}>{copy.register}</Button>
        <span className="text-[14px] text-muted">{copy.free}</span>
      </div>
    );
  }

  if (stage === "form" || stage === "submitting") {
    return (
      <form onSubmit={submit}>
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
        <div className="mb-[1.1rem] max-w-[420px]">
          <Turnstile
            key={turnstileKey}
            action="event_registration"
            onChange={setTurnstileToken}
          />
        </div>
        {error && (
          <p className="mb-3 text-[14px] font-semibold text-red-700" role="alert">
            {error}
          </p>
        )}
        <div className={CTA_ROW}>
          <Button type="submit" disabled={!turnstileToken || stage === "submitting"}>
            {stage === "submitting" ? copy.submitting : copy.submit}
          </Button>
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
