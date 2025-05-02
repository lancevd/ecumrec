export default function Resources() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#184C85]">Resources & Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-[#184C85] mb-2">Self-help Worksheet</h2>
          <div className="text-gray-600 mb-2">Managing Exam Stress</div>
          <button className="px-4 py-2 rounded bg-[#184C85] text-white font-semibold hover:bg-[#123a69]">Download</button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-[#184C85] mb-2">Video</h2>
          <div className="text-gray-600 mb-2">Time Management Tips</div>
          <button className="px-4 py-2 rounded bg-[#184C85] text-white font-semibold hover:bg-[#123a69]">Watch</button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-[#184C85] mb-2">Recommended Reading</h2>
          <div className="text-gray-600 mb-2">Building Resilience</div>
          <button className="px-4 py-2 rounded bg-[#184C85] text-white font-semibold hover:bg-[#123a69]">Read</button>
        </div>
      </div>
    </div>
  );
} 