import { Outlet } from 'react-router-dom';

export default function CounselorLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4 flex flex-col">
        <div className="text-2xl font-bold text-primary mb-8">ecumrec</div>
        <nav className="flex-1 space-y-2">
          <a href="/counselor" className="block py-2 px-4 rounded hover:bg-primary/10">Dashboard</a>
          <a href="/counselor/students" className="block py-2 px-4 rounded hover:bg-primary/10">Student Directory</a>
          <a href="/counselor/new-assessment" className="block py-2 px-4 rounded hover:bg-primary/10">New Assessment</a>
          <a href="/counselor/assessment-queue" className="block py-2 px-4 rounded hover:bg-primary/10">Assessment Queue</a>
          <a href="/counselor/appointments" className="block py-2 px-4 rounded hover:bg-primary/10">Appointments</a>
          <a href="/counselor/analytics" className="block py-2 px-4 rounded hover:bg-primary/10">Analytics</a>
          <a href="/counselor/resources" className="block py-2 px-4 rounded hover:bg-primary/10">Resources</a>
          <a href="/counselor/messages" className="block py-2 px-4 rounded hover:bg-primary/10">Messages</a>
          <a href="/counselor/settings" className="block py-2 px-4 rounded hover:bg-primary/10">Settings</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
} 