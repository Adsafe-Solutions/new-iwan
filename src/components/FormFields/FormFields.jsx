import { cx } from "../../lib/cx.js";
import { phoneClean } from "../../lib/validate.js";

/* One question, and the shapes around it. Shared by the event registration form
   and the volunteer/career forms — both render a field list the CMS owns, so
   both need the same renderer or the two drift apart on the day someone adds a
   field type to one of them. */

const FIELD = cx(
  "w-full rounded border border-line bg-white px-[0.9rem] py-3 text-[15px] text-ink",
  "[font-family:inherit] transition-colors duration-200",
  "placeholder:text-muted/70 focus:border-primary focus:outline-none"
);
const FIELD_INVALID = "!border-red";
const LABEL = "mb-[0.4rem] block text-[14px] font-bold text-ink";
const HELP = "mt-[0.35rem] block text-[13px] text-muted";
const ERROR = "mt-[0.35rem] block text-[13px] font-semibold text-red";

/* An empty answer, per type. ⚠ The shape has to match what the API expects for
   that type — see validators/registration.js there. A name is an object, a
   checkbox list is an array, and a consent is a boolean; sending "" for any of
   them would be rejected. */
export const emptyFor = (type) => {
  if (type === "name") return { first: "", last: "" };
  if (type === "checkboxes") return [];
  if (type === "consent") return false;
  return "";
};

export const blankAnswers = (fields) =>
  Object.fromEntries(fields.map((f) => [f.key, emptyFor(f.type)]));

/* One question. Deliberately dumb: it renders what the field says and reports
   changes upward, so the whole form has one source of truth for its values. */
export function Question({ field, value, error, onChange, copy }) {
  const id = `f-${field.key}`;
  const describedBy = cx(field.help && `${id}-help`, error && `${id}-error`);

  const common = {
    id,
    name: field.key,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy || undefined,
    className: cx(FIELD, error && FIELD_INVALID),
  };

  const legend = (
    <span className={LABEL}>
      {field.label}
      {field.required && (
        <span className="ml-1 text-red" aria-label={copy.required}>
          *
        </span>
      )}
    </span>
  );

  const trailer = (
    <>
      {field.help && !error && (
        <span id={`${id}-help`} className={HELP}>
          {field.help}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} className={ERROR} role="alert">
          {error}
        </span>
      )}
    </>
  );

  /* ── the composite one ── */
  if (field.type === "name") {
    return (
      <fieldset className="border-0 p-0">
        <legend className="p-0">{legend}</legend>
        <div className="flex flex-wrap gap-[0.9rem]">
          {["first", "last"].map((part) => (
            <span key={part} className="flex flex-[1_1_180px] flex-col">
              <input
                {...common}
                id={`${id}-${part}`}
                name={`${field.key}.${part}`}
                autoComplete={part === "first" ? "given-name" : "family-name"}
                maxLength={300}
                placeholder={part === "first" ? copy.firstName : copy.lastName}
                value={value?.[part] ?? ""}
                onChange={(e) => onChange({ ...value, [part]: e.target.value })}
              />
              <span className={HELP}>
                {part === "first" ? copy.firstName : copy.lastName}
              </span>
            </span>
          ))}
        </div>
        {trailer}
      </fieldset>
    );
  }

  /* ── the ones that are a list of choices ── */
  if (field.type === "radio" || field.type === "checkboxes") {
    const many = field.type === "checkboxes";
    return (
      <fieldset className="border-0 p-0">
        <legend className="p-0">{legend}</legend>
        <div className="flex flex-col gap-[0.55rem]">
          {(field.options ?? []).map((option) => {
            const checked = many ? (value ?? []).includes(option) : value === option;
            return (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-3 text-[15px] text-ink"
              >
                <input
                  type={many ? "checkbox" : "radio"}
                  name={field.key}
                  value={option}
                  checked={checked}
                  onChange={() => {
                    if (!many) return onChange(option);
                    const list = value ?? [];
                    return onChange(
                      checked ? list.filter((v) => v !== option) : [...list, option]
                    );
                  }}
                  className="h-[18px] w-[18px] flex-none accent-primary"
                />
                {option}
              </label>
            );
          })}
        </div>
        {trailer}
      </fieldset>
    );
  }

  if (field.type === "consent") {
    return (
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[15px] text-ink">
          <input
            type="checkbox"
            id={id}
            name={field.key}
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy || undefined}
            className="mt-[3px] h-[18px] w-[18px] flex-none accent-primary"
          />
          <span>
            {field.label}
            {/* ⚠ Always required, whatever the field says — the API enforces
                the same rule. An agreement nobody has to give is not one. */}
            <span className="ml-1 text-red" aria-label={copy.required}>
              *
            </span>
          </span>
        </label>
        {trailer}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <label htmlFor={id} className="block">
        {legend}
        <select
          {...common}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{copy.choosePlaceholder}</option>
          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {trailer}
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label htmlFor={id} className="block">
        {legend}
        <textarea
          {...common}
          rows={4}
          maxLength={2000}
          value={value ?? ""}
          placeholder={field.placeholder || copy.answerPlaceholder}
          onChange={(e) => onChange(e.target.value)}
          className={cx(common.className, "resize-y leading-[1.6]")}
        />
        {trailer}
      </label>
    );
  }

  /* ── everything that is one box ── */
  const TYPE = { email: "email", phone: "tel", number: "number", date: "date" };
  const AUTO = { email: "email", phone: "tel" };
  const phone = field.type === "phone";
  /* The builder's own placeholder wins; these fill in when it was left empty. */
  const FALLBACK = {
    email: copy.emailPlaceholder,
    phone: copy.phonePlaceholder,
    number: copy.numberPlaceholder,
    date: copy.datePlaceholder,
  };

  return (
    <label htmlFor={id} className="block">
      {legend}
      <input
        {...common}
        type={TYPE[field.type] ?? "text"}
        autoComplete={AUTO[field.type]}
        inputMode={phone ? "tel" : undefined}
        /* ⚠ 300 is where the API silently slices every one-line answer —
           stopping the keystrokes there beats losing what was typed. Phones
           get the audience row's own tighter cap. */
        maxLength={phone ? 32 : 300}
        value={value ?? ""}
        placeholder={field.placeholder || FALLBACK[field.type] || copy.answerPlaceholder}
        /* type="tel" restricts NOTHING — it only picks the keypad. The filter
           is what keeps letters out of a phone box. */
        onChange={(e) => onChange(phone ? phoneClean(e.target.value) : e.target.value)}
      />
      {trailer}
    </label>
  );
}

/* ⚠ `heading` is false where the CALLER already prints one. The event's own
   page wraps this in a panel titled "Save your place"; the homepage modal does
   not, so it needs the form to say it. Without the switch the detail page shows
   the same heading twice, a few pixels apart. */

export { FIELD, FIELD_INVALID, LABEL, HELP, ERROR };
