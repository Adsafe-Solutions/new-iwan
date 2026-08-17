import { Link } from "react-router-dom";
import { cx } from "../../lib/cx.js";

/* One button for the whole site. The element is chosen by what you pass:
     <Button variant="blue" onClick={…}>      → <button type="button">
     <Button variant="yellow" href="#programmes"> → <a>
     <Button variant="outline" to="/zakat">   → react-router <Link>

   `variant` picks a colour set: blue | red | yellow | ghost | outline.
   `type` is the native button type and only applies to <button>.
   `className` is appended last, so callers can override size or colour —
   that is how the header shrinks it and how a card fills the outline
   variant on hover (`group-hover:*`). */

/* Border WIDTH only. The colour belongs to the variant: Tailwind emits
   utilities in its own order, not the order they appear in the attribute,
   so a `border-transparent` here could silently outrank a variant's
   `border-primary`. */
const BASE = cx(
  "inline-flex cursor-pointer items-center justify-center gap-[0.55rem]",
  "whitespace-nowrap rounded border-2 px-[1.7rem] py-4",
  "text-[0.9rem] font-bold uppercase leading-none tracking-[0.02em]",
  "transition-[transform,box-shadow,background-color,color,border-color] duration-[220ms]"
);

const VARIANTS = {
  blue: cx(
    "border-transparent bg-primary text-white",
    "hover:-translate-y-[3px] hover:bg-primary-dark",
    "hover:shadow-[0_16px_30px_-14px_rgb(var(--c-blue))]"
  ),
  red: "border-transparent bg-red text-white hover:-translate-y-[3px] hover:bg-red-dark",
  yellow:
    "border-transparent bg-accent text-ink hover:-translate-y-[3px] hover:bg-accent-2",
  ghost: cx(
    "border-white/60 bg-transparent text-white",
    "hover:-translate-y-[3px] hover:bg-white hover:text-primary"
  ),
  /* reads as secondary at rest, fills in on hover */
  outline: cx(
    "border-primary bg-white text-primary",
    "hover:-translate-y-[3px] hover:border-primary-soft hover:bg-primary-soft hover:text-white",
    "hover:shadow-[0_14px_26px_-16px_rgb(var(--c-blue))]"
  ),
};

export default function Button({
  variant = "blue",
  to,
  href,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  const classes = cx(BASE, VARIANTS[variant] ?? VARIANTS.blue, className);

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
