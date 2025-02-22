import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-habit"
            element={
              <ProtectedRoute>
                <Layout>
                  <HabitCreation />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
