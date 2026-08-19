/* Fills {name} placeholders in a copy string. Sentences stay whole in
   copy.js instead of being concatenated at the call site, so a rewrite can
   move the value anywhere in the sentence. */
export const fill = (template = "", values = {}) =>
  template.replace(/\{(\w+)\}/g, (whole, key) =>
    key in values ? String(values[key]) : whole
  );

export default fill;
