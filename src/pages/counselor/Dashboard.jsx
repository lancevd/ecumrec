export default function CounselorDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Counselor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-primary">5</span>
          <span className="mt-2 text-gray-600">Pending Assessments</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-primary">3</span>
          <span className="mt-2 text-gray-600">Upcoming Appointments</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-primary">12</span>
          <span className="mt-2 text-gray-600">Recent Activities</span>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2 text-gray-700">
          <li>Assessment started for John Doe</li>
          <li>Appointment scheduled with Jane Smith</li>
          <li>Note added to Michael Brown's profile</li>
        </ul>
      </div>
    </div>
  );
} 