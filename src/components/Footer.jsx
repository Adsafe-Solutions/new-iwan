import { Link } from "react-router-dom";

const BRAND = "Rising Beyond Borders";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__in">
        <div className="footer__top">
          <div className="footer__intro">
            <p className="footer__brand">{BRAND}</p>
            <p className="footer__tagline">
              Be the first to hear about our impact and new volunteer opportunities.
            </p>
          </div>

          <div className="footer__signup">
            <h4 className="footer__label">Subscribe to receive updates</h4>
            {/* no mailing-list backend wired up yet — this only guards against a
                page reload, same as the form it replaces */}
            <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
            <p className="footer__fine">
              By subscribing you agree to receive updates from {BRAND} from time to time
              and to our <Link to="/">Privacy Policy</Link>
            </p>
          </div>
        </div>

        {/* SVG rather than sized text: textLength pins the wordmark to the full
            width of the footer at any viewport, so it always spans edge to edge */}
        <svg
          className="footer__mark"
          viewBox="0 0 1000 118"
          role="img"
          aria-label={BRAND}
          focusable="false"
        >
          <text x="0" y="95" textLength="1000" lengthAdjust="spacing">
            {BRAND}
          </text>
        </svg>

        <div className="footer__bar">
          <div className="footer__legal">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
          </div>
          <p className="footer__copy">
            © {new Date().getFullYear()} {BRAND}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
