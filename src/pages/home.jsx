import React, { useState } from 'react';
import DashboardContent from '../components/dashBord';
import PointsContent from '../components/PointsContent';
import LogoutContent from '../components/LogoutContent';
import Profile from '../components/Profile';
import { Home, Star, LogOut, User} from 'lucide-react';
import Logo1 from '../assets/logo1.png';
import Logo2 from '../assets/logo2.png';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardContent />;
      case 'profile':
        return <Profile />;
      case 'points':
        return <PointsContent />;
      case 'logout':
        return <LogoutContent />;
      default:
        return <DashboardContent />;
    }
  };

  const navItems = [
    { label: 'Home', icon: <Home className="w-5 h-5" />, value: 'home' },
    { label: 'Profile', icon: <User className="w-5 h-5" />, value: 'profile' },
    { label: 'Points', icon: <Star className="w-5 h-5" />, value: 'points' },
    { label: 'Logout', icon: <LogOut className="w-5 h-5" />, value: 'logout' },
  ];
  

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-16 md:w-64 bg-gray-800 text-white p-4 space-y-4 flex flex-col items-center md:items-start">
        {/* VertxAI Logo */}
        <div className="mb-6">
          {/* Desktop logo (visible on md and up) */}
          <img src={Logo2} alt="VertxAI Logo" className="hidden md:block w-32" />

          {/* Mobile logo (visible below md) */}
          <img src={Logo1} alt="VertxAI Icon" className="block md:hidden w-10" />
        </div>

        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => setActiveTab(item.value)}
            className={`w-full flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${activeTab === item.value ? 'bg-gray-700' : ''
              }`}
          >
            {item.icon}
            <span className="hidden md:inline">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-gray-100">
        {renderContent()}
      </div>
    </div>
  );
};

export default HomePage;
