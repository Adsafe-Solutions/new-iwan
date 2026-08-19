const isPlain = (v) =>
  v !== null && typeof v === "object" && !Array.isArray(v) && !(v instanceof Date);

/* Arrays replace wholesale rather than merging element-by-element: a country
   that lists its own events means those events INSTEAD of base's, and merging
   by index would splice two unrelated lists together. To extend a base list,
   an override has to restate it.

   `null` DELETES the key, which is the only way to express subtraction —
   merging two objects can otherwise only ever add. No base content uses null
   as a value, so the sentinel is unambiguous.

   A FUNCTION is given the base value and returns the new one, which is how a
   country edits one item of a list without restating the list. `ops.js` has
   the three it needs — add, remove, update — and anything they do not cover is
   a plain arrow. Content is data, so a function is never a real value either. */
export function merge(base, override) {
  if (override === undefined) return base;
  if (typeof override === "function") return override(base);
  if (!isPlain(base) || !isPlain(override)) return override;

  const out = { ...base };
  for (const key of Object.keys(override)) {
    if (override[key] === null) delete out[key];
    else out[key] = merge(base[key], override[key]);
  }
  return out;
}

export default merge;
