import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // 
  }, []);

  const login = (userData, isNewUser = false) => {
    localStorage.setItem("user", JSON.stringify(userData));
    if (isNewUser) {
      localStorage.setItem("isNewUser", "true");
    }
    setUser(userData);
  };
  const updateAvatar = (avatarUrl) => {
    if (user) {
      const updatedUser = { ...user, avatar: avatarUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser); 
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, updateAvatar, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
