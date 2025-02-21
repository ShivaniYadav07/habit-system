import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HabitCreation from "./pages/HabitCreation";
import ProfilePage from "./pages/ProfilePage";
import ToggleTheme from "./utility/ToggleTheme";

const App = () => {
  return (
    <>
    <ToggleTheme/>
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-habit" element={<HabitCreation />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  );
};

export default App;
