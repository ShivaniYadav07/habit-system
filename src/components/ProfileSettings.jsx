import { useState } from "react";
import { X, User, Lock, Settings, Info, LogOut } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ProfileSettings = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-bold">Profile Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-between border-b pb-2">
          {[
            { id: "profile", label: "Profile", icon: <User size={20} /> },
            { id: "security", label: "Security", icon: <Lock size={20} /> },
            { id: "account", label: "Account", icon: <Info size={20} /> },
            { id: "settings", label: "Settings", icon: <Settings size={20} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                activeTab === tab.id ? "bg-purple-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="mt-4"
          >
            {activeTab === "profile" && <ProfileUpdate />}
            {activeTab === "security" && <PrivacySecurity />}
            {activeTab === "account" && <AccountDetails />}
            {activeTab === "settings" && <AccountSettings />}
          </motion.div>
        </AnimatePresence>

        {/* Logout Button */}
        <button
          className="mt-4 w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg text-white"
          onClick={() => {
            logout();
            onClose();
            navigate("/login");
          }}
        >
          <LogOut size={20} className="inline mr-2" />
          Logout
        </button>
      </motion.div>
    </div>
  );
};

/* Individual Tabs */
const ProfileUpdate = () => (
  <div>
    <h2 className="text-lg font-bold mb-2">Update Profile</h2>
    <p>Edit your profile details.</p>
  </div>
);

const PrivacySecurity = () => (
  <div>
    <h2 className="text-lg font-bold mb-2">Privacy & Security</h2>
    <p>Manage your security settings.</p>
  </div>
);

const AccountDetails = () => (
  <div>
    <h2 className="text-lg font-bold mb-2">Account Details</h2>
    <p>View and edit your account details.</p>
  </div>
);

const AccountSettings = () => (
  <div>
    <h2 className="text-lg font-bold mb-2">Account Settings</h2>
    <p>Manage your account preferences.</p>
  </div>
);

export default ProfileSettings;
