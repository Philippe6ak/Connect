// src/api/api.js
// Plain async functions that talk to Supabase. No React in here.
// Each one returns data or THROWS an Error, which is what React Query expects:
//   useQuery({ queryKey: ['myStudents'], queryFn: listMyStudents })
//   useMutation({ mutationFn: deleteStudent, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['myStudents'] }) })
// Security is enforced by the database (RLS), not by this file: hiding a button in the UI
// is only a convenience, the database refuses anything the user is not allowed to do.
import { supabase } from "../lib/supabaseClient";

// ---------- helpers ----------
function unwrap({ data, error }) {
  if (error) throw error;
  return data;
}

// Turns Supabase errors into text you can show in a toast.
export function friendlyError(error) {
  const msg = error?.message ?? "";
  if (msg.includes("Database error saving new user"))
    return "Sign-up failed. Check your invite link and that every field is valid.";
  if (msg.includes("Invalid login credentials")) return "Wrong email or password.";
  if (msg.includes("Email not confirmed"))
    return "Please confirm your email first (check your inbox).";
  if (msg.includes("rate limit")) return "Too many attempts. Please wait a few minutes.";
  if (msg.includes("Not allowed") || error?.code === "42501")
    return "You are not allowed to do this.";
  return msg || "Something went wrong.";
}

export const buildInviteLink = (token) => `${window.location.origin}/signup?invite=${token}`;

// ---------- auth ----------
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

/**
 * Student sign-up. The extra fields travel as "metadata" and the database trigger
 * (script 3) turns them into the student's rows. With email confirmation ON, the result
 * has a user but NO session: show "check your email". An email that already exists also
 * looks like a success (Supabase hides it on purpose).
 */
export async function signUpStudent({
  inviteToken,
  email,
  password,
  firstName,
  lastName,
  gender,
  ageRange,
  studentCode,
  termsVersion,
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/`,
      // emailRedirectTo: `${window.location.origin}/login`,
      data: {
        invite_token: inviteToken,
        first_name: firstName,
        last_name: lastName,
        gender, // 'Male' | 'Female'
        age_range: ageRange, // '18-23' | '24-29' | '30-39' | '40-49' | '50-59' | '60+'
        student_code: studentCode,
        terms_accepted: true,
        terms_version: termsVersion, // e.g. 'v1'
      },
    },
  });
  if (error) throw error;
  return data;
}

export async function signIn(email, password) {
  return unwrap(await supabase.auth.signInWithPassword({ email, password }));
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function requestPasswordReset(email) {
  return unwrap(
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    }),
  );
}

// Used on the /reset-password page, once the user arrived through the email link.
export async function updatePassword(newPassword) {
  return unwrap(await supabase.auth.updateUser({ password: newPassword }));
}

// ---------- who am I ----------
// Returns { id, role } or null (= logged in but no profile: show "account not set up").
export async function getMyProfile(userId) {
  return unwrap(await supabase.from("profiles").select("id, role").eq("id", userId).maybeSingle());
}

// ---------- invite link (works before login) ----------
// Returns { university, country_code } or null when the token is invalid.
export async function getInviteInfo(token) {
  const rows = unwrap(await supabase.rpc("get_invite_info", { p_token: token }));
  return rows?.[0] ?? null;
}

// ---------- student ----------
export async function getMyInstitution() {
  const rows = unwrap(await supabase.rpc("my_institution"));
  return rows?.[0] ?? null; // { university, country_code, website }
}

export async function getMyStudent(userId) {
  return unwrap(await supabase.from("students").select("*").eq("id", userId).single());
}

// Only these columns can be edited (the database enforces it too).
export async function updateMyStudent(
  userId,
  { firstName, lastName, gender, ageRange, studentCode },
) {
  return unwrap(
    await supabase
      .from("students")
      .update({
        first_name: firstName,
        last_name: lastName,
        gender,
        age_range: ageRange,
        student_code: studentCode,
      })
      .eq("id", userId)
      .select()
      .single(),
  );
}

const PREFERENCE_KEYS = [
  "english_level",
  "languages",
  "comment",
  ...Array.from({ length: 14 }, (_, i) => `a${i + 1}`),
];

export async function getPreferences(studentId) {
  return unwrap(
    await supabase.from("student_preferences").select("*").eq("student_id", studentId).single(),
  );
}

// values: { english_level: 'B2', languages: '...', a1: 3, ..., a14: 5, comment: '...' }
// Unknown keys are dropped. completed_at is set by the database once everything is answered.
export async function updatePreferences(studentId, values) {
  const clean = Object.fromEntries(
    Object.entries(values).filter(([k]) => PREFERENCE_KEYS.includes(k)),
  );
  return unwrap(
    await supabase
      .from("student_preferences")
      .update(clean)
      .eq("student_id", studentId)
      .select()
      .single(),
  );
}

// Afterwards the app must sign out: call signOut() and go back to the home page.
export async function deleteMyAccount() {
  unwrap(await supabase.rpc("delete_my_account"));
}

// ---------- teacher ----------
// RLS returns only the students of the teacher's own institution.
export async function listMyStudents() {
  return unwrap(
    await supabase
      .from("students")
      .select("id, first_name, last_name, email, gender, age_range, student_code, created_at")
      .order("last_name"),
  );
}

// The teacher's own institution (includes invite_token, for the "copy my invite link" button).
export async function getMyTeachingInstitution() {
  return unwrap(await supabase.from("institutions").select("*").maybeSingle());
}

// Teacher (own students) or superuser (any student).
export async function deleteStudent(studentId) {
  unwrap(await supabase.rpc("delete_student", { p_student_id: studentId }));
}

// ---------- superuser ----------
// One row per student with institution info and whether the preferences form is done
// (student_preferences.completed_at is null = not done yet).
export async function listAllStudents() {
  return unwrap(
    await supabase
      .from("students")
      .select(
        "id, first_name, last_name, email, gender, age_range, student_code, created_at, " +
          "institutions(id, university, country_code, teacher_name), " +
          "student_preferences(completed_at)",
      )
      .order("created_at", { ascending: false }),
  );
}

export async function listInstitutions() {
  return unwrap(await supabase.from("institutions").select("*").order("university"));
}

export async function addInstitution({
  university,
  website,
  countryCode,
  teacherName,
  teacherEmail,
}) {
  return unwrap(
    await supabase
      .from("institutions")
      .insert({
        university,
        website: website || null,
        country_code: countryCode.toUpperCase(),
        teacher_name: teacherName,
        teacher_email: teacherEmail || null,
      })
      .select()
      .single(),
  );
}

export async function updateInstitution(id, fields) {
  return unwrap(await supabase.from("institutions").update(fields).eq("id", id).select().single());
}

// Replaces the invite token (use when a link leaked). Old links stop working immediately.
export async function regenerateInviteToken(id) {
  const token = crypto.randomUUID().replaceAll("-", "") + crypto.randomUUID().replaceAll("-", "");
  return updateInstitution(id, { invite_token: token });
}
