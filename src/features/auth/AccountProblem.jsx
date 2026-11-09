import toast from "react-hot-toast";
import { signOut, friendlyError } from "../../api/api";

export default function AccountProblem({ message }) {
  async function handleSignOut() {
    try {
      await signOut(); // session becomes null and the guard redirects to /
    } catch (error) {
      toast.error(friendlyError(error));
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-slate-700 max-w-sm">{message}</p>
      <button
        type="button"
        onClick={handleSignOut}
        className="h-10 px-5 rounded-md bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 transition-colors">
        Log out
      </button>
    </div>
  );
}
