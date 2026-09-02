# Resend newsletter templates

Use newsletter-in.html for a Broadcast targeting the Resend IN segment and
newsletter-ca.html for a Broadcast targeting the CA segment. Edit the content
for each campaign, but keep {{{RESEND_UNSUBSCRIBE_URL}}} in the footer. Resend
replaces it with the recipient-specific unsubscribe URL and manages the
unsubscribe status.

The website does not send a Broadcast when somebody subscribes. It creates or
re-enables the Resend Contact and assigns the regional segment. Campaigns are
then composed and sent through Resend Broadcasts to the appropriate segment.

## The unsubscribe button

The footer button links to `{{{RESEND_UNSUBSCRIBE_URL}}}` — the real,
recipient-specific URL Resend substitutes when the Broadcast goes out. Keep the
triple braces exactly as they are; a copy-paste that loses one brace ships a
dead link to the whole segment.

It has an Outlook fallback (`<!--[if mso]><v:roundrect>`), so the button is
drawn there too rather than collapsing to nothing. Both comment blocks are load
bearing — deleting them removes the button for Outlook readers.

**Why it always shows here:** a Broadcast is addressed to a segment, so every
recipient is on the list by definition. There is nothing to gate.

**Transactional email is the opposite.** Resend generates no unsubscribe token
for a one-off send, and the recipient may never have subscribed — someone who
registers for an event, for example. So a transactional template must:

1. gate the block on a contact lookup — `GET /contacts/{email}`, shown only when
   the contact exists and `unsubscribed` is `false`; and
2. use the site's own signed unsubscribe URL, since there is no Resend token to
   substitute.

Showing an unsubscribe button to someone who is not on the list is worse than
showing none: it implies a subscription they never made, and clicking it does
nothing.
