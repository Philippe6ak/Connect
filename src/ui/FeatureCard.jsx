import { ArrowUpRight } from "lucide-react";

// actionLabel is display-only for now: wrap the card or pass a link once navigation exists.
// hover={false} turns off every hover effect, for cards that are not clickable.
// titleSize="sm" suits narrow cards, e.g. four per row.
const TITLE_SIZES = { sm: "text-xl", md: "text-2xl" };

export default function FeatureCard({
  icon,
  eyebrow,
  title,
  actionLabel,
  hover = true,
  titleSize = "md",
  className = "",
  children,
}) {
  const hoverClasses = hover
    ? "group transition-all duration-300 hover:-translate-y-1 hover:border-teal-900/30 hover:shadow-md"
    : "";

  return (
    <article
      className={`flex flex-col rounded-xl border border-stone-200 bg-white p-8 shadow-sm ${hoverClasses} ${className}`}>
      {icon && (
        <div className="w-11 h-11 mb-6 rounded-md bg-teal-900/5 text-teal-900 flex items-center justify-center transition-colors group-hover:bg-orange-600 group-hover:text-white">
          {icon}
        </div>
      )}
      {eyebrow && (
        <span className="mb-2 text-xs font-semibold tracking-wider uppercase text-orange-600">
          {eyebrow}
        </span>
      )}
      <h3 className={`font-serif ${TITLE_SIZES[titleSize]} font-semibold text-teal-900`}>
        {title}
      </h3>
      <div className="text-slate-600 leading-relaxed mt-3 flex-1">{children}</div>
      {actionLabel && (
        <span className="inline-flex items-center gap-2 text-teal-900 font-semibold mt-6 transition-colors group-hover:text-orange-600">
          {actionLabel}
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      )}
    </article>
  );
}
