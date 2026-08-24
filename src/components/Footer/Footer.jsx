import { useState } from "react";
import { Link } from "react-router-dom";
import { useBrand, useCopy } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { cx } from "../../lib/cx.js";
import Turnstile from "../Turnstile/Turnstile.jsx";

const FINE_LINK = "underline transition-opacity duration-200 hover:opacity-65";

export default function Footer() {
  const [turnstileToken, setTurnstileToken] = useState("");
  const BRAND = useBrand();
  const copy = useCopy().footer;
  const MARK_NAME = BRAND.name;
  const MARK_TLD = BRAND.fullName.slice(BRAND.name.length);

  return (
    <footer className="overflow-hidden bg-footer text-ink">
      {/* Wider than the container so the wordmark runs near the full viewport.
          The deep bottom padding keeps the legal row clear of the fixed
          theme-switcher FAB. */}
      <div className="px-8 pb-[4.5rem] pt-[3.5rem] max-phone:px-5 max-phone:pb-20 max-phone:pt-[2.6rem]">
        <div className="flex flex-wrap items-start justify-between gap-12 max-phone:gap-8">
          <div>
            <p className="mb-2 font-inter text-[22px] font-extrabold tracking-[-0.01em]">
              {BRAND.fullName}
            </p>
            <p className="max-w-[46ch] text-[14px] leading-[21px]">{copy.blurb}</p>
          </div>

          <div className="w-[min(560px,100%)]">
            <h4 className="mb-[0.7rem] text-[15px] font-bold">{copy.subscribeHeading}</h4>
            <form onSubmit={(e) => e.preventDefault()}>
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
                  placeholder={copy.emailPlaceholder}
                  aria-label={copy.emailLabel}
                  required
                />
                <button
                  className={cx(
                    "flex-none cursor-pointer rounded-full border-0 bg-primary-800 px-[1.6rem] py-3",
                    "text-[15px] font-semibold text-white [font-family:inherit] disabled:cursor-not-allowed disabled:opacity-50",
                    "transition-colors duration-[250ms] hover:bg-primary"
                  )}
                  type="submit"
                  disabled={!turnstileToken}
                >
                  {copy.subscribe}
                </button>
              </div>
              <div className="mt-3 max-w-[420px]">
                <Turnstile action="newsletter_signup" onChange={setTurnstileToken} />
              </div>
            </form>
            <p className="mt-[0.7rem] max-w-[62ch] text-[14px] leading-[21px]">
              {fill(copy.consent, { name: BRAND.name })}{" "}
              <Link to="/" className={FINE_LINK}>
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
            <Link to="/" className={FINE_LINK}>
              {copy.privacy}
            </Link>
            <Link to="/" className={FINE_LINK}>
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
