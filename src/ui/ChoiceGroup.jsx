export default function ChoiceGroup({ label, options, error, ref, ...props }) {
  return (
    <fieldset>
      <legend className="block text-sm font-semibold text-slate-900 mb-2">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            <input type="radio" value={option} ref={ref} className="peer sr-only" {...props} />
            <span className="inline-flex h-9 items-center rounded-full border border-stone-200 bg-white px-4 text-xs font-semibold text-stone-600 transition-colors hover:border-teal-900/40 hover:text-teal-900 peer-checked:border-teal-900 peer-checked:bg-teal-900 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-teal-900/40">
              {option}
            </span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </fieldset>
  );
}
