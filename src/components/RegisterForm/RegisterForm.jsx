import { useMemo, useState } from "react";
import Button from "../Button/Button.jsx";
import { useCopy, useCountry } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { longDate } from "../../lib/events.js";
import { cx } from "../../lib/cx.js";
import { Question, blankAnswers } from "../FormFields/FormFields.jsx";
import Turnstile, { TURNSTILE_ENABLED } from "../Turnstile/Turnstile.jsx";
import { CMS_ENABLED, CMS_URL } from "../../content/cms.js";

/* cta → form → done, shared by the homepage modal and an event's own page so
   the two cannot drift.

   ⚠ The QUESTIONS come from the event, not from here. Each event carries its
   own `form` built in the CMS — a fishing trip asks about licences and gear, a
   kids' morning asks about allergies — so this component renders whatever it is
   given rather than knowing any of it. The only thing hard-coded is the
   furniture: the button, the errors, the confirmation.

   ⚠ With the CMS switched off there is no form to render and nothing to post
   to, so it falls back to the old name-and-email flow, which submits nowhere.
   That path goes when the static events do. */

const CTA_ROW = "flex flex-wrap items-center gap-[0.9rem]";

export default function RegisterForm({ event, locale = "en-GB", heading = true }) {
  const copy = useCopy().eventModal;
  const [country] = useCountry();

  const fields = event.form ?? [];
  /* Only a CMS-backed event can actually be submitted — a static one has no
     form and there is nowhere to send it. */
  const live = CMS_ENABLED && fields.length > 0;

  const [stage, setStage] = useState("cta");
  const [values, setValues] = useState(() => blankAnswers(fields));
  const [errors, setErrors] = useState({});
  const [banner, setBanner] = useState(null);
  const [sending, setSending] = useState(false);
  /* Ticked by default, on every event. ⚠ Sent beside the answers rather than
     as one of them — the API validates answers against the event's own form
     and drops any key it does not define. */
  const [subscribe, setSubscribe] = useState(true);
  const [turnstileToken, setTurnstileToken] = useState("");

  /* The name typed in, for the confirmation line — whichever question happens
     to be the name one. */
  const firstName = useMemo(() => {
    const nameField = fields.find((f) => f.type === "name");
    const value = nameField ? values[nameField.key] : null;
    return value?.first?.trim() ?? "";
  }, [fields, values]);

  const set = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    /* Clear the server's complaint the moment the answer is touched — leaving
       it while someone fixes it reads as "still wrong". */
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!live) {
      /* The pre-CMS path: no form to send, so the flow ends here as it always
         did. */
      setStage("done");
      return;
    }

    setSending(true);
    setErrors({});
    setBanner(null);

    try {
      const res = await fetch(
        `${CMS_URL}/api/events/${event.id}/register?country=${country.code}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ answers: values, subscribe }),
        }
      );

      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        /* The API reports which answers are wrong; show each against its own
           question rather than one banner saying "something is wrong". */
        const details = payload?.details ?? [];
        const byField = Object.fromEntries(details.map((d) => [d.field, d.message]));
        setErrors(byField);
        setBanner(
          Object.keys(byField).length ? copy.fixBelow : (payload?.error ?? copy.failed)
        );
        return;
      }

      setStage("done");
    } catch {
      /* A network failure, not a rejection — say so, because "check the form"
         would be wrong advice. */
      setBanner(copy.offline);
    } finally {
      setSending(false);
    }
  };

  if (stage === "cta") {
    return (
      <div className={CTA_ROW}>
        <Button
          onClick={() => {
            setValues(blankAnswers(fields));
            setErrors({});
            setBanner(null);
            setStage("form");
          }}
        >
          {copy.register}
        </Button>
        <span className="text-[14px] text-muted">{copy.free}</span>
      </div>
    );
  }

  if (stage === "form") {
    return (
      <form onSubmit={submit} noValidate>
        {heading && (
          <span className="mb-4 block text-[16px] font-bold">{copy.formHeading}</span>
        )}

        {banner && (
          <p
            role="alert"
            className="mb-4 rounded border border-red/30 bg-red/[0.08] px-4 py-3 text-[14px] font-semibold text-red"
          >
            {banner}
          </p>
        )}

        <div className="mb-[1.1rem] flex flex-col gap-[1.1rem]">
          {live ? (
            fields.map((field) => (
              <Question
                key={field.key}
                field={field}
                value={values[field.key]}
                error={errors[field.key]}
                onChange={(v) => set(field.key, v)}
                copy={copy}
              />
            ))
          ) : (
            /* ⚠ The pre-CMS fallback: two boxes that go nowhere, exactly as
               before. Rendered only when the event carries no form. */
            <>
              <Question
                field={{
                  key: "name",
                  type: "name",
                  label: copy.nameLabel,
                  required: true,
                }}
                value={values.name ?? { first: "", last: "" }}
                onChange={(v) => set("name", v)}
                copy={copy}
              />
              <Question
                field={{
                  key: "email",
                  type: "email",
                  label: copy.emailLabel,
                  placeholder: copy.emailPlaceholder,
                  required: true,
                }}
                value={values.email ?? ""}
                onChange={(v) => set("email", v)}
                copy={copy}
              />
            </>
          )}
        </div>

        <label className="mb-[1.1rem] flex cursor-pointer items-start gap-2.5 text-[14px] leading-[21px] text-ink-2">
          <input
            type="checkbox"
            checked={subscribe}
            onChange={(e) => setSubscribe(e.target.checked)}
            className="mt-[3px] h-4 w-4 flex-none cursor-pointer accent-primary"
          />
          {copy.subscribeLabel}
        </label>

        {/* ⚠ Rendered only when a site key exists. Without one the widget draws
            nothing and issues no token, and gating the button below on a token
            that can never arrive made the form permanently unsubmittable. */}
        {TURNSTILE_ENABLED && (
          <div className="mb-[1.1rem] max-w-[420px]">
            <Turnstile action="event_registration" onChange={setTurnstileToken} />
          </div>
        )}

        <div className={CTA_ROW}>
          {/* ⚠ Only waits for a Turnstile token when Turnstile is actually
              configured — see TURNSTILE_ENABLED. And no `loading` prop: this
              site's Button does not have one (the CMS admin's does), and an
              unknown prop is spread onto the <button>, which React warns
              about. Disabled plus a changed label says the same thing. */}
          <Button
            type="submit"
            disabled={sending || (TURNSTILE_ENABLED && !turnstileToken)}
          >
            {sending ? copy.sending : copy.submit}
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
          {fill(copy.doneHeading, { name: firstName ? `, ${firstName}` : "" })}
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
