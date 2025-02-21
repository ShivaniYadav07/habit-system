import { useState } from "react";
import { Home, List, User, Settings, Menu } from "lucide-react";
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
        {[{ icon: Home, label: "Home" }, { icon: List, label: "Tasks" }, { icon: User, label: "Profile" }, { icon: Settings, label: "Settings" }].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 cursor-pointer"
          >
            <item.icon size={24} />
            {isOpen && <span className="text-lg">{item.label}</span>}
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
