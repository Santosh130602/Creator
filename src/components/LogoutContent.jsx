import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutContent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/login');  
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white shadow-md rounded-lg max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Are you sure you want to log out?</h2>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300 transform hover:scale-105"
      >
        Confirm Logout
      </button>
    </div>
  );
};

export default LogoutContent;
