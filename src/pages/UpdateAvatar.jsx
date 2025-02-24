import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import axios from "axios";
import Loader from "../components/Loader";

const avatarStyles = ["adventurer", "avataaars", "bottts", "micah", "pixel-art"]; // Avatar styles

const UpdateAvatar = () => {
  const { user, login } = useAuth();
  const [pageLoading, setPageLoading] = useState(true);
  const [avatarStyle, setAvatarStyle] = useState("adventurer");
  const [avatarSeed, setAvatarSeed] = useState(user?.username || "random");
  const [customAvatar, setCustomAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const avatarURL = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`;

  useState(() => {
    if (user) setPageLoading(false);
  }, [user]);
  const generateNewAvatar = () => {
    setAvatarSeed(Math.random().toString(36).substring(7)); // Random seed
  };

  const uploadAvatar = async () => {
    setLoading(true);
    try {
      const avatarUrl = customAvatar
        ? await uploadImageToServer(customAvatar)
        : avatarURL;

      const response = await axios.put(
        "/api/v1/update-avatar",
        { avatarUrl },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      const updatedUser = { ...user, avatar: response.data.avatar, token: response.data.token };
      localStorage.setItem("user", JSON.stringify(updatedUser));
  
      login(updatedUser);
      alert("Avatar updated successfully!");
    } catch (error) {
      console.error("Avatar update failed:", error);
      alert("Failed to update avatar. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-white/20 dark:bg-gray-800/30 shadow-2xl backdrop-blur-lg text-center border border-white/30">
        
        <h1 className="text-3xl font-extrabold text-white mb-4">
          Customize Your Avatar
        </h1>

        <div className="relative mx-auto w-44 h-44 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg transition hover:scale-105">
          <img src={avatarURL} alt="User Avatar" className="w-full h-full" />
        </div>

        <div className="mt-4 w-full">
          {/* <label className="text-white text-lg font-semibold">Choose Style:</label> */}
          <select
            className="w-full p-3 rounded-lg bg-white/30 text-white dark:bg-gray-700 dark:text-white border border-white/40"
            value={avatarStyle}
            onChange={(e) => setAvatarStyle(e.target.value)}
          >
            {avatarStyles.map((style) => (
              <option key={style} value={style} className="text-black dark:text-white">
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* <input
          type="file"
          id="avatarInput"
          accept="image/*"
          className="mt-4 p-2 w-full text-white"
          onChange={handleFileChange} 
        /> */}

        <div className="flex justify-center gap-4 mt-6">
          <button onClick={generateNewAvatar} className="px-6 py-3 bg-purple-500 text-white font-bold rounded-lg">
            🎲 Randomize
          </button>

          <button onClick={uploadAvatar} disabled={loading} className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg">
            {loading ? "Updating..." : "Update Avatar"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default UpdateAvatar;
