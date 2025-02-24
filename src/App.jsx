import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import HabitCreation from "./pages/HabitCreation";
import ProfilePage from "./pages/ProfilePage";
import ToggleTheme from "./utility/ToggleTheme";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./pages/Welcome";
import Avatar from "./components/Avatar";
import { LoaderProvider } from "./utility/LoaderContext";
import UpdateAvatar from "./pages/UpdateAvatar";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideSidebar = ["/login", "/signup", "/welcome", "/avatar"].includes(location.pathname);

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
    <LoaderProvider/>
      <ToggleTheme />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

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
          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <Layout>
                  <Welcome />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/avatar"
            element={
              <ProtectedRoute>
                <Layout>
                  <Avatar />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-avatar"
            element={
              <ProtectedRoute>
                <Layout>
                  <UpdateAvatar />
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
