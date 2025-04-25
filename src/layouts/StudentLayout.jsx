import { Outlet } from 'react-router-dom';

export default function StudentLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white shadow-lg p-4 flex flex-col">
        <div className="text-2xl font-bold text-primary mb-8">ecumrec</div>
        <nav className="flex-1 space-y-2">
          <a href="/student" className="block py-2 px-4 rounded hover:bg-primary/10">Home</a>
          <a href="/student/assessments" className="block py-2 px-4 rounded hover:bg-primary/10">My Assessments</a>
          <a href="/student/schedule" className="block py-2 px-4 rounded hover:bg-primary/10">Schedule</a>
          <a href="/student/resources" className="block py-2 px-4 rounded hover:bg-primary/10">Resources & Tools</a>
          <a href="/student/messages" className="block py-2 px-4 rounded hover:bg-primary/10">Messages</a>
          <a href="/student/progress" className="block py-2 px-4 rounded hover:bg-primary/10">Progress Tracker</a>
          <a href="/student/profile" className="block py-2 px-4 rounded hover:bg-primary/10">Profile & Privacy</a>
          <a href="/student/support" className="block py-2 px-4 rounded hover:bg-primary/10">Support & FAQ</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
} 