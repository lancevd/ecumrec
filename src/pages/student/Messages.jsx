export default function Messages() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#184C85]">Messages</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="h-40 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          [Secure Chat Interface Placeholder]
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-[#184C85]">Recent Messages</h2>
        <ul className="space-y-2 text-gray-700">
          <li><span className="font-semibold">Counselor:</span> Please complete your assessment.</li>
          <li><span className="font-semibold">You:</span> I will do it today.</li>
        </ul>
      </div>
    </div>
  );
} 