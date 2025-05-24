import { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      setUser(null);
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
    setLoading(false);
  };

  useEffect(() => {
    // Initial auth check
    checkAuth();

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "token" || e.key === "user") {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = async (userData) => {
    try {
      const response = await axiosInstance.post("/auth/login", userData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user);
      
      // Navigate to appropriate dashboard based on role
      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "staff":
          navigate("/counselor");
          break;
        case "student":
          navigate("/student");
          break;
        default:
          navigate("/login");
      }

      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axiosInstance.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 