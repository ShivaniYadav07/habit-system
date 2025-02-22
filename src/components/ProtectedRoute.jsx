import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isNewUser = localStorage.getItem("isNewUser") === "true";

  if (loading) return null; // Jab tak loading hai, blank screen dikhao

  const hasCompletedWelcome = localStorage.getItem("hasCompletedWelcome");
  const hasCompletedAvatar = localStorage.getItem("hasCompletedAvatar");

  // Agar welcome complete ho gaya hai, toh wapas jane na do
  if (location.pathname === "/welcome" && hasCompletedWelcome) {
    return <Navigate to="/" replace />;
  }

  // Agar avatar complete ho gaya hai, toh wapas jane na do
  if (location.pathname === "/avatar" && hasCompletedAvatar) {
    return <Navigate to="/" replace />;
  }

  if (isNewUser) {
    localStorage.removeItem("isNewUser"); // ✅ Flag hata do, taaki sirf ek baar ho
    return <Navigate to="/welcome" replace />;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
