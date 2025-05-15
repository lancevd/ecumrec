import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CreateUser() {
  const [userType, setUserType] = useState('student');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // In a real application, this would be an API call
      console.log('Form data:', { ...data, userType });
      reset();
      // Show success message
    } catch (error) {
      console.error('Error creating user:', error);
      // Show error message
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-[#184C85]">Create New User</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setUserType('student')}
              className={`px-4 py-2 rounded ${
                userType === 'student'
                  ? 'bg-[#184C85] text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setUserType('counselor')}
              className={`px-4 py-2 rounded ${
                userType === 'counselor'
                  ? 'bg-[#184C85] text-white'
                  : 'bg-gray-100 text-gray-700'
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
                {...register('surname', {
                  required: 'Surname is required',
                  pattern: {
                    value: /^[A-Za-z\s-']+$/,
                    message: 'Invalid surname format',
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
              />
              {errors.surname && (
                <p className="mt-1 text-sm text-red-600">{errors.surname.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Other Name
              </label>
              <input
                type="text"
                {...register('otherName', {
                  required: 'Other name is required',
                  pattern: {
                    value: /^[A-Za-z\s-']+$/,
                    message: 'Invalid name format',
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
              />
              {errors.otherName && (
                <p className="mt-1 text-sm text-red-600">{errors.otherName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: 'Invalid phone number format',
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Student-specific Fields */}
            {userType === 'student' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Admission Number
                  </label>
                  <input
                    type="text"
                    {...register('admissionNo', {
                      required: 'Admission number is required',
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                  />
                  {errors.admissionNo && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.admissionNo.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year of Admission
                  </label>
                  <input
                    type="number"
                    {...register('yearOfAdmission', {
                      required: 'Year of admission is required',
                      min: {
                        value: 2000,
                        message: 'Invalid year',
                      },
                      max: {
                        value: new Date().getFullYear(),
                        message: 'Year cannot be in the future',
                      },
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                  />
                  {errors.yearOfAdmission && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.yearOfAdmission.message}
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
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded bg-[#184C85] text-white hover:bg-[#123a69] transition"
            >
              Create {userType === 'student' ? 'Student' : 'Counselor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 