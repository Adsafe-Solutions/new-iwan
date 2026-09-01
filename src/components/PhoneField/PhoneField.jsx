import { useState } from "react";
import { DIAL_CODES, dialFor } from "../../config/dialCodes.js";
import { useCountry } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";

/* A dial-code select beside the number, emitting the two joined — "+91 90000
   00000" — which is what the API stores.

   ⚠ It owns the two halves and the parent owns only the joined string. Parsing
   a stored value back into a code and a number is the part that goes wrong:
   "+1 416…" and "+14 16…" are the same characters, and several codes are
   prefixes of others. Nothing here ever reads the value back, so there is
   nothing to get wrong — the parent is write-only for this field.

   ⚠ The default follows the country in the URL, not the browser's locale. The
   URL is the site's one source of truth for country, and a visitor on /ca/ is
   being shown Canadian content whatever their laptop is set to. */
export default function PhoneField({
  id,
  value,
  onChange,
  required,
  className,
  fieldClassName,
  selectLabel = "Country code",
  ...rest
}) {
  const [country] = useCountry();
  const [dial, setDial] = useState(() => dialFor(country.code));
  const [number, setNumber] = useState("");

  const emit = (nextDial, nextNumber) => {
    setDial(nextDial);
    setNumber(nextNumber);
    /* Nothing to send until a number is typed — an empty field must stay empty
       rather than becoming a bare "+91", which the API would store as a
       mobile number nobody can ring. */
    onChange(nextNumber.trim() ? `${nextDial} ${nextNumber.trim()}` : "");
  };

  return (
    <span className={cx("flex gap-2", className)}>
      <select
        aria-label={selectLabel}
        value={dial}
        onChange={(e) => emit(e.target.value, number)}
        className={cx(fieldClassName, "w-[112px] flex-none cursor-pointer pr-2")}
      >
        {DIAL_CODES.map((c) => (
          /* ⚠ Keyed on the ISO code, not the dial code — Canada and the US
             share +1, and two options on one key drop one of them. */
          <option key={c.iso} value={c.dial}>
            {c.flag} {c.dial}
          </option>
        ))}
      </select>

      <input
        {...rest}
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={number}
        onChange={(e) => emit(dial, e.target.value)}
        required={required}
        className={cx(fieldClassName, "min-w-0 flex-1")}
      />
    </span>
  );
}
