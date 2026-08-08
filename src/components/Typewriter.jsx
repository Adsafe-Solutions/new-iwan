import { useEffect, useState } from "react";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Types each phrase in left-to-right, holds, deletes, and moves to the next —
 * with a blinking cursor on the right. Reduced-motion shows phrase 1 statically.
 */
export default function Typewriter({
  phrases,
  className = "",
  cursorClass = "tw-cursor",
  typeSpeed = 75,
  deleteSpeed = 40,
  hold = 1500,
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(REDUCED ? phrases[0] : "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (REDUCED) return;
    const full = phrases[index];
    let t;
    if (!deleting && text === full) {
      t = setTimeout(() => setDeleting(true), hold);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      const next = deleting
        ? full.slice(0, text.length - 1)
        : full.slice(0, text.length + 1);
      t = setTimeout(() => setText(next), deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, hold]);

  return (
    <span className={className}>
      {text}
      {!REDUCED && <span className={cursorClass} aria-hidden="true" />}
    </span>
  );
}
