import { useState } from "react";
import { Link } from "react-router-dom";
import { useBrand, useCopy, useNav, useCountry } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { cx } from "../../lib/cx.js";
import { subscribe } from "../../lib/forms.js";
import { flatten, subscribeSchema } from "../../lib/validate.js";
import Icon from "../Icon/Icon.jsx";
import Turnstile, { TURNSTILE_ENABLED } from "../Turnstile/Turnstile.jsx";

const FINE_LINK = "underline transition-opacity duration-200 hover:opacity-65";
const SOCIAL_ICON = cx(
  "grid h-10 w-10 place-items-center rounded-full bg-ink/10 text-ink",
  "transition-colors duration-200 hover:bg-primary-800 hover:text-white"
);

export default function Footer() {
  const [turnstileToken, setTurnstileToken] = useState("");
  const [email, setEmail] = useState("");
  /* "idle" | "sending" | "done" | "failed" — one value rather than three
     booleans that can disagree with each other. */
  const [state, setState] = useState("idle");
  const [failed, setFailed] = useState("");

  const onSubscribe = async (e) => {
    e.preventDefault();

    /* The client-side mirror of the API's schema — the native type="email"
       check still runs first, this catches what it lets through and words
       the complaint the way the server would. */
    const checked = flatten(subscribeSchema.safeParse({ email }));
    if (!checked.ok) {
      setFailed(checked.fields.email);
      setState("failed");
      return;
    }

    setState("sending");
    try {
      await subscribe(checked.data.email, { country: country.code });
      setEmail("");
      setState("done");
    } catch (err) {
      setFailed(err.message);
      setState("failed");
    }
  };
  const BRAND = useBrand();
  const copy = useCopy().footer;
  const [country] = useCountry();
  /* both read off content the country already resolves — a country with
     fewer programmes or its own social accounts shows exactly that here
     too, the same way TakeAction and the header nav do. */
  const { programmesGroup, pages } = useNav();
  const programmes = pages.filter((p) => p.group === programmesGroup);
  const MARK_NAME = BRAND.name;
  const MARK_TLD = BRAND.fullName.slice(BRAND.name.length);

  const handleSubscribe = async (event) => {
    event.preventDefault();
    if (!turnstileToken || status === "submitting") return;

    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          region: country.code.toUpperCase(),
          turnstileToken,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Subscription failed.");

      setEmail("");
      setStatus("success");
      setMessage(copy.subscribeSuccess);
    } catch (error) {
      setStatus("error");
      setMessage(error.message || copy.subscribeError);
    } finally {
      setTurnstileToken("");
      setTurnstileKey((key) => key + 1);
    }
  };

  return (
    <footer className="overflow-hidden bg-footer text-ink">
      {/* Wider than the container so the wordmark runs near the full viewport.
          The deep bottom padding keeps the legal row clear of the fixed
          theme-switcher FAB. */}
      <div className="px-8 pb-[4.5rem] pt-[3.5rem] max-phone:px-5 max-phone:pb-20 max-phone:pt-[2.6rem]">
        <div className="flex flex-wrap items-start gap-x-10 gap-y-12 max-phone:gap-8">
          <div>
            <p className="mb-2 font-inter text-[22px] font-extrabold tracking-[-0.01em]">
              {BRAND.fullName}
            </p>
            <p className="mb-5 max-w-[46ch] text-[14px] leading-[21px]">{copy.blurb}</p>

            {BRAND.socials?.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {BRAND.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className={SOCIAL_ICON}
                  >
                    <Icon name={s.icon} className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {programmes.length > 0 && (
            <div>
              <h4 className="mb-[0.9rem] text-[15px] font-bold">
                {copy.programmesHeading}
              </h4>
              <ul className="flex flex-col gap-3">
                {programmes.map((p) => (
                  <li key={p.path}>
                    <Link
                      to={p.path}
                      className="group inline-flex items-center gap-2.5 text-[14px] font-semibold"
                    >
                      {/* the programme's own colour, same as everywhere else
                          it's named — a plain text list otherwise carries no
                          brand identity at all */}
                      <span
                        className={cx(
                          "h-2 w-2 flex-none rounded-full transition-transform duration-200",
                          "group-hover:scale-125",
                          p.tone
                        )}
                        aria-hidden="true"
                      />
                      <span className="transition-opacity duration-200 group-hover:opacity-65">
                        {p.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ml-auto only once all three columns actually fit on one line — the
              row needs ~1233px for that, which is what the `wide` screen is.
              Below it the block wraps onto its own row, where pushing it right
              would leave it hanging out of line with the columns above. */}
          <div className="w-[min(560px,100%)] wide:ml-auto">
            <h4 className="mb-[0.7rem] text-[15px] font-bold">{copy.subscribeHeading}</h4>
            <form onSubmit={onSubscribe}>
              <div
                className={cx(
                  "flex items-center gap-[0.4rem] rounded-full border border-ink/45 bg-transparent",
                  "py-1 pl-5 pr-1 transition-colors duration-[250ms] focus-within:border-primary-800"
                )}
              >
                <input
                  className={cx(
                    "min-w-0 flex-1 border-0 bg-transparent py-[0.7rem] text-[15px] text-ink",
                    "[font-family:inherit] placeholder:text-ink/60 focus:outline-none"
                  )}
                  type="email"
                  maxLength={200}
                  placeholder={copy.emailPlaceholder}
                  aria-label={copy.emailLabel}
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button
                  className={cx(
                    "flex-none cursor-pointer rounded-full border-0 bg-primary-800 px-[1.6rem] py-3",
                    "text-[15px] font-semibold text-white [font-family:inherit] disabled:cursor-not-allowed disabled:opacity-50",
                    "transition-colors duration-[250ms] hover:bg-primary"
                  )}
                  type="submit"
                  /* ⚠ Only waits for a token when Turnstile is actually
                     configured — the same guard RegisterForm carries. Without
                     a sitekey the widget issues no token, and gating on one
                     that can never arrive left this button dead forever. */
                  disabled={(TURNSTILE_ENABLED && !turnstileToken) || state === "sending"}
                >
                  {status === "submitting" ? copy.subscribing : copy.subscribe}
                </button>
              </div>
              {TURNSTILE_ENABLED && (
                <div className="mt-3 max-w-[420px]">
                  <Turnstile action="newsletter_signup" onChange={setTurnstileToken} />
                </div>
              )}
            </form>
            {state === "done" && (
              <p role="status" className="mt-[0.7rem] text-[14px] font-semibold">
                {copy.subscribeDone}
              </p>
            )}
            {state === "failed" && (
              <p role="alert" className="mt-[0.7rem] text-[14px] font-semibold text-red">
                {failed}
              </p>
            )}
            <p className="mt-[0.7rem] max-w-[62ch] text-[14px] leading-[21px]">
              {fill(copy.consent, { name: BRAND.name })}{" "}
              <Link to="/privacy-policy" className={FINE_LINK}>
                {copy.privacy}
              </Link>
            </p>
          </div>
        </div>

        {/* textLength spans the wordmark to the full width at any viewport —
            no breakpoints involved */}
        <svg
          className="my-[2.2rem] mb-[1.4rem] block h-auto w-full font-inter font-bold"
          viewBox="0 0 1000 200"
          role="img"
          aria-label={BRAND.fullName}
          focusable="false"
        >
          {/* both tspans share the text baseline, so the smaller tld sits on it */}
          <text x="0" y="165" textLength="1000" lengthAdjust="spacing">
            <tspan className="fill-white text-[213px] font-black tracking-[-0.03em]">
              {MARK_NAME}
            </tspan>
            <tspan className="fill-primary-800 text-[89px] font-semibold">
              {MARK_TLD}
            </tspan>
          </text>
        </svg>

        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-ink/20 pt-[1.4rem]">
          <div className="flex gap-8 text-[14px] max-phone:gap-[1.2rem]">
            <Link to="/privacy-policy" className={FINE_LINK}>
              {copy.privacy}
            </Link>
            <Link to="/terms" className={FINE_LINK}>
              {copy.terms}
            </Link>
          </div>
          <p className="text-[14px] leading-[21px]">
            © {new Date().getFullYear()} {BRAND.fullName}. {copy.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
