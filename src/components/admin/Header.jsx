import React, { useState } from 'react';
import { Bell, HelpCircle, Search, Settings2, MessageSquareMore, Menu } from 'lucide-react';
import { MobileMenu } from './mobile-menu';
import profileImg from '../../assets/profile.png';

export default function Header({ toggleSidebar }) {
  const [searchTerm, setSearchTerm] = useState(''); 

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <header className="flex items-center justify-between px-4 py-2">
      {/* Burger menu for mobile */}
      <button
        className="md:hidden p-2 mr-2 text-gray-600 hover:bg-gray-100 rounded-full"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>
      
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <input
            type="search"
            placeholder="Search your course"
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-700/50 transition duration-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {searchTerm === '' && <Search className="h-5 w-5 text-gray-400" />}
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4 ml-4">
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <HelpCircle className="h-6 w-6" />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
          <MessageSquareMore className="h-6 w-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <Settings2 className="h-6 w-6" />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
          <Bell className="h-6 w-6" />
          <span className="absolute top-1.5 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center space-x-3 pl-4 border-l">
          <img
            src={profileImg}
            alt="Profile"
            className="h-10 w-10 rounded-md bg-yellow-300 object-cover"
          />
          <div className="flex flex-col items-end">
            <span className="font-medium">Adeline H. Dancy</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <MobileMenu userName="Adeline H. Dancy" profileImgSrc={profileImg} />
      </div>
    </header>
  );
}

