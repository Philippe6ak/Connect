import { useId } from "react";

export default function Input({ label, error, ref, className = "", ...props }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-900 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        aria-invalid={!!error}
        className="h-12 w-full rounded-md border border-stone-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900 aria-[invalid=true]:border-red-500"
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
