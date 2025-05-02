export default function Profile() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#184C85]">Profile & Privacy</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-[#184C85]">Personal Details</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Full Name</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]" type="text" placeholder="Full Name" />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]" type="email" placeholder="Email" />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Phone</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]" type="text" placeholder="Phone" />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Date of Birth</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]" type="date" />
          </div>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-[#184C85]">Emergency Contact</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Contact Name</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]" type="text" placeholder="Contact Name" />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Contact Phone</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]" type="text" placeholder="Contact Phone" />
          </div>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-[#184C85]">Data Sharing Consent</h2>
        <div className="flex items-center mb-2">
          <input type="checkbox" id="consent" className="w-4 h-4 text-[#184C85] border-gray-300 rounded focus:ring-[#184C85]" />
          <label htmlFor="consent" className="ml-2 text-gray-700">I consent to data sharing for counseling purposes.</label>
        </div>
        <button className="mt-4 px-4 py-2 rounded bg-[#184C85] text-white font-semibold hover:bg-[#123a69]">Save Changes</button>
      </div>
    </div>
  );
} 