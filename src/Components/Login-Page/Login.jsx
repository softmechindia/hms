import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Lock, Eye, EyeOff, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/endpoints/authApi";
function Login({ setAuth }) {
  const [userID, setuserID] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

// Login.jsx ka handleSubmit function badlein:
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await loginUser(userID, password);
    const apiData = response.fullData; 

    if (apiData && apiData.success === 1) {
      const user = apiData.user_data[0];
      
      // Sahi tarike se data sessionStorage mein save karein
      sessionStorage.setItem("user", JSON.stringify(user));
      
      const role = user.user_type.toLowerCase(); // 'doctor', 'billing', ya 'pharmacy'
      sessionStorage.setItem("userRole", role); // Role ko alag se save kar liya

      setAuth(true); // Isko hamesha role set karne ke baad chalayein
      
      // Sahi paths par navigate karein (Sab lowercase mein)
      if (role === "doctor") {
        navigate("/doctor");
      } else if (role === "billing") {
        navigate("/billing");
      } else if (role === "pharmacy") {
        navigate("/pharmacy");
      }
    } else {
      alert(apiData?.message || "Login Failed");
    }
  } catch (error) {
    alert("Server error!");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center font-sans"
      style={{
        backgroundColor: "#fdfbff",
        backgroundImage: `
      radial-gradient(at 0% 0%, #e2e8f0 0px, transparent 50%), 
      radial-gradient(at 100% 0%, #ffdfc4 0px, transparent 50%), 
      radial-gradient(at 100% 100%, #ffe8d6 0px, transparent 50%), 
      radial-gradient(at 0% 100%, #dbeafe 0px, transparent 50%),
      radial-gradient(at 13% 45%, #d8d6ff 0px, transparent 40%)
    `,
      }}>

      <div className="bg-white w-[400px] max-w-md rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">



        <div className="flex flex-col items-center mb-6 ">
          <img src={logo} alt="logo" className="h-12 mb-3" />

          <h2 className="text-2xl font-bold text-[#2C2F33] font-roboto">
            Hospital Management System
          </h2>

          <p className="text-[#7A7F87] text-sm mt-1 font-poppins">
            Login to manage employees, attendance & operations
          </p>

        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div className="relative">
            <User className=" absolute left-4 top-1/2 -translate-y-1/2 text-[#8C94A3]" size={18} />
            <input
              type="text"
              value={userID}
              onChange={(e) => setuserID(e.target.value.toUpperCase())}
              placeholder="User ID"

              className="w-full bg-white border border-gray-200 pl-12 pr-4 py-3 rounded-lg text-sm outline-none" />
          </div>
          {/* Password */}
          <div className="relative">
            <Lock className=" absolute left-4 top-1/2 -translate-y-1/2 text-[#8C94A3]" size={18} />

            <input type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-white border border-gray-200 pl-12 pr-4 py-3 rounded-lg text-sm outline-none" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C94A3]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>



          {/* Remember */}

          <div className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#2F6CE5]"
            />
            <span className="text-sm text-[#2C2F33] font-poppins">
              Remember Me
            </span>

          </div>

          <button type="submit" className="w-full font-poppins py-3  rounded-lg text-white font-semibold shadow-md bg-gradient-to-r from-[#FF7A00] to-[#FF9F2E]
          hover:opacity-90 transition active:scale-[0.98] cursor-pointer">
            Sign In </button>
          {/* Forgot */}

          <div className="text-center">
            <button type="button" className="text-[12]  font-normal text-gray-800 font-sans  hover:text-orange-500">Forgot Password?</button>
          </div>
          {/* Footer */}
          <p className="text-center font-poppins text-[11px] text-gray-500 mt-6 font-bold tracking-widest">
            © 2024 SOFTMECH INDIA, All RIGHTS RESERVED.
          </p>


        </form>

      </div>

    </div>
  )
}

export default Login;