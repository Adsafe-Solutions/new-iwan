import { Link } from "react-router-dom";
import { FOCUS_LINKS } from "../focusAreas.js";

const ORG = [
  "Home",
  "Leadership",
  "About Us",
  "Volunteering",
  "Contact us",
  "Privacy Policy",
];
/* Focus areas lead; the rest are general links. */
const QUICK = [
  ...FOCUS_LINKS,
  ["Zakat", "/zakat"],
  ["RBB Relief Fund", "/"],
  ["Blogs", "/"],
];
const SOCIALS = [
  ["f", "Facebook"],
  ["ig", "Instagram"],
  ["yt", "YouTube"],
  ["in", "LinkedIn"],
  ["tk", "TikTok"],
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <h4>Organization</h4>
          {ORG.map((x) => (
            <a key={x} href="#">
              {x}
            </a>
          ))}
        </div>

        <div>
          <h4>Quick Links</h4>
          {QUICK.map(([label, to]) => (
            <Link key={label} to={to}>
              {label}
            </Link>
          ))}
        </div>

        <div className="footer__contact">
          <h4>Connect With Us</h4>
          <p>✉ info@risingbeyondborders.org</p>
          <p>✆ 1-800-555-0000</p>
          <p>
            ⌂ 000 Example Blvd, Unit 0<br />
            Your City, Province A1B 2C3, Canada
          </p>
          <div className="socials">
            {SOCIALS.map(([t, label]) => (
              <a key={label} href="#" aria-label={label}>
                {t}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4>Stay Informed</h4>
          <form className="subscribe" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email..."
              aria-label="Email"
              required
            />
            <button className="btn btn--yellow">Subscribe</button>
          </form>
          <p style={{ fontSize: ".78rem", marginTop: ".6rem", opacity: 0.8 }}>
            Don't worry. We don't spam.
          </p>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-in">
          <span className="footer__reg">Registered Charity Organization in Canada</span>
          <span className="footer__cra">CRA number: 00000 0000 RR0001</span>
          <span>© 2026 Rising Beyond Borders (RBB). All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
