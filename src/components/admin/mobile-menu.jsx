import React, { useState, useEffect } from 'react';
import { Bell, HelpCircle, Settings2, X,MessageSquareMore } from 'lucide-react';
import profileImg from '../../assets/profile.png' 
export function MobileMenu({ userName }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
<img
  src={profileImg}
  alt="Profile"
  className="h-8 w-8 rounded-full object-cover"
/>

      </button>

      <div
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed right-0 top-0 bottom-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            
            <button className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-100 rounded">
            <img
            src={profileImg}
            alt="Profile"
            className="h-10 w-10 rounded-md bg-yellow-300 object-cover"
          />
              <span className="font-medium">{userName}</span>
            </button>
            <hr />
            <button className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-100 rounded">
              <HelpCircle className="w-6 h-6" />
              <span>Help</span>
            </button>

            <button className="relative flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-100 rounded">
          <div className="relative">
            <MessageSquareMore className="w-6 h-6" />
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full" />
          </div>
            <span>Inbox</span>
        </button>

        <button className="relative flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-100 rounded">
          <div className="relative">
            <Settings2 className="w-6 h-6" />
          </div>
            <span>Settings</span>
        </button>

        <button className="relative flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-100 rounded">
          <div className="relative">
            <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full" />
          </div>
            <span>Notifications</span>
        </button>
 
          </div>
        </div>
      </div>
    </>
  );
}

