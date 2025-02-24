import { useEffect, useState } from "react";
import { Home, List, User, Settings, Menu, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./AuthContext";
import axios from "axios";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    if (!isOpen) {
      setShowDropdown(false);
    }
  }, [isOpen]);

  const handleLogout = async () => {
    try {

      const token = user?.token; // Token extract karo
    console.log("🔹 Extracted Token:", token);

    if (!token) {
      console.error("No token found, user may already be logged out.");
      logout(); // Local UI se user hatao
      navigate("/login");
      return;
    }
      await axios.post("/api/v1/logout", {},
         { withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Ensure token is sent
          },
          });
  
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  };
  
  return (
    <motion.div
      animate={{ width: isOpen ? 260 : 80 }}
      className="h-screen  dark:bg-pink-200/30 backdrop-blur-lg shadow-xl flex flex-col p-4 transition-all relative"

    >
      <button
        onClick={handleSidebarToggle}
        className="mb-6 flex items-center cursor-pointer gap-2 px-3 py-2 rounded-lg transition shadow-md bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:scale-105"
      >
        <Menu size={24} />
        {isOpen && <span className="text-lg cursor-pointer font-semibold">Menu</span>}
      </button>

      {/* Navigation Links */}
      <nav className="space-y-4 flex-1">
        {[
          { icon: Home, label: "Home", path: "/" },
          { icon: List, label: "Tasks", path: "/tasks" },
          { icon: User, label: "Profile", path: "/profile" },
          { icon: Settings, label: "Settings", path: "/settings" },
        ].map((item, index) => (
          <Link to={item.path} key={index} className="block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center cursor-pointer gap-4 p-3 rounded-lg transition dark:bg-pink-600/30 backdrop-blur-lg  hover:bg-gradient-to-r from-pink-400 to-purple-500 dark:hover:bg-gradient-to-r from-pink-400 to-purple-500 text-gray-800 dark:text-gray-200"
            >
              <item.icon size={24} />
              {isOpen && <span className="text-lg cursor-pointer font-medium">{item.label}</span>}
            </motion.div>
          </Link>
        ))}
      </nav>

      {/* Profile Avatar Fixed at Bottom */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full flex flex-col items-center">
        <div
          className="relative flex items-center gap-3 p-2 rounded-lg cursor-pointer w-full justify-center transition hover:scale-105"
          onClick={() => {
            setIsOpen(true); // Open sidebar when clicking on profile
            setShowDropdown((prev) => !prev); // Toggle dropdown
          }}
        >
          {user?.avatar ? (
            <motion.img
              src={user.avatar}
              alt="User Avatar"
              className="w-14 h-14 rounded-full border-2 border-purple-500 object-cover shadow-lg"
            />
          ) : (
            <motion.div className="w-14 h-14 flex items-center justify-center bg-purple-500 text-white text-xl rounded-full shadow-lg">
              {user?.username?.charAt(0).toUpperCase()}
            </motion.div>
          )}
        </div>

        {/* Animated Dropdown Menu */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-52  rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="flex flex-col">
                <button className="w-full text-left cursor-pointer px-4 py-3 transition hover:bg-gradient-to-r from-pink-400 to-purple-500 hover:dark:hover:bg-gradient-to-r from-pink-400 to-purple-500">
                  Profile
                </button>
                <button className="w-full text-left cursor-pointer px-4 py-3 transition hover:bg-gradient-to-r from-pink-400 to-purple-500 hover:dark:bg-gradient-to-r from-pink-400 to-purple-500">
                  Settings
                </button>
                <button
                onClick={() => navigate("/update-avatar")}
                className="w-full text-left cursor-pointer px-4 py-3 transition hover:bg-gradient-to-r from-pink-400 to-purple-500 hover:dark:bg-gradient-to-r from-pink-400 to-purple-500">
                  Update Avatar
                </button>
                <button
                
                className="w-full text-left cursor-pointer px-4 py-3 transition hover:bg-gradient-to-r from-pink-400 to-purple-500  hover:dark:bg-gradient-to-r from-pink-400 to-purple-500">
                  Privacy
                </button>
                <button
                  className="w-full flex items-center cursor-pointer gap-2 px-4 py-3 text-red-500 hover:bg-red-500 hover:text-white transition"
                  onClick={handleLogout}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Sidebar;
