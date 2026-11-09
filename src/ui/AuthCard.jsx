export default function AuthCard({ banner, title, subtitle, children }) {
  return (
    <div className="w-full max-w-[500px] rounded-xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
      {banner}
      <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-stone-600">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}
