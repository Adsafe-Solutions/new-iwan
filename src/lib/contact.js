/* The one place a contact-form submission is handled.

   ⚠ There is no endpoint to post to yet. The live site runs Contact Form 7,
   whose REST route this site cannot call: its `access-control-allow-origin` is
   another domain, and it also requires a page-specific `_wpcf7_unit_tag`, a
   session `_wpnonce` and an hCaptcha token.

   So today it opens a pre-filled email instead, which at least delivers the
   message. Swapping that for a real request is a change to this function and
   nothing else — the page awaits it and shows the same confirmation either
   way:

     const res = await fetch(ENDPOINT, { method: "POST", body: form });
     if (!res.ok) throw new Error("contact: " + res.status);
*/
export async function submitContact({ to, name, email, subject, message }) {
  const body = [message, "", `— ${name}`, email].filter(Boolean).join("\n");
  const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
}

export default submitContact;
