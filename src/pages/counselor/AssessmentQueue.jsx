export default function AssessmentQueue() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Assessment Queue</h1>
      <div className="bg-white rounded-lg shadow divide-y">
        <div className="p-4 flex justify-between items-center">
          <div>
            <div className="font-semibold">John Doe</div>
            <div className="text-sm text-gray-500">Academic Assessment (In Progress)</div>
          </div>
          <button className="px-4 py-2 rounded bg-primary text-white">Continue</button>
        </div>
        <div className="p-4 flex justify-between items-center">
          <div>
            <div className="font-semibold">Jane Smith</div>
            <div className="text-sm text-gray-500">Behavioral Assessment (Draft)</div>
          </div>
          <button className="px-4 py-2 rounded bg-primary text-white">Continue</button>
        </div>
      </div>
    </div>
  );
} 