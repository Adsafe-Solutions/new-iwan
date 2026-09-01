import { useEffect, useMemo, useRef, useState } from "react";
import { IconCheck } from "@tabler/icons-react";
import Button from "../Button/Button.jsx";
import Turnstile, { TURNSTILE_ENABLED } from "../Turnstile/Turnstile.jsx";
import { Question, blankAnswers } from "../FormFields/FormFields.jsx";
import { useCopy, useCountry } from "../../content/ContentProvider.jsx";
import { useCms } from "../../hooks/useCms.js";
import { CMS_ENABLED } from "../../content/cms.js";
import { applyCareer, applyVolunteer } from "../../lib/forms.js";
import { APPLY_FALLBACK_FIELDS } from "../../content/base/apply.js";

/* The volunteer and career forms.

   ⚠ THE CMS IS THE PAGE. Questions and words both come from whichever form an
   editor has made live, and nothing here merges site copy in underneath — what
   they see in the builder is what a visitor gets.

   Two states this has to render honestly: no form live (the page says it is not
   taking applications, rather than inventing one), and the CMS switched off
   entirely, where the built-in list keeps the page working. */
export default function ApplyForm({ kind, copy, onReady }) {
  const [country] = useCountry();
  const modal = useCopy().eventModal;

  /* ⚠ Per country — the CMS resolves exact country → global → its defaults, so
     the site asks for one answer rather than reconciling two. */
  const { data, ready } = useCms(`/api/apply-forms/${kind}?country=${country.code}`, {
    enabled: CMS_ENABLED,
  });

  /* ⚠ `active: false` is a real answer, not a missing one — an editor has
     nothing live for this country. Only a switched-off CMS falls back. */
  const closed = CMS_ENABLED && ready && data?.active === false;

  const fields = useMemo(
    () => (data?.fields?.length ? data.fields : APPLY_FALLBACK_FIELDS[kind]),
    [data, kind]
  );

  const [answers, setAnswers] = useState(() => blankAnswers(APPLY_FALLBACK_FIELDS[kind]));
  const [subscribe, setSubscribe] = useState(true);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [sent, setSent] = useState(false);
  const doneRef = useRef(null);

  /* ⚠ Reset when the QUESTIONS change, not on every render — the CMS list
     arrives after the first paint, and keeping the fallback's keys would post
     answers to questions the form no longer asks. */
  useEffect(() => {
    setAnswers(blankAnswers(fields));
  }, [fields]);

  /* ⚠ The page's scroll animations scan the DOM once, so a page that fetches
     has to tell them when its content has landed — see CLAUDE.md. */
  useEffect(() => {
    onReady?.(ready, data);
  }, [ready, data, onReady]);

  /* The confirmation replaces a form that may be a screen down the page, so
     without this it lands off-screen and the submit reads as having done
     nothing. Focus moves with it for the same reason. */
  useEffect(() => {
    if (!sent) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    doneRef.current?.focus();
  }, [sent]);

  /* ⚠ CMS first and site second, and the site half only ever applies with the
     CMS off — `data` is null then. With it on, an empty value is an empty value
     on the page, which is what "the CMS is the page" means. */
  const say = (key) => (data ? (data[key] ?? "") : copy[key]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setFailed("");
    setFieldErrors({});

    const send = kind === "career" ? applyCareer : applyVolunteer;

    try {
      await send({ answers, subscribe }, { country: country.code });
      setSent(true);
    } catch (err) {
      setFailed(err.message);
      setFieldErrors(err.fields ?? {});
    } finally {
      setSending(false);
    }
  };

  if (closed) {
    return (
      <div className="rounded-2xl border border-line bg-mist p-8">
        <h2 className="mb-2 text-[22px] font-extrabold leading-[1.2]">
          {copy.closedHeading}
        </h2>
        <p className="text-[16px] leading-[25px] text-muted">{copy.closedBody}</p>
      </div>
    );
  }

  if (sent) {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-line bg-mist p-8 outline-none"
      >
        <span className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-primary text-white">
          <IconCheck className="h-6 w-6" stroke={2.4} aria-hidden="true" />
        </span>
        <h2 className="mb-2 text-[22px] font-extrabold leading-[1.2]">
          {say("doneHeading")}
        </h2>
        <p className="text-[16px] leading-[25px] text-muted">{say("doneBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      {data?.intro && (
        <p className="mb-6 max-w-[68ch] text-[16px] leading-[26px] text-muted">
          {data.intro}
        </p>
      )}

      {/* Freezes every control while the request is out, so a second Enter
          cannot send a duplicate. `display: contents` keeps it out of the
          layout. */}
      <fieldset disabled={sending} className="contents">
        <div className="mb-5 flex flex-col gap-[1.1rem]">
          {fields.map((field) => (
            <Question
              key={field.key}
              field={field}
              value={answers[field.key]}
              error={fieldErrors[field.key]}
              onChange={(value) =>
                setAnswers((prev) => ({ ...prev, [field.key]: value }))
              }
              copy={modal}
            />
          ))}
        </div>

        <label className="mb-5 flex cursor-pointer items-start gap-2.5 text-[14px] leading-[21px] text-ink-2">
          <input
            type="checkbox"
            checked={subscribe}
            onChange={(e) => setSubscribe(e.target.checked)}
            className="mt-[3px] h-4 w-4 flex-none cursor-pointer accent-primary"
          />
          {say("subscribeLabel")}
        </label>

        {TURNSTILE_ENABLED && (
          <div className="mb-5 max-w-[420px]">
            <Turnstile action={`${kind}_application`} onChange={setTurnstileToken} />
          </div>
        )}

        {failed && (
          <p role="alert" className="mb-4 text-[14px] font-semibold text-red">
            {failed}
          </p>
        )}

        <Button
          type="submit"
          disabled={(TURNSTILE_ENABLED && !turnstileToken) || sending}
        >
          {sending ? copy.sending : say("submitLabel") || copy.submit}
        </Button>
      </fieldset>
    </form>
  );
}
