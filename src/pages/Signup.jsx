import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../utility/Button";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const handleChange = (e) => {
    setFormData({
      ...formData, // 
      [e.target.name]: e.target.value, // 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post("/api/v1/register", { 
        username: formData.username,  
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
      });
  
      console.log(response.data);
  
      const userData = {
        token: response.data.token, 
        username: response.data.user.username,
        email: response.data.user.email,
        gender: response.data.user.gender,
        avatar: response.data.user.avatar
      };
      login(userData, true)
      alert("Signup successful!");
      window.location.href = "/welcome";
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };
  



  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[500px] bg-white p-10 rounded-3xl shadow-2xl">
        <h2 className="text-center text-3xl font-extrabold text-gray-800">Sign Up</h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
          <input
          name="username"
            type="text"
            placeholder="Full Name"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full p-4 text-gray-800 text-lg rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
          />

          <select
            name="gender"
            className="appearance-none w-full p-4 text-gray-400 text-lg rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none bg-white cursor-pointer"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled selected>Choose Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>


          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-4 text-gray-800 text-lg rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button
              type="button"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm Password"
              className="w-full p-4 text-gray-800 text-lg rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button
              type="button"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          <Button className="w-full font-bold py-3 text-lg rounded-xl transition-all"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-lg">
          Already have an account?
          <a href="/login" className="text-purple-700 font-semibold hover:underline ml-1">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
