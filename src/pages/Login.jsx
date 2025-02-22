import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../utility/Button";
import { useAuth } from "../components/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/v1/login", formData, {
        withCredentials: true, 
      });

      const userData = response.data.user;
      login(userData); 
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/"); 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[500px] bg-white p-10 rounded-3xl shadow-2xl">
        <h2 className="text-center text-3xl font-extrabold text-gray-800">Login</h2>
        
        {error && <p className="text-red-600 text-center mt-2">{error}</p>}

        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-4 text-lg rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-4 text-lg rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          <Button
            className="w-full font-bold py-3 text-lg rounded-xl transition-all"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-lg">
          Don't have an account?
          <a href="/signup" className="text-purple-700 font-semibold hover:underline ml-1">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
