export default function StudentProfile() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Student Profile: John Doe</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Demographics & Contact Info</h2>
          <div className="text-gray-700">
            <div><span className="font-medium">Name:</span> John Doe</div>
            <div><span className="font-medium">Grade:</span> 10</div>
            <div><span className="font-medium">Email:</span> john@example.com</div>
            <div><span className="font-medium">Phone:</span> (555) 123-4567</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Assessment History</h2>
          <ul className="list-disc ml-5 text-gray-700">
            <li>Academic Assessment - 2024-04-01</li>
            <li>Behavioral Assessment - 2024-03-15</li>
            <li>Socio-emotional Assessment - 2024-02-20</li>
          </ul>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Notes & Action Plans</h2>
        <ul className="list-disc ml-5 text-gray-700">
          <li>Follow up on math performance</li>
          <li>Schedule peer mediation session</li>
        </ul>
      </div>
    </div>
  );
} 