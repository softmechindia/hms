import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";




function Login({ setAuth }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

// login function
  const handleSubmit = (e) => {
    e.preventDefault();

  const emailRegeix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegeix.test(email)){
    alert("Please Enter Valid email address")
    return;
  }


    if(password=== ""){
    alert("Please Enter Your passowrd");
    return;
  };

    if (password< 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    setAuth(true);
    navigate("/");

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F3F5] font-sans p-4">

      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">



        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="logo" className="h-12 mb-3" />

          <h2 className="text-3xl font-bold text-[#2C2F33]">
            Welcome Back!
          </h2>

          <p className="text-[#7A7F87] text-sm mt-1">
            Sign in to your account to continue
          </p>

        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div className="relative">
            <Mail className=" absolute left-4 top-1/2 -translate-y-1/2 text-[#8C94A3]" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"

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
            <span className="text-sm text-[#2C2F33]">
              Remember Me
            </span>

          </div>

          <button type="submit" className="w-full py-3 rounded-lg text-white font-semibold shadow-md bg-gradient-to-r from-[#FF7A00] to-[#FF9F2E]
          hover:opacity-90 transition active:scale-[0.98]">
            Sign In </button>
          {/* Forgot */}

          <div className="text-center">
            <button type="button" className="text-[12]  font-normal text-gray-800 font-sans  hover:text-orange-500">Forgot Password?</button>
          </div>
          {/* Footer */}
          <p className="text-center text-[11px] text-gray-500 mt-6 font-bold tracking-widest">
            © 2024 SOFTMECH INDIA, All RIGHTS RESERVED.
          </p>


        </form>

      </div>

    </div>
  )
}

export default Login;