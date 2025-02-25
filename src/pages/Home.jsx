import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../utility/Button";
import Loader from "../components/Loader";
import { useAuth } from "../components/AuthContext";
import { FaDumbbell, FaBookOpen, FaPrayingHands, FaRunning, FaLeaf, FaBrain } from "react-icons/fa"; // ✅ Import Icons
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import EditHabitModal from "../components/EditHabitModal";
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
  const [editData, setEditData] = useState({ name: "", description: "", frequency: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
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

  const completeHabit = async (habitId, lastCompleted) => {
    const today = new Date().toDateString();
    const lastCompletedDate = lastCompleted ? new Date(lastCompleted).toDateString() : null;

    // ✅ Prevent API call if habit is already completed today
    if (lastCompletedDate === today) {
      alert("✅ You have already completed this habit today!");
      return;
    }

    try {
      const response = await axios.put(
        "/api/v1/complete",
        { habitId },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit._id === habitId
            ? { ...habit, streak: response.data.habitStreak, lastCompleted: new Date() }
            : habit
        )
      );

      setUserData((prevUser) => ({
        ...prevUser,
        streak: response.data.userStreak,
        longestStreak: response.data.longestStreak,
      }));

      alert("Habit Marked as Completed!");
    } catch (error) {
      alert("Error completing habit, please try again.");
    }
  };

  const deleteHabit = async (habitId) => {
    const confirmDelete = window.confirm("❌ Are you sure you want to delete this habit?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/v1/delete/${habitId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      setHabits((prevHabits) => prevHabits.filter((habit) => habit._id !== habitId));

      alert("✅ Habit deleted successfully!");
    } catch (error) {
      alert("❌ Error deleting habit, please try again.");
    }
  };

 

  const handleRippleEffect = (e) => {
    const button = e.currentTarget;

    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const size = Math.max(button.clientWidth, button.clientHeight);
    const rect = button.getBoundingClientRect();

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  const handleEditHabitClick = (habit) => {
    setSelectedHabit(habit);
    setIsEditing(true);
  };

  const handleSaveHabit = (updatedHabit) => {
    console.log("Updated Habit:", updatedHabit);
    setIsEditing(false);
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
                  <button
                    onClick={(e) => {
                      handleRippleEffect(e);
                      handleEditHabitClick(habit); // Habit edit modal open function
                    }}
                    className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-500 cursor-pointer transition duration-300"
                  >
                    ✏️
                  </button>
                  <h2 className="text-xl font-bold  text-center">{habit.name}</h2>
                  <p className="text-sm text-center">{habit.description || "No description provided"}</p>
                  <div className="w-24 h-24 mt-4">
                    <CircularProgressbar
                      value={progress}
                      text={`${habit.streak} days`}
                      styles={buildStyles({
                        pathColor: "#4ADE80",
                        trailColor: "#1E293B",
                        textSize: "14px",
                      })}
                    />
                  </div>

                  <p className="text-sm  mt-2">Frequency: {habit.frequency}</p>
                  <Button
                    onClick={() => completeHabit(habit._id, habit.lastCompleted)}
                    className={`mt-4 w-full py-2 rounded-lg text-white font-bold transition ${habit.lastCompleted && new Date(habit.lastCompleted).toDateString() === new Date().toDateString()
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                      }`}
                  >
                    {habit.lastCompleted && new Date(habit.lastCompleted).toDateString() === new Date().toDateString()
                      ? "✅ Completed Today"
                      : "✔️ Mark as Done"}
                  </Button>
                  <Button
                    onClick={() => deleteHabit(habit._id)}
                    className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition"
                  >
                    🗑 Delete Habit
                  </Button>


                </div>
              );
            })
          )}
        </div>
      )}
      <div className="flex justify-center">
        <Button
          className=" font-bold py-3 px-6 rounded-lg hover:shadow-lg"
          onClick={() => setShowModal(true)}
        >
          ➕ Add New Habit
        </Button>
      </div>
      {showModal && (
        <div className="fixed inset-0  bg-opacity-50 flex backdrop-blur-xl justify-center items-center">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl w-[500px] shadow-2xl transition-all scale-105  border border-white/20">
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
                className="w-full p-3 border cursor-pointer border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
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

      <EditHabitModal
        isOpen={isEditing}
        habitData={selectedHabit}
        onClose={() => setIsEditing(false)}
        onSave={handleSaveHabit}
      />
    </div>
  );
};

export default Home;
