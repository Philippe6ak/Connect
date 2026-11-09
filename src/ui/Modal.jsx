import { useEffect, useId } from "react";
import { X } from "lucide-react";

// Render it only with check {open && <Modal ...>}
export default function Modal({ title, onClose, children }) {
  const titleId = useId();

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-sm rounded-md bg-orange-50 p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-slate-600 hover:text-slate-900 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <h2 id={titleId} className="font-serif text-3xl font-bold text-slate-900 pr-8">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
