import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    // Penyesuaian padding dan min-height
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
