export default function ProgressTracker() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#184C85]">Progress Tracker</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-[#184C85]">Goals & Milestones</h2>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-gray-700 font-medium">Academic Goal</span>
            <span className="text-gray-500">70%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div className="bg-[#184C85] h-3 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-gray-700 font-medium">Behavioral Goal</span>
            <span className="text-gray-500">50%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div className="bg-[#184C85] h-3 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-gray-700 font-medium">Socio-emotional Growth</span>
            <span className="text-gray-500">80%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div className="bg-[#184C85] h-3 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-[#184C85] mb-2">Milestone: Improved Attendance</h3>
          <div className="text-gray-600">Achieved: 2024-03-01</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-[#184C85] mb-2">Milestone: Completed Peer Mediation</h3>
          <div className="text-gray-600">Achieved: 2024-02-15</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-[#184C85] mb-2">Milestone: Math Grade Improvement</h3>
          <div className="text-gray-600">Achieved: 2024-01-20</div>
        </div>
      </div>
    </div>
  );
} 