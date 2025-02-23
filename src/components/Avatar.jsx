import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../utility/Button";
import axios from "axios";
import { useAuth } from "./AuthContext";

const Avatar = () => {
  const navigate = useNavigate();
  const { user, updateAvatar } = useAuth();
  const [avatarSeed, setAvatarSeed] = useState("default");
  const [avatarStyle, setAvatarStyle] = useState("adventurer");
  const avatarStyles = ["adventurer", "bottts", "avataaars", "micah", "pixel-art"];
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    localStorage.setItem("hasCompletedAvatar", "true");
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("📂 File Selected:", file);

    if (file) {
      setSelectedFile(file);
    }
  };

  const generateNewAvatar = () => {
    setAvatarSeed(Math.random().toString(36).substring(7));
  };
  

  const avatar = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`;

  const uploadAvatar = async () => {
    setLoading(true);
    
    try {
      // Fetch image as a Blob
      const response = await fetch(avatar);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append("avatar", blob, "avatar.png"); // ✅ File Append
  
      const token = user?.token;
      const res = await axios.post("/api/v1/upload-avatar", formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-white/20 dark:bg-gray-800/30 shadow-2xl backdrop-blur-lg text-center border border-white/30">
        
        <h1 className="text-3xl font-extrabold text-white mb-4">
          Customize Your Avatar
        </h1>

        <div className="relative mx-auto w-44 h-44 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg transition hover:scale-105">
          <img src={avatar} alt="User Avatar" className="w-full h-full" />
        </div>

        <div className="mt-4 w-full">
          <label className="text-white text-lg font-semibold">Choose Style:</label>
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

        <input
          type="file"
          id="avatarInput"
          accept="image/*"
          className="mt-4 p-2 w-full text-white"
          onChange={handleFileChange} 
        />

        <div className="flex justify-center gap-4 mt-6">
          <Button onClick={generateNewAvatar} className="px-6 py-3 bg-purple-500 text-white font-bold rounded-lg">
            🎲 Randomize
          </Button>

          <Button onClick={uploadAvatar} disabled={loading} className="px-6 py-3 rounded-lg shadow-md">
            {loading ? "Uploading..." : "Save & Continue"}
          </Button>
        </div>

        <button onClick={() => navigate("/")} className="mt-6 text-white text-lg font-medium">
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default Avatar;
