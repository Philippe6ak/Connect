import { Link, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { homePathForRole } from "../routes/roles";
import { signOut, friendlyError } from "../api/api";
import Wordmark from "../ui/Wordmark";
import Footer from "../ui/Footer";

export default function AppLayout() {
  const { role } = useAuthContext();
  const navigate = useNavigate();

  // Step 2 will replace this with a useSignOut() hook
  async function handleSignOut() {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      toast.error(friendlyError(error));
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 flex flex-col font-sans">
      <header className="h-16 border-b border-stone-200 px-4 md:px-8 flex items-center justify-between">
        <Link to={homePathForRole(role)}>
          <Wordmark className="text-2xl" />
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="h-10 px-3 text-sm font-semibold text-teal-900 hover:text-teal-700 transition-colors">
          Log out
        </button>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 md:px-10 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
