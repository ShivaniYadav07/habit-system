import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../utility/Button";
import axios from "axios";
import { useAuth } from "./AuthContext";

const Avatar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [avatarSeed, setAvatarSeed] = useState("default");
  const [avatarStyle, setAvatarStyle] = useState("adventurer"); // Default style
  const avatarStyles = ["adventurer", "bottts", "avataaars", "micah", "pixel-art"];
  const [loading, setLoading] = useState(false);

  const generateNewAvatar = () => {
    setAvatarSeed(Math.random().toString(36).substring(7));
  };

  useEffect(() => {
    localStorage.setItem("hasCompletedAvatar", "true");
  }, []);

  const avatarUrl = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`;

  const uploadAvatar = async () => {
    setLoading(true);
    
    try {
      // Fetch image as a Blob
      const response = await fetch(avatarUrl);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append("avatar", blob, "avatar.png"); // ✅ File Append
  
      const res = await axios.post("/api/v1/upload-avatar", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // ✅ FormData ke liye correct headers
        },
      });
  
      if (res.data.success) {
        alert("Avatar uploaded successfully!");
        navigate("/");
      } else {
        alert("Failed to upload avatar");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Server error! Please try again.");
    }
    
    setLoading(false);
  };
  
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 ">
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-white/20 dark:bg-gray-800/30 shadow-2xl backdrop-blur-lg text-center border border-white/30">
        
        <div className="absolute -top-6 -right-6 w-14 h-14 bg-purple-400 rounded-full blur-lg opacity-40"></div>
        <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-blue-400 rounded-full blur-lg opacity-40"></div>

        <h1 className="text-3xl font-extrabold text-white mb-4">
          Customize Your Avatar
        </h1>

        <div className="relative mx-auto w-44 h-44 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg transition hover:scale-105">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-full h-full"
          />
        </div>

        <div className="relative mt-4 w-full">
  <label className="text-white text-lg font-semibold">Choose Style:</label>
  <div className="relative mt-2">
    <select
      className="w-full cursor-pointer p-3 rounded-lg bg-white/30 text-white dark:bg-gray-700 dark:text-white border border-white/40 transition focus:ring-2 focus:ring-purple-400 focus:outline-none appearance-none"
      value={avatarStyle}
      onChange={(e) => setAvatarStyle(e.target.value)}
    >
      {avatarStyles.map((style) => (
        <option key={style} value={style} className="text-black dark:text-white bg-white dark:bg-gray-700">
          {style.charAt(0).toUpperCase() + style.slice(1)}
        </option>
      ))}
    </select>

    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
      <svg
        className="w-5 h-5 text-white dark:text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</div>


        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={generateNewAvatar}
            className="px-6 py-3 bg-purple-500 text-white font-bold rounded-lg shadow-md hover:bg-purple-600 hover:scale-105 transition"
          >
            🎲 Randomize
          </Button>

          <Button
            onClick={uploadAvatar}
            disabled={loading}
            className={`px-6 py-3 rounded-lg shadow-md transition ${
              loading ? "bg-gray-500" : "hover:scale-105"
            }`}
          >
            {loading ? "Uploading..." : "Save & Continue"}
          </Button>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 text-white text-lg font-medium cursor-pointer hover:underline hover:text-gray-200 transition"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default Avatar;
