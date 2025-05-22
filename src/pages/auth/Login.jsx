import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [userType, setUserType] = useState('school'); // school, counselor, student
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`http://localhost:5100/api/auth/${userType}/login`, formData);
      const { token, user } = response.data;
      
      // Store token and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on role
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'staff':
          navigate('/counselor/dashboard');
          break;
        case 'student':
          navigate('/student/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <div className="flex justify-center mb-4">
        <img
          src={"../../assets/Ecummrec.png"}
          alt="Electronic Cumulative Record Logo"
          className="h-10"
        />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-[#184C85]">
        Sign in to your account
      </h2>

      {/* User Type Selection */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">Login as</label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setUserType('school')}
            className={`flex-1 py-2 px-4 rounded-lg ${
              userType === 'school'
                ? 'bg-[#184C85] text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            School
          </button>
          <button
            type="button"
            onClick={() => setUserType('counselor')}
            className={`flex-1 py-2 px-4 rounded-lg ${
              userType === 'counselor'
                ? 'bg-[#184C85] text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Counselor
          </button>
          <button
            type="button"
            onClick={() => setUserType('student')}
            className={`flex-1 py-2 px-4 rounded-lg ${
              userType === 'student'
                ? 'bg-[#184C85] text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Student
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-gray-700"
          >
            Your email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-1 font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#184C85] text-white rounded-lg font-semibold hover:bg-[#123a69] transition"
        >
          Sign in
        </button>
        <div className="flex justify-between mt-2 text-sm">
          <Link to={`/register?type=${userType}`} className="text-[#184C85] hover:underline">
            Create account
          </Link>
          <Link
            to="/forgot-password"
            className="text-[#184C85] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
} 