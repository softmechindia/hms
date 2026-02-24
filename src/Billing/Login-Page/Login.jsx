import React, { useState } from "react";
import { Mail, Lock, Eye } from "lucide-react";
import logo from "../../assets/images/logo.png";
import bgimage from "../../assets/images/bgimage.jpeg";
import { useNavigate } from "react-router-dom";

const LoginPage = ({setAuth}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

// login function
 const handleSubmit = (e) => {
    e.preventDefault();
  }

  if(email !== "" & password !== "" ) {
    setAuth(true);
    navigate("/");
  }

  return (
   <div
      className="min-h-screen flex items-center justify-center font-sans bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
     <div className="relative bg-[#FFFFFF] rounded-[2rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] max-w-lg w-full z-10 border border-white/50"
     >
       
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <img src={logo} alt="logo" className="h-12 w-32" />
          </div>
          <h2 className="text-3xl font-bold text-[#1E293B] mt-4">
            Welcome Back!
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Sign in to your account to continue
          </p>
        </div>

   
        <form className="space-y-5 " onSubmit={handleSubmit}>
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-gray-100/50 shadow-[0_20px_50px_rgba(79,110,234,0.18)]">
         
            <div className="relative mb-4">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-gray-100 px-12 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all placeholder-gray-300 shadow-sm"
              />
            </div>

        
            <div className="relative text-gray-800">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold"
                size={18}
              />
              <input
                type="password"
                placeholder="Password"
                
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-gray-800  bg-white border border-gray-100 px-12 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all placeholder-gray-300 shadow-sm"
              />
              <Eye
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                size={18}
              />
            </div>

    
            <div className="mt-3 text-right">
              <button
                type="button"
                className="text-blue-400 text-xs font-medium hover:text-blue-500"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full mt-5 bg-[#ff7a00] hover:bg-[#e66e00] text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_rgba(255,122,0,0.2)] transition-all active:scale-[0.98] text-sm tracking-wide"
            >
              Sign In
            </button>
          </div>

          <div className="mt-8 text-gray-400 text-[10px] tracking-widest flex items-center justify-center uppercase">
            © 2024 SOFTMECH SOLUTIONS. All rights reserved.
          </div>
        </form>
      </div>
    </div>  
  );
};

export default LoginPage;
