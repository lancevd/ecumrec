import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import "./App.css";

// Layout components
import CounselorLayout from "./layouts/CounselorLayout";
import StudentLayout from "./layouts/StudentLayout";
import AuthLayout from "./layouts/AuthLayout";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import ForgotPassword from './pages/auth/ForgotPassword';

// Counselor pages
import CounselorDashboard from "./pages/counselor/Dashboard";
import StudentDirectory from "./pages/counselor/StudentDirectory";
import StudentProfile from "./pages/counselor/StudentProfile";
import NewAssessment from "./pages/counselor/NewAssessment";
import AssessmentQueue from "./pages/counselor/AssessmentQueue";
import Appointments from "./pages/counselor/Appointments";
import Analytics from "./pages/counselor/Analytics";
import ResourcesLibrary from "./pages/counselor/ResourcesLibrary";
import Settings from "./pages/counselor/Settings";

// Student pages
import StudentDashboard from "./pages/student/Dashboard";
import MyAssessments from "./pages/student/MyAssessments";
import Schedule from "./pages/student/Schedule";
import Resources from "./pages/student/Resources";
import ProgressTracker from "./pages/student/ProgressTracker";
import Profile from "./pages/student/Profile";
import Dashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Students";
import Counselors from "./pages/admin/Counselors";
import CreateUser from "./pages/admin/CreateUser";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <AuthProvider>
        <Toaster position="top-right" />
        <main className="h-screen">
          <Routes>
            {/* Auth Routes */}
            <Route element={<PublicRoute />}>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            </Route>

            {/* Counselor Routes */}
            <Route element={<ProtectedRoute allowedRoles={["staff"]} />}>
              <Route element={<CounselorLayout />}>
                <Route path="/counselor" element={<CounselorDashboard />} />
                <Route path="/counselor/students" element={<StudentDirectory />} />
                <Route path="/counselor/students/:id" element={<StudentProfile />} />
                <Route path="/counselor/new-assessment" element={<NewAssessment />} />
                <Route path="/counselor/assessment-queue" element={<AssessmentQueue />} />
                <Route path="/counselor/appointments" element={<Appointments />} />
                <Route path="/counselor/analytics" element={<Analytics />} />
                <Route path="/counselor/resources" element={<ResourcesLibrary />} />
                <Route path="/counselor/settings" element={<Settings />} />
              </Route>
            </Route>

            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
              <Route element={<StudentLayout />}>
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/student/assessments" element={<MyAssessments />} />
                <Route path="/student/schedule" element={<Schedule />} />
                <Route path="/student/resources" element={<Resources />} />
                <Route path="/student/progress" element={<ProgressTracker />} />
                <Route path="/student/profile" element={<Profile />} />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/students" element={<Students />} />
                <Route path="/admin/counselors" element={<Counselors />} />
                <Route path="/admin/create-user" element={<CreateUser />} />
              </Route>
            </Route>

            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Catch all route - redirect to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
    </AuthProvider>
  );
}

export default App;
