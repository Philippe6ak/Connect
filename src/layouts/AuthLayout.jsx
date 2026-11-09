import { Link, Outlet } from "react-router-dom";
import Wordmark from "../ui/Wordmark";
import Footer from "../ui/Footer";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 flex flex-col font-sans">
      <header className="h-16 border-b border-stone-200 flex items-center justify-center">
        <Link to="/">
          <Wordmark className="text-2xl" />
        </Link>
      </header>
      <main className="flex-1 flex items-start justify-center px-4 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
