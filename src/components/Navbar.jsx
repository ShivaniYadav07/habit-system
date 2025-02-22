
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
// import ToggleTheme from "../utility/ToggleTheme";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex justify-end items-center">

      <div className="flex items-center ">
        {/* <ToggleTheme /> */}

        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-15 h-15 rounded-full cursor-pointer border-2 border-purple-500 object-cover"
            onClick={() => navigate("/profile")}
          />
        ) : (
          <div
            className="w-10 h-10 flex items-center justify-center bg-purple-500 text-white rounded-full cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
     </div>
  );
};

export default Navbar;
