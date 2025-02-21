import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div
        className={`min-h-screen transition-all duration-300 relative ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-purple-950 to-black text-white"
            : "bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-black"
        }`}
      >
        
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// ✅ Correct export method
export const useTheme = () => useContext(ThemeContext);
