import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth(); // Ambil juga status loading dari AuthContext

  if (loading) {
    // Anda bisa menampilkan spinner atau loading screen di sini
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600 text-xl">
        Loading...
      </div>
    );
  }

  if (!currentUser) {
    // Redirect mereka ke halaman /login, tetapi simpan lokasi saat ini yang ingin mereka tuju.
    // Ini memungkinkan kita mengirim mereka ke halaman tersebut setelah mereka login.
    console.log("User not authenticated, redirecting to login."); // Logging
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
