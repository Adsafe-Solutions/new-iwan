import { Link } from "react-router-dom";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import ContactCta from "../../components/ContactCta/ContactCta.jsx";
import { useBrand } from "../../content/ContentProvider.jsx";
import { LEGAL, LEGAL_DETAILS } from "../../content/base/legal.js";
import { cx } from "../../lib/cx.js";
import { KICKER } from "../../lib/type.js";

const CONTAINER = "mx-auto w-full max-w-container px-6";
const BODY = "text-[17px] leading-[28px] text-ink-2";

export default function Legal({ kind }) {
  const copy = LEGAL[kind];
  const BRAND = useBrand();
  useScrollAnimations();

  return (
    <main>
      <section className="bg-mist pb-10 pt-[clamp(2.25rem,5vw,3.25rem)]">
        <div className={CONTAINER}>
          <h1 className={cx(KICKER, "reveal !mb-4 !text-[clamp(1.9rem,4vw,44px)]")}>
            {copy.title}
          </h1>
          <p className={cx("reveal max-w-[68ch]", BODY)}>{copy.intro}</p>
          <p className="reveal mt-4 text-[14px] text-muted">
            Last updated: {LEGAL_DETAILS.lastUpdated}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className={cx(CONTAINER, "mx-auto max-w-[760px]")}>
          {copy.sections.map((section) => (
            <div key={section.heading} className="reveal mb-9 last:mb-0">
              <h2 className="mb-3 text-[20px] font-extrabold leading-[1.25] tracking-[-0.01em]">
                {section.heading}
              </h2>
              <p className={BODY}>{section.body}</p>

              {section.list && (
                <ul className="mt-3 flex flex-col gap-2">
                  {section.list.map((item) => (
                    <li key={item} className={cx("flex gap-3", BODY)}>
                      <span
                        aria-hidden="true"
                        className="mt-[11px] h-1.5 w-1.5 flex-none rounded-full bg-primary"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="reveal mt-10 border-t border-line pt-6">
            <h2 className="mb-3 text-[20px] font-extrabold leading-[1.25]">
              How to reach us
            </h2>
            <p className={BODY}>
              Email{" "}
              <a
                href={`mailto:${BRAND.email}`}
                className="font-bold text-primary underline"
              >
                {BRAND.email}
              </a>{" "}
              or use the{" "}
              <Link to="/contact-us" className="font-bold text-primary underline">
                contact page
              </Link>
              . Our postal address is {LEGAL_DETAILS.postalAddress}, and these terms are
              governed by the law of {LEGAL_DETAILS.governingLaw}.
            </p>
          </div>
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
