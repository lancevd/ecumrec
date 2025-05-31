// Updated Login.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Ecummrec.png";
import { axiosInstance } from "../../utils/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("school");
  const [formData, setFormData] = useState({
    email: "",
    admissionNumber: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let payload;
      let url;

      if (userType === "school" || userType === "counselor") {
        payload = {
          email: formData.email,
          password: formData.password,
        };
      } else if (userType === "student") {
        payload = {
          admissionNumber: formData.admissionNumber,
          password: formData.password,
        };
      }

      url = `auth/${userType}/login`;

      const response = await axiosInstance.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });

      console.log(response);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else if (response.data.user.role === "staff") {
        navigate("/counselor");
      } else if (response.data.user.role === "student") {
        navigate("/student");
      }
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full md:w-3/5 space-y-8">
        <div className="flex flex-col items-center">
          <img src={Logo} alt="Electronic cumulative Record" />
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="flex justify-center space-x-4">
          {["school", "counselor", "student"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setUserType(type)}
              className={`px-4 py-2 rounded-md ${
                userType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md flex flex-col gap-3 shadow-sm -space-y-px">
            {userType !== "student" ? (
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            ) : (
              <input
                id="admissionNumber"
                name="admissionNumber"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Admission Number"
                value={formData.admissionNumber}
                onChange={handleChange}
              />
            )}

            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>

          <div className="text-sm text-center">
            {userType === "school" && (
              <a
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Don't have an account? Register
              </a>
            )}
            <div className="mt-2">
              <a
                href="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
