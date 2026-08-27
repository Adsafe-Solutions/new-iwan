# Resend newsletter templates

Use newsletter-in.html for a Broadcast targeting the Resend IN segment and
newsletter-ca.html for a Broadcast targeting the CA segment. Edit the content
for each campaign, but keep {{{RESEND_UNSUBSCRIBE_URL}}} in the footer. Resend
replaces it with the recipient-specific unsubscribe URL and manages the
unsubscribe status.

The website does not send a Broadcast when somebody subscribes. It creates or
re-enables the Resend Contact and assigns the regional segment. Campaigns are
then composed and sent through Resend Broadcasts to the appropriate segment.
