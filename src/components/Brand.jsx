import { useState } from "react";
import { Link } from "react-router-dom";
import { BRAND } from "../config/brand.js";

export default function Brand({ light = false }) {
  const [lightMissing, setLightMissing] = useState(false);
  const useLight = light && !lightMissing;

  return (
    <Link to="/" className="brand" aria-label={`${BRAND.fullName} home`}>
      <img
        className={`brand__logo${light && lightMissing ? " brand__logo--invert" : ""}`}
        src={useLight ? BRAND.logoLight : BRAND.logo}
        alt={BRAND.fullName}
        onError={() => light && setLightMissing(true)}
      />
    </Link>
  );
}
