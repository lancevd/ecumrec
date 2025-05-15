import { Link, useLocation, Outlet } from 'react-router-dom';
import { FaUsers, FaUserTie, FaChartBar, FaCog, FaUserPlus } from 'react-icons/fa';

const navigation = [
  { name: 'Dashboard', path: '/admin', icon: FaChartBar },
  { name: 'Students', path: '/admin/students', icon: FaUsers },
  { name: 'Counselors', path: '/admin/counselors', icon: FaUserTie },
  { name: 'Create User', path: '/admin/create-user', icon: FaUserPlus },
  { name: 'Settings', path: '/admin/settings', icon: FaCog },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-[#184C85] text-white">
        <div className="flex items-center justify-center h-16 border-b border-[#2C6AA0]">
          <h1 className="text-xl font-bold">School Admin</h1>
        </div>
        <nav className="mt-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm font-medium ${
                  isActive
                    ? 'bg-[#2C6AA0] text-white'
                    : 'text-gray-300 hover:bg-[#2C6AA0] hover:text-white'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <header className="bg-white shadow">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {navigation.find((item) => item.path === location.pathname)?.name || 'Dashboard'}
            </h2>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 