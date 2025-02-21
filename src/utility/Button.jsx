import { useTheme } from "./ThemeProvider";

const Button = ({ children, onClick, className }) => {
  const { darkMode } = useTheme();

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg text-lg 
        ${
          darkMode
            ? "bg-gradient-to-r from-purple-800 to-indigo-700 text-white hover:from-purple-900 hover:to-indigo-800 shadow-purple-500/50"
            : "bg-gradient-to-r from-pink-400 to-rose-500 text-white hover:from-pink-500 hover:to-rose-600 shadow-pink-400/50"
        } 
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
