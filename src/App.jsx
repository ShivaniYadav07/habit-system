
import ThemeToggle from "./utility/ToggleTheme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HabitCreation from "./pages/HabitCreation";
import ProfilePage from "./pages/ProfilePage";
const App = () => {
  return (
    <>
        <ThemeToggle />
        <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-habit" element={<HabitCreation />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>

    </>
  );
};

export default App;
