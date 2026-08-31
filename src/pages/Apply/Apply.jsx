import { useCallback, useState } from "react";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import ApplyForm from "../../components/ApplyForm/ApplyForm.jsx";
import ContactCta from "../../components/ContactCta/ContactCta.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B } from "../../lib/type.js";

const CONTAINER = "mx-auto w-full max-w-container px-6";

/* /volunteer and /careers — one page for both, since they differ only in their
   questions and their copy. `kind` picks which. */
export default function Apply({ kind }) {
  /* ⚠ The form fetches its questions, so the animations must wait for them —
     GSAP scans once, and anything arriving later is stranded at opacity 0. */
  const [ready, setReady] = useState(false);
  /* The CMS copy for this page, handed up by the form that fetched it — one
     request rather than two for the same document. */
  const [cms, setCms] = useState(null);
  useScrollAnimations(ready);

  /* Stable, so the effect that reports readiness does not re-run every render. */
  const onReady = useCallback((value, payload) => {
    setReady(value);
    setCms(payload ?? null);
  }, []);

  /* ⚠ The CMS is the page. There is no site copy underneath it — an empty
     heading there is an empty heading here, which is what lets an editor trust
     the builder. */
  const say = (key) => cms?.[key] ?? "";

  return (
    <main>
      {/* ⚠ Only when there IS a form. Every word of this band comes from the
          CMS, so with none live it would be a mist-coloured strip around an
          empty <h1> — ApplyForm's "not right now" panel carries the page on
          its own. */}
      {cms && (
        <section className="bg-mist pb-10 pt-[clamp(2.25rem,5vw,3.25rem)]">
          <div className={CONTAINER}>
            <p className="reveal mb-3 text-[12px] font-bold uppercase leading-4 tracking-[0.16em] text-primary">
              {say("eyebrow")}
            </p>
            <h1 className={cx(KICKER, "reveal !mb-4 !text-[clamp(1.9rem,4vw,44px)]")}>
              {say("heading")} <span className={MARK_B}>{say("mark")}</span>
            </h1>
            <p className="reveal max-w-[68ch] text-[17px] leading-[27px] text-muted">
              {say("intro")}
            </p>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className={cx(CONTAINER, "mx-auto max-w-[760px]")}>
          {cms && (
            <h2 className="reveal mb-6 text-[13px] font-extrabold uppercase tracking-[0.14em] text-primary">
              {say("formHeading")}
            </h2>
          )}
          <div className="reveal">
            <ApplyForm kind={kind} onReady={onReady} />
          </div>
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
