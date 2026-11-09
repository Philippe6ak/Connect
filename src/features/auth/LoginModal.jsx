import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useSignIn } from "../../hooks/useAuth";
import { useAuthContext } from "../../context/AuthContext";
import { homePathForRole } from "../../routes/roles";

export default function LoginModal({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, hasProfile, role } = useAuthContext();
  const signInMutation = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange", defaultValues: { email: "", password: "" } });

  // Once Supabase has the session AND the role is loaded, send the user on.
  // "from" is set by ProtectedRoute when someone was bounced to /login.
  const from = location.state?.from?.pathname;
  useEffect(() => {
    if (isAuthenticated && !isLoading && hasProfile) {
      navigate(from ?? homePathForRole(role), { replace: true });
    }
  }, [isAuthenticated, isLoading, hasProfile, role, from, navigate]);

  const onSubmit = (values) => signInMutation.mutate(values);

  return (
    <Modal title="Welcome back" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          autoFocus
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
          })}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />
        <Button type="submit" disabled={!isValid || signInMutation.isPending}>
          {signInMutation.isPending ? "Logging in…" : "Log in"}
        </Button>
        <p className="text-center text-xs">
          <Link to="/forgot-password" className="text-slate-600 hover:text-teal-900 underline">
            Forgot your password?
          </Link>
        </p>
      </form>
    </Modal>
  );
}
