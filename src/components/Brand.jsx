import { Link } from "react-router-dom";

export default function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Rising Beyond Borders home">
      <img className="brand__logo" src="/brand-logo.webp" alt="Rising Beyond Borders" />
    </Link>
  );
}
