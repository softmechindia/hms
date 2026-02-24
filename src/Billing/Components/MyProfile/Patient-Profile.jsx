import React from "react";
import Doctor from "../../../assets/images/Doctor.jpg";


function MyProfile() {
  return (
    <div className="flex min-h-screen bg-gray-100">
    

     
      <div className="flex-1 flex justify-center items-start mt-4">
        <div className="bg-white w-full max-w-3xl rounded-lg shadow-md overflow-hidden">
          
          
          <div className="relative">
            <img
              src={Doctor}
              alt="Profile Banner"
              className="w-full h-48 object-cover"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/30">
              <h2 className="text-2xl font-semibold">Bharti</h2>
              <p className="text-sm">Noida</p>
            </div>
          </div>

          <div className="p-6">
            <ProfileRow label="User ID" value="ST5910839" />
            <ProfileRow label="Password" value="••••••" isPassword />
            <ProfileRow label="Mobile No." value="7289808547" />
            <ProfileRow label="Email ID" value="Bharti@gmail.com" />
            <ProfileRow label="Gender" value="Female" />
            <ProfileRow label="D.O.B" value="2021-07-10" />
            <ProfileRow label="Age" value="5 Year Old" />
          </div>

   
          <div className="bg-orange-500">
            <button className="w-full text-white py-3 font-semibold hover:bg-orange-600 transition">
              ⚙ Update Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}


const ProfileRow = ({ label, value, isPassword }) => (
  <div className="flex py-2 border-b last:border-b-0">
    <div className="w-40 text-gray-600 font-medium">{label}</div>
    <div className="flex-1 text-gray-800 flex items-center gap-2">
      : {value}
      {isPassword && (
        <span className="text-sm text-blue-500 cursor-pointer">Show</span>
      )}
    </div>
  </div>
);

export default MyProfile;
