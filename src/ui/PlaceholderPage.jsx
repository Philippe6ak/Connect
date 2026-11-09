export default function PlaceholderPage({ title, children }) {
  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl font-semibold text-teal-900">{title}</h1>
      <p className="text-slate-500 text-sm mt-2">Coming soon.</p>
      {children}
    </div>
  );
}
