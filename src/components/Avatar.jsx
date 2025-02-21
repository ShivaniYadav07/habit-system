import { useAuth } from "./AuthContext";

const Avatar = () => {
  const { user } = useAuth();

  const defaultMaleAvatar = "/public/user-icon-male-person-symbol-profile-avatar-sign-vector-18991901.jpg";
  const defaultFemaleAvatar = "/public/female-306407_640.png";
  const defaultOtherAvatar = "/public/user-icon-male-person-symbol-profile-avatar-sign-vector-18991901.jpg";

  const getDefaultAvatar = () => {
    if (!user?.avatar) {
      if (user?.gender === "female") return defaultFemaleAvatar;
      if (user?.gender === "male") return defaultMaleAvatar;
      return defaultOtherAvatar; 
    }
    return user.avatar; 
  };

  return (
    <img
      src={getDefaultAvatar()}
      alt="User Avatar"
      className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-lg"
    />
  );
};

export default Avatar;
