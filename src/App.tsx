import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import Navbar from "./components/Navbar";
import LoginPage from "./components/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
import NewPasswordForm from "./components/Login/NewPassword";
import SuperAdminDash from "./components/SuperAdmin/SuperAdminDash";
import DistrictDashboard from "./components/SuperAdmin/DistrictDash";
import Attendancedash from "./components/SuperAdmin/Attendancedashboard/Attendancedash";
import Academicdashboard from "./components/SuperAdmin/AcademicDashboard/Academicdashboard";
import MidDayDash from "./components/SuperAdmin/MidDayMealDashboard/MidDayDash";
import SchoolDashboard from "./components/SuperAdmin/SchoolDashboard/ScoolDashboard";
import CCtvDashboard from "./components/SuperAdmin/CCtv Dashboard/CCtvDashboard";
import TeachersDash from "./components/SuperAdmin/Teachers Dashboard/TeachersDash";
import TeachersDashboard from "./components/SuperAdmin/SuperTeachersDashboard";
import SuperStudentDashboard from "./components/SuperAdmin/SuperStudentDashboard";
import ProgressDashboard from "./components/SuperAdmin/ProgressDashboard";
import TeacherDashboard from "./components/SuperAdmin/TeacherPersonalDashboard";
import NutritionDashboard from "./components/SuperAdmin/NutritionDashboard";
import TotalTeachersDash from "./components/SuperAdmin/TotalTeachersDash";
import ExaminationDashboard from "./components/SuperAdmin/AcademicDashboard/ExaminationDash";
import ProjectDashboard from "./components/SuperAdmin/AcademicDashboard/ProjectDash";
import NotificationCenter from "./components/SuperAdmin/Notification";
function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute requireAuth={false} />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/newpassword" element={<NewPasswordForm />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/*" element={<Navbar />} />
        <Route path="/super-admin" element={<SuperAdminDash />} />
        <Route path="/super-admin/:state/:district/:year" element={<DistrictDashboard />} />
        <Route path="/super-admin/:state/:district/:year/attendance-dashboard" element={<Attendancedash />} />
        <Route path="/super-admin/:state/:district/:year/academic-dashboard" element={<Academicdashboard />} />
        <Route path="/super-admin/:state/:district/:year/mid-day-meal" element={<MidDayDash />} />
        <Route path="/super-admin/dashboard/:state/:district/:year/:schoolname" element={<SchoolDashboard />} />
        <Route path="/super-admin/cctv/dashboard/:state/:district/:year/:schoolname" element={<CCtvDashboard />} />
        <Route path="/super-admin/teachers/dashboard/:state/:district/:year/:schoolname" element={<TeachersDash />} />
        <Route path="/super-admin/teachers/dashboard" element={<TeachersDashboard />} />
        <Route path="/super-admin/student/dashboard" element={<SuperStudentDashboard />} />
        <Route path="/super-admin/progress/dashboard" element={<ProgressDashboard />} />
        <Route path="/super-admin/government/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/nutrition-dashboard" element={<NutritionDashboard />} />
        <Route path="/total-teachers" element={<TotalTeachersDash />} />
        <Route path="/super-admin/:state/:district/:year/examination-dashboard" element={<ExaminationDashboard />} />
        <Route path="/super-admin/:state/:district/:year/project-dashboard" element={<ProjectDashboard />} />
        <Route path="/notification" element={<NotificationCenter />} />
      </Route>

    </Routes>
  );
}

export default App;
