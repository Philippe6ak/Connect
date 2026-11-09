import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthCard from "../../ui/AuthCard";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useRequestPasswordReset } from "../../hooks/useAuth";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const requestReset = useRequestPasswordReset();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched", defaultValues: { email: "" } });

  function onSubmit({ email }) {
    requestReset.mutate(email.trim(), { onSuccess: () => setSent(true) });
  }

  if (sent) {
    return (
      <AuthCard title="Check your email">
        {/* Deliberately vague: we never reveal whether an account exists */}
        <p className="text-sm text-stone-600">
          If an account exists for that email, we sent a link to reset your password.
        </p>
        <Link to="/" className="mt-6 inline-block text-sm font-semibold text-teal-900 underline">
          Back to home
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a reset link.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
        <Button type="submit" disabled={requestReset.isPending}>
          {requestReset.isPending ? "Sending…" : "Send reset link"}
        </Button>
        <p className="text-center text-xs">
          <Link to="/" className="text-slate-600 underline hover:text-teal-900">
            Back to home
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
