import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const EditHabitModal = ({ isOpen, onClose, habitData, onSave }) => {
  const [editData, setEditData] = useState(habitData || { name: "", description: "", frequency: "" });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (habitData) {
      setEditData(habitData);
    }
  }, [habitData]);


  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!editData.name.trim()) {
      alert("Habit name cannot be empty!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`/api/v1/update/${editData._id}`, editData, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      onSave(response.data.habit);  // Update UI with new habit data
      alert("Habit updated successfully! ✅");
      onClose();
    } catch (error) {
      console.error("Error updating habit:", error);
      alert("Failed to update habit! ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl w-full max-w-lg relative border border-gray-200 dark:border-gray-700"
            initial={{ scale: 0.8, y: 50 }} 
            animate={{ scale: 1, y: 0 }} 
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition duration-300"
              onClick={onClose}
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">Edit Habit</h2>

            {/* Name Input */}
            <div className="mb-3">
              <label className="text-gray-600 dark:text-gray-300">Habit Name</label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 dark:bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Habit Name"
              />
            </div>

            {/* Description Input */}
            <div className="mb-3">
              <label className="text-gray-600 dark:text-gray-300">Description</label>
              <textarea
                name="description"
                value={editData.description}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 dark:bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your habit..."
              />
            </div>

            {/* Frequency Dropdown */}
            <div className="mb-3">
              <label className="text-gray-600 dark:text-gray-300">Frequency</label>
              <select
                name="frequency"
                value={editData.frequency}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 dark:bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* Save Button */}
            <button 
              onClick={handleSave}
              className={`mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg hover:shadow-lg hover:opacity-90 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditHabitModal;
