/* Fills {name} placeholders in a copy string. Sentences stay whole in
   copy.js instead of being concatenated at the call site, so a rewrite can
   move the value anywhere in the sentence. */
export const fill = (template = "", values = {}) =>
  template.replace(/\{(\w+)\}/g, (whole, key) =>
    key in values ? String(values[key]) : whole
  );

export default fill;

/* Cuts to the last whole word inside `max` and appends an ellipsis. The card
   excerpts come straight from the source pages and run from one line to a full
   paragraph; a CSS clamp alone hides the overflow but Chrome only draws the
   ellipsis while `display` stays `-webkit-box`, which it does not for a flex
   child. Truncating the string is the part that actually shows the "…". */
export const truncate = (text = "", max = 150) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[,.;:—-]+$/, "")}…`;
};
