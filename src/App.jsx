import Button from "./utility/Button";
import { useTheme } from "./utility/ThemeProvider";

const App = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">
        {darkMode ? "Dark Mode 🌙" : "Light Mode ☀️"}
      </h1>
      <Button onClick={toggleTheme}>Toggle Theme</Button>
    </div>
  );
};

export default App;
