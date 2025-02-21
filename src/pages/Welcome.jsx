import { useTheme } from "../utility/ThemeProvider";

const Welcome = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6`}
    >
      <div
        className="relative w-full max-w-4xl p-8 rounded-2xl shadow-lg 
        backdrop-blur-md  border border-white/20 dark:border-gray-700"
      >
        <h1 className="text-4xl font-bold text-center mb-6 
         drop-shadow-md">
          Welcome to Your Habit Tracker
        </h1>
        
        <p className="text-lg text-center mb-6">
          Build habits, track progress, and stay motivated every day.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-purple-100 dark:bg-purple-400 shadow-md  transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">Daily Goals</h3>
            <p>Track and achieve your daily habits efficiently.</p>
          </div>

          <div className="p-6 rounded-xl bg-yellow-100 dark:bg-yellow-400 shadow-md  hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">Streak Progress</h3>
            <p>Monitor your longest streaks and keep pushing forward.</p>
          </div>

          <div className="p-6 rounded-xl bg-pink-100 dark:bg-pink-400 shadow-md  hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">Reminders</h3>
            <p>Get timely notifications to stay on track.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
