import { useState } from "react";
import { Home, List, User, Settings, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.div
      animate={{ width: isOpen ? 250 : 80 }}
      className="h-screen bg-gray-900 text-white shadow-lg flex flex-col p-4 transition-all relative"
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-6 text-white flex items-center gap-2"
      >
        <Menu size={24} />
        {isOpen && <span className="text-lg">Menu</span>}
      </button>

      {/* Navigation Links */}
      <nav className="space-y-6 flex-1">
        {[
          { icon: Home, label: "Home", path: "/" },
          { icon: List, label: "Tasks", path: "/tasks" },
          { icon: User, label: "Profile", path: "/profile" },
          { icon: Settings, label: "Settings", path: "/settings" },
        ].map((item, index) => (
          <Link to={item.path} key={index}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 cursor-pointer"
            >
              <item.icon size={24} />
              {isOpen && <span className="text-lg">{item.label}</span>}
            </motion.div>
          </Link>
        ))}
      </nav>

      {/* User Profile at Bottom */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-purple-500 object-cover"
            onClick={() => navigate("/profile")}
          />
        ) : (
          <div
            className="w-15 h-15 flex items-center justify-center text-white rounded-full cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            {user?.username?.charAt(0).toUpperCase()}
          </div>
        )}
        {isOpen && <span className="text-lg">{user?.username}</span>}
      </div>
    </motion.div>
  );
};

export default Sidebar;
