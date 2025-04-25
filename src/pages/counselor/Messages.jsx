export default function Messages() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Messages & Notifications</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-40 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          [Inbox Placeholder]
        </div>
        <ul className="mt-6 space-y-2 text-gray-700">
          <li><span className="font-semibold">John Doe:</span> Please review my assessment.</li>
          <li><span className="font-semibold">Jane Smith:</span> Appointment rescheduled.</li>
        </ul>
      </div>
    </div>
  );
} 