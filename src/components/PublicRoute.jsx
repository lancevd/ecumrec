import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin" replace />;
      case "staff":
        return <Navigate to="/counselor" replace />;
      case "student":
        return <Navigate to="/student" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  // If not authenticated, render the auth pages
  return <Outlet />;
};

export default PublicRoute; 