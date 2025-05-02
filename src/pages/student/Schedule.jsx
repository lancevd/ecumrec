export default function Schedule() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#184C85]">My Schedule</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="h-48 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          [Calendar View Placeholder]
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-[#184C85]">Upcoming Sessions & Workshops</h2>
        <ul className="space-y-2 text-gray-700">
          <li>2024-05-01, 10:00 AM - Counseling Session</li>
          <li>2024-05-10, 2:00 PM - Study Skills Workshop</li>
        </ul>
      </div>
    </div>
  );
} 