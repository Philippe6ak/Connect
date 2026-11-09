import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  signIn,
  signUpStudent,
  requestPasswordReset,
  updatePassword,
  friendlyError,
} from "../api/api";

const onError = (error) => toast.error(friendlyError(error));

export function useSignIn() {
  return useMutation({
    mutationFn: ({ email, password }) => signIn(email, password),
    onError,
  });
}

// mutate({ inviteToken, email, password, firstName, lastName, gender, ageRange, studentCode, termsVersion })
// Result has `session` only if email confirmation is OFF.
export function useSignUp() {
  return useMutation({ mutationFn: signUpStudent, onError });
}

// mutate("name@school.edu")
export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (email) => requestPasswordReset(email),
    onError,
  });
}

// mutate("newPassword")
export function useUpdatePassword() {
  return useMutation({
    mutationFn: (newPassword) => updatePassword(newPassword),
    onSuccess: () => toast.success("Password updated."),
    onError,
  });
}
