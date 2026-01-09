import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (!userId || !role) return null;

    return { userId, role };
  });

  const login = (userId, role) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);

    setAuth({ userId, role });
  };

  const logout = () => {
    localStorage.clear();
    setAuth(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ ONLY hook you ever use
export const useAuth = () => useContext(AuthContext);
