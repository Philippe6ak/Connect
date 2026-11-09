import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Wordmark from "../../ui/Wordmark";
import TextSections from "../../ui/TextSections";

// Full-screen reading page: fixed header and background, only the text scrolls.
//   <GuidePage eyebrow="FOR STUDENTS / GUIDE" title="Student" highlight="Guide." sections={GUIDE} />
// backTo decides where "Back" goes, e.g. a role's home: backTo={homePathForRole(role)}
export default function GuidePage({
  eyebrow,
  title,
  highlight,
  sections,
  backTo = "/",
  backLabel = "Back",
}) {
  return (
    <div className="h-dvh bg-stone-50 text-slate-900 flex flex-col font-sans selection:bg-orange-600 selection:text-white">
      <header className="h-20 shrink-0 border-b border-stone-200 px-4 md:px-8 grid grid-cols-3 items-center">
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-900 hover:text-orange-600 transition-colors justify-self-start">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{backLabel}</span>
        </Link>
        <Link to="/" className="justify-self-center">
          <Wordmark className="text-2xl" />
        </Link>
      </header>

      <main className="relative flex-1 min-h-0">
        {/* Fixed decoration: sits outside the scroll container so it never moves */}
        <img
          src="/LampsDark.svg"
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute top-0 right-0 h-full w-auto pointer-events-none select-none"
        />

        <div className="relative h-full overflow-y-auto">
          <article className="max-w-2xl lg:max-w-none lg:w-2/3 px-6 md:px-10 lg:px-16 py-12 md:py-16">
            {eyebrow && (
              <span className="text-xs text-teal-900 font-semibold tracking-wider">{eyebrow}</span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-teal-900 leading-tight mt-4">
              {title} {highlight && <em className="text-orange-600 italic">{highlight}</em>}
            </h1>

            <TextSections sections={sections} />
          </article>
        </div>
      </main>
    </div>
  );
}
