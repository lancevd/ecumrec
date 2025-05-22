import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function CreateUser() {
  const [userType, setUserType] = useState("student");
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userData = {
        ...data,
        schoolId: user.schoolId
      };

      const response = await axiosInstance.post(
        `/auth/${userType}/register`,
        userData
      );
      
      toast.success(`${userType === 'student' ? 'Student' : 'Counselor'} created successfully!`);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating user");
      console.error(
        "Error creating user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-[#184C85]">
            Create New User
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setUserType("student")}
              className={`px-4 py-2 rounded ${
                userType === "student"
                  ? "bg-[#184C85] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setUserType("counselor")}
              className={`px-4 py-2 rounded ${
                userType === "counselor"
                  ? "bg-[#184C85] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Counselor
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Common Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Surname
              </label>
              <input
                type="text"
                {...register("lastName", {
                  required: "Surname is required",
                  pattern: {
                    value: /^[A-Za-z\s-']+$/,
                    message: "Invalid surname format",
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                  pattern: {
                    value: /^[A-Za-z\s-']+$/,
                    message: "Invalid name format",
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Student-specific Fields */}
            {userType === "student" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Admission Number
                  </label>
                  <input
                    type="text"
                    {...register("admissionNo", {
                      required: "Admission number is required",
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                  />
                  {errors.admissionNo && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.admissionNo.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {userType === "counselor" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    {...register("specialization", {
                      required: "Specialization is required",
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded bg-[#184C85] text-white hover:bg-[#123a69] transition"
            >
              Create {userType === "student" ? "Student" : "Counselor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
