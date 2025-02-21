import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route, useLocation  } from "react-router-dom";
import Home from "./pages/Home";
import HabitCreation from "./pages/HabitCreation";
import ProfilePage from "./pages/ProfilePage";
import ToggleTheme from "./utility/ToggleTheme";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideSidebar = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="flex">
      {!hideSidebar && <Sidebar />}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <ToggleTheme />
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/create-habit" element={<ProtectedRoute element={<HabitCreation />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
