import "@fontsource/opendyslexic";
import "@fontsource-variable/figtree";
import RichText from "./RichText";

// Renders long-form content from data:
//   sections = [{ title, intro?, subsections: [{ subtitle, paragraphs?: ["..."], bullets?: ["..."] }] }]
// Wrap text in **double stars** to emphasise it (works in intro, paragraphs and bullets).
export default function TextSections({ sections, className = "" }) {
  return (
    <div className={className}>
      {sections.map((section) => (
        <section key={section.title} className="mt-12 pt-8 border-t border-stone-200">
          <h2 className="text-2xl md:text-3xl font-semibold text-teal-900 font-dyslexic">
            {section.title}
          </h2>
          {section.intro && (
            <p className="text-slate-600 leading-relaxed text-base md:text-lg mt-3">
              <RichText>{section.intro}</RichText>
            </p>
          )}

          {section.subsections?.map((sub) => (
            <div key={sub.subtitle} className="mt-6">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-orange-600">
                {sub.subtitle}
              </h3>
              {sub.paragraphs?.map((text) => (
                <p key={text} className="text-slate-600 leading-relaxed mt-2 font-figtree">
                  <RichText>{text}</RichText>
                </p>
              ))}
              {sub.bullets?.length > 0 && (
                <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-orange-600">
                  {sub.bullets.map((text, i) => (
                    <li key={i} className="text-slate-600 leading-relaxed font-figtree">
                      <RichText>{text}</RichText>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
