export default function Support() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#184C85]">Support & FAQ</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-[#184C85]">Quick Links</h2>
        <ul className="space-y-2 text-[#184C85]">
          <li><a href="#" className="hover:underline">Technical Help</a></li>
          <li><a href="#" className="hover:underline">Counseling FAQs</a></li>
          <li><a href="#" className="hover:underline">School Policies</a></li>
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-[#184C85]">Frequently Asked Questions</h2>
        <ul className="space-y-2 text-gray-700">
          <li><span className="font-semibold">Q:</span> How do I schedule a session?</li>
          <li><span className="font-semibold">A:</span> Go to the Schedule page and click on "Book Session".</li>
          <li><span className="font-semibold">Q:</span> Is my information confidential?</li>
          <li><span className="font-semibold">A:</span> Yes, all your data is kept confidential and secure.</li>
        </ul>
      </div>
    </div>
  );
} 