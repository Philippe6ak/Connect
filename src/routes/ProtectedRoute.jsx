import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { homePathForRole } from "./roles";
import Spinner from "../ui/Spinner";
import AccountProblem from "../features/auth/AccountProblem";

export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, isLoading, role, hasProfile, profileError } = useAuthContext();
  const location = useLocation();

  if (isLoading) return <Spinner fullPage />;

  if (!isAuthenticated) {
    // remember where they were going so login can send them back
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (profileError)
    return (
      <AccountProblem message="We couldn't load your account. Check your connection and try again." />
    );
  if (!hasProfile)
    return <AccountProblem message="Your account isn't set up yet. Please contact your teacher." />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={homePathForRole(role)} replace />;
  }

  return <Outlet />;
}
