import { useEffect, useRef } from "react";
import { IconX } from "@tabler/icons-react";
import { useCopy } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";

/* Sits over whatever the feature renders at the top of the panel. Features
   restyle it through `closeClassName` when that area is dark — see EventModal.

   The glyph alone, with no chip behind it. The 38px box stays: it is the touch
   target, not decoration, and shrinking it to the icon would put it under the
   24px minimum. */
const CLOSE = cx(
  "absolute right-4 top-4 z-[2] grid h-[38px] w-[38px] cursor-pointer",
  "place-items-center rounded-full border-0 bg-transparent",
  "text-ink/55 transition-colors duration-200 hover:text-primary"
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
  const copy = useCopy().modal;
  const panelRef = useRef(null);

  /* ⚠ `onClose` is held in a ref rather than named as a dependency below.

     A caller almost always passes an inline arrow, so `onClose` is a new value
     on every render — and depending on it makes the effect tear down and re-run
     each time, which calls `panelRef.current.focus()` and pulls focus out of
     whatever the visitor was typing. That matters here because this modal wraps
     RegisterForm: EventModal now fetches the full event when it opens, and the
     re-render when that lands would have yanked focus out of the name field
     mid-word. The same bug bit the CMS admin's dialog, which is where it was
     found. Mount-only, with the handler kept current through the ref. */
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCloseRef.current();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    /* the panel rather than the close button: focus has to enter the dialog,
       but landing it on Close draws a focus ring around the glyph the moment
       the modal opens, which reads as a chip behind it. Tab from here goes
       to Close, which does show its ring. */
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, []);

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
        ref={panelRef}
        tabIndex={-1}
        className={cx(
          "relative max-h-[92vh] w-[min(760px,100%)] overflow-y-auto",
          "animate-modalPanel rounded-lg bg-white shadow outline-none",
          panelClassName
        )}
      >
        <button
          type="button"
          className={cx(CLOSE, closeClassName)}
          onClick={onClose}
          aria-label={copy.close}
        >
          <IconX className="h-[22px] w-[22px]" stroke={2} aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  );
}
