import { useEffect, useRef } from "react";
import "./Modal.css";

/* Generic dialog shell: backdrop, panel, close button, Escape, background
   scroll lock and initial focus. Wrap any feature's content in it and style
   that content from the feature's own stylesheet.

   <Modal onClose={...} labelledBy="my-title" className="my-modal">…</Modal>

   `labelledBy` must be the id of the heading inside `children`, so screen
   readers announce the dialog by its title. */
export default function Modal({ onClose, labelledBy, className = "", children }) {
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
      className={`modal ${className}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal__panel">
        <button
          type="button"
          className="modal__close"
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
