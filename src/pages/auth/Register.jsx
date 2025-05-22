import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosInstance } from '../../utils/axiosInstance';

export default function Register() {
  const [formData, setFormData] = useState({
    schoolName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    type: '',
    website: ''
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/school/register', formData);
      const { token, user } = response.data;
      
      // Store token and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to admin dashboard
      navigate('/admin');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <div className="w-full max-w-[70%] mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <div className="flex justify-center mb-4">
        <img src={'../../assets/Ecummrec.png'} alt="Electronic Cumulative Record Logo" className="h-10" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-[#184C85]">Register Your School</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 grid grid-cols-2 gap-4 items-center">
        <div>
          <label htmlFor="schoolName" className="block mb-1 font-medium text-gray-700">School Name</label>
          <input
            id="schoolName"
            name="schoolName"
            type="text"
            required
            value={formData.schoolName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="name@school.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
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

        <div>
          <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
          />
        </div>

        <div>
          <label htmlFor="address" className="block mb-1 font-medium text-gray-700">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
          />
        </div>

        <div>
          <label htmlFor="type" className="block mb-1 font-medium text-gray-700">School Type</label>
          <select
            id="type"
            name="type"
            required
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
          >
            <option value="">Select type</option>
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="tertiary">Tertiary</option>
          </select>
        </div>

        <div>
          <label htmlFor="website" className="block mb-1 font-medium text-gray-700">Website (optional)</label>
          <input
            id="website"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
          />
        </div>

        <div className="flex items-center col-span-2">
          <input
            id="terms"
            type="checkbox"
            required
            className="w-4 h-4 text-[#184C85] border-gray-300 rounded focus:ring-[#184C85]"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
            I accept the <a href="#" className="text-[#184C85] hover:underline">Terms and Conditions</a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 col-span-2 px-4 bg-[#184C85] text-white rounded-lg font-semibold hover:bg-[#123a69] transition"
        >
          Register School
        </button>

        <p className="text-sm col-span-2 text-center text-gray-600 mt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-[#184C85] hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
} 