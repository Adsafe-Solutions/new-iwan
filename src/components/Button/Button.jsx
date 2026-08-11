import { Link } from "react-router-dom";
import "./Button.css";

/* One button for the whole site. The element is chosen by what you pass:
     <Button variant="blue" onClick={…}>      → <button type="button">
     <Button variant="yellow" href="#donate"> → <a>
     <Button variant="outline" to="/zakat">   → react-router <Link>

   `variant` maps to a .btn--* modifier: blue | red | yellow | ghost | outline.
   `type` is the native button type and only applies to <button>. */
export default function Button({
  variant = "blue",
  to,
  href,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  const classes = `btn btn--${variant} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
