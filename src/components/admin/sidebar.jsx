import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PieChartIcon as ChartPie, BookMarked, HelpCircle, Bolt, PanelRight, CircleGauge } from 'lucide-react';

const sidebarItems = [
  { title: "Dashboard", icon: CircleGauge, href: "/dashboard" },
  { title: "Students", icon: PanelRight, href: "/students" },
  { title: "Chapter", icon: BookMarked, href: "/chapter" },
  { title: "Help", icon: HelpCircle, href: "/help" },
  { title: "Reports", icon: ChartPie, href: "/reports" },
  { title: "Settings", icon: Bolt, href: "/settings" },
];

export function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64  bg-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <nav className="flex flex-col h-full p-4 space-y-1 border-r mt-3">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-lg font-medium ${
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:bg-gray-200 hover:text-gray-900 hover:font-bold hover:text-xl transition duration-700"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

