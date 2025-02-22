import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import goalAnimation from "../assets/goal.json";
import streakAnimation from "../assets/streak.json";
import reminderAnimation from "../assets/reminder.json";
import { Button } from "../utility/Button";
import goal from "../assets/goal.jpg"
import streak from "../assets/streak.webp"
import reminder from "../assets/reminder.webp"


const steps = [
  {
    title: "Welcome to Your Habit Tracker 🎯",
    description: "Build habits, track progress, and stay motivated every day.",
    animation: goalAnimation,
    Image: goal
  },
  {
    title: "Track Your Streaks 🔥",
    description: "Monitor your longest streaks and stay consistent!",
    animation: streakAnimation,
    Image: streak
  },
  {
    title: "Never Miss a Habit ⏰",
    description: "Get timely reminders to keep you on track.",
    animation: reminderAnimation,
    Image: reminder
  },
];

const Welcome = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("hasCompletedWelcome", "true");

    // Remove `/welcome` from history
    window.history.replaceState(null, "", "/avatar");
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  dark:from-gray-800 dark:to-gray-900 p-6">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-3xl p-8 rounded-3xl bg-white dark:bg-pink-800 shadow-2xl flex flex-col items-center text-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl filter blur-sm opacity-90" 
          style={{ backgroundImage: `url(${steps[step].Image})` }}
        ></div>
        <div className="absolute inset-0 rounded-3xl"></div>
        <div className="relative z-10 flex flex-col items-center">

        <Lottie animationData={steps[step].animation} className="h-56 w-56" />

        <h1 className="text-3xl text-white font-bold  mt-6">
          {steps[step].title}
        </h1>
        <p className="text-lg text-white  mt-3">
          {steps[step].description}
        </p>

        <div className="flex mt-5">
          {steps.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 mx-1 rounded-full transition-all ${
                step === index
                  ? "bg-pink-400 w-4 h-4"
                  : "bg-white dark:bg-white"
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between w-full mt-8">
          {step > 0 && (
            <Button
              onClick={() => setStep(step - 1)}
              className="px-5 py-3  rounded-lg shadow-md hover:scale-105 transition"
            >
              Back
            </Button>
          )}

          {step < steps.length - 1 ? (
            <Button
              onClick={() => setStep(step + 1)}
              className="px-6 py-3  rounded-lg shadow-md hover:bg-purple-700 hover:scale-105 transition"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/avatar")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transition"
            >
              Get Started 🚀
            </Button>
          )}
        </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;
