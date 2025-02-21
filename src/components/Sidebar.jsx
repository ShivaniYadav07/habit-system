import { useState } from "react";
import { Home, List, User, Settings, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
<motion.div
      animate={{ width: isOpen ? 250 : 80 }}
      className="h-screen bg-gray-900 text-white shadow-lg flex flex-col p-4 transition-all"
    >
      <button onClick={() => setIsOpen(!isOpen)} className="mb-6 text-white">
        <Menu size={24} />
      </button>
      
      <nav className="space-y-6">
        {[
          { icon: Home, label: "Home", path: "/" },
          { icon: List, label: "Tasks", path: "/tasks" },
          { icon: User, label: "Profile", path: "/profile" },
          { icon: Settings, label: "Settings", path: "/settings" }
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
    </motion.div>
  );
};

export default Sidebar;
