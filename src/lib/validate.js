import { z } from "zod";

/* Client-side mirrors of the API's validators, so a form can point at every
   problem BEFORE a network round trip — and word it identically to the server,
   which still has the final say.

   ⚠ MIRRORS, not sources of truth. The rules and their messages are copied
   from the API — iwan-cms-api/src/validators/forms.js for the fixed forms and
   …/validators/registration.js for the question-driven ones. A rule changed
   there must change here, or the two disagree about the same field. */

/* Zod result → the `{ field: message }` shape FormError.fields already uses,
   so it drops straight into every form's existing error state. */
export const flatten = (result) => {
  if (result.success) return { ok: true, data: result.data, fields: {} };
  const fields = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !(key in fields)) fields[key] = issue.message;
  }
  return { ok: false, data: null, fields };
};

/* Keystroke filter for phone inputs — the characters a real number is ever
   written with. Applied ON INPUT (PhoneField and the phone question type), so
   letters never land in the box at all; the API stays deliberately loose about
   the format itself. */
export const phoneClean = (v) => v.replace(/[^\d+()\-.\s]/g, "");

const email = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "An email address is required")
  .max(200)
  .email("That is not an email address");

const mobile = z.string().trim().max(32).default("");

export const subscribeSchema = z.object({ email });

export const contactSchema = z.object({
  email,
  name: z.string().trim().max(120).pipe(z.string().min(1, "A name is required")),
  subject: z.string().trim().min(1, "A subject is required").max(200),
  mobile,
  message: z.string().trim().max(5000).default(""),
});

/* ── the question-driven forms (register, volunteer, career) ─────────────── */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TEXT = 2000;
const MAX_SHORT = 300;

const str = (v) => (typeof v === "string" ? v.trim() : "");

/* ⚠ `false` and `0` are real answers — a falsy check would call them blank. */
const isBlank = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.values(value).every((v) => str(v) === "");
  return false;
};

/* One field's own complaint, or null. ⚠ `field.options` here are the PLAIN
   STRINGS the public payload carries, not the CMS's {label} objects. */
function complaint(field, raw) {
  const options = field.options ?? [];

  switch (field.type) {
    case "email": {
      const value = str(raw);
      if (value && !EMAIL.test(value.toLowerCase())) {
        return "That does not look like an email address";
      }
      return null;
    }

    case "number": {
      if (raw === "" || raw === null || raw === undefined) return null;
      return Number.isFinite(Number(raw)) ? null : "That is not a number";
    }

    case "date": {
      const value = str(raw);
      return !value || /^\d{4}-\d{2}-\d{2}$/.test(value) ? null : "Use YYYY-MM-DD";
    }

    case "radio":
    case "select": {
      const value = str(raw);
      if (value && !options.includes(value)) {
        return `"${value}" is not one of the choices`;
      }
      return null;
    }

    case "checkboxes": {
      const list = Array.isArray(raw) ? raw : [];
      const unknown = list.map(str).filter((v) => v && !options.includes(v));
      return unknown.length ? `"${unknown[0]}" is not one of the choices` : null;
    }

    case "textarea":
      return str(raw).length > MAX_TEXT ? "That answer is too long" : null;

    case "name":
    case "consent":
      return null;

    default:
      /* text, phone, and anything else that is one line. */
      return str(raw).length > MAX_SHORT ? "That answer is too long" : null;
  }
}

/* The whole form at once → { key: message }, empty when everything passes.
   Same collection behaviour as the API's buildAnswers: every problem at once,
   not one field at a time. */
export function checkAnswers(fields = [], values = {}) {
  const problems = {};

  for (const field of fields) {
    const raw = values?.[field.key];
    const wrong = complaint(field, raw);
    if (wrong) {
      problems[field.key] = wrong;
      continue;
    }

    /* ⚠ Consent is required whatever its `required` flag says — an agreement
       nobody has to give is not an agreement. */
    if (field.type === "consent") {
      if (raw !== true) problems[field.key] = "This has to be ticked to continue";
    } else if (field.required && isBlank(raw)) {
      problems[field.key] = "This one is required";
    }
  }

  return problems;
}

export default checkAnswers;
