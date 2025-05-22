import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-light">
      <div className="w-full max-w-80% bg-white rounded-lg shadow-lg p-8">
        {/* <div className="flex justify-center mb-4">
          <img
            src={"../assets/Ecummrec.png"}
            alt="Electronic Cumulative Record Logo"
            className="h-10"
          />
        </div> */}
        <Outlet />
      </div>
    </div>
  );
} 