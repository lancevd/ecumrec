import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

export default function Settings() {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      counselor_surname_name: '',
      counselor_other_name: '',
      counselor_email: '',
      counselor_phone: '',
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  // Mock function to simulate fetching counselor data
  const fetchCounselorData = () => {
    // In a real application, this would be an API call
    return {
      counselor_surname_name: 'John',
      counselor_other_name: 'Doe',
      counselor_email: 'john.doe@example.com',
      counselor_phone: '+2348012345678',
    };
  };

  // Load initial data
  useEffect(() => {
    const data = fetchCounselorData();
    reset(data);
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      // In a real application, this would be an API call
      console.log('Form data:', data);
      setIsEditing(false);
      // Show success message
    } catch (error) {
      console.error('Error updating profile:', error);
      // Show error message
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#184C85]">Settings & Account</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-[#184C85]">Profile Settings</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded bg-[#184C85] text-white hover:bg-[#123a69] transition"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Surname */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Surname
              </label>
              <input
                type="text"
                {...register('counselor_surname_name', {
                  required: 'Surname is required',
                  pattern: {
                    value: /^[A-Za-z\s-']+$/,
                    message: 'Invalid surname format',
                  },
                })}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85] ${
                  !isEditing ? 'bg-gray-50' : ''
                }`}
              />
              {errors.counselor_surname_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.counselor_surname_name.message}
                </p>
              )}
            </div>

            {/* Other Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Other Name
              </label>
              <input
                type="text"
                {...register('counselor_other_name', {
                  required: 'Other name is required',
                  pattern: {
                    value: /^[A-Za-z\s-']+$/,
                    message: 'Invalid name format',
                  },
                })}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85] ${
                  !isEditing ? 'bg-gray-50' : ''
                }`}
              />
              {errors.counselor_other_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.counselor_other_name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...register('counselor_email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85] ${
                  !isEditing ? 'bg-gray-50' : ''
                }`}
              />
              {errors.counselor_email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.counselor_email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                {...register('counselor_phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: 'Invalid phone number format',
                  },
                })}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85] ${
                  !isEditing ? 'bg-gray-50' : ''
                }`}
              />
              {errors.counselor_phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.counselor_phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Password Change Section */}
          {isEditing && (
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4 text-[#184C85]">
                Change Password
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    {...register('current_password', {
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                  />
                  {errors.current_password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.current_password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    {...register('new_password', {
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                  />
                  {errors.new_password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.new_password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    {...register('confirm_password', {
                      validate: (value) =>
                        value === getValues('new_password') ||
                        'Passwords do not match',
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                  />
                  {errors.confirm_password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirm_password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {isEditing && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 rounded bg-[#184C85] text-white hover:bg-[#123a69] transition"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 