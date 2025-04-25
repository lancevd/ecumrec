export default function ResourcesLibrary() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Resources Library</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col items-center justify-center h-32 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          [Uploadable Guides & Forms Placeholder]
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">External Links</h2>
        <ul className="list-disc ml-5 text-gray-700">
          <li><a href="#" className="text-primary hover:underline">Intervention Guide</a></li>
          <li><a href="#" className="text-primary hover:underline">Referral Form</a></li>
        </ul>
      </div>
    </div>
  );
} 