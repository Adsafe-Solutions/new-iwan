import { Link } from "react-router-dom";
import { BRAND } from "../../config/brand.js";

const LINK = "font-bold text-primary underline";

export default function Placeholder({ title, intro }) {
  return (
    <main className="pb-20 pt-24">
      <div className="mx-auto w-full max-w-[760px] px-6">
        <p className="mb-[0.9rem] text-[13px] font-extrabold uppercase tracking-[0.16em] text-primary">
          {BRAND.name}
        </p>
        <h1 className="mb-[1.2rem] text-[clamp(2.2rem,5vw,56px)] font-extrabold leading-[1.12] tracking-[-0.01em]">
          {title}
        </h1>
        <p className="mb-[1.6rem] text-[20px] leading-8 text-muted">{intro}</p>
        <p className="border-t border-line pt-[1.4rem] text-[16px] leading-[26px]">
          This page is coming soon. In the meantime, explore{" "}
          <Link to="/" className={LINK}>
            our work
          </Link>{" "}
          or{" "}
          <Link to="/zakat" className={LINK}>
            give your Zakat
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
