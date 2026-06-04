import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    return JSON.parse(localStorage.getItem("AUTH_USER") || "null");
  });

  const login = (data) => {
    localStorage.setItem("AUTH_USER", JSON.stringify(data));
    setAuth(data);
  };

  const logout = () => {
    localStorage.removeItem("AUTH_USER");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
