import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <div className="flex justify-center mb-4">
        <img src={'../../assets/Ecummrec.png'} alt="Electronic Cumulative Record Logo" className="h-10" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-[#184C85]">Create an account</h2>
      <form className="space-y-5">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Your name</label>
          <input id="name" type="text" required placeholder="John Doe" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]" />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Your email</label>
          <input id="email" type="email" required placeholder="name@company.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]" />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
          <input id="password" type="password" required placeholder="••••••••" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]" />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block mb-1 font-medium text-gray-700">Confirm password</label>
          <input id="confirm-password" type="password" required placeholder="••••••••" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]" />
        </div>
        <div className="flex items-center">
          <input id="terms" type="checkbox" required className="w-4 h-4 text-[#184C85] border-gray-300 rounded focus:ring-[#184C85]" />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">I accept the <a href="#" className="text-[#184C85] hover:underline">Terms and Conditions</a></label>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-[#184C85] text-white rounded-lg font-semibold hover:bg-[#123a69] transition">Create an account</button>
        <p className="text-sm text-center text-gray-600 mt-2">Already have an account? <Link to="/login" className="text-[#184C85] hover:underline">Login here</Link></p>
      </form>
    </div>
  );
} 