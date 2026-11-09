import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
      <Wordmark className="text-base" />
      <p>&copy; {new Date().getFullYear()} CONNECT. All rights reserved.</p>
    </footer>
  );
}
