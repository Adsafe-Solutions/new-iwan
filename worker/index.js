const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

function actionFor(pathname) {
  if (pathname === "/api/subscribe") return "newsletter_signup";
  if (pathname === "/api/contact") return "contact";
  if (pathname === "/api/volunteer") return "volunteer_application";
  if (pathname === "/api/career") return "career_application";
  if (/^\/api\/events\/[^/]+\/register$/.test(pathname)) {
    return "event_registration";
  }
  return null;
}

function cmsBodyFor(pathname, body) {
  if (pathname === "/api/subscribe") {
    return { email: body.email };
  }
  if (pathname === "/api/contact") {
    return {
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      mobile: body.mobile,
      subscribe: body.subscribe,
    };
  }
  if (pathname === "/api/volunteer" || pathname === "/api/career") {
    return { answers: body.answers, subscribe: body.subscribe };
  }
  return {
    answers: body.answers,
    subscribe: body.subscribe,
    photoConsent: body.photoConsent,
  };
}

/* ⚠ Every rejection below returns the SAME 403 to the browser, deliberately —
   telling a spammer which check failed is telling them how to pass it. But it
   made a real outage undiagnosable: the site URL was missing from [vars], so
   every form 403'd for every visitor and looked exactly like a bad token.
   The reason is logged instead, where `wrangler tail` can see it. */
const reject = (why) => {
  console.warn(`[turnstile] rejected: ${why}`);
  return false;
};

async function verifyTurnstile(token, expectedAction, request, env) {
  /* ⚠ SITE_URL is a Worker [vars] entry, NOT the VITE_ build variable — Vite
     inlines those into the browser bundle at build time and they never become
     runtime bindings here. VITE_SITE_URL is read too, for a deployment still
     carrying the old name. */
  let expectedHostname = "";
  try {
    expectedHostname = new URL(env.SITE_URL || env.VITE_SITE_URL).hostname;
  } catch {
    /* A missing or invalid site URL is a deployment configuration error. */
  }

  if (!env.TURNSTILE_SECRET_KEY) return reject("TURNSTILE_SECRET_KEY is not set");
  if (!expectedHostname) return reject("SITE_URL is not set or is not a URL");
  if (typeof token !== "string" || token.length === 0) {
    return reject("no token in the request body");
  }
  if (token.length > 2048) return reject("token is implausibly long");

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: request.headers.get("CF-Connecting-IP") ?? "",
      }),
    });
    if (!response.ok) return reject(`siteverify responded ${response.status}`);

    const result = await response.json();
    if (result.success !== true) {
      return reject(`siteverify said no: ${(result["error-codes"] ?? []).join(", ")}`);
    }
    if (result.action !== expectedAction) {
      return reject(`action was "${result.action}", expected "${expectedAction}"`);
    }
    if (result.hostname !== expectedHostname) {
      return reject(`solved on "${result.hostname}", expected "${expectedHostname}"`);
    }
    return true;
  } catch (err) {
    return reject(`siteverify threw: ${err?.message ?? err}`);
  }
}

async function verifyAndForward(request, env, url, action) {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  if (!(await verifyTurnstile(body.turnstileToken, action, request, env))) {
    return json({ error: "Verification expired. Please try again." }, 403);
  }

  const cmsUrl = (env.CMS_API_URL || env.VITE_CMS_API_URL || "").replace(/\/$/, "");
  if (!cmsUrl) return json({ error: "Form service is not configured." }, 503);

  const target = new URL(`${cmsUrl}${url.pathname}`);
  const country = url.searchParams.get("country");
  if (country) target.searchParams.set("country", country);

  try {
    return await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(15_000),
      body: JSON.stringify(cmsBodyFor(url.pathname, body)),
    });
  } catch {
    return json({ error: "We could not reach the form service." }, 502);
  }
}

export default {
  fetch(request, env) {
    const url = new URL(request.url);
    const action = actionFor(url.pathname);
    return action
      ? verifyAndForward(request, env, url, action)
      : env.ASSETS.fetch(request);
  },
};
