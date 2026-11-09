import { ArrowUpRight } from "lucide-react";

// Placeholder URLs: replace with the real ones.
const GET_IN_TOUCH_URL = "https://t.me/danielotanz"; // Telegram

function LinkedInIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// Add an entry here to show another button. icon is any component that accepts className.
const CONTACT_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/danieltaneh/", icon: LinkedInIcon },
];

const externalLinkProps = { target: "_blank", rel: "noopener noreferrer" };

export default function ContactInfo() {
  return (
    <section id="contact" className="m-2 md:m-4 rounded-xl overflow-hidden shadow-md">
      {/* Call to Action */}
      <div className="bg-orange-600 px-6 py-14 md:py-16 text-center">
        <h2 className="font-serif text-3xl md:text-5xl font-semibold text-white">
          Ready to connect with the world?
        </h2>
        <p className="text-orange-50 leading-relaxed max-w-lg mx-auto mt-4">
          The next season is coming soon. Talk to your teacher or reach out to the program manager
          to get started.
        </p>
        <a
          href={GET_IN_TOUCH_URL}
          {...externalLinkProps}
          className="mt-8 h-12 px-8 inline-flex items-center gap-2 rounded-full bg-white text-teal-900 font-semibold shadow-md hover:bg-stone-100 active:scale-95 transition-all group">
          Get in Touch
          <ArrowUpRight className="w-4 h-4 text-orange-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Program Details */}
      <div className="bg-teal-950 px-6 py-10 text-center text-sm">
        <p className="font-semibold tracking-wide text-stone-100">
          <span className="font-serif font-bold tracking-wider text-orange-500">CONNECT</span>
          {" — "}Language <span className="text-stone-500">|</span> Culture{" "}
          <span className="text-stone-500">|</span> Technology
        </p>
        <p className="text-xs italic text-stone-400 mt-1">Building Bridges Across Cultures</p>

        <p className="text-stone-400 mt-8">
          Program Manager: <span className="font-semibold text-stone-100">Eng Hai Tan</span>
          <span className="mx-2">&middot;</span>
          Meio University, Okinawa, Japan
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {CONTACT_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              {...externalLinkProps}
              className="h-11 px-8 inline-flex items-center gap-2 rounded-full bg-teal-800 text-white font-semibold hover:bg-teal-700 active:scale-95 transition-all">
              <Icon className="w-4 h-4" />
              {label}
            </a>
          ))}
        </div>

        <p className="text-xs text-stone-500 mt-8">
          &copy; 2021–{new Date().getFullYear()} CONNECT. All rights reserved.
        </p>
      </div>
    </section>
  );
}
