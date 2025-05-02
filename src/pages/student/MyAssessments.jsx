export default function MyAssessments() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#184C85]">My Assessments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-[#184C85] mb-2">Academic Assessment</h2>
          <div className="text-gray-600 mb-2">Completed: 2024-04-01</div>
          <button className="px-4 py-2 rounded bg-[#184C85] text-white font-semibold hover:bg-[#123a69]">View</button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-[#184C85] mb-2">Behavioral Assessment</h2>
          <div className="text-gray-600 mb-2">Completed: 2024-03-15</div>
          <button className="px-4 py-2 rounded bg-[#184C85] text-white font-semibold hover:bg-[#123a69]">View</button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-[#184C85] mb-2">Socio-emotional Assessment</h2>
          <div className="text-gray-600 mb-2">Follow-up required</div>
          <button className="px-4 py-2 rounded bg-[#184C85] text-white font-semibold hover:bg-[#123a69]">Complete Follow-up</button>
        </div>
      </div>
    </div>
  );
} 