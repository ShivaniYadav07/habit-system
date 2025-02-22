import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ✅ Always initialize state outside conditions
  const [redirectToWelcome, setRedirectToWelcome] = useState(false);

  // ✅ Always read localStorage values in the same order
  const isNewUser = localStorage.getItem("isNewUser") === "true";
  const hasCompletedWelcome = localStorage.getItem("hasCompletedWelcome") === "true";
  const hasCompletedAvatar = localStorage.getItem("hasCompletedAvatar") === "true";

  useEffect(() => {
    if (isNewUser) {
      localStorage.removeItem("isNewUser");
      setRedirectToWelcome(true);
    }
  }, [isNewUser]); // ✅ No conditional execution inside useEffect

  if (loading) return null; // ✅ Don't proceed until authentication is checked

  // 🚀 Redirect logic (kept outside useEffect to maintain hook order)
  if (redirectToWelcome) {
    return <Navigate to="/welcome" replace />;
  }

  if (location.pathname === "/welcome" && hasCompletedWelcome) {
    return <Navigate to="/" replace />;
  }

  if (location.pathname === "/avatar" && hasCompletedAvatar) {
    return <Navigate to="/" replace />;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
