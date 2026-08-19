import { Link, useLocation } from "react-router-dom";
import { useBrand, useCopy, useCountry } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";

/* Reachable in a way it was not before the country prefix: a programme India
   runs and Canada does not still has a shareable /ca/… URL. Naming the country
   is the whole point — "not found" alone would read as a broken link. */
export default function NotFound() {
  const BRAND = useBrand();
  const copy = useCopy().notFound;
  const [country] = useCountry();
  const { pathname } = useLocation();

  return (
    <main className="pb-20 pt-24">
      <div className="mx-auto w-full max-w-[760px] px-6">
        <p className="mb-[0.9rem] text-[13px] font-extrabold uppercase tracking-[0.16em] text-primary">
          {BRAND.name}
        </p>
        <h1 className="mb-[1.2rem] text-[clamp(2.2rem,5vw,56px)] font-extrabold leading-[1.12] tracking-[-0.01em]">
          {copy.heading}
        </h1>
        <p className="mb-[1.6rem] text-[20px] leading-8 text-muted">
          {fill(copy.body, {
            path: pathname,
            name: BRAND.name,
            country: country.label,
          })}
        </p>
        <p className="border-t border-line pt-[1.4rem] text-[16px] leading-[26px]">
          {copy.backTo}{" "}
          <Link to="/" className="font-bold text-primary underline">
            {copy.home}
          </Link>
          {copy.switcher}
        </p>
      </div>
    </main>
  );
}
