import { useState } from "react";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import Button from "../../components/Button/Button.jsx";
import Icon from "../../components/Icon/Icon.jsx";
import { useBrand, useContact } from "../../content/ContentProvider.jsx";
import { submitContact } from "../../lib/contact.js";
import { fill } from "../../lib/fill.js";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B } from "../../lib/type.js";
import Turnstile from "../../components/Turnstile/Turnstile.jsx";

const CONTAINER = "mx-auto w-full max-w-container px-6";

const FIELD = cx(
  "rounded border border-line px-[0.9rem] py-3 text-[15px] text-ink [font-family:inherit]",
  "focus:border-primary focus:outline-none"
);
const LABEL = "flex flex-col gap-[0.35rem] text-[13px] font-bold text-muted";

/* the stored number is digits only, for wa.me — tel: wants it back with a + */
const dial = (digits = "") => `+${digits}`;

function Detail({ icon: Glyph, label, value, href }) {
  const body = (
    <>
      <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-white/[0.12] text-accent">
        <Glyph className="h-[18px] w-[18px]" stroke={2} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/55">
          {label}
        </span>
        <span className="block break-words text-[16px] font-bold leading-[1.45] text-white">
          {value}
        </span>
      </span>
    </>
  );

  return href ? (
    <a
      href={href}
      className="flex items-start gap-4 transition-opacity duration-200 hover:opacity-80"
    >
      {body}
    </a>
  ) : (
    <div className="flex items-start gap-4">{body}</div>
  );
}

export default function ContactPage() {
  const copy = useContact();
  const BRAND = useBrand();
  useScrollAnimations();

  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await submitContact({ to: BRAND.email, name, email, subject, message });
    setSent(true);
  };

  return (
    <main>
      <section className="bg-mist pb-10 pt-[clamp(2.25rem,5vw,3.25rem)]">
        <div className={CONTAINER}>
          <p className="reveal mb-3 text-[12px] font-bold uppercase leading-4 tracking-[0.16em] text-primary">
            {copy.eyebrow}
          </p>
          <h1 className={cx(KICKER, "reveal !mb-4 !text-[clamp(1.9rem,4vw,44px)]")}>
            {copy.heading} <span className={MARK_B}>{copy.mark}</span>
          </h1>
          <p className="reveal max-w-[58ch] text-[17px] leading-[27px] text-muted">
            {copy.body}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className={CONTAINER}>
          {/* one card, two halves: the details on a dark panel, the form on
              white beside it, so the page reads as a single object */}
          <div className="reveal grid grid-cols-[0.85fr_1.15fr] overflow-hidden rounded-2xl border border-line max-nav:grid-cols-1">
            <div className="flex flex-col justify-between gap-10 bg-primary-800 p-9 max-phone:p-7">
              <div>
                <h2 className="mb-3 text-[24px] font-black uppercase leading-[1.15] tracking-[-0.01em] text-white">
                  {copy.panelHeading}
                </h2>
                <p className="max-w-[38ch] text-[15px] leading-[25px] text-white/70">
                  {copy.panelBody}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <Detail
                  icon={IconMail}
                  label={copy.emailLabel}
                  value={BRAND.email}
                  href={`mailto:${BRAND.email}`}
                />
                {BRAND.whatsapp && (
                  <Detail
                    icon={IconPhone}
                    label={copy.phoneLabel}
                    value={dial(BRAND.whatsapp)}
                    href={`tel:${dial(BRAND.whatsapp)}`}
                  />
                )}
                <Detail
                  icon={IconMapPin}
                  label={copy.addressLabel}
                  value={BRAND.address}
                />
              </div>

              {/* the four accounts, which until now appeared nowhere on the site */}
              {BRAND.socials?.length > 0 && (
                <div className="border-t border-white/15 pt-6">
                  <span className="mb-3 block text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/55">
                    {copy.followLabel}
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {BRAND.socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={s.label}
                        className={cx(
                          "grid h-11 w-11 place-items-center rounded-full",
                          "bg-white/[0.12] text-white transition-colors duration-200",
                          "hover:bg-accent hover:text-ink"
                        )}
                      >
                        <Icon name={s.icon} className="h-[19px] w-[19px]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-9 max-phone:p-7">
              <h2 className="mb-6 text-[22px] font-black uppercase leading-[1.2] tracking-[-0.01em]">
                {copy.form.heading}
              </h2>

              {sent ? (
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
                      {fill(copy.form.doneHeading, {
                        name: name ? `, ${name.split(" ")[0]}` : "",
                      })}
                    </strong>
                    <p className="text-[15px] leading-[23px] text-ink-2">
                      {copy.form.doneBody}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <div className="mb-4 grid grid-cols-2 gap-4 max-phone:grid-cols-1">
                    <label className={LABEL}>
                      {copy.form.nameLabel}
                      <input
                        className={FIELD}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={copy.form.namePlaceholder}
                        autoComplete="name"
                        required
                      />
                    </label>
                    <label className={LABEL}>
                      {copy.form.emailLabel}
                      <input
                        className={FIELD}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={copy.form.emailPlaceholder}
                        autoComplete="email"
                        required
                      />
                    </label>
                  </div>

                  <label className={cx(LABEL, "mb-4")}>
                    {copy.form.subjectLabel}
                    <input
                      className={FIELD}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={copy.form.subjectPlaceholder}
                      required
                    />
                  </label>

                  <label className={cx(LABEL, "mb-5")}>
                    <span>
                      {copy.form.messageLabel}{" "}
                      <span className="font-semibold normal-case opacity-70">
                        ({copy.form.messageOptional})
                      </span>
                    </span>
                    <textarea
                      className={cx(FIELD, "min-h-[132px] resize-y")}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={copy.form.messagePlaceholder}
                    />
                  </label>

                  <div className="mb-5 max-w-[420px]">
                    <Turnstile action="contact" onChange={setTurnstileToken} />
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <Button type="submit" disabled={!turnstileToken}>
                      {copy.form.submit}
                    </Button>
                    <span className="text-[13px] leading-[20px] text-muted">
                      {copy.form.note}
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
