export default function StudentDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#184C85]">Welcome back!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-[#184C85]">2</span>
          <span className="mt-2 text-gray-600">Upcoming Appointments</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-[#184C85]">1</span>
          <span className="mt-2 text-gray-600">Pending Tasks</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-[#184C85]">3</span>
          <span className="mt-2 text-gray-600">Recent Messages</span>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-[#184C85]">Recent Messages</h2>
        <ul className="space-y-2 text-gray-700">
          <li>Your counselor sent you a new message.</li>
          <li>Reminder: Complete your assessment form.</li>
        </ul>
      </div>
    </div>
  );
} 