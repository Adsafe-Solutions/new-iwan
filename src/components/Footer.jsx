import { Link } from "react-router-dom";
import { BRAND } from "../config/brand.js";

const MARK_NAME = BRAND.name;
const MARK_TLD = BRAND.fullName.slice(BRAND.name.length);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__in">
        <div className="footer__top">
          <div className="footer__intro">
            <p className="footer__brand">{BRAND.fullName}</p>
            <p className="footer__tagline">
              Be the first to hear about our impact and new volunteer opportunities.
            </p>
          </div>

          <div className="footer__signup">
            <h4 className="footer__label">Subscribe to receive updates</h4>
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
              By subscribing you agree to receive updates from {BRAND.name} from time to
              time and to our <Link to="/">Privacy Policy</Link>
            </p>
          </div>
        </div>

        {/* textLength pins the wordmark to the full footer width at any viewport */}
        <svg
          className="footer__mark"
          viewBox="0 0 1000 200"
          role="img"
          aria-label={BRAND.fullName}
          focusable="false"
        >
          <text x="0" y="165" textLength="1000" lengthAdjust="spacing">
            <tspan className="footer__mark-name">{MARK_NAME}</tspan>
            <tspan className="footer__mark-tld">{MARK_TLD}</tspan>
          </text>
        </svg>

        <div className="footer__bar">
          <div className="footer__legal">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
          </div>
          <p className="footer__copy">
            © {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
