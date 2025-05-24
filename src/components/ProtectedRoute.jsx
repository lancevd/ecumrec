import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Check if user's role is allowed
  if (!allowedRoles.includes(user.role)) {
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

  // If authenticated and role is allowed, render the child routes
  return <Outlet />;
};

export default ProtectedRoute; 