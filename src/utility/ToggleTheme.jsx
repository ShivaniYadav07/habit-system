import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full transition-all duration-300 shadow-lg focus:outline-none 
      bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
    >
      {darkMode ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
};

export default ThemeToggle;