import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaUserGraduate, FaUsers, FaClipboardList, FaCalendarAlt, FaChartBar, FaBook, FaEnvelope, FaCog, FaHome } from 'react-icons/fa';
import Logo from '../assets/Ecummrec.png'

const navItems = [
  { label: 'Dashboard', icon: <FaHome />, to: '/counselor' },
  { label: 'Student Directory', icon: <FaUsers />, to: '/counselor/students' },
  { label: 'New Assessment', icon: <FaClipboardList />, to: '/counselor/new-assessment' },
  { label: 'Assessment Queue', icon: <FaClipboardList />, to: '/counselor/assessment-queue' },
  { label: 'Appointments', icon: <FaCalendarAlt />, to: '/counselor/appointments' },
  { label: 'Analytics', icon: <FaChartBar />, to: '/counselor/analytics' },
  { label: 'Resources', icon: <FaBook />, to: '/counselor/resources' },
  { label: 'Messages', icon: <FaEnvelope />, to: '/counselor/messages' },
  { label: 'Settings', icon: <FaCog />, to: '/counselor/settings' },
];

export default function CounselorLayout() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen bg-[#f6f8fa]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen">
        <div className="flex items-center gap-2 px-6 py-6">
          <img
            src={Logo}
            alt="Electronic Cumulative Record Logo"
            className="h-8"
          />
          {/* <span className="font-bold text-lg text-[#184C85]">ecumrec</span> */}
        </div>
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors hover:bg-[#184C85]/10 text-[#184C85] ${
                location.pathname === item.to
                  ? "bg-[#184C85]/10 font-semibold"
                  : ""
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-6 py-4 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} ecumrec
        </div>
      </aside>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 h-16">
          <div className="flex-1 flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-72 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85] bg-gray-50"
            />
          </div>
          <div className="flex items-center gap-4">
            {/* Notification icon placeholder */}
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <span className="sr-only">Notifications</span>
              <svg
                className="w-5 h-5 text-[#184C85]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            {/* User avatar placeholder */}
            <div className="w-9 h-9 rounded-full bg-[#184C85] flex items-center justify-center text-white font-bold">
              C
            </div>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 