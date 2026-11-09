import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthCard from "../../ui/AuthCard";
import InstitutionBanner from "../../ui/InstitutionBanner";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import ChoiceGroup from "../../ui/ChoiceGroup";
import Checkbox from "../../ui/Checkbox";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useInviteInfo } from "../../hooks/useInvite";
import { useSignUp } from "../../hooks/useAuth";
import { AGE_RANGES, GENDERS, PASSWORD_MIN_LENGTH, TERMS_VERSION } from "./constants";

export default function SignupPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("invite");
  const navigate = useNavigate();
  const [submittedEmail, setSubmittedEmail] = useState(null);

  const { data: invite, isLoading, isError } = useInviteInfo(token);
  const signUp = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      ageRange: "",
      studentCode: "",
      terms: false,
    },
  });

  function onSubmit(values) {
    signUp.mutate(
      {
        inviteToken: token,
        termsVersion: TERMS_VERSION,
        email: values.email.trim(),
        password: values.password,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        gender: values.gender,
        ageRange: values.ageRange,
        studentCode: values.studentCode.trim(),
      },
      {
        onSuccess: (data) => {
          // With email confirmation ON there is no session yet: show "check your email".
          if (data.session) navigate("/profile", { replace: true });
          else setSubmittedEmail(values.email.trim());
        },
      },
    );
  }

  if (!token) return <InvalidInvite />;
  if (isLoading) return <Spinner />;
  if (isError || !invite) return <InvalidInvite />;

  if (submittedEmail) {
    return (
      <AuthCard
        title="Check your email"
        subtitle={`We sent a confirmation link to ${submittedEmail}.`}>
        <p className="text-sm text-stone-600">
          Click the link, then log in. Nothing in your inbox? Check your spam folder. You may also
          already have an account with this email, in which case you can simply log in.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-block text-sm font-semibold text-teal-900 underline">
          Go to log in
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      banner={
        <InstitutionBanner university={invite.university} countryCode={invite.country_code} />
      }
      title="Create your account"
      subtitle="Connect with peer language partners across the globe.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="First name"
            autoComplete="given-name"
            error={errors.firstName?.message}
            {...register("firstName", { required: "First name is required" })}
          />
          <Input
            label="Last name"
            autoComplete="family-name"
            error={errors.lastName?.message}
            {...register("lastName", { required: "Last name is required" })}
          />
        </div>

        <Input
          label="University email"
          type="email"
          autoComplete="email"
          placeholder="name@institution.edu"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
          })}
        />

        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
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
          label="Student code"
          placeholder="The code your university gave you"
          error={errors.studentCode?.message}
          {...register("studentCode", { required: "Student code is required" })}
        />

        <Select
          label="Age range"
          placeholder="Select your age range"
          options={AGE_RANGES}
          error={errors.ageRange?.message}
          {...register("ageRange", { required: "Please select your age range" })}
        />

        <ChoiceGroup
          label="Gender"
          options={GENDERS}
          error={errors.gender?.message}
          {...register("gender", { required: "Please select an option" })}
        />

        <Checkbox
          error={errors.terms?.message}
          {...register("terms", { required: "You must accept the terms to continue" })}>
          I agree that my responses and university profile will be used for partner matching under
          the {/* placeholder: link to your real terms page when it exists */}
          <span className="font-semibold text-teal-900 underline underline-offset-2">
            Terms &amp; Conditions
          </span>
          .
        </Checkbox>

        <Button type="submit" disabled={signUp.isPending} className="mt-2">
          {signUp.isPending ? "Creating account…" : "Create account"}
        </Button>

        <p className="text-center text-xs text-stone-600">
          Already have an account?{" "}
          <Link
            to="/"
            state={{ openLogin: true }}
            className="font-semibold text-teal-900 underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}

function InvalidInvite() {
  return (
    <AuthCard
      title="Invalid invite link"
      subtitle="This link is missing, expired or no longer valid.">
      <p className="text-sm text-stone-600">Please ask your teacher for a new invite link.</p>
      <Link to="/" className="mt-6 inline-block text-sm font-semibold text-teal-900 underline">
        Back to home
      </Link>
    </AuthCard>
  );
}
