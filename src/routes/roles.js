export const ROLES = { STUDENT: "student", TEACHER: "teacher", SUPERUSER: "superuser" };

const HOME_BY_ROLE = {
  [ROLES.STUDENT]: "/profile",
  [ROLES.TEACHER]: "/teacher",
  [ROLES.SUPERUSER]: "/admin",
};

export const homePathForRole = (role) => HOME_BY_ROLE[role] ?? "/";
