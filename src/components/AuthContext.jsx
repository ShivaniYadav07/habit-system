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
    setUser((prevUser) => {
      if (!prevUser) return null; // ✅ Agar user null hai to kuchh na karo
      const updatedUser = { ...prevUser, avatar: avatarUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
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
