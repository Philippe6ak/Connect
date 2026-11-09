import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ROLES } from "./routes/roles";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";

import HomePage from "./features/home/HomePage";
import StudentGuide from "./features/guides/StudentGuide";
// import LoginPage from "./features/auth/LoginPage";
import SignupPage from "./features/auth/SignUpPage";
import ForgotPasswordPage from "./features/auth/ForgotPasswordPage";
import ResetPasswordPage from "./features/auth/ResetPasswordPage";
// import StudentProfilePage from "./features/student/StudentProfilePage";
// import QuestionsPage from "./features/student/QuestionsPage";
// import TeacherDashboardPage from "./features/teacher/TeacherDashboardPage";
// import AdminDashboardPage from "./features/admin/AdminDashboardPage";
// import NotFoundPage from "./features/NotFoundPage";
import StudentLeader from "./features/guides/StudentLeader";
import PlaceholderPage from "./ui/PlaceholderPage";

export default function App() {
  return (
    <Routes>
      {/* Public: no shared layout, Home carries its own header */}
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/student-guide" element={<StudentGuide />} /> */}
      <Route path="/student-guide" element={<StudentLeader />} /> FOR TESTING UI PAGES ONLY
      {/* <Route path="/login" element={<HomePage initialLoginOpen={false} />} /> */}
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignupPage />} /> {/* expects ?invite=TOKEN */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>
      {/* Student */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]} />}>
        <Route element={<AppLayout />}>
          <Route path="/profile" element={<PlaceholderPage title="Profile" />} />
          <Route path="/questions" element={<PlaceholderPage title="Questions" />} />
        </Route>
      </Route>
      {/* Teacher */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.TEACHER]} />}>
        <Route element={<AppLayout />}>
          <Route path="/teacher" element={<PlaceholderPage title="Teacher Dashboard" />} />
        </Route>
      </Route>
      {/* Superuser */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.SUPERUSER]} />}>
        <Route element={<AppLayout />}>
          <Route path="/admin" element={<PlaceholderPage title="Admin Dashboard" />} />
        </Route>
      </Route>
      <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
    </Routes>
  );
}
