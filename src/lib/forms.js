import { CMS_ENABLED } from "../content/cms.js";

/* The one place a public form reaches the CMS API — subscribe, contact,
   volunteer and career. Event registration has its own path in RegisterForm,
   because it posts an event's own questions.

   ⚠ With no VITE_CMS_API_URL there is nowhere to post. Every form here throws
   rather than pretending, so a page shows its error state instead of a
   confirmation for a submission nobody received. */

export class FormError extends Error {
  constructor(message, fields = {}) {
    super(message);
    this.name = "FormError";
    /* { field: message } when the API rejected specific inputs, so a form can
       show each one against its own control instead of a single banner. */
    this.fields = fields;
  }
}

export async function postForm(path, body, { country } = {}) {
  if (!CMS_ENABLED) {
    throw new FormError("This form is not connected yet. Please email us instead.");
  }

  const url = `${path}${country ? `?country=${encodeURIComponent(country)}` : ""}`;

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new FormError(
      "We could not reach the server. Check your connection and try again."
    );
  }

  if (res.ok) return true;

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    /* An error with no JSON body — the status is all there is to report. */
  }

  const fields = Object.fromEntries(
    (payload?.details ?? []).map((d) => [d.field, d.message])
  );

  throw new FormError(payload?.error ?? `Something went wrong (${res.status}).`, fields);
}

export const subscribe = (email, { turnstileToken, ...opts } = {}) =>
  postForm("/api/subscribe", { email, turnstileToken }, opts);

export const sendContact = (body, opts) => postForm("/api/contact", body, opts);

export const applyVolunteer = (body, opts) => postForm("/api/volunteer", body, opts);

export const applyCareer = (body, opts) => postForm("/api/career", body, opts);

export default postForm;
