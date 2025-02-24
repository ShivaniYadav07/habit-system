import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../utility/Card";
import { Button } from "../utility/Button";
import Loader from "../components/Loader";
import { useAuth } from "../components/AuthContext";
import { FaDumbbell, FaBookOpen, FaPrayingHands, FaRunning, FaLeaf, FaBrain } from "react-icons/fa"; // ✅ Import Icons
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; 
const habitIcons = {
  exercise: <FaDumbbell className="text-4xl text-red-500" />,
  reading: <FaBookOpen className="text-4xl text-blue-500" />,
  meditation: <FaPrayingHands className="text-4xl text-purple-500" />,
  running: <FaRunning className="text-4xl text-green-500" />,
  yoga: <FaLeaf className="text-4xl text-teal-500" />,
  learning: <FaBrain className="text-4xl text-yellow-500" />,
};
const Home = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: "",
    description: "",
    frequency: "daily",
  });

  // ✅ Backend se Habits Load karne ka Function
  const fetchHabits = async () => {
    try {
      const response = await axios.get("/api/v1/gethabit", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setHabits(response.data.habits);
    } catch (error) {
      console.error("Error fetching habits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // ✅ Backend Par Habit Save Karne Ka Function
  const addHabit = async () => {
    if (!newHabit.name.trim()) return alert("Please enter a habit name!");

    try {
      const response = await axios.post(
        "/api/v1/create",
        { habits: [newHabit] },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      setHabits([...habits, ...response.data.habits]); // ✅ UI Update
      setNewHabit({ name: "", description: "", frequency: "daily" }); // ✅ Reset Form
      setShowModal(false); // ✅ Modal Band Karo
      alert("Habit created successfully!");
    } catch (error) {
      console.error("Error creating habit:", error);
      alert("Failed to create habit!");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">Your Habit Tracker</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {habits.length === 0 ? (
            <p className="text-center text-gray-300">No habits added yet.</p>
          ) : (
            habits.map((habit) => {
              const icon = habitIcons[habit.name.toLowerCase()] || <FaBrain className="text-4xl text-gray-500" />;
              const progress = Math.min((habit.streak / 30) * 100, 100);

              return (
                <div
                  key={habit._id}
                  className="relative bg-white/20 backdrop-blur-lg shadow-xl border border-white/30 rounded-2xl p-6 flex flex-col items-center transition transform hover:scale-105"
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-gray-800/80 rounded-full shadow-md mb-4">
                    {icon}
                  </div>

                  <h2 className="text-xl font-bold text-white text-center">{habit.name}</h2>
                  <p className="text-sm text-gray-300 text-center">{habit.description || "No description provided"}</p>

                  <div className="w-24 h-24 mt-4">
                    <CircularProgressbar
                      value={progress}
                      text={`${habit.streak} days`}
                      styles={buildStyles({
                        textColor: "#fff",
                        pathColor: "#4ADE80",
                        trailColor: "#1E293B",
                        textSize: "14px",
                      })}
                    />
                  </div>

                  <p className="text-sm text-gray-400 mt-2">Frequency: {habit.frequency}</p>

                  <Button className="mt-4 px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600">
                    Mark Done
                  </Button>
                </div>
              );
            })
          )}
        </div>
      )}

{showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl w-[500px] shadow-2xl transition-all scale-105 backdrop-blur-xl border border-white/20">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
              ✨ Create a New Habit
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Habit Name"
                value={newHabit.name}
                onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              />

              <textarea
                placeholder="Description (optional)"
                value={newHabit.description}
                onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              ></textarea>

              <select
                value={newHabit.frequency}
                onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                className="bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600"
                onClick={addHabit}
              >
                ✅ Add Habit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
