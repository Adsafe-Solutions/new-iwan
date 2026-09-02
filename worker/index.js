const RESEND_API = "https://api.resend.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGIONS = new Set(["IN", "CA"]);

const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

async function verifyTurnstile(token, expectedAction, request, env) {
  const expectedHostnames = new Set(
    (env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean)
  );

  if (
    !env.TURNSTILE_SECRET_KEY ||
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048 ||
    expectedHostnames.size === 0
  ) {
    return false;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: AbortSignal.timeout(10_000),
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: token,
          remoteip: request.headers.get("CF-Connecting-IP") ?? "",
        }),
      }
    );
    if (!response.ok) return false;

    const result = await response.json();
    return (
      result.success === true &&
      result.action === expectedAction &&
      expectedHostnames.has(result.hostname)
    );
  } catch {
    return false;
  }
}

const clean = (value, max) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const recipientFor = (kind, region, env) =>
  env[`${kind}_TO_EMAIL_${region}`] || env[`${kind}_TO_EMAIL`];

async function resend(path, env, init = {}) {
  return fetch(`${RESEND_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
}

async function subscribe(request, env) {
  if (!env.RESEND_API_KEY) return json({ error: "Newsletter is not configured." }, 503);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const region = typeof body.region === "string" ? body.region.toUpperCase() : "";
  const segmentId = env[`RESEND_SEGMENT_${region}`];

  if (!EMAIL_PATTERN.test(email) || email.length > 254 || !REGIONS.has(region)) {
    return json({ error: "Enter a valid email address and region." }, 400);
  }
  if (!segmentId) return json({ error: "Newsletter region is not configured." }, 503);
  if (!(await verifyTurnstile(body.turnstileToken, "newsletter_signup", request, env))) {
    return json({ error: "Verification expired. Please try again." }, 403);
  }

  const encodedEmail = encodeURIComponent(email);
  const existing = await resend(`/contacts/${encodedEmail}`, env);

  let contactResponse;
  if (existing.ok) {
    contactResponse = await resend(`/contacts/${encodedEmail}`, env, {
      method: "PATCH",
      body: JSON.stringify({ unsubscribed: false }),
    });
  } else if (existing.status === 404) {
    contactResponse = await resend("/contacts", env, {
      method: "POST",
      body: JSON.stringify({
        email,
        unsubscribed: false,
        segments: [{ id: segmentId }],
      }),
    });
  } else {
    contactResponse = existing;
  }

  if (!contactResponse.ok) {
    console.error("Resend contact request failed", contactResponse.status);
    return json({ error: "We could not subscribe you right now." }, 502);
  }

  // This is idempotent and also covers contacts that already existed.
  const segmentResponse = await resend(
    `/contacts/${encodedEmail}/segments/${encodeURIComponent(segmentId)}`,
    env,
    { method: "POST" }
  );
  if (!segmentResponse.ok && segmentResponse.status !== 409) {
    console.error("Resend segment request failed", segmentResponse.status);
    return json({ error: "We could not assign your newsletter region." }, 502);
  }

  return json({ ok: true, region });
}

async function sendSubmission(request, env, kind) {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    return json({ error: "Form delivery is not configured." }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 254).toLowerCase();
  const region = clean(body.region, 2).toUpperCase();
  const action = kind === "CONTACT" ? "contact" : "event_registration";
  const to = recipientFor(kind, region, env);

  if (!name || !EMAIL_PATTERN.test(email) || !REGIONS.has(region)) {
    return json({ error: "Enter valid contact details." }, 400);
  }
  if (!to) return json({ error: "Form recipient is not configured." }, 503);
  if (!(await verifyTurnstile(body.turnstileToken, action, request, env))) {
    return json({ error: "Verification expired. Please try again." }, 403);
  }

  let subject;
  let text;
  if (kind === "CONTACT") {
    const submittedSubject = clean(body.subject, 200);
    const message = clean(body.message, 5000);
    if (!submittedSubject) return json({ error: "Enter a subject." }, 400);
    subject = `[Iwan ${region}] Contact: ${submittedSubject}`;
    text = [
      "New website contact submission",
      "",
      `Region: ${region}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${submittedSubject}`,
      "",
      "Message:",
      message || "(No message supplied)",
    ].join("\n");
  } else {
    const eventId = clean(body.eventId, 160);
    const eventTitle = clean(body.eventTitle, 240);
    const eventDate = clean(body.eventDate, 40);
    if (!eventId || !eventTitle || !eventDate) {
      return json({ error: "Event details are incomplete." }, 400);
    }
    subject = `[Iwan ${region}] Event registration: ${eventTitle}`;
    text = [
      "New website event registration",
      "",
      `Region: ${region}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Event ID: ${eventId}`,
      `Event: ${eventTitle}`,
      `Date: ${eventDate}`,
    ].join("\n");
  }

  const response = await resend("/emails", env, {
    method: "POST",
    headers: { "Idempotency-Key": crypto.randomUUID() },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL,
      to: [to],
      reply_to: email,
      subject,
      text,
      tags: [
        { name: "form", value: kind.toLowerCase() },
        { name: "region", value: region.toLowerCase() },
      ],
    }),
  });

  if (!response.ok) {
    console.error("Resend email request failed", response.status);
    return json({ error: "We could not send your submission right now." }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const handlers = {
      "/api/newsletter": subscribe,
      "/api/contact": (incoming, bindings) =>
        sendSubmission(incoming, bindings, "CONTACT"),
      "/api/events/register": (incoming, bindings) =>
        sendSubmission(incoming, bindings, "EVENTS"),
    };
    const handler = handlers[url.pathname];

    if (handler) {
      if (request.method !== "POST") {
        return new Response(null, { status: 405, headers: { Allow: "POST" } });
      }
      return handler(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
