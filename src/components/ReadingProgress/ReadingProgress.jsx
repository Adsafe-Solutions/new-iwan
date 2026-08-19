import { useEffect, useRef, useState } from "react";
import { cx } from "../../lib/cx.js";

/* A bar that fills as you read, sitting on the header's bottom edge.

   The header's height is measured off the element rather than assumed: it is
   `sticky` on these routes and shrinks from h-header to 64px once scrolled, so
   a hardcoded offset would leave the bar floating or tucked underneath. Same
   reason `glideTo` in Events.jsx queries `header` instead of a class.

   `target` is the element being read; without one it measures the document. */
export default function ReadingProgress({ target, className }) {
  const [progress, setProgress] = useState(0);
  const [top, setTop] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const read = () => {
      frame.current = 0;

      const header = document.querySelector("header");
      setTop(header ? Math.max(0, header.getBoundingClientRect().bottom) : 0);

      const el = target?.current;
      const start = el ? el.offsetTop : 0;
      const length =
        (el ? el.offsetHeight : document.body.scrollHeight) - window.innerHeight;
      if (length <= 0) return setProgress(el ? 1 : 0);

      setProgress(Math.min(1, Math.max(0, (window.scrollY - start) / length)));
    };

    /* one read per frame — scroll fires far more often than it paints */
    const onScroll = () => {
      if (!frame.current) frame.current = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [target]);

  return (
    <div
      className={cx("fixed inset-x-0 z-[99] h-1", className)}
      style={{ top }}
      aria-hidden="true"
    >
      <div
        className="h-full w-full origin-[left_center] bg-accent"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
