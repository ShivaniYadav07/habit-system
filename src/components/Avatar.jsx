import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../utility/Button";

const Avatar = () => {
  const navigate = useNavigate();
  const [avatarSeed, setAvatarSeed] = useState("default");

  const generateNewAvatar = () => {
    setAvatarSeed(Math.random().toString(36).substring(7));
  };

  useEffect(() => {
    localStorage.setItem("hasCompletedAvatar", "true");
  }, []);
  const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${avatarSeed}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Create Your Avatar
        </h1>
        
        {/* Avatar Preview */}
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-purple-500 shadow-lg"
        />

        <div className="flex justify-center gap-4">
          <Button
            onClick={generateNewAvatar}
            className="px-5 cursor-pointer py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition"
          >
            Generate New
          </Button>

          <Button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transition"
          >
            Save & Continue
          </Button>
        </div>

        {/* Skip Option */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-gray-500 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default Avatar;
