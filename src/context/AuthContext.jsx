import { createContext, useState, useEffect, useContext } from "react";
import { mockUsers } from "../data/users";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hapus baris 'import { useNavigate } from "react-router-dom";' jika ada
  // Hapus baris 'const navigate = useNavigate();' jika ada

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
        console.log(
          "User loaded from localStorage:",
          JSON.parse(storedUser).name
        ); // Logging
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error); // Logging error lebih deskriptif
      localStorage.removeItem("currentUser"); // Hapus jika ada data yang korup
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, password) => {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      const userData = { id: user.id, email: user.email, name: user.name };
      localStorage.setItem("currentUser", JSON.stringify(userData));
      setCurrentUser(userData);
      console.log("Login successful for:", user.name); // Logging sukses login
      return true;
    }
    console.warn("Login failed: Invalid email or password for", email); // Logging gagal login
    return false;
  };

  const signup = (name, email, password) => {
    const userExists = mockUsers.find((u) => u.email === email);
    if (userExists) {
      console.warn("Signup failed: Email already exists:", email); // Logging gagal signup
      return false;
    }
    // Karena mockUsers bukan state yang reaktif, penambahan ini hanya sementara di memory.
    // Dalam aplikasi nyata, ini akan melibatkan API/database.
    const newUser = { id: Date.now(), name, email, password };
    mockUsers.push(newUser);

    const userData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setCurrentUser(userData);
    console.log("Signup successful for:", newUser.name); // Logging sukses signup
    return true;
  };

  // Fungsi logout yang sudah diperbarui
  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    console.log("User logged out."); // Logging logout
    // Hapus baris 'navigate('/login');' karena navigasi ditangani di komponen lain
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Render children hanya setelah loading selesai */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
