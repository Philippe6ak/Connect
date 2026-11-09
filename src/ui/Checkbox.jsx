export default function Checkbox({ error, children, ref, ...props }) {
  return (
    <div>
      <label className="flex cursor-pointer select-none items-start gap-3">
        <input type="checkbox" ref={ref} className="mt-1 h-4 w-4 accent-teal-900" {...props} />
        <span className="text-xs leading-relaxed text-stone-600">{children}</span>
      </label>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
