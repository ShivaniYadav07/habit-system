import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../utility/Button";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[500px] bg-white p-10 rounded-3xl shadow-2xl">
        <h2 className="text-center text-3xl font-extrabold text-gray-800">Sign Up</h2>

        <form className="space-y-6 mt-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 text-gray-800 text-lg rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 text-gray-800 text-lg rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <select
            className="appearance-none w-full p-4 text-gray-800 text-lg rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none bg-white cursor-pointer"
          >
            <option value="" disabled selected>Choose Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>


          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
              type={showConfirmPassword ? "text" : "password"}
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

          <Button className="w-full font-bold py-3 text-lg rounded-xl transition-all">
            Sign Up
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
