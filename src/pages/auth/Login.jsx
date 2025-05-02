import { Link } from 'react-router-dom';

export default function Login() {
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
      <form className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-gray-700"
          >
            Your email
          </label>
          <input
            id="email"
            type="email"
            required
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
            type="password"
            required
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
          <Link to="/register" className="text-[#184C85] hover:underline">
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