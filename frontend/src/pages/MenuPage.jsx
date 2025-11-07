import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assests/images/logo.png";
import {
  ChartBarIcon,
  PencilSquareIcon,
  EyeIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { to: "/chat", icon: EyeIcon, label: "Chat" },
  { to: "/dashboard", icon: ChartBarIcon, label: "Dashboard" },
  { to: "/editprofile", icon: PencilSquareIcon, label: "Profile" },
];

const MenuPage = ({ page }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 font-sans">
      {/* Top Floating Menu */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex gap-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg px-4 py-2 z-50">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                active
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg"
                  : "hover:bg-indigo-500/20 hover:text-indigo-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          );
        })}

        {/* Logout button */}
        <Link
          to="/login"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/70 hover:bg-red-500 text-white font-medium transition-all duration-300"
        >
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
          Logout
        </Link>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center p-6 mt-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-b-xl shadow-md mx-6">
        <h1 className="text-2xl font-bold tracking-wide">
          {location.pathname.replace("/", "").toUpperCase() || "HOME"}
        </h1>
        <img src={logo} alt="Logo" className="w-12 h-12 rounded-xl shadow-lg" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Card Examples */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transform transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Overview</h2>
          <p className="text-gray-500">
            Summary or key metrics can go here. This is a clean placeholder card.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transform transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Quick Actions</h2>
          <p className="text-gray-500">
            Place buttons, shortcuts, or quick links here for user convenience.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transform transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Recent Activity</h2>
          <p className="text-gray-500">
            Recent logs or updates can appear here. This keeps the user informed.
          </p>
        </div>

        {/* Injected dynamic page content */}
        <div className="col-span-full bg-white rounded-2xl shadow-lg p-6">
          {page}
        </div>
      </main>
    </div>
  );
};

export default MenuPage;
