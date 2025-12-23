import { createContext, useContext, useState } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) return null;

    const decoded = jwtDecode(token);

    return {
      token,
      username: decoded.sub,
      role,
    };
  });

  const login = (token, role) => {
    const decoded = jwtDecode(token);

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setAuth({
      token,
      username: decoded.sub,
      role,
    });
  };

  const logout = () => {
    localStorage.clear();
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ ONLY hook you ever use
export const useAuth = () => useContext(AuthContext);
