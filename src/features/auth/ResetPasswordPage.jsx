import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthCard from "../../ui/AuthCard";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useUpdatePassword } from "../../hooks/useAuth";
import { useAuthContext } from "../../context/AuthContext";
import { homePathForRole } from "../../routes/roles";
import { PASSWORD_MIN_LENGTH } from "./constants";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, role } = useAuthContext();
  const updatePassword = useUpdatePassword();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onTouched", defaultValues: { password: "", confirmPassword: "" } });

  function onSubmit({ password }) {
    updatePassword.mutate(password, {
      onSuccess: () => navigate(homePathForRole(role), { replace: true }),
    });
  }

  // The email link signs the user in temporarily; AuthProvider picks that session up.
  if (isLoading) return <Spinner />;

  if (!isAuthenticated) {
    return (
      <AuthCard title="Link expired" subtitle="This reset link is invalid or has expired.">
        <Link
          to="/forgot-password"
          className="inline-block text-sm font-semibold text-teal-900 underline">
          Request a new link
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Choose a new password">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          label="New password"
          type="password"
          autoComplete="new-password"
          autoFocus
          placeholder={`Min. ${PASSWORD_MIN_LENGTH} characters`}
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: PASSWORD_MIN_LENGTH,
              message: `At least ${PASSWORD_MIN_LENGTH} characters`,
            },
          })}
        />
        <Input
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === getValues("password") || "Passwords don't match",
          })}
        />
        <Button type="submit" disabled={updatePassword.isPending}>
          {updatePassword.isPending ? "Saving…" : "Update password"}
        </Button>
      </form>
    </AuthCard>
  );
}

//signup?invite=aa471622467547afafe11df042e11d540969af87866b464ea9d19b369a81e3b0
