export default function Appointments() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Appointments & Scheduling</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="h-48 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          [Calendar View Placeholder]
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
        <ul className="space-y-2 text-gray-700">
          <li>2024-04-28, 10:00 AM - John Doe</li>
          <li>2024-04-29, 1:00 PM - Jane Smith</li>
        </ul>
      </div>
    </div>
  );
} 