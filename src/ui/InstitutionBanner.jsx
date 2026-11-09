import { School } from "lucide-react";

export default function InstitutionBanner({ university, countryCode }) {
  return (
    <div className="mb-8 rounded-lg border border-dashed border-stone-300 bg-stone-100/70 p-5 text-center">
      <div className="mb-1 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500">
        <School className="h-3.5 w-3.5 text-orange-600" />
        <span>Your institution</span>
      </div>
      <p className="font-serif text-2xl font-bold text-teal-900">
        {university}
        <span className="ml-2.5 inline-block rounded-full border border-teal-900/20 bg-teal-900/10 px-2.5 py-0.5 font-sans text-xs font-semibold text-teal-900">
          {countryCode}
        </span>
      </p>
    </div>
  );
}
