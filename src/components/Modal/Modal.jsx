import { useEffect, useRef } from "react";
import { cx } from "../../lib/cx.js";

/* Sits over whatever the feature renders at the top of the panel. Features
   restyle it through `closeClassName` when that area is dark — see EventModal. */
const CLOSE = cx(
  "absolute right-4 top-4 z-[2] h-[38px] w-[38px] cursor-pointer rounded-full border-0",
  "bg-cloud text-[16px] text-ink transition-colors duration-200",
  "hover:bg-primary hover:text-white"
);

/* Generic dialog shell: backdrop, panel, close button, Escape, background
   scroll lock and initial focus. Wrap any feature's content in it.

   <Modal onClose={...} labelledBy="my-title" className="…">…</Modal>

   `labelledBy` must be the id of the heading inside `children`, so screen
   readers announce the dialog by its title. */
export default function Modal({
  onClose,
  labelledBy,
  className = "",
  panelClassName = "",
  closeClassName = "",
  children,
}) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className={cx(
        "fixed inset-0 z-[200] flex items-center justify-center",
        "p-[clamp(12px,3vw,40px)] backdrop-blur-[6px]",
        "animate-modalFade bg-ink/55",
        className
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* relative anchors the close button */}
      <div
        className={cx(
          "relative max-h-[92vh] w-[min(760px,100%)] overflow-y-auto",
          "animate-modalPanel rounded-lg bg-white shadow",
          panelClassName
        )}
      >
        <button
          type="button"
          className={cx(CLOSE, closeClassName)}
          onClick={onClose}
          aria-label="Close"
          ref={closeRef}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
