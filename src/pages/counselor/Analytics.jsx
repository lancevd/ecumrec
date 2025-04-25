export default function Analytics() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics & Reports</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          [Charts Placeholder]
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Exportable Reports</h2>
        <button className="px-4 py-2 rounded bg-primary text-white">Export as CSV</button>
      </div>
    </div>
  );
} 