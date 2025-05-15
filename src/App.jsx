import { Routes, Route } from "react-router-dom";
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
    <main className="h-screen">
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        </Route>

        {/* Counselor Routes */}
        <Route path="/counselor" element={<CounselorLayout />}>
          <Route index element={<CounselorDashboard />} />
          <Route path="students" element={<StudentDirectory />} />
          <Route path="students/:id" element={<StudentProfile />} />
          <Route path="new-assessment" element={<NewAssessment />} />
          <Route path="assessment-queue" element={<AssessmentQueue />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="resources" element={<ResourcesLibrary />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="assessments" element={<MyAssessments />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="resources" element={<Resources />} />
          <Route path="progress" element={<ProgressTracker />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="counselors" element={<Counselors />} />
          <Route path="create-user" element={<CreateUser />} />
          {/* <Route path="/admin/settings" element={<Dashboard />} /> */}
        </Route>

        {/* Default redirect to login */}
        {/* <Route path="*" element={<Login />} /> */}
      </Routes>

      <h1>Hello World</h1>
      <h2>Hello I am your royal guyyyyy</h2>
    </main>
  );
}

export default App;
